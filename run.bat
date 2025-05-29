@echo off
setlocal enabledelayedexpansion

echo =================================================
echo         EXTRACTA - Project Setup Script
echo =================================================

REM === Check for Python 3.10+ ===
echo Checking for Python 3.10+...
set PYTHON_FOUND=0
for /f "tokens=2 delims== " %%I in ('"py -3.10 --version 2>nul"') do (
    set PYTHON_FOUND=1
)
if !PYTHON_FOUND! EQU 0 (
    echo Python 3.10+ is not installed or not found in PATH.
    echo Please install it from https://www.python.org/downloads/ and try again.
    pause
    exit /b 1
)

REM === Install Python backend dependencies ===
echo Installing Python requirements...
pip install --user -r requirements.txt
if errorlevel 1 (
    echo Failed to install Python dependencies.
    pause
    exit /b 1
)

REM === Install npm packages for frontend ===
echo Installing frontend dependencies...
cd frontend
npm install
if errorlevel 1 (
    echo Failed to install npm dependencies.
    cd ..
    pause
    exit /b 1
)
cd ..

REM === Prompt user to start frontend/backend ===
echo.
echo What would you like to start?
echo   [1] Backend only
echo   [2] Frontend only
echo   [3] Both
echo   [4] Exit
set /p choice=Enter your choice (1-4): 

if "%choice%"=="1" (
    echo Starting backend...
    start cmd /k "py -3.10 -m uvicorn main:app --reload"
)
if "%choice%"=="2" (
    echo Starting frontend...
    cd frontend
    start cmd /k "npm run dev"
    cd ..
)
if "%choice%"=="3" (
    echo Starting backend...
    start cmd /k "py -3.10 -m uvicorn main:app --reload"
    echo Starting frontend...
    cd frontend
    start cmd /k "npm run dev"
    cd ..
)
if "%choice%"=="4" (
    echo Exiting.
    exit /b 0
)

pause