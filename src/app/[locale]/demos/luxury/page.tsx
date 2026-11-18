import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { alternates } from "@/lib/seo";
import { DemoForm } from "@/components/demo/DemoForm";
import { BottleCanvas } from "@/components/demo/luxury/BottleCanvas";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-lx-display", display: "swap" });
const body = Manrope({ subsets: ["latin"], variable: "--font-lx-body", display: "swap" });

export async function generateMetadata({ params }: PageProps<"/[locale]/demos/luxury">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "demoLuxury" });
  return { title: { absolute: t("metaTitle") }, alternates: alternates(locale, "/demos/luxury") };
}

export default function LuxuryDemo({ params }: PageProps<"/[locale]/demos/luxury">) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("demoLuxury");
  const chapters = t.raw("story") as { kicker: string; title: string; text: string }[];
  const scents = t.raw("collection.items") as { name: string; notes: string; text: string }[];

  return (
    <div
      className={`${display.variable} ${body.variable} min-h-screen bg-[#0B0B0C] pb-20 font-[family-name:var(--font-lx-body)] text-[#F2EDE4] [&_h1]:font-[family-name:var(--font-lx-display)] [&_h2]:font-[family-name:var(--font-lx-display)] [&_h3]:font-[family-name:var(--font-lx-display)] [&_h1]:font-medium [&_h2]:font-medium [&_h3]:font-medium`}
    >
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-6 sm:px-6">
          <p className="font-[family-name:var(--font-lx-display)] text-lg tracking-[0.2em] sm:text-[24px] sm:tracking-[0.25em]">MAISON NOIR</p>
          <nav aria-label={t("navLabel")} className="flex gap-4 text-sm text-[#F2EDE4]/80 sm:gap-6">
            <a href="#collection" className="hover:text-[#C9A45C]">{t("nav.collection")}</a>
            <a href="#contact" className="hover:text-[#C9A45C]">{t("nav.contact")}</a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero + scroll story share one sticky 3D bottle */}
        <div id="lx-story" className="relative mx-auto grid max-w-7xl lg:grid-cols-2">
          <div className="order-1 h-[58svh] lg:order-2 lg:sticky lg:top-0 lg:h-screen">
            <BottleCanvas label={t("bottleLabel")} containerId="lx-story" />
          </div>
          <div className="order-2 px-6 lg:order-1">
            <section className="flex min-h-[60svh] flex-col justify-center gap-6 pb-16 lg:min-h-screen">
              <p className="text-sm tracking-[0.3em] text-[#C9A45C]">{t("hero.kicker")}</p>
              <h1 className="text-6xl leading-[0.95] sm:text-7xl lg:text-8xl">
                {t("hero.title1")}
                <br />
                <em className="text-[#C9A45C]">{t("hero.title2")}</em>
              </h1>
              <p className="max-w-[40ch] text-lg text-[#F2EDE4]/75">{t("hero.text")}</p>
              <a href="#collection" className="w-fit border border-[#C9A45C] px-7 py-3 text-sm tracking-[0.2em] text-[#C9A45C] transition-colors hover:bg-[#C9A45C] hover:text-[#0B0B0C]">
                {t("hero.cta")}
              </a>
            </section>
            {chapters.map((c, i) => (
              <section key={c.title} aria-labelledby={`lx-ch-${i}`} className="flex min-h-[70svh] flex-col justify-center gap-4 py-16 lg:min-h-screen">
                <p className="text-sm tracking-[0.3em] text-[#C9A45C]">{c.kicker}</p>
                <h2 id={`lx-ch-${i}`} className="text-5xl leading-tight sm:text-6xl">{c.title}</h2>
                <p className="max-w-[42ch] text-lg text-[#F2EDE4]/75">{c.text}</p>
              </section>
            ))}
          </div>
        </div>

        <section id="collection" aria-labelledby="lx-collection" className="border-t border-[#F2EDE4]/10 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <h2 id="lx-collection" className="text-5xl sm:text-6xl">{t("collection.title")}</h2>
            <ul className="mt-14 grid gap-px bg-[#F2EDE4]/10 md:grid-cols-3">
              {scents.map((s, i) => (
                <li key={s.name} className="flex flex-col gap-4 bg-[#0B0B0C] p-8 md:p-10">
                  <span aria-hidden className="font-[family-name:var(--font-lx-display)] text-6xl text-[#C9A45C]/70">{["I", "II", "III"][i]}</span>
                  <h3 className="text-[30px]">{s.name}</h3>
                  <p className="text-sm tracking-[0.15em] text-[#C9A45C]">{s.notes}</p>
                  <p className="text-[#F2EDE4]/70">{s.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contact" aria-labelledby="lx-contact" className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
          <h2 id="lx-contact" className="text-5xl">{t("form.title")}</h2>
          <p className="mt-4 text-[#F2EDE4]/70">{t("form.text")}</p>
          <DemoForm
            className="mt-10"
            inputClassName="rounded-none border-[#F2EDE4]/20 bg-transparent text-[#F2EDE4] focus:border-[#C9A45C] focus:outline-none [&>option]:text-black"
            buttonClassName="rounded-none border border-[#C9A45C] text-[#C9A45C] tracking-[0.2em] hover:bg-[#C9A45C] hover:text-[#0B0B0C]"
            submit={t("form.submit")}
            success={t("form.success")}
            requiredError={t("form.error")}
            demoNote={t("form.demoNote")}
            fields={[
              { name: "name", label: t("form.name"), required: true, half: true },
              { name: "email", label: t("form.email"), type: "email", required: true, half: true },
              { name: "interest", label: t("form.interest"), type: "select", options: t.raw("form.options") as string[], required: true },
              { name: "message", label: t("form.message"), type: "textarea" },
            ]}
          />
        </section>
      </main>

      <footer className="border-t border-[#F2EDE4]/10 px-6 py-10 text-center text-sm text-[#F2EDE4]/50">{t("footer")}</footer>
    </div>
  );
}
