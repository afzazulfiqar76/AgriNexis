# Local AgriNexis API on :8003 (FYP and other projects can use :8000).
Set-Location $PSScriptRoot
python manage.py runserver 127.0.0.1:8003
