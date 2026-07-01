import { useState, useEffect } from "react";
import { SERVICES, SOFTWARE_SERVICES, TECH_STACK } from "../data";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import QuoteModal from "../components/QuoteModal";

/* ─────────────────────────────────────────────────
   SOFTWARE PRODUCTS PAGE  (/software-products)
───────────────────────────────────────────────── */
export default function SoftwareProductsPage({ onNavigate, scrolled }) {
  const [modal, setModal] = useState(null);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  return (
    <div className="page-enter">
      <Nav onNavigate={onNavigate} currentPage="software-products" scrolled={scrolled} />
      {modal && <QuoteModal onClose={() => setModal(null)} context={modal} />}

      {/* HERO */}
      <section className="prod-hero">
        <div className="prod-hero-bg softprod-hero-bg" />
        <div className="softprod-hero-grid" />
        <div className="breadcrumb">
          <a onClick={() => onNavigate("home")}>Home</a>
          <span>/</span>
          <a onClick={() => onNavigate("division", null, SERVICES.find(s => s.id === "software"))}>Software Dev</a>
          <span>/</span>
          <span style={{ color: "var(--text-primary)" }}>Products & Services</span>
        </div>
        <div className="div-hero-eyebrow">Ace Group Software · Products & Services</div>
        <h1 className="div-hero-title">
          <span style={{ display: "block" }}>Build.</span>
          <span style={{ display: "block" }}><em>Deploy.</em></span>
          <span style={{ display: "block" }}>Scale.</span>
        </h1>
        <p className="div-hero-sub">
          From mobile apps to enterprise systems — every solution we build is engineered for performance, built for Africa's realities, and designed to last.
        </p>
      </section>

      <div className="prod-accent-blue" />

      {/* SERVICES GRID */}
      <section style={{ padding: "6rem 4rem" }}>
        <div className="section-tag">What We Build</div>
        <h2 className="section-title" style={{ marginBottom: "3rem" }}>
          Our Software <em>Services</em>
        </h2>
        <div className="soft-services-grid">
          {SOFTWARE_SERVICES.map((svc) => (
            <div className="soft-service-card" key={svc.id}>
              <div className="soft-card-icon">{svc.icon}</div>
              <div className="soft-card-title">{svc.title}</div>
              <div className="soft-card-desc">{svc.desc}</div>
              <div className="soft-card-pricing">⊹ {svc.pricing}</div>
              <ul style={{ listStyle: "none", marginBottom: "1.5rem" }}>
                {svc.features.map(f => (
                  <li key={f} style={{ fontSize: "0.78rem", color: "var(--text-muted)", padding: "0.2rem 0 0.2rem 1rem", position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: "var(--blue-light)" }}>·</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className="soft-card-btn"
                onClick={() => setModal({ service: svc.title, title: svc.title })}
              >
                Request a Quote
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="process-section" style={{ background: "var(--dark-2)", borderTop: "0.5px solid var(--border-dim)", borderBottom: "0.5px solid var(--border-dim)", padding: "6rem 4rem" }}>
        <div className="section-tag">How We Work</div>
        <h2 className="section-title" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", marginBottom: "4rem" }}>
          Our <em>Process</em>
        </h2>
        <div className="process-steps">
          {[
            { title: "Discovery", text: "We learn your goals, users, and constraints through a structured scoping session." },
            { title: "Proposal", text: "A detailed technical proposal with timeline, stack, and investment — within 48 hours." },
            { title: "Design & Build", text: "Iterative delivery with regular demos. You see progress every week, not just at the end." },
            { title: "Test & Deploy", text: "Rigorous QA, staging environment review, and production deployment with zero-downtime." },
            { title: "Support", text: "Post-launch monitoring, bug fixes, and feature iterations. We don't disappear at go-live." },
          ].map((step, i) => (
            <div className="process-step" key={i}>
              <div className="process-step-num">{i + 1}</div>
              <div className="process-step-title">{step.title}</div>
              <div className="process-step-text">{step.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TECH STACK */}
      <section style={{ padding: "6rem 4rem" }}>
        <div className="section-tag">Built With</div>
        <h2 className="section-title" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", marginBottom: "3rem" }}>
          Our <em>Tech Stack</em>
        </h2>
        <div className="tech-stack-grid">
          {TECH_STACK.map(t => (
            <div className="tech-item" key={t.name}>
              <div className="tech-icon">{t.icon}</div>
              <div className="tech-name">{t.name}</div>
              <div className="tech-category">{t.category}</div>
            </div>
          ))}
        </div>
      </section>

      {/* QUOTE FORM */}
      <section className="quote-form-section" style={{ background: "var(--dark-2)", borderTop: "0.5px solid var(--border-dim)" }}>
        <div className="section-tag">Start a Project</div>
        <h2 className="section-title" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", marginBottom: "3rem" }}>
          Request a <em>Project Quote</em>
        </h2>
        <div className="quote-form-inner">
          <div>
            <p style={{ fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.85, marginBottom: "1.5rem" }}>
              Every great product starts with a conversation. Tell us what you're building and we'll come back to you with a tailored proposal — no obligation, no cost.
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
              For urgent enquiries, reach us directly:
            </p>
            <a
              href="https://wa.me/27739298456?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20software%20development%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn"
            >
              📱 WhatsApp: 073 929 8456
            </a>
            <div style={{ marginTop: "2rem", padding: "1.5rem", border: "0.5px solid var(--border-dim)", background: "var(--dark-3)" }}>
              <div style={{ fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.8rem" }}>Response Time</div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.8 }}>
                All enquiries receive an initial response within <strong style={{ color: "var(--text-primary)" }}>24 business hours</strong>. Detailed proposals follow within <strong style={{ color: "var(--text-primary)" }}>48–72 hours</strong>.
              </div>
            </div>
          </div>
          <form className="quote-form" onSubmit={(e) => { e.preventDefault(); setModal({ title: "Quote submitted!" }); }}>
            <div className="form-row">
              <input type="text" placeholder="Your Name *" required />
              <input type="text" placeholder="Company / Organisation" />
            </div>
            <input type="email" placeholder="Email Address *" required />
            <input type="tel" placeholder="WhatsApp / Phone *" required />
            <select required>
              <option value="" disabled selected>Service Required *</option>
              {SOFTWARE_SERVICES.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
            </select>
            <input type="text" placeholder="Estimated Budget Range (optional)" />
            <textarea placeholder="Describe your project — what are you building, who is it for, and what problem does it solve?" rows={5} />
            <button type="submit" className="soft-card-btn" style={{ padding: "1rem", fontSize: "0.8rem", letterSpacing: "0.14em" }}>
              Submit Project Brief
            </button>
          </form>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="register-section">
        <div className="section-tag" style={{ justifyContent: "center" }}>South Africa · Global Standards</div>
        <h2 className="cta-title">
          Let's Build<br /><em>Something Great</em>
        </h2>
        <p className="cta-sub">Whether it's a weekend MVP or a year-long enterprise rollout — Ace Group Software is ready to deliver.</p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button className="soft-card-btn" style={{ padding: "1rem 2.4rem", fontSize: "0.8rem", letterSpacing: "0.14em" }} onClick={() => setModal({ title: "Get Started" })}>
            Get a Quote
          </button>
          <button className="btn-ghost" onClick={() => onNavigate("division", null, SERVICES.find(s => s.id === "software"))}>
            About the Division
          </button>
        </div>
      </section>

      <div className="divider" />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
