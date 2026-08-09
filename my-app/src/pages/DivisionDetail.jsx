import { useParams } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import PageHeader from "../components/PageHeader";
import RouteLink from "../components/RouteLink";
import Seo from "../components/Seo";
import { services } from "../data/site";
import NotFound from "./NotFound";

export default function DivisionDetail() {
  const { slug } = useParams();
  const service = services.find((item) => item.slug === slug);

  if (!service) return <NotFound />;

  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <Seo
        title={`${service.name} | Ace Group`}
        description={service.summary}
        path={`/divisions/${service.slug}`}
      />
      <PageHeader
        eyebrow={`Division ${service.number}`}
        title={service.tagline.join(" ")}
        lead={service.intro}
      >
        <RouteLink to="/contact" className="btn btn-primary">Start a Conversation</RouteLink>
        {service.slug === "education" && (
          <RouteLink to="/tutoring" className="btn btn-secondary">View Tutoring</RouteLink>
        )}
        <RouteLink to="/divisions" className="btn btn-secondary">All Divisions</RouteLink>
      </PageHeader>

      <section className="split-section align-start">
        <div>
          <p className="eyebrow">{service.name}</p>
          <h2>{service.summary}</h2>
          <div className="mini-stats">
            {service.stats.map((stat) => <span key={stat}>{stat}</span>)}
          </div>
        </div>
        <div className="story-copy">
          {service.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section className="section-block muted-section">
        <div className="section-heading">
          <p className="eyebrow">Core pillars</p>
          <h2>What guides the work.</h2>
        </div>
        <div className="value-grid three-col">
          {service.pillars.map((pillar) => (
            <article className="value-card" key={pillar.title}>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading narrow-heading">
          <p className="eyebrow">Capabilities</p>
          <h2>Services inside {service.name}.</h2>
        </div>
        <div className="offering-grid">
          {service.offerings.map((offering, index) => (
            <article key={offering}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{offering}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="quote-band">
        <blockquote>{service.quote}</blockquote>
        <span>{service.name}</span>
      </section>

      <section className="section-block muted-section">
        <div className="section-heading">
          <p className="eyebrow">Related divisions</p>
          <h2>Explore the wider group.</h2>
        </div>
        <div className="service-grid compact-grid">
          {related.map((item) => (
            <RouteLink to={`/divisions/${item.slug}`} className="service-card" key={item.slug}>
              <span className="service-number">{item.number}</span>
              <span className="service-code">{item.shortCode}</span>
              <h3>{item.name}</h3>
              <p>{item.summary}</p>
              <span className="text-link">Open division</span>
            </RouteLink>
          ))}
        </div>
      </section>

      <section className="section-block contact-slab">
        <div className="section-heading narrow-heading">
          <p className="eyebrow">Enquire</p>
          <h2>Talk to us about {service.name}.</h2>
        </div>
        <ContactForm
          defaultMessage={`Hi Ace Group, I'd like to find out more about your ${service.name} division. Could you share some details?`}
          placeholder={`Tell us what you need from ${service.name}...`}
        />
      </section>
    </>
  );
}
