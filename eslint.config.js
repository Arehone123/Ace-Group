import { useEffect } from "react";
import { SERVICES } from "../data";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

/* ─────────────────────────────────────────────────
   EDUCATION PRODUCTS PAGE  (/education-products)
───────────────────────────────────────────────── */
export default function EducationProductsPage({ onNavigate, scrolled }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  return (
    <div className="page-enter">
      <Nav onNavigate={onNavigate} currentPage="education-products" scrolled={scrolled} />

      {/* HERO */}
      <section className="prod-hero">
        <div className="prod-hero-bg" style={{
          background: "radial-gradient(ellipse 70% 80% at 60% 30%, rgba(29,158,117,0.12) 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 15% 80%, rgba(29,158,117,0.06) 0%, transparent 50%), var(--dark)"
        }} />
        <div className="prod-hero-grid" />
        <div className="breadcrumb">
          <a onClick={() => onNavigate("home")}>Home</a>
          <span>/</span>
          <a onClick={() => onNavigate("division", null, SERVICES.find(s => s.id === "education"))}>Education</a>
          <span>/</span>
          <span style={{ color: "var(--text-primary)" }}>Products</span>
        </div>
        <div className="div-hero-eyebrow">Ace the Academia · Education Products</div>
        <h1 className="div-hero-title">
          <span style={{ display: "block" }}>Learn.</span>
          <span style={{ display: "block" }}><em>Grow.</em></span>
          <span style={{ display: "block" }}>Excel.</span>
        </h1>
        <p className="div-hero-sub">
          From Grade 8 tutoring to professional bootcamps — every product we offer is designed to close the gap between where you are and where you want to be.
        </p>
      </section>

      <div className="prod-accent-green" />

      {/* PRODUCT OVERVIEW TILES */}
      <section style={{ padding: "6rem 4rem" }}>
        <div className="section-tag">Our Education Products</div>
        <h2 className="section-title" style={{ marginBottom: "3rem" }}>
          Two Paths.<br /><em>One Purpose.</em>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--border-dim)", border: "0.5px solid var(--border-dim)" }}>
          {[
            {
              icon: "📐",
              tag: "Grades 8–12",
              title: "Private Tutoring",
              desc: "One-on-one and small group sessions with expert tutors. Subject-specific support, exam preparation, and curriculum alignment — priced per grade.",
              cta: "View Tutoring Plans",
              page: "tutoring",
              color: "var(--green)",
            },
            {
              icon: "🤖",
              tag: "Live Online · 6 Weeks",
              title: "AI & Automation Bootcamp",
              desc: "Hands-on training in n8n, APIs, AI Agents, and Cloud Deployment. For professionals and students ready to build real automation systems.",
              cta: "View Bootcamp",
              page: "events",
              color: "var(--purple)",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{ background: "var(--dark-2)", padding: "4rem 3rem", cursor: "pointer", transition: "background 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--dark-3)"}
              onMouseLeave={e => e.currentTarget.style.background = "var(--dark-2)"}
              onClick={() => onNavigate(item.page)}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{item.icon}</div>
              <div style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: item.color, marginBottom: "0.8rem" }}>{item.tag}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 300, marginBottom: "1rem" }}>{item.title}</div>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>{item.desc}</p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", color: item.color }}>
                {item.cta} →
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
