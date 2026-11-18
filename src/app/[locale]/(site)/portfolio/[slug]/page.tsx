import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { MiniSite } from "@/components/portfolio/MiniSite";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { contactHref } from "@/config/nav";
import { getItem, portfolio } from "@/content/portfolio";

export function generateStaticParams() {
  return portfolio.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/portfolio/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!getItem(slug)) return {};
  const t = await getTranslations({ locale, namespace: "cases" });
  return { title: t(`${slug}.title`), description: t(`${slug}.summary`) };
}

export default function CaseStudyPage({ params }: PageProps<"/[locale]/portfolio/[slug]">) {
  const { locale, slug } = use(params);
  setRequestLocale(locale);
  const item = getItem(slug);
  if (!item) notFound();
  const t = useTranslations("cases");
  const p = useTranslations("portfolioPage");
  const blocks = ["problem", "solution", "goal"] as const;

  return (
    <>
      <Section>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {item.demo && <Badge>{p("demoLabel")}</Badge>}
            <Badge>{p(`filters.${item.category}`)}</Badge>
          </div>
          <h1 className="text-2xl font-bold sm:text-3xl">{t(`${slug}.title`)}</h1>
          <p className="max-w-[60ch] text-lg text-slate">{t(`${slug}.summary`)}</p>
        </div>
        <div className="mt-12 max-w-4xl">
          <MiniSite palette={item.palette} />
        </div>
      </Section>
      <Section tone="white">
        <dl className="grid gap-10 md:grid-cols-3">
          {blocks.map((b) => (
            <div key={b} className="flex flex-col gap-3">
              <dt className="font-display text-lg font-bold">{p(`blocks.${b}`)}</dt>
              <dd className="text-slate">{t(`${slug}.${b}`)}</dd>
            </div>
          ))}
        </dl>
        {item.demo && <p className="mt-10 max-w-[70ch] text-sm text-slate">{p("demoNote")}</p>}
        <div className="mt-10 flex flex-wrap gap-3">
          {item.demo && (
            <ButtonLink href={`/demos/${slug}`}>{p("openDemo")}</ButtonLink>
          )}
          <ButtonLink href={contactHref} variant="secondary">
            {p("cta")}
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
