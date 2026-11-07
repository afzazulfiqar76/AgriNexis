# AgriNexis Mobile (Expo)

JavaScript Expo app that shares the Django JWT backend in `../server/` and mirrors AgriNexis design tokens from `../client/`.

## Prerequisites

- Node.js 18+
- [Expo Go](https://expo.dev/go) on a physical device, or Android/iOS emulator
- Django API on **all interfaces** (required for Expo Go on a phone): `cd ../server && python manage.py runserver 0.0.0.0:8003`

## Ports

| Service | Port | URL |
|---------|------|-----|
| Backend (Django) | **8003** | http://localhost:8003 |
| Web client (Vite) | **8001** | http://localhost:8001 |
| Mobile (Expo Metro) | **8002** | exp://…:8002 (QR in terminal) |

## Setup

```bash
cd mobile
npm install
cp .env.example .env
```

Edit `.env` and set `EXPO_PUBLIC_API_BASE_URL` for your environment:

| Target | API base URL |
|--------|----------------|
| iOS Simulator | `http://localhost:8003` |
| Android Emulator | `http://10.0.2.2:8003` |
| Physical device (same Wi‑Fi) | `http://<your-pc-lan-ip>:8003` |
| Expo web | `http://localhost:8003` |

With `CORS_ALLOW_ALL_ORIGINS=True` in `server/.env` (default), LAN Expo origins are allowed. API URL stays port **8003** (not 8002).

## Run

```bash
# Phone / Expo Go (Metro always on :8002 — frees stale Metro first)
npm start

# Browser preview of the RN app (NOT the Vite client in ../client)
npm run web
# → http://localhost:8002
```

From the **repo root**, you can also run:

```bash
npm run free-ports    # clear 8001 / 8002 / 8003
npm run dev:mobile    # Expo only
.\dev.ps1             # API + web + mobile (Windows)
```

If the browser opens **:5173 / :5179**, that is the **web client** (`cd ../client && npm run dev` → **:8001**), not this Expo app.

**Never accept** Expo’s prompt to use port **8003** — that port is the Django API. Choose **No**, then run `npm run free-port` (or from root `npm run free-ports`) and `npm start` again.

**Physical device (recommended):** use [Expo Go](https://expo.dev/go) from the App Store / Play Store. This project targets **Expo SDK 54** (matches the store Expo Go build; SDK 55+ projects often show “incompatible” until you install a matching Expo Go). Scan the QR code — phone and PC must be on the same Wi‑Fi (`192.168.x.x`).

Do **not** press `a` unless Android Studio is installed (`ANDROID_HOME` + `adb`). That opens an emulator and fails without the Android SDK.

### Troubleshooting

| Error | Fix |
|-------|-----|
| `Port 8002 is being used by another process` | Run `npm run free-port` then `npm start`. Do **not** switch to port 8003. |
| Expo asks to use port 8003 | Answer **No**. Port 8003 is Django. Free 8002 and restart. |
| `Project is incompatible with this version of Expo Go` | Store Expo Go lags new SDKs — this repo uses **SDK 54**. Restart with `npx expo start -c --go --port 8002` after `npm run free-port`. |
| Switched to `development build` / dev-client | Press `s` in the terminal to switch back to Expo Go, or use `npm start` (`--go`). |
| `adb` is not recognized | Use Expo Go + QR scan, or install [Android Studio](https://developer.android.com/studio) and set `ANDROID_HOME`. |
| API network errors on phone | Run Django with `python manage.py runserver 0.0.0.0:8003` (or `..\server\run_mobile_api.ps1`) and set `EXPO_PUBLIC_API_BASE_URL=http://<your-wifi-ip>:8003` in `.env`. |

## Auth flow

- **Login / Signup** → `POST /api/auth/login/` and `/api/auth/register/`
- Tokens stored in AsyncStorage: `agrinexis.access`, `agrinexis.refresh`, `agrinexis.user`
- App launch → `GET /api/auth/me/` with refresh on 401
- **Logout** → `POST /api/auth/logout/` then clear storage

Seed admin (from server `.env`): use `ADMIN_EMAIL` / `ADMIN_PASSWORD` after `python manage.py seed_admin`.

## Navigation

- Unauthenticated: Login, Signup
- Authenticated: bottom tabs (Home, AI Doctor, IoT, Community, Profile)
- Stack: Dashboard, Notifications
- **ADMIN** role: Profile → Admin Panel (dashboard + users, mock data until APIs exist)

## Project layout

```
src/
  api/          # Django HTTP (auth only)
  components/   # UI primitives
  constants/    # theme, auth, storage
  context/      # AuthContext
  data/         # UI mocks (not a backend)
  navigation/
  screens/
  utils/
```

Feature screens use mock data in `src/data/` until Django exposes matching endpoints.
