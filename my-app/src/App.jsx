import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Outfit:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --gold: #C9973A;
    --gold-light: #E8B96A;
    --gold-dim: #7A5A1E;
    --dark: #080A0F;
    --dark-2: #0F1219;
    --dark-3: #161B26;
    --dark-4: #1E2535;
    --text-primary: #F0EDE6;
    --text-muted: #8A8A96;
    --border: rgba(201, 151, 58, 0.18);
    --border-dim: rgba(255,255,255,0.06);
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--dark);
    color: var(--text-primary);
    font-family: 'Outfit', sans-serif;
    font-weight: 300;
    line-height: 1.7;
    overflow-x: hidden;
  }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.25rem 4rem;
    transition: background 0.4s, backdrop-filter 0.4s;
  }
  .nav.scrolled {
    background: rgba(8, 10, 15, 0.88);
    backdrop-filter: blur(18px);
    border-bottom: 0.5px solid var(--border);
  }
  .nav-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: var(--text-primary);
    text-decoration: none;
  }
  .nav-logo span { color: var(--gold); }
  .nav-links { display: flex; gap: 2.5rem; list-style: none; }
  .nav-links a {
    font-size: 0.82rem;
    font-weight: 400;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-muted);
    text-decoration: none;
    transition: color 0.3s;
  }
  .nav-links a:hover { color: var(--gold-light); }
  .nav-cta {
    font-size: 0.78rem;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--dark);
    background: var(--gold);
    border: none;
    padding: 0.65rem 1.6rem;
    cursor: pointer;
    transition: background 0.3s;
    text-decoration: none;
  }
  .nav-cta:hover { background: var(--gold-light); }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex; flex-direction: column; justify-content: flex-end;
    padding: 0 4rem 6rem;
    position: relative;
    overflow: hidden;
  }
  .hero-bg {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 60% 80% at 70% 40%, rgba(201,151,58,0.07) 0%, transparent 60%),
      radial-gradient(ellipse 40% 60% at 20% 80%, rgba(201,151,58,0.04) 0%, transparent 50%),
      var(--dark);
  }
  .hero-grid {
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(201,151,58,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,151,58,0.04) 1px, transparent 1px);
    background-size: 80px 80px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 80%);
  }
  .hero-tag {
    position: relative;
    display: inline-flex; align-items: center; gap: 0.6rem;
    font-size: 0.72rem; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 2rem;
    animation: fadeUp 1s ease both;
  }
  .hero-tag::before {
    content: ''; display: block; width: 28px; height: 1px; background: var(--gold);
  }
  .hero-title {
    position: relative;
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(3.5rem, 9vw, 8rem);
    font-weight: 300;
    line-height: 0.95;
    letter-spacing: -0.02em;
    margin-bottom: 2.5rem;
    animation: fadeUp 1s 0.15s ease both;
  }
  .hero-title em { font-style: italic; color: var(--gold-light); }
  .hero-title .block { display: block; }
  .hero-sub {
    position: relative;
    font-size: 1rem;
    font-weight: 300;
    color: var(--text-muted);
    max-width: 480px;
    margin-bottom: 3rem;
    animation: fadeUp 1s 0.3s ease both;
  }
  .hero-actions {
    position: relative;
    display: flex; gap: 1.2rem; align-items: center;
    animation: fadeUp 1s 0.45s ease both;
  }
  .btn-primary {
    font-family: 'Outfit', sans-serif;
    font-size: 0.8rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--dark); background: var(--gold);
    border: none; padding: 1rem 2.4rem; cursor: pointer;
    transition: background 0.3s, transform 0.2s;
    text-decoration: none; display: inline-block;
  }
  .btn-primary:hover { background: var(--gold-light); transform: translateY(-1px); }
  .btn-ghost {
    font-family: 'Outfit', sans-serif;
    font-size: 0.8rem; font-weight: 400; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--text-muted);
    border: 0.5px solid rgba(255,255,255,0.15);
    padding: 1rem 2.4rem; cursor: pointer;
    background: transparent; transition: color 0.3s, border-color 0.3s;
    text-decoration: none; display: inline-block;
  }
  .btn-ghost:hover { color: var(--text-primary); border-color: rgba(255,255,255,0.35); }
  .hero-scroll {
    position: absolute; right: 4rem; bottom: 4rem;
    display: flex; flex-direction: column; align-items: center; gap: 0.6rem;
    font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text-muted);
    writing-mode: vertical-lr;
    animation: fadeUp 1s 0.6s ease both;
  }
  .hero-scroll::after {
    content: ''; width: 1px; height: 60px;
    background: linear-gradient(to bottom, var(--gold), transparent);
    animation: pulse 2s infinite;
  }

  /* DIVIDER */
  .divider {
    width: 100%; height: 0.5px;
    background: linear-gradient(90deg, transparent, var(--gold-dim), transparent);
    margin: 0;
  }

  /* STATS BAR */
  .stats-bar {
    display: flex; justify-content: space-between;
    padding: 3.5rem 4rem;
    border-bottom: 0.5px solid var(--border-dim);
  }
  .stat-item { text-align: center; }
  .stat-number {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3rem; font-weight: 300; color: var(--gold-light); line-height: 1;
  }
  .stat-label {
    font-size: 0.72rem; letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--text-muted); margin-top: 0.4rem;
  }

  /* SERVICES */
  .section { padding: 7rem 4rem; }
  .section-tag {
    font-size: 0.72rem; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 1.2rem;
    display: flex; align-items: center; gap: 0.6rem;
  }
  .section-tag::before { content: ''; display: block; width: 20px; height: 1px; background: var(--gold); }
  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 4vw, 3.6rem);
    font-weight: 300; line-height: 1.1; letter-spacing: -0.01em;
    margin-bottom: 5rem;
  }
  .section-title em { font-style: italic; color: var(--gold-light); }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1px;
    background: var(--border-dim);
    border: 0.5px solid var(--border-dim);
  }
  .service-card {
    background: var(--dark-2);
    padding: 3rem 2.5rem;
    position: relative; overflow: hidden;
    transition: background 0.4s;
    cursor: default;
  }
  .service-card:hover { background: var(--dark-3); }
  .service-card::before {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--gold), transparent);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.5s ease;
  }
  .service-card:hover::before { transform: scaleX(1); }
  .service-number {
    font-family: 'Cormorant Garamond', serif;
    font-size: 4rem; font-weight: 300;
    color: rgba(201,151,58,0.12); line-height: 1;
    position: absolute; top: 1.5rem; right: 2rem;
    transition: color 0.4s;
  }
  .service-card:hover .service-number { color: rgba(201,151,58,0.22); }
  .service-icon {
    width: 48px; height: 48px;
    border: 0.5px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.8rem; color: var(--gold); font-size: 1.4rem;
    transition: border-color 0.4s, background 0.4s;
  }
  .service-card:hover .service-icon {
    border-color: var(--gold);
    background: rgba(201,151,58,0.08);
  }
  .service-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem; font-weight: 400; letter-spacing: 0.01em;
    margin-bottom: 0.8rem;
  }
  .service-desc {
    font-size: 0.875rem; color: var(--text-muted); line-height: 1.75;
  }
  .service-link {
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--gold); margin-top: 2rem; cursor: pointer;
    transition: gap 0.3s;
  }
  .service-link:hover { gap: 0.8rem; }

  /* ABOUT */
  .about-section {
    padding: 7rem 4rem;
    background: var(--dark-2);
    border-top: 0.5px solid var(--border-dim);
    border-bottom: 0.5px solid var(--border-dim);
    display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center;
  }
  .about-visual {
    position: relative;
  }
  .about-emblem {
    width: 320px; height: 320px;
    border: 0.5px solid var(--border);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    position: relative;
    margin: 0 auto;
  }
  .about-emblem::before {
    content: '';
    position: absolute; inset: 12px;
    border: 0.5px solid rgba(201,151,58,0.1);
    border-radius: 50%;
  }
  .about-emblem-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 5rem; font-weight: 300;
    color: var(--gold); letter-spacing: 0.05em;
  }
  .about-badge {
    position: absolute; bottom: 20px; right: 20px;
    background: var(--dark-3); border: 0.5px solid var(--border);
    padding: 1rem 1.5rem;
  }
  .about-badge-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.5rem; font-weight: 300; color: var(--gold-light); line-height: 1;
  }
  .about-badge-lbl {
    font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--text-muted);
  }
  .about-content p {
    font-size: 1rem; color: var(--text-muted); line-height: 1.85; margin-bottom: 1.2rem;
  }
  .about-content p strong { color: var(--text-primary); font-weight: 500; }
  .sa-flag {
    display: flex; gap: 6px; align-items: center; margin-top: 2rem;
  }
  .sa-stripe { height: 4px; border-radius: 2px; }

  /* CTA */
  .cta-section {
    padding: 8rem 4rem;
    text-align: center;
    position: relative; overflow: hidden;
  }
  .cta-section::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 50% 100% at 50% 50%, rgba(201,151,58,0.06) 0%, transparent 70%);
    pointer-events: none;
  }
  .cta-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.2rem, 5vw, 4.5rem);
    font-weight: 300; line-height: 1.1; margin-bottom: 1.5rem;
  }
  .cta-sub {
    font-size: 1rem; color: var(--text-muted); max-width: 480px;
    margin: 0 auto 3rem;
  }

  /* FOOTER */
  .footer {
    border-top: 0.5px solid var(--border-dim);
    padding: 3rem 4rem;
    display: flex; justify-content: space-between; align-items: center;
  }
  .footer-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem; font-weight: 600; letter-spacing: 0.08em;
  }
  .footer-logo span { color: var(--gold); }
  .footer-copy { font-size: 0.78rem; color: var(--text-muted); }
  .footer-links { display: flex; gap: 2rem; }
  .footer-links a {
    font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--text-muted); text-decoration: none; transition: color 0.3s;
  }
  .footer-links a:hover { color: var(--gold-light); }

  /* ANIMATIONS */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.3; }
  }
    /* CONTACT FORM */
  .contact-form { max-width: 700px; margin: 0 auto; display: grid; gap: 1rem; }
  .contact-form input, .contact-form textarea {
    background: var(--dark-3);
    border: 1px solid var(--border-dim);
    padding: 1rem;
    color: white;
    font-family: 'Outfit', sans-serif;
  }
  .contact-form textarea { min-height: 140px; }

  /* FOOTER */
  .footer { border-top: 0.5px solid var(--border-dim); padding: 3rem 4rem; display: flex; flex-direction: column; gap: 2rem; }
  .footer-top { display: flex; justify-content: space-between; align-items: center; }
  .footer-logo { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; }
  .footer-social { display: flex; gap: 1.5rem; }
  .footer-social a { color: var(--text-muted); text-decoration: none; font-size: 0.8rem; }
  .footer-social a:hover { color: var(--gold-light); }
  .footer-bottom { display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); }

  @media (max-width: 768px) {
    .nav { padding: 1rem 1.5rem; }
    .nav-links { display: none; }
    .section, .cta-section { padding: 4rem 1.5rem; }
    .about-section { grid-template-columns: 1fr; padding: 4rem 1.5rem; }
    .footer-top, .footer-bottom { flex-direction: column; gap: 1rem; text-align: center; }
  }

  /* MOBILE */
  @media (max-width: 768px) {
    .nav { padding: 1rem 1.5rem; }
    .nav-links, .nav-cta { display: none; }
    .hero { padding: 0 1.5rem 4rem; }
    .stats-bar { padding: 2rem 1.5rem; gap: 0; }
    .section, .cta-section { padding: 4rem 1.5rem; }
    .about-section { grid-template-columns: 1fr; padding: 4rem 1.5rem; gap: 3rem; }
    .footer { flex-direction: column; gap: 1.5rem; text-align: center; padding: 2rem 1.5rem; }
    .hero-scroll { display: none; }
  }
`;

const SERVICES = [
  {
    number: "01",
    icon: "🎓",
    name: "Education",
    desc: "Delivering transformative learning experiences across South Africa. We partner with institutions and learners to bridge knowledge gaps and empower communities through quality education.",
  },
  {
    number: "02",
    icon: "💻",
    name: "Software Development",
    desc: "Building bespoke software solutions from concept to deployment. Our engineers craft scalable, high-performance applications tailored to the unique needs of African and global markets.",
  },
  {
    number: "03",
    icon: "🤖",
    name: "AI & Automation Engineering",
    desc: "Harnessing the power of artificial intelligence to automate processes, enhance decision-making, and unlock new value across industries. Future-ready systems built for today.",
  },
  {
    number: "04",
    icon: "🚗",
    name: "eHailing & Transportation",
    desc: "Modernising mobility across South Africa. Our transport solutions connect drivers and passengers through intelligent, reliable, and affordable eHailing technology.",
  },
  {
    number: "05",
    icon: "📱",
    name: "Educational Technology",
    desc: "Where education meets innovation. We develop EdTech platforms that make learning accessible, engaging, and measurable — powering the next generation of digital learners.",
  },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <a href="#home" className="nav-logo">
          ACE <span>GROUP</span>
        </a>
        <ul className="nav-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#contact" className="nav-cta">Get in Touch</a>
      </nav>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />

        <div className="hero-tag">South Africa · Est. 2024</div>

        <h1 className="hero-title">
          <span className="block">Building</span>
          <span className="block"><em>Tomorrow's</em></span>
          <span className="block">Africa</span>
        </h1>

        <p className="hero-sub">
          A diversified group of companies driving innovation across Education,
          Technology, AI and Transportation — rooted in South Africa, built for the world.
        </p>

        <div className="hero-actions">
          <a href="#services" className="btn-primary">Our Divisions</a>
          <a href="#about" className="btn-ghost">Learn More</a>
        </div>

        <div className="hero-scroll">Scroll</div>
      </section>

      <div className="divider" />

      {/* STATS */}
      <div className="stats-bar">
        {[
          { number: "5", label: "Business Divisions" },
          { number: "1", label: "Country · South Africa" },
          { number: "∞", label: "Growth Potential" },
          { number: "24/7", label: "Innovation Drive" },
        ].map((s) => (
          <div className="stat-item" key={s.label}>
            <div className="stat-number">{s.number}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* SERVICES */}
      <section id="services" className="section">
        <div className="section-tag">What We Do</div>
        <h2 className="section-title">
          Five Divisions.<br /><em>One Vision.</em>
        </h2>
        <div className="services-grid">
          {SERVICES.map((s) => (
            <div className="service-card" key={s.number}>
              <div className="service-number">{s.number}</div>
              <div className="service-icon">{s.icon}</div>
              <h3 className="service-name">{s.name}</h3>
              <p className="service-desc">{s.desc}</p>
              <div className="service-link">
                Learn More <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about-section">
        <div className="about-visual">
          <div className="about-emblem">
            <div className="about-emblem-text">AG</div>
            <div className="about-badge">
              <div className="about-badge-num">SA</div>
              <div className="about-badge-lbl">Based · Proudly</div>
            </div>
          </div>
        </div>
        <div className="about-content">
          <div className="section-tag">About Ace Group</div>
          <h2 className="section-title" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", marginBottom: "2rem" }}>
            A Group Built on<br /><em>Purpose & Precision</em>
          </h2>
          <p>
            <strong>Ace Group of Companies</strong> is a proudly South African multi-sector conglomerate
            on a mission to accelerate progress across the continent. We believe that
            education, technology, and mobility are the three pillars of a thriving Africa.
          </p>
          <p>
            From classrooms to codebases, from AI models to eHailing platforms, every
            division of Ace Group is designed to solve real problems for real people —
            with <strong>excellence, integrity, and ambition</strong> at our core.
          </p>
          <p>
            Headquartered in South Africa, we are expanding our footprint across the
            continent, bringing world-class solutions to markets that need them most.
          </p>
          <div className="sa-flag">
            <div className="sa-stripe" style={{ width: 32, background: "#007A4D" }} />
            <div className="sa-stripe" style={{ width: 32, background: "#FFB612" }} />
            <div className="sa-stripe" style={{ width: 32, background: "#DE3831" }} />
            <div className="sa-stripe" style={{ width: 32, background: "#002395" }} />
            <div className="sa-stripe" style={{ width: 32, background: "#FFFFFF" }} />
            <span style={{ fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)", marginLeft: "0.5rem" }}>
              Proudly South African
            </span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="cta-section">
        <div className="section-tag" style={{ justifyContent: "center" }}>Let's Connect</div>
        <h2 className="cta-title">
          Ready to Build<br /><em>Something Great?</em>
        </h2>
        <p className="cta-sub">
          Whether you're a partner, investor, or client — we'd love to hear from you.
          Let's create impact together across Africa and beyond.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="mailto:4148924@myuwc.ac.za" className="btn-primary">Contact Us</a>
          <a href="#services" className="btn-ghost">View Services</a>
        </div>
      </section>

      
      <section id="contact" className="cta-section">
        <div className="section-tag" style={{ justifyContent: "center" }}>Reach Out</div>
        <h2 className="cta-title">Let's Work Together</h2>
        <p className="cta-sub">Send us a message and we’ll get back to you.</p>

        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required />
          <button type="submit" className="btn-primary">Send Message</button>
        </form>
      </section>

      <footer className="footer">
        <div className="footer-top">
          <div className="footer-logo">ACE <span>GROUP</span></div>
          <div className="footer-social">
            <a href="#">LinkedIn</a>
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">Twitter/X</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Ace Group of Companies</span>
          <span>South Africa</span>
        </div>
      </footer>
    </>
  );
}