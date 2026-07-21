"""Ollama provider configuration and debug logging."""

from __future__ import annotations

import json
import logging
import os
import urllib.error
import urllib.request

logger = logging.getLogger(__name__)

MODEL_UNAVAILABLE_MESSAGE = 'The model is currently unavailable. Please try again later.'


def ollama_base_url() -> str:
    return os.environ.get('OLLAMA_BASE_URL', 'http://localhost:11434').strip().rstrip('/')


def ollama_model() -> str:
    return os.environ.get('OLLAMA_MODEL', 'phi4-mini').strip() or 'phi4-mini'


def ollama_reachable(*, timeout: float = 3.0) -> bool:
    """Return True if the local Ollama server responds."""
    url = f'{ollama_base_url()}/api/tags'
    try:
        req = urllib.request.Request(url, method='GET')
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return 200 <= getattr(resp, 'status', 200) < 300
    except (urllib.error.URLError, TimeoutError, OSError, ValueError):
        return False
    except Exception:
        logger.exception('ollama.health_check.failed')
        return False


def ollama_model_available(*, timeout: float = 3.0) -> bool:
    """Return True if Ollama is up and the configured model is present (or tags list is readable)."""
    url = f'{ollama_base_url()}/api/tags'
    model = ollama_model().lower()
    try:
        req = urllib.request.Request(url, method='GET')
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            raw = resp.read().decode('utf-8')
            data = json.loads(raw) if raw else {}
        models = data.get('models') if isinstance(data, dict) else None
        if not isinstance(models, list):
            return True  # server up; model presence unknown
        names = []
        for item in models:
            if isinstance(item, dict):
                name = str(item.get('name') or item.get('model') or '').lower()
                if name:
                    names.append(name)
        if not names:
            return True
        # Match exact or tag-less name (phi4-mini == phi4-mini:latest)
        for name in names:
            base = name.split(':', 1)[0]
            if name == model or base == model.split(':', 1)[0]:
                return True
        logger.warning('ollama.model_missing configured=%s available=%s', model, names)
        return False
    except (urllib.error.URLError, TimeoutError, OSError, ValueError, json.JSONDecodeError):
        return False
    except Exception:
        logger.exception('ollama.model_check.failed')
        return False


def log_provider_selection(*, purpose: str, provider_class: str, model: str | None = None) -> None:
    logger.info(
        'ai.provider.selected purpose=%s provider=%s model=%s base_url=%s reachable=%s',
        purpose,
        provider_class,
        model or ollama_model(),
        ollama_base_url(),
        ollama_reachable(),
    )
