import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";

/** Before launch everything is blocked; after `launched: true` search engines are welcome. */
export default function robots(): MetadataRoute.Robots {
  if (!site.launched) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/de/styleguide", "/en/styleguide"] },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
