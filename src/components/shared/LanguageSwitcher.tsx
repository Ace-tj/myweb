"use client";

import { useLocale } from "next-intl";
import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing, localeLabels, type Locale } from "@/i18n/routing";
import { Globe, Check, ChevronDown } from "lucide-react";

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  function select(next: Locale) {
    setOpen(false);
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div ref={ref} className="relative inline-flex items-center">
      <button
        type="button"
        disabled={isPending}
        onClick={() => setOpen((v) => !v)}
        aria-label="Language"
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 text-sm font-medium px-2.5 py-1.5 rounded-lg border transition-colors disabled:opacity-50"
        style={{
          background: "rgb(var(--bg-card))",
          borderColor: "rgb(var(--border))",
          color: "rgb(var(--text))",
        }}
      >
        <Globe size={14} style={{ color: "rgb(var(--text-muted))" }} />
        <span>{localeLabels[locale]}</span>
        <ChevronDown size={13} style={{ color: "rgb(var(--text-muted))" }} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full mt-1.5 min-w-[140px] rounded-lg border shadow-lg overflow-hidden z-50"
          style={{
            background: "rgb(var(--bg-card))",
            borderColor: "rgb(var(--border))",
          }}
        >
          {routing.locales.map((l) => {
            const active = l === locale;
            return (
              <li key={l} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => select(l as Locale)}
                  className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm transition-colors"
                  style={{
                    background: active ? "rgb(var(--accent-subtle))" : "transparent",
                    color: active ? "rgb(var(--accent))" : "rgb(var(--text))",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.background = "rgb(var(--bg-hover))";
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.background = "transparent";
                  }}
                >
                  <span className="font-medium">{localeLabels[l as Locale]}</span>
                  {active && <Check size={13} />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
