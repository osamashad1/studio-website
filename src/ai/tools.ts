import "server-only";
import { tool } from "ai";
import { z } from "zod";
import { site } from "@/config/site";
import { sendNotification } from "@/lib/email";
import de from "../../messages/de.json";
import en from "../../messages/en.json";

const messages = { de, en };

export function createTools(locale: "de" | "en") {
  const m = messages[locale].packages;

  return {
    get_packages: tool({
      description:
        "Get the studio's monthly subscription packages: what's included, the monthly price in EUR (net), the minimum term and the offers for first-time customers.",
      inputSchema: z.object({}),
      execute: async () => ({
        billing: "monthly subscription, prices net per month, no setup fee",
        minimumTermMonths: site.subscription.minTermMonths,
        afterMinimumTerm: "cancellable monthly",
        offersForFirstTimeCustomers: {
          firstMonthFree: site.offers.firstMonthFree,
          freeWebsiteCheck: site.offers.freeWebsiteCheck,
        },
        googleAdsBudget: "paid separately, directly to Google (only Growth)",
        packages: site.packages.map((p) => {
          const text = m[p.id] as { name: string; for?: string; features?: string[]; text?: string };
          return {
            id: p.id,
            name: text.name,
            forWhom: text.for ?? text.text,
            includes: text.features ?? [],
            pricePerMonthEUR: p.pricePerMonth ?? "on request",
            recommended: "recommended" in p ? p.recommended : false,
          };
        }),
      }),
    }),

    get_availability: tool({
      description: "Get how many new project slots are free and in which month (YYYY-MM).",
      inputSchema: z.object({}),
      execute: async () => ({
        nextFreeMonth: site.availability.nextFreeMonth,
        freeSlots: site.availability.freeSlots,
        projectsPerMonth: site.availability.projectsPerMonth,
      }),
    }),

    save_lead: tool({
      description:
        "Send the visitor's contact details and project idea to the studio owner by email. ONLY call this after the visitor explicitly agreed to share their details.",
      inputSchema: z.object({
        name: z.string().trim().min(2).max(100),
        email: z.email().max(200),
        businessType: z.string().trim().min(2).max(100),
        description: z.string().trim().min(10).max(2000),
        consent: z.literal(true).describe("true only if the visitor explicitly agreed to share their details"),
      }),
      execute: async ({ name, email, businessType, description }) => {
        try {
          await sendNotification({
            subject: `Neue Anfrage über den Chat: ${name} (${businessType})`,
            replyTo: email,
            text: [`Name: ${name}`, `E-Mail: ${email}`, `Unternehmen: ${businessType}`, `Sprache: ${locale}`, "", description, "", "— gesendet vom KI-Assistenten der Website"].join("\n"),
          });
          return { ok: true };
        } catch {
          return { ok: false, fallback: `Please use the project form or email ${site.email}.` };
        }
      },
    }),
  };
}
