# AgriNexis Web Client

React + Vite frontend for AgriNexis.

## Local port

| Service | Port | URL |
|---------|------|-----|
| **This app (Vite)** | **8001** | http://localhost:8001 |
| Expo Metro | 8002 | http://localhost:8002 |
| Django API | 8003 | http://localhost:8003 |

Vite uses `strictPort: true` — it will **not** silently switch ports.

```bash
npm install
cp .env.example .env
npm run dev
# → http://localhost:8001
```

`VITE_API_BASE_URL` must point at the API on **:8003** (see `.env.example`).

From the repo root: `npm run free-ports` then `npm run dev:web` (or `.\dev.ps1 -Web`).
