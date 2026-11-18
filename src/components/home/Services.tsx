import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { contactHref } from "@/config/nav";
import { SectionHeading } from "./SectionHeading";

const others = ["ads", "design", "ai"] as const;

/** Websites & web apps get the big panel; the other services are smaller, not 4 equal cards. */
export function Services() {
  const t = useTranslations("services");
  const points = t.raw("web.points") as string[];

  return (
    <Section id="leistungen" tone="white" aria-labelledby="services-title">
      <SectionHeading id="services-title" title={t("title")} intro={t("intro")} />

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <article className="on-dark relative flex flex-col gap-6 overflow-hidden rounded-lg bg-cobalt p-8 text-white sm:p-10">
          <span
            aria-hidden
            className="absolute -top-16 -right-16 size-48 rounded-[28px] bg-white/10 rotate-12"
          />
          <span
            aria-hidden
            className="absolute top-8 right-8 h-8 w-20 rounded-sm bg-signal -rotate-6"
          />
          <p className="font-semibold text-white/80">{t("web.kicker")}</p>
          <h3 className="max-w-md text-xl font-bold sm:text-2xl">{t("web.title")}</h3>
          <p className="max-w-[52ch] text-lg text-white/90">{t("web.text")}</p>
          <ul className="relative grid gap-3 sm:grid-cols-2">
            {points.map((p) => (
              <li key={p} className="flex gap-3">
                <span aria-hidden className="mt-2 size-2 shrink-0 rounded-full bg-signal" />
                {p}
              </li>
            ))}
          </ul>
          <ButtonLink href={contactHref} variant="light" className="relative mt-2 w-fit">
            {t("web.cta")}
          </ButtonLink>
        </article>

        <div className="flex flex-col divide-y-2 divide-line rounded-lg border-2 border-line">
          {others.map((key) => (
            <article key={key} className="flex flex-1 flex-col gap-2 p-6 sm:p-8">
              <h3 className="font-display text-lg font-bold">{t(`${key}.title`)}</h3>
              <p className="text-slate">{t(`${key}.text`)}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
