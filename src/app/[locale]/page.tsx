import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { Link } from "@/i18n/navigation";
import { site } from "@/config/site";

// Temporary start page for Phase 2. The real home page is built in Phases 4–5.
export default function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("home");

  return (
    <main className="mx-auto flex max-w-2xl flex-1 flex-col justify-center gap-4 p-6">
      <p className="text-sm">{site.studioName}</p>
      <h1 className="text-4xl font-bold">{t("title")}</h1>
      <p>{t("setupNote")}</p>
      <Link href="/" locale={locale === "de" ? "en" : "de"} className="underline">
        {t("switchLanguage")}
      </Link>
    </main>
  );
}
