# AgriNexis

Smart agriculture platform — web client, mobile app, and Django API.

## Official local development ports

| Service | Port | URL |
|---------|------|-----|
| **Web Client** (Vite) | **8001** | http://localhost:8001 |
| **Expo Mobile** (Metro) | **8002** | http://localhost:8002 |
| **Django API** | **8003** | http://localhost:8003 |

These ports are fixed. Do **not** let Expo switch to another port (especially **8003**, which is the API).

## Start the full stack

From the repo root (recommended):

```bash
# Clear stale Metro / Vite / Django listeners, then start all three
npm run free-ports
.\dev.ps1
```

Or with Node (same free-ports logic; logs share one terminal):

```bash
npm run dev
```

### Individual services

```bash
npm run free-ports          # free 8001, 8002, 8003
npm run dev:api             # Django → :8003
npm run dev:web             # Vite  → :8001
npm run dev:mobile          # Expo  → :8002
```

Windows helpers:

```powershell
.\dev.ps1                 # API + web + mobile in separate windows
.\dev.ps1 -FreeOnly       # only clear ports
.\dev.ps1 -Api -Web       # subset
cd server; .\runserver.ps1
cd server; .\run_mobile_api.ps1   # 0.0.0.0:8003 for phones
```

### Per-package commands

```bash
cd client && npm run dev      # always :8001 (strictPort)
cd mobile && npm start        # frees :8002, then Expo on :8002
cd server && python manage.py runserver   # defaults to 127.0.0.1:8003
```

## Port already in use?

```bash
npm run free-ports
# or only Expo:
cd mobile && npm run free-port
```

Then start again. If Expo asks *“Use port 8003 instead?”* choose **No** and run `npm run free-ports` — **8003 is Django**, not Metro.

## Project layout

```
client/     React + Vite web app (:8001)
mobile/     Expo React Native app (:8002)
server/     Django REST API (:8003)
ai-services/chatbot/   AgriNexis Assistant package
scripts/    free-ports + dev launchers
```

## Environment

- `client/.env` → `VITE_API_BASE_URL=http://localhost:8003`
- `mobile/.env` → `PORT=8002` and `EXPO_PUBLIC_API_BASE_URL=http://localhost:8003`
- `server/.env` → see `server/.env.example`

Copy from each package’s `.env.example` if needed.
