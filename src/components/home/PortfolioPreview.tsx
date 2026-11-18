import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { demos } from "@/content/demos";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "./SectionHeading";

/** Mini "screenshot" drawn in each demo's own colours (until real screenshots exist). */
function MiniSite({ palette }: { palette: { bg: string; ink: string; accent: string } }) {
  return (
    <div
      aria-hidden
      className="flex aspect-[16/10] flex-col gap-3 rounded-sm p-5 shadow-[0_12px_40px_-12px_rgb(16_22_47/0.35)]"
      style={{ background: palette.bg }}
    >
      <div className="flex items-center justify-between">
        <span className="h-2.5 w-16 rounded-full" style={{ background: palette.ink }} />
        <span className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1.5 w-6 rounded-full opacity-50" style={{ background: palette.ink }} />
          ))}
        </span>
      </div>
      <div className="mt-auto flex flex-col gap-2">
        <span className="h-4 w-3/4 rounded-sm" style={{ background: palette.ink }} />
        <span className="h-4 w-1/2 rounded-sm" style={{ background: palette.ink }} />
        <span className="mt-2 h-6 w-24 rounded-sm" style={{ background: palette.accent }} />
      </div>
    </div>
  );
}

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
