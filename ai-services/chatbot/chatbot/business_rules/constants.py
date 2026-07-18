"""AgriNexis Business Rules — approved domains, paths, and standard messages."""

from __future__ import annotations

APPROVED_DOMAINS = frozenset(
    {
        'agrinexis.com',
        'www.agrinexis.com',
    }
)

DEV_HOSTS = frozenset({'localhost', '127.0.0.1'})

BLOCKED_DOMAIN_FRAGMENTS = frozenset()

APPROVED_STATIC_PATHS = frozenset(
    {
        '/',
        '/dashboard',
        '/ai-doctor',
        '/iot-sensors',
        '/community',
        '/documentation',
        '/faqs',
        '/contact',
        '/privacy-policy',
        '/aichat',
        '/signin',
        '/signup',
    }
)

DENIED_PATH_PREFIXES = (
    '/admin',
)

CONTACT_PATH = '/contact'
FAQS_PATH = '/faqs'
DEFAULT_SUPPORT_EMAIL = 'support@agrinexis.com'

UNVERIFIED_PAGE_MESSAGE = "I couldn't verify that page exists on AgriNexis."


def privacy_refusal_message(support_email: str = DEFAULT_SUPPORT_EMAIL) -> str:
    return (
        "I can't share admin, employee, or private user information. "
        f"For official support, please visit [{CONTACT_PATH}]({CONTACT_PATH}) "
        f"or email **{support_email}**."
    )


def system_prompt_refusal_message() -> str:
    return (
        "I can't share internal system instructions or configuration details. "
        "I'm AgriNexis Assistant — ask me about the AgriNexis platform and how to navigate the website."
    )


def off_scope_refusal_message() -> str:
    return (
        "I'm AgriNexis Assistant — I help with the AgriNexis website and platform features "
        "(Dashboard, AI Plant Doctor, IoT Sensors, Community, Documentation, FAQs, and Contact). "
        f"I don't answer general coding, ChatGPT-style, or unrelated questions. "
        f"Try asking about AgriNexis, or visit [{FAQS_PATH}]({FAQS_PATH}) / [{CONTACT_PATH}]({CONTACT_PATH})."
    )


def get_approved_domains(*, debug: bool = False) -> frozenset[str]:
    if debug:
        return APPROVED_DOMAINS | DEV_HOSTS
    return APPROVED_DOMAINS
