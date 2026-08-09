import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import { getPreferredTheme, persistTheme } from "./theme";
import "./styles.css";

export default function Layout() {
  const location = useLocation();
  const [theme, setTheme] = useState(getPreferredTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    persistTheme(theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((current) => (current === "light" ? "dark" : "light"));

  // Scroll to top (or to a hash target) on every route change.
  useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname, location.hash]);

  return (
    <>
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <main className="page-shell" key={location.pathname}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
