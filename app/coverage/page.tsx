import type { Metadata } from "next";
import Link from "next/link";
import { CoverageSearch } from "@/components/CoverageSearch";

export const metadata: Metadata = {
  title: "Coverage Areas",
  description: "Check where Indus Broadband fiber and wireless internet is available in Lahore, or request a free site survey.",
  alternates: { canonical: "/coverage/" },
};

export default function Coverage() {
  return (
    <>
      <section className="page-hero"><div className="wrap">
        <span className="eyebrow">Coverage</span>
        <h1>Where the <span className="grad-text">light reaches.</span></h1>
        <p className="lead">Our network is growing. If your area isn&apos;t listed, a free site survey is the fastest way to find out.</p>
      </div></section>
      <section className="sec"><div className="wrap story" style={{ alignItems: "start" }}>
        <div className="reveal"><CoverageSearch /></div>
        <div className="panel reveal" style={{ gridTemplateColumns: "1fr" }}>
          <div><h2>Free site survey</h2><p>Our team visits your location and checks feasibility for fiber or wireless. No charge, no commitment.</p></div>
          <div className="panel-act" style={{ justifyContent: "flex-start" }}><Link className="btn btn-primary" href="/contact/?type=coverage">Request survey <span className="arr" aria-hidden="true">→</span></Link></div>
        </div>
      </div></section>
    </>
  );
}
