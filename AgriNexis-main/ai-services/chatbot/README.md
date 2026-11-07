# AgriNexis Chatbot (AI service)

Website assistant logic for AgriNexis. Django mounts thin views at `/api/chat/` and imports this package.

Uses **local Ollama only** (`phi4-mini` by default). No OpenAI dependency.

## Setup

1. Install and run [Ollama](https://ollama.com/), then pull the model:

```bash
ollama pull phi4-mini
```

2. Set in `server/.env`:

```
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=phi4-mini
```

Optional: `OLLAMA_TIMEOUT_SECONDS` (default 120), `OLLAMA_MAX_TOKENS_CHAT` (default 1024).

3. Run the Django server as usual — `manage.py` adds this package to `PYTHONPATH`.

## Health

`GET /api/chat/` returns Online only when Ollama at `OLLAMA_BASE_URL` is reachable.
