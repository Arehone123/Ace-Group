import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Division detail pages are dynamic (/divisions/:slug). List their slugs here
// so the static-site generator prerenders a real HTML file for each one.
const divisionSlugs = [
  'education',
  'software-development',
  'ai-automation',
  'ehailing-transportation',
  'educational-technology',
]

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  ssgOptions: {
    // 'defer' (not 'async') so the app bundle runs AFTER the inline scripts
    // that set the hydration data + loader-manifest hash at end of <body>.
    script: 'defer',
    formatting: 'minify',
    // Expand the dynamic route into concrete pages and drop router-only
    // placeholders (":slug", "*") that can't be prerendered directly.
    includedRoutes(paths) {
      const staticPaths = paths.filter((path) => !path.includes(':') && !path.includes('*'))
      const divisionPaths = divisionSlugs.map((slug) => `/divisions/${slug}`)
      return Array.from(new Set([...staticPaths, ...divisionPaths]))
    },
  },
})
