import type { Metadata } from "next";
import Link from "next/link";
import { Faq, faqs } from "@/components/Faq";
import { site, telHref, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Support & FAQ",
  description: "Indus Broadband helplines, WhatsApp support, troubleshooting steps and answers to common questions.",
  alternates: { canonical: "/support/" },
};

const fixes = [
  { h: "Restart your router", p: "Switch it off, wait 30 seconds and switch it on again. Give it two minutes to reconnect." },
  { h: "Check the lights", p: "A red LOS or PON light on the fiber device usually means a line fault. Tell us when you call." },
  { h: "Check the cables", p: "Make sure the fiber cable isn't bent sharply, pinched or loose, and the power is connected." },
  { h: "Test with a cable", p: "If Wi-Fi is slow, connect a laptop by LAN cable to see whether the issue is the line or the Wi-Fi." },
];

export default function Support() {
  return (
    <>
      <section className="page-hero"><div className="wrap">
        <span className="eyebrow">Support</span>
        <h1>We&apos;re here <span className="grad-text">when it matters.</span></h1>
        <p className="lead">WhatsApp is the fastest way to reach us. Send your name, area and the problem.</p>
        <div className="hero-cta" style={{ animation: "none" }}>
          <a className="btn btn-primary" href={waLink("Hi, I have a connection issue. Name: , Area: ")}>WhatsApp {site.whatsapp.display}</a>
          <Link className="btn btn-ghost" href="/contact/?type=support">Report a fault</Link>
        </div>
      </div></section>

      <section className="sec"><div className="wrap story" style={{ alignItems: "start" }}>
        <div className="reveal">
          <span className="eyebrow">Helplines</span>
          <h2 style={{ fontSize: "clamp(30px,4vw,48px)", margin: "16px 0 24px" }}>Call or WhatsApp</h2>
          <ul className="lines">
            {site.helplines.map((n, i) => (
              <li key={n}><a className={i === 0 ? "primary" : ""} href={i === 0 ? waLink() : telHref(n)}>{n}<small>{i === 0 ? "Primary · WhatsApp" : "Helpline"}</small></a></li>
            ))}
          </ul>
        </div>
        <div className="reveal">
          <span className="eyebrow">Quick fixes</span>
          <h2 style={{ fontSize: "clamp(30px,4vw,48px)", margin: "16px 0 24px" }}>Try this first</h2>
          <ol className="steps">{fixes.map((f) => <li key={f.h}><h3>{f.h}</h3><p>{f.p}</p></li>)}</ol>
        </div>
      </div></section>

      <section className="sec sec-alt" aria-labelledby="f-h"><div className="wrap">
        <div className="sec-head reveal"><span className="eyebrow">FAQ</span><h2 id="f-h">Frequently asked questions</h2></div>
        <div className="reveal"><Faq items={faqs} /></div>
      </div></section>
    </>
  );
}
