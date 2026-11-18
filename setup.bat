@echo off
setlocal enabledelayedexpansion
title Setup - Shivkanya Byale Portfolio

echo =======================================================
echo   Setting up Shivkanya Byale Portfolio Website
echo =======================================================
echo.

:: 1. Check Node.js and Git
where node >nul 2>nul
if %errorlevel% neq 0 (
    if exist "%LOCALAPPDATA%\Programs\nodejs\node.exe" (
        set "PATH=%LOCALAPPDATA%\Programs\nodejs;%PATH%"
        echo [INFO] Found Node.js in %LOCALAPPDATA%\Programs\nodejs
    ) else (
        echo [ERROR] Node.js is not found in PATH or in %LOCALAPPDATA%\Programs\nodejs.
        echo Please ensure Node.js is installed.
        pause
        exit /b 1
    )
)

where git >nul 2>nul
if %errorlevel% neq 0 (
    if exist "%LOCALAPPDATA%\Programs\Git\cmd\git.exe" (
        set "PATH=%LOCALAPPDATA%\Programs\Git\cmd;%PATH%"
        echo [INFO] Found Git in %LOCALAPPDATA%\Programs\Git\cmd
    )
)

echo [OK] Node.js detected:
call node -v
echo [OK] Git detected:
call git --version
echo.

:: 2. Check / Copy .env.local
if not exist ".env.local" (
    if exist ".env.example" (
        echo [INFO] Creating .env.local from .env.example...
        copy .env.example .env.local >nul
        echo [OK] .env.local created.
    )
) else (
    echo [OK] .env.local already exists.
)
echo.

:: 3. Install NPM Dependencies
echo [INFO] Installing project dependencies (npm install)...
call npm install
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Failed to install dependencies.
    pause
    exit /b 1
)

echo.
echo =======================================================
echo   Setup completed successfully!
echo   Double-click 'start.bat' to launch the website.
echo =======================================================
echo.
pause
