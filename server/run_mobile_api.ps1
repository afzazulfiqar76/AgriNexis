# Listen on all interfaces so phones on the same Wi-Fi can reach the API (:8003).
Set-Location $PSScriptRoot
node (Join-Path $PSScriptRoot '..\scripts\free-ports.mjs') 8003
python manage.py runserver 0.0.0.0:8003
