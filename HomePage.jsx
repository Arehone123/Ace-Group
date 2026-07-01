import { useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

/* ─────────────────────────────────────────────────
   LEGAL PAGES  (/privacy, /terms, /refund, /delivery)
───────────────────────────────────────────────── */
export default function LegalPage({ type, onNavigate, scrolled }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [type]);

  const pages = {
    privacy: {
      title: "Privacy Policy",
      updated: "Last updated: 9 June 2026",
      content: (
        <>
          <h2>1. Introduction</h2>
          <p>Ace Group of Companies and Ace the Academia ("we", "our", "us") are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or register for our events and programmes, in accordance with the <strong>Protection of Personal Information Act 4 of 2013 (POPIA)</strong> of South Africa.</p>
          <h2>2. Information We Collect</h2>
          <p>We may collect the following personal information:</p>
          <ul>
            <li>Full name and contact details (email address, phone number)</li>
            <li>Payment information (processed securely via our payment providers)</li>
            <li>Academic or professional background (where relevant to programme enrolment)</li>
            <li>Usage data and website interaction information</li>
            <li>Communications you send to us via email or WhatsApp</li>
          </ul>
          <h2>3. How We Use Your Information</h2>
          <p>We use your personal information to:</p>
          <ul>
            <li>Process your registration and payment for bootcamps and programmes</li>
            <li>Communicate event details, schedules, and updates</li>
            <li>Send certificates of completion and course materials</li>
            <li>Respond to enquiries and provide customer support</li>
            <li>Improve our services and develop new offerings</li>
            <li>Comply with legal and regulatory obligations</li>
          </ul>
          <h2>4. Sharing of Information</h2>
          <p>We do not sell your personal information to third parties. We may share your information with:</p>
          <ul>
            <li>Payment processing providers to facilitate transactions</li>
            <li>Video conferencing platforms (Zoom) to deliver live sessions</li>
            <li>Service providers who assist in delivering our programmes</li>
            <li>Law enforcement or regulatory bodies where required by law</li>
          </ul>
          <h2>5. Data Retention</h2>
          <p>We retain your personal information for as long as necessary to fulfil the purposes outlined in this policy, or as required by law. Registration and payment records are retained for a minimum of 5 years for accounting and legal purposes.</p>
          <h2>6. Your Rights under POPIA</h2>
          <p>You have the right to access, correct, or request deletion of your personal information. You may also object to processing or withdraw consent at any time. To exercise these rights, contact us at <strong>4148924@myuwc.ac.za</strong>.</p>
          <h2>7. Cookies</h2>
          <p>Our website may use cookies to improve your browsing experience. You can disable cookies through your browser settings, though this may affect certain website functionality.</p>
          <h2>8. Security</h2>
          <p>We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction.</p>
          <h2>9. Contact Us</h2>
          <p>For any privacy-related queries, please contact us at: <strong>4148924@myuwc.ac.za</strong> or WhatsApp <strong>073 929 8456</strong>.</p>
        </>
      ),
    },
    terms: {
      title: "Terms of Service",
      updated: "Last updated: 9 June 2026",
      content: (
        <>
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing our website or registering for any programme offered by Ace Group of Companies and Ace the Academia ("we", "us", "our"), you agree to be bound by these Terms of Service.</p>
          <h2>2. Services Offered</h2>
          <p>Ace the Academia offers live online bootcamps, private tutoring (Grades 8–12), training programmes, and educational events. Software development, technical consultancy, and related services are provided by Ace Group Software Development.</p>
          <h2>3. Registration and Enrolment</h2>
          <ul>
            <li>Registration is confirmed upon receipt of full payment</li>
            <li>Spots are limited and allocated on a first-come, first-served basis</li>
            <li>You will receive confirmation within 48 hours of payment</li>
            <li>You must be at least 16 years of age to enrol, or have parental/guardian consent</li>
          </ul>
          <h2>4. Payment Terms</h2>
          <p>All prices are quoted in South African Rand (ZAR). Payment must be made in full before access is granted. Secure payment processing is handled by our authorised payment gateway provider.</p>
          <h2>5. Intellectual Property</h2>
          <p>All course materials, content, recordings, templates, and workflows are the intellectual property of Ace the Academia. You are granted a personal, non-transferable licence for your own learning purposes only.</p>
          <h2>6. Code of Conduct</h2>
          <p>Participants are expected to engage respectfully in all sessions and community spaces. We reserve the right to remove any participant who engages in disruptive or inappropriate behaviour without refund.</p>
          <h2>7. Limitation of Liability</h2>
          <p>To the fullest extent permitted by South African law, Ace Group and Ace the Academia shall not be liable for any indirect, incidental, or consequential damages arising from participation in our programmes.</p>
          <h2>8. Governing Law</h2>
          <p>These Terms are governed by the laws of the Republic of South Africa.</p>
          <h2>9. Contact</h2>
          <p>Questions? Contact us at <strong>4148924@myuwc.ac.za</strong> or WhatsApp <strong>073 929 8456</strong>.</p>
        </>
      ),
    },
    refund: {
      title: "Refund Policy",
      updated: "Last updated: 9 June 2026",
      content: (
        <>
          <h2>1. Overview</h2>
          <p>Ace the Academia is committed to delivering high-quality training and education. This policy applies to all bootcamp, tutoring, and programme registrations.</p>
          <h2>2. Cooling-Off Period</h2>
          <p>In accordance with the <strong>Consumer Protection Act 68 of 2008 (CPA)</strong> of South Africa, you have a 5 business day cooling-off period from the date of purchase during which you may cancel and receive a full refund, provided the service has not yet commenced.</p>
          <h2>3. Tutoring Cancellations</h2>
          <ul>
            <li><strong>Before first session:</strong> Full refund, less 10% administration fee</li>
            <li><strong>After first session only:</strong> 50% refund of the monthly fee</li>
            <li><strong>After second session or more:</strong> No refund for that month's payment</li>
            <li>Monthly tutoring may be cancelled with 5 business days' notice before the next billing cycle</li>
          </ul>
          <h2>4. Bootcamp Cancellations</h2>
          <ul>
            <li><strong>More than 14 days before start:</strong> Full refund, less 10% admin fee</li>
            <li><strong>7–14 days before start:</strong> 50% refund</li>
            <li><strong>Less than 7 days before start:</strong> No refund; registration may transfer to next cohort</li>
            <li><strong>After Week 1:</strong> No refund available</li>
          </ul>
          <h2>5. Programme Cancellation by Ace the Academia</h2>
          <p>If we cancel a scheduled programme, all registered participants receive a <strong>full refund</strong> within 7 business days, or the option to transfer to the next cohort.</p>
          <h2>6. How to Request a Refund</h2>
          <ul>
            <li>Email: <strong>4148924@myuwc.ac.za</strong></li>
            <li>WhatsApp: <strong>073 929 8456</strong></li>
          </ul>
          <p>Refunds are processed to the original payment method within 7–10 business days of approval.</p>
        </>
      ),
    },
    delivery: {
      title: "Delivery Timeline",
      updated: "Last updated: 9 June 2026",
      content: (
        <>
          <h2>1. What We Deliver</h2>
          <p>Ace the Academia delivers <strong>live online educational programmes, bootcamps, and tutoring services</strong>. All deliverables are digital in nature. We do not ship physical goods.</p>
          <h2>2. Tutoring — Delivery Timeline</h2>
          <ul>
            <li><strong>Payment received:</strong> Confirmation within 24–48 hours</li>
            <li><strong>Tutor matching:</strong> Within 2 business days of confirmed enrolment</li>
            <li><strong>First session:</strong> Scheduled within 3–5 business days of matching</li>
            <li><strong>Monthly progress report:</strong> Delivered within 3 business days of month end</li>
          </ul>
          <h2>3. Bootcamp — Delivery Timeline</h2>
          <ul>
            <li><strong>Payment received:</strong> Confirmation within 24–48 hours</li>
            <li><strong>7 days before start:</strong> Zoom links, resources, and community access delivered</li>
            <li><strong>1 Aug – 6 Sep 2026:</strong> Live programme (session recordings within 24 hrs)</li>
            <li><strong>Within 5 business days of end:</strong> Certificate of Completion issued</li>
          </ul>
          <h2>4. Software Development — Delivery Timeline</h2>
          <p>Software project timelines are agreed upon in the project proposal and vary by scope. As a general guide:</p>
          <ul>
            <li><strong>Quote request:</strong> Initial response within 24 business hours; detailed proposal within 48–72 hours</li>
            <li><strong>Project kickoff:</strong> Within 5 business days of contract signing and deposit receipt</li>
            <li><strong>MVP delivery:</strong> Typically 4–12 weeks depending on scope</li>
            <li><strong>Full project:</strong> Timelines confirmed in the signed project agreement</li>
          </ul>
          <h2>5. Disruptions</h2>
          <p>In the event of unforeseen disruptions, participants are notified via WhatsApp and alternative arrangements are made. Recordings are provided where live sessions are affected.</p>
          <h2>6. Contact</h2>
          <p>For delivery queries: <strong>4148924@myuwc.ac.za</strong> or WhatsApp <strong>073 929 8456</strong>.</p>
        </>
      ),
    },
  };

  const page = pages[type];
  if (!page) return null;

  return (
    <div className="page-enter">
      <Nav onNavigate={onNavigate} currentPage={type} scrolled={scrolled} />
      <section className="legal-hero">
        <div className="legal-hero-bg" />
        <div className="div-back" onClick={() => onNavigate("home")}>← Back to Home</div>
        <div className="div-hero-eyebrow">Ace Group · Legal</div>
        <h1 className="div-hero-title" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>{page.title}</h1>
      </section>
      <div className="divider" />
      <nav className="legal-nav">
        {[
          { key: "privacy", label: "Privacy Policy" },
          { key: "terms", label: "Terms of Service" },
          { key: "refund", label: "Refund Policy" },
          { key: "delivery", label: "Delivery Timeline" },
        ].map(({ key, label }) => (
          <a key={key} onClick={() => onNavigate(key)} className={type === key ? "active" : ""}>{label}</a>
        ))}
      </nav>
      <div className="legal-content">
        <div className="legal-meta">{page.updated} · Ace Group of Companies & Ace the Academia · South Africa</div>
        {page.content}
      </div>
      <div className="divider" />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
