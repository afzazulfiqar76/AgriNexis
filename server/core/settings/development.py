import os

from .base import *  # noqa: F403

DEBUG = True

if os.getenv('USE_SQLITE', '').lower() in ('1', 'true', 'yes'):
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',  # noqa: F405
        }
    }
