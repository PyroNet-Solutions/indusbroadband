import { site } from "@/lib/site";

export const faqs = [
  { q: "Which areas do you cover?", a: "We serve a growing number of areas in Lahore. Request a free site survey and our team will confirm whether fiber or wireless is available at your address." },
  { q: "What does installation involve?", a: "After a site survey, our technicians run the connection to your home or office and set up your equipment. Our team explains any installation or router costs before work starts." },
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
