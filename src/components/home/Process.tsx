import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "./SectionHeading";

const steps = ["call", "concept", "build", "launch"] as const;

/** A real sequence, so numbered steps are fine here. */
export function Process() {
  const t = useTranslations("process");

  return (
    <Section id="ablauf" aria-labelledby="process-title">
      <SectionHeading id="process-title" title={t("title")} intro={t("intro")} />
      <ol className="mt-12 grid gap-8 md:grid-cols-4 md:gap-6">
        {steps.map((step, i) => (
          <li key={step} className="relative flex flex-col gap-3 md:pt-14">
            <span
              aria-hidden
              className="hidden md:absolute md:top-5 md:left-12 md:block md:h-0.5 md:w-[calc(100%-2rem)] md:bg-line"
            />
            <span className="flex size-10 items-center justify-center rounded-full bg-ink font-display font-bold text-paper md:absolute md:top-0 md:left-0">
              {i + 1}
            </span>
            <h3 className="font-display text-lg font-bold">{t(`${step}.title`)}</h3>
            <p className="text-slate">{t(`${step}.text`)}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
