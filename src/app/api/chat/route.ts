import { createGoogleGenerativeAI } from "@ai-sdk/google";
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  isStepCount,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";
import { CHAT_LIMITS } from "@/ai/limits";
import { systemPrompt } from "@/ai/system-prompt";
import { createTools } from "@/ai/tools";
import { clientIp, createLimiter } from "@/lib/ratelimit";

const limiter = createLimiter("chat", 30, "10 m"); // per IP

const textOf = (m: UIMessage) =>
  m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return Response.json({ error: "notConfigured" }, { status: 503 });

  if (!(await limiter(clientIp(req.headers)))) {
    return Response.json({ error: "rateLimited" }, { status: 429 });
  }

  let body: { messages?: UIMessage[]; locale?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "invalid" }, { status: 400 });
  }
  const messages = Array.isArray(body.messages) ? body.messages : [];
  const locale = body.locale === "en" ? "en" : "de";

  // Limits: max messages per session, max characters per message.
  const userMessages = messages.filter((m) => m.role === "user");
  if (userMessages.length === 0) return Response.json({ error: "invalid" }, { status: 400 });
  if (userMessages.length > CHAT_LIMITS.messagesPerSession) {
    return Response.json({ error: "sessionLimit" }, { status: 429 });
  }
  if (userMessages.some((m) => textOf(m).length > CHAT_LIMITS.charsPerMessage)) {
    return Response.json({ error: "tooLong" }, { status: 400 });
  }

  const google = createGoogleGenerativeAI({ apiKey });
  const result = streamText({
    model: google(process.env.GEMINI_MODEL ?? "gemini-3.5-flash"),
    instructions: systemPrompt(locale),
    messages: await convertToModelMessages(messages),
    tools: createTools(locale),
    stopWhen: isStepCount(6), // tool-use loop: at most 6 steps
    maxOutputTokens: 600,
    temperature: 0.4,
  });

  return createUIMessageStreamResponse({ stream: toUIMessageStream({ stream: result.stream }) });
}
