import { contactSchema } from "@/lib/schemas";
import { EmailNotConfiguredError, sendNotification } from "@/lib/email";
import { clientIp, createLimiter } from "@/lib/ratelimit";

const limiter = createLimiter("contact", 5, "10 m");

export async function POST(request: Request) {
  if (!(await limiter(clientIp(request.headers)))) {
    return Response.json({ ok: false, error: "rateLimited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Honeypot filled in → it's a bot. Pretend success, send nothing.
  if (typeof body === "object" && body && "website" in body && (body as { website?: string }).website) {
    return Response.json({ ok: true });
  }

  // Validate again on the server — never trust the browser.
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const d = parsed.data;

  try {
    await sendNotification({
      subject: `Neue Projektanfrage: ${d.name} (${d.business})`,
      replyTo: d.email,
      text: [
        `Name: ${d.name}`,
        `E-Mail: ${d.email}`,
        `Unternehmen: ${d.business}`,
        `Bedarf: ${d.needs.join(", ")}`,
        `Budget: ${d.budget}`,
        `Start: ${d.start}`,
        `Sprache: ${d.locale ?? "-"}`,
        "",
        d.message,
      ].join("\n"),
    });
  } catch (err) {
    console.error("[contact] email failed", err instanceof EmailNotConfiguredError ? err.message : err);
    return Response.json({ ok: false, error: "send" }, { status: 500 });
  }

  return Response.json({ ok: true });
}
