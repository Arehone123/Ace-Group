import PageHeader from "../components/PageHeader";
import RouteLink from "../components/RouteLink";
import Seo from "../components/Seo";
import { company, links } from "../data/site";

const values = [
  { title: "Usefulness", text: "We prioritise products, programmes and services that solve specific problems for specific people." },
  { title: "Trust", text: "Clear communication, transparent payment flows and reliable delivery are part of the product." },
  { title: "Momentum", text: "We work in practical increments so ideas move from concept to launch without losing quality." },
  { title: "Access", text: "Our education and technology work is designed for people navigating real constraints." },
];

export default function About() {
  return (
    <>
      <Seo
        title="About Ace Group | Ace the Academia"
        description="Ace Group of Companies is a South African multi-sector group connecting education, software, AI automation, mobility and EdTech through focused divisions."
        path="/about"
      />
      <PageHeader
        eyebrow="About Ace Group"
        title="A South African group turning capability into practical systems."
        lead="Ace Group connects learning, software, AI, mobility and education technology through divisions that can operate independently and strengthen each other."
      >
        <a href={links.linkedin} target="_blank" rel="noreferrer" className="btn btn-primary">View LinkedIn</a>
        <RouteLink to="/divisions" className="btn btn-secondary">See Divisions</RouteLink>
      </PageHeader>

      <section className="split-section align-start">
        <div>
          <p className="eyebrow">Operating idea</p>
          <h2>One group, multiple routes to impact.</h2>
        </div>
        <div className="story-copy">
          <p>{company.legalName} is a proudly South African multi-sector group focused on education, technology and mobility.</p>
          <p>The group is structured around divisions that solve different problems while sharing skills, systems and standards. Ace the Academia sits at the centre of our education and practical training work.</p>
          <p>Our direction is simple: build services that people can understand, pay for, access and use with confidence.</p>
        </div>
      </section>

      <section className="section-block muted-section">
        <div className="section-heading">
          <p className="eyebrow">How we work</p>
          <h2>Principles that keep the group grounded.</h2>
        </div>
        <div className="value-grid">
          {values.map((value) => (
            <article className="value-card" key={value.title}>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="timeline-section">
        <div className="timeline-item">
          <span>2024</span>
          <div>
            <h3>Foundation</h3>
            <p>Ace Group is established with an ambition to connect education, technology and mobility.</p>
          </div>
        </div>
        <div className="timeline-item">
          <span>2026</span>
          <div>
            <h3>Practical training</h3>
            <p>Ace the Academia launches focused live programmes such as the AI n8n Automation Bootcamp.</p>
          </div>
        </div>
        <div className="timeline-item">
          <span>Next</span>
          <div>
            <h3>Division growth</h3>
            <p>Each division grows around clear offers, stronger systems and partnerships that expand reach.</p>
          </div>
        </div>
      </section>
    </>
  );
}
