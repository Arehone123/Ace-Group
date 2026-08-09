import { useState } from "react";
import { links } from "../data/site";

const DEFAULT_MESSAGE =
  "Hi Ace Group, I'd like to make an enquiry. Could you tell me more about how you can help?";

function buildWhatsappUrl(text) {
  return `https://wa.me/${links.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export default function ContactForm({
  defaultMessage = DEFAULT_MESSAGE,
  placeholder = "Tell us what you would like to build or learn...",
}) {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  // Compose the message that will be pre-filled in WhatsApp.
  // If both fields are empty we fall back to the default enquiry message.
  const trimmedName = name.trim();
  const trimmedNote = note.trim();

  let composedMessage;
  if (!trimmedName && !trimmedNote) {
    composedMessage = defaultMessage;
  } else {
    const intro = trimmedName ? `Hi Ace Group, my name is ${trimmedName}.` : "Hi Ace Group.";
    const body = trimmedNote ? ` ${trimmedNote}` : " I'd like to make an enquiry.";
    composedMessage = `${intro}${body}`;
  }

  const whatsappUrl = buildWhatsappUrl(composedMessage);

  return (
    <div className="contact-form">
      <label>
        <span>Name (optional)</span>
        <input
          name="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
        />
      </label>
      <label>
        <span>What do you need? (optional)</span>
        <textarea
          name="note"
          rows="5"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder={placeholder}
        />
      </label>
      <a className="btn btn-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
        Chat with us on WhatsApp
      </a>
      <p className="contact-form-hint">
        This opens WhatsApp with your message ready to send to {links.phone}. Prefer email?
        Reach us at <a href={`mailto:${links.email}`}>{links.email}</a>.
      </p>
    </div>
  );
}
