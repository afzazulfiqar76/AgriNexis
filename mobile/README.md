# AgriNexis Mobile (Expo)

JavaScript Expo app that shares the Django JWT backend in `../server/` and mirrors AgriNexis design tokens from `../client/`.

## Prerequisites

- Node.js 18+
- [Expo Go](https://expo.dev/go) on a physical device, or Android/iOS emulator
- Django API on **all interfaces** (required for Expo Go on a phone): `cd ../server && python manage.py runserver 0.0.0.0:8000`

## Ports

| Service | Port | URL |
|---------|------|-----|
| Backend (Django) | **8000** | http://localhost:8000 |
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
| iOS Simulator | `http://localhost:8000` |
| Android Emulator | `http://10.0.2.2:8000` |
| Physical device (same Wi‑Fi) | `http://<your-pc-lan-ip>:8000` |
| Expo web | `http://localhost:8000` |

With `CORS_ALLOW_ALL_ORIGINS=True` in `server/.env` (default), LAN Expo origins are allowed. API URL stays port **8000** (not 8002).

## Run

```bash
# Phone / Expo Go (Metro on :8002)
npm start

# Browser preview of the RN app (NOT the Vite client in ../client)
npm run web
# → http://localhost:8002
```

If the browser opens **:5173 / :5179**, that is the **web client** (`cd ../client && npm run dev` → **:8001**), not this Expo app.

**Physical device (recommended):** use [Expo Go](https://expo.dev/go) from the App Store / Play Store. This project targets **Expo SDK 54** (matches the store Expo Go build; SDK 55+ projects often show “incompatible” until you install a matching Expo Go). Scan the QR code — phone and PC must be on the same Wi‑Fi (`192.168.x.x`).

Do **not** press `a` unless Android Studio is installed (`ANDROID_HOME` + `adb`). That opens an emulator and fails without the Android SDK.

### Troubleshooting

| Error | Fix |
|-------|-----|
| `Project is incompatible with this version of Expo Go` | Store Expo Go lags new SDKs — this repo uses **SDK 54**. Restart with `npx expo start -c --go`. If you upgraded the project to SDK 55/56, downgrade or install matching Expo Go from [expo.dev/go](https://expo.dev/go). |
| Switched to `development build` / dev-client | Press `s` in the terminal to switch back to Expo Go, or use `npx expo start --go`. |
| `adb` is not recognized | Use Expo Go + QR scan, or install [Android Studio](https://developer.android.com/studio) and set `ANDROID_HOME`. |
| API network errors on phone | Run Django with `python manage.py runserver 0.0.0.0:8000` and set `EXPO_PUBLIC_API_BASE_URL=http://<your-wifi-ip>:8000` in `.env`. |

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
