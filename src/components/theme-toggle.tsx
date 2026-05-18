"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export function ThemeToggle() {
  const t = useTranslations("common");
  const [light, setLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.classList.contains("light"));
    setMounted(true);
  }, []);

  function toggle() {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem("theme", next ? "light" : "dark");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t("theme")}
      className="inline-flex size-9 items-center justify-center rounded-sm border border-border bg-surface text-fg transition hover:border-border-strong hover:bg-surface-2"
    >
      {mounted && light ? <Moon className="size-4" /> : <Sun className="size-4" />}
    </button>
  );
}
