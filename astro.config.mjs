import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import mdx from "@astrojs/mdx";
import solidJs from "@astrojs/solid-js";
import { SITE_URL } from "./src/data/config";

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap(), robotsTxt(), solidJs(), mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
  trailingSlash: "never",
  site: SITE_URL,

  markdown: {
    smartypants: false,
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "catppuccin-frappe",
      wrap: false,
    },
  },
});
