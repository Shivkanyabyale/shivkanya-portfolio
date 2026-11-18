@echo off
setlocal enabledelayedexpansion
title Shivkanya Byale Portfolio - Dev Server

echo =======================================================
echo   Starting Shivkanya Byale Portfolio Website
echo =======================================================
echo.

:: 1. Add node to PATH if needed
where node >nul 2>nul
if %errorlevel% neq 0 (
    if exist "%LOCALAPPDATA%\Programs\nodejs\node.exe" (
        set "PATH=%LOCALAPPDATA%\Programs\nodejs;%PATH%"
    ) else (
        echo [ERROR] Node.js not found. Please run setup.bat first.
        pause
        exit /b 1
    )
)

:: 2. Check if node_modules exists
if not exist "node_modules\" (
    echo [WARNING] node_modules folder not found.
    echo Running setup first...
    call setup.bat
)

:: 3. Open browser after short delay in background
echo [INFO] Opening http://localhost:3000 in your browser...
start "" cmd /c "timeout /t 3 /nobreak >nul & start http://localhost:3000"

:: 4. Start Next.js development server
echo [INFO] Launching Next.js development server on port 3000...
echo [INFO] Press Ctrl+C or run 'stop.bat' to stop the server.
echo.
call npm run dev
