import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://rdhrobotics.in",
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes("/404"),
      serialize(item) {
        if (item.url === "https://rdhrobotics.in/" || item.url === "https://rdhrobotics.in") {
          item.changefreq = "daily";
          item.priority = 1.0;
        } else if (item.url.includes("/products/")) {
          item.changefreq = "weekly";
          item.priority = 0.9;
        } else if (item.url.includes("/products")) {
          item.changefreq = "weekly";
          item.priority = 0.8;
        } else if (item.url.includes("/about") || item.url.includes("/contact")) {
          item.changefreq = "monthly";
          item.priority = 0.7;
        } else {
          item.changefreq = "weekly";
          item.priority = 0.6;
        }
        item.lastmod = new Date();
        return item;
      },
    }),
    icon(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
