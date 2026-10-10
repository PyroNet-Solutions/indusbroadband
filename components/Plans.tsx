import Link from "next/link";
import { plans } from "@/lib/site";

export function Plans() {
  return (
    <>
      <div className="plans reveal">
        {plans.map((p) => (
          <article key={p.id} className={`plan ${p.featured ? "feat" : ""}`} aria-labelledby={`plan-${p.id}`}>
            {p.featured && <span className="tag">Most popular</span>}
            <h3 id={`plan-${p.id}`}>{p.name}</h3>
            <p className="muted">{p.blurb}</p>
            <ul>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
            <Link className={`btn ${p.featured ? "btn-primary" : "btn-ghost"}`} href={`/contact/?plan=${p.id}`}>Choose {p.name} <span className="arr" aria-hidden="true">→</span></Link>
          </article>
        ))}
      </div>
      <p className="note">Speeds and prices vary by package and location. Contact our team for current packages.</p>
    </>
  );
}
