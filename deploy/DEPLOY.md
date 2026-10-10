# Deploying indusbroadband.com.pk on the pyronet.com.pk VM

pyronet.com.pk is served through Cloudflare, so the same setup is used here.

## 1. DNS (Cloudflare + Nayatel)
1. In Cloudflare, add the site `indusbroadband.com.pk` (Free plan).
2. Cloudflare gives two nameservers (e.g. `alaric.ns.cloudflare.com`, `harlee.ns.cloudflare.com`).
3. In Nayatel Cloud → Domain → indusbroadband.com.pk, the nameservers must be **only**
   the two Cloudflare ones. Delete `ns.dsl.net.pk`, `ns1.dsl.net.pk`, `ns2.dsl.net.pk`
   (if the panel won't delete them, ask Nayatel support to set the NS to Cloudflare only).
   Mixed nameservers give random/broken resolution.
4. In Cloudflare DNS add (proxied / orange cloud):
   - `A  @    <VM public IP>` (same origin IP as the pyronet.com.pk A record in Cloudflare)
   - `CNAME www indusbroadband.com.pk`
5. SSL/TLS mode: **Full** (or Flexible if the VM has no certificate yet).

## 2. Server (on the VM, assumes nginx)
```bash
curl -fsSL https://raw.githubusercontent.com/PyroNet-Solutions/indusbroadband/main/deploy/deploy.sh -o deploy.sh
sudo bash deploy.sh
```
Optional origin certificate: `sudo certbot --nginx -d indusbroadband.com.pk -d www.indusbroadband.com.pk`
(then set Cloudflare SSL to Full (strict)).

If the VM uses Apache instead of nginx, create a VirtualHost with
`ServerName indusbroadband.com.pk`, `ServerAlias www.indusbroadband.com.pk`,
`DocumentRoot /var/www/indusbroadband`.

## 3. Updating
Re-run `sudo bash /var/www/indusbroadband/deploy/deploy.sh` after pushing to `main`.
