import type { Metadata } from "next";
import Link from "next/link";
import { Plans } from "@/components/Plans";

export const metadata: Metadata = {
  title: "Internet Services & Plans",
  description: "Home fiber, wireless broadband and business internet from Indus Broadband in Lahore, with unlimited data.",
  alternates: { canonical: "/services/" },
};

const steps = [
  { h: "Send your details", p: "Use the Get Connected form or WhatsApp us your name, number and address." },
  { h: "Site survey", p: "Our team confirms coverage and the best connection type for your location." },
  { h: "Installation", p: "Technicians run the connection to your home or office and set up your equipment." },
  { h: "You're online", p: "Your plan is activated and our helplines are there whenever you need them." },
];

export default function Services() {
  return (
    <>
      <section className="page-hero"><div className="wrap">
        <span className="eyebrow">Services</span>
        <h1>Internet built for <span className="grad-text">every address.</span></h1>
        <p className="lead">Fiber where we can, wireless where we can&apos;t yet, and custom links for business.</p>
      </div></section>

      <section className="sec"><div className="wrap rows">
        <div className="row reveal" id="home"><span className="no">01</span><h2 style={{ fontSize: "clamp(24px,3vw,36px)" }}>Home Fiber (FTTH)</h2><p>A fiber line runs straight into your home. Unlimited data, stable speeds at peak hours, and enough headroom for streaming, gaming and video calls at the same time.</p><span /></div>
        <div className="row reveal" id="wireless"><span className="no">02</span><h2 style={{ fontSize: "clamp(24px,3vw,36px)" }}>Wireless Broadband</h2><p>Where fiber hasn&apos;t reached yet, we connect you over a high-speed wireless link from our nearest site, installed and supported by the same team.</p><span /></div>
        <div className="row reveal" id="business"><span className="no">03</span><h2 style={{ fontSize: "clamp(24px,3vw,36px)" }}>Business &amp; Dedicated Internet</h2><p>For offices, shops and enterprises that need guaranteed bandwidth. Tell us what you need and we&apos;ll prepare a custom offer.</p><Link className="btn btn-ghost" href="/contact/?type=business">Get a quote</Link></div>
      </div></section>

      <section className="sec sec-alt" id="plans" aria-labelledby="p-h"><div className="wrap">
        <div className="sec-head reveal"><span className="eyebrow">Home packages</span><h2 id="p-h">Choose your package.</h2></div>
        <Plans />
      </div></section>

      <section className="sec" aria-labelledby="i-h"><div className="wrap story" style={{ alignItems: "start" }}>
        <div className="sec-head reveal"><span className="eyebrow">Getting connected</span><h2 id="i-h">From request to online in four steps.</h2></div>
        <ol className="steps reveal">{steps.map((s) => <li key={s.h}><h3>{s.h}</h3><p>{s.p}</p></li>)}</ol>
      </div></section>
    </>
  );
}
