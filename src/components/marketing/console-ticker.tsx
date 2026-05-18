"use client";

import { useEffect, useState } from "react";

/**
 * Pseudo-terminal that rotates through lines, "typing" each one.
 */
export function ConsoleTicker({
  lines,
  label,
  uptime,
  region,
  build,
}: {
  lines: string[];
  label: string;
  uptime: string;
  region: string;
  build: string;
}) {
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState("");

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(lines[idx]);
      return;
    }
    setShown("");
    const line = lines[idx];
    let i = 0;
    const typer = setInterval(() => {
      i += 1;
      setShown(line.slice(0, i));
      if (i >= line.length) {
        clearInterval(typer);
      }
    }, 18);
    const next = setTimeout(() => {
      setIdx((p) => (p + 1) % lines.length);
    }, Math.max(2200, line.length * 20 + 1100));
    return () => {
      clearInterval(typer);
      clearTimeout(next);
    };
  }, [idx, lines]);

  return (
    <div className="rounded-sm border border-border-strong bg-surface/80 font-mono text-[11px] shadow-[0_0_40px_rgb(197_255_63_/_0.12)] backdrop-blur-sm">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-danger/70" />
          <span className="size-2 rounded-full bg-warning/70" />
          <span className="size-2 rounded-full bg-success/70" />
          <span className="ml-2 text-[10px] uppercase tracking-widest text-muted">
            {label}
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-widest text-muted">
          {build}
        </span>
      </div>
      {/* Body */}
      <div className="space-y-1 px-4 py-4 text-fg">
        {lines.slice(0, idx).map((l, i) => (
          <div key={i} className="text-muted">
            {l}
          </div>
        ))}
        <div className="flex items-center">
          <span>{shown}</span>
          <span className="ml-0.5 inline-block h-[1em] w-[2px] animate-pulse bg-primary align-middle" />
        </div>
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border px-3 py-2 text-[10px] uppercase tracking-widest text-muted">
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-primary" />
          {uptime}
        </span>
        <span>{region}</span>
      </div>
    </div>
  );
}
