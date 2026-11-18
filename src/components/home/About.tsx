import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { site } from "@/config/site";

export function About() {
  const t = useTranslations("about");
  const paragraphs = t.raw("text") as string[];

  return (
    <Section id="ueber-mich" tone="white" aria-labelledby="about-title">
      <div className="grid items-center gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-16">
        {/* Photo placeholder — replace with next/image + your photo in public/about.jpg */}
        <div
          role="img"
          aria-label={t("photoAlt", { name: site.ownerName })}
          className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-lg bg-paper"
        >
          <span aria-hidden className="absolute inset-x-8 bottom-0 h-3/5 rounded-t-full bg-steel/40" />
          <span aria-hidden className="absolute top-[18%] left-1/2 size-28 -translate-x-1/2 rounded-full bg-steel/40" />
          <span aria-hidden className="absolute top-6 right-6 h-8 w-16 rounded-sm bg-signal rotate-6" />
          <span className="absolute bottom-4 left-4 rounded-sm bg-white px-3 py-1 text-sm text-slate">
            {t("photoPlaceholder")}
          </span>
        </div>
        <div className="flex flex-col gap-5">
          <h2 id="about-title" className="text-xl font-bold sm:text-2xl">
            {t("title", { name: site.ownerName })}
          </h2>
          {paragraphs.map((p) => (
            <p key={p} className="max-w-[62ch] text-lg text-slate">
              {p}
            </p>
          ))}
          <ul className="flex flex-wrap gap-2 pt-2">
            {(t.raw("skills") as string[]).map((s) => (
              <li key={s} className="rounded-full border-2 border-line px-3 py-1 text-sm font-semibold">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
