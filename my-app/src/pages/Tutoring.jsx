import ContactForm from "../components/ContactForm";
import PageHeader from "../components/PageHeader";
import RouteLink from "../components/RouteLink";
import Seo from "../components/Seo";
import { links } from "../data/site";
import { tutoring } from "../data/tutoring";

const registerMessage =
  "Hi Ace the Academia, I'd like to register for tutoring.\n\n" +
  "Grade / University year:\n" +
  "Subject / Module:\n" +
  "Topic I need help with:\n" +
  "Weekday or weekend:\n" +
  "One-on-one or group:";

const registerWhatsapp = `https://wa.me/${links.whatsappNumber}?text=${encodeURIComponent(registerMessage)}`;

function ModuleGrid({ rows }) {
  return (
    <div className="value-grid three-col">
      {rows.map((row) => (
        <article className="value-card" key={row.modules}>
          <h3>{row.modules}</h3>
          <p><strong>{row.year}.</strong> {row.support}</p>
        </article>
      ))}
    </div>
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

      <section className="split-section align-start">
        <div>
          <p className="eyebrow">High-school &amp; matric</p>
          <h2>Our main high-school subjects.</h2>
          <div className="tag-list">
            {tutoring.highSchool.main.map((subject) => <span key={subject}>{subject}</span>)}
          </div>
        </div>
        <div className="story-copy">
          <p>{tutoring.highSchool.note}</p>
          <p>
            Support can include difficult topics, schoolwork, tests, examinations and
            past-paper practice for Grade 11, Grade 12 and matric-upgrade learners.
          </p>
        </div>
      </section>

      <section className="section-block muted-section">
        <div className="section-heading">
          <p className="eyebrow">University support</p>
          <h2>Computer Science, Statistics &amp; Mathematics.</h2>
          <p>{tutoring.university.note}</p>
        </div>

        <div className="section-heading narrow-heading">
          <p className="eyebrow">Computer Science</p>
        </div>
        <ModuleGrid rows={tutoring.university.computerScience} />

        <div className="section-heading narrow-heading">
          <p className="eyebrow">Statistics</p>
        </div>
        <ModuleGrid rows={tutoring.university.statistics} />

        <div className="section-heading narrow-heading">
          <p className="eyebrow">Mathematics</p>
          <p>{tutoring.university.mathematics}</p>
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
