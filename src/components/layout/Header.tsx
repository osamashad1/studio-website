import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { contactHref, mainNav } from "@/config/nav";
import { site } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-40 border-b-2 border-line/70 bg-paper/90 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-sm focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        {t("skip")}
      </a>
      <Container className="relative flex h-18 items-center justify-between gap-6">
        <Link href="/" className="font-display text-lg font-bold tracking-tight">
          {site.studioName}
          <span aria-hidden className="text-cobalt">.</span>
        </Link>

        <nav aria-label={t("mainLabel")} className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="rounded-sm px-3 py-2 font-semibold transition-colors hover:bg-white hover:text-cobalt"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher />
          <ButtonLink href={contactHref}>{t("cta")}</ButtonLink>
        </div>

        <MobileMenu />
      </Container>
    </header>
  );
}
