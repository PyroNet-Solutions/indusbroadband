import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: "Indus Broadband (Pvt) Ltd is a Lahore internet service provider based in DHA Phase 8, delivering fiber and wireless connectivity.",
  alternates: { canonical: "/about/" },
};

export default function About() {
  return (
    <>
      <section className="page-hero"><div className="wrap">
        <span className="eyebrow">About</span>
        <h1>A local network, <span className="grad-text">built properly.</span></h1>
      </div></section>
      <section className="sec"><div className="wrap prose reveal">
        <p>{site.legalName} is an internet service provider based in DHA Phase 8, Lahore. We build and run our own fiber and wireless network to bring dependable, unlimited internet to homes and businesses in our service areas.</p>
        <h2>Why “Indus”</h2>
        <p>The Indus has carried life across this land for thousands of years, connecting people, cities and ideas along its course. We took its name for the same job: a steady current that keeps homes and businesses connected.</p>
        <h2>What we stand for</h2>
        <p><b>Reliability first.</b> A connection should simply work. We design the network for stable speeds, including at busy evening hours.</p>
        <p><b>Honest service.</b> Unlimited data, straightforward packages and no hidden surprises.</p>
        <p><b>Support that&apos;s close by.</b> Our team is local, so installations and fault fixes don&apos;t wait on a distant call centre.</p>
        <h2>Visit us</h2>
        <p>{site.address}</p>
        <p><Link className="btn btn-primary" href="/contact/">Get in touch <span className="arr" aria-hidden="true">→</span></Link></p>
      </div></section>
    </>
  );
}
