import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { alternates } from "@/lib/seo";
import { DemoForm } from "@/components/demo/DemoForm";

const display = IBM_Plex_Serif({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-ex-display", display: "swap" });
const body = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-ex-body", display: "swap" });

export async function generateMetadata({ params }: PageProps<"/[locale]/demos/export">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "demoExport" });
  return { title: { absolute: t("metaTitle") }, alternates: alternates(locale, "/demos/export") };
}

type Product = { name: string; text: string; specs: { label: string; value: string }[] };

/** Woven-jute texture drawn in CSS (no photo needed). */
function JuteSwatch({ tone }: { tone: string }) {
  return (
    <div
      aria-hidden
      className="h-40 rounded-t-lg"
      style={{
        backgroundColor: tone,
        backgroundImage:
          "repeating-linear-gradient(45deg, rgb(0 0 0 / 0.08) 0 6px, transparent 6px 12px), repeating-linear-gradient(-45deg, rgb(255 255 255 / 0.12) 0 6px, transparent 6px 12px)",
      }}
    />
  );
}

export default function ExportDemo({ params }: PageProps<"/[locale]/demos/export">) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("demoExport");
  const products = t.raw("products.items") as Product[];
  const reasons = t.raw("why.items") as { title: string; text: string }[];
  const tones = ["#C9A66B", "#B88D52", "#3A3A34"];

  return (
    <div
      className={`${display.variable} ${body.variable} min-h-screen bg-[#F6F1E7] pb-20 font-[family-name:var(--font-ex-body)] text-[#1F3D2B] [&_h1]:font-[family-name:var(--font-ex-display)] [&_h2]:font-[family-name:var(--font-ex-display)] [&_h3]:font-[family-name:var(--font-ex-display)] [&_h1]:font-semibold [&_h2]:font-semibold [&_h3]:font-semibold`}
    >
      <header className="border-b border-[#1F3D2B]/15">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5">
          <p className="font-[family-name:var(--font-ex-display)] text-[20px] font-semibold">
            Gaibandha <span className="text-[#8C6B3F]">Jute Co.</span>
          </p>
          <nav aria-label={t("navLabel")} className="flex gap-5 text-sm font-medium">
            <a href="#products" className="hover:text-[#8C6B3F]">{t("nav.products")}</a>
            <a href="#enquiry" className="hover:text-[#8C6B3F]">{t("nav.enquiry")}</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.2fr_1fr] md:items-end md:py-24">
          <div className="flex flex-col gap-6">
            <p className="text-sm font-semibold tracking-wide text-[#8C6B3F]">{t("hero.kicker")}</p>
            <h1 className="text-4xl leading-[1.1] sm:text-6xl">{t("hero.title")}</h1>
            <p className="max-w-[50ch] text-lg text-[#1F3D2B]/80">{t("hero.text")}</p>
            <a href="#enquiry" className="w-fit rounded-sm bg-[#1F3D2B] px-6 py-3 font-semibold text-[#F6F1E7] hover:bg-[#8C6B3F]">
              {t("hero.cta")}
            </a>
          </div>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-[#1F3D2B]/15">
            {(t.raw("facts") as { label: string; value: string }[]).map((f) => (
              <div key={f.label} className="bg-[#F6F1E7] p-5">
                <dt className="text-sm text-[#1F3D2B]/70">{f.label}</dt>
                <dd className="mt-1 font-[family-name:var(--font-ex-display)] text-[24px] font-semibold">{f.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="products" aria-labelledby="ex-products" className="bg-[#1F3D2B] py-16 text-[#F6F1E7] sm:py-24">
          <div className="mx-auto max-w-6xl px-5">
            <h2 id="ex-products" className="text-[30px] sm:text-4xl">{t("products.title")}</h2>
            <p className="mt-3 max-w-[60ch] text-[#F6F1E7]/75">{t("products.text")}</p>
            <ul className="mt-10 grid gap-6 md:grid-cols-3">
              {products.map((p, i) => (
                <li key={p.name} className="flex flex-col overflow-hidden rounded-lg bg-[#F6F1E7] text-[#1F3D2B]">
                  <JuteSwatch tone={tones[i]} />
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h3 className="text-[20px]">{p.name}</h3>
                    <p className="text-[#1F3D2B]/75">{p.text}</p>
                    <dl className="mt-auto divide-y divide-[#1F3D2B]/10 border-t border-[#1F3D2B]/10 text-sm">
                      {p.specs.map((s) => (
                        <div key={s.label} className="flex justify-between gap-4 py-2">
                          <dt className="text-[#1F3D2B]/70">{s.label}</dt>
                          <dd className="text-right font-semibold">{s.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="ex-why" className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
          <h2 id="ex-why" className="text-[30px] sm:text-4xl">{t("why.title")}</h2>
          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {reasons.map((r) => (
              <li key={r.title} className="border-t-2 border-[#C9A66B] pt-5">
                <h3 className="text-lg">{r.title}</h3>
                <p className="mt-2 text-[#1F3D2B]/75">{r.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="enquiry" aria-labelledby="ex-form" className="bg-[#EDE4D3] py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-5">
            <h2 id="ex-form" className="text-[30px] sm:text-4xl">{t("form.title")}</h2>
            <p className="mt-3 text-[#1F3D2B]/75">{t("form.text")}</p>
            <DemoForm
              className="mt-10"
              inputClassName="border-[#1F3D2B]/20 bg-white focus:border-[#8C6B3F] focus:outline-none"
              buttonClassName="rounded-sm bg-[#1F3D2B] text-[#F6F1E7] hover:bg-[#8C6B3F]"
              submit={t("form.submit")}
              success={t("form.success")}
              requiredError={t("form.error")}
              demoNote={t("form.demoNote")}
              fields={[
                { name: "company", label: t("form.company"), required: true, half: true },
                { name: "country", label: t("form.country"), required: true, half: true },
                { name: "email", label: t("form.email"), type: "email", required: true, half: true },
                { name: "product", label: t("form.product"), type: "select", options: products.map((p) => p.name), required: true, half: true },
                { name: "quantity", label: t("form.quantity"), required: true },
                { name: "message", label: t("form.message"), type: "textarea" },
              ]}
            />
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-6xl px-5 py-10 text-sm text-[#1F3D2B]/70">{t("footer")}</footer>
    </div>
  );
}
