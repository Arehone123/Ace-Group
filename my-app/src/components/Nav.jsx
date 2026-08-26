import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { links } from "../data/site";
import RouteLink from "./RouteLink";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Divisions", to: "/divisions" },
  { label: "Tutoring", to: "/tutoring" },
  { label: "Events", to: "/events" },
  { label: "Contact", to: "/contact" },
  { label: "Register", to: "/register" },
];

function isActive(pathname, to) {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}

export default function Nav({ theme, onToggleTheme }) {
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className={`site-header ${isScrolled || isOpen ? "is-solid" : ""}`}>
      <RouteLink to="/" className="brand" aria-label="Ace Group home">
        <span className="brand-mark">AG</span>
        <span className="brand-copy">
          <strong>Ace Group</strong>
          <small>Ace the Academia</small>
        </span>
      </RouteLink>

      <div className="header-right">
        <nav className={`primary-nav ${isOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          {navItems.map((item) => (
            <RouteLink
              key={item.to}
              to={item.to}
              className={isActive(pathname, item.to) ? "is-active" : ""}
            >
              {item.label}
            </RouteLink>
          ))}
          <a href={links.linkedin} target="_blank" rel="noreferrer" className="nav-social">
            LinkedIn
          </a>
          <a href={links.payment} target="_blank" rel="noreferrer" className="nav-payment">
            Pay Now
          </a>
        </nav>

        <div className="header-controls">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />

          <button
            className="menu-toggle"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
