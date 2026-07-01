import { useState, useEffect } from "react";
import { TUTORING_GRADES, TUTORING_SUBJECTS } from "../data";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import QuoteModal from "../components/QuoteModal";

/* ─────────────────────────────────────────────────
   TUTORING PAGE  (/tutoring)
───────────────────────────────────────────────── */
export default function TutoringPage({ onNavigate, scrolled }) {
  const [modal, setModal] = useState(null);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  const openEnroll = (grade, price) => {
    // In a real app this would link to a payment gateway with the grade + price
    setModal({ service: `Grade ${grade} Tutoring`, title: `Grade ${grade} Tutoring — R${price}/month`, grade, grades: true });
  };

  const openQuote = (grade) => {
    setModal({ service: `Grade ${grade} Tutoring — Custom Quote`, title: `Grade ${grade} Tutoring`, grade, grades: true });
  };

  return (
    <div className="page-enter">
      <Nav onNavigate={onNavigate} currentPage="tutoring" scrolled={scrolled} />
      {modal && <QuoteModal onClose={() => setModal(null)} context={modal} />}

      {/* HERO */}
      <section className="prod-hero">
        <div className="prod-hero-bg" style={{
          background: "radial-gradient(ellipse 70% 80% at 65% 25%, rgba(29,158,117,0.13) 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 10% 80%, rgba(201,151,58,0.05) 0%, transparent 50%), var(--dark)"
        }} />
        <div className="prod-hero-grid" />
        <div className="breadcrumb">
          <a onClick={() => onNavigate("home")}>Home</a>
          <span>/</span>
          <a onClick={() => onNavigate("education-products")}>Education Products</a>
          <span>/</span>
          <span style={{ color: "var(--text-primary)" }}>Tutoring</span>
        </div>
        <div className="div-hero-eyebrow">Ace the Academia · Private Tutoring</div>
        <h1 className="div-hero-title">
          <span style={{ display: "block" }}>Expert</span>
          <span style={{ display: "block" }}><em>Tutoring</em></span>
          <span style={{ display: "block" }}>Grades 8–12</span>
        </h1>
        <p className="div-hero-sub">
          Subject-focused, curriculum-aligned tutoring sessions that give learners the clarity, confidence, and competence to excel — from Grade 8 through to Matric.
        </p>
      </section>

      <div className="prod-accent-green" />

      {/* GRADES PRICING */}
      <section className="grades-section">
        <div className="section-tag">Choose Your Grade</div>
        <h2 className="section-title" style={{ marginBottom: "3rem" }}>
          Transparent Pricing.<br /><em>No Hidden Fees.</em>
        </h2>

        <div className="grades-grid">
          {TUTORING_GRADES.map(({ grade, price }) => (
            <div className="grade-card" key={grade}>
              <div className="grade-label">Grade</div>
              <div className="grade-number">{grade}</div>
              <div className="grade-price">
                <span style={{ fontSize: "1rem", verticalAlign: "top", lineHeight: "1.8", color: "var(--gold)" }}>R</span>
                {price.toLocaleString()}
              </div>
              <div className="grade-period">per month</div>
              <button className="grade-btn" onClick={() => openEnroll(grade, price)}>
                Enrol Now
              </button>
              <button className="grade-btn-ghost" onClick={() => openQuote(grade)}>
                Request a Quote
              </button>
            </div>
          ))}
        </div>

        {/* Subject list */}
        <div style={{ borderTop: "0.5px solid var(--border-dim)", paddingTop: "3rem" }}>
          <div className="section-tag">Subjects We Cover</div>
          <div className="subjects-cloud">
            {TUTORING_SUBJECTS.map(s => (
              <div className="subject-tag" key={s}>{s}</div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section style={{ padding: "6rem 4rem", background: "var(--dark-2)", borderTop: "0.5px solid var(--border-dim)", borderBottom: "0.5px solid var(--border-dim)" }}>
        <div className="section-tag">Every Plan Includes</div>
        <h2 className="section-title" style={{ marginBottom: "3rem", fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
          What You <em>Get</em>
        </h2>
        <div className="includes-grid">
          {[
            { icon: "📅", title: "Scheduled Weekly Sessions", text: "Consistent one-on-one or small group sessions on agreed days and times — via Zoom or in-person." },
            { icon: "📝", title: "Exam Preparation", text: "Past paper practice, memorandum walkthroughs, and exam strategy coaching aligned to the CAPS curriculum." },
            { icon: "📊", title: "Progress Reports", text: "Monthly written feedback highlighting strengths, improvement areas, and recommended focus topics." },
            { icon: "💬", title: "WhatsApp Support", text: "Quick-answer support between sessions for homework questions and concept clarification." },
            { icon: "📚", title: "Study Materials", text: "Curated notes, summaries, and practice exercises tailored to the learner's current syllabus topics." },
            { icon: "🏆", title: "Goal-Oriented Tracking", text: "Target grades are set at enrolment and tracked monthly to keep learners and parents informed." },
          ].map((item) => (
            <div className="include-item" key={item.title}>
              <div className="include-icon">{item.icon}</div>
              <div className="include-title">{item.title}</div>
              <div className="include-text">{item.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="steps-section">
        <div className="section-tag">How It Works</div>
        <h2 className="section-title" style={{ marginBottom: "3rem", fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
          Start in <em>Four Steps</em>
        </h2>
        <div className="steps-grid">
          {[
            { title: "Choose Your Grade", text: "Select the grade and preferred subjects. Not sure? Request a quote and we'll guide you." },
            { title: "Pay & Confirm", text: "Complete payment via our secure gateway. Receive your confirmation within 24 hours." },
            { title: "Meet Your Tutor", text: "We match you with a subject-specialist tutor and schedule your first session." },
            { title: "Start Learning", text: "Attend your first session. We hit the ground running with a diagnostic and study plan." },
          ].map((s, i) => (
            <div className="step-item" key={i}>
              <div className="step-num">0{i + 1}</div>
              <div className="step-title">{s.title}</div>
              <div className="step-text">{s.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* QUOTE FORM + CONTACT INFO */}
      <section className="quote-form-section">
        <div className="section-tag">Custom Requirements?</div>
        <h2 className="section-title" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", marginBottom: "3rem" }}>
          Request a <em>Tailored Quote</em>
        </h2>
        <div className="quote-form-inner">
          <div>
            <p style={{ fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.85, marginBottom: "1.5rem" }}>
              Need tutoring for multiple subjects, a group of learners, or an irregular schedule? Fill in the form and we'll put together a custom proposal within 24 hours.
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
              You can also reach us directly via WhatsApp for a faster response:
            </p>
            <a
              href="https://wa.me/27739298456?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20tutoring%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn"
            >
              📱 WhatsApp: 073 929 8456
            </a>
            <div style={{ marginTop: "2rem", padding: "1.5rem", border: "0.5px solid var(--border-dim)", background: "var(--dark-2)" }}>
              <div style={{ fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.8rem" }}>Also Available</div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.8 }}>
                📧 <strong style={{ color: "var(--text-primary)" }}>4148924@myuwc.ac.za</strong><br />
                We respond to all email enquiries within 24 hours on business days.
              </div>
            </div>
          </div>
          <form className="quote-form" onSubmit={(e) => { e.preventDefault(); setModal({ title: "Quote submitted!", service: "Tutoring" }); }}>
            <div className="form-row">
              <input type="text" placeholder="Learner's Name *" required />
              <input type="text" placeholder="Parent / Guardian Name" />
            </div>
            <input type="email" placeholder="Email Address *" required />
            <input type="tel" placeholder="WhatsApp / Phone *" required />
            <select required>
              <option value="" disabled selected>Select Grade *</option>
              {[8, 9, 10, 11, 12].map(g => <option key={g} value={g}>Grade {g}</option>)}
            </select>
            <input type="text" placeholder="Subjects Required (e.g. Maths, Science)" />
            <textarea placeholder="Any specific needs, preferred schedule, or questions?" />
            <button type="submit" className="btn-green">Submit Quote Request</button>
          </form>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="register-section" style={{ background: "var(--dark-2)", borderTop: "0.5px solid var(--border-dim)" }}>
        <div className="section-tag" style={{ justifyContent: "center" }}>Grades 8–12 · CAPS Aligned</div>
        <h2 className="cta-title">
          Ready to <em>Start?</em>
        </h2>
        <p className="cta-sub">Enrol today and your learner's first session is just a payment away. Spots are limited per tutor.</p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-green" onClick={() => setModal({ service: "Tutoring Enquiry", grades: true })}>Enrol Now</button>
          <button className="btn-ghost" onClick={() => onNavigate("education-products")}>All Products</button>
        </div>
      </section>

      <div className="divider" />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
