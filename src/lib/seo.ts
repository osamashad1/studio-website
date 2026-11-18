import type { Metadata } from "next";
import { site } from "@/config/site";
import { routing } from "@/i18n/routing";

/** Canonical URL + hreflang links (de, en, x-default) for a path like "/portfolio". */
export function alternates(locale: string, path = ""): Metadata["alternates"] {
  const p = path === "/" ? "" : path;
  return {
    canonical: `/${locale}${p}`,
    languages: {
      ...Object.fromEntries(routing.locales.map((l) => [l, `/${l}${p}`])),
      "x-default": `/${routing.defaultLocale}${p}`,
    },
  };
}

export const absoluteUrl = (path: string) => new URL(path, site.url).toString();
