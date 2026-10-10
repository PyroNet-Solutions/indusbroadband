#!/usr/bin/env bash
# Build and deploy to vm-sites (VM 107) through the proxmox jump host.
# Usage: deploy/deploy.sh            build + ship a new release
#        deploy/deploy.sh rollback   point the site back at the previous release
set -euo pipefail
cd "$(dirname "$0")/.."
VM=107
REL=/var/www/indusbroadband-releases

remote() { ssh proxmox "qm guest exec $VM --timeout 120 -- bash -c $(printf %q "$1")" | grep -E '"(exitcode|out-data|err-data)"'; }

if [[ "${1:-}" == "rollback" ]]; then
  remote "cd $REL && prev=\$(ls -1 | sort | tail -2 | head -1) && ln -sfn $REL/\$prev /var/www/indusbroadband && echo now \$prev"
  exit 0
fi

npm run typecheck && npm run lint && npm run build
ID=$(date +%Y%m%d-%H%M%S)
tar czf /tmp/indus-out.tgz -C out .
scp -q /tmp/indus-out.tgz proxmox:/tmp/indus-out.tgz
# qm guest exec has no file copy; stream the archive in base64 over the agent.
ssh proxmox "B=\$(base64 -w0 /tmp/indus-out.tgz); qm guest exec $VM --timeout 120 -- bash -c \"mkdir -p $REL/$ID && echo \$B | base64 -d | tar xzf - -C $REL/$ID && chown -R www-data: $REL/$ID && ln -sfn $REL/$ID /var/www/indusbroadband && ls -1 $REL | sort | head -n -5 | xargs -r -I{} rm -rf $REL/{}\"" | grep exitcode
curl -fsS -o /dev/null -w "live: %{http_code}\n" "https://indusbroadband.com.pk/?r=$ID"
