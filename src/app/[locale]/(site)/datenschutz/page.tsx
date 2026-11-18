// ⚠️ Check with e-recht24 or a lawyer before going live.
// The text lives in messages/de.json + en.json → "legal.datenschutz". Replace every <PLACEHOLDER>.
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { alternates } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/datenschutz">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.datenschutz" });
  return { title: t("title"), alternates: alternates(locale, "/datenschutz") };
}

export default function Page({ params }: PageProps<"/[locale]/datenschutz">) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("legal.datenschutz");
  const l = useTranslations("legal");
  return (
    <LegalPage
      title={t("title")}
      intro={t.has("intro") ? (t.raw("intro") as string) : undefined}
      note={locale === "en" ? l("englishNote") : undefined}
      sections={t.raw("sections") as LegalSection[]}
    />
  );
}
