import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { demos } from "@/content/demos";
import { Link } from "@/i18n/navigation";
import { MiniSite } from "@/components/portfolio/MiniSite";
import { SectionHeading } from "./SectionHeading";

export function PortfolioPreview() {
  const t = useTranslations("portfolioPreview");
  const d = useTranslations("demos");

  return (
    <Section id="portfolio" tone="white" aria-labelledby="portfolio-title">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading id="portfolio-title" title={t("title")} intro={t("intro")} />
        <ButtonLink href="/portfolio" variant="secondary">
          {t("all")}
        </ButtonLink>
      </div>

      <ul className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2">
        {demos.map((demo, i) => (
          <li key={demo.slug} className={i % 2 === 1 ? "sm:mt-16" : undefined}>
            <Link href={`/demos/${demo.slug}`} className="group flex flex-col gap-4 rounded-lg">
              <div className="transition-transform duration-300 group-hover:-translate-y-1">
                <MiniSite palette={demo.palette} />
              </div>
              <div className="flex flex-col gap-2">
                <Badge className="w-fit">{t("demoLabel")}</Badge>
                <h3 className="font-display text-lg font-bold group-hover:text-cobalt">
                  {d(`${demo.slug}.name`)}
                </h3>
                <p className="text-slate">{d(`${demo.slug}.summary`)}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
