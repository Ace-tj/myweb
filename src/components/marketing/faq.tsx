"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="border-t border-border">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={i} className="border-b border-border">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-start justify-between gap-6 py-6 text-left transition hover:bg-surface/50"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[11px] text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-lg font-semibold text-fg sm:text-xl">
                  {item.q}
                </span>
              </div>
              <span
                className={`mt-1 grid size-7 shrink-0 place-items-center rounded-sm border border-border-strong text-fg transition ${
                  isOpen ? "rotate-45 bg-primary text-primary-fg" : ""
                }`}
              >
                <Plus className="size-4" />
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="ml-12 max-w-2xl pb-7 pr-4 text-pretty leading-relaxed text-muted">
                  {item.a}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
