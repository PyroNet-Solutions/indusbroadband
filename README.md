# Indus Broadband website

Live at https://indusbroadband.com.pk. Built with Next.js 16 (App Router, static export), React 19 and strict TypeScript, styled with plain CSS design tokens in `app/globals.css`.

## Layout

| Path | What |
|---|---|
| `app/` | Pages: home, services, coverage, about, support, contact, 404, sitemap, robots |
| `components/` | Header (theme toggle, mobile menu), Footer, FiberField (hero "river of light" canvas), RiverWave dividers, NetworkDiagram, Plans, LeadForm, Faq |
| `lib/site.ts` | **All business facts**: phones, email, address, package tiers. Edit here. No prices or named coverage areas by owner instruction. |
| `public/brand/` | Existing Indus logo: `logo-light.png` (original) and `logo-dark.png` (same logo, navy wordmark recoloured white for dark mode) |
| `deploy/` | nginx blocks for vm-sites and ct-edge, and `deploy.sh` |

## Develop

```bash
npm install
npm run dev
```

Checks: `npm run typecheck`, `npm run lint`, `npm run build` (writes `out/`).

## Deploy

Needs the `proxmox` SSH alias. Runs the checks, builds, uploads a new release to vm-sites and switches the symlink:

```bash
deploy/deploy.sh
```

Roll back to the previous release:

```bash
deploy/deploy.sh rollback
```

Releases live in `/var/www/indusbroadband-releases/` on vm-sites (last 5 kept, plus `00000000-legacy`, the old payment page); `/var/www/indusbroadband` points at the active one.

## Hosting

- Files: vm-sites (10.10.10.3), nginx block `deploy/vm-sites.indusbroadband.com.pk.conf`.
- TLS and the Cloudflare-only filter: ct-edge (10.10.10.2), `deploy/ct-edge.indusbroadband.conf`.
- Cloudflare: proxied A records `@` and `www` to 144.76.119.9, SSL mode Full.

## Forms

There is no enquiry backend. The Get Connected form validates input, then opens WhatsApp (+92 339 4638700) with the details pre-filled; the customer presses Send. The page says so plainly.

## Needs confirming

- Email address `info@indusbroadband.pk` (from the letterhead; the website domain is `.com.pk`).
