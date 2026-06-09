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
    --purple: #7C3AED;
    --purple-light: #A78BFA;
    --purple-dim: rgba(124,58,237,0.15);
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

  /* Event card */
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

  /* Pricing panel */
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

  /* Phases */
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

  /* Register section */
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
  }
`;

/* ─────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────── */
const SERVICES = [
  {
    id: "education",
    number: "01",
    icon: "🎓",
    name: "Education",
    tagline: "Transforming\nLearning Across\nAfrica",
    sub: "Delivering transformative learning experiences across South Africa. We partner with institutions and learners to bridge knowledge gaps and empower communities through quality education.",
    accentColor: "rgba(29,158,117,0.15)",
    accentColorStrong: "rgba(29,158,117,0.08)",
    overview: [
      "At Ace Group Education, we believe that <strong>access to quality learning is a fundamental right</strong>, not a privilege. Our division partners with schools, universities, training institutions, and corporates to reshape how knowledge is delivered and absorbed across South Africa.",
      "We combine curriculum expertise with operational excellence, ensuring that our programmes are not just well-designed but <strong>measurably effective</strong>. From foundational literacy to professional certification, we serve every stage of the learning journey.",
      "Our approach is rooted in the belief that education must be <strong>contextual, relevant, and empowering</strong> — designed for the real challenges facing South African learners today, and the global opportunities of tomorrow.",
    ],
    pillars: [
      { icon: "📚", title: "Curriculum Design", text: "World-class learning frameworks aligned to South African and international standards." },
      { icon: "🏫", title: "Institution Partnerships", text: "Deep collaboration with schools, colleges, and training centres to elevate quality." },
      { icon: "🌍", title: "Community Impact", text: "Education programmes designed to uplift entire communities, not just individual learners." },
    ],
    offerings: [
      { title: "K-12 Academic Support", text: "Supplementary and core learning resources for primary and secondary learners." },
      { title: "Professional Certification", text: "Industry-recognised programmes for working professionals seeking to upskill." },
      { title: "Corporate Training", text: "Bespoke learning solutions designed for organisational capability building." },
      { title: "Curriculum Consulting", text: "Helping institutions redesign courses for impact, compliance, and relevance." },
      { title: "Learnerships & Internships", text: "Structured pathways bridging academic education with workplace readiness." },
      { title: "Assessment Solutions", text: "Rigorous, fair, and adaptive assessment tools for learners at every level." },
    ],
    stats: [
      { num: "5+", label: "Programme Types" },
      { num: "SA", label: "National Reach" },
      { num: "2024", label: "Established" },
      { num: "∞", label: "Lives to Impact" },
    ],
    quote: "Education is the most powerful weapon you can use to change the world — and we are building the arsenal.",
    quoteAttr: "Ace Group Education · Mission Statement",
    desc: "Delivering transformative learning experiences across South Africa.",
  },
  {
    id: "software",
    number: "02",
    icon: "💻",
    name: "Software Development",
    tagline: "Engineering\nThe Future,\nLine by Line",
    sub: "Building bespoke software solutions from concept to deployment. Our engineers craft scalable, high-performance applications tailored to the unique needs of African and global markets.",
    accentColor: "rgba(55,138,221,0.15)",
    accentColorStrong: "rgba(55,138,221,0.08)",
    overview: [
      "Ace Group Software Development is where <strong>ideas are transformed into intelligent, scalable systems</strong>. Our engineering teams design and build custom software solutions that don't just meet requirements — they anticipate them.",
      "We understand that African markets have <strong>unique infrastructure realities and user needs</strong>. We build with this in mind: optimising for low-bandwidth environments, designing intuitive interfaces for diverse user groups, and creating systems that are resilient in the face of real-world constraints.",
      "From MVPs to enterprise-grade platforms, our team brings <strong>full-stack capability, product thinking, and deep technical rigour</strong> to every project.",
    ],
    pillars: [
      { icon: "⚙️", title: "Full-Stack Engineering", text: "End-to-end development from database architecture to polished user interfaces." },
      { icon: "☁️", title: "Cloud & Infrastructure", text: "Scalable, secure cloud deployments on AWS, Azure, and Google Cloud." },
      { icon: "🔒", title: "Security by Design", text: "Every system we build has security baked in from the very first line of code." },
    ],
    offerings: [
      { title: "Custom Web Applications", text: "Bespoke web platforms built for performance, scale, and user delight." },
      { title: "Mobile Development", text: "Native and cross-platform apps for iOS and Android that users love." },
      { title: "API & Integration", text: "Robust APIs and third-party integrations that connect your ecosystem." },
      { title: "Enterprise Systems", text: "Mission-critical software for large organisations, built to last decades." },
      { title: "DevOps & CI/CD", text: "Automated deployment pipelines that let teams ship faster with confidence." },
      { title: "Legacy Modernisation", text: "Breathing new life into aging systems without disrupting operations." },
    ],
    stats: [
      { num: "100%", label: "Custom Built" },
      { num: "24/7", label: "System Uptime Focus" },
      { num: "2024", label: "Established" },
      { num: "0→1", label: "MVP Specialists" },
    ],
    quote: "Great software is invisible. Users don't think about it — they just accomplish things they couldn't before.",
    quoteAttr: "Ace Group Software · Engineering Philosophy",
    desc: "Building bespoke software solutions from concept to deployment.",
  },
  {
    id: "ai",
    number: "03",
    icon: "🤖",
    name: "AI & Automation Engineering",
    tagline: "Machines That\nThink, Systems\nThat Scale",
    sub: "Harnessing the power of artificial intelligence to automate processes, enhance decision-making, and unlock new value across industries. Future-ready systems built for today.",
    accentColor: "rgba(122,58,201,0.15)",
    accentColorStrong: "rgba(122,58,201,0.08)",
    overview: [
      "Ace Group AI & Automation Engineering sits at the <strong>frontier of what's possible</strong>. We design and deploy intelligent systems that learn, adapt, and optimise — transforming how businesses operate across every sector.",
      "We don't believe in AI for its own sake. Every model we build, every automation we deploy is <strong>anchored to a real business outcome</strong>. Our approach begins with deep problem understanding, moves through rigorous data strategy, and culminates in production systems that deliver measurable ROI.",
      "From natural language processing to computer vision, from robotic process automation to predictive analytics — our team brings <strong>research-grade capability to commercial-grade implementation</strong>.",
    ],
    pillars: [
      { icon: "🧠", title: "Machine Learning", text: "Custom ML models trained on your data to solve your specific challenges." },
      { icon: "🔄", title: "Process Automation", text: "Eliminating repetitive tasks with intelligent RPA and workflow automation." },
      { icon: "📊", title: "Predictive Analytics", text: "Turning historical data into actionable foresight for smarter decisions." },
    ],
    offerings: [
      { title: "Large Language Models", text: "Custom LLM deployments and fine-tuning for domain-specific applications." },
      { title: "Computer Vision", text: "Image and video analysis systems for quality control, security, and insight." },
      { title: "Chatbots & Virtual Agents", text: "Intelligent conversational systems that handle complex customer interactions." },
      { title: "Data Engineering", text: "Building the data pipelines and infrastructure that power great AI." },
      { title: "RPA Solutions", text: "Robotic process automation to eliminate manual, repetitive work at scale." },
      { title: "AI Strategy Consulting", text: "Helping organisations identify, prioritise, and execute their AI roadmap." },
    ],
    stats: [
      { num: "AI", label: "Native Capability" },
      { num: "∞", label: "Automation Potential" },
      { num: "2024", label: "Established" },
      { num: "100%", label: "Outcome Focused" },
    ],
    quote: "Artificial intelligence is not replacing human judgement — it is amplifying it. We build the amplifier.",
    quoteAttr: "Ace Group AI · Vision Statement",
    desc: "Harnessing AI to automate processes and enhance decision-making.",
  },
  {
    id: "ehailing",
    number: "04",
    icon: "🚗",
    name: "eHailing & Transportation",
    tagline: "Moving South\nAfrica Forward,\nTogether",
    sub: "Modernising mobility across South Africa. Our transport solutions connect drivers and passengers through intelligent, reliable, and affordable eHailing technology.",
    accentColor: "rgba(201,151,58,0.15)",
    accentColorStrong: "rgba(201,151,58,0.08)",
    overview: [
      "Ace Group eHailing & Transportation is redefining how South Africans move. We believe that <strong>safe, reliable, and affordable mobility</strong> is a cornerstone of economic participation — and we're building the technology to make it real.",
      "Our platform is designed from the ground up for the <strong>realities of South African roads, networks, and communities</strong>. We understand load-shedding, data costs, and the diversity of our driver and passenger base — and we build accordingly.",
      "Beyond the ride, we are building an <strong>ecosystem that empowers drivers</strong> as micro-entrepreneurs, provides passengers with genuine peace of mind, and contributes to the formalisation of the transport sector.",
    ],
    pillars: [
      { icon: "🗺️", title: "Intelligent Routing", text: "Smart matching and routing algorithms optimised for South African road conditions." },
      { icon: "🛡️", title: "Safety First", text: "Multi-layer safety features protecting both drivers and passengers on every trip." },
      { icon: "💰", title: "Driver Empowerment", text: "Fair earnings structures and tools that help drivers build sustainable income." },
    ],
    offerings: [
      { title: "Passenger eHailing App", text: "Seamless ride booking with real-time tracking and multiple payment options." },
      { title: "Driver Platform", text: "A driver-first app with earnings tracking, navigation, and support tools." },
      { title: "Corporate Transport", text: "Managed mobility solutions for businesses needing reliable staff transport." },
      { title: "Fleet Management", text: "Technology tools for transport operators to manage and optimise their fleets." },
      { title: "Freight & Delivery", text: "Last-mile logistics and delivery services powered by our transport network." },
      { title: "Safety Infrastructure", text: "Real-time monitoring, emergency response, and driver verification systems." },
    ],
    stats: [
      { num: "SA", label: "Operating Region" },
      { num: "24/7", label: "Platform Availability" },
      { num: "2024", label: "Established" },
      { num: "→∞", label: "Cities to Serve" },
    ],
    quote: "Every journey matters. Every driver deserves dignity. Every passenger deserves safety. That's why we build.",
    quoteAttr: "Ace Group Transport · Purpose Statement",
    desc: "Connecting drivers and passengers through intelligent, reliable eHailing technology.",
  },
  {
    id: "edtech",
    number: "05",
    icon: "📱",
    name: "Educational Technology",
    tagline: "Where Learning\nMeets the\nDigital Age",
    sub: "Where education meets innovation. We develop EdTech platforms that make learning accessible, engaging, and measurable — powering the next generation of digital learners.",
    accentColor: "rgba(201,58,58,0.12)",
    accentColorStrong: "rgba(201,58,58,0.07)",
    overview: [
      "Ace Group Educational Technology bridges the gap between <strong>pedagogical excellence and digital innovation</strong>. We build platforms, tools, and ecosystems that transform how learners engage with knowledge — making education more accessible, more measurable, and more human.",
      "We believe that technology in education should be <strong>invisible in the best way possible</strong> — removing friction, surfacing insights, and enabling educators to do what they do best. Our platforms are built for teachers as much as for students.",
      "From adaptive learning engines to learner management systems, from gamified content to data-driven progress tracking — our EdTech division is <strong>reimagining the architecture of learning</strong> for a connected South Africa.",
    ],
    pillars: [
      { icon: "🎮", title: "Gamified Learning", text: "Engagement mechanics that make learning intrinsically motivating and sticky." },
      { icon: "📈", title: "Learning Analytics", text: "Data dashboards that give educators real-time visibility into learner progress." },
      { icon: "🌐", title: "Offline-First Design", text: "Platforms built for South African realities — functional even without connectivity." },
    ],
    offerings: [
      { title: "Learner Management Systems", text: "Comprehensive LMS platforms for schools, colleges, and training providers." },
      { title: "Adaptive Learning Engines", text: "AI-powered content delivery that personalises the pace and style of learning." },
      { title: "Content Authoring Tools", text: "Giving educators powerful tools to create rich, interactive learning content." },
      { title: "Assessment Platforms", text: "Digital assessment tools with instant marking, analytics, and feedback loops." },
      { title: "Parent & Learner Portals", text: "Transparent progress tracking keeping all stakeholders informed and engaged." },
      { title: "EdTech Consulting", text: "Helping institutions select, implement, and optimise their technology ecosystems." },
    ],
    stats: [
      { num: "EdTech", label: "Specialist Focus" },
      { num: "K-12+", label: "Learning Levels" },
      { num: "2024", label: "Established" },
      { num: "∞", label: "Learners to Reach" },
    ],
    quote: "Technology doesn't replace the teacher. It gives the teacher superpowers. We build the cape.",
    quoteAttr: "Ace Group EdTech · Design Principle",
    desc: "Building EdTech platforms that make learning accessible, engaging, and measurable.",
  },
];

const BOOTCAMP_PHASES = [
  {
    number: "01",
    days: "Day 1–2",
    title: "Foundations",
    items: ["Introduction to Workflow Automation", "Understanding n8n architecture", "Nodes, triggers, webhooks", "Real-world automation examples"],
  },
  {
    number: "02",
    days: "Day 2–3",
    title: "APIs & Integration",
    items: ["What is an API", "REST APIs (GET, POST, PUT)", "Connecting n8n to external systems", "Build your first API workflow"],
  },
  {
    number: "03",
    days: "Day 3–4",
    title: "AI + LLM Integration",
    items: ["Introduction to Large Language Models", "Using OpenAI / Azure OpenAI in n8n", "Prompt engineering basics", "Building AI-powered workflows"],
  },
  {
    number: "04",
    days: "Day 4",
    title: "AI Agents in n8n",
    items: ["What are AI Agents", "Agent workflows using tools", "Memory + reasoning basics", "Build: Customer support agent, Invoice processing agent, Personal assistant"],
  },
  {
    number: "05",
    days: "Day 5",
    title: "Cloud Deployment",
    items: ["Intro to Amazon Web Services", "Deploy n8n on Amazon EC2", "Storage basics with Amazon S3", "Environment variables + secrets"],
  },
  {
    number: "06",
    days: "Advanced",
    title: "Backend + APIs",
    items: ["Introduction to FastAPI", "Build your own AI API", "Connect FastAPI → n8n", "Creating reusable automation services"],
  },
];

/* ─────────────────────────────────────────────────
   SHARED NAV + FOOTER
───────────────────────────────────────────────── */
function Nav({ onNavigate, currentPage, scrolled }) {
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-logo" onClick={() => onNavigate("home")}>
        ACE <span>GROUP</span>
      </div>
      <ul className="nav-links">
        <li><a onClick={() => onNavigate("home")} className={currentPage === "home" ? "active" : ""}>Home</a></li>
        <li><a onClick={() => onNavigate("home", "services")} className="">Services</a></li>
        <li><a onClick={() => onNavigate("events")} className={currentPage === "events" ? "active" : ""}>Events</a></li>
        <li><a onClick={() => onNavigate("home", "about")} className="">About</a></li>
      </ul>
      <a onClick={() => onNavigate("home", "contact")} className="nav-cta" style={{ cursor: "pointer" }}>Get in Touch</a>
    </nav>
  );
}

function Footer({ onNavigate }) {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo" onClick={() => onNavigate("home")}>ACE <span>GROUP</span></div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-end" }}>
          <div className="footer-social">
            <a href="#">LinkedIn</a>
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">Twitter/X</a>
          </div>
          <div className="footer-links">
            <a onClick={() => onNavigate("privacy")}>Privacy Policy</a>
            <a onClick={() => onNavigate("terms")}>Terms of Service</a>
            <a onClick={() => onNavigate("refund")}>Refund Policy</a>
            <a onClick={() => onNavigate("delivery")}>Delivery Timeline</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Ace Group of Companies · Ace the Academia</span>
        <span>South Africa · Reg. No. [Registration Number]</span>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────
   EVENTS PAGE
───────────────────────────────────────────────── */
function EventsPage({ onNavigate, scrolled }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  return (
    <div className="page-enter">
      <Nav onNavigate={onNavigate} currentPage="events" scrolled={scrolled} />

      {/* HERO */}
      <section className="events-hero">
        <div className="events-hero-bg" />
        <div className="events-grid-bg" />
        <div className="div-back" onClick={() => onNavigate("home")}>← Back to Home</div>
        <div className="div-hero-eyebrow">Ace the Academia · Live Events</div>
        <h1 className="div-hero-title">
          <span style={{ display: "block" }}>Upcoming</span>
          <span style={{ display: "block" }}><em>Events &</em></span>
          <span style={{ display: "block" }}>Bootcamps</span>
        </h1>
        <p className="div-hero-sub">
          Hands-on learning experiences, live workshops, and intensive bootcamps designed to take you from beginner to builder. Real skills. Real systems. Real results.
        </p>
      </section>

      <div className="events-accent" />

      {/* FEATURED EVENT */}
      <section className="events-section">
        <div className="section-tag">Featured Event · Aug 2026</div>
        <h2 className="section-title" style={{ marginBottom: "2.5rem" }}>
          Our Next <em>Bootcamp</em>
        </h2>

        <div className="event-featured">
          <div className="event-featured-inner">
            <div className="event-main">
              <div className="event-badge">
                <div className="event-badge-dot" />
                Enrolling Now · Limited Spots
              </div>
              <h3 className="event-title">
                AI n8n<br /><em>Automation</em><br />Bootcamp
              </h3>
              <div className="event-subtitle">Hosted by Ace the Academia</div>
              <p className="event-tagline">
                Learn how to build powerful AI-driven automations with n8n, APIs, AI Agents and Cloud Deployment. Hands-on. Practical. Transformative.
              </p>
              <div className="event-meta">
                <div className="event-meta-item">
                  <span className="event-meta-icon">📅</span>
                  <span><strong>1 August – 6 September 2026</strong></span>
                </div>
                <div className="event-meta-item">
                  <span className="event-meta-icon">🕐</span>
                  <span><strong>6 Weeks</strong> · Live Online</span>
                </div>
                <div className="event-meta-item">
                  <span className="event-meta-icon">🎥</span>
                  <span>Via <strong>Zoom</strong> · Live Sessions</span>
                </div>
                <div className="event-meta-item">
                  <span className="event-meta-icon">📍</span>
                  <span>South Africa · Remote</span>
                </div>
              </div>
              <div className="event-includes">
                {["Workflow Automation", "APIs & Integrations", "AI & LLM Integration", "AI Agents in n8n", "Cloud Deployment", "FastAPI Backend"].map(t => (
                  <div className="event-tag" key={t}>{t}</div>
                ))}
              </div>
              <div className="event-actions">
                <a
                  href="https://wa.me/27739298456?text=Hi%2C%20I%27d%20like%20to%20register%20for%20the%20AI%20n8n%20Automation%20Bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-btn"
                >
                  📱 Register via WhatsApp
                </a>
                <button className="btn-ghost" onClick={() => document.getElementById("bootcamp-phases")?.scrollIntoView({ behavior: "smooth" })}>
                  View Curriculum
                </button>
              </div>
            </div>

            <div className="event-pricing">
              <div className="pricing-label">Full Bootcamp Investment</div>
              <div className="pricing-amount">
                <span className="pricing-currency">R</span>720
              </div>
              <div className="pricing-period">One-time payment · Full access</div>
              <ul className="pricing-features">
                <li><span className="pricing-check">✓</span> Live interactive classes via Zoom</li>
                <li><span className="pricing-check">✓</span> Hands-on projects every week</li>
                <li><span className="pricing-check">✓</span> Real-world automation systems</li>
                <li><span className="pricing-check">✓</span> Templates & workflows included</li>
                <li><span className="pricing-check">✓</span> Certificate of Completion</li>
                <li><span className="pricing-check">✓</span> Lifetime access to resources</li>
                <li><span className="pricing-check">✓</span> Support & community access</li>
              </ul>
              <a
                href="https://wa.me/27739298456?text=Hi%2C%20I%27d%20like%20to%20register%20for%20the%20AI%20n8n%20Automation%20Bootcamp"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-purple"
                style={{ width: "100%", textAlign: "center" }}
              >
                Book Your Spot
              </a>
              <div className="pricing-note">
                073 929 8456 · WhatsApp to register<br />
                Limited slots — book today to secure your place.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section id="bootcamp-phases" className="phases-section">
        <div style={{ padding: "0 0 4rem" }}>
          <div className="section-tag">6-Week Curriculum</div>
          <h2 className="section-title" style={{ marginBottom: "3rem" }}>
            What You'll <em>Learn</em>
          </h2>
        </div>
        <div className="phases-grid">
          {BOOTCAMP_PHASES.map((phase) => (
            <div className="phase-card" key={phase.number}>
              <div className="phase-number">{phase.number}</div>
              <div className="phase-days">{phase.days}</div>
              <div className="phase-title">{phase.title}</div>
              <ul className="phase-list">
                {phase.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* REGISTER CTA */}
      <section className="register-section">
        <div className="section-tag" style={{ justifyContent: "center" }}>Automate Today. Lead Tomorrow.</div>
        <h2 className="cta-title">
          Ready to Build<br /><em>Real Automations?</em>
        </h2>
        <p className="cta-sub">
          Spaces are limited. Join the AI n8n Automation Bootcamp and gain the skills to automate workflows, deploy AI agents, and build production-ready systems — in just 6 weeks.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          <a
            href="https://wa.me/27739298456?text=Hi%2C%20I%27d%20like%20to%20register%20for%20the%20AI%20n8n%20Automation%20Bootcamp"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn"
            style={{ fontSize: "0.95rem", padding: "1.1rem 2.4rem" }}
          >
            📱 WhatsApp: 073 929 8456
          </a>
          <a href="mailto:4148924@myuwc.ac.za" className="btn-ghost">Email Us Instead</a>
        </div>
        <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", textAlign: "center" }}>
          Hosted by <strong style={{ color: "var(--gold)" }}>Ace the Academia</strong> · R720 one-time payment · 1 Aug – 6 Sep 2026
        </p>
      </section>

      <div className="divider" />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

/* ─────────────────────────────────────────────────
   LEGAL PAGES
───────────────────────────────────────────────── */
function LegalPage({ type, onNavigate, scrolled }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [type]);

  const pages = {
    privacy: {
      title: "Privacy Policy",
      updated: "Last updated: 9 June 2026",
      content: (
        <>
          <h2>1. Introduction</h2>
          <p>Ace Group of Companies and Ace the Academia ("we", "our", "us") are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or register for our events and programmes, in accordance with the <strong>Protection of Personal Information Act 4 of 2013 (POPIA)</strong> of South Africa.</p>

          <h2>2. Information We Collect</h2>
          <p>We may collect the following personal information:</p>
          <ul>
            <li>Full name and contact details (email address, phone number)</li>
            <li>Payment information (processed securely via our payment providers)</li>
            <li>Academic or professional background (where relevant to programme enrolment)</li>
            <li>Usage data and website interaction information</li>
            <li>Communications you send to us via email or WhatsApp</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use your personal information to:</p>
          <ul>
            <li>Process your registration and payment for bootcamps and programmes</li>
            <li>Communicate event details, schedules, and updates</li>
            <li>Send certificates of completion and course materials</li>
            <li>Respond to enquiries and provide customer support</li>
            <li>Improve our services and develop new offerings</li>
            <li>Comply with legal and regulatory obligations</li>
          </ul>

          <h2>4. Sharing of Information</h2>
          <p>We do not sell your personal information to third parties. We may share your information with:</p>
          <ul>
            <li>Payment processing providers to facilitate transactions</li>
            <li>Video conferencing platforms (Zoom) to deliver live sessions</li>
            <li>Service providers who assist in delivering our programmes</li>
            <li>Law enforcement or regulatory bodies where required by law</li>
          </ul>

          <h2>5. Data Retention</h2>
          <p>We retain your personal information for as long as necessary to fulfil the purposes outlined in this policy, or as required by law. Registration and payment records are retained for a minimum of 5 years for accounting and legal purposes.</p>

          <h2>6. Your Rights under POPIA</h2>
          <p>You have the right to access, correct, or request deletion of your personal information. You may also object to processing or withdraw consent at any time. To exercise these rights, contact us at <strong>4148924@myuwc.ac.za</strong>.</p>

          <h2>7. Cookies</h2>
          <p>Our website may use cookies to improve your browsing experience. You can disable cookies through your browser settings, though this may affect certain website functionality.</p>

          <h2>8. Security</h2>
          <p>We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction.</p>

          <h2>9. Contact Us</h2>
          <p>For any privacy-related queries, please contact us at: <strong>4148924@myuwc.ac.za</strong> or WhatsApp <strong>073 929 8456</strong>.</p>
        </>
      ),
    },
    terms: {
      title: "Terms of Service",
      updated: "Last updated: 9 June 2026",
      content: (
        <>
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing our website or registering for any programme offered by Ace Group of Companies and Ace the Academia ("we", "us", "our"), you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>

          <h2>2. Services Offered</h2>
          <p>Ace the Academia offers live online bootcamps, training programmes, and educational events. Our flagship offering is the <strong>AI n8n Automation Bootcamp</strong> — a 6-week live online programme delivered via Zoom.</p>

          <h2>3. Registration and Enrolment</h2>
          <ul>
            <li>Registration is confirmed upon receipt of full payment of <strong>R720.00</strong></li>
            <li>Spots are limited and allocated on a first-come, first-served basis</li>
            <li>You will receive confirmation and joining details via WhatsApp or email within 48 hours of payment</li>
            <li>You must be at least 16 years of age to enrol, or have parental/guardian consent</li>
          </ul>

          <h2>4. Payment Terms</h2>
          <p>All prices are quoted in South African Rand (ZAR) and include VAT where applicable. Payment must be made in full before access is granted. We accept payment via the methods specified at checkout. Secure payment processing is handled by our authorised payment gateway provider.</p>

          <h2>5. Intellectual Property</h2>
          <p>All course materials, content, recordings, templates, and workflows provided through our programmes are the intellectual property of Ace the Academia. You are granted a personal, non-transferable licence to use materials for your own learning. You may not resell, redistribute, or sublicense any course content without written permission.</p>

          <h2>6. Code of Conduct</h2>
          <p>Participants are expected to engage respectfully in all live sessions and community spaces. We reserve the right to remove any participant who engages in disruptive, abusive, or inappropriate behaviour without refund.</p>

          <h2>7. Technical Requirements</h2>
          <p>Participants are responsible for ensuring they have a stable internet connection, a compatible device, and a Zoom account to attend live sessions. We are not liable for technical issues on the participant's side.</p>

          <h2>8. Limitation of Liability</h2>
          <p>To the fullest extent permitted by South African law, Ace Group and Ace the Academia shall not be liable for any indirect, incidental, or consequential damages arising from participation in our programmes or use of our website.</p>

          <h2>9. Governing Law</h2>
          <p>These Terms are governed by the laws of the Republic of South Africa. Any disputes shall be subject to the jurisdiction of the South African courts.</p>

          <h2>10. Changes to Terms</h2>
          <p>We reserve the right to update these Terms at any time. Continued use of our services following notification of changes constitutes acceptance of the revised Terms.</p>

          <h2>11. Contact</h2>
          <p>Questions about these Terms? Contact us at <strong>4148924@myuwc.ac.za</strong> or WhatsApp <strong>073 929 8456</strong>.</p>
        </>
      ),
    },
    refund: {
      title: "Refund Policy",
      updated: "Last updated: 9 June 2026",
      content: (
        <>
          <h2>1. Overview</h2>
          <p>Ace the Academia is committed to delivering high-quality training and education. We understand that circumstances change, and we aim to be fair and transparent in our refund process. This policy applies to all bootcamp and programme registrations.</p>

          <h2>2. Cooling-Off Period</h2>
          <p>In accordance with the <strong>Consumer Protection Act 68 of 2008 (CPA)</strong> of South Africa, you have a 5 business day cooling-off period from the date of purchase during which you may cancel your registration and receive a full refund, provided the programme has not yet commenced.</p>

          <h2>3. Cancellation Before Programme Start</h2>
          <ul>
            <li><strong>More than 14 days before start date:</strong> Full refund, less a 10% administration fee</li>
            <li><strong>7–14 days before start date:</strong> 50% refund</li>
            <li><strong>Less than 7 days before start date:</strong> No refund, but your registration may be transferred to the next available cohort</li>
          </ul>

          <h2>4. Cancellation After Programme Start</h2>
          <ul>
            <li><strong>Within the first week (Week 1):</strong> 25% refund of the programme fee</li>
            <li><strong>After Week 1:</strong> No refund is available once more than one week of the programme has been completed</li>
          </ul>

          <h2>5. Programme Cancellation by Ace the Academia</h2>
          <p>In the unlikely event that we need to cancel a scheduled programme, all registered participants will receive a <strong>full refund</strong> within 7 business days, or the option to transfer to the next available cohort.</p>

          <h2>6. Programme Postponement</h2>
          <p>If a programme is postponed, participants will be offered the choice to transfer to the rescheduled date or receive a full refund.</p>

          <h2>7. Non-Attendance</h2>
          <p>No refund will be issued for non-attendance where the programme proceeds as scheduled. If you are unable to attend live sessions, you retain access to recordings and resources for the lifetime of your enrolment.</p>

          <h2>8. How to Request a Refund</h2>
          <p>To request a refund, contact us via:</p>
          <ul>
            <li>Email: <strong>4148924@myuwc.ac.za</strong></li>
            <li>WhatsApp: <strong>073 929 8456</strong></li>
          </ul>
          <p>Please include your full name, registration details, and reason for cancellation. Refunds will be processed to the original payment method within <strong>7–10 business days</strong> of approval.</p>

          <h2>9. Exceptional Circumstances</h2>
          <p>We consider requests for refunds outside these terms in cases of serious illness or bereavement, subject to supporting documentation. These are assessed on a case-by-case basis at our discretion.</p>
        </>
      ),
    },
    delivery: {
      title: "Delivery Timeline",
      updated: "Last updated: 9 June 2026",
      content: (
        <>
          <h2>1. What We Deliver</h2>
          <p>Ace the Academia delivers <strong>live online educational programmes and bootcamps</strong>. Our primary current offering is the <strong>AI n8n Automation Bootcamp</strong> — a 6-week live training programme conducted online via Zoom.</p>
          <p>All deliverables are <strong>digital in nature</strong>. We do not ship physical goods. This policy outlines what you can expect and when, from registration through to programme completion.</p>

          <h2>2. Registration Confirmation</h2>
          <p>After successful payment, you will receive:</p>
          <ul>
            <li>A registration confirmation message via WhatsApp or email <strong>within 24–48 hours</strong></li>
            <li>Your enrolment number and participant details</li>
            <li>A welcome message with preparation instructions</li>
          </ul>

          <h2>3. Pre-Programme Access (7 Days Before Start)</h2>
          <p>Approximately <strong>7 days before the programme start date</strong>, participants will receive:</p>
          <ul>
            <li>Zoom meeting links for all scheduled live sessions</li>
            <li>Access to the participant resource folder (templates, pre-reading material)</li>
            <li>Community or group chat access for peer interaction</li>
            <li>Technical setup guide to ensure your environment is ready</li>
          </ul>

          <h2>4. During the Programme (6 Weeks)</h2>
          <p>The <strong>AI n8n Automation Bootcamp</strong> runs from <strong>1 August to 6 September 2026</strong>. Each week includes:</p>
          <ul>
            <li>Live Zoom sessions on scheduled days and times</li>
            <li>Session recordings made available within <strong>24 hours</strong> of each live session</li>
            <li>Weekly hands-on project tasks and workflow templates</li>
            <li>Support access via WhatsApp and community channels</li>
          </ul>

          <h2>5. Programme Completion</h2>
          <p>Upon successful completion of the programme, participants will receive:</p>
          <ul>
            <li>A digital <strong>Certificate of Completion</strong> issued within 5 business days of the programme end date</li>
            <li>Lifetime access to all programme recordings and resources</li>
            <li>Access to the alumni community network</li>
          </ul>

          <h2>6. Timeline Summary</h2>
          <ul>
            <li><strong>Payment received:</strong> Confirmation within 24–48 hours</li>
            <li><strong>7 days before start:</strong> All links, resources, and access delivered</li>
            <li><strong>1 Aug – 6 Sep 2026:</strong> Live programme delivery (recordings within 24 hrs)</li>
            <li><strong>Within 5 business days of end:</strong> Certificate of Completion issued</li>
          </ul>

          <h2>7. Delays and Disruptions</h2>
          <p>In the event of unforeseen technical disruptions to a live session, the session will be rescheduled and participants notified via WhatsApp as soon as possible. Recordings will be provided in the interim.</p>

          <h2>8. Contact</h2>
          <p>For delivery queries, contact us at <strong>4148924@myuwc.ac.za</strong> or WhatsApp <strong>073 929 8456</strong>.</p>
        </>
      ),
    },
  };

  const page = pages[type];
  if (!page) return null;

  return (
    <div className="page-enter">
      <Nav onNavigate={onNavigate} currentPage={type} scrolled={scrolled} />

      <section className="legal-hero">
        <div className="legal-hero-bg" />
        <div className="div-back" onClick={() => onNavigate("home")}>← Back to Home</div>
        <div className="div-hero-eyebrow">Ace Group · Legal</div>
        <h1 className="div-hero-title" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
          {page.title}
        </h1>
      </section>

      <div className="divider" />

      <nav className="legal-nav">
        {[
          { key: "privacy", label: "Privacy Policy" },
          { key: "terms", label: "Terms of Service" },
          { key: "refund", label: "Refund Policy" },
          { key: "delivery", label: "Delivery Timeline" },
        ].map(({ key, label }) => (
          <a key={key} onClick={() => onNavigate(key)} className={type === key ? "active" : ""}>{label}</a>
        ))}
      </nav>

      <div className="legal-content">
        <div className="legal-meta">{page.updated} · Ace Group of Companies & Ace the Academia · South Africa</div>
        {page.content}
      </div>

      <div className="divider" />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

/* ─────────────────────────────────────────────────
   DIVISION PAGE
───────────────────────────────────────────────── */
function DivisionPage({ division, onBack, onNavigate, scrolled }) {
  const related = SERVICES.filter((s) => s.id !== division.id).slice(0, 4);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [division.id]);

  return (
    <div className="page-enter">
      <Nav onNavigate={onNavigate} currentPage="division" scrolled={scrolled} />

      <section className="div-hero">
        <div className="div-hero-bg" style={{ background: `radial-gradient(ellipse 70% 80% at 60% 40%, ${division.accentColor} 0%, transparent 60%), radial-gradient(ellipse 40% 50% at 15% 80%, ${division.accentColorStrong} 0%, transparent 50%), var(--dark)` }} />
        <div className="div-hero-grid" />
        <div className="div-back" onClick={onBack}>← Back to All Divisions</div>
        <div className="div-hero-eyebrow">Division {division.number} · Ace Group</div>
        <h1 className="div-hero-title">
          {division.tagline.split("\n").map((line, i) => (
            <span key={i} style={{ display: "block" }}>{i === 1 ? <em>{line}</em> : line}</span>
          ))}
        </h1>
        <p className="div-hero-sub">{division.sub}</p>
      </section>

      <div className="div-accent" />

      <div className="div-overview">
        <div className="div-overview-left">
          <div className="div-big-number">{division.number}</div>
          <div className="section-tag">{division.name}</div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.8 }}>
            <span style={{ color: "var(--gold)" }}>Ace Group</span> · South Africa · Est. 2024
          </div>
          <div style={{ marginTop: "2rem" }}>
            <button className="btn-primary" style={{ fontSize: "0.75rem", padding: "0.75rem 1.8rem" }} onClick={() => document.getElementById("contact-div")?.scrollIntoView({ behavior: "smooth" })}>
              Engage With Us
            </button>
          </div>
        </div>
        <div className="div-overview-right">
          {division.overview.map((para, i) => (<p key={i} dangerouslySetInnerHTML={{ __html: para }} />))}
        </div>
      </div>

      <div className="div-pillars">
        {division.pillars.map((p, i) => (
          <div className="div-pillar" key={i}>
            <span className="div-pillar-icon">{p.icon}</span>
            <div className="div-pillar-title">{p.title}</div>
            <div className="div-pillar-text">{p.text}</div>
          </div>
        ))}
      </div>

      <div className="div-stats">
        {division.stats.map((s, i) => (
          <div className="div-stat" key={i}>
            <div className="div-stat-num">{s.num}</div>
            <div className="div-stat-lbl">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="div-offerings">
        <div className="section-tag">What We Offer</div>
        <h2 className="section-title" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", marginBottom: "3rem" }}>
          Our <em>{division.name}</em><br />Capabilities
        </h2>
        <div className="div-offerings-grid">
          {division.offerings.map((o, i) => (
            <div className="div-offering-item" key={i}>
              <div className="div-offering-num">{String(i + 1).padStart(2, "0")}</div>
              <div>
                <div className="div-offering-title">{o.title}</div>
                <div className="div-offering-text">{o.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="div-quote-section">
        <div className="div-quote">{division.quote}</div>
        <div className="div-quote-attr">{division.quoteAttr}</div>
      </div>

      <div className="divider" />

      <div className="div-related">
        <div className="section-tag">Explore More</div>
        <h2 className="section-title" style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", marginBottom: "2.5rem" }}>
          Other <em>Divisions</em>
        </h2>
        <div className="div-related-grid">
          {related.map((s) => (
            <div className="div-related-card" key={s.id} onClick={() => onNavigate("division", null, s)}>
              <div>
                <div className="div-related-icon">{s.icon}</div>
                <div className="div-related-name">{s.name}</div>
                <div className="div-related-desc">{s.desc}</div>
              </div>
              <div className="div-related-arrow">→</div>
            </div>
          ))}
        </div>
      </div>

      <section id="contact-div" className="cta-section">
        <div className="section-tag" style={{ justifyContent: "center" }}>Let's Connect</div>
        <h2 className="cta-title">Interested in<br /><em>{division.name}?</em></h2>
        <p className="cta-sub">Reach out to the Ace Group team and let's explore how our {division.name} division can serve your needs.</p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}>
          <a href="mailto:4148924@myuwc.ac.za" className="btn-primary">Contact Us</a>
          <button className="btn-ghost" onClick={onBack}>All Divisions</button>
        </div>
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder={`Tell us about your ${division.name} needs...`} required />
          <button type="submit" className="btn-primary">Send Message</button>
        </form>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}

/* ─────────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────────── */
function HomePage({ onNavigate, scrolled }) {
  return (
    <>
      <Nav onNavigate={onNavigate} currentPage="home" scrolled={scrolled} />

      <section id="home" className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-tag">South Africa · Est. 2024</div>
        <h1 className="hero-title">
          <span className="block">Building</span>
          <span className="block"><em>Tomorrow's</em></span>
          <span className="block">Africa</span>
        </h1>
        <p className="hero-sub">A diversified group of companies driving innovation across Education, Technology, AI and Transportation — rooted in South Africa, built for the world.</p>
        <div className="hero-actions">
          <a href="#services" className="btn-primary">Our Divisions</a>
          <a href="#about" className="btn-ghost">Learn More</a>
        </div>
        <div className="hero-scroll">Scroll</div>
      </section>

      <div className="divider" />

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

      {/* UPCOMING EVENT BANNER */}
      <div
        onClick={() => onNavigate("events")}
        style={{
          background: "linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(201,151,58,0.06) 100%)",
          border: "0.5px solid rgba(124,58,237,0.2)",
          borderLeft: "3px solid var(--purple)",
          padding: "1.5rem 4rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          cursor: "pointer", transition: "background 0.3s",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "linear-gradient(135deg, rgba(124,58,237,0.18) 0%, rgba(201,151,58,0.08) 100%)"}
        onMouseLeave={e => e.currentTarget.style.background = "linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(201,151,58,0.06) 100%)"}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <div style={{ background: "var(--purple-dim)", border: "0.5px solid rgba(124,58,237,0.3)", padding: "0.3rem 0.8rem", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--purple-light)" }}>
            🔴 Enrolling Now
          </div>
          <div>
            <span style={{ fontWeight: 500, color: "var(--text-primary)", fontSize: "0.9rem" }}>AI n8n Automation Bootcamp</span>
            <span style={{ color: "var(--text-muted)", fontSize: "0.82rem", marginLeft: "1rem" }}>1 Aug – 6 Sep 2026 · R720 · Limited Spots</span>
          </div>
        </div>
        <span style={{ color: "var(--purple-light)", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>View Event →</span>
      </div>

      <section id="services" className="section">
        <div className="section-tag">What We Do</div>
        <h2 className="section-title">Five Divisions.<br /><em>One Vision.</em></h2>
        <div className="services-grid">
          {SERVICES.map((s) => (
            <div className="service-card" key={s.number} onClick={() => onNavigate("division", null, s)}>
              <div className="service-number">{s.number}</div>
              <div className="service-icon">{s.icon}</div>
              <h3 className="service-name">{s.name}</h3>
              <p className="service-desc">{s.desc}</p>
              <div className="service-link">Learn More <span>→</span></div>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="about-section">
        <div style={{ position: "relative" }}>
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
          <p><strong>Ace Group of Companies</strong> is a proudly South African multi-sector conglomerate on a mission to accelerate progress across the continent. We believe that education, technology, and mobility are the three pillars of a thriving Africa.</p>
          <p>From classrooms to codebases, from AI models to eHailing platforms, every division of Ace Group is designed to solve real problems for real people — with <strong>excellence, integrity, and ambition</strong> at our core.</p>
          <p>Headquartered in South Africa, we are expanding our footprint across the continent, bringing world-class solutions to markets that need them most.</p>
          <div className="sa-flag">
            <div className="sa-stripe" style={{ width: 32, background: "#007A4D" }} />
            <div className="sa-stripe" style={{ width: 32, background: "#FFB612" }} />
            <div className="sa-stripe" style={{ width: 32, background: "#DE3831" }} />
            <div className="sa-stripe" style={{ width: 32, background: "#002395" }} />
            <div className="sa-stripe" style={{ width: 32, background: "#FFFFFF" }} />
            <span style={{ fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)", marginLeft: "0.5rem" }}>Proudly South African</span>
          </div>
        </div>
      </section>

      <section id="contact" className="cta-section">
        <div className="section-tag" style={{ justifyContent: "center" }}>Let's Connect</div>
        <h2 className="cta-title">Ready to Build<br /><em>Something Great?</em></h2>
        <p className="cta-sub">Whether you're a partner, investor, or client — we'd love to hear from you. Let's create impact together across Africa and beyond.</p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}>
          <a href="mailto:4148924@myuwc.ac.za" className="btn-primary">Contact Us</a>
          <a href="#services" className="btn-ghost">View Services</a>
        </div>
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required />
          <button type="submit" className="btn-primary">Send Message</button>
        </form>
      </section>

      <Footer onNavigate={onNavigate} />
    </>
  );
}

/* ─────────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────────── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [page, setPage] = useState({ type: "home", division: null });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // navigate(pageType, sectionId?, division?)
  const navigate = (type, section = null, division = null) => {
    if (type === "home" && section) {
      setPage({ type: "home", division: null });
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else if (type === "division" && division) {
      setPage({ type: "division", division });
      window.scrollTo({ top: 0 });
    } else {
      setPage({ type, division: null });
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <>
      <style>{styles}</style>
      {page.type === "home" && <HomePage onNavigate={navigate} scrolled={scrolled} />}
      {page.type === "division" && page.division && (
        <DivisionPage
          division={page.division}
          onBack={() => navigate("home", "services")}
          onNavigate={navigate}
          scrolled={scrolled}
        />
      )}
      {page.type === "events" && <EventsPage onNavigate={navigate} scrolled={scrolled} />}
      {["privacy", "terms", "refund", "delivery"].includes(page.type) && (
        <LegalPage type={page.type} onNavigate={navigate} scrolled={scrolled} />
      )}
    </>
  );
}
