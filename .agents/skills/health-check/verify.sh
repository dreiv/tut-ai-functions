#!/bin/bash

echo "=== Verifying Local Service Connectivity ==="

# Test Vite Client Port (5173)
VITE_RES=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5173 --connect-timeout 2)
if [ "$VITE_RES" -eq 200 ] || [ "$VITE_RES" -eq 304 ]; then
  echo "✅ Vite Dev Server (Port 5173): ACTIVE"
else
  echo "❌ Vite Dev Server (Port 5173): OFFLINE or UNREACHABLE"
fi

# Test Express API Root (3000)
WELCOME_RES=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api --connect-timeout 2)
if [ "$WELCOME_RES" -eq 200 ]; then
  echo "✅ Express Server (Port 3000): ACTIVE"
  echo "   -> API Root (/api): Responding (200 OK)"
else
  echo "❌ Express Server (Port 3000): OFFLINE"
  echo "   -> API Root (/api): Connection failed"
fi

# Test Express API Stats
STATS_RES=$(curl -s --connect-timeout 2 http://localhost:3000/api/stats)
if [[ $STATS_RES == *"status"* ]]; then
  echo "   -> API Stats (/api/stats): Serving metrics successfully"
else
  echo "   -> API Stats (/api/stats): Unreachable or missing data"
fi
