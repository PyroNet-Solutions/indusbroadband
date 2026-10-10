import Link from "next/link";
import { site, telHref, waLink } from "@/lib/site";
import { Logo } from "./Logo";
import { RiverWave } from "./RiverWave";

export function Footer() {
  return (
    <>
    <RiverWave />
    <footer className="ftr" style={{ borderTop: 0 }}>
      <div className="wrap">
        <div className="ftr-grid">
          <div>
            <Logo height={64} />
            <p className="muted" style={{ marginTop: 16, maxWidth: "34ch" }}>Fiber and wireless internet for homes and businesses in Lahore.</p>
          </div>
          <div>
            <h2>Explore</h2>
            <ul>
              <li><Link href="/services/">Services &amp; plans</Link></li>
              <li><Link href="/coverage/">Coverage</Link></li>
              <li><Link href="/about/">About us</Link></li>
            </ul>
          </div>
          <div>
            <h2>Help</h2>
            <ul>
              <li><Link href="/support/">Support &amp; FAQ</Link></li>
              <li><Link href="/contact/">Get connected</Link></li>
              <li><a href={waLink()}>WhatsApp</a></li>
            </ul>
          </div>
          <div>
            <h2>Contact</h2>
            <ul>
              {site.helplines.map((n) => <li key={n}><a href={telHref(n)}>{n}</a></li>)}
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li className="muted">{site.address}</li>
            </ul>
          </div>
        </div>
        <div className="ftr-bot">
          <span>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</span>
          <span>indusbroadband.com.pk</span>
        </div>
      </div>
    </footer>
    </>
  );
}

export function WhatsAppFab() {
  return (
    <a className="wa-fab" href={waLink("Hi Indus Broadband, I need help with")} aria-label={`WhatsApp Indus Broadband on ${site.whatsapp.display}`}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.7.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z" /></svg>
    </a>
  );
}
