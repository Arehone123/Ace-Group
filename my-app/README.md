# Ace Group of Companies — Website

Marketing website for Ace Group of Companies (Ace the Academia), built with
**React 19**, **React Router 6** and **Vite 6**, and **prerendered to static
HTML** at build time with [`vite-react-ssg`](https://github.com/Daydreamer-riri/vite-react-ssg)
so every page is fully crawlable by search engines and AI tools.

## Why static generation

The site is a single-page app, but each route is rendered to a real HTML file
during the build. That means search engines, social link previews and AI
crawlers receive complete page content (not an empty `<div id="root">`), while
visitors still get fast client-side navigation after the first load.

## Pages / routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/about` | About |
| `/divisions` | Divisions overview |
| `/divisions/:slug` | Division detail (education, software-development, ai-automation, ehailing-transportation, educational-technology) |
| `/tutoring` | Ace the Academia online tutoring |
| `/events` | AI n8n Automation Bootcamp |
| `/contact` | Contact (WhatsApp) |
| `/privacy-policy`, `/terms-of-service`, `/refund-policy`, `/delivery-timeline` | Legal |

Site content lives in `src/data/site.js` (company, divisions, bootcamp) and
`src/data/legal.js` (legal pages). Edit those to update copy.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Build & preview

```bash
npm run build     # prerenders every route to static HTML in dist/
npm run preview   # serve the production build locally
```

## Project structure

```
index.html            App shell + favicon, theme script, Organization JSON-LD
vite.config.js        Vite + vite-react-ssg config (lists division slugs to prerender)
vercel.json           Vercel config (cleanUrls)
public/               Static assets served at the site root
  favicon.svg/png     Site icons
  og-image.png        Social share image
  robots.txt          Crawl rules (welcomes AI crawlers) + sitemap link
  sitemap.xml         All pages, for search engines
  llms.txt            Plain-text site summary for AI tools
src/
  main.jsx            SSG entry (ViteReactSSG)
  routes.jsx          Route table
  Layout.jsx          Shared layout (nav, footer, theme, scroll handling)
  components/          Nav, Footer, Seo, RouteLink, ContactForm, ThemeToggle, PageHeader
  pages/              Home, About, Divisions, DivisionDetail, Events, Contact, NotFound, legal/*
  data/               site.js, legal.js
  theme.js            Light/dark theme helpers (SSR-safe)
```

## SEO

Per-page `<title>`, meta description, canonical URL and Open Graph / Twitter
tags are set with the `<Seo>` component (`src/components/Seo.jsx`) and baked
into each prerendered page. Site-wide `Organization` structured data lives in
`index.html`.

## Deployment (Vercel)

- **Root Directory:** `my-app`
- **Framework preset:** Vite
- **Build command:** `npm run build` (runs `vite-react-ssg build`)
- **Output directory:** `dist`

`vercel.json` enables `cleanUrls`, so pages are served at extension-less paths
(e.g. `/about`), and deep links resolve to their prerendered HTML files.
