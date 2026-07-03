import { links } from "../data/site";

export default function ContactForm({ subject = "Ace Group enquiry", message = "Tell us what you would like to build or learn." }) {
  return (
    <form className="contact-form" action={`mailto:${links.email}`} method="post" encType="text/plain">
      <label>
        <span>Name</span>
        <input name="name" type="text" required />
      </label>
      <label>
        <span>Email</span>
        <input name="email" type="email" required />
      </label>
      <label>
        <span>Subject</span>
        <input name="subject" type="text" defaultValue={subject} />
      </label>
      <label>
        <span>Message</span>
        <textarea name="message" rows="6" placeholder={message} required />
      </label>
      <button className="btn btn-primary" type="submit">Send Message</button>
    </form>
  );
}
