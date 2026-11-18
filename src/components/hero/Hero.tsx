import { useFormatter, useTranslations } from "next-intl";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { contactHref } from "@/config/nav";
import { site } from "@/config/site";
import { HeroCanvas } from "./HeroCanvas";

/** Cinematic, full-screen dark hero: text left, 3D scene right (scene on top on phones). */
export function Hero() {
  const t = useTranslations("hero");
  const format = useFormatter();
  const [year, month] = site.availability.nextFreeMonth.split("-").map(Number);
  const monthName = format.dateTime(new Date(Date.UTC(year, month - 1, 15)), {
    month: "long",
    timeZone: "UTC",
  });

  return (
    <section
      aria-labelledby="hero-title"
      className="on-dark relative overflow-hidden bg-ink text-paper"
    >
      {/* subtle industrial grid (Duisburg harbour + tech) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(var(--color-paper)_1px,transparent_1px),linear-gradient(90deg,var(--color-paper)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]"
      />
      <Container className="relative grid min-h-[calc(100svh-72px)] items-center gap-6 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10 lg:py-16">
        <div className="order-2 flex flex-col items-start gap-6 lg:order-1">
          <Badge tone="available" className="bg-mint/15 text-paper">
            {t("availability", { count: site.availability.freeSlots, month: monthName })}
          </Badge>
          <h1
            id="hero-title"
            className="text-2xl font-bold sm:text-3xl lg:text-[52px] lg:leading-[1.08] xl:text-3xl"
          >
            {t("title")}
          </h1>
          <p className="max-w-[46ch] text-lg text-paper/80">{t("subtitle")}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <ButtonLink href={contactHref} size="lg" variant="onDarkPrimary">
              {t("cta")}
            </ButtonLink>
            <ButtonLink
              href="/#pakete"
              size="lg"
              variant="onDarkSecondary"
            >
              {t("secondary")}
            </ButtonLink>
          </div>
        </div>
        <div className="order-1 lg:order-2 lg:h-[min(640px,70svh)]">
          <HeroCanvas label={t("sceneLabel")} />
        </div>
      </Container>
    </section>
  );
}
