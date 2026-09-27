@echo off
REM India Tour Guide - Quick Start for Windows

echo.
echo ==================================
echo  India Tour Guide - Quick Start
echo ==================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed
    echo Please install Node.js 16+ from https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js is installed

REM Navigate to project
cd /d D:\projects\routefinder

REM Install dependencies
echo.
echo Installing dependencies (this may take a few minutes)...
call npm run install:all

if errorlevel 1 (
    echo ERROR: Dependency installation failed
    pause
    exit /b 1
)

echo.
echo [OK] Dependencies installed!
echo.
echo ===================================
echo  IMPORTANT - BEFORE RUNNING:
echo ===================================
echo.
echo 1. Ensure Ollama is running:
echo    - Open Command Prompt
echo    - Run: ollama serve
echo    - Keep it running in background
echo.
echo 2. Setup Supabase Database:
echo    - Go to: https://app.supabase.com/projects
echo    - SQL Editor ^> New Query
echo    - Copy from: server/src/db/schema.sql
echo    - Run it
echo    - Copy from: server/src/db/seed.sql
echo    - Run it
echo.
echo 3. Start Development Servers:
echo    - Run: npm run dev
echo    - Frontend: http://localhost:5173
echo    - Backend: http://localhost:5000
echo.
echo ===================================
echo.
pause
