import PageHeader from "../components/PageHeader";
import RouteLink from "../components/RouteLink";
import Seo from "../components/Seo";
import { services } from "../data/site";

export default function Divisions() {
  return (
    <>
      <Seo
        title="Our Divisions | Ace Group"
        description="Five focused divisions under Ace Group: Education, Software Development, AI and Automation Engineering, eHailing and Transportation, and Educational Technology."
        path="/divisions"
      />
      <PageHeader
        eyebrow="Ace Group divisions"
        title="Focused business lines with one shared standard."
        lead="Move through each division to understand what it offers, who it serves and where it fits inside the wider Ace Group vision."
      />

      <section className="section-block">
        <div className="division-list">
          {services.map((service) => (
            <RouteLink to={`/divisions/${service.slug}`} className="division-row" key={service.slug}>
              <span>{service.number}</span>
              <div>
                <h2>{service.name}</h2>
                <p>{service.intro}</p>
              </div>
              <strong>{service.shortCode}</strong>
            </RouteLink>
          ))}
        </div>
      </section>

      <section className="split-section">
        <div>
          <p className="eyebrow">Engagement model</p>
          <h2>From first conversation to working system.</h2>
        </div>
        <div className="process-grid">
          <article>
            <span>01</span>
            <h3>Understand</h3>
            <p>We clarify the problem, audience, timeline and constraints before proposing a direction.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Shape</h3>
            <p>We map the service, programme, platform or workflow into a practical delivery plan.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Build</h3>
            <p>We deliver in clear stages, review the work and prepare it for handover or growth.</p>
          </article>
        </div>
      </section>
    </>
  );
}
