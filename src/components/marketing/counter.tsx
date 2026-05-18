"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated number counter — counts from 0 to `value` when scrolled into view.
 * Respects prefers-reduced-motion.
 */
export function Counter({
  value,
  durationMs = 1500,
  suffix = "",
  decimals = 0,
}: {
  value: number;
  durationMs?: number;
  suffix?: string;
  decimals?: number;
}) {
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (done) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(value);
      setDone(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          const start = performance.now();
          let raf = 0;
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / durationMs);
            const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
            setN(value * eased);
            if (p < 1) raf = requestAnimationFrame(tick);
            else setDone(true);
          };
          raf = requestAnimationFrame(tick);
          return () => cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, durationMs, done]);

  const display = decimals > 0 ? n.toFixed(decimals) : Math.round(n).toLocaleString();
  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
