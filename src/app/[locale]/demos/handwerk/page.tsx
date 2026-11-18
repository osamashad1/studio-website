import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { alternates } from "@/lib/seo";
import { DemoForm } from "@/components/demo/DemoForm";

const display = Archivo({ subsets: ["latin"], variable: "--font-hw-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-hw-body", display: "swap" });

// Clearly fake demo number (not a real line).
const DEMO_PHONE = "+490000000000";

export async function generateMetadata({ params }: PageProps<"/[locale]/demos/handwerk">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "demoHandwerk" });
  return { title: { absolute: t("metaTitle") }, alternates: alternates(locale, "/demos/handwerk") };
}

function Bolt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path d="M13 2 4 14h7l-1 8 9-12h-7z" fill="currentColor" />
    </svg>
  );
}

export default function HandwerkDemo({ params }: PageProps<"/[locale]/demos/handwerk">) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("demoHandwerk");
  const services = t.raw("services.items") as { title: string; text: string }[];
  const trust = t.raw("trust") as string[];
  const steps = t.raw("steps.items") as string[];

  return (
    <div
      className={`${display.variable} ${body.variable} min-h-screen bg-[#F2F5F8] pb-24 font-[family-name:var(--font-hw-body)] text-[#0F2A44] [&_h1]:font-[family-name:var(--font-hw-display)] [&_h2]:font-[family-name:var(--font-hw-display)] [&_h3]:font-[family-name:var(--font-hw-display)] [&_h1]:font-extrabold [&_h2]:font-extrabold [&_h3]:font-bold`}
    >
      {/* Emergency bar */}
      <div className="bg-[#FF7A00] text-[#0F2A44]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-5 py-2 text-sm font-semibold">
          <span>{t("emergency.text")}</span>
          <a href={`tel:${DEMO_PHONE}`} className="underline underline-offset-4">
            {t("emergency.call")}
          </a>
        </div>
      </div>

      <header className="bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5">
          <p className="flex items-center gap-2 font-[family-name:var(--font-hw-display)] text-[20px] font-extrabold">
            <span className="flex size-9 items-center justify-center rounded-md bg-[#0F2A44] text-[#FF7A00]">
              <Bolt className="size-5" />
            </span>
            Müller Elektro
          </p>
          <a
            href="#angebot"
            className="hidden rounded-md bg-[#0F2A44] px-5 py-3 font-semibold text-white hover:bg-[#FF7A00] hover:text-[#0F2A44] sm:inline-block"
          >
            {t("hero.cta")}
          </a>
        </div>
      </header>

      <main>
        <section className="bg-[#0F2A44] text-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.3fr_1fr] md:py-24">
            <div className="flex flex-col gap-6">
              <p className="font-semibold text-[#FF7A00]">{t("hero.kicker")}</p>
              <h1 className="text-4xl leading-[1.05] sm:text-6xl">{t("hero.title")}</h1>
              <p className="max-w-[48ch] text-lg text-white/85">{t("hero.text")}</p>
              <div className="flex flex-wrap gap-3">
                <a href="#angebot" className="rounded-md bg-[#FF7A00] px-6 py-3 font-bold text-[#0F2A44] hover:bg-white">
                  {t("hero.cta")}
                </a>
                <a href={`tel:${DEMO_PHONE}`} className="rounded-md border-2 border-white/40 px-6 py-3 font-bold hover:border-[#FF7A00]">
                  {t("emergency.call")}
                </a>
              </div>
            </div>
            <ul className="grid content-center gap-3">
              {trust.map((item) => (
                <li key={item} className="flex items-center gap-3 rounded-md bg-white/8 px-5 py-4 font-semibold ring-1 ring-white/15">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#FF7A00] text-[#0F2A44]">
                    <svg viewBox="0 0 20 20" aria-hidden className="size-4"><path d="m4 10 4 4 8-8" fill="none" stroke="currentColor" strokeWidth="3" /></svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="hw-services" className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
          <h2 id="hw-services" className="text-[30px] sm:text-4xl">{t("services.title")}</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.title} className="rounded-lg border-l-4 border-[#FF7A00] bg-white p-6 shadow-sm">
                <h3 className="text-lg">{s.title}</h3>
                <p className="mt-2 text-[#0F2A44]/75">{s.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="hw-steps" className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-5">
            <h2 id="hw-steps" className="text-[30px] sm:text-4xl">{t("steps.title")}</h2>
            <ol className="mt-10 grid gap-6 md:grid-cols-3">
              {steps.map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="font-[family-name:var(--font-hw-display)] text-5xl font-extrabold text-[#FF7A00]">{i + 1}</span>
                  <p className="pt-2 text-lg font-semibold">{s}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="angebot" aria-labelledby="hw-form" className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
          <h2 id="hw-form" className="text-[30px] sm:text-4xl">{t("form.title")}</h2>
          <p className="mt-3 text-[#0F2A44]/75">{t("form.text")}</p>
          <DemoForm
            className="mt-10"
            inputClassName="border-[#0F2A44]/15 bg-white focus:border-[#FF7A00] focus:outline-none"
            buttonClassName="bg-[#0F2A44] text-white hover:bg-[#FF7A00] hover:text-[#0F2A44]"
            submit={t("form.submit")}
            success={t("form.success")}
            requiredError={t("form.error")}
            demoNote={t("form.demoNote")}
            fields={[
              { name: "name", label: t("form.name"), required: true, half: true },
              { name: "phone", label: t("form.phone"), type: "tel", required: true, half: true },
              { name: "email", label: t("form.email"), type: "email", half: true },
              { name: "service", label: t("form.service"), type: "select", options: services.map((s) => s.title), required: true, half: true },
              { name: "message", label: t("form.message"), type: "textarea", required: true },
            ]}
          />
        </section>
      </main>

      <footer className="bg-[#0F2A44] px-5 py-10 text-center text-sm text-white/75">{t("footer")}</footer>

      {/* Sticky emergency call button on phones */}
      <a
        href={`tel:${DEMO_PHONE}`}
        className="fixed right-4 bottom-16 z-40 flex items-center gap-2 rounded-full bg-[#FF7A00] px-5 py-3 font-bold text-[#0F2A44] shadow-xl sm:hidden"
      >
        <Bolt className="size-5" />
        {t("emergency.short")}
      </a>
    </div>
  );
}
