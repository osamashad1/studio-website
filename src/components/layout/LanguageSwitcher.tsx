"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";

/** DE | EN switch. Keeps the visitor on the same page in the other language. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("language");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={t("label")} className={cn("flex items-center gap-1", className)}>
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={pathname}
            locale={l}
            hrefLang={l}
            aria-current={active ? "true" : undefined}
            aria-label={`${l.toUpperCase()} – ${t(l)}`}
            className={cn(
              "rounded-sm px-2 py-1 text-sm font-semibold uppercase transition-colors",
              active ? "bg-ink text-paper" : "hover:bg-signal",
            )}
          >
            {l}
          </Link>
        );
      })}
    </nav>
  );
}
