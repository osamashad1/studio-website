import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 rounded-sm";

const variants: Record<Variant, string> = {
  primary: "bg-cobalt text-white hover:bg-ink active:bg-ink",
  secondary:
    "border-2 border-ink bg-transparent text-ink hover:bg-signal hover:border-ink",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-base",
  lg: "h-14 px-7 text-lg",
};

type Common = { variant?: Variant; size?: Size; className?: string };

export function buttonClasses({ variant = "primary", size = "md", className }: Common = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

/** A real <button> (for forms and actions). */
export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: Common & ComponentProps<"button">) {
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...props} />
  );
}

/** Looks like a button, but navigates (uses the locale-aware Link). */
export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: Common & ComponentProps<typeof Link>) {
  return <Link className={buttonClasses({ variant, size, className })} {...props} />;
}
