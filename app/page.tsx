import Link from "next/link";
import { Faq, faqs } from "@/components/Faq";
import { FiberField } from "@/components/FiberField";
import { NetworkDiagram } from "@/components/NetworkDiagram";
import { Plans } from "@/components/Plans";
import { RiverWave } from "@/components/RiverWave";
import { site, telHref, waLink } from "@/lib/site";

const services = [
  { no: "01", title: "Home Fiber", text: "Fiber-to-the-home with unlimited data for streaming, gaming, study and working from home.", href: "/services/#home" },
  { no: "02", title: "Wireless Broadband", text: "High-speed wireless links where fiber hasn't reached yet, installed by our own team.", href: "/services/#wireless" },
  { no: "03", title: "Business & Dedicated", text: "Custom bandwidth for offices, shops and enterprises, with a quote built around your needs.", href: "/services/#business" },
];

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-h">
        <FiberField />
        <div className="wrap hero-in">
          <span className="eyebrow">Indus Broadband · A river of light</span>
          <h1 id="hero-h">
            <span className="ln"><span>The future</span></span>
            <span className="ln"><span>moves at the</span></span>
            <span className="ln"><span className="grad-text">speed of light.</span></span>
          </h1>
          <p className="lead">Indus Broadband is a fiber and wireless internet service provider in Lahore, engineered for the way you live, work and grow. Unlimited data, local installation and a support team that answers.</p>
          <div className="hero-cta">
            <Link className="btn btn-primary" href="/services/#plans">See packages <span className="arr" aria-hidden="true">→</span></Link>
            <Link className="btn btn-ghost" href="/coverage/">Check coverage</Link>
          </div>
          <div className="hero-meta">
            <div><b>Unlimited</b>data on every plan</div>
            <div><b>Fiber &amp; wireless</b>for homes and business</div>
            <div><b>{site.whatsapp.display}</b>WhatsApp helpline</div>
          </div>
        </div>
      </section>

      <RiverWave />
      <section className="sec sec-alt" style={{ borderTop: 0 }} aria-labelledby="svc-h">
        <div className="wrap">
          <div className="sec-head reveal"><span className="eyebrow">What we do</span><h2 id="svc-h">Connectivity, <span className="grad-text">without the noise.</span></h2></div>
          <div className="rows">
            {services.map((s) => (
              <Link key={s.no} href={s.href} className="row reveal">
                <span className="no">{s.no}</span><h3>{s.title}</h3><p>{s.text}</p><span className="arr" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec-alt" aria-labelledby="net-h">
        <div className="wrap story">
          <div className="reveal">
            <span className="eyebrow">How it reaches you</span>
            <h2 id="net-h" style={{ fontSize: "clamp(34px,5vw,60px)", margin: "16px 0 32px" }}>Light, from our core to your door.</h2>
            <ol className="steps">
              <li><h3>Core network</h3><p>Traffic is routed through our core and upstream links.</p></li>
              <li><h3>Points of presence</h3><p>Fiber carries it to local distribution points near your neighbourhood.</p></li>
              <li><h3>Splitter to home</h3><p>A dedicated drop cable brings the signal into your home or office.</p></li>
            </ol>
          </div>
          <div className="reveal"><NetworkDiagram /></div>
        </div>
      </section>

      <section className="sec" id="plans" aria-labelledby="plans-h">
        <div className="wrap">
          <div className="sec-head reveal"><span className="eyebrow">Plans</span><h2 id="plans-h">Packages for every home. <span className="grad-text">Unlimited data.</span></h2><p className="lead">No data caps. Tell us how you use the internet and our team recommends the right package.</p></div>
          <Plans />
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="panel reveal">
            <div><h2>Not sure we reach you?</h2><p>Request a free site survey. Our team will visit and confirm whether fiber or wireless is available at your address.</p></div>
            <div className="panel-act">
              <Link className="btn btn-primary" href="/contact/?type=coverage">Request survey <span className="arr" aria-hidden="true">→</span></Link>
              <a className="btn btn-ghost" href={telHref(site.helplines[0])}>Call {site.helplines[0]}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="sec sec-alt" aria-labelledby="faq-h">
        <div className="wrap story" style={{ alignItems: "start" }}>
          <div className="sec-head reveal" style={{ marginBottom: 0 }}><span className="eyebrow">Questions</span><h2 id="faq-h">Good to know.</h2><p className="lead">More answers on the <Link href="/support/" style={{ textDecoration: "underline" }}>support page</Link>, or <a href={waLink()} style={{ textDecoration: "underline" }}>ask us on WhatsApp</a>.</p></div>
          <div className="reveal"><Faq items={faqs.slice(0, 4)} /></div>
        </div>
      </section>
    </>
  );
}
