#!/usr/bin/env python
"""Django's manage.py — defaults `runserver` to AgriNexis port 8003."""
import os
import sys
from pathlib import Path

# Repo-root `ai-services/chatbot` must be importable as package `chatbot`.
_REPO_ROOT = Path(__file__).resolve().parent.parent
_AI_CHATBOT = _REPO_ROOT / 'ai-services' / 'chatbot'
if str(_AI_CHATBOT) not in sys.path:
    sys.path.insert(0, str(_AI_CHATBOT))

# Fixed local API port (Web 8001 | Expo 8002 | Django 8003)
DEFAULT_RUNSERVER_ADDRPORT = '127.0.0.1:8003'


def _ensure_runserver_addrport(argv: list[str]) -> list[str]:
    """If `runserver` has no host/port, bind to 127.0.0.1:8003 (not Django's :8000)."""
    if len(argv) < 2 or argv[1] != 'runserver':
        return argv
    for arg in argv[2:]:
        if arg.startswith('-'):
            continue
        # Explicit addrport already provided (e.g. 0.0.0.0:8003)
        return argv
    return argv + [DEFAULT_RUNSERVER_ADDRPORT]


def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings.development')
    sys.argv = _ensure_runserver_addrport(sys.argv)
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
