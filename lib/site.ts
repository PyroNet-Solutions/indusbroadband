// Single source of truth for business facts. Only verified details belong here;
// anything marked TODO needs confirmation from Indus Broadband management.
export const site = {
  name: "Indus Broadband",
  legalName: "Indus Broadband (Pvt) Ltd",
  url: "https://indusbroadband.com.pk",
  email: "info@indusbroadband.pk",
  address: "2nd Floor, Plaza No. 58, CC1, Sector T, DHA Phase 8, Lahore, Pakistan",
  whatsapp: { display: "+92 339 4638700", e164: "923394638700" },
  helplines: ["0339 4638700", "0331 4477397", "0332 4477397", "0335 4477397"],
} as const;

export const telHref = (local: string) => `tel:+92${local.replace(/\s/g, "").slice(1)}`;

export const waLink = (text?: string) =>
  `https://wa.me/${site.whatsapp.e164}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export type Plan = { id: string; name: string; blurb: string; features: string[]; featured?: boolean };

// Package tiers by use. No prices, speeds or named coverage areas on the site
// (owner's instruction); customers get current packages from the team.
export const plans: Plan[] = [
  { id: "starter", name: "Starter", blurb: "Browsing, social media and video calls.", features: ["Unlimited data", "Fiber or wireless", "Local installation"] },
  { id: "streamer", name: "Streamer", blurb: "HD and 4K streaming for the whole family.", features: ["Unlimited data", "Multiple devices at once", "Priority support"], featured: true },
  { id: "gamer", name: "Gamer", blurb: "Low-lag gaming and heavy downloads.", features: ["Unlimited data", "Stable low latency", "Dedicated support"] },
];

export const nav = [
  { href: "/services/", label: "Services" },
  { href: "/coverage/", label: "Coverage" },
  { href: "/about/", label: "About" },
  { href: "/support/", label: "Support" },
] as const;
