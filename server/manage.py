#!/usr/bin/env python
import os
import sys
from pathlib import Path

# Repo-root `ai-services/chatbot` must be importable as package `chatbot`.
_REPO_ROOT = Path(__file__).resolve().parent.parent
_AI_CHATBOT = _REPO_ROOT / 'ai-services' / 'chatbot'
if str(_AI_CHATBOT) not in sys.path:
    sys.path.insert(0, str(_AI_CHATBOT))


def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings.development')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            'available on your PYTHONPATH environment variable?'
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
