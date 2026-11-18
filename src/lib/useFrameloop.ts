"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Battery-friendly render loop for 3D scenes:
 * - renders continuously for `introMs` after start (the entrance animation),
 * - then only while the visitor moves the mouse, touches or scrolls (+ a short tail),
 * - never while the scene is off screen.
 */
export function useFrameloop(inView: boolean, started: boolean, introMs = 8000) {
  const [busy, setBusy] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!started) return;
    const calmDown = (ms: number) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setBusy(false), ms);
    };
    const wake = () => {
      setBusy(true);
      calmDown(1500);
    };
    calmDown(introMs);
    window.addEventListener("pointermove", wake, { passive: true });
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("touchstart", wake, { passive: true });
    return () => {
      if (timer.current) clearTimeout(timer.current);
      window.removeEventListener("pointermove", wake);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("touchstart", wake);
    };
  }, [started, introMs]);

  if (!inView) return "never" as const;
  return busy ? ("always" as const) : ("demand" as const);
}
