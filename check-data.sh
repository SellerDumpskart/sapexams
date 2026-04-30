#!/bin/bash
echo "=== DATA FILES ==="
ls -la /var/www/chittracker-data/

echo ""
echo "=== FILE SIZES ==="
du -sh /var/www/chittracker-data/*

echo ""
echo "=== USERS COUNT ==="
cat /var/www/chittracker-data/ct-users.json | python3 -c "import sys,json; d=json.load(sys.stdin); print(f'Users: {len(d) if isinstance(d,list) else \"error\"}')" 2>/dev/null || echo "Parse error or empty"

echo ""
echo "=== API HEALTH ==="
curl -s http://127.0.0.1:3001/api/health

echo ""
echo "=== TEST STORAGE READ ==="
curl -s http://127.0.0.1:3001/api/storage/ct-users | python3 -c "import sys,json; d=json.load(sys.stdin); v=json.loads(d['value']); print(f'Users in API: {len(v)}')" 2>/dev/null || echo "Read error"
