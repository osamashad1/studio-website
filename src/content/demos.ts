/** The demo websites (built in Phase 6). Texts live in messages → "demos". */
export const demos = [
  { slug: "cafe", palette: { bg: "#F4EDE4", ink: "#3B2A20", accent: "#C8643B" } },
  { slug: "handwerk", palette: { bg: "#FFFFFF", ink: "#0F2A44", accent: "#FF7A00" } },
  { slug: "export", palette: { bg: "#F6F1E7", ink: "#1F3D2B", accent: "#C9A66B" } },
  { slug: "luxury", palette: { bg: "#0B0B0C", ink: "#F2EDE4", accent: "#C9A45C" } },
] as const;

export type DemoSlug = (typeof demos)[number]["slug"];
