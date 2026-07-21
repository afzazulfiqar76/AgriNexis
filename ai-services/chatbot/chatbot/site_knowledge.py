"""Page purposes and site knowledge for AgriNexis Assistant."""

from chatbot.structured_answers import PLATFORM_OVERVIEW_MESSAGE, platform_overview_message

PLATFORM_OVERVIEW = (
    'AgriNexis is a smart agriculture platform designed to help farmers monitor crops, '
    'detect plant diseases using AI, manage IoT sensor data, and connect with the farming community.'
)

__all__ = [
    'PLATFORM_OVERVIEW',
    'PLATFORM_OVERVIEW_MESSAGE',
    'SITE_PAGES',
    'format_site_knowledge',
    'platform_overview_message',
]

SITE_PAGES = [
    {
        'name': 'Home / Dashboard overview',
        'path': '/',
        'purpose': 'Landing overview of AgriNexis features and entry to the platform.',
    },
    {
        'name': 'Dashboard',
        'path': '/dashboard',
        'purpose': 'Personal farming overview with key metrics and activity.',
    },
    {
        'name': 'AI Plant Doctor',
        'path': '/ai-doctor',
        'purpose': 'Upload plant images for AI-assisted disease diagnosis and care tips.',
    },
    {
        'name': 'IoT Sensors',
        'path': '/iot-sensors',
        'purpose': 'Monitor farm sensors such as soil moisture, temperature, and humidity.',
    },
    {
        'name': 'Community',
        'path': '/community',
        'purpose': 'Connect with other farmers, share tips, and discuss growing practices.',
    },
    {
        'name': 'Documentation',
        'path': '/documentation',
        'purpose': 'Guides and technical documentation for using AgriNexis.',
    },
    {
        'name': 'FAQs',
        'path': '/faqs',
        'purpose': 'Frequently asked questions about the platform.',
    },
    {
        'name': 'Contact Us',
        'path': '/contact',
        'purpose': 'Reach AgriNexis support with questions or feedback.',
    },
    {
        'name': 'Privacy Policy',
        'path': '/privacy-policy',
        'purpose': 'How AgriNexis handles personal data and privacy.',
    },
    {
        'name': 'AI Assistant',
        'path': '/aichat',
        'purpose': 'Full-page chat with AgriNexis Assistant (this assistant).',
    },
]


def format_site_knowledge() -> str:
    lines = [
        f'Platform overview: {PLATFORM_OVERVIEW}',
        '',
        'AgriNexis website pages (use ONLY these paths when linking; '
        'do not list them unless the user asks for navigation or a specific feature):',
    ]
    for page in SITE_PAGES:
        lines.append(f"- {page['name']}: {page['path']} — {page['purpose']}")
    lines.append('- Sign in: /signin')
    lines.append('- Sign up: /signup')
    lines.append('Never link to /admin or any admin pages.')
    return '\n'.join(lines)