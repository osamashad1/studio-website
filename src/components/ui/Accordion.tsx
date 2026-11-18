import { cn } from "@/lib/cn";

/**
 * FAQ-style accordion built on native <details>/<summary>:
 * works without JavaScript, keyboard + screen-reader friendly out of the box.
 */
export function Accordion({
  items,
  className,
}: {
  items: { question: string; answer: React.ReactNode }[];
  className?: string;
}) {
  return (
    <div className={cn("divide-y-2 divide-line border-y-2 border-line", className)}>
      {items.map((item) => (
        <details key={item.question} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
            {item.question}
            <span
              aria-hidden
              className="relative size-5 shrink-0 before:absolute before:top-1/2 before:left-0 before:h-0.5 before:w-5 before:-translate-y-1/2 before:bg-cobalt after:absolute after:top-0 after:left-1/2 after:h-5 after:w-0.5 after:-translate-x-1/2 after:bg-cobalt after:transition-transform group-open:after:scale-y-0"
            />
          </summary>
          <div className="max-w-[70ch] pb-5 text-slate">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
