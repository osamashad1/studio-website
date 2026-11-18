import { BLOCKS, COLORS, WINDOW } from "./blocks";

/**
 * Static picture of the assembled blocks. Shown while the 3D scene loads,
 * and instead of it when WebGL is missing or the visitor prefers reduced motion.
 */
export function HeroFallback({ label, className }: { label: string; className?: string }) {
  const pad = 40;
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={`${-pad} ${-pad} ${WINDOW.w + pad * 2} ${WINDOW.h + pad * 2 + 10}`}
      className={className}
    >
      <defs>
        <linearGradient id="hf-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {BLOCKS.map((b) => {
        const face = b.accent ? COLORS.signal : b.light ? COLORS.cobaltLight : COLORS.cobalt;
        const depth = b.accent ? COLORS.signalDepth : COLORS.cobaltDepth;
        return (
          <g key={b.name}>
            <rect x={b.x} y={b.y + 9} width={b.w} height={b.h} rx={12} fill={depth} />
            <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={12} fill={face} />
            <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={12} fill="url(#hf-shine)" />
          </g>
        );
      })}
    </svg>
  );
}
