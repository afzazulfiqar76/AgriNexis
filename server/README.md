# AgriNexis API Server

Django 5 + Django REST Framework + SimpleJWT backend for AgriNexis.

## Local ports

| Service | Port |
|---------|------|
| **Backend (this server)** | 8003 |
| Web client (`../client`) | 8001 |
| Mobile Expo (`../mobile`) | 8002 |

> **Multi-project dev:** If [FYP](D:/FYP) or another Django app uses **:8000**, keep AgriNexis on **:8003** so both can run at once.

## Requirements

- Python 3.11+
- MySQL 8+
- Virtual environment (recommended)

## Setup

```bash
cd server
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate

pip install -r requirements/dev.txt
```

Create the database:

```sql
CREATE DATABASE agrinexis CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Copy environment template and edit values:

```bash
cp .env.example .env
```

Run migrations and seed the admin user:

```bash
python manage.py migrate
python manage.py seed_admin
python manage.py runserver
# → defaults to http://127.0.0.1:8003 (not :8000)
# Phones / LAN: python manage.py runserver 0.0.0.0:8003
# Or: .\runserver.ps1  /  .\run_mobile_api.ps1
```

From the **repo root**, prefer:

```bash
npm run free-ports
npm run dev:api
# or Windows: .\dev.ps1 -Api
```

Django admin (session login for `ADMIN` users): http://localhost:8003/admin/

## SQLite fallback (local dev)

If MySQL is not installed yet, set in `server/.env`:

```
USE_SQLITE=True
```

Then run `migrate` and `seed_admin` as usual. Switch to MySQL for production by removing `USE_SQLITE` and configuring `DB_*` variables.

## MySQL on Windows

If `mysqlclient` fails to build, install [MySQL Connector/C](https://dev.mysql.com/downloads/connector/c/) or use PyMySQL as a fallback:

```bash
pip install pymysql
```

Add to `manage.py` before Django loads (development only):

```python
import pymysql
pymysql.install_as_MySQLdb()
```

## Auth API

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/auth/register/` | POST | Public | Register as `USER` |
| `/api/auth/login/` | POST | Public | Login, returns user + JWT |
| `/api/auth/logout/` | POST | Bearer | Blacklist refresh token |
| `/api/auth/refresh/` | POST | Public | Refresh access token |
| `/api/auth/me/` | GET | Bearer | Current user |
| `/api/health/` | GET | Public | Health check |

### Examples

Register:

```bash
curl -X POST http://localhost:8003/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{"full_name":"Jane Farmer","email":"jane@example.com","password":"SecurePass123!"}'
```

Login:

```bash
curl -X POST http://localhost:8003/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email":"S2023065070@umt.edu.pk","password":"S2023065070"}'
```

Me:

```bash
curl http://localhost:8003/api/auth/me/ \
  -H "Authorization: Bearer <access_token>"
```

## Environment variables

See `.env.example` for all keys. Never commit `.env` or real passwords.

| Variable | Purpose |
|----------|---------|
| `DJANGO_SECRET_KEY` | Secret key |
| `DB_*` | MySQL connection |
| `CORS_ALLOW_ALL_ORIGINS` | `True` (default) allows any origin; set `False` and use `CORS_ALLOWED_ORIGINS` in production |
| `CORS_ALLOWED_ORIGINS` | Comma-separated allowlist when `CORS_ALLOW_ALL_ORIGINS=False` |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_FULL_NAME` | `seed_admin` command |

## Project layout

```
server/
├── apps/users/          # Custom User model (ADMIN, USER, MODERATOR)
├── apps/authentication/ # JWT register/login/logout/refresh/me
├── core/settings/       # base, development, production
└── requirements/
```

Future modules (AI Doctor, IoT, Community) can be added under `apps/`.

## Frontend integration

The React client runs on **:8001** with `VITE_API_BASE_URL=http://localhost:8003` in `client/.env`. Mobile uses `EXPO_PUBLIC_API_BASE_URL` in `mobile/.env`.

## Notes

- Rate limiting for auth endpoints is not implemented yet.
- `ADMIN` users receive `is_staff=True` for Django admin access.
