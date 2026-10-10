# indusbroadband

Indus Broadband payment-methods page. Live at https://indusbroadband.com.pk
(also still on GitHub Pages: https://indusbroadband.github.io/).

## Hosting

- Files: vm-sites (10.10.10.3), `/var/www/indusbroadband`, nginx block `deploy/vm-sites.indusbroadband.com.pk.conf`.
- TLS + Cloudflare-only filter: ct-edge (10.10.10.2), nginx block `deploy/ct-edge.indusbroadband.conf`,
  cert `/etc/nginx/ssl/indusbroadband-origin.{crt,key}`.
- Cloudflare: proxied A records `@` and `www` -> same origin IP as pyronet.com.pk.

## Redeploy

Static files, no build. From this folder (needs the `proxmox` SSH alias):

```bash
B=$(tar czf - index.html IndusLogo.png | base64 -w0); ssh proxmox "qm guest exec 107 -- bash -c \"echo $B | base64 -d | tar xzf - -C /var/www/indusbroadband && chown -R www-data: /var/www/indusbroadband\""
```
