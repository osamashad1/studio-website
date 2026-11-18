"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { CHAT_LIMITS } from "@/ai/limits";
import { site } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

export function ChatWidget() {
  const t = useTranslations("chat");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const panelId = useId();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat", body: { locale } }), [locale]);
  const { messages, sendMessage, status, error } = useChat({ transport });

  const userCount = messages.filter((m) => m.role === "user").length;
  const limitReached = userCount >= CHAT_LIMITS.messagesPerSession;
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, status]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = (text: string) => {
    const value = text.trim();
    if (!value || busy || limitReached || value.length > CHAT_LIMITS.charsPerMessage) return;
    sendMessage({ text: value });
    setInput("");
  };

  const errorText = (() => {
    if (!error) return null;
    const m = error.message ?? "";
    if (m.includes("notConfigured")) return t("errors.notConfigured", { email: site.email });
    if (m.includes("sessionLimit")) return t("limit");
    if (m.includes("rateLimited")) return t("errors.rateLimited");
    return t("errors.generic", { email: site.email });
  })();

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="fixed right-4 bottom-4 z-50 flex h-14 items-center gap-2 rounded-full bg-ink pr-5 pl-4 font-semibold text-paper shadow-xl ring-2 ring-paper/25 transition-colors hover:bg-cobalt sm:right-6 sm:bottom-6"
      >
        <span aria-hidden className="relative flex size-7 items-center justify-center rounded-full bg-signal text-ink">
          {open ? "×" : <svg viewBox="0 0 20 20" className="size-4"><path d="M3 4h14v9H8l-4 3v-3H3z" fill="currentColor" /></svg>}
        </span>
        {open ? t("close") : t("open")}
      </button>

      <div
        id={panelId}
        role="dialog"
        aria-modal="false"
        aria-labelledby={`${panelId}-title`}
        hidden={!open}
        className="fixed inset-x-2 bottom-20 z-50 flex max-h-[min(640px,calc(100svh-6rem))] flex-col overflow-hidden rounded-lg border-2 border-line bg-white shadow-2xl sm:inset-x-auto sm:right-6 sm:bottom-24 sm:w-[400px]"
      >
        <div className="flex items-center gap-3 bg-ink px-5 py-4 text-paper">
          <span aria-hidden className="size-2.5 rounded-full bg-mint" />
          <div>
            <p id={`${panelId}-title`} className="font-display font-bold">{t("title")}</p>
            <p className="text-sm text-paper/70">{t("subtitle")}</p>
          </div>
        </div>

        <div ref={listRef} aria-live="polite" className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
          <p className="max-w-[85%] rounded-lg rounded-tl-sm bg-paper px-4 py-3">{t("welcome")}</p>

          {messages.length === 0 && (
            <div className="flex flex-col items-start gap-2">
              {(t.raw("starters") as string[]).map((q) => (
                <button key={q} type="button" onClick={() => send(q)} className="rounded-full border-2 border-cobalt px-3 py-1.5 text-left text-sm font-semibold text-cobalt hover:bg-cobalt hover:text-white">
                  {q}
                </button>
              ))}
            </div>
          )}

          {messages.map((m) => {
            const text = m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
            const savedLead = m.parts.some((p) => p.type === "tool-save_lead" && "output" in p && (p.output as { ok?: boolean })?.ok);
            if (!text && !savedLead) return null;
            return (
              <div key={m.id} className={cn("flex flex-col gap-2", m.role === "user" ? "items-end" : "items-start")}>
                {savedLead && <p className="rounded-full bg-mint/20 px-3 py-1 text-sm font-semibold">{t("leadSaved")}</p>}
                {text && (
                  <p className={cn("max-w-[85%] whitespace-pre-wrap rounded-lg px-4 py-3", m.role === "user" ? "rounded-tr-sm bg-cobalt text-white" : "rounded-tl-sm bg-paper")}>
                    <span className="sr-only">{m.role === "user" ? t("you") : t("assistant")}: </span>
                    {text}
                  </p>
                )}
              </div>
            );
          })}

          {status === "submitted" && (
            <p className="w-fit rounded-lg bg-paper px-4 py-3 text-slate" aria-label={t("typing")}>
              <span aria-hidden className="inline-flex gap-1">
                <span className="size-1.5 animate-bounce rounded-full bg-slate" />
                <span className="size-1.5 animate-bounce rounded-full bg-slate [animation-delay:150ms]" />
                <span className="size-1.5 animate-bounce rounded-full bg-slate [animation-delay:300ms]" />
              </span>
            </p>
          )}
          {errorText && <p role="alert" className="rounded-sm bg-danger/10 px-4 py-3 text-sm text-ink">{errorText}</p>}
          {limitReached && <p role="status" className="rounded-sm bg-signal/30 px-4 py-3 text-sm">{t("limit")}</p>}
        </div>

        <form
          className="border-t-2 border-line p-3"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <div className="flex items-end gap-2">
            <label htmlFor={`${panelId}-input`} className="sr-only">{t("inputLabel")}</label>
            <textarea
              id={`${panelId}-input`}
              ref={inputRef}
              rows={1}
              value={input}
              maxLength={CHAT_LIMITS.charsPerMessage}
              disabled={limitReached}
              placeholder={t("placeholder")}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              className="max-h-32 min-h-11 flex-1 resize-none rounded-sm border-2 border-line px-3 py-2 focus:border-cobalt focus:outline-none disabled:bg-paper"
            />
            <button type="submit" disabled={busy || limitReached || !input.trim()} className="h-11 rounded-sm bg-cobalt px-4 font-semibold text-white hover:bg-ink disabled:opacity-40">
              {t("send")}
            </button>
          </div>
          <div className="mt-2 flex justify-between gap-3 text-xs text-slate">
            <p>
              {t.rich("privacy", { link: (c) => <Link href="/datenschutz" className="underline">{c}</Link> })}
            </p>
            {input.length > CHAT_LIMITS.charsPerMessage * 0.8 && (
              <p className="shrink-0">{input.length}/{CHAT_LIMITS.charsPerMessage}</p>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
