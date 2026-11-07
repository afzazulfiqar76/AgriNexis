"""Post-LLM URL validation and sanitization for chat responses."""

from __future__ import annotations

import re
from urllib.parse import urlparse

from chatbot.business_rules.constants import (
    APPROVED_STATIC_PATHS,
    BLOCKED_DOMAIN_FRAGMENTS,
    DENIED_PATH_PREFIXES,
    UNVERIFIED_PAGE_MESSAGE,
    get_approved_domains,
)

_MARKDOWN_LINK_RE = re.compile(r'\[([^\]]*)\]\(([^)]+)\)')
_BARE_URL_RE = re.compile(r'(?<![(\[])(https?://[^\s<>)\]]+)')


def _django_debug_enabled() -> bool:
    try:
        from django.conf import settings

        return bool(getattr(settings, 'DEBUG', False))
    except Exception:
        return False


def _normalize_path(path: str) -> str:
    path = (path or '').strip()
    if not path:
        return '/'
    if not path.startswith('/'):
        path = '/' + path
    if '?' in path:
        path = path.split('?', 1)[0]
    if '#' in path:
        path = path.split('#', 1)[0]
    return path.rstrip('/') or '/'


def _host_from_url(url: str) -> str:
    parsed = urlparse(url)
    return (parsed.hostname or '').lower()


def _path_from_url(url: str) -> str:
    parsed = urlparse(url)
    return _normalize_path(parsed.path or '/')


def _is_agrinexis_branded_host(host: str) -> bool:
    host = (host or '').lower()
    return 'agrinexis' in host


def _is_blocked_domain(url: str) -> bool:
    host = _host_from_url(url)
    if not host:
        return False
    for fragment in BLOCKED_DOMAIN_FRAGMENTS:
        if fragment in host or host == fragment.lstrip('www.'):
            return True
    if _is_agrinexis_branded_host(host):
        approved = get_approved_domains(debug=_django_debug_enabled())
        if host not in approved and not any(host.endswith(f'.{d}') for d in approved):
            return True
    return False


def _is_denied_path(path: str) -> bool:
    normalized = _normalize_path(path)
    for prefix in DENIED_PATH_PREFIXES:
        if normalized == prefix or normalized.startswith(prefix + '/'):
            return True
    return False


def _is_allowed_internal_path(path: str) -> bool:
    normalized = _normalize_path(path)
    if _is_denied_path(normalized):
        return False
    return normalized in APPROVED_STATIC_PATHS


def _is_agrinexis_related_url(url: str) -> bool:
    if url.startswith('/'):
        return True
    if not url.startswith(('http://', 'https://')):
        return False
    host = _host_from_url(url)
    if _is_agrinexis_branded_host(host):
        return True
    approved = get_approved_domains(debug=_django_debug_enabled())
    return host in approved or any(host.endswith(f'.{d}') for d in approved)


def _validate_url(url: str) -> bool:
    url = (url or '').strip()
    if not url or url.startswith('mailto:'):
        return True

    if _is_blocked_domain(url):
        return False

    if url.startswith('/'):
        return _is_allowed_internal_path(url)

    if not url.startswith(('http://', 'https://')):
        return True

    if not _is_agrinexis_related_url(url):
        return True

    path = _path_from_url(url)
    return _is_allowed_internal_path(path)


def _replace_markdown_link(match: re.Match) -> str:
    label, url = match.group(1), match.group(2).strip()
    if _validate_url(url):
        return match.group(0)
    if url.startswith('/') or _is_agrinexis_related_url(url):
        clean_label = (label or '').strip()
        if clean_label and clean_label != url:
            return f'{clean_label} ({UNVERIFIED_PAGE_MESSAGE})'
        return UNVERIFIED_PAGE_MESSAGE
    return label or UNVERIFIED_PAGE_MESSAGE


def _replace_bare_url(match: re.Match) -> str:
    url = match.group(1).strip().rstrip('.,;:!?)')
    trailing = match.group(0)[len(url) :]
    if _validate_url(url):
        return match.group(0)
    if _is_agrinexis_related_url(url):
        return UNVERIFIED_PAGE_MESSAGE + trailing
    return match.group(0)


def sanitize_response(text: str) -> str:
    if not text:
        return text

    sanitized = text
    sanitized = _MARKDOWN_LINK_RE.sub(_replace_markdown_link, sanitized)
    sanitized = _BARE_URL_RE.sub(_replace_bare_url, sanitized)
    return sanitized
