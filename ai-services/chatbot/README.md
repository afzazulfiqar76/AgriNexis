# AgriNexis Chatbot (AI service)

Website assistant logic for AgriNexis. Django mounts thin views at `/api/chat/` and imports this package.

## Setup

1. Install dependency (from `server/` venv):

```bash
pip install -r ../ai-services/chatbot/requirements.txt
```

2. Set in `server/.env`:

```
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
```

Optional: `OPENAI_TIMEOUT_SECONDS`, `OPENAI_MAX_TOKENS_CHAT`, `OPENAI_ORG_ID`.

3. Run the Django server as usual — `manage.py` adds this package to `PYTHONPATH`.
