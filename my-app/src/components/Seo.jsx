import { Head } from "vite-react-ssg";

const SITE_URL = "https://acesoftwares.tech";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

/**
 * Per-page SEO / social tags, baked into the prerendered HTML at build time.
 * Every page passes its own title + description so search engines and AI
 * see unique, meaningful metadata instead of one shared description.
 */
export default function Seo({
  title,
  description,
  path = "",
  image = DEFAULT_IMAGE,
  type = "website",
}) {
  const url = `${SITE_URL}${path}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Ace Group" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
}
