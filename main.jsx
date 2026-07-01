import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { styles } from "./styles";
import HomePage from "./pages/HomePage";
import DivisionPage from "./pages/DivisionPage";
import EventsPage from "./pages/EventsPage";
import EducationProductsPage from "./pages/EducationProductsPage";
import TutoringPage from "./pages/TutoringPage";
import SoftwareProductsPage from "./pages/SoftwareProductsPage";
import LegalPage from "./pages/LegalPage";

/* Simple type → URL map for pages that don't need extra params */
const ROUTES = {
  home: "/",
  events: "/events",
  "education-products": "/education-products",
  tutoring: "/tutoring",
  "software-products": "/software-products",
  privacy: "/privacy",
  terms: "/terms",
  refund: "/refund",
  delivery: "/delivery",
};

/* ─────────────────────────────────────────────────
   ROUTES + NAVIGATION
───────────────────────────────────────────────── */
function AppRoutes({ scrolled }) {
  const navigate = useNavigate();
  const location = useLocation();

  const onNavigate = (type, section = null, division = null) => {
    if (type === "home" && section) {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }
    if (type === "division") {
      navigate(division ? `/services/${division.id}` : "/");
      window.scrollTo({ top: 0 });
      return;
    }
    navigate(ROUTES[type] || "/");
    window.scrollTo({ top: 0 });
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage onNavigate={onNavigate} scrolled={scrolled} />} />
      <Route path="/services/:id" element={<DivisionPage onNavigate={onNavigate} scrolled={scrolled} />} />
      <Route path="/events" element={<EventsPage onNavigate={onNavigate} scrolled={scrolled} />} />
      <Route path="/education-products" element={<EducationProductsPage onNavigate={onNavigate} scrolled={scrolled} />} />
      <Route path="/tutoring" element={<TutoringPage onNavigate={onNavigate} scrolled={scrolled} />} />
      <Route path="/software-products" element={<SoftwareProductsPage onNavigate={onNavigate} scrolled={scrolled} />} />
      <Route path="/privacy" element={<LegalPage type="privacy" onNavigate={onNavigate} scrolled={scrolled} />} />
      <Route path="/terms" element={<LegalPage type="terms" onNavigate={onNavigate} scrolled={scrolled} />} />
      <Route path="/refund" element={<LegalPage type="refund" onNavigate={onNavigate} scrolled={scrolled} />} />
      <Route path="/delivery" element={<LegalPage type="delivery" onNavigate={onNavigate} scrolled={scrolled} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

/* ─────────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────────── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <BrowserRouter>
      <style>{styles}</style>
      <AppRoutes scrolled={scrolled} />
    </BrowserRouter>
  );
}
