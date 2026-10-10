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

export type Plan = {
  id: string;
  name: string;
  price: string;
  speed: string;
  blurb: string;
  features: string[];
  featured?: boolean;
};

// Prices and speeds from the plan sheet Ammar supplied (Oct 2026).
// TODO confirm: Gamer plan speed.
export const plans: Plan[] = [
  { id: "starter", name: "Starter", price: "1,500", speed: "10", blurb: "Browsing, social media and video calls.", features: ["Unlimited data", "Free installation (limited time)", "Router available, charges apply"] },
  { id: "streamer", name: "Streamer", price: "3,000", speed: "20", blurb: "HD and 4K streaming for the whole family.", features: ["Unlimited data", "Free installation (limited time)", "Router available, charges apply", "Priority support"], featured: true },
  { id: "gamer", name: "Gamer", price: "6,000", speed: "50", blurb: "Low-lag gaming and heavy downloads.", features: ["Unlimited data", "Free installation (limited time)", "Router available, charges apply", "Dedicated support"] },
];

// TODO confirm full list with the field team.
export const areas: { name: string; fiber: boolean; wireless: boolean }[] = [
  { name: "DHA Phase 8", fiber: true, wireless: true },
  { name: "Cantt View", fiber: true, wireless: true },
];

export const nav = [
  { href: "/services/", label: "Services" },
  { href: "/coverage/", label: "Coverage" },
  { href: "/about/", label: "About" },
  { href: "/support/", label: "Support" },
] as const;
