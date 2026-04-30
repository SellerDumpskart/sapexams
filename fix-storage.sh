#!/bin/bash
echo "=== Testing storage read ==="
curl -s http://127.0.0.1:3001/api/storage/ct-users

echo ""
echo "=== Checking file format ==="
head -c 100 /var/www/chittracker-data/ct-users.json
