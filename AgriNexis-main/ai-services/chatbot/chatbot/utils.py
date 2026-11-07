import os


class AIServiceError(Exception):
    """Raised when the AI layer cannot produce a response; carries HTTP status for the API view."""

    def __init__(
        self,
        message: str,
        status_code: int = 503,
        *,
        error_code: str | None = None,
    ) -> None:
        self.user_message = message
        self.status_code = status_code
        self.error_code = error_code
        super().__init__(message)


def ai_timeout_seconds() -> float:
    raw = os.environ.get('OLLAMA_TIMEOUT_SECONDS', '120')
    try:
        return max(5.0, float(raw))
    except (TypeError, ValueError):
        return 120.0


def normalize_message(message: str) -> str:
    if not isinstance(message, str):
        return ''
    return message.strip()


def truncate_history(
    history: list[dict] | None,
    *,
    max_turns: int = 10,
    max_chars: int = 8000,
) -> list[dict]:
    """Keep last N turns within a character budget."""
    if not history:
        return []

    cleaned: list[dict] = []
    for item in history:
        role = item.get('role')
        content = item.get('content')
        if role not in ('user', 'assistant'):
            continue
        if not isinstance(content, str) or not content.strip():
            continue
        cleaned.append({'role': role, 'content': content.strip()})

    cleaned = cleaned[-max_turns:]
    total = sum(len(m['content']) for m in cleaned)
    while cleaned and total > max_chars:
        removed = cleaned.pop(0)
        total -= len(removed['content'])
    return cleaned
