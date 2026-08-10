import { company, links } from "../data/site";
import RouteLink from "./RouteLink";

const footerLinks = [
  { label: "Privacy", to: "/privacy-policy" },
  { label: "Terms", to: "/terms-of-service" },
  { label: "Refunds", to: "/refund-policy" },
  { label: "Delivery", to: "/delivery-timeline" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <RouteLink to="/" className="footer-brand">
            Ace Group
          </RouteLink>
          <p>{company.tagline}</p>
        </div>

        <div className="footer-columns">
          <div>
            <h2>Explore</h2>
            <RouteLink to="/about">About</RouteLink>
            <RouteLink to="/divisions">Divisions</RouteLink>
            <RouteLink to="/tutoring">Tutoring</RouteLink>
            <RouteLink to="/events">Events</RouteLink>
            <RouteLink to="/contact">Contact</RouteLink>
          </div>
          <div>
            <h2>Programme</h2>
            <a href={links.payment} target="_blank" rel="noreferrer">iKhokha payment</a>
            <a href={links.whatsapp} target="_blank" rel="noreferrer">WhatsApp registration</a>
            <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn profile</a>
            <a href={`mailto:${links.email}`}>{links.email}</a>
          </div>
          <div>
            <h2>Legal</h2>
            {footerLinks.map((item) => (
              <RouteLink key={item.to} to={item.to}>{item.label}</RouteLink>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>Copyright {new Date().getFullYear()} {company.legalName}. All rights reserved.</span>
        <span>{company.location} | {company.academy}</span>
      </div>
    </footer>
  );
}
