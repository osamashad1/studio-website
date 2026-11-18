import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type Window = `${number} ${"s" | "m" | "h"}`;

const hasUpstash = !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);

// Local fallback (only for development): counts in memory, resets on restart.
const memory = new Map<string, { count: number; reset: number }>();
const toMs = (w: Window) => {
  const [n, unit] = w.split(" ");
  return Number(n) * { s: 1000, m: 60_000, h: 3_600_000 }[unit as "s" | "m" | "h"];
};

/**
 * Limits how often one visitor (IP) may call an API, e.g. 5 form sends per 10 minutes.
 * Uses Upstash Redis when configured — serverless servers don't share memory.
 */
export function createLimiter(prefix: string, limit: number, window: Window) {
  const upstash = hasUpstash
    ? new Ratelimit({ redis: Redis.fromEnv(), limiter: Ratelimit.slidingWindow(limit, window), prefix })
    : null;

  return async function check(id: string): Promise<boolean> {
    if (upstash) return (await upstash.limit(id)).success;
    const now = Date.now();
    const key = `${prefix}:${id}`;
    const entry = memory.get(key);
    if (!entry || entry.reset < now) {
      memory.set(key, { count: 1, reset: now + toMs(window) });
      return true;
    }
    entry.count += 1;
    return entry.count <= limit;
  };
}

/** Best guess of the visitor's IP from the hosting provider's headers. */
export function clientIp(headers: Headers) {
  return (
    headers.get("x-nf-client-connection-ip") ?? // Netlify
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headers.get("x-real-ip") ??
    "unknown"
  );
}
