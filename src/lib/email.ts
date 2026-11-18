import "server-only";
import { Resend } from "resend";

export class EmailNotConfiguredError extends Error {}

/**
 * Sends a notification email to you (CONTACT_TO_EMAIL) via Resend.
 * Used by the project form and by the AI assistant's save_lead tool.
 *
 * Without RESEND_API_KEY in local development, the email is printed to the
 * terminal instead, so you can test the form without an account.
 */
export async function sendNotification({
  subject,
  text,
  replyTo,
}: {
  subject: string;
  text: string;
  replyTo?: string;
}) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Website <onboarding@resend.dev>";

  if (!key || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`\n[email — not sent, RESEND_API_KEY missing]\nSubject: ${subject}\nReply-To: ${replyTo}\n\n${text}\n`);
      return;
    }
    throw new EmailNotConfiguredError("RESEND_API_KEY or CONTACT_TO_EMAIL is not set");
  }

  const { error } = await new Resend(key).emails.send({ from, to, subject, text, replyTo });
  if (error) throw new Error(`Resend: ${error.message}`);
}
