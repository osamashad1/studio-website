import { useFormatter, useTranslations } from "next-intl";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { contactHref } from "@/config/nav";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import { SectionHeading } from "./SectionHeading";

export function Packages() {
  const t = useTranslations("packages");
  const format = useFormatter();
  const fixed = site.packages.filter((p) => p.id !== "custom");

  const eur = (value: number) =>
    format.number(value, { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

  return (
    <Section id="pakete" aria-labelledby="packages-title">
      <SectionHeading id="packages-title" title={t("title")} intro={t("intro")} />

      {(site.offers.firstMonthFree || site.offers.freeWebsiteCheck) && (
        <div className="mt-10 flex flex-col gap-3 rounded-lg bg-signal p-6 text-ink sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="font-display text-lg font-bold">{t("offer.title")}</p>
            <ul className="mt-2 flex flex-col gap-1">
              {site.offers.firstMonthFree && <li>✓ {t("offer.firstMonth")}</li>}
              {site.offers.freeWebsiteCheck && <li>✓ {t("offer.check")}</li>}
            </ul>
          </div>
          <ButtonLink href={contactHref} className="shrink-0 bg-ink hover:bg-cobalt">
            {t("offer.cta")}
          </ButtonLink>
        </div>
      )}

      <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-stretch">
        {fixed.map((pkg) => {
          const recommended = "recommended" in pkg && pkg.recommended;
          const features = t.raw(`${pkg.id}.features`) as string[];
          return (
            <article
              key={pkg.id}
              aria-labelledby={`pkg-${pkg.id}`}
              className={cn(
                "flex flex-col gap-6 rounded-lg p-8",
                recommended
                  ? "on-dark bg-ink text-paper ring-4 ring-signal lg:-my-4 lg:py-12"
                  : "border-2 border-line bg-white",
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 id={`pkg-${pkg.id}`} className="font-display text-xl font-bold">
                  {t(`${pkg.id}.name`)}
                </h3>
                {recommended && <Badge tone="highlight">{t("recommended")}</Badge>}
              </div>
              <p className={recommended ? "text-paper/80" : "text-slate"}>{t(`${pkg.id}.for`)}</p>
              <p className="flex items-baseline gap-2">
                {pkg.pricePerMonth === null ? (
                  <span className="font-display text-2xl font-bold">{t("onRequest")}</span>
                ) : (
                  <>
                    <span className="font-display text-2xl font-bold">{eur(pkg.pricePerMonth)}</span>
                    <span className={recommended ? "text-paper/80" : "text-slate"}>{t("perMonth")}</span>
                  </>
                )}
              </p>
              <ul className="flex flex-1 flex-col gap-3">
                {features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span
                      aria-hidden
                      className={cn("mt-2 size-2 shrink-0 rounded-full", recommended ? "bg-signal" : "bg-cobalt")}
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <ButtonLink
                href={contactHref}
                variant={recommended ? "onDarkPrimary" : "secondary"}
              >
                {t("choose", { name: t(`${pkg.id}.name`) })}
              </ButtonLink>
            </article>
          );
        })}
      </div>

      <div className="mt-10 flex flex-col gap-4 rounded-lg border-2 border-dashed border-steel p-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="font-display text-lg font-bold">{t("custom.name")}</h3>
          <p className="text-slate">{t("custom.text")}</p>
        </div>
        <ButtonLink href={contactHref} variant="secondary" className="shrink-0">
          {t("custom.cta")}
        </ButtonLink>
      </div>
      <p className="mt-6 max-w-[80ch] text-sm text-slate">
        {t("note", { months: site.subscription.minTermMonths })}
      </p>
    </Section>
  );
}
