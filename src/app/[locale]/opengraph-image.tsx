import { ImageResponse } from "next/og";
import { BLOCKS, COLORS, WINDOW } from "@/components/hero/blocks";
import { site } from "@/config/site";
import de from "../../../messages/de.json";
import en from "../../../messages/en.json";

export const alt = "Websites, die Kunden bringen.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Share image (WhatsApp, LinkedIn, …) — same look as the Stewdio brand kit. */
export default async function OgImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const m = locale === "en" ? en : de;
  const scale = 0.75;
  const [year, month] = site.availability.nextFreeMonth.split("-").map(Number);
  const monthName = new Intl.DateTimeFormat(locale, { month: "long", timeZone: "UTC" }).format(new Date(Date.UTC(year, month - 1, 15)));
  const badge = locale === "en" ? `${site.availability.freeSlots} project slot free in ${monthName}` : `${site.availability.freeSlots} Projektplatz frei im ${monthName}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#10162F", color: "#F3F5FA", padding: 64, position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", width: 600, justifyContent: "space-between" }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#FFD23F" }}>{site.studioName}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.05 }}>{m.hero.title}</div>
            <div style={{ fontSize: 26, color: "#C5CBE0", lineHeight: 1.4 }}>{m.hero.subtitle}</div>
          </div>
          <div style={{ display: "flex", alignSelf: "flex-start", background: "#3DDC97", color: "#10162F", fontSize: 22, fontWeight: 700, padding: "10px 22px", borderRadius: 999 }}>{badge}</div>
        </div>
        <div style={{ position: "absolute", right: 70, top: 155, width: WINDOW.w * scale, height: WINDOW.h * scale + 8, display: "flex" }}>
          {BLOCKS.map((b) => (
            <div
              key={b.name}
              style={{
                position: "absolute",
                left: b.x * scale,
                top: b.y * scale,
                width: b.w * scale,
                height: b.h * scale,
                borderRadius: 9,
                background: b.accent ? COLORS.signal : b.light ? COLORS.cobaltLight : COLORS.cobalt,
                boxShadow: `0 7px 0 ${b.accent ? COLORS.signalDepth : COLORS.cobaltDepth}`,
              }}
            />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
