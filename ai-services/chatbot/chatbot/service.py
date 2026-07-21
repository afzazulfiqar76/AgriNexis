import logging
import os
from dataclasses import dataclass

from chatbot.ai_config import (
    MODEL_UNAVAILABLE_MESSAGE,
    log_provider_selection,
    ollama_model,
    ollama_reachable,
)
from chatbot.business_rules import check_privacy_request, sanitize_response
from chatbot.intent import ChatIntent, classify_intent
from chatbot.prompts import build_system_prompt
from chatbot.providers.ollama_provider import OllamaProvider
from chatbot.structured_answers import (
    lookup_general_structured_answer,
    platform_overview_message,
)
from chatbot.utils import AIServiceError, normalize_message, truncate_history

logger = logging.getLogger(__name__)


@dataclass
class ChatResponse:
    text: str
    intent: str


def _support_email() -> str:
    try:
        from django.conf import settings

        return getattr(settings, 'SUPPORT_EMAIL', 'support@agrinexis.com')
    except Exception:
        return 'support@agrinexis.com'


def get_provider() -> OllamaProvider:
    if not ollama_reachable():
        raise AIServiceError(
            MODEL_UNAVAILABLE_MESSAGE,
            status_code=503,
            error_code='AI_UNAVAILABLE',
        )
    model = ollama_model()
    provider = OllamaProvider(model=model)
    log_provider_selection(purpose='chat', provider_class='OllamaProvider', model=model)
    return provider


def _max_tokens() -> int:
    raw = os.environ.get('OLLAMA_MAX_TOKENS_CHAT', '1024').strip()
    try:
        return max(64, int(raw))
    except ValueError:
        return 1024


def generate_chat_response(
    message: str,
    history: list[dict] | None = None,
) -> ChatResponse:
    text = normalize_message(message)
    if not text:
        raise AIServiceError('Message cannot be empty.', status_code=400)

    # Fail before canned replies when Ollama is unreachable.
    provider = get_provider()

    support_email = _support_email()
    privacy = check_privacy_request(text, support_email=support_email)
    if privacy.blocked:
        intent = 'greeting' if privacy.reason == 'greeting' else 'privacy_refusal'
        if privacy.reason in ('support_redirect', 'report_or_support'):
            intent = 'navigation'
        logger.info('chat.precheck reason=%s', privacy.reason)
        return ChatResponse(text=privacy.response, intent=intent)

    intent_result = classify_intent(text)
    intent = intent_result.intent

    # Reliable overview for small local models (purpose / what is AgriNexis).
    if intent_result.is_overview:
        logger.info('chat.precheck reason=agrinexis_overview')
        return ChatResponse(text=platform_overview_message(), intent=intent.value)

    # Curated heading + bullets for common general-knowledge topics (e.g. Python).
    if intent == ChatIntent.GENERAL:
        structured = lookup_general_structured_answer(text)
        if structured:
            logger.info('chat.precheck reason=general_structured')
            return ChatResponse(text=structured, intent=intent.value)

    system = build_system_prompt(
        support_email=support_email,
        navigation_focus=(intent == ChatIntent.NAVIGATION),
        general_knowledge=(intent == ChatIntent.GENERAL),
    )

    prior = truncate_history(history)
    messages = prior + [{'role': 'user', 'content': text}]

    response_text = provider.generate_messages(
        messages,
        system=system,
        max_tokens=_max_tokens(),
        temperature=0.5,
    )

    safe_text = sanitize_response(response_text)

    logger.info(
        'chat.response intent=%s history_turns=%s sanitized=%s',
        intent.value,
        len(prior),
        safe_text != response_text,
    )
    return ChatResponse(text=safe_text, intent=intent.value)
