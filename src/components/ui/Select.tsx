import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { fieldClasses } from "./Field";

export function Select({
  className,
  invalid,
  children,
  ...props
}: ComponentProps<"select"> & { invalid?: boolean }) {
  return (
    <div className="relative">
      <select
        aria-invalid={invalid || undefined}
        className={cn(fieldClasses(invalid), "h-12 appearance-none pr-11", className)}
        {...props}
      >
        {children}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 20 20"
        className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ink"
      >
        <path d="M5 7.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    </div>
  );
}
