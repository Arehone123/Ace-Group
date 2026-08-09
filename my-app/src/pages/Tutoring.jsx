import ContactForm from "../components/ContactForm";
import PageHeader from "../components/PageHeader";
import RouteLink from "../components/RouteLink";
import Seo from "../components/Seo";
import { links } from "../data/site";
import { tutoring, pricing } from "../data/tutoring";

const registerMessage =
  "Hi Ace the Academia, I'd like to register for tutoring.\n\n" +
  "Grade / University year:\n" +
  "Subject / Module:\n" +
  "Topic I need help with:\n" +
  "Weekday or weekend:\n" +
  "One-on-one or group:";

const registerWhatsapp = `https://wa.me/${links.whatsappNumber}?text=${encodeURIComponent(registerMessage)}`;

function ModuleAccordion({ title, hint, rows }) {
  return (
    <details className="module-accordion">
      <summary>
        <span className="summary-title">
          {title}
          <span className="summary-hint">{hint}</span>
        </span>
      </summary>
      <ul className="module-list">
        {rows.map((row) => (
          <li key={row.modules}>
            <span className="mod-year">{row.year}</span>
            <strong>{row.modules}</strong> — {row.support}
          </li>
        ))}
      </ul>
    </details>
  );
}

export default function Tutoring() {
  return (
    <>
      <Seo
        title="Online Tutoring | Ace the Academia"
        description="Online tutoring for Grade 11, Grade 12, matric upgrades and university students. Maths, Maths Literacy, Physical Sciences, plus UWC Computer Science, Statistics and Mathematics. One-on-one, group classes and weekend bootcamps."
        path="/tutoring"
      />

      <PageHeader
        eyebrow="Ace the Academia tutoring"
        title="Online tutoring that helps you understand your work."
        lead={tutoring.intro}
      >
        <a href={registerWhatsapp} target="_blank" rel="noreferrer" className="btn btn-primary">
          Register on WhatsApp
        </a>
        <RouteLink to="/contact" className="btn btn-secondary">Ask a Question</RouteLink>
      </PageHeader>

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">Who we support</p>
          <h2>Support for learners and university students.</h2>
        </div>
        <div className="value-grid">
          {tutoring.audiences.map((item) => (
            <article className="value-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------------- HIGH SCHOOL ---------------- */}
      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">For school learners</p>
          <h2>High School &amp; Matric</h2>
          <p>
            We tutor Mathematics, Mathematical Literacy and Physical Sciences for
            Grade 11, Grade 12 and matric-upgrade learners — difficult topics,
            schoolwork, tests, examinations and past-paper practice.
          </p>
        </div>

        <p className="price-note">{pricing.note}</p>

        <div className="module-accordions">
          <details className="module-accordion" open>
            <summary>
              <span className="summary-title">
                Mathematics pricing
                <span className="summary-hint">per grade, per month — tap to view</span>
              </span>
            </summary>
            <ul className="module-list">
              {pricing.highSchoolMaths.map((row) => (
                <li key={row.grade}>
                  <span className="mod-year">{row.grade}</span>
                  Group class <span className="mod-price">from {row.group}</span>
                  {" · "}One-on-one <span className="mod-price">from {row.oneOnOne}</span>
                  <span className="summary-hint">per month</span>
                </li>
              ))}
            </ul>
          </details>
          <p className="on-request-note">{pricing.highSchoolOther}</p>
        </div>
      </section>

      {/* ---------------- UNIVERSITY ---------------- */}
      <section className="section-block muted-section">
        <div className="section-heading">
          <p className="eyebrow">For university students</p>
          <h2>University</h2>
          <p>{tutoring.university.note}</p>
        </div>

        <div className="value-grid three-col">
          {pricing.university.map((item) => (
            <article className="value-card" key={item.name}>
              <h3>{item.name}</h3>
              <p>{item.detail}</p>
              <span className="price-tag">
                {item.price}
                <span className="price-unit">{item.unit}</span>
              </span>
            </article>
          ))}
        </div>

        <p className="on-request-note">{pricing.universityOther}</p>

        <div className="section-heading narrow-heading">
          <p className="eyebrow">Modules we cover</p>
        </div>
        <div className="module-accordions">
          <ModuleAccordion
            title="Computer Science"
            hint={`${tutoring.university.computerScience.length} modules — tap to view`}
            rows={tutoring.university.computerScience}
          />
          <ModuleAccordion
            title="Statistics"
            hint={`${tutoring.university.statistics.length} modules — tap to view`}
            rows={tutoring.university.statistics}
          />
          <details className="module-accordion">
            <summary>
              <span className="summary-title">
                Mathematics
                <span className="summary-hint">first &amp; second year — tap to view</span>
              </span>
            </summary>
            <ul className="module-list">
              <li>{tutoring.university.mathematics}</li>
            </ul>
          </details>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">Ways to learn</p>
          <h2>Types of tutoring available.</h2>
        </div>
        <div className="value-grid">
          {tutoring.types.map((item) => (
            <article className="value-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="split-section align-start">
        <div>
          <p className="eyebrow">The process</p>
          <h2>How the classes work and how to register.</h2>
        </div>
        <div className="two-list-grid">
          <div>
            <h3>How the classes work</h3>
            <ul>
              {tutoring.howItWorks.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div>
            <h3>How to register</h3>
            <ul>
              {tutoring.register.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-block muted-section">
        <div className="section-heading narrow-heading">
          <p className="eyebrow">Before you message us</p>
          <h2>What to send when you contact us.</h2>
        </div>
        <div className="offering-grid">
          {tutoring.whatToSend.map((item, index) => (
            <article key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="quote-band">
        <blockquote>{tutoring.assignmentPolicy}</blockquote>
        <span>Assignment guidance policy</span>
      </section>

      <section className="section-block contact-slab">
        <div className="section-heading narrow-heading">
          <p className="eyebrow">Register</p>
          <h2>Start your tutoring on WhatsApp.</h2>
          <p>{tutoring.team}</p>
        </div>
        <ContactForm
          defaultMessage={registerMessage}
          placeholder="Tell us your grade or university year, subject or module, and the topic you need help with..."
        />
      </section>

      <section className="cta-band">
        <p className="eyebrow">Ready to begin</p>
        <h2>Message us and let's plan your next session.</h2>
        <div className="center-actions">
          <a href={registerWhatsapp} target="_blank" rel="noreferrer" className="btn btn-primary">
            Register on WhatsApp
          </a>
          <RouteLink to="/contact" className="btn btn-secondary">Contact Ace Group</RouteLink>
        </div>
      </section>
    </>
  );
}
