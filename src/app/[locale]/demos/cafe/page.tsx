import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { alternates } from "@/lib/seo";
import { DemoForm } from "@/components/demo/DemoForm";

const display = Fraunces({ subsets: ["latin"], variable: "--font-cafe-display", display: "swap" });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-cafe-body", display: "swap" });

export async function generateMetadata({ params }: PageProps<"/[locale]/demos/cafe">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "demoCafe" });
  return { title: { absolute: t("metaTitle") }, alternates: alternates(locale, "/demos/cafe") };
}

type MenuGroup = { title: string; items: { name: string; desc: string; price: string }[] };

function CupIllustration() {
  return (
    <svg viewBox="0 0 400 360" aria-hidden className="w-full max-w-md">
      {/* harbour cranes */}
      <g fill="none" stroke="#8A9A7B" strokeWidth="6" strokeLinecap="round" opacity="0.7">
        <path d="M40 300V120l70 40M40 150h90M110 160v40" />
        <path d="M330 300V90l-60 36M330 120h-80M270 126v44" />
      </g>
      <rect x="0" y="300" width="400" height="60" rx="8" fill="#8A9A7B" opacity="0.25" />
      {/* steam */}
      <g fill="none" stroke="#3B2A20" strokeWidth="5" strokeLinecap="round" opacity="0.35">
        <path d="M170 110c-14-20 14-30 0-52" />
        <path d="M205 104c-14-20 14-30 0-52" />
        <path d="M240 110c-14-20 14-30 0-52" />
      </g>
      {/* cup */}
      <path d="M120 140h200l-18 130a40 40 0 0 1-40 34H178a40 40 0 0 1-40-34z" fill="#C8643B" />
      <path d="M318 168h18a34 34 0 0 1 0 68h-28" fill="none" stroke="#C8643B" strokeWidth="18" />
      <ellipse cx="220" cy="142" rx="100" ry="14" fill="#3B2A20" />
      <ellipse cx="220" cy="320" rx="150" ry="14" fill="#3B2A20" opacity="0.15" />
    </svg>
  );
}

export default function CafeDemo({ params }: PageProps<"/[locale]/demos/cafe">) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("demoCafe");
  const menu = t.raw("menu.groups") as MenuGroup[];
  const hours = t.raw("hours.rows") as { day: string; time: string }[];

  return (
    <div
      className={`${display.variable} ${body.variable} min-h-screen bg-[#F4EDE4] pb-20 font-[family-name:var(--font-cafe-body)] text-[#3B2A20] [&_h1]:font-[family-name:var(--font-cafe-display)] [&_h2]:font-[family-name:var(--font-cafe-display)] [&_h3]:font-[family-name:var(--font-cafe-display)] [&_h1]:font-semibold [&_h2]:font-semibold`}
    >
      <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-5 py-6">
        <p className="font-[family-name:var(--font-cafe-display)] text-[24px] font-semibold italic">Hafenbohne</p>
        <nav aria-label={t("navLabel")} className="flex gap-4 text-sm font-medium sm:gap-6 sm:text-base">
          <a href="#karte" className="hover:text-[#AE5129]">{t("nav.menu")}</a>
          <a href="#zeiten" className="hover:text-[#AE5129]">{t("nav.hours")}</a>
          <a href="#reservieren" className="hover:text-[#AE5129]">{t("nav.reserve")}</a>
        </nav>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-10 md:grid-cols-2 md:py-20">
          <div className="flex flex-col gap-6">
            <p className="w-fit rounded-full bg-[#8A9A7B]/25 px-4 py-1 text-sm font-medium">{t("hero.kicker")}</p>
            <h1 className="text-5xl leading-[1.05] sm:text-6xl">{t("hero.title")}</h1>
            <p className="max-w-[44ch] text-lg opacity-85">{t("hero.text")}</p>
            <div className="flex flex-wrap gap-3">
              <a href="#reservieren" className="rounded-full bg-[#AE5129] px-6 py-3 font-semibold text-white hover:bg-[#3B2A20]">
                {t("hero.cta")}
              </a>
              <a href="#karte" className="rounded-full border-2 border-[#3B2A20] px-6 py-3 font-semibold hover:bg-[#3B2A20] hover:text-[#F4EDE4]">
                {t("hero.secondary")}
              </a>
            </div>
          </div>
          <CupIllustration />
        </section>

        <section id="karte" aria-labelledby="karte-title" className="bg-[#3B2A20] py-16 text-[#F4EDE4] sm:py-24">
          <div className="mx-auto max-w-6xl px-5">
            <h2 id="karte-title" className="text-4xl sm:text-5xl">{t("menu.title")}</h2>
            <p className="mt-3 max-w-[50ch] opacity-80">{t("menu.text")}</p>
            <div className="mt-12 grid gap-12 md:grid-cols-3">
              {menu.map((g) => (
                <div key={g.title}>
                  <h3 className="border-b border-[#F4EDE4]/25 pb-3 text-[24px] italic">{g.title}</h3>
                  <ul className="mt-4 flex flex-col gap-5">
                    {g.items.map((it) => (
                      <li key={it.name} className="flex justify-between gap-4">
                        <div>
                          <p className="font-semibold">{it.name}</p>
                          <p className="text-sm opacity-70">{it.desc}</p>
                        </div>
                        <p className="shrink-0 font-semibold text-[#E9A27F]">{it.price}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="zeiten" aria-labelledby="zeiten-title" className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-24 md:grid-cols-2">
          <div>
            <h2 id="zeiten-title" className="text-4xl">{t("hours.title")}</h2>
            <dl className="mt-8 divide-y divide-[#3B2A20]/15">
              {hours.map((h) => (
                <div key={h.day} className="flex justify-between py-3">
                  <dt className="font-medium">{h.day}</dt>
                  <dd>{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-4xl">{t("map.title")}</h2>
            <div
              role="img"
              aria-label={t("map.label")}
              className="relative min-h-64 flex-1 overflow-hidden rounded-3xl bg-[#8A9A7B]/30"
            >
              <span aria-hidden className="absolute top-1/3 left-0 h-6 w-full -rotate-6 bg-[#F4EDE4]" />
              <span aria-hidden className="absolute top-0 left-1/2 h-full w-5 rotate-12 bg-[#F4EDE4]" />
              <span aria-hidden className="absolute right-0 bottom-0 h-1/3 w-2/3 rounded-tl-[80px] bg-[#7FA3B8]/60" />
              <span aria-hidden className="absolute top-[38%] left-[46%] size-6 rounded-full border-4 border-white bg-[#AE5129] shadow" />
            </div>
            <p className="opacity-80">{t("map.address")}</p>
          </div>
        </section>

        <section id="reservieren" aria-labelledby="res-title" className="bg-[#EADFD2] py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-5">
            <h2 id="res-title" className="text-4xl sm:text-5xl">{t("form.title")}</h2>
            <p className="mt-3 opacity-80">{t("form.text")}</p>
            <DemoForm
              className="mt-10"
              inputClassName="border-[#3B2A20]/20 bg-white focus:border-[#AE5129] focus:outline-none"
              buttonClassName="rounded-full bg-[#AE5129] text-white hover:bg-[#3B2A20]"
              submit={t("form.submit")}
              success={t("form.success")}
              requiredError={t("form.error")}
              demoNote={t("form.demoNote")}
              fields={[
                { name: "name", label: t("form.name"), required: true, half: true },
                { name: "phone", label: t("form.phone"), type: "tel", required: true, half: true },
                { name: "date", label: t("form.date"), type: "date", required: true, half: true },
                { name: "time", label: t("form.time"), type: "time", required: true, half: true },
                { name: "guests", label: t("form.guests"), type: "select", options: ["1", "2", "3", "4", "5", "6+"], required: true, half: true },
                { name: "note", label: t("form.note"), type: "textarea" },
              ]}
            />
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-6xl px-5 py-10 text-sm opacity-75">{t("footer")}</footer>
    </div>
  );
}
