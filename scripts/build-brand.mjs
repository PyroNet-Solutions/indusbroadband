// Generates the Indus Broadband logo system into public/brand/.
// Run: node scripts/build-brand.mjs
import { writeFileSync } from "node:fs";

const RED = "#FF3B30", ORANGE = "#FF8A00", NAVY = "#0B1F3B";

const defs = (id) => `<defs><linearGradient id="${id}" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="${RED}"/><stop offset="1" stop-color="${ORANGE}"/></linearGradient></defs>`;

// Icon: three fiber strands converging on a lit node. 64x64 grid.
const icon = (paint, node) => `
  <g fill="none" stroke="${paint}" stroke-linecap="round" stroke-width="6">
    <path d="M6 58 C 20 58, 30 40, 44 20"/>
    <path d="M6 42 C 18 42, 30 32, 44 20" opacity=".75"/>
    <path d="M22 60 C 26 46, 34 32, 44 20" opacity=".75"/>
  </g>
  <circle cx="46" cy="18" r="10" fill="${node}"/>
  <circle cx="46" cy="18" r="4" fill="#fff" opacity=".9"/>`;

// Wordmark "indus" drawn from strokes (no font dependency), i-dot carries the accent.
const word = (ink, accent) => `
  <g fill="none" stroke="${ink}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round">
    <path d="M8 36 V70"/>
    <path d="M26 70 V50 a14 14 0 0 1 28 0 V70"/>
    <path d="M98 8 V70 M98 36 H86 a17 17 0 0 0 0 34 H98"/>
    <path d="M116 36 V56 a14 14 0 0 0 28 0 M144 36 V70"/>
    <path d="M188 38 H172 a8 8 0 0 0 0 16 H180 a8 8 0 0 1 0 16 H162"/>
  </g>
  <circle cx="8" cy="17" r="7" fill="${accent}"/>
  <text x="2" y="96" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="14" letter-spacing="9.2" fill="${accent}">BROADBAND</text>`;

const svg = (vb, body, title) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" role="img" aria-label="${title}"><title>${title}</title>${body}</svg>\n`;

const horiz = (ink, accent, paint, node, d = "") =>
  svg("0 0 280 96", `${d}<g transform="translate(0 14)">${icon(paint, node)}</g><g transform="translate(82 0)">${word(ink, accent)}</g>`, "Indus Broadband");
const stacked = (ink, accent, paint, node, d = "") =>
  svg("0 0 200 176", `${d}<g transform="translate(68 0)">${icon(paint, node)}</g><g transform="translate(2 76)">${word(ink, accent)}</g>`, "Indus Broadband");

const G = "url(#g)", D = defs("g");
const files = {
  "logo-light.svg": horiz(NAVY, RED, G, G, D),
  "logo-dark.svg": horiz("#FFFFFF", ORANGE, G, G, D),
  "logo-stacked-light.svg": stacked(NAVY, RED, G, G, D),
  "logo-stacked-dark.svg": stacked("#FFFFFF", ORANGE, G, G, D),
  "logo-mono-black.svg": horiz("#000", "#000", "#000", "#000"),
  "logo-mono-white.svg": horiz("#fff", "#fff", "#fff", "#fff"),
  "icon.svg": svg("0 0 64 64", `${D}${icon(G, G)}`, "Indus Broadband"),
  "favicon.svg": svg("0 0 64 64", `${D}<rect width="64" height="64" rx="14" fill="${NAVY}"/><g transform="translate(4 4) scale(.88)">${icon(G, G)}</g>`, "Indus Broadband"),
};
for (const [n, c] of Object.entries(files)) writeFileSync(`public/brand/${n}`, c);
console.log(Object.keys(files).join("\n"));
