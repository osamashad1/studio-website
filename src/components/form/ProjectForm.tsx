"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Field, describedBy } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { site } from "@/config/site";
import { Link } from "@/i18n/navigation";
import {
  budgets,
  businessTypes,
  contactSchema,
  needs,
  starts,
  type ContactData,
  type ContactInput,
} from "@/lib/schemas";

type Status = "idle" | "sending" | "success" | "error" | "rateLimited";

export function ProjectForm() {
  const t = useTranslations("form");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput, unknown, ContactData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { needs: [], privacy: false as unknown as true, website: "" },
  });

  const err = (key: keyof ContactInput) => {
    const m = errors[key]?.message;
    return m ? t(`errors.${m}` as "errors.required") : undefined;
  };

  const onSubmit = async (data: ContactData) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      setStatus(res.ok ? "success" : res.status === 429 ? "rateLimited" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div role="status" className="rounded-lg bg-mint/15 p-8 text-ink">
        <p className="font-display text-xl font-bold text-paper">{t("success.title")}</p>
        <p className="mt-2 text-paper/80">{t("success.text")}</p>
      </div>
    );
  }

  const fieldText = "[&_label]:text-paper [&_p:not([role=alert])]:text-paper/75";

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className={`grid gap-6 sm:grid-cols-2 ${fieldText}`}>
      <Field id="f-name" label={t("name")} required error={err("name")}>
        <Input id="f-name" autoComplete="name" invalid={!!errors.name} aria-describedby={describedBy("f-name", { error: err("name") })} {...register("name")} />
      </Field>
      <Field id="f-email" label={t("email")} required error={err("email")}>
        <Input id="f-email" type="email" autoComplete="email" invalid={!!errors.email} aria-describedby={describedBy("f-email", { error: err("email") })} {...register("email")} />
      </Field>
      <Field id="f-business" label={t("business")} required error={err("business")}>
        <Select id="f-business" defaultValue="" invalid={!!errors.business} aria-describedby={describedBy("f-business", { error: err("business") })} {...register("business")}>
          <option value="" disabled>{t("choose")}</option>
          {businessTypes.map((v) => <option key={v} value={v}>{t(`options.business.${v}`)}</option>)}
        </Select>
      </Field>
      <Field id="f-budget" label={t("budget")} required error={err("budget")}>
        <Select id="f-budget" defaultValue="" invalid={!!errors.budget} aria-describedby={describedBy("f-budget", { error: err("budget") })} {...register("budget")}>
          <option value="" disabled>{t("choose")}</option>
          {budgets.map((v) => <option key={v} value={v}>{t(`options.budget.${v}`)}</option>)}
        </Select>
      </Field>

      <fieldset className="sm:col-span-2" aria-describedby={errors.needs ? "f-needs-error" : undefined}>
        <legend className="text-sm font-semibold text-paper">
          {t("needs")} <span aria-hidden className="text-signal">*</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {needs.map((v) => (
            <label key={v} className="cursor-pointer">
              <input type="checkbox" value={v} className="peer sr-only" {...register("needs")} />
              <span className="inline-block rounded-full border-2 border-paper/30 px-4 py-2 text-sm font-semibold text-paper transition-colors peer-checked:border-signal peer-checked:bg-signal peer-checked:text-ink peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-signal hover:border-paper">
                {t(`options.needs.${v}`)}
              </span>
            </label>
          ))}
        </div>
        {errors.needs && <p id="f-needs-error" role="alert" className="mt-2 text-sm font-semibold text-[#ff8a80]">{err("needs")}</p>}
      </fieldset>

      <Field id="f-start" label={t("start")} required error={err("start")}>
        <Select id="f-start" defaultValue="" invalid={!!errors.start} aria-describedby={describedBy("f-start", { error: err("start") })} {...register("start")}>
          <option value="" disabled>{t("choose")}</option>
          {starts.map((v) => <option key={v} value={v}>{t(`options.start.${v}`)}</option>)}
        </Select>
      </Field>

      <div className="sm:col-span-2">
        <Field id="f-message" label={t("message")} required hint={t("messageHint")} error={err("message")}>
          <Textarea id="f-message" rows={6} invalid={!!errors.message} aria-describedby={describedBy("f-message", { hint: t("messageHint"), error: err("message") })} {...register("message")} />
        </Field>
      </div>

      {/* Honeypot — hidden from people and screen readers */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="f-website">Website</label>
        <input id="f-website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-paper">
          <input type="checkbox" className="mt-1 size-5 shrink-0 accent-signal" aria-invalid={!!errors.privacy || undefined} aria-describedby={errors.privacy ? "f-privacy-error" : undefined} {...register("privacy")} />
          <span>
            {t.rich("privacy", {
              link: (chunks) => <Link href="/datenschutz" className="underline underline-offset-4 hover:text-signal">{chunks}</Link>,
            })}
          </span>
        </label>
        {errors.privacy && <p id="f-privacy-error" role="alert" className="mt-2 text-sm font-semibold text-[#ff8a80]">{err("privacy")}</p>}
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2">
        <Button type="submit" size="lg" variant="onDarkPrimary" disabled={status === "sending"} className="w-fit">
          {status === "sending" ? t("sending") : t("submit")}
        </Button>
        {(status === "error" || status === "rateLimited") && (
          <p role="alert" className="max-w-[60ch] rounded-sm bg-[#ff8a80]/15 p-4 text-paper">
            {t(status === "rateLimited" ? "rateLimited" : "error", { email: site.email })}
          </p>
        )}
      </div>
    </form>
  );
}
