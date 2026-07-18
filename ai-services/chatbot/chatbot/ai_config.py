"""AI provider configuration and debug logging (no secrets in logs)."""

from __future__ import annotations

import logging
import os

logger = logging.getLogger(__name__)


def openai_api_key_configured() -> bool:
    return bool(os.environ.get('OPENAI_API_KEY', '').strip())


def openai_organization() -> str | None:
    org = os.environ.get('OPENAI_ORG_ID', '').strip() or os.environ.get(
        'OPENAI_ORGANIZATION', ''
    ).strip()
    return org or None


def log_provider_selection(*, purpose: str, provider_class: str, model: str | None = None) -> None:
    logger.info(
        'ai.provider.selected purpose=%s provider=%s model=%s openai_key_set=%s openai_org_set=%s',
        purpose,
        provider_class,
        model or '(default)',
        openai_api_key_configured(),
        bool(openai_organization()),
    )
