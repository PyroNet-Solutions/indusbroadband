import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { site, telHref, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a New Internet Connection in Lahore",
  description: "Request a new Indus Broadband connection, a business quote or a free site survey. WhatsApp +92 339 4638700.",
  alternates: { canonical: "/contact/" },
};

export default function Contact() {
  return (
    <>
      <section className="page-hero"><div className="wrap">
        <span className="eyebrow">Get connected</span>
        <h1>Let&apos;s get you <span className="grad-text">online.</span></h1>
        <p className="lead">Tell us what you need and where. Our team will confirm availability and get back to you.</p>
      </div></section>
      <section className="sec"><div className="wrap contact">
        <div className="reveal">
          <h2 style={{ fontSize: 28, marginBottom: 20 }}>Talk to us directly</h2>
          <ul className="lines">
            {site.helplines.map((n, i) => (
              <li key={n}><a className={i === 0 ? "primary" : ""} href={i === 0 ? waLink() : telHref(n)}>{n}<small>{i === 0 ? "Primary · WhatsApp" : "Helpline"}</small></a></li>
            ))}
            <li><a href={`mailto:${site.email}`} style={{ fontSize: 15 }}>{site.email}<small>Email</small></a></li>
          </ul>
          <p className="addr">{site.address}</p>
        </div>
        <div className="reveal">
          <h2 style={{ fontSize: 28, marginBottom: 20 }}>Send a request</h2>
          <LeadForm />
        </div>
      </div></section>
    </>
  );
}
