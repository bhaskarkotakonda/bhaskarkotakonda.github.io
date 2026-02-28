/**
 * astro.config.mjs — Astro framework configuration.
 *
 * Key settings:
 *   - site: Canonical URL for sitemap and OG tags
 *   - output: 'static' — full SSG, no server runtime
 *   - integrations: React (islands), Tailwind (styling), MDX (blog), Sitemap (SEO)
 *   - markdown: Shiki syntax highlighting with github-dark theme
 *   - vite.ssr.noExternal: react-icons bundled for SSR compatibility
 *
 * @see https://astro.build/config
 */
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://bhaskarkotakonda.github.io",
  output: "static",
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    sitemap(),
  ],
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
  },
  vite: {
    ssr: {
      noExternal: ["react-icons"],
    },
  },
});
