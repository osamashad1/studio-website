import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Field, describedBy } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Section } from "@/components/ui/Section";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";

// Internal check page — not for search engines.
export const metadata: Metadata = { title: "Styleguide", robots: { index: false } };

const colors = [
  { name: "ink", hex: "#10162F", className: "bg-ink" },
  { name: "paper", hex: "#F3F5FA", className: "bg-paper" },
  { name: "cobalt", hex: "#3355FF", className: "bg-cobalt" },
  { name: "signal", hex: "#FFD23F", className: "bg-signal" },
  { name: "mint", hex: "#3DDC97", className: "bg-mint" },
  { name: "steel", hex: "#8A93AD", className: "bg-steel" },
  { name: "slate", hex: "#4A5372", className: "bg-slate" },
];

const typeScale = [
  { size: "64", className: "font-display text-2xl font-bold sm:text-3xl" },
  { size: "40", className: "font-display text-2xl font-bold" },
  { size: "28", className: "font-display text-xl font-bold" },
  { size: "20", className: "text-lg" },
  { size: "16", className: "text-base" },
  { size: "14", className: "text-sm" },
];

export default function StyleguidePage({ params }: PageProps<"/[locale]/styleguide">) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("styleguide");

  return (
    <>
      <Section>
        <h1 className="text-2xl font-bold sm:text-3xl">{t("title")}</h1>
        <p className="mt-4 max-w-[70ch] text-lg text-slate">{t("intro")}</p>
      </Section>

      <Section tone="white" aria-labelledby="sg-colors">
        <h2 id="sg-colors" className="text-xl font-bold">{t("colors")}</h2>
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {colors.map((c) => (
            <li key={c.name} className="flex flex-col gap-2">
              <span className={`h-24 rounded-lg border border-line ${c.className}`} />
              <span className="font-semibold">{c.name}</span>
              <span className="text-sm text-slate">{c.hex}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-[70ch] text-sm text-slate">{t("steelNote")}</p>
      </Section>

      <Section aria-labelledby="sg-type">
        <h2 id="sg-type" className="text-xl font-bold">{t("type")}</h2>
        <div className="mt-8 flex flex-col gap-6">
          {typeScale.map((s) => (
            <div key={s.size} className="flex flex-col gap-1 border-b border-line pb-4">
              <span className="text-sm text-slate">{s.size === "64" ? t("size64Note") : `${s.size}px`}</span>
              <span className={s.className}>{t("sample")}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="white" aria-labelledby="sg-buttons">
        <h2 id="sg-buttons" className="text-xl font-bold">{t("buttons")}</h2>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <ButtonLink href="/#kontakt" size="lg">{t("ctaPrimary")}</ButtonLink>
          <Button variant="secondary" size="lg">{t("ctaSecondary")}</Button>
          <Button>{t("ctaPrimary")}</Button>
          <Button variant="secondary">{t("ctaSecondary")}</Button>
          <Button disabled>{t("disabled")}</Button>
        </div>
        <h3 className="mt-12 text-lg font-bold">{t("badges")}</h3>
        <div className="mt-4 flex flex-wrap gap-3">
          <Badge tone="available">{t("badgeAvailable")}</Badge>
          <Badge tone="highlight">{t("badgeRecommended")}</Badge>
          <Badge>{t("badgeDemo")}</Badge>
        </div>
      </Section>

      <Section aria-labelledby="sg-forms">
        <h2 id="sg-forms" className="text-xl font-bold">{t("forms")}</h2>
        <div className="mt-8 grid max-w-2xl gap-6">
          <Field id="sg-name" label={t("name")} required hint={t("nameHint")}>
            <Input id="sg-name" aria-describedby={describedBy("sg-name", { hint: t("nameHint") })} />
          </Field>
          <Field id="sg-email" label={t("email")} required error={t("emailError")}>
            <Input
              id="sg-email"
              type="email"
              defaultValue="max@"
              invalid
              aria-describedby={describedBy("sg-email", { error: t("emailError") })}
            />
          </Field>
          <Field id="sg-business" label={t("business")}>
            <Select id="sg-business" defaultValue="">
              <option value="" disabled>{t("choose")}</option>
              <option>{t("optionCafe")}</option>
              <option>{t("optionCraft")}</option>
              <option>{t("optionShop")}</option>
            </Select>
          </Field>
          <Field id="sg-msg" label={t("message")}>
            <Textarea id="sg-msg" placeholder={t("messagePlaceholder")} />
          </Field>
        </div>
      </Section>

      <Section tone="white" aria-labelledby="sg-accordion">
        <h2 id="sg-accordion" className="text-xl font-bold">{t("accordion")}</h2>
        <Accordion
          className="mt-8 max-w-3xl"
          items={[
            { question: t("q1"), answer: t("a1") },
            { question: t("q2"), answer: t("a2") },
          ]}
        />
      </Section>

      <Section tone="ink" aria-labelledby="sg-dark">
        <h2 id="sg-dark" className="text-xl font-bold">{t("dark")}</h2>
        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink href="/#kontakt" variant="onDarkPrimary">{t("ctaPrimary")}</ButtonLink>
          <Badge tone="highlight">{t("badgeRecommended")}</Badge>
        </div>
      </Section>
    </>
  );
}
