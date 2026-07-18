from abc import ABC, abstractmethod


class BaseLLMProvider(ABC):
    """Contract for LLM backends."""

    @abstractmethod
    def generate(
        self,
        message: str,
        *,
        system: str | None = None,
        max_tokens: int | None = None,
        temperature: float | None = None,
    ) -> str:
        """Return assistant text for a single user turn."""
        raise NotImplementedError
