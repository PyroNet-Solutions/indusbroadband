import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-hero" style={{ minHeight: "60vh" }}><div className="wrap">
      <span className="eyebrow">Error 404</span>
      <h1>Signal lost. <span className="grad-text">Page not found.</span></h1>
      <p className="lead">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <div className="hero-cta" style={{ animation: "none" }}><Link className="btn btn-primary" href="/">Back to home</Link><Link className="btn btn-ghost" href="/support/">Get support</Link></div>
    </div></section>
  );
}
