import type { MetadataRoute } from "next";
import { demos } from "@/content/demos";
import { portfolio } from "@/content/portfolio";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/seo";

const paths = [
  "",
  "/portfolio",
  ...portfolio.map((p) => `/portfolio/${p.slug}`),
  ...demos.map((d) => `/demos/${d.slug}`),
  "/impressum",
  "/datenschutz",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(`/${locale}${path}`),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.6,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, absoluteUrl(`/${l}${path}`)])),
      },
    })),
  );
}
