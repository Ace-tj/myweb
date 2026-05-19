"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export function ThemeToggle() {
  const t = useTranslations("common");
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t("theme")}
      aria-pressed={mounted ? dark : undefined}
      className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-surface text-fg transition hover:border-border-strong hover:bg-surface-2"
    >
      {mounted && dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
