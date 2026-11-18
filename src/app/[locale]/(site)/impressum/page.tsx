// ⚠️ Check with e-recht24 or a lawyer before going live.
// The text lives in messages/de.json + en.json → "legal.impressum". Replace every <PLACEHOLDER>.
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { alternates } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/impressum">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.impressum" });
  return { title: t("title"), alternates: alternates(locale, "/impressum") };
}

export default function Page({ params }: PageProps<"/[locale]/impressum">) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("legal.impressum");
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
