import { Section } from "@/components/ui/Section";

export type LegalSection = { title: string; text: string[] };

/** Renders a legal page from message data. <PLACEHOLDER> values are highlighted. */
export function LegalPage({
  title,
  intro,
  sections,
  note,
}: {
  title: string;
  intro?: string;
  sections: LegalSection[];
  note?: string;
}) {
  const mark = (s: string) =>
    s.split(/(<[A-ZÄÖÜ][^<>]*>)/g).map((part, i) =>
      /^<[A-ZÄÖÜ][^<>]*>$/.test(part) ? (
        <mark key={i} className="rounded-sm bg-signal/60 px-1 text-ink">{part}</mark>
      ) : (
        part
      ),
    );

  return (
    <Section className="flex-1">
      <article className="max-w-[70ch]">
        <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
        {note && <p className="mt-6 rounded-sm border-2 border-signal bg-signal/15 p-4 text-sm">{note}</p>}
        {intro && <p className="mt-6 text-lg text-slate">{mark(intro)}</p>}
        {sections.map((s) => (
          <section key={s.title} className="mt-10">
            <h2 className="font-display text-lg font-bold">{s.title}</h2>
            {s.text.map((p, i) => (
              <p key={i} className="mt-3 whitespace-pre-line text-slate">{mark(p)}</p>
            ))}
          </section>
        ))}
      </article>
    </Section>
  );
}
