import PageHeader from "../../components/PageHeader";
import RouteLink from "../../components/RouteLink";
import Seo from "../../components/Seo";
import { legalPages } from "../../data/legal";

const legalNav = [
  legalPages.privacy,
  legalPages.terms,
  legalPages.refund,
  legalPages.delivery,
];

export default function LegalLayout({ page }) {
  return (
    <>
      <Seo
        title={`${page.title} | Ace Group`}
        description={`${page.title} for Ace Group of Companies and Ace the Academia. ${page.updated}.`}
        path={page.path}
      />
      <PageHeader eyebrow="Ace Group legal" title={page.title} lead={`${page.updated} | Ace Group of Companies and Ace the Academia | South Africa`} compact />

      <nav className="legal-nav" aria-label="Legal pages">
        {legalNav.map((item) => (
          <RouteLink key={item.path} to={item.path} className={item.path === page.path ? "is-active" : ""}>
            {item.title}
          </RouteLink>
        ))}
      </nav>

      <article className="legal-content">
        {page.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.list && (
              <ul>
                {section.list.map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}
          </section>
        ))}
      </article>
    </>
  );
}
