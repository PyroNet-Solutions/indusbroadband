import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { site, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Check Internet Availability Near You in Lahore",
  description: "Find out whether Indus Broadband fiber or wireless internet is available at your address. Request a free site survey.",
  alternates: { canonical: "/coverage/" },
};

const steps = [
  { h: "Send your address", p: "Use the form or WhatsApp us your location pin." },
  { h: "Free site survey", p: "Our team checks fiber and wireless feasibility at your address." },
  { h: "We confirm", p: "You hear back with the options available to you. No charge, no commitment." },
];

export default function Coverage() {
  return (
    <>
      <section className="page-hero"><div className="wrap">
        <span className="eyebrow">Coverage</span>
        <h1>Does the light <span className="grad-text">reach you?</span></h1>
        <p className="lead">Our network is growing across Lahore. The quickest way to know is a free site survey at your address.</p>
        <div className="hero-cta" style={{ animation: "none" }}><a className="btn btn-primary" href={waLink("Hi, please check coverage at my location (pin attached):")}>Send location on WhatsApp</a></div>
      </div></section>
      <section className="sec"><div className="wrap contact">
        <div className="reveal"><ol className="steps">{steps.map((s) => <li key={s.h}><h3>{s.h}</h3><p>{s.p}</p></li>)}</ol><p className="addr">Questions? Call {site.helplines[0]}.</p></div>
        <div className="reveal"><LeadForm defaultKind="coverage" /></div>
      </div></section>
    </>
  );
}
