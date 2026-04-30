#!/bin/bash
echo "=== PM2 PROCESSES ==="
pm2 list

echo ""
echo "=== NGINX SITES ==="
ls /etc/nginx/sites-enabled/

echo ""
echo "=== NGINX CONFIG (ports & locations) ==="
grep -E "listen|server_name|location|proxy_pass|root" /etc/nginx/sites-enabled/* 2>/dev/null

echo ""
echo "=== PORTS IN USE ==="
sudo ss -tlnp | grep LISTEN

echo ""
echo "=== CHITTRACKER API ==="
cat /var/www/chittracker-api/server.js | head -5 2>/dev/null || echo "No server.js found"
ls /var/www/chittracker-api/ 2>/dev/null
