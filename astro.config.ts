import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// TODO: replace with the real domain before deploying (Phase 9).
export default defineConfig({
  site: "https://example.com",
  output: "static",
  integrations: [mdx(), react(), sitemap()],
  markdown: {
    // Both themes are emitted as CSS variables; global.css picks one from data-theme.
    shikiConfig: {
      // High-contrast variants: every token passes WCAG AA on the site's surface color.
      themes: {
        light: "github-light-high-contrast",
        dark: "github-dark-high-contrast",
      },
      defaultColor: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
