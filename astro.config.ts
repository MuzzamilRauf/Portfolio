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
      themes: { light: "github-light", dark: "night-owl" },
      defaultColor: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
