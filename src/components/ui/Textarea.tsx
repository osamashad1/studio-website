import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { fieldClasses } from "./Field";

export function Textarea({
  className,
  invalid,
  rows = 5,
  ...props
}: ComponentProps<"textarea"> & { invalid?: boolean }) {
  return (
    <textarea
      rows={rows}
      aria-invalid={invalid || undefined}
      className={cn(fieldClasses(invalid), "py-3", className)}
      {...props}
    />
  );
}
