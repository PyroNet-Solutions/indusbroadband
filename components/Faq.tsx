import { site } from "@/lib/site";

export const faqs = [
  { q: "Which areas do you cover?", a: "We currently serve DHA Phase 8, Cantt View and nearby parts of Lahore. If your area isn't listed, request a free site survey and our team will check feasibility for fiber or wireless." },
  { q: "Is installation free?", a: "Installation is free for a limited time on all home plans. A Wi-Fi router is not included in the monthly price; our team can supply one at extra cost." },
  { q: "Is there a data limit?", a: "No. Every plan includes unlimited data." },
  { q: "How do I get connected?", a: "Choose a plan and send us your name, number and address through the Get Connected form or on WhatsApp. Our team confirms coverage and schedules the installation." },
  { q: "What should I do if my internet stops working?", a: `First restart your router and check that the fiber cable is not bent or loose. If it still doesn't work, WhatsApp ${site.whatsapp.display} or call any of our helplines with your name and area.` },
  { q: "Do you offer business or dedicated internet?", a: "Yes. Tell us your bandwidth needs through the contact form or WhatsApp and our team will prepare a custom offer." },
];

export function Faq({ items = faqs }: { items?: typeof faqs }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
      ))}
    </div>
  );
}
