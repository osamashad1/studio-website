import { useTranslations } from "next-intl";
import { ProjectForm } from "@/components/form/ProjectForm";
import { Section } from "@/components/ui/Section";
import { site } from "@/config/site";

/** #kontakt — the project form. */
export function ContactSection() {
  const t = useTranslations("contact");
  return (
    <Section id="kontakt" tone="ink" aria-labelledby="contact-title" className="relative">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <div className="flex flex-col gap-5">
          <h2 id="contact-title" className="text-xl font-bold sm:text-2xl">
            {t("title")}
          </h2>
          <p className="max-w-[45ch] text-lg text-paper/80">{t("intro")}</p>
          <p className="text-paper/70">
            {t("direct")}{" "}
            <a href={`mailto:${site.email}`} className="font-semibold text-paper underline underline-offset-4 hover:text-signal">
              {site.email}
            </a>
          </p>
        </div>
        <ProjectForm />
      </div>
    </Section>
  );
}
