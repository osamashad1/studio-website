import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Tone = "available" | "highlight" | "neutral";

const tones: Record<Tone, string> = {
  available: "bg-mint/20 text-ink",
  highlight: "bg-signal text-ink",
  neutral: "bg-white text-slate border border-line",
};

export function Badge({
  tone = "neutral",
  className,
  children,
  ...props
}: ComponentProps<"span"> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold",
        tones[tone],
        className,
      )}
      {...props}
    >
      {tone === "available" && (
        <span aria-hidden className="size-2 rounded-full bg-mint" />
      )}
      {children}
    </span>
  );
}
