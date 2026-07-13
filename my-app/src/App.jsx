import { useEffect, useMemo, useState } from "react";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import RouteLink from "./components/RouteLink";
import { services } from "./data/site";
import About from "./pages/About";
import Contact from "./pages/Contact";
import DivisionDetail from "./pages/DivisionDetail";
import Divisions from "./pages/Divisions";
import Events from "./pages/Events";
import Home from "./pages/Home";
import DeliveryTimeline from "./pages/legal/DeliveryTimeline";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import RefundPolicy from "./pages/legal/RefundPolicy";
import TermsOfService from "./pages/legal/TermsOfService";
import { getPreferredTheme, persistTheme } from "./theme";
import "./styles.css";

function getRoute() {
  const pathname = window.location.pathname.replace(/\/$/, "") || "/";
  return { pathname, hash: window.location.hash };
}

function NotFound() {
  return (
    <section className="not-found">
      <p className="eyebrow">Page not found</p>
      <h1>This page is not part of the Ace Group site yet.</h1>
      <p>Return home or explore the divisions to keep moving.</p>
      <div className="center-actions">
        <RouteLink to="/" className="btn btn-primary">Go Home</RouteLink>
        <RouteLink to="/divisions" className="btn btn-secondary">View Divisions</RouteLink>
      </div>
    </section>
  );
}

export default function App() {
  const [route, setRoute] = useState(getRoute);
  const [theme, setTheme] = useState(getPreferredTheme);

  useEffect(() => {
    const updateRoute = () => setRoute(getRoute());
    window.addEventListener("popstate", updateRoute);
    window.addEventListener("app:navigate", updateRoute);
    return () => {
      window.removeEventListener("popstate", updateRoute);
      window.removeEventListener("app:navigate", updateRoute);
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    persistTheme(theme);
  }, [theme]);

  const toggleTheme = () => setTheme((current) => (current === "light" ? "dark" : "light"));

  useEffect(() => {
    const pageTitle = route.pathname === "/" ? "Ace Group" : route.pathname.split("/").filter(Boolean).map((part) => part.replaceAll("-", " ")).join(" | ");
    document.title = `${pageTitle} | Ace Group`;

    window.requestAnimationFrame(() => {
      if (route.hash) {
        document.getElementById(route.hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    });
  }, [route]);

  const page = useMemo(() => {
    if (route.pathname === "/") return <Home />;
    if (route.pathname === "/about") return <About />;
    if (route.pathname === "/divisions") return <Divisions />;
    if (route.pathname === "/events") return <Events />;
    if (route.pathname === "/contact") return <Contact />;
    if (route.pathname === "/privacy-policy") return <PrivacyPolicy />;
    if (route.pathname === "/terms-of-service") return <TermsOfService />;
    if (route.pathname === "/refund-policy") return <RefundPolicy />;
    if (route.pathname === "/delivery-timeline") return <DeliveryTimeline />;

    if (route.pathname.startsWith("/divisions/")) {
      const slug = route.pathname.split("/").pop();
      const service = services.find((item) => item.slug === slug);
      return service ? <DivisionDetail service={service} /> : <NotFound />;
    }

    return <NotFound />;
  }, [route.pathname]);

  return (
    <>
      <Nav pathname={route.pathname} theme={theme} onToggleTheme={toggleTheme} />
      <main className="page-shell" key={route.pathname}>{page}</main>
      <Footer />
    </>
  );
}
