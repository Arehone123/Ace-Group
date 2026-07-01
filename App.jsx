/* ─────────────────────────────────────────────────
   SHARED NAV
───────────────────────────────────────────────── */
export default function Nav({ onNavigate, currentPage, scrolled }) {
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
