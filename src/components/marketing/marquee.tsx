"use client";

import { type ReactNode } from "react";

/**
 * Infinite horizontal marquee. Children are duplicated for seamless scroll.
 * Pause on hover. Respects prefers-reduced-motion (CSS animation gated globally).
 */
export function Marquee({
  children,
  speedSec = 30,
  className = "",
}: {
  children: ReactNode;
  speedSec?: number;
  className?: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)] ${className}`}
    >
      <div
        className="flex w-max gap-12 animate-[marquee_var(--marquee-duration)_linear_infinite] group-hover:[animation-play-state:paused]"
        style={{ "--marquee-duration": `${speedSec}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center gap-12">{children}</div>
        <div className="flex shrink-0 items-center gap-12" aria-hidden>
          {children}
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
