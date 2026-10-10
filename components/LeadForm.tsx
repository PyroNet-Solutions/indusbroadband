"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";
import { plans, site, waLink } from "@/lib/site";

// There is no enquiry backend yet, so the form validates locally and hands the
// request to WhatsApp, where the customer presses Send. The status message says
// exactly that rather than claiming the enquiry was submitted.
type Kind = "connection" | "business" | "coverage" | "support";
type Errors = Partial<Record<"name" | "phone" | "area" | "message", string>>;

const kinds: Record<Kind, string> = {
  connection: "New home connection",
  business: "Business / dedicated internet",
  coverage: "Coverage check / site survey",
  support: "Support or fault report",
};

const PK_PHONE = /^(\+?92|0)3\d{2}[\s-]?\d{7}$/;

// Deep links from plan buttons and CTAs: /contact/?plan=gamer or ?type=coverage
function FromParams() {
  const q = useSearchParams();
  const t = q.get("type");
  const p = plans.find((x) => x.id === q.get("plan"));
  const kind: Kind = p ? "connection" : t && t in kinds ? (t as Kind) : "connection";
  return <Form key={q.toString()} initialKind={kind} initialPlan={p} />;
}

export function LeadForm() {
  return <Suspense fallback={<Form initialKind="connection" />}><FromParams /></Suspense>;
}

function Form({ initialKind, initialPlan }: { initialKind: Kind; initialPlan?: (typeof plans)[number] }) {
  const [kind, setKind] = useState<Kind>(initialKind);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "opening" | "handed" | "blocked">("idle");
  const [plan, setPlan] = useState<string>(() => {
    const p = initialPlan ?? plans.find((x) => x.featured) ?? plans[0];
    return `${p.name} ${p.speed} Mbps`;
  });


  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (String(f.get("company") ?? "")) return; // honeypot: bots fill hidden fields

    const name = String(f.get("name") ?? "").trim();
    const phone = String(f.get("phone") ?? "").trim();
    const area = String(f.get("area") ?? "").trim();
    const plan = String(f.get("plan") ?? "");
    const message = String(f.get("message") ?? "").trim().slice(0, 600);

    const next: Errors = {};
    if (name.length < 2) next.name = "Please enter your name.";
    if (!PK_PHONE.test(phone.replace(/\s/g, ""))) next.phone = "Enter a Pakistani mobile number, e.g. 0300 1234567.";
    if ((kind === "connection" || kind === "coverage" || kind === "business") && area.length < 3) next.area = "Tell us your area or address.";
    if (kind === "support" && message.length < 5) next.message = "Briefly describe the issue.";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      document.getElementById(`lf-${first}`)?.focus();
      return;
    }

    const lines = [
      `${kinds[kind]} request`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      area && `Area: ${area}`,
      kind === "connection" && plan && `Plan: ${plan}`,
      message && `Message: ${message}`,
    ].filter(Boolean);

    setStatus("opening");
    // No "noopener" feature string: with it, window.open always returns null
    // and a successful open would look blocked. Detach the opener manually.
    const win = window.open(waLink(lines.join("\n")), "_blank");
    if (win) win.opener = null;
    setStatus(win ? "handed" : "blocked");
  };

  const err = (k: keyof Errors) => errors[k] ? <span className="err" id={`lf-${k}-e`}>{errors[k]}</span> : null;
  const inv = (k: keyof Errors) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `lf-${k}-e` : undefined });

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="lf-kind">I need</label>
        <select id="lf-kind" name="kind" value={kind} onChange={(e) => setKind(e.target.value as Kind)}>
          {Object.entries(kinds).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>
      <div className="two">
        <div className="field"><label htmlFor="lf-name">Full name</label><input id="lf-name" name="name" autoComplete="name" {...inv("name")} />{err("name")}</div>
        <div className="field"><label htmlFor="lf-phone">Mobile number</label><input id="lf-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="03xx xxxxxxx" {...inv("phone")} />{err("phone")}</div>
      </div>
      <div className="field"><label htmlFor="lf-area">Area / address</label><input id="lf-area" name="area" autoComplete="street-address" placeholder="e.g. DHA Phase 8, Sector T" {...inv("area")} />{err("area")}</div>
      {kind === "connection" && (
        <div className="field">
          <label htmlFor="lf-plan">Plan</label>
          <select id="lf-plan" name="plan" value={plan} onChange={(e) => setPlan(e.target.value)}>
            {plans.map((p) => <option key={p.id} value={`${p.name} ${p.speed} Mbps`}>{p.name} · {p.speed} Mbps · Rs {p.price}/mo</option>)}
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </div>
      )}
      <div className="field"><label htmlFor="lf-message">Message {kind !== "support" && <span className="muted">(optional)</span>}</label><textarea id="lf-message" name="message" maxLength={600} {...inv("message")} />{err("message")}</div>
      <div className="hp" aria-hidden="true"><label htmlFor="lf-company">Company</label><input id="lf-company" name="company" tabIndex={-1} autoComplete="off" /></div>
      <div><button className="btn btn-primary" type="submit" disabled={status === "opening"}>Continue on WhatsApp <span className="arr" aria-hidden="true">→</span></button></div>
      <p className="form-note">Your details open in WhatsApp as a message to {site.whatsapp.display}. Nothing is sent until you press Send there.</p>
      <div aria-live="polite">
        {status === "handed" && <p className="status">WhatsApp opened in a new tab with your details. Press <b>Send</b> there to reach our team.</p>}
        {status === "blocked" && <p className="status">Your browser blocked the new tab. <a href={waLink()} style={{ textDecoration: "underline" }}>Open WhatsApp</a> or call {site.helplines[0]}.</p>}
      </div>
    </form>
  );
}
