import json
import logging
import os
import time
import urllib.error
import urllib.request

from chatbot.ai_config import (
    MODEL_UNAVAILABLE_MESSAGE,
    ollama_base_url,
    ollama_model,
)
from chatbot.providers.base import BaseLLMProvider
from chatbot.utils import AIServiceError, ai_timeout_seconds

logger = logging.getLogger(__name__)

_MAX_RETRIES = 3
_RETRY_BACKOFF_SECONDS = (1.0, 2.0, 4.0)


def _map_ollama_error(exc: Exception) -> tuple[str, int, str]:
    """Return (user_message, status_code, error_code)."""
    if isinstance(exc, TimeoutError) or 'timed out' in str(exc).lower():
        return (
            'AI response generation is taking longer than expected. Please try again.',
            504,
            'AI_TIMEOUT',
        )
    if isinstance(exc, urllib.error.HTTPError):
        code = exc.code
        try:
            body = exc.read().decode('utf-8', errors='replace')
            data = json.loads(body) if body else {}
            detail = data.get('error') if isinstance(data, dict) else None
        except Exception:
            detail = None
        if code == 404:
            return (
                MODEL_UNAVAILABLE_MESSAGE,
                503,
                'AI_UNAVAILABLE',
            )
        if isinstance(detail, str) and detail.strip():
            lower = detail.lower()
            if 'not found' in lower or 'pull' in lower:
                return MODEL_UNAVAILABLE_MESSAGE, 503, 'AI_UNAVAILABLE'
            return detail.strip()[:500], 502, 'AI_UNAVAILABLE'
        if code >= 500:
            return MODEL_UNAVAILABLE_MESSAGE, 503, 'AI_UNAVAILABLE'
        return MODEL_UNAVAILABLE_MESSAGE, 502, 'AI_UNAVAILABLE'
    if isinstance(exc, urllib.error.URLError):
        return MODEL_UNAVAILABLE_MESSAGE, 503, 'AI_UNAVAILABLE'
    if isinstance(exc, (ConnectionError, OSError)):
        return MODEL_UNAVAILABLE_MESSAGE, 503, 'AI_UNAVAILABLE'
    text = str(exc)[:500] if str(exc) else MODEL_UNAVAILABLE_MESSAGE
    return text, 502, 'AI_UNAVAILABLE'


def _is_retryable(exc: Exception) -> bool:
    if isinstance(exc, (TimeoutError, ConnectionError, OSError)):
        return True
    if isinstance(exc, urllib.error.URLError) and not isinstance(exc, urllib.error.HTTPError):
        return True
    if isinstance(exc, urllib.error.HTTPError):
        return exc.code >= 500
    return False


class OllamaProvider(BaseLLMProvider):
    """Local Ollama chat API (`/api/chat`)."""

    def __init__(self, *, model: str | None = None, base_url: str | None = None) -> None:
        self._base_url = (base_url or ollama_base_url()).rstrip('/')
        self._model = model or ollama_model()
        logger.info(
            'ollama.provider.init model=%s base_url=%s timeout_s=%s',
            self._model,
            self._base_url,
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
        payload_messages: list[dict] = []
        if system:
            payload_messages.append({'role': 'system', 'content': system})
        for msg in messages:
            role = msg.get('role')
            content = msg.get('content')
            if role in ('user', 'assistant') and isinstance(content, str) and content.strip():
                payload_messages.append({'role': role, 'content': content.strip()})

        if not payload_messages or payload_messages[-1]['role'] != 'user':
            raise AIServiceError('Message cannot be empty.', status_code=400)

        max_tok = max_tokens
        if max_tok is None:
            raw = os.environ.get('OLLAMA_MAX_TOKENS_CHAT', '1024').strip()
            try:
                max_tok = int(raw)
            except ValueError:
                max_tok = 1024

        temp = temperature if temperature is not None else 0.5
        body = {
            'model': self._model,
            'messages': payload_messages,
            'stream': False,
            'options': {
                'temperature': temp,
                'num_predict': max_tok,
            },
        }

        url = f'{self._base_url}/api/chat'
        data = json.dumps(body).encode('utf-8')
        timeout = ai_timeout_seconds()

        last_exc: Exception | None = None
        for attempt in range(_MAX_RETRIES):
            try:
                req = urllib.request.Request(
                    url,
                    data=data,
                    headers={'Content-Type': 'application/json'},
                    method='POST',
                )
                with urllib.request.urlopen(req, timeout=timeout) as resp:
                    raw = resp.read().decode('utf-8')
                parsed = json.loads(raw) if raw else {}
                message = parsed.get('message') if isinstance(parsed, dict) else None
                content = message.get('content') if isinstance(message, dict) else None
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
                if not _is_retryable(exc) or attempt >= _MAX_RETRIES - 1:
                    logger.exception(
                        'ollama.request.failed model=%s error_type=%s attempt=%s',
                        self._model,
                        type(exc).__name__,
                        attempt + 1,
                    )
                    msg, status, code = _map_ollama_error(exc)
                    raise AIServiceError(msg, status_code=status, error_code=code) from exc
                delay = _RETRY_BACKOFF_SECONDS[min(attempt, len(_RETRY_BACKOFF_SECONDS) - 1)]
                logger.warning(
                    'ollama.request.retry model=%s error_type=%s attempt=%s delay_s=%s',
                    self._model,
                    type(exc).__name__,
                    attempt + 1,
                    delay,
                )
                time.sleep(delay)

        assert last_exc is not None
        msg, status, code = _map_ollama_error(last_exc)
        raise AIServiceError(msg, status_code=status, error_code=code) from last_exc
