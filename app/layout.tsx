import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Footer, WhatsAppFab } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RevealObserver } from "@/components/Reveal";
import { site } from "@/lib/site";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap", weight: ["500", "600", "700"] });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap", weight: ["500", "600"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Indus Broadband | Fiber Internet in Lahore", template: "%s | Indus Broadband" },
  description: "Fiber and wireless internet for homes and businesses in Lahore. Unlimited data and local support.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: site.name, locale: "en_PK", url: "/" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f7f9fc" }, { media: "(prefers-color-scheme: dark)", color: "#070b1f" }],
};

// Runs before paint so the saved or system theme applies without a flash.
const themeScript = `try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}`;

const orgLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.legalName,
  url: site.url,
  logo: `${site.url}/brand/logo-light.png`,
  email: site.email,
  telephone: `+${site.whatsapp.e164}`,
  address: { "@type": "PostalAddress", streetAddress: "2nd Floor, Plaza No. 58, CC1, Sector T, DHA Phase 8", addressLocality: "Lahore", addressCountry: "PK" },
  areaServed: "Lahore",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFab />
        <RevealObserver />
      </body>
    </html>
  );
}
