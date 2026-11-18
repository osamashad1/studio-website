/** Mini "screenshot" drawn in a project's colours (until real screenshots exist). */
export function MiniSite({ palette }: { palette: { bg: string; ink: string; accent: string } }) {
  return (
    <div
      aria-hidden
      className="flex aspect-[16/10] flex-col gap-3 rounded-sm p-5 shadow-[0_12px_40px_-12px_rgb(16_22_47/0.35)]"
      style={{ background: palette.bg }}
    >
      <div className="flex items-center justify-between">
        <span className="h-2.5 w-16 rounded-full" style={{ background: palette.ink }} />
        <span className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1.5 w-6 rounded-full opacity-50" style={{ background: palette.ink }} />
          ))}
        </span>
      </div>
      <div className="mt-auto flex flex-col gap-2">
        <span className="h-4 w-3/4 rounded-sm" style={{ background: palette.ink }} />
        <span className="h-4 w-1/2 rounded-sm" style={{ background: palette.ink }} />
        <span className="mt-2 h-6 w-24 rounded-sm" style={{ background: palette.accent }} />
      </div>
    </div>
  );
}
