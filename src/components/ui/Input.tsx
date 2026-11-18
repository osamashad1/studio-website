import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { fieldClasses } from "./Field";

export function Input({
  className,
  invalid,
  ...props
}: ComponentProps<"input"> & { invalid?: boolean }) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={cn(fieldClasses(invalid), "h-12", className)}
      {...props}
    />
  );
}
