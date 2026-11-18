/**
 * The browser-window layout (same as the Stewdio brand-kit animation).
 * Units: pixels of a 600 × 418 window. The 3D scene and the static fallback SVG
 * both read from here, so they always match.
 */
export type Block = {
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  accent?: boolean; // the one signal-yellow block (the "button")
  light?: boolean; // lighter cobalt for depth variation
  /** Start position offset (window units) and rotation (degrees) for the fly-in. */
  from: [number, number, number];
  spin: number;
};

export const WINDOW = { w: 600, h: 418 };

export const BLOCKS: Block[] = [
  { name: "top bar", x: 0, y: 0, w: 520, h: 56, from: [-520, 380, -300], spin: -18 },
  { name: "window dots", x: 532, y: 0, w: 68, h: 56, light: true, from: [480, 420, 200], spin: 25 },
  { name: "headline", x: 0, y: 68, w: 380, h: 86, from: [-640, 60, 250], spin: 12 },
  { name: "button", x: 0, y: 166, w: 180, h: 52, accent: true, from: [700, -520, 400], spin: -30 },
  { name: "text", x: 192, y: 166, w: 188, h: 52, light: true, from: [120, 560, -400], spin: -10 },
  { name: "image", x: 392, y: 68, w: 208, h: 150, from: [640, 120, -200], spin: 16 },
  { name: "column 1", x: 0, y: 230, w: 192, h: 120, light: true, from: [-560, -480, 100], spin: -22 },
  { name: "column 2", x: 204, y: 230, w: 192, h: 120, from: [40, -620, 300], spin: 9 },
  { name: "column 3", x: 408, y: 230, w: 192, h: 120, light: true, from: [560, -380, -250], spin: -14 },
  { name: "footer", x: 0, y: 362, w: 600, h: 56, from: [-600, -260, -350], spin: 8 },
];

export const COLORS = {
  cobalt: "#3355ff",
  cobaltLight: "#5c78ff",
  cobaltDepth: "#1e34b5",
  signal: "#ffd23f",
  signalDepth: "#d9a900",
};
