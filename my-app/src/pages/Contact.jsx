import ContactForm from "../components/ContactForm";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import { links } from "../data/site";

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact Ace Group | Ace the Academia"
        description="Get in touch with Ace Group for programme support, division enquiries, partnerships, software work or AI automation projects. Reach us on WhatsApp or email."
        path="/contact"
      />
      <PageHeader
        eyebrow="Contact"
        title="Start with a clear message. We will route it to the right division."
        lead="Reach out for programme support, division enquiries, partnerships, software work or AI automation projects."
      />

      <section className="contact-page-grid">
        <div className="contact-methods">
          <article>
            <span>Email</span>
            <a href={`mailto:${links.email}`}>{links.email}</a>
            <p>Best for proposals, documents and formal programme queries.</p>
          </article>
          <article>
            <span>WhatsApp</span>
            <a href={links.whatsapp} target="_blank" rel="noreferrer">{links.phone}</a>
            <p>Best for bootcamp registration questions and quick follow-up.</p>
          </article>
          <article>
            <span>LinkedIn</span>
            <a href={links.linkedin} target="_blank" rel="noreferrer">Ace the Academia</a>
            <p>Follow the company profile and connect with public updates.</p>
          </article>
          <article>
            <span>Payment</span>
            <a href={links.payment} target="_blank" rel="noreferrer">iKhokha secure payment</a>
            <p>Use this link for the current bootcamp payment flow.</p>
          </article>
        </div>

        <div className="contact-slab inline-form">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
