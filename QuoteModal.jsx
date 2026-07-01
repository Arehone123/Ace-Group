export const styles = `
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
    --purple: #7C3AED;
    --purple-light: #A78BFA;
    --purple-dim: rgba(124,58,237,0.15);
    --green: #1D9E75;
    --green-light: #34D399;
    --green-dim: rgba(29,158,117,0.15);
    --blue: #378ADE;
    --blue-light: #60A5FA;
    --blue-dim: rgba(55,138,221,0.15);
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

  /* ── NAV ── */
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
    font-size: 1.6rem; font-weight: 600; letter-spacing: 0.08em;
    color: var(--text-primary); text-decoration: none; cursor: pointer;
  }
  .nav-logo span { color: var(--gold); }
  .nav-links { display: flex; gap: 2.5rem; list-style: none; }
  .nav-links a {
    font-size: 0.82rem; font-weight: 400; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--text-muted); text-decoration: none; transition: color 0.3s; cursor: pointer;
  }
  .nav-links a:hover, .nav-links a.active { color: var(--gold-light); }
  .nav-cta {
    font-size: 0.78rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--dark); background: var(--gold); border: none;
    padding: 0.65rem 1.6rem; cursor: pointer; transition: background 0.3s; text-decoration: none;
  }
  .nav-cta:hover { background: var(--gold-light); }

  /* ── HERO ── */
  .hero {
    min-height: 100vh; display: flex; flex-direction: column; justify-content: flex-end;
    padding: 0 4rem 6rem; position: relative; overflow: hidden;
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
    background-image: linear-gradient(rgba(201,151,58,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,151,58,0.04) 1px, transparent 1px);
    background-size: 80px 80px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 80%);
  }
  .hero-tag {
    position: relative; display: inline-flex; align-items: center; gap: 0.6rem;
    font-size: 0.72rem; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 2rem; animation: fadeUp 1s ease both;
  }
  .hero-tag::before { content: ''; display: block; width: 28px; height: 1px; background: var(--gold); }
  .hero-title {
    position: relative; font-family: 'Cormorant Garamond', serif;
    font-size: clamp(3.5rem, 9vw, 8rem); font-weight: 300; line-height: 0.95;
    letter-spacing: -0.02em; margin-bottom: 2.5rem; animation: fadeUp 1s 0.15s ease both;
  }
  .hero-title em { font-style: italic; color: var(--gold-light); }
  .hero-title .block { display: block; }
  .hero-sub {
    position: relative; font-size: 1rem; font-weight: 300; color: var(--text-muted);
    max-width: 480px; margin-bottom: 3rem; animation: fadeUp 1s 0.3s ease both;
  }
  .hero-actions {
    position: relative; display: flex; gap: 1.2rem; align-items: center;
    animation: fadeUp 1s 0.45s ease both;
  }
  .btn-primary {
    font-family: 'Outfit', sans-serif; font-size: 0.8rem; font-weight: 500;
    letter-spacing: 0.14em; text-transform: uppercase; color: var(--dark); background: var(--gold);
    border: none; padding: 1rem 2.4rem; cursor: pointer; transition: background 0.3s, transform 0.2s;
    text-decoration: none; display: inline-block;
  }
  .btn-primary:hover { background: var(--gold-light); transform: translateY(-1px); }
  .btn-ghost {
    font-family: 'Outfit', sans-serif; font-size: 0.8rem; font-weight: 400;
    letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-muted);
    border: 0.5px solid rgba(255,255,255,0.15); padding: 1rem 2.4rem; cursor: pointer;
    background: transparent; transition: color 0.3s, border-color 0.3s;
    text-decoration: none; display: inline-block;
  }
  .btn-ghost:hover { color: var(--text-primary); border-color: rgba(255,255,255,0.35); }
  .hero-scroll {
    position: absolute; right: 4rem; bottom: 4rem;
    display: flex; flex-direction: column; align-items: center; gap: 0.6rem;
    font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text-muted);
    writing-mode: vertical-lr; animation: fadeUp 1s 0.6s ease both;
  }
  .hero-scroll::after {
    content: ''; width: 1px; height: 60px;
    background: linear-gradient(to bottom, var(--gold), transparent);
    animation: pulse 2s infinite;
  }

  /* ── DIVIDER ── */
  .divider {
    width: 100%; height: 0.5px;
    background: linear-gradient(90deg, transparent, var(--gold-dim), transparent);
  }

  /* ── STATS ── */
  .stats-bar {
    display: flex; justify-content: space-between; padding: 3.5rem 4rem;
    border-bottom: 0.5px solid var(--border-dim);
  }
  .stat-item { text-align: center; }
  .stat-number {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3rem; font-weight: 300; color: var(--gold-light); line-height: 1;
  }
  .stat-label { font-size: 0.72rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--text-muted); margin-top: 0.4rem; }

  /* ── SECTION COMMONS ── */
  .section { padding: 7rem 4rem; }
  .section-tag {
    font-size: 0.72rem; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 1.2rem; display: flex; align-items: center; gap: 0.6rem;
  }
  .section-tag::before { content: ''; display: block; width: 20px; height: 1px; background: var(--gold); }
  .section-title {
    font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem, 4vw, 3.6rem);
    font-weight: 300; line-height: 1.1; letter-spacing: -0.01em; margin-bottom: 5rem;
  }
  .section-title em { font-style: italic; color: var(--gold-light); }

  /* ── SERVICES GRID ── */
  .services-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1px; background: var(--border-dim); border: 0.5px solid var(--border-dim);
  }
  .service-card {
    background: var(--dark-2); padding: 3rem 2.5rem; position: relative; overflow: hidden;
    transition: background 0.4s; cursor: pointer;
  }
  .service-card:hover { background: var(--dark-3); }
  .service-card::before {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--gold), transparent);
    transform: scaleX(0); transform-origin: left; transition: transform 0.5s ease;
  }
  .service-card:hover::before { transform: scaleX(1); }
  .service-number {
    font-family: 'Cormorant Garamond', serif; font-size: 4rem; font-weight: 300;
    color: rgba(201,151,58,0.12); line-height: 1; position: absolute; top: 1.5rem; right: 2rem;
    transition: color 0.4s;
  }
  .service-card:hover .service-number { color: rgba(201,151,58,0.22); }
  .service-icon {
    width: 48px; height: 48px; border: 0.5px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.8rem; color: var(--gold); font-size: 1.4rem;
    transition: border-color 0.4s, background 0.4s;
  }
  .service-card:hover .service-icon { border-color: var(--gold); background: rgba(201,151,58,0.08); }
  .service-name {
    font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 400;
    letter-spacing: 0.01em; margin-bottom: 0.8rem;
  }
  .service-desc { font-size: 0.875rem; color: var(--text-muted); line-height: 1.75; }
  .service-link {
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--gold); margin-top: 2rem; cursor: pointer; transition: gap 0.3s;
  }
  .service-link:hover { gap: 0.8rem; }

  /* ── ABOUT ── */
  .about-section {
    padding: 7rem 4rem; background: var(--dark-2);
    border-top: 0.5px solid var(--border-dim); border-bottom: 0.5px solid var(--border-dim);
    display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center;
  }
  .about-emblem {
    width: 320px; height: 320px; border: 0.5px solid var(--border); border-radius: 50%;
    display: flex; align-items: center; justify-content: center; position: relative; margin: 0 auto;
  }
  .about-emblem::before {
    content: ''; position: absolute; inset: 12px; border: 0.5px solid rgba(201,151,58,0.1); border-radius: 50%;
  }
  .about-emblem-text {
    font-family: 'Cormorant Garamond', serif; font-size: 5rem; font-weight: 300; color: var(--gold); letter-spacing: 0.05em;
  }
  .about-badge {
    position: absolute; bottom: 20px; right: 20px;
    background: var(--dark-3); border: 0.5px solid var(--border); padding: 1rem 1.5rem;
  }
  .about-badge-num { font-family: 'Cormorant Garamond', serif; font-size: 2.5rem; font-weight: 300; color: var(--gold-light); line-height: 1; }
  .about-badge-lbl { font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--text-muted); }
  .about-content p { font-size: 1rem; color: var(--text-muted); line-height: 1.85; margin-bottom: 1.2rem; }
  .about-content p strong { color: var(--text-primary); font-weight: 500; }
  .sa-flag { display: flex; gap: 6px; align-items: center; margin-top: 2rem; }
  .sa-stripe { height: 4px; border-radius: 2px; }

  /* ── CTA ── */
  .cta-section {
    padding: 8rem 4rem; text-align: center; position: relative; overflow: hidden;
  }
  .cta-section::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse 50% 100% at 50% 50%, rgba(201,151,58,0.06) 0%, transparent 70%);
    pointer-events: none;
  }
  .cta-title {
    font-family: 'Cormorant Garamond', serif; font-size: clamp(2.2rem, 5vw, 4.5rem);
    font-weight: 300; line-height: 1.1; margin-bottom: 1.5rem;
  }
  .cta-sub { font-size: 1rem; color: var(--text-muted); max-width: 480px; margin: 0 auto 3rem; }

  /* ── CONTACT FORM ── */
  .contact-form { max-width: 700px; margin: 0 auto; display: grid; gap: 1rem; }
  .contact-form input, .contact-form textarea, .contact-form select {
    background: var(--dark-3); border: 1px solid var(--border-dim);
    padding: 1rem; color: white; font-family: 'Outfit', sans-serif; font-size: 0.9rem;
    outline: none; transition: border-color 0.3s; width: 100%;
  }
  .contact-form input:focus, .contact-form textarea:focus, .contact-form select:focus { border-color: var(--gold); }
  .contact-form textarea { min-height: 140px; resize: vertical; }
  .contact-form select { appearance: none; cursor: pointer; }
  .contact-form select option { background: var(--dark-3); }

  /* ── FOOTER ── */
  .footer { border-top: 0.5px solid var(--border-dim); padding: 3rem 4rem; display: flex; flex-direction: column; gap: 2rem; }
  .footer-top { display: flex; justify-content: space-between; align-items: flex-start; }
  .footer-logo { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 600; letter-spacing: 0.08em; cursor: pointer; }
  .footer-logo span { color: var(--gold); }
  .footer-social { display: flex; gap: 1.5rem; }
  .footer-social a { color: var(--text-muted); text-decoration: none; font-size: 0.8rem; letter-spacing: 0.1em; transition: color 0.3s; }
  .footer-social a:hover { color: var(--gold-light); }
  .footer-links { display: flex; gap: 1.5rem; flex-wrap: wrap; }
  .footer-links a { color: var(--text-muted); text-decoration: none; font-size: 0.75rem; letter-spacing: 0.1em; transition: color 0.3s; cursor: pointer; }
  .footer-links a:hover { color: var(--gold-light); }
  .footer-bottom { display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: var(--text-muted); flex-wrap: wrap; gap: 1rem; }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.3; }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .page-enter { animation: fadeIn 0.5s ease both; }

  /* ═══════════════════════════════
     DIVISION PAGE STYLES
  ═══════════════════════════════ */
  .div-hero {
    min-height: 80vh; display: flex; flex-direction: column; justify-content: flex-end;
    padding: 0 4rem 5rem; position: relative; overflow: hidden;
  }
  .div-hero-bg { position: absolute; inset: 0; }
  .div-hero-grid {
    position: absolute; inset: 0; pointer-events: none;
    background-image: linear-gradient(rgba(201,151,58,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,151,58,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  .div-back {
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--text-muted); cursor: pointer; transition: color 0.3s;
    margin-bottom: 3rem; position: relative;
  }
  .div-back:hover { color: var(--gold-light); }
  .div-hero-eyebrow {
    position: relative; display: inline-flex; align-items: center; gap: 0.6rem;
    font-size: 0.72rem; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 1.5rem;
  }
  .div-hero-eyebrow::before { content: ''; display: block; width: 28px; height: 1px; background: var(--gold); }
  .div-hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(3rem, 8vw, 7rem); font-weight: 300; line-height: 0.95;
    letter-spacing: -0.02em; margin-bottom: 2rem; position: relative;
    animation: fadeUp 0.8s ease both;
  }
  .div-hero-title em { font-style: italic; color: var(--gold-light); }
  .div-hero-sub {
    position: relative; font-size: 1.05rem; color: var(--text-muted); max-width: 560px;
    line-height: 1.8; animation: fadeUp 0.8s 0.15s ease both;
  }
  .div-accent { height: 3px; width: 100%; background: linear-gradient(90deg, var(--gold), rgba(201,151,58,0.1) 60%, transparent); }
  .div-overview { padding: 6rem 4rem; display: grid; grid-template-columns: 1fr 1.4fr; gap: 6rem; align-items: start; }
  .div-big-number { font-family: 'Cormorant Garamond', serif; font-size: 9rem; font-weight: 300; color: rgba(201,151,58,0.1); line-height: 1; letter-spacing: -0.04em; margin-bottom: 1.5rem; }
  .div-overview-right p { font-size: 1rem; color: var(--text-muted); line-height: 1.9; margin-bottom: 1.4rem; }
  .div-overview-right p strong { color: var(--text-primary); font-weight: 500; }
  .div-pillars { padding: 0 4rem 6rem; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border-dim); border: 0.5px solid var(--border-dim); }
  .div-pillar { background: var(--dark-2); padding: 2.5rem 2rem; position: relative; transition: background 0.3s; }
  .div-pillar:hover { background: var(--dark-3); }
  .div-pillar-icon { font-size: 2rem; margin-bottom: 1.2rem; display: block; }
  .div-pillar-title { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 400; margin-bottom: 0.7rem; }
  .div-pillar-text { font-size: 0.85rem; color: var(--text-muted); line-height: 1.75; }
  .div-offerings { padding: 6rem 4rem; background: var(--dark-2); border-top: 0.5px solid var(--border-dim); border-bottom: 0.5px solid var(--border-dim); }
  .div-offerings-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0; }
  .div-offering-item { padding: 2rem 0; border-bottom: 0.5px solid var(--border-dim); display: flex; align-items: flex-start; gap: 1.2rem; padding-right: 3rem; }
  .div-offering-item:nth-child(odd) { padding-right: 3rem; border-right: 0.5px solid var(--border-dim); }
  .div-offering-item:nth-child(even) { padding-left: 3rem; }
  .div-offering-num { font-family: 'Cormorant Garamond', serif; font-size: 1rem; color: var(--gold); font-weight: 400; letter-spacing: 0.05em; flex-shrink: 0; padding-top: 0.15rem; }
  .div-offering-title { font-size: 0.95rem; font-weight: 500; margin-bottom: 0.3rem; }
  .div-offering-text { font-size: 0.83rem; color: var(--text-muted); line-height: 1.7; }
  .div-stats { display: grid; grid-template-columns: repeat(4, 1fr); border-bottom: 0.5px solid var(--border-dim); }
  .div-stat { padding: 3rem 2rem; text-align: center; border-right: 0.5px solid var(--border-dim); }
  .div-stat:last-child { border-right: none; }
  .div-stat-num { font-family: 'Cormorant Garamond', serif; font-size: 2.8rem; font-weight: 300; color: var(--gold-light); line-height: 1; margin-bottom: 0.5rem; }
  .div-stat-lbl { font-size: 0.72rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--text-muted); }
  .div-quote-section { padding: 7rem 4rem; position: relative; overflow: hidden; }
  .div-quote-section::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 50% 80% at 50% 50%, rgba(201,151,58,0.05) 0%, transparent 70%); pointer-events: none; }
  .div-quote { font-family: 'Cormorant Garamond', serif; font-size: clamp(1.6rem, 3.5vw, 3rem); font-weight: 300; font-style: italic; line-height: 1.3; text-align: center; max-width: 820px; margin: 0 auto; color: var(--text-primary); position: relative; }
  .div-quote::before { content: '"'; display: block; font-size: 8rem; color: rgba(201,151,58,0.15); line-height: 0.6; margin-bottom: 2rem; text-align: center; }
  .div-quote-attr { text-align: center; margin-top: 2rem; font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); }
  .div-related { padding: 6rem 4rem; }
  .div-related-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: var(--border-dim); }
  .div-related-card { background: var(--dark-2); padding: 2.5rem; cursor: pointer; transition: background 0.3s; display: flex; align-items: center; justify-content: space-between; }
  .div-related-card:hover { background: var(--dark-3); }
  .div-related-icon { font-size: 1.5rem; margin-bottom: 0.8rem; }
  .div-related-name { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 400; }
  .div-related-desc { font-size: 0.8rem; color: var(--text-muted); margin-top: 0.3rem; }
  .div-related-arrow { color: var(--gold); font-size: 1.5rem; opacity: 0.5; transition: opacity 0.3s, transform 0.3s; }
  .div-related-card:hover .div-related-arrow { opacity: 1; transform: translateX(4px); }

  /* ═══════════════════════════════
     EVENTS PAGE STYLES
  ═══════════════════════════════ */
  .events-hero {
    min-height: 60vh; display: flex; flex-direction: column; justify-content: flex-end;
    padding: 0 4rem 5rem; position: relative; overflow: hidden;
  }
  .events-hero-bg {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 60% 80% at 65% 30%, rgba(124,58,237,0.12) 0%, transparent 60%),
      radial-gradient(ellipse 40% 60% at 20% 80%, rgba(201,151,58,0.05) 0%, transparent 50%),
      var(--dark);
  }
  .events-grid-bg {
    position: absolute; inset: 0; pointer-events: none;
    background-image: linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 80%);
  }
  .events-accent { height: 3px; width: 100%; background: linear-gradient(90deg, var(--purple), rgba(124,58,237,0.1) 60%, transparent); }

  .events-section { padding: 6rem 4rem; }
  .event-featured {
    border: 0.5px solid var(--border-dim); background: var(--dark-2);
    position: relative; overflow: hidden; margin-bottom: 4rem;
  }
  .event-featured::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--purple), var(--gold), transparent);
  }
  .event-featured-inner {
    display: grid; grid-template-columns: 1fr 380px; gap: 0;
  }
  .event-main { padding: 3.5rem; }
  .event-badge {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: var(--purple-dim); border: 0.5px solid rgba(124,58,237,0.3);
    padding: 0.4rem 1rem; font-size: 0.68rem; letter-spacing: 0.18em;
    text-transform: uppercase; color: var(--purple-light); margin-bottom: 1.5rem;
  }
  .event-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--purple-light); animation: pulse 2s infinite; }
  .event-title {
    font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 300; line-height: 1.05; letter-spacing: -0.01em; margin-bottom: 0.5rem;
  }
  .event-title em { font-style: italic; color: var(--purple-light); }
  .event-subtitle { font-size: 0.85rem; color: var(--text-muted); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 1.5rem; }
  .event-tagline { font-size: 0.95rem; color: var(--text-muted); line-height: 1.8; margin-bottom: 2rem; max-width: 500px; }
  .event-meta { display: flex; flex-wrap: wrap; gap: 1.5rem; margin-bottom: 2.5rem; }
  .event-meta-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.82rem; color: var(--text-muted); }
  .event-meta-item strong { color: var(--text-primary); font-weight: 500; }
  .event-meta-icon { font-size: 1rem; }
  .event-includes { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 2.5rem; }
  .event-tag {
    font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--text-muted); border: 0.5px solid var(--border-dim);
    padding: 0.3rem 0.8rem;
  }
  .event-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
  .btn-purple {
    font-family: 'Outfit', sans-serif; font-size: 0.8rem; font-weight: 500;
    letter-spacing: 0.14em; text-transform: uppercase; color: white;
    background: var(--purple); border: none; padding: 1rem 2.4rem;
    cursor: pointer; transition: background 0.3s, transform 0.2s;
    text-decoration: none; display: inline-block;
  }
  .btn-purple:hover { background: #6D28D9; transform: translateY(-1px); }
  .btn-green {
    font-family: 'Outfit', sans-serif; font-size: 0.8rem; font-weight: 500;
    letter-spacing: 0.14em; text-transform: uppercase; color: white;
    background: var(--green); border: none; padding: 1rem 2.4rem;
    cursor: pointer; transition: background 0.3s, transform 0.2s;
    text-decoration: none; display: inline-block;
  }
  .btn-green:hover { background: #168a63; transform: translateY(-1px); }

  .event-pricing {
    background: var(--dark-3); border-left: 0.5px solid var(--border-dim);
    padding: 3rem 2.5rem; display: flex; flex-direction: column;
    align-items: center; justify-content: center; text-align: center;
  }
  .pricing-label { font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.8rem; }
  .pricing-amount {
    font-family: 'Cormorant Garamond', serif; font-size: 5rem; font-weight: 300;
    color: var(--gold-light); line-height: 1; margin-bottom: 0.3rem;
  }
  .pricing-currency { font-size: 1.5rem; vertical-align: top; line-height: 1.5; color: var(--gold); }
  .pricing-period { font-size: 0.78rem; color: var(--text-muted); letter-spacing: 0.1em; margin-bottom: 2rem; }
  .pricing-features { list-style: none; text-align: left; width: 100%; margin-bottom: 2rem; display: flex; flex-direction: column; gap: 0.8rem; }
  .pricing-features li { display: flex; align-items: flex-start; gap: 0.6rem; font-size: 0.82rem; color: var(--text-muted); }
  .pricing-check { color: var(--gold); flex-shrink: 0; font-size: 0.8rem; margin-top: 0.15rem; }
  .pricing-note { font-size: 0.72rem; color: var(--text-muted); text-align: center; margin-top: 1rem; line-height: 1.6; }

  .phases-section { padding: 6rem 4rem; background: var(--dark-2); border-top: 0.5px solid var(--border-dim); border-bottom: 0.5px solid var(--border-dim); }
  .phases-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border-dim); border: 0.5px solid var(--border-dim); }
  .phase-card { background: var(--dark-2); padding: 2.5rem 2rem; position: relative; transition: background 0.3s; }
  .phase-card:hover { background: var(--dark-3); }
  .phase-number { font-family: 'Cormorant Garamond', serif; font-size: 3.5rem; font-weight: 300; color: rgba(124,58,237,0.15); line-height: 1; margin-bottom: 0.5rem; }
  .phase-days { font-size: 0.68rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--purple-light); margin-bottom: 1rem; }
  .phase-title { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-weight: 400; margin-bottom: 1rem; }
  .phase-list { list-style: none; display: flex; flex-direction: column; gap: 0.4rem; }
  .phase-list li { font-size: 0.8rem; color: var(--text-muted); padding-left: 1rem; position: relative; }
  .phase-list li::before { content: '·'; position: absolute; left: 0; color: var(--purple-light); }

  .register-section { padding: 7rem 4rem; text-align: center; position: relative; overflow: hidden; }
  .register-section::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse 50% 100% at 50% 50%, rgba(124,58,237,0.05) 0%, transparent 70%);
    pointer-events: none;
  }
  .whatsapp-btn {
    display: inline-flex; align-items: center; gap: 0.6rem;
    background: #25D366; color: white; font-size: 0.85rem; font-weight: 500;
    letter-spacing: 0.1em; padding: 1rem 2rem; cursor: pointer;
    border: none; transition: background 0.3s, transform 0.2s; text-decoration: none;
  }
  .whatsapp-btn:hover { background: #1ebe5d; transform: translateY(-1px); }

  /* ═══════════════════════════════
     LEGAL PAGE STYLES
  ═══════════════════════════════ */
  .legal-hero {
    min-height: 40vh; display: flex; flex-direction: column; justify-content: flex-end;
    padding: 0 4rem 4rem; position: relative; overflow: hidden;
  }
  .legal-hero-bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 50% 70% at 60% 30%, rgba(201,151,58,0.05) 0%, transparent 60%), var(--dark);
  }
  .legal-content { max-width: 860px; margin: 0 auto; padding: 5rem 4rem; }
  .legal-content h2 {
    font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; font-weight: 400;
    color: var(--text-primary); margin: 3rem 0 1rem; padding-bottom: 0.5rem;
    border-bottom: 0.5px solid var(--border-dim);
  }
  .legal-content h2:first-child { margin-top: 0; }
  .legal-content p { font-size: 0.92rem; color: var(--text-muted); line-height: 1.85; margin-bottom: 1rem; }
  .legal-content p strong { color: var(--text-primary); font-weight: 500; }
  .legal-content ul { list-style: none; padding: 0; margin-bottom: 1rem; }
  .legal-content ul li { font-size: 0.92rem; color: var(--text-muted); line-height: 1.8; padding-left: 1.2rem; position: relative; }
  .legal-content ul li::before { content: '—'; position: absolute; left: 0; color: var(--gold); font-size: 0.7rem; top: 0.4rem; }
  .legal-meta { font-size: 0.78rem; color: var(--text-muted); margin-bottom: 3rem; padding-bottom: 2rem; border-bottom: 0.5px solid var(--border-dim); }
  .legal-nav { display: flex; gap: 2rem; flex-wrap: wrap; padding: 2rem 4rem; border-bottom: 0.5px solid var(--border-dim); background: var(--dark-2); }
  .legal-nav a { font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-muted); cursor: pointer; transition: color 0.3s; text-decoration: none; }
  .legal-nav a:hover, .legal-nav a.active { color: var(--gold-light); }

  /* ═══════════════════════════════
     PRODUCT PAGES — TUTORING
  ═══════════════════════════════ */
  .prod-hero {
    min-height: 70vh; display: flex; flex-direction: column; justify-content: flex-end;
    padding: 0 4rem 5rem; position: relative; overflow: hidden;
  }
  .prod-hero-bg {
    position: absolute; inset: 0;
  }
  .prod-hero-grid {
    position: absolute; inset: 0; pointer-events: none;
    background-image: linear-gradient(rgba(29,158,117,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(29,158,117,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 80% 80% at 40% 50%, black 30%, transparent 80%);
  }
  .prod-accent-green { height: 3px; width: 100%; background: linear-gradient(90deg, var(--green), rgba(29,158,117,0.1) 60%, transparent); }
  .prod-accent-blue { height: 3px; width: 100%; background: linear-gradient(90deg, var(--blue), rgba(55,138,221,0.1) 60%, transparent); }

  /* Breadcrumb */
  .breadcrumb {
    display: flex; align-items: center; gap: 0.6rem;
    font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--text-muted); margin-bottom: 3rem; position: relative; flex-wrap: wrap;
  }
  .breadcrumb span { color: var(--gold); }
  .breadcrumb a { color: var(--text-muted); cursor: pointer; transition: color 0.3s; }
  .breadcrumb a:hover { color: var(--gold-light); }

  /* Grade pricing cards */
  .grades-section { padding: 6rem 4rem; }
  .grades-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1px; background: var(--border-dim); border: 0.5px solid var(--border-dim); margin-bottom: 4rem; }
  .grade-card {
    background: var(--dark-2); padding: 2.5rem 1.5rem;
    position: relative; overflow: hidden; transition: background 0.35s; cursor: pointer;
    display: flex; flex-direction: column; align-items: center; text-align: center;
  }
  .grade-card:hover { background: var(--dark-3); }
  .grade-card::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--green), transparent);
    transform: scaleX(0); transform-origin: left; transition: transform 0.4s;
  }
  .grade-card:hover::after { transform: scaleX(1); }
  .grade-label {
    font-size: 0.68rem; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--green-light); margin-bottom: 0.8rem;
  }
  .grade-number {
    font-family: 'Cormorant Garamond', serif; font-size: 3.5rem; font-weight: 300;
    color: var(--text-primary); line-height: 1; margin-bottom: 1.2rem;
  }
  .grade-price {
    font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 300;
    color: var(--gold-light); line-height: 1; margin-bottom: 0.3rem;
  }
  .grade-period { font-size: 0.72rem; color: var(--text-muted); letter-spacing: 0.1em; margin-bottom: 1.8rem; }
  .grade-btn {
    font-size: 0.72rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--dark); background: var(--green); border: none;
    padding: 0.6rem 1.2rem; cursor: pointer; transition: background 0.3s; width: 100%;
  }
  .grade-btn:hover { background: var(--green-light); }
  .grade-btn-ghost {
    font-size: 0.72rem; font-weight: 400; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--text-muted); background: transparent; border: 0.5px solid rgba(255,255,255,0.12);
    padding: 0.6rem 1.2rem; cursor: pointer; transition: color 0.3s, border-color 0.3s; width: 100%; margin-top: 0.5rem;
  }
  .grade-btn-ghost:hover { color: var(--text-primary); border-color: rgba(255,255,255,0.35); }

  /* What's included grid */
  .includes-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border-dim); border: 0.5px solid var(--border-dim); }
  .include-item { background: var(--dark-2); padding: 2rem 1.8rem; transition: background 0.3s; }
  .include-item:hover { background: var(--dark-3); }
  .include-icon { font-size: 1.6rem; margin-bottom: 0.8rem; }
  .include-title { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 400; margin-bottom: 0.5rem; }
  .include-text { font-size: 0.82rem; color: var(--text-muted); line-height: 1.7; }

  /* Subjects tag cloud */
  .subjects-cloud { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 2rem; }
  .subject-tag {
    font-size: 0.75rem; letter-spacing: 0.1em; padding: 0.4rem 1rem;
    border: 0.5px solid var(--border-dim); color: var(--text-muted);
    transition: border-color 0.3s, color 0.3s; cursor: default;
  }
  .subject-tag:hover { border-color: var(--green); color: var(--green-light); }

  /* How it works steps */
  .steps-section { padding: 6rem 4rem; background: var(--dark-2); border-top: 0.5px solid var(--border-dim); border-bottom: 0.5px solid var(--border-dim); }
  .steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; border: 0.5px solid var(--border-dim); }
  .step-item {
    padding: 2.5rem 2rem; border-right: 0.5px solid var(--border-dim);
    position: relative;
  }
  .step-item:last-child { border-right: none; }
  .step-num {
    font-family: 'Cormorant Garamond', serif; font-size: 4rem; font-weight: 300;
    color: rgba(29,158,117,0.12); line-height: 1; margin-bottom: 1rem;
  }
  .step-title { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 400; margin-bottom: 0.6rem; }
  .step-text { font-size: 0.82rem; color: var(--text-muted); line-height: 1.7; }

  /* Quote form */
  .quote-form-section { padding: 6rem 4rem; }
  .quote-form-inner {
    display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; max-width: 1100px;
  }
  .quote-form { display: grid; gap: 1rem; }
  .quote-form input, .quote-form textarea, .quote-form select {
    background: var(--dark-3); border: 1px solid var(--border-dim);
    padding: 1rem; color: white; font-family: 'Outfit', sans-serif; font-size: 0.9rem;
    outline: none; transition: border-color 0.3s; width: 100%;
  }
  .quote-form input:focus, .quote-form textarea:focus, .quote-form select:focus { border-color: var(--green); }
  .quote-form textarea { min-height: 120px; resize: vertical; }
  .quote-form select { appearance: none; cursor: pointer; }
  .quote-form select option { background: var(--dark-3); }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

  /* ═══════════════════════════════
     SOFTWARE DEV PRODUCTS
  ═══════════════════════════════ */
  .softprod-hero-bg {
    background:
      radial-gradient(ellipse 60% 80% at 70% 30%, rgba(55,138,221,0.1) 0%, transparent 60%),
      radial-gradient(ellipse 40% 60% at 15% 80%, rgba(55,138,221,0.05) 0%, transparent 50%),
      var(--dark);
  }
  .softprod-hero-grid {
    position: absolute; inset: 0; pointer-events: none;
    background-image: linear-gradient(rgba(55,138,221,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(55,138,221,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 80% 80% at 60% 50%, black 30%, transparent 80%);
  }

  /* Software service cards */
  .soft-services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border-dim); border: 0.5px solid var(--border-dim); }
  .soft-service-card {
    background: var(--dark-2); padding: 3rem 2.5rem; position: relative; overflow: hidden;
    transition: background 0.35s; cursor: pointer;
  }
  .soft-service-card:hover { background: var(--dark-3); }
  .soft-service-card::before {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--blue), transparent);
    transform: scaleX(0); transform-origin: left; transition: transform 0.4s;
  }
  .soft-service-card:hover::before { transform: scaleX(1); }
  .soft-card-icon { font-size: 2rem; margin-bottom: 1.2rem; }
  .soft-card-title { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; font-weight: 400; margin-bottom: 0.6rem; }
  .soft-card-desc { font-size: 0.85rem; color: var(--text-muted); line-height: 1.75; margin-bottom: 1.5rem; }
  .soft-card-pricing {
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-size: 0.72rem; letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--blue-light); border: 0.5px solid rgba(55,138,221,0.25);
    padding: 0.35rem 0.8rem; margin-bottom: 1.5rem;
  }
  .soft-card-btn {
    font-size: 0.72rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase;
    color: white; background: var(--blue); border: none;
    padding: 0.65rem 1.4rem; cursor: pointer; transition: background 0.3s; display: inline-block;
  }
  .soft-card-btn:hover { background: #2171c4; }

  /* Tech stack */
  .tech-stack-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--border-dim); border: 0.5px solid var(--border-dim); }
  .tech-item { background: var(--dark-2); padding: 2rem 1.5rem; text-align: center; transition: background 0.3s; }
  .tech-item:hover { background: var(--dark-3); }
  .tech-icon { font-size: 2rem; margin-bottom: 0.6rem; }
  .tech-name { font-size: 0.85rem; font-weight: 500; margin-bottom: 0.3rem; }
  .tech-category { font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-muted); }

  /* Process timeline */
  .process-section { padding: 6rem 4rem; }
  .process-steps { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0; position: relative; }
  .process-step {
    padding: 2rem 1.5rem; text-align: center; position: relative;
  }
  .process-step::after {
    content: '→'; position: absolute; right: -0.5rem; top: 2.2rem;
    color: rgba(55,138,221,0.3); font-size: 1.2rem; z-index: 1;
  }
  .process-step:last-child::after { display: none; }
  .process-step-num {
    width: 44px; height: 44px; border: 0.5px solid rgba(55,138,221,0.3);
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; color: var(--blue-light);
    margin: 0 auto 1rem;
  }
  .process-step-title { font-size: 0.85rem; font-weight: 500; margin-bottom: 0.4rem; }
  .process-step-text { font-size: 0.75rem; color: var(--text-muted); line-height: 1.6; }

  /* ─── MODAL / QUOTE DRAWER ─── */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.75); backdrop-filter: blur(8px);
    z-index: 200; display: flex; align-items: center; justify-content: center;
    animation: fadeIn 0.25s ease;
  }
  .modal-box {
    background: var(--dark-2); border: 0.5px solid var(--border);
    max-width: 560px; width: 90%; max-height: 90vh; overflow-y: auto;
    padding: 3rem; position: relative; animation: fadeUp 0.3s ease;
  }
  .modal-close {
    position: absolute; top: 1.5rem; right: 1.5rem;
    background: none; border: none; color: var(--text-muted); cursor: pointer;
    font-size: 1.4rem; line-height: 1; transition: color 0.2s;
  }
  .modal-close:hover { color: var(--text-primary); }
  .modal-title {
    font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 300;
    margin-bottom: 0.5rem;
  }
  .modal-sub { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 2rem; }
  .modal-form { display: grid; gap: 0.8rem; }
  .modal-form input, .modal-form select, .modal-form textarea {
    background: var(--dark-3); border: 1px solid var(--border-dim);
    padding: 0.85rem 1rem; color: white; font-family: 'Outfit', sans-serif;
    font-size: 0.875rem; outline: none; transition: border-color 0.3s; width: 100%;
  }
  .modal-form input:focus, .modal-form select:focus, .modal-form textarea:focus { border-color: var(--gold); }
  .modal-form select { appearance: none; cursor: pointer; }
  .modal-form textarea { min-height: 100px; resize: vertical; }
  .modal-form select option { background: var(--dark-3); }
  .success-banner {
    background: rgba(29,158,117,0.12); border: 0.5px solid rgba(29,158,117,0.3);
    padding: 1rem 1.5rem; font-size: 0.875rem; color: var(--green-light);
    text-align: center; margin-top: 1rem;
  }

  /* ── MOBILE ── */
  @media (max-width: 768px) {
    .nav { padding: 1rem 1.5rem; }
    .nav-links, .nav-cta { display: none; }
    .hero { padding: 0 1.5rem 4rem; }
    .stats-bar { padding: 2rem 1.5rem; flex-wrap: wrap; gap: 1.5rem; }
    .section, .cta-section { padding: 4rem 1.5rem; }
    .about-section { grid-template-columns: 1fr; padding: 4rem 1.5rem; gap: 3rem; }
    .footer { flex-direction: column; gap: 1.5rem; text-align: center; padding: 2rem 1.5rem; }
    .footer-top, .footer-bottom { flex-direction: column; gap: 1rem; }
    .hero-scroll { display: none; }
    .div-hero { padding: 0 1.5rem 4rem; }
    .div-overview { grid-template-columns: 1fr; padding: 4rem 1.5rem; gap: 2rem; }
    .div-big-number { font-size: 5rem; }
    .div-pillars { grid-template-columns: 1fr; padding: 0 1.5rem 4rem; }
    .div-offerings { padding: 4rem 1.5rem; }
    .div-offerings-grid { grid-template-columns: 1fr; }
    .div-offering-item:nth-child(odd) { border-right: none; padding-right: 0; }
    .div-offering-item:nth-child(even) { padding-left: 0; }
    .div-stats { grid-template-columns: repeat(2, 1fr); }
    .div-stat { border-right: none; border-bottom: 0.5px solid var(--border-dim); }
    .div-quote-section { padding: 4rem 1.5rem; }
    .div-related { padding: 4rem 1.5rem; }
    .div-related-grid { grid-template-columns: 1fr; }
    .div-quote { font-size: 1.4rem; }
    .events-hero { padding: 0 1.5rem 4rem; min-height: 50vh; }
    .events-section { padding: 3rem 1.5rem; }
    .event-featured-inner { grid-template-columns: 1fr; }
    .event-pricing { border-left: none; border-top: 0.5px solid var(--border-dim); }
    .event-main { padding: 2rem 1.5rem; }
    .phases-section { padding: 4rem 1.5rem; }
    .phases-grid { grid-template-columns: 1fr; }
    .register-section { padding: 4rem 1.5rem; }
    .legal-hero { padding: 0 1.5rem 3rem; min-height: 30vh; }
    .legal-content { padding: 3rem 1.5rem; }
    .legal-nav { padding: 1.5rem; gap: 1rem; }
    .prod-hero { padding: 0 1.5rem 4rem; min-height: 55vh; }
    .grades-section { padding: 4rem 1.5rem; }
    .grades-grid { grid-template-columns: 1fr; }
    .includes-grid { grid-template-columns: 1fr; }
    .steps-section { padding: 4rem 1.5rem; }
    .steps-grid { grid-template-columns: 1fr 1fr; }
    .step-item { border-right: none; border-bottom: 0.5px solid var(--border-dim); }
    .quote-form-section { padding: 4rem 1.5rem; }
    .quote-form-inner { grid-template-columns: 1fr; gap: 3rem; }
    .form-row { grid-template-columns: 1fr; }
    .soft-services-grid { grid-template-columns: 1fr; }
    .tech-stack-grid { grid-template-columns: repeat(2, 1fr); }
    .process-steps { grid-template-columns: 1fr; }
    .process-step::after { display: none; }
    .modal-box { padding: 2rem 1.5rem; }
  }
`;
