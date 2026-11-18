"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { categories, portfolio, type Category } from "@/content/portfolio";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { MiniSite } from "./MiniSite";

export function PortfolioGrid() {
  const t = useTranslations("portfolioPage");
  const c = useTranslations("cases");
  const [filter, setFilter] = useState<Category | "all">("all");
  const items = portfolio.filter((p) => filter === "all" || p.category === filter);

  return (
    <>
      <div role="group" aria-label={t("filterLabel")} className="mt-10 flex flex-wrap gap-2">
        {(["all", ...categories] as const).map((key) => (
          <button
            key={key}
            type="button"
            aria-pressed={filter === key}
            onClick={() => setFilter(key)}
            className={cn(
              "rounded-full border-2 px-4 py-2 font-semibold transition-colors",
              filter === key ? "border-ink bg-ink text-paper" : "border-line bg-white hover:border-ink",
            )}
          >
            {t(`filters.${key}`)}
          </button>
        ))}
      </div>

      <p aria-live="polite" className="sr-only">
        {t("count", { count: items.length })}
      </p>

      {items.length === 0 ? (
        <p className="mt-12 max-w-[60ch] rounded-lg border-2 border-dashed border-steel p-8 text-slate">{t("empty")}</p>
      ) : (
        <ul className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item.slug}>
              <Link href={`/portfolio/${item.slug}`} className="group flex flex-col gap-4 rounded-lg">
                <div className="transition-transform duration-300 group-hover:-translate-y-1">
                  <MiniSite palette={item.palette} />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap gap-2">
                    {item.demo && <Badge>{t("demoLabel")}</Badge>}
                    <Badge tone="neutral">{t(`filters.${item.category}`)}</Badge>
                  </div>
                  <h2 className="font-display text-lg font-bold group-hover:text-cobalt">{c(`${item.slug}.title`)}</h2>
                  <p className="text-slate">{c(`${item.slug}.summary`)}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
