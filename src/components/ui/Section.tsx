import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Tone = "paper" | "white" | "ink";

const tones: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  white: "bg-white text-ink",
  ink: "on-dark bg-ink text-paper",
};

/** A full-width page section with vertical spacing and an inner Container. */
export function Section({
  tone = "paper",
  className,
  children,
  ...props
}: ComponentProps<"section"> & { tone?: Tone }) {
  return (
    <section className={cn("py-16 sm:py-24", tones[tone], className)} {...props}>
      <Container>{children}</Container>
    </section>
  );
}
