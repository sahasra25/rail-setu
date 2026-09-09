@echo off
title RAILSETU Operations Command Center
cd /d "%~dp0"
echo ===================================================
echo   Starting RAILSETU Local Server...
echo ===================================================
python server.py
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Python was not found in PATH. Opening index.html directly...
    start "" index.html
)
pause
