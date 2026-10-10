#!/usr/bin/env bash
# Run on the pyronet VM:  sudo bash deploy.sh
set -euo pipefail
REPO=https://github.com/PyroNet-Solutions/indusbroadband.git
WEB=/var/www/indusbroadband
CONF=/etc/nginx/sites-available/indusbroadband.com.pk

if [ -d "$WEB/.git" ]; then
  git -C "$WEB" pull --ff-only
else
  git clone --depth 1 "$REPO" "$WEB"
fi
chown -R www-data:www-data "$WEB"

cp "$WEB/deploy/indusbroadband.nginx.conf" "$CONF"
ln -sf "$CONF" /etc/nginx/sites-enabled/indusbroadband.com.pk
nginx -t && systemctl reload nginx
echo "Deployed. Test: curl -H 'Host: indusbroadband.com.pk' http://127.0.0.1/"
