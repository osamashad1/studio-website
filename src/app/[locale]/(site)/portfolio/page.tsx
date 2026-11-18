import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { Section } from "@/components/ui/Section";

export async function generateMetadata({ params }: PageProps<"/[locale]/portfolio">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolioPage" });
  return { title: t("metaTitle"), description: t("intro") };
}

export default function PortfolioPage({ params }: PageProps<"/[locale]/portfolio">) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("portfolioPage");

  return (
    <Section className="flex-1">
      <h1 className="text-2xl font-bold sm:text-3xl">{t("title")}</h1>
      <p className="mt-4 max-w-[60ch] text-lg text-slate">{t("intro")}</p>
      <PortfolioGrid />
    </Section>
  );
}
