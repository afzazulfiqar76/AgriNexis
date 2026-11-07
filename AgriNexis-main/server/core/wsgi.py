import os
import sys
from pathlib import Path

from django.core.wsgi import get_wsgi_application

_REPO_ROOT = Path(__file__).resolve().parent.parent.parent
_AI_CHATBOT = _REPO_ROOT / 'ai-services' / 'chatbot'
if str(_AI_CHATBOT) not in sys.path:
    sys.path.insert(0, str(_AI_CHATBOT))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings.production')

application = get_wsgi_application()
