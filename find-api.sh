#!/bin/bash
echo "=== PM2 PROCESS DETAILS ==="
pm2 show chittracker-api

echo ""
echo "=== SERVER.JS LOCATION ==="
find /home /var/www /opt -name "server.js" 2>/dev/null | grep -v node_modules

echo ""
echo "=== CHITTRACKER API PACKAGE ==="
find /home /var/www /opt -name "package.json" 2>/dev/null | grep -v node_modules | xargs grep -l "chittracker" 2>/dev/null
