# AgriNexis local development launcher (Windows)
# Fixed ports: Web 8001 | Expo 8002 | Django 8003
#
# Usage:
#   .\dev.ps1              # free ports + start API, web, mobile (separate windows)
#   .\dev.ps1 -FreeOnly    # only free ports
#   .\dev.ps1 -Api -Web    # subset of services

param(
    [switch]$FreeOnly,
    [switch]$Api,
    [switch]$Web,
    [switch]$Mobile
)

$ErrorActionPreference = 'Stop'
$Root = $PSScriptRoot

function Assert-Node {
    if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
        throw 'Node.js is required. Install Node 18+ and retry.'
    }
}

Assert-Node

$argsList = @()
if ($FreeOnly) { $argsList += '--free-only' }
if ($Api) { $argsList += '--api' }
if ($Web) { $argsList += '--web' }
if ($Mobile) { $argsList += '--mobile' }

if ($FreeOnly) {
    node (Join-Path $Root 'scripts\free-ports.mjs')
    Write-Host ''
    Write-Host '✓ Web Client → http://localhost:8001'
    Write-Host '✓ Expo Metro → http://localhost:8002'
    Write-Host '✓ Django API → http://localhost:8003'
    exit 0
}

# Free only the ports we are about to start
$freeArgs = @()
$startAll = -not ($Api -or $Web -or $Mobile)
if ($startAll -or $Api) { $freeArgs += '8003' }
if ($startAll -or $Web) { $freeArgs += '8001' }
if ($startAll -or $Mobile) { $freeArgs += '8002' }

node (Join-Path $Root 'scripts\free-ports.mjs') @freeArgs

function Start-DevWindow {
    param([string]$Title, [string]$WorkingDirectory, [string]$Command)
    Start-Process powershell -ArgumentList @(
        '-NoExit',
        '-Command',
        "Set-Location '$WorkingDirectory'; Write-Host '=== $Title ===' -ForegroundColor Green; $Command"
    ) | Out-Null
}

if ($startAll -or $Api) {
    Start-DevWindow -Title 'AgriNexis Django API :8003' `
        -WorkingDirectory (Join-Path $Root 'server') `
        -Command 'python manage.py runserver 0.0.0.0:8003'
}
if ($startAll -or $Web) {
    Start-DevWindow -Title 'AgriNexis Web Client :8001' `
        -WorkingDirectory (Join-Path $Root 'client') `
        -Command 'npm run dev'
}
if ($startAll -or $Mobile) {
    Start-DevWindow -Title 'AgriNexis Expo Metro :8002' `
        -WorkingDirectory (Join-Path $Root 'mobile') `
        -Command 'npm start'
}

Write-Host ''
Write-Host '══════════════════════════════════════════' -ForegroundColor Cyan
Write-Host '  AgriNexis development started' -ForegroundColor Cyan
Write-Host '══════════════════════════════════════════' -ForegroundColor Cyan
if ($startAll -or $Web) { Write-Host '  ✓ Web Client → http://localhost:8001' }
if ($startAll -or $Mobile) { Write-Host '  ✓ Expo Metro → http://localhost:8002' }
if ($startAll -or $Api) { Write-Host '  ✓ Django API → http://localhost:8003' }
Write-Host '══════════════════════════════════════════' -ForegroundColor Cyan
Write-Host '  Each service runs in its own window.'
Write-Host '  Re-run .\dev.ps1 -FreeOnly to clear stale ports.'
Write-Host ''
