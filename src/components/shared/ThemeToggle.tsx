"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button className="w-9 h-9 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))] flex items-center justify-center">
        <span className="w-4 h-4" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="w-9 h-9 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))] hover:bg-[rgb(var(--bg-hover))] flex items-center justify-center transition-colors"
    >
      {resolvedTheme === "dark" ? (
        <Sun size={15} className="text-amber-400" />
      ) : (
        <Moon size={15} className="text-slate-600" />
      )}
    </button>
  );
}
