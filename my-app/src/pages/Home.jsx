import heroImage from "../assets/hero.png";
import { bootcamp, company, links, services } from "../data/site";
import RouteLink from "../components/RouteLink";
import Seo from "../components/Seo";

const proofPoints = [
  { value: "5", label: "Operating divisions" },
  { value: "2024", label: "Established in South Africa" },
  { value: "6", label: "Bootcamp weeks" },
  { value: "R720", label: "Current programme price" },
];

export default function Home() {
  return (
    <>
      <Seo
        title="Ace Group | Ace the Academia — Education, Software, AI &amp; Mobility in South Africa"
        description="Ace Group of Companies and Ace the Academia: education, software, AI automation, transportation and EdTech in South Africa."
        path="/"
      />
      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow">{company.location} | {company.established}</p>
          <h1>Building practical futures across learning, technology and mobility.</h1>
          <p className="hero-lead">
            {company.name} brings education, software development, AI automation, transportation and EdTech into one focused group built for real-world impact.
          </p>
          <div className="hero-actions">
            <RouteLink to="/divisions" className="btn btn-primary">Explore Divisions</RouteLink>
            <RouteLink to="/events" className="btn btn-secondary">View Bootcamp</RouteLink>
          </div>
        </div>
        <div className="hero-media" aria-label="Ace Group visual identity">
          <img src={heroImage} alt="Ace Group technology and learning visual" />
          <div className="hero-media-caption">
            <span>ACE</span>
            <strong>Group of Companies</strong>
          </div>
        </div>
      </section>

      <section className="stats-strip" aria-label="Ace Group highlights">
        {proofPoints.map((item) => (
          <div key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section className="feature-banner">
        <div>
          <p className="eyebrow">Now enrolling</p>
          <h2>{bootcamp.title}</h2>
          <p>{bootcamp.dateRange} | {bootcamp.duration} | {bootcamp.delivery}</p>
        </div>
        <div className="banner-actions">
          <a href={links.payment} target="_blank" rel="noreferrer" className="btn btn-primary">Pay with iKhokha</a>
          <RouteLink to="/events" className="btn btn-secondary">Programme Details</RouteLink>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">What we do</p>
          <h2>Five divisions. One operating standard.</h2>
          <p>Each division has a clear role, but they share the same commitment to useful products, careful delivery and measurable outcomes.</p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <RouteLink to={`/divisions/${service.slug}`} className="service-card" key={service.slug}>
              <span className="service-number">{service.number}</span>
              <span className="service-code">{service.shortCode}</span>
              <h3>{service.name}</h3>
              <p>{service.summary}</p>
              <span className="text-link">Learn more</span>
            </RouteLink>
          ))}
        </div>
      </section>

      <section className="split-section">
        <div>
          <p className="eyebrow">Why Ace</p>
          <h2>Built for practical execution, not presentation theatre.</h2>
        </div>
        <div className="principles-list">
          <article>
            <h3>Local realities first</h3>
            <p>We design with South African users, infrastructure and operating conditions in mind.</p>
          </article>
          <article>
            <h3>Education plus technology</h3>
            <p>Our strongest work sits where skills, software and automation meet.</p>
          </article>
          <article>
            <h3>Clear pathways to action</h3>
            <p>From bootcamp payments to division enquiries, every page now has a direct next step.</p>
          </article>
        </div>
      </section>

      <section className="cta-band">
        <p className="eyebrow">Connect with us</p>
        <h2>Follow Ace the Academia and stay close to the work.</h2>
        <div className="center-actions">
          <a href={links.linkedin} target="_blank" rel="noreferrer" className="btn btn-primary">Open LinkedIn</a>
          <RouteLink to="/contact" className="btn btn-secondary">Contact Ace Group</RouteLink>
        </div>
      </section>
    </>
  );
}
