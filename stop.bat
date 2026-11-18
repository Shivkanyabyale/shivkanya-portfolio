@echo off
setlocal enabledelayedexpansion
title Stop - Shivkanya Byale Portfolio

echo =======================================================
echo   Stopping Shivkanya Byale Portfolio Dev Server
echo =======================================================
echo.

set "FOUND=0"

:: Find any process listening on port 3000
for /f "tokens=5" %%a in ('netstat -ano ^| findstr /r ":3000 .*LISTENING"') do (
    set "PID=%%a"
    if defined PID (
        if not "!PID!"=="0" (
            echo [INFO] Found process with PID !PID! on port 3000. Terminating...
            taskkill /f /pid !PID! >nul 2>&1
            set "FOUND=1"
        )
    )
)

if "!FOUND!"=="1" (
    echo [OK] Portfolio server on port 3000 has been stopped successfully.
) else (
    echo [INFO] No server was found running on port 3000.
)

echo.
pause
