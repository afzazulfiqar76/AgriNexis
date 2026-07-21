"""Pre-LLM gates for greetings, support redirects, and off-scope requests."""

from __future__ import annotations

import re
from dataclasses import dataclass

from chatbot.business_rules.constants import (
    DEFAULT_SUPPORT_EMAIL,
    GREETING_RESPONSE,
    contact_support_message,
    off_scope_refusal_message,
    report_problem_message,
    system_prompt_refusal_message,
)

# Pure greetings — keep replies short and free of feature/URL dumps
_GREETING_PATTERN = re.compile(
    r'^\s*((hi|hello|hey|howdy|hola)\b[\s!,.]*|'
    r'good\s+(morning|afternoon|evening|day)\b[\s!,.]*|'
    r'(hi|hello|hey)\s+there\b[\s!,.]*)+$',
    re.I,
)

_ADMIN_CONTACT_PATTERNS = [
    re.compile(
        r'\b(admin|owner|employee|staff)\s+(phone|number|email|contact|details?)\b',
        re.I,
    ),
    re.compile(
        r'\b(phone|number|email|contact|details?)\s+(of\s+)?(the\s+)?(admin|owner|employee|staff)\b',
        re.I,
    ),
    re.compile(r'\b(contact|reach|talk\s+to|speak\s+(to|with))\s+(the\s+)?admin\b', re.I),
    re.compile(r'\bhow\s+(can|do)\s+i\s+contact\s+(the\s+)?admin\b', re.I),
    re.compile(r'\badmin\s+(details?|info(rmation)?|contact)\b', re.I),
    re.compile(r'\bshare\s+(the\s+)?admin\s+(email|phone|number)\b', re.I),
    re.compile(r'\bgive\s+me\s+(the\s+)?admin\s+(phone|number|email)\b', re.I),
]

# Generic support / report intents only — do not catch "need help with Plant Doctor"
_SUPPORT_HELP_PATTERNS = [
    re.compile(r'\breport\s+(a\s+)?(problem|issue|bug)\b', re.I),
    re.compile(
        r'^\s*i\s+(need|want)\s+(help|support|assistance)\s*[.!?]*\s*$',
        re.I,
    ),
    re.compile(r'\b(need|want)\s+(customer\s+)?support\b', re.I),
    re.compile(r'\b(account|login|password)\s+(problem|issue|help)\b', re.I),
    re.compile(r'\bcontact\s+(support|us)\b', re.I),
    re.compile(r'\bhow\s+(can|do)\s+i\s+(get\s+)?(help|support)\b', re.I),
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


def is_simple_greeting(message: str) -> bool:
    text = (message or '').strip()
    if not text or len(text) > 40:
        return False
    return bool(_GREETING_PATTERN.match(text))


def check_privacy_request(
    message: str,
    *,
    support_email: str = DEFAULT_SUPPORT_EMAIL,
) -> PrivacyCheckResult:
    text = (message or '').strip()
    if not text:
        return PrivacyCheckResult(blocked=False, reason='', response='')

    if is_simple_greeting(text):
        return PrivacyCheckResult(
            blocked=True,
            reason='greeting',
            response=GREETING_RESPONSE,
        )

    if _match_any(text, _SYSTEM_EXTRACTION_PATTERNS):
        return PrivacyCheckResult(
            blocked=True,
            reason='system_extraction',
            response=system_prompt_refusal_message(),
        )

    if _match_any(text, _ADMIN_CONTACT_PATTERNS) or _match_any(text, _CUSTOMER_PII_PATTERNS):
        return PrivacyCheckResult(
            blocked=True,
            reason='support_redirect',
            response=contact_support_message(),
        )

    if _match_any(text, _SUPPORT_HELP_PATTERNS):
        return PrivacyCheckResult(
            blocked=True,
            reason='report_or_support',
            response=report_problem_message(),
        )

    if _match_any(text, _OFF_SCOPE_PATTERNS):
        return PrivacyCheckResult(
            blocked=True,
            reason='off_scope',
            response=off_scope_refusal_message(),
        )

    return PrivacyCheckResult(blocked=False, reason='', response='')
