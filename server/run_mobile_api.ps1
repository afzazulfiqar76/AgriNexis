# Listen on all interfaces so phones on the same Wi-Fi can reach the API.
Set-Location $PSScriptRoot
python manage.py runserver 0.0.0.0:8003
