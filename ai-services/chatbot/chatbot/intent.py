"""Lightweight intent classification for AgriNexis chat orchestration."""

from __future__ import annotations

import re
from dataclasses import dataclass
from enum import Enum


class ChatIntent(str, Enum):
    GENERAL = 'general'
    NAVIGATION = 'navigation'


_NAVIGATION_PATTERNS = [
    re.compile(r'\bwhere\s+(is|can\s+i\s+find)\b', re.I),
    re.compile(r'\bhow\s+do\s+i\s+(get\s+to|find|access|use|open)\b', re.I),
    re.compile(
        r'\b(dashboard|ai\s*plant\s*doctor|ai\s*doctor|iot|sensors?|community|'
        r'documentation|docs|faqs?|contact|privacy)\b',
        re.I,
    ),
    re.compile(r'\b(/dashboard|/ai-doctor|/iot-sensors|/community|/documentation|/faqs|/contact|/aichat)\b', re.I),
    re.compile(r'\bnavigate|navigation|page\b', re.I),
]


@dataclass(frozen=True)
class IntentResult:
    intent: ChatIntent
    score: int


def classify_intent(message: str) -> IntentResult:
    text = (message or '').strip()
    if not text:
        return IntentResult(ChatIntent.GENERAL, 0)

    nav_score = sum(2 for p in _NAVIGATION_PATTERNS if p.search(text))
    if nav_score > 0:
        return IntentResult(ChatIntent.NAVIGATION, nav_score)
    return IntentResult(ChatIntent.GENERAL, 0)
