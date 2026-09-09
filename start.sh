#!/usr/bin/env bash
cd "$(dirname "$0")"
echo "==================================================="
echo "  Starting RAILSETU Local Server..."
echo "==================================================="
if command -v python3 &>/dev/null; then
    python3 server.py
elif command -v python &>/dev/null; then
    python server.py
else
    echo "Python not found. Opening index.html directly..."
    xdg-open index.html 2>/dev/null || open index.html 2>/dev/null
fi
