import { z } from "zod";

/** Option values (labels come from messages → "form.options"). */
export const businessTypes = ["cafe", "craft", "shop", "service", "export", "other"] as const;
export const needs = ["website", "webapp", "ads", "seo", "design", "chatbot", "automation"] as const;
export const budgets = ["lt1500", "1500to3000", "3000to6000", "gt6000", "unsure"] as const;
export const starts = ["asap", "1to3", "later", "unsure"] as const;

/**
 * Project form rules — used in the browser AND again on the server.
 * Error messages are translation keys (messages → "form.errors").
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "name").max(100, "tooLong"),
  email: z.email("email").max(200, "tooLong"),
  business: z.enum(businessTypes, "required"),
  needs: z.array(z.enum(needs)).min(1, "needs"),
  budget: z.enum(budgets, "required"),
  start: z.enum(starts, "required"),
  message: z.string().trim().min(20, "messageShort").max(2000, "tooLong"),
  privacy: z.literal(true, "privacy"),
  // Honeypot: real people never see this field. Bots fill it in.
  website: z.string().max(0).optional(),
  locale: z.enum(["de", "en"]).optional(),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;

/** Lead collected by the AI assistant (Phase 8). */
export const leadSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().max(200),
  businessType: z.string().trim().min(2).max(100),
  description: z.string().trim().min(10).max(2000),
});
export type Lead = z.output<typeof leadSchema>;
