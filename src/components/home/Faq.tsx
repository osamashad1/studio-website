import { useTranslations } from "next-intl";
import { Accordion } from "@/components/ui/Accordion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "./SectionHeading";

const keys = ["price", "term", "timeline", "hosting", "changes", "language"] as const;

export function Faq() {
  const t = useTranslations("faq");
  return (
    <Section id="faq" aria-labelledby="faq-title">
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
        <SectionHeading id="faq-title" title={t("title")} intro={t("intro")} />
        <Accordion items={keys.map((k) => ({ question: t(`${k}.q`), answer: t(`${k}.a`) }))} />
      </div>
    </Section>
  );
}
