@echo off
title Push RAILSETU to GitHub
cd /d "%~dp0"

set "GIT_EXE=git"
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    if exist "C:\Users\laksh\AppData\Local\github-copilot-git-2.53.0-3\cmd\git.exe" (
        set "GIT_EXE=C:\Users\laksh\AppData\Local\github-copilot-git-2.53.0-3\cmd\git.exe"
    )
)

echo =======================================================
echo   Pushing RAILSETU to https://github.com/sahasra25/rail-setu.git
echo =======================================================
echo.

"%GIT_EXE%" init -b main
"%GIT_EXE%" config user.email "sahasra25@users.noreply.github.com"
"%GIT_EXE%" config user.name "sahasra25"
"%GIT_EXE%" remote remove origin 2>nul
"%GIT_EXE%" remote add origin https://github.com/sahasra25/rail-setu.git
"%GIT_EXE%" add .
"%GIT_EXE%" commit -m "Initial commit: RAILSETU AI-Powered Automatic Block Planning prototype"
"%GIT_EXE%" branch -M main
echo.
echo Attempting to push to main...
"%GIT_EXE%" push -u origin main

echo.
echo =======================================================
echo If push succeeded, enable GitHub Pages:
echo Settings -^> Pages -^> Build and deployment: GitHub Actions
echo Live URL will be: https://sahasra25.github.io/rail-setu/
echo =======================================================
pause
