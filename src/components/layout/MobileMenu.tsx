"use client";

import { useTranslations } from "next-intl";
import { useEffect, useId, useState } from "react";
import { buttonClasses } from "@/components/ui/Button";
import { contactHref, mainNav } from "@/config/nav";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function MobileMenu() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const panelId = useId();

  // Close with Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="flex h-11 items-center gap-2 rounded-sm px-3 font-semibold hover:bg-white"
      >
        <span aria-hidden className="relative block h-3 w-5">
          <span
            className={`absolute left-0 h-0.5 w-5 bg-ink transition-transform ${open ? "top-1.5 rotate-45" : "top-0"}`}
          />
          <span
            className={`absolute left-0 h-0.5 w-5 bg-ink transition-transform ${open ? "top-1.5 -rotate-45" : "top-2.5"}`}
          />
        </span>
        {open ? t("close") : t("menu")}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b-2 border-line bg-paper shadow-lg"
      >
        <nav aria-label={t("mainLabel")} className="mx-auto flex max-w-6xl flex-col px-5 py-4 sm:px-8">
          {mainNav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={close}
              className="rounded-sm py-3 font-display text-xl hover:text-cobalt"
            >
              {t(item.key)}
            </Link>
          ))}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t-2 border-line pt-4">
            <LanguageSwitcher />
            <Link href={contactHref} onClick={close} className={buttonClasses()}>
              {t("cta")}
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
