# Local AgriNexis API on :8003 (never use bare `runserver` → would historically default to :8000).
# Prefer from repo root:  npm run free-ports  then  .\dev.ps1 -Api
# Or:  npm run dev:api
Set-Location $PSScriptRoot
node (Join-Path $PSScriptRoot '..\scripts\free-ports.mjs') 8003
python manage.py runserver 0.0.0.0:8003
