import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

// Temporary start page. The real home page is built in Phases 4–5.
export default function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("home");

  return (
    <Section className="flex-1">
      <h1 className="text-2xl font-bold sm:text-3xl">{t("title")}</h1>
      <p className="mt-4 max-w-[70ch] text-lg text-slate">{t("setupNote")}</p>
      <ButtonLink href="/styleguide" variant="secondary" className="mt-8">
        {t("styleguideLink")}
      </ButtonLink>
    </Section>
  );
}
