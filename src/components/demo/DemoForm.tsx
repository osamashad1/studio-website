"use client";

import { useId, useState } from "react";

export type DemoField = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "date" | "time" | "number" | "select" | "textarea";
  options?: string[];
  required?: boolean;
  half?: boolean; // half width on larger screens
};

/**
 * Form for the demo websites. It only checks required fields and shows a success
 * message — nothing is sent anywhere (demo!).
 */
export function DemoForm({
  fields,
  submit,
  success,
  requiredError,
  demoNote,
  className = "",
  inputClassName = "",
  buttonClassName = "",
}: {
  fields: DemoField[];
  submit: string;
  success: string;
  requiredError: string;
  demoNote: string;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
}) {
  const id = useId();
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div role="status" className={`rounded-lg p-6 text-lg font-semibold ${className}`}>
        {success}
      </div>
    );
  }

  return (
    <form
      noValidate
      className={`grid gap-4 sm:grid-cols-2 ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const next: Record<string, boolean> = {};
        for (const f of fields) {
          const v = String(data.get(f.name) ?? "").trim();
          if (f.required && !v) next[f.name] = true;
          if (f.type === "email" && v && !/^\S+@\S+\.\S+$/.test(v)) next[f.name] = true;
        }
        setErrors(next);
        if (Object.keys(next).length === 0) setSent(true);
      }}
    >
      {fields.map((f) => {
        const fid = `${id}-${f.name}`;
        const invalid = !!errors[f.name];
        const common = {
          id: fid,
          name: f.name,
          "aria-invalid": invalid || undefined,
          "aria-describedby": invalid ? `${fid}-err` : undefined,
          className: `w-full rounded-md border-2 px-4 py-3 ${invalid ? "border-red-600" : ""} ${inputClassName}`,
        };
        return (
          <div key={f.name} className={`flex flex-col gap-2 ${f.half ? "" : "sm:col-span-2"}`}>
            <label htmlFor={fid} className="text-sm font-semibold">
              {f.label}
              {f.required && <span aria-hidden> *</span>}
            </label>
            {f.type === "select" ? (
              <select {...common} defaultValue="">
                <option value="" disabled>
                  —
                </option>
                {f.options?.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : f.type === "textarea" ? (
              <textarea {...common} rows={4} />
            ) : (
              <input {...common} type={f.type ?? "text"} min={f.type === "number" ? 1 : undefined} />
            )}
            {invalid && (
              <p id={`${fid}-err`} role="alert" className="text-sm font-semibold text-red-600">
                {requiredError}
              </p>
            )}
          </div>
        );
      })}
      <div className="flex flex-col gap-3 sm:col-span-2">
        <button type="submit" className={`w-fit rounded-md px-6 py-3 font-semibold ${buttonClassName}`}>
          {submit}
        </button>
        <p className="text-sm opacity-70">{demoNote}</p>
      </div>
    </form>
  );
}
