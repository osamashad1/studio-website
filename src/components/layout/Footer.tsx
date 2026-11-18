import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { site } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="on-dark bg-ink text-paper">
      <Container className="grid gap-10 py-14 sm:grid-cols-[2fr_1fr_1fr]">
        <div className="flex flex-col gap-3">
          <p className="font-display text-xl font-bold">
            {site.studioName}
            <span aria-hidden className="text-signal">.</span>
          </p>
          <p className="max-w-sm text-paper/80">{t("tagline", { city: site.city })}</p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-sans text-sm font-semibold text-paper/70">{t("contact")}</h2>
          <a href={`mailto:${site.email}`} className="w-fit underline-offset-4 hover:underline">
            {site.email}
          </a>
          <p>{site.city}</p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-sans text-sm font-semibold text-paper/70">{t("legal")}</h2>
          <Link href="/impressum" className="w-fit underline-offset-4 hover:underline">
            {t("imprint")}
          </Link>
          <Link href="/datenschutz" className="w-fit underline-offset-4 hover:underline">
            {t("privacy")}
          </Link>
        </div>
      </Container>
      <Container className="flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 py-6 text-sm text-paper/70">
        <p>{t("copyright", { year: 2026, name: site.studioName })}</p>
        <LanguageSwitcher className="[&_a]:text-paper [&_a[aria-current]]:bg-paper [&_a[aria-current]]:text-ink [&_a:hover]:text-ink" />
      </Container>
    </footer>
  );
}
