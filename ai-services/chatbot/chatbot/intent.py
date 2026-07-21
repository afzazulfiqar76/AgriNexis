"""Lightweight intent classification for AgriNexis chat orchestration."""

from __future__ import annotations

import re
from dataclasses import dataclass
from enum import Enum


class ChatIntent(str, Enum):
    """High-level chat intents used to shape the system prompt."""

    AGRINEXIS = 'agrinexis'  # Website / product questions
    NAVIGATION = 'navigation'  # Finding a specific page
    GENERAL = 'general'  # General knowledge (Python, weather, soil, etc.)


_NAVIGATION_PATTERNS = [
    re.compile(r'\bwhere\s+(is|can\s+i\s+find)\b', re.I),
    re.compile(r'\bhow\s+do\s+i\s+(get\s+to|find|access|open)\b', re.I),
    re.compile(r'\b(take\s+me\s+to|show\s+me\s+(the\s+)?(page|link))\b', re.I),
    re.compile(
        r'\b(/dashboard|/ai-doctor|/iot-sensors|/community|/documentation|/faqs|/contact|/aichat)\b',
        re.I,
    ),
]

_FEATURE_NAME_PATTERN = re.compile(
    r'\b(dashboard|ai\s*plant\s*doctor|ai\s*doctor|plant\s*doctor|'
    r'iot(\s+sensors?)?|sensors?|community|documentation|docs|'
    r'faqs?|contact(\s+us)?|privacy(\s+policy)?)\b',
    re.I,
)

_WEBSITE_WORD = r'(?:web\s*site|website|webiste|wesbite|site|platform|app|product|agrinexis)'

_AGRINEXIS_OVERVIEW_PATTERNS = [
    re.compile(
        rf'\b(what\s+is|what\'?s|whats|tell\s+me\s+about|explain)\s+'
        rf'(agrinexis|this\s+{_WEBSITE_WORD})\b',
        re.I,
    ),
    re.compile(
        rf'\b(purpose|goal|aim|point)\s+(of\s+)?(the\s+|this\s+)?{_WEBSITE_WORD}\b',
        re.I,
    ),
    re.compile(
        rf'\b(what\s+(does|do)\s+(this\s+)?{_WEBSITE_WORD}\s+(do|offer|provide))\b',
        re.I,
    ),
    re.compile(rf'\babout\s+(agrinexis|this\s+{_WEBSITE_WORD})\b', re.I),
    re.compile(r'^\s*agrinexis\s*[.?!]*\s*$', re.I),
]

_AGRINEXIS_TOPIC_PATTERNS = [
    re.compile(r'\bagrinexis\b', re.I),
    re.compile(r'\bthis\s+(website|site|platform)\b', re.I),
    re.compile(r'\b(sign\s*in|sign\s*up|login|register|account)\b', re.I),
    _FEATURE_NAME_PATTERN,
]

_GENERAL_TOPIC_PATTERNS = [
    re.compile(
        r'^\s*(python|javascript|java|react|machine\s*learning|ml|'
        r'artificial\s*intelligence|ai|weather|soil|fertilisers?|fertilizers?|'
        r'programming|agriculture|farming|irrigation|crops?|photosynthesis)'
        r'\s*[.?!]*\s*$',
        re.I,
    ),
    re.compile(
        r'\b(what\s+is|what\'?s|explain|define|tell\s+me\s+about)\s+'
        r'(python|javascript|java|react|machine\s*learning|artificial\s*intelligence|'
        r'weather|soil|fertilisers?|fertilizers?|programming|agriculture|farming|irrigation)\b',
        re.I,
    ),
]


@dataclass(frozen=True)
class IntentResult:
    intent: ChatIntent
    score: int
    is_overview: bool = False


def is_agrinexis_overview(message: str) -> bool:
    text = (message or '').strip()
    if not text:
        return False
    return any(p.search(text) for p in _AGRINEXIS_OVERVIEW_PATTERNS)


def classify_intent(message: str) -> IntentResult:
    text = (message or '').strip()
    if not text:
        return IntentResult(ChatIntent.GENERAL, 0)

    if is_agrinexis_overview(text):
        return IntentResult(ChatIntent.AGRINEXIS, 4, is_overview=True)

    nav_score = sum(2 for p in _NAVIGATION_PATTERNS if p.search(text))
    feature_hit = bool(_FEATURE_NAME_PATTERN.search(text))
    agrinexis_score = sum(2 for p in _AGRINEXIS_TOPIC_PATTERNS if p.search(text))
    general_score = sum(2 for p in _GENERAL_TOPIC_PATTERNS if p.search(text))

    # "How do I use AI Plant Doctor?" → navigation + agrinexis
    if nav_score > 0 and (feature_hit or agrinexis_score > 0):
        return IntentResult(ChatIntent.NAVIGATION, nav_score + agrinexis_score)

    if nav_score > 0 and agrinexis_score == 0 and general_score == 0:
        return IntentResult(ChatIntent.NAVIGATION, nav_score)

    if agrinexis_score > 0:
        # Feature-name-only queries ("AI Plant Doctor") are product questions
        intent = ChatIntent.NAVIGATION if nav_score > 0 else ChatIntent.AGRINEXIS
        return IntentResult(intent, agrinexis_score + nav_score)

    if general_score > 0:
        return IntentResult(ChatIntent.GENERAL, general_score)

    return IntentResult(ChatIntent.GENERAL, 0)
