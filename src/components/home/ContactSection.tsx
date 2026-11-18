import { useTranslations } from "next-intl";
import { buttonClasses } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { site } from "@/config/site";

/** #kontakt — the project form arrives here in Phase 7. Until then: direct email. */
export function ContactSection() {
  const t = useTranslations("contact");
  return (
    <Section id="kontakt" tone="ink" aria-labelledby="contact-title">
      <div className="flex max-w-3xl flex-col gap-6">
        <h2 id="contact-title" className="text-xl font-bold sm:text-2xl">
          {t("title")}
        </h2>
        <p className="max-w-[60ch] text-lg text-paper/80">{t("intro")}</p>
        <a
          href={`mailto:${site.email}`}
          className={buttonClasses({ size: "lg", variant: "onDarkPrimary", className: "w-fit" })}
        >
          {t("emailCta", { email: site.email })}
        </a>
        <p className="text-sm text-paper/70">{t("formSoon")}</p>
      </div>
    </Section>
  );
}
