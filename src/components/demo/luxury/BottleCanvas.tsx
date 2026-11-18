"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { canUse3D } from "@/lib/webgl";

const BottleScene = dynamic(() => import("./BottleScene"), { ssr: false });

/** Static bottle drawing for no-WebGL / reduced motion. */
function BottleFallback({ label }: { label: string }) {
  return (
    <svg role="img" aria-label={label} viewBox="0 0 200 320" className="mx-auto h-full max-h-[70vh] w-auto">
      <defs>
        <linearGradient id="lx-glass" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.25" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.05" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <rect x="78" y="20" width="44" height="40" rx="4" fill="#C9A45C" />
      <rect x="84" y="58" width="32" height="14" fill="#C9A45C" opacity="0.8" />
      <rect x="40" y="150" width="120" height="140" rx="10" fill="#B8742A" opacity="0.85" />
      <path d="M84 72h32l38 34v176a14 14 0 0 1-14 14H60a14 14 0 0 1-14-14V106z" fill="url(#lx-glass)" stroke="#fff" strokeOpacity="0.35" />
      <rect x="72" y="200" width="56" height="30" fill="#0B0B0C" />
      <rect x="86" y="214" width="28" height="2" fill="#C9A45C" />
    </svg>
  );
}

export function BottleCanvas({ label, containerId }: { label: string; containerId: string }) {
  const box = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [use3D, setUse3D] = useState<boolean | null>(null);
  const [inView, setInView] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only check
    setUse3D(canUse3D());
  }, []);

  useEffect(() => {
    if (!use3D || !box.current) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting));
    io.observe(box.current);
    const story = document.getElementById(containerId);
    const onScroll = () => {
      if (!story) return;
      const r = story.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      progress.current = total > 0 ? Math.min(Math.max(-r.top / total, 0), 1) : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [use3D, containerId]);

  return (
    <div ref={box} className="relative h-full w-full">
      <div aria-hidden className="absolute inset-[15%] rounded-full bg-[#C9A45C]/25 blur-[90px]" />
      {use3D === false && <BottleFallback label={label} />}
      {use3D && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
          <BottleScene progress={progress} active={inView} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
