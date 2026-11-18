import { cn } from "@/lib/cn";

/** Consistent section title + optional intro text. */
export function SectionHeading({
  id,
  title,
  intro,
  className,
}: {
  id: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex max-w-3xl flex-col gap-4", className)}>
      <h2 id={id} className="text-xl font-bold sm:text-2xl">
        {title}
      </h2>
      {intro && <p className="max-w-[60ch] text-lg text-slate">{intro}</p>}
    </div>
  );
}
