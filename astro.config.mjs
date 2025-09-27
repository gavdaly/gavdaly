import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import mdx from "@astrojs/mdx";
import solidJs from "@astrojs/solid-js";
import { SITE_URL } from "./src/data/config";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sitemap(), robotsTxt(), solidJs(), mdx()],
  trailingSlash: "never",
  site: SITE_URL,
  image: {
    // Use portable no-op service (Astro v5: squoosh removed)
    service: { entrypoint: "astro/assets/services/noop" },
  },
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "nord",
      wrap: false,
    },
  },
});
