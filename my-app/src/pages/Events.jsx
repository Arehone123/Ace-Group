import PageHeader from "../components/PageHeader";
import RouteLink from "../components/RouteLink";
import Seo from "../components/Seo";
import { bootcamp, links } from "../data/site";

export default function Events() {
  return (
    <>
      <Seo
        title="AI n8n Automation Bootcamp | Ace the Academia"
        description="A 6-week live online bootcamp (starts 29 August 2026) on building AI-powered automations with n8n, APIs, AI agents and cloud deployment. R720 once-off."
        path="/events"
      />
      <PageHeader
        eyebrow="Ace the Academia events"
        title={bootcamp.title}
        lead={bootcamp.summary}
      >
        <a href={links.payment} target="_blank" rel="noreferrer" className="btn btn-primary">Pay with iKhokha</a>
        <a href={links.whatsapp} target="_blank" rel="noreferrer" className="btn btn-secondary">Register on WhatsApp</a>
      </PageHeader>

      <section className="event-overview">
        <div className="event-main-panel">
          <p className="eyebrow">Featured programme</p>
          <h2>Build automations that can actually run in the real world.</h2>
          <p>{bootcamp.summary}</p>
          <div className="tag-list">
            {bootcamp.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </div>
        <aside className="price-panel">
          <span>Full bootcamp investment</span>
          <strong>{bootcamp.price}</strong>
          <p>Once-off payment | Full programme access</p>
          <a href={links.payment} target="_blank" rel="noreferrer" className="btn btn-primary">Secure Your Spot</a>
          <small>Payments are processed through the iKhokha secure payment link.</small>
        </aside>
      </section>

      <section className="section-block muted-section">
        <div className="section-heading">
          <p className="eyebrow">Programme facts</p>
          <h2>Everything important at a glance.</h2>
        </div>
        <div className="fact-grid">
          <article><span>Date</span><strong>{bootcamp.dateRange}</strong></article>
          <article><span>Duration</span><strong>{bootcamp.duration}</strong></article>
          <article><span>Delivery</span><strong>{bootcamp.delivery}</strong></article>
          <article><span>Host</span><strong>{bootcamp.host}</strong></article>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">Curriculum</p>
          <h2>Six weeks from foundations to capstone.</h2>
        </div>
        <div className="phase-grid">
          {bootcamp.phases.map((phase) => (
            <article className="phase-card" key={phase.number}>
              <div>
                <span>{phase.number}</span>
                <small>{phase.label}</small>
              </div>
              <h3>{phase.title}</h3>
              <ul>
                {phase.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="split-section align-start">
        <div>
          <p className="eyebrow">Included</p>
          <h2>Designed to help you finish with working assets.</h2>
        </div>
        <div className="two-list-grid">
          <div>
            <h3>What you get</h3>
            <ul>
              {bootcamp.includes.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div>
            <h3>What you can do</h3>
            <ul>
              {bootcamp.outcomes.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <p className="eyebrow">Ready to enrol</p>
        <h2>Use the iKhokha payment link to secure your place.</h2>
        <div className="center-actions">
          <a href={links.payment} target="_blank" rel="noreferrer" className="btn btn-primary">Pay with iKhokha</a>
          <RouteLink to="/delivery-timeline" className="btn btn-secondary">Delivery Timeline</RouteLink>
        </div>
      </section>
    </>
  );
}
