import type { MetadataRoute } from "next";

import { locales } from "@/content/dictionary";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/menu"];

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${site.url}/${locale}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((alternate) => [
            alternate === "pt" ? "pt-PT" : "en-GB",
            `${site.url}/${alternate}${path}`,
          ])
        ),
      },
    }))
  );
}
