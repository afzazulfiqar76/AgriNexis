import logging
import os
import time

from chatbot.providers.base import BaseLLMProvider
from chatbot.utils import AIServiceError, ai_timeout_seconds

logger = logging.getLogger(__name__)

_MAX_RETRIES = 3
_RETRY_BACKOFF_SECONDS = (1.0, 2.0, 4.0)


def _openai_error_mapping(exc: Exception) -> tuple[str, int, str]:
    """Return (user_message, status_code, error_code)."""
    try:
        from openai import (
            APIConnectionError,
            APITimeoutError,
            APIStatusError,
            AuthenticationError,
            RateLimitError,
        )
    except ImportError:
        return 'The AI service is temporarily unavailable.', 503, 'AI_UNAVAILABLE'

    if isinstance(exc, APITimeoutError):
        return (
            'AI response generation is taking longer than expected. Please try again.',
            504,
            'AI_TIMEOUT',
        )
    if isinstance(exc, AuthenticationError):
        return (
            'OpenAI authentication failed. Check OPENAI_API_KEY configuration.',
            401,
            'AI_UNAVAILABLE',
        )
    if isinstance(exc, RateLimitError):
        return (
            'OpenAI rate limit exceeded. Try again shortly.',
            429,
            'RATE_LIMIT',
        )
    if isinstance(exc, APIConnectionError):
        return (
            'The AI service is temporarily unavailable.',
            503,
            'AI_UNAVAILABLE',
        )
    if isinstance(exc, APIStatusError):
        body = getattr(exc, 'body', None) or {}
        if isinstance(body, dict):
            err = body.get('error') or {}
            msg = err.get('message')
            if isinstance(msg, str) and msg.strip():
                return msg.strip()[:500], 502, 'AI_UNAVAILABLE'
        return (
            'The AI service is temporarily unavailable.',
            502,
            'AI_UNAVAILABLE',
        )
    if 'timeout' in str(exc).lower():
        return (
            'AI response generation is taking longer than expected. Please try again.',
            504,
            'AI_TIMEOUT',
        )
    text = str(exc)[:500] if str(exc) else 'The AI service is temporarily unavailable.'
    return text, 502, 'AI_UNAVAILABLE'


def _is_retryable_openai_error(exc: Exception) -> bool:
    try:
        from openai import APIConnectionError, APIStatusError, RateLimitError, APITimeoutError
    except ImportError:
        return False

    if isinstance(exc, (RateLimitError, APIConnectionError, APITimeoutError)):
        return True
    if isinstance(exc, APIStatusError):
        status = getattr(exc, 'status_code', None)
        return isinstance(status, int) and status >= 500
    return False


class OpenAIProvider(BaseLLMProvider):
    """OpenAI Chat Completions API."""

    def __init__(self, *, model: str | None = None, api_key: str | None = None) -> None:
        try:
            from openai import OpenAI
        except ImportError as exc:
            raise AIServiceError(
                'openai package is not installed. Run: pip install openai',
                status_code=500,
                error_code='AI_UNAVAILABLE',
            ) from exc

        key = api_key or os.environ.get('OPENAI_API_KEY', '').strip()
        if not key:
            raise AIServiceError(
                'The model is currently unavailable. Please try again later.',
                status_code=503,
                error_code='AI_UNAVAILABLE',
            )

        org = os.environ.get('OPENAI_ORG_ID', '').strip() or os.environ.get(
            'OPENAI_ORGANIZATION', ''
        ).strip()
        client_kwargs: dict = {'api_key': key, 'timeout': ai_timeout_seconds()}
        if org:
            client_kwargs['organization'] = org

        self._client = OpenAI(**client_kwargs)
        self._model = model or os.environ.get('OPENAI_MODEL', 'gpt-4o-mini')
        logger.info(
            'openai.provider.init model=%s org_configured=%s timeout_s=%s',
            self._model,
            bool(org),
            ai_timeout_seconds(),
        )

    def generate(
        self,
        message: str,
        *,
        system: str | None = None,
        max_tokens: int | None = None,
        temperature: float | None = None,
    ) -> str:
        messages = [{'role': 'user', 'content': message}]
        return self.generate_messages(
            messages,
            system=system,
            max_tokens=max_tokens,
            temperature=temperature,
        )

    def generate_messages(
        self,
        messages: list[dict],
        *,
        system: str | None = None,
        max_tokens: int | None = None,
        temperature: float | None = None,
    ) -> str:
        payload: list[dict] = []
        if system:
            payload.append({'role': 'system', 'content': system})
        for msg in messages:
            role = msg.get('role')
            content = msg.get('content')
            if role in ('user', 'assistant') and isinstance(content, str) and content.strip():
                payload.append({'role': role, 'content': content.strip()})

        if not payload or payload[-1]['role'] != 'user':
            raise AIServiceError('Message cannot be empty.', status_code=400)

        max_tok = max_tokens
        if max_tok is None:
            raw = os.environ.get('OPENAI_MAX_TOKENS_CHAT', '1024').strip()
            try:
                max_tok = int(raw)
            except ValueError:
                max_tok = 1024

        temp = temperature if temperature is not None else 0.5

        last_exc: Exception | None = None
        for attempt in range(_MAX_RETRIES):
            try:
                response = self._client.chat.completions.create(
                    model=self._model,
                    messages=payload,
                    max_tokens=max_tok,
                    temperature=temp,
                )
                choice = response.choices[0] if response.choices else None
                content = choice.message.content if choice and choice.message else None
                if not isinstance(content, str) or not content.strip():
                    raise AIServiceError(
                        'Empty response from AI service.',
                        status_code=502,
                        error_code='AI_UNAVAILABLE',
                    )
                return content.strip()
            except AIServiceError:
                raise
            except Exception as exc:
                last_exc = exc
                if not _is_retryable_openai_error(exc) or attempt >= _MAX_RETRIES - 1:
                    logger.exception(
                        'openai.request.failed model=%s error_type=%s attempt=%s',
                        self._model,
                        type(exc).__name__,
                        attempt + 1,
                    )
                    msg, status, code = _openai_error_mapping(exc)
                    raise AIServiceError(msg, status_code=status, error_code=code) from exc
                delay = _RETRY_BACKOFF_SECONDS[min(attempt, len(_RETRY_BACKOFF_SECONDS) - 1)]
                logger.warning(
                    'openai.request.retry model=%s error_type=%s attempt=%s delay_s=%s',
                    self._model,
                    type(exc).__name__,
                    attempt + 1,
                    delay,
                )
                time.sleep(delay)

        assert last_exc is not None
        msg, status, code = _openai_error_mapping(last_exc)
        raise AIServiceError(msg, status_code=status, error_code=code) from last_exc
