import { cn } from "@/lib/cn";

export const fieldClasses = (hasError?: boolean) =>
  cn(
    "w-full rounded-sm border-2 bg-white px-4 text-base text-ink placeholder:text-slate/70",
    "transition-colors focus:border-cobalt focus:outline-none focus-visible:outline-offset-1",
    hasError ? "border-danger" : "border-line hover:border-steel",
  );

/** Label + control + optional hint/error, wired up for screen readers. */
export function Field({
  id,
  label,
  hint,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
        {required && <span aria-hidden className="text-cobalt in-[.on-dark]:text-signal"> *</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-sm text-slate">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm font-semibold text-danger in-[.on-dark]:text-[#ff8a80]">
          {error}
        </p>
      )}
    </div>
  );
}

/** aria-describedby value for a control inside <Field>. */
export const describedBy = (id: string, opts: { hint?: string; error?: string }) =>
  opts.error ? `${id}-error` : opts.hint ? `${id}-hint` : undefined;
