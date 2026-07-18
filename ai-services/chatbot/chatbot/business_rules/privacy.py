"""Pre-LLM privacy and policy gate for sensitive chat requests."""

from __future__ import annotations

import re
from dataclasses import dataclass

from chatbot.business_rules.constants import (
    DEFAULT_SUPPORT_EMAIL,
    off_scope_refusal_message,
    privacy_refusal_message,
    system_prompt_refusal_message,
)

_ADMIN_EMPLOYEE_PATTERNS = [
    re.compile(
        r'\b(admin|owner|employee|staff)\s+(phone|number|email|contact|details?)\b',
        re.I,
    ),
    re.compile(
        r'\b(phone|number|email|contact|details?)\s+(of\s+)?(the\s+)?(admin|owner|employee|staff)\b',
        re.I,
    ),
    re.compile(r'\b(contact|reach)\s+(the\s+)?admin\b', re.I),
    re.compile(r'\badmin\s+(details?|info(rmation)?)\b', re.I),
    re.compile(r'\bshare\s+(the\s+)?admin\s+(email|phone|number)\b', re.I),
    re.compile(r'\bgive\s+me\s+(the\s+)?admin\s+(phone|number|email)\b', re.I),
]

_CUSTOMER_PII_PATTERNS = [
    re.compile(r'\b(all|every|list\s+of)\s+(customer|user|farmer)\s+emails?\b', re.I),
    re.compile(r'\b(customer|user|farmer)\s+emails?\b', re.I),
    re.compile(r'\blist\s+(all\s+)?users?\b', re.I),
    re.compile(r'\b(all|every)\s+users?\s+(emails?|data|info)\b', re.I),
]

_SYSTEM_EXTRACTION_PATTERNS = [
    re.compile(r'\bsystem\s+prompt\b', re.I),
    re.compile(r'\byour\s+(instructions?|system\s+prompt|prompt)\b', re.I),
    re.compile(r'\bignore\s+(all\s+)?previous\s+instructions?\b', re.I),
    re.compile(r'\brepeat\s+(the\s+)?(exact\s+)?text\s+above\b', re.I),
    re.compile(r'\bprint\s+your\s+(system\s+)?prompt\b', re.I),
    re.compile(r'\breveal\s+(hidden\s+)?instructions?\b', re.I),
]

# Off-scope: coding tutors / generic AI — not AgriNexis website help
_OFF_SCOPE_PATTERNS = [
    re.compile(r'\b(write|debug|fix)\s+(me\s+)?(some\s+)?(python|javascript|java|c\+\+|code|program)\b', re.I),
    re.compile(r'\b(what is|explain)\s+(python|javascript|nlp|machine learning|react)\b', re.I),
    re.compile(r'\bact as\s+(chatgpt|a coding assistant|a programming tutor)\b', re.I),
    re.compile(r'\b(leetcode|interview prep|homework)\b', re.I),
]


@dataclass(frozen=True)
class PrivacyCheckResult:
    blocked: bool
    reason: str
    response: str


def _match_any(text: str, patterns: list[re.Pattern]) -> bool:
    return any(p.search(text) for p in patterns)


def check_privacy_request(
    message: str,
    *,
    support_email: str = DEFAULT_SUPPORT_EMAIL,
) -> PrivacyCheckResult:
    text = (message or '').strip()
    if not text:
        return PrivacyCheckResult(blocked=False, reason='', response='')

    if _match_any(text, _SYSTEM_EXTRACTION_PATTERNS):
        return PrivacyCheckResult(
            blocked=True,
            reason='system_extraction',
            response=system_prompt_refusal_message(),
        )

    if _match_any(text, _CUSTOMER_PII_PATTERNS):
        return PrivacyCheckResult(
            blocked=True,
            reason='customer_pii',
            response=privacy_refusal_message(support_email),
        )

    if _match_any(text, _ADMIN_EMPLOYEE_PATTERNS):
        return PrivacyCheckResult(
            blocked=True,
            reason='admin_employee_contact',
            response=privacy_refusal_message(support_email),
        )

    if _match_any(text, _OFF_SCOPE_PATTERNS):
        return PrivacyCheckResult(
            blocked=True,
            reason='off_scope',
            response=off_scope_refusal_message(),
        )

    return PrivacyCheckResult(blocked=False, reason='', response='')
