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

GREETING_RESPONSE = (
    'Hello! 👋\n\nHow can I assist you with AgriNexis today?'
)


def contact_support_message() -> str:
    return (
        'If you need assistance, you can contact the AgriNexis support team through the '
        f'[Contact Us]({CONTACT_PATH}) page. They can help with account-related questions, '
        'platform support, and general inquiries.'
    )


def report_problem_message() -> str:
    return (
        'You can report any issues through the [Contact Us]({path}) page. '
        'Our support team will review your request and assist you as soon as possible.'
    ).format(path=CONTACT_PATH)


def privacy_guidance_message() -> str:
    """Website-oriented guidance instead of a hard privacy refusal."""
    return contact_support_message()


def system_prompt_refusal_message() -> str:
    return (
        "I'm here to help you with the AgriNexis website. "
        'What would you like to know about AgriNexis today?'
    )


def get_approved_domains(*, debug: bool = False) -> frozenset[str]:
    if debug:
        return APPROVED_DOMAINS | DEV_HOSTS
    return APPROVED_DOMAINS
