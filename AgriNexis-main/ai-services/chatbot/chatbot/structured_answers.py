"""Curated, well-formatted answers for common short questions."""

from __future__ import annotations

import re

AGRINEXIS_SOFT_CTA = (
    "If you have any questions about AgriNexis, I'm happy to help with those too."
)

PLATFORM_OVERVIEW_MESSAGE = """## Purpose of AgriNexis

AgriNexis is a smart agriculture platform designed to help farmers:

- Monitor crops and farm activity
- Detect plant diseases using AI (**AI Plant Doctor**)
- Manage IoT sensor data (**IoT Sensors**)
- Connect with the farming community (**Community**)

Ask me about any feature, or open the [Dashboard](/dashboard) to get started."""

# Short topic queries → structured Markdown (heading + bullets)
_GENERAL_ANSWERS: dict[str, str] = {
    'python': f"""## What is Python?

Python is a high-level, interpreted programming language known for its **readability** and **versatility**.

**Common uses:**
- Web development
- Data science and data analysis
- Artificial intelligence and machine learning
- Automation and scripting
- Scientific computing

{AGRINEXIS_SOFT_CTA}""",
    'javascript': f"""## What is JavaScript?

JavaScript is a programming language mainly used to make websites interactive.

**Common uses:**
- Web page interactivity
- Front-end web apps
- Back-end services (Node.js)
- Mobile and desktop apps

{AGRINEXIS_SOFT_CTA}""",
    'machine learning': f"""## What is Machine Learning?

Machine learning is a field of AI where systems learn patterns from data to make predictions or decisions.

**Common uses:**
- Image and speech recognition
- Recommendations and forecasting
- Plant disease detection and agriculture analytics

{AGRINEXIS_SOFT_CTA}""",
    'artificial intelligence': f"""## What is Artificial Intelligence?

Artificial intelligence (AI) is technology that enables computers to perform tasks that usually need human intelligence.

**Common uses:**
- Image recognition and diagnostics
- Language understanding and chat assistants
- Automation and decision support in farming

{AGRINEXIS_SOFT_CTA}""",
    'ai': f"""## What is AI?

AI (Artificial Intelligence) is technology that helps computers learn, reason, and solve problems.

**Common uses:**
- Detecting plant diseases from images
- Analyzing sensor and farm data
- Automating routine decisions

{AGRINEXIS_SOFT_CTA}""",
    'weather': f"""## What is Weather?

Weather is the day-to-day state of the atmosphere — temperature, rain, wind, humidity, and more.

**Why it matters in farming:**
- Planning irrigation and planting
- Protecting crops from extreme conditions
- Timing harvests and field work

{AGRINEXIS_SOFT_CTA}""",
    'soil': f"""## What is Soil?

Soil is the natural medium that supports plant roots and supplies water and nutrients.

**Key farming factors:**
- Moisture and drainage
- Nutrient levels
- Texture and structure
- pH balance

{AGRINEXIS_SOFT_CTA}""",
    'fertilizer': f"""## What are Fertilizers?

Fertilizers are materials that supply nutrients to plants to support healthy growth.

**Common types:**
- Nitrogen-based fertilizers
- Phosphorus-based fertilizers
- Potassium-based fertilizers
- Organic composts and manures

{AGRINEXIS_SOFT_CTA}""",
    'fertilizers': None,  # alias filled below
    'programming': f"""## What is Programming?

Programming is writing instructions that tell a computer how to perform tasks.

**Common uses:**
- Building websites and apps
- Analyzing data
- Automating work
- Powering AI and IoT systems

{AGRINEXIS_SOFT_CTA}""",
    'agriculture': f"""## What is Agriculture?

Agriculture is the practice of growing crops and raising livestock for food and other products.

**Modern farming often includes:**
- Crop monitoring
- Soil and water management
- Sensors and data tools
- AI-assisted plant health checks

{AGRINEXIS_SOFT_CTA}""",
}

_GENERAL_ANSWERS['fertilizers'] = _GENERAL_ANSWERS['fertilizer']
_GENERAL_ANSWERS['ml'] = _GENERAL_ANSWERS['machine learning']

_TOPIC_QUERY = re.compile(
    r'^\s*(?:what\s+is|what\'?s|whats|explain|define|tell\s+me\s+about)\s+'
    r'(?P<topic>.+?)\s*[.?!]*\s*$',
    re.I,
)
_BARE_TOPIC = re.compile(r'^\s*(?P<topic>.+?)\s*[.?!]*\s*$', re.I)


def platform_overview_message() -> str:
    return PLATFORM_OVERVIEW_MESSAGE


def lookup_general_structured_answer(message: str) -> str | None:
    """Return a curated heading+bullets answer for short general-knowledge queries."""
    text = (message or '').strip()
    if not text or len(text) > 80:
        return None

    topic = None
    match = _TOPIC_QUERY.match(text)
    if match:
        topic = match.group('topic').strip().lower()
    else:
        bare = _BARE_TOPIC.match(text)
        if bare:
            topic = bare.group('topic').strip().lower()

    if not topic:
        return None

    topic = re.sub(r'\s+', ' ', topic)
    return _GENERAL_ANSWERS.get(topic)
