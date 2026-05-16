"use client";

import { useLocale, useTranslations } from "next-intl";
import { Star } from "lucide-react";

export function AuthAside() {
  const t = useTranslations("auth.aside");
  const locale = useLocale();

  const stats = [
    { value: "10",   labelKey: "stat1Label" as const },
    { value: "3",    labelKey: "stat2Label" as const },
    { value: "200+", labelKey: "stat3Label" as const },
  ];

  return (
    <aside className="hidden md:flex relative overflow-hidden items-center justify-center px-12 py-16 bg-[rgb(var(--bg-subtle))]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-[420px] h-[420px] rounded-full bg-[rgb(var(--accent))]/15 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-[320px] h-[320px] rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-fuchsia-500/8 blur-3xl" />
      </div>

      <div className="relative max-w-md animate-fade-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))] text-[10px] font-bold uppercase tracking-widest text-[rgb(var(--text-muted))] mb-6 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden />
          {t("badge")} · {locale.toUpperCase()}
        </div>

        <h2 className="text-4xl font-extrabold tracking-tight leading-[1.1] mb-4">
          {t("tagline")} <span className="gradient-text">{t("taglineAccent")}</span>
        </h2>
        <p className="text-[rgb(var(--text-muted))] text-base leading-relaxed mb-10">
          {t("desc")}
        </p>

        <div className="grid grid-cols-3 gap-4 mb-10">
          {stats.map((s) => (
            <div key={s.labelKey}>
              <div className="text-2xl font-extrabold gradient-text">{s.value}</div>
              <div className="text-xs text-[rgb(var(--text-muted))] mt-1">{t(s.labelKey)}</div>
            </div>
          ))}
        </div>

        <div className="glass rounded-2xl p-5 border border-[rgb(var(--border))]">
          <div className="flex gap-0.5 mb-3" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-sm text-[rgb(var(--text))] leading-relaxed mb-3">
            &ldquo;{t("testimonialQuote")}&rdquo;
          </p>
          <div>
            <div className="font-semibold text-sm">{t("testimonialName")}</div>
            <div className="text-xs text-[rgb(var(--text-subtle))]">{t("testimonialRole")}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
