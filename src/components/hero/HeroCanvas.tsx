"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { canUse3D } from "@/lib/webgl";
import { HeroFallback } from "./HeroFallback";

// The 3D code (three.js) loads only in the browser, after the page is visible.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export function HeroCanvas({ label }: { label: string }) {
  const box = useRef<HTMLDivElement>(null);
  const scroll = useRef(0);
  const [use3D, setUse3D] = useState(false);
  const [inView, setInView] = useState(true);
  const [ready, setReady] = useState(false);

  // Decide once in the browser whether to show 3D (needs WebGL, no reduced motion).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only check
    setUse3D(canUse3D());
  }, []);

  // Pause rendering when the hero is off screen; track scroll progress for the camera.
  useEffect(() => {
    const el = box.current;
    if (!el || !use3D) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting));
    io.observe(el);
    const onScroll = () => {
      scroll.current = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [use3D]);

  return (
    <div ref={box} className="relative aspect-[16/11] w-full lg:aspect-auto lg:h-full">
      {/* Soft cobalt glow behind the scene (CSS, so it costs nothing) */}
      <div
        aria-hidden
        className="absolute inset-[8%] rounded-full bg-cobalt/35 blur-[80px]"
      />
      <HeroFallback
        label={label}
        className={cn(
          "absolute inset-0 m-auto h-full w-[88%] transition-opacity duration-700",
          // With 3D the blocks build the window themselves, so the flat picture fades out at once.
          use3D ? "opacity-0" : "opacity-100",
        )}
      />
      {use3D && (
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            ready ? "opacity-100" : "opacity-0",
          )}
        >
          <HeroScene scrollRef={scroll} active={inView} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
