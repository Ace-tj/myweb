"use client";

/**
 * Shared "wow" components for demos.
 * All components accept a DemoPalette and use inline styles so each demo
 * keeps its own brand colors. No external deps beyond React.
 */

import {
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  createContext,
  useContext,
} from "react";
import type { DemoPalette } from "./index";

/* ─────────────────────── DemoCounter ─────────────────────── */

export function DemoCounter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 900,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return (
    <span>
      {prefix}
      {n.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

/* ─────────────────────── DemoChart ─────────────────────── */

export function DemoChart({
  data,
  palette,
  height = 180,
  fill = true,
  showGrid = true,
}: {
  data: number[];
  palette: DemoPalette;
  height?: number;
  fill?: boolean;
  showGrid?: boolean;
}) {
  const ref = useRef<SVGPathElement>(null);
  const pathLen = useRef(0);

  const { d, area, min, max } = useMemo(() => {
    if (!data.length) return { d: "", area: "", min: 0, max: 0 };
    const w = 600;
    const h = height;
    const pad = 12;
    const minV = Math.min(...data);
    const maxV = Math.max(...data);
    const range = maxV - minV || 1;
    const stepX = (w - pad * 2) / (data.length - 1 || 1);
    const pts = data.map((v, i) => {
      const x = pad + i * stepX;
      const y = h - pad - ((v - minV) / range) * (h - pad * 2);
      return [x, y] as const;
    });
    // Smooth Bezier
    let path = `M ${pts[0][0]},${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const [x1, y1] = pts[i - 1];
      const [x2, y2] = pts[i];
      const cx = (x1 + x2) / 2;
      path += ` C ${cx},${y1} ${cx},${y2} ${x2},${y2}`;
    }
    const areaPath = `${path} L ${pts[pts.length - 1][0]},${h - pad} L ${pts[0][0]},${h - pad} Z`;
    return { d: path, area: areaPath, min: minV, max: maxV };
  }, [data, height]);

  useEffect(() => {
    if (!ref.current) return;
    pathLen.current = ref.current.getTotalLength();
    ref.current.style.strokeDasharray = String(pathLen.current);
    ref.current.style.strokeDashoffset = String(pathLen.current);
    ref.current.getBoundingClientRect();
    ref.current.style.transition = "stroke-dashoffset 1.4s cubic-bezier(.22,1,.36,1)";
    ref.current.style.strokeDashoffset = "0";
  }, [d]);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <svg
        viewBox={`0 0 600 ${height}`}
        preserveAspectRatio="none"
        style={{ width: "100%", height, display: "block" }}
      >
        <defs>
          <linearGradient id={`chart-fill-${palette.primary.replace("#", "")}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={palette.primary} stopOpacity="0.28" />
            <stop offset="100%" stopColor={palette.primary} stopOpacity="0" />
          </linearGradient>
        </defs>
        {showGrid && (
          <g>
            {[0.25, 0.5, 0.75].map((p) => (
              <line
                key={p}
                x1={12}
                x2={588}
                y1={height * p}
                y2={height * p}
                stroke={palette.border}
                strokeDasharray="3 6"
                strokeWidth={1}
              />
            ))}
          </g>
        )}
        {fill && (
          <path
            d={area}
            fill={`url(#chart-fill-${palette.primary.replace("#", "")})`}
            style={{ animation: "demoFadeIn .8s ease-out both", animationDelay: "0.3s" }}
          />
        )}
        <path
          ref={ref}
          d={d}
          fill="none"
          stroke={palette.primary}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: 14,
          top: 8,
          fontSize: 10,
          color: palette.muted,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          letterSpacing: 0.5,
        }}
      >
        max {Math.round(max)} · min {Math.round(min)}
      </div>
      <style>{`@keyframes demoFadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
    </div>
  );
}

/* ─────────────────────── DemoHeatmap (calendar) ─────────────────────── */

export function DemoHeatmap({
  palette,
  weeks = 12,
  seed = 1,
  ariaLabel,
}: {
  palette: DemoPalette;
  weeks?: number;
  seed?: number;
  ariaLabel?: string;
}) {
  // Deterministic pseudo-random for stable SSR
  const cells = useMemo(() => {
    const out: number[] = [];
    let s = seed * 9301 + 49297;
    for (let i = 0; i < weeks * 7; i++) {
      s = (s * 9301 + 49297) % 233280;
      out.push(s / 233280);
    }
    return out;
  }, [weeks, seed]);

  return (
    <div aria-label={ariaLabel} style={{ display: "grid", gridTemplateColumns: `repeat(${weeks}, 1fr)`, gap: 4 }}>
      {Array.from({ length: weeks }).map((_, w) => (
        <div key={w} style={{ display: "grid", gridTemplateRows: "repeat(7, 1fr)", gap: 4 }}>
          {Array.from({ length: 7 }).map((__, d) => {
            const v = cells[w * 7 + d];
            const opacity = 0.12 + v * 0.88;
            return (
              <div
                key={d}
                style={{
                  aspectRatio: "1/1",
                  background: palette.primary,
                  opacity,
                  borderRadius: 3,
                  transition: "transform 200ms ease",
                }}
                title={`Day ${w * 7 + d + 1}`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────── DemoCohort ─────────────────────── */

export function DemoCohort({
  palette,
  rows = 6,
  cols = 8,
  labels,
}: {
  palette: DemoPalette;
  rows?: number;
  cols?: number;
  labels?: { row?: string[]; col?: string[] };
}) {
  // Deterministic decay
  const matrix = useMemo(() => {
    return Array.from({ length: rows }).map((_, r) =>
      Array.from({ length: cols }).map((__, c) => {
        if (c < r) return null;
        const base = 100 - (c - r) * 9 - r * 1.5;
        const jitter = (((r + 1) * 13 + (c + 1) * 7) % 5) - 2;
        return Math.max(0, Math.min(100, Math.round(base + jitter)));
      }),
    );
  }, [rows, cols]);

  return (
    <table style={{ borderCollapse: "separate", borderSpacing: 4, fontSize: 11, width: "100%" }}>
      <thead>
        <tr>
          <th style={{ width: 64 }} />
          {Array.from({ length: cols }).map((_, c) => (
            <th
              key={c}
              style={{
                fontSize: 10,
                color: palette.muted,
                textAlign: "center",
                fontWeight: 600,
                letterSpacing: 0.5,
                padding: "0 0 4px",
              }}
            >
              {labels?.col?.[c] ?? `W${c}`}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {matrix.map((row, r) => (
          <tr key={r}>
            <td
              style={{
                fontSize: 10,
                color: palette.muted,
                fontFamily: "ui-monospace, monospace",
                paddingRight: 6,
                whiteSpace: "nowrap",
                textAlign: "right",
              }}
            >
              {labels?.row?.[r] ?? `Cohort ${r + 1}`}
            </td>
            {row.map((v, c) => (
              <td key={c}>
                <div
                  style={{
                    height: 26,
                    borderRadius: 4,
                    background: v == null ? "transparent" : palette.primary,
                    opacity: v == null ? 0 : 0.18 + (v / 100) * 0.78,
                    color: v != null && v > 55 ? "white" : palette.ink,
                    fontWeight: 600,
                    fontSize: 10,
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  {v != null ? `${v}%` : ""}
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ─────────────────────── DemoLiveFeed ─────────────────────── */

export type LiveFeedItem = {
  id: string;
  icon?: ReactNode;
  title: string;
  meta: string;
  tone?: "primary" | "success" | "warn" | "info";
};

export function DemoLiveFeed({
  palette,
  initial,
  rotating,
  intervalMs = 3200,
  liveLabel = "Live",
  height = 320,
}: {
  palette: DemoPalette;
  initial: LiveFeedItem[];
  rotating: LiveFeedItem[];
  intervalMs?: number;
  liveLabel?: string;
  height?: number;
}) {
  const [items, setItems] = useState<LiveFeedItem[]>(initial);
  useEffect(() => {
    if (!rotating.length) return;
    let i = 0;
    const t = setInterval(() => {
      const next = rotating[i % rotating.length];
      i += 1;
      setItems((cur) => [
        { ...next, id: `${next.id}-${Date.now()}` },
        ...cur.slice(0, 20),
      ]);
    }, intervalMs);
    return () => clearInterval(t);
  }, [rotating, intervalMs]);

  const toneColor = (tone?: LiveFeedItem["tone"]) => {
    if (tone === "success") return "#16a34a";
    if (tone === "warn") return "#d97706";
    if (tone === "info") return "#2563eb";
    return palette.primary;
  };

  return (
    <div style={{ background: palette.paper, border: `1px solid ${palette.border}`, borderRadius: 14 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "12px 16px",
          borderBottom: `1px solid ${palette.border}`,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: 9999,
            background: "#16a34a",
            boxShadow: "0 0 0 0 rgba(22,163,74,0.6)",
            animation: "demoLivePulse 1.6s ease-out infinite",
          }}
        />
        <span style={{ fontSize: 11, fontWeight: 700, color: palette.ink, letterSpacing: 1, textTransform: "uppercase" }}>
          {liveLabel}
        </span>
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, height, overflow: "hidden" }}>
        {items.map((it, idx) => (
          <li
            key={it.id}
            style={{
              padding: "10px 16px",
              borderBottom: idx === items.length - 1 ? "none" : `1px solid ${palette.border}`,
              display: "flex",
              alignItems: "center",
              gap: 10,
              animation: idx === 0 ? "demoFeedIn 320ms cubic-bezier(.22,1,.36,1) both" : undefined,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 9999,
                background: toneColor(it.tone),
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: palette.ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {it.title}
              </div>
              <div style={{ fontSize: 11, color: palette.muted }}>{it.meta}</div>
            </div>
          </li>
        ))}
      </ul>
      <style>{`
        @keyframes demoLivePulse {
          0% { box-shadow: 0 0 0 0 rgba(22,163,74,0.55); }
          70% { box-shadow: 0 0 0 8px rgba(22,163,74,0); }
          100% { box-shadow: 0 0 0 0 rgba(22,163,74,0); }
        }
        @keyframes demoFeedIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────── DemoWizard ─────────────────────── */

export function DemoWizardSteps({
  palette,
  steps,
  current,
}: {
  palette: DemoPalette;
  steps: string[];
  current: number;
}) {
  return (
    <ol
      style={{
        listStyle: "none",
        padding: 0,
        margin: "0 0 28px",
        display: "grid",
        gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
        gap: 0,
      }}
    >
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s} style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            {i < steps.length - 1 && (
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  top: 14,
                  left: "calc(50% + 18px)",
                  right: "calc(-50% + 18px)",
                  height: 2,
                  background: done ? palette.primary : palette.border,
                  transition: "background 300ms ease",
                }}
              />
            )}
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: 9999,
                background: active || done ? palette.primary : palette.paper,
                color: active || done ? "white" : palette.muted,
                border: `2px solid ${active || done ? palette.primary : palette.border}`,
                display: "grid",
                placeItems: "center",
                fontSize: 12,
                fontWeight: 700,
                fontFamily: "ui-monospace, monospace",
                position: "relative",
                transition: "all 300ms ease",
                transform: active ? "scale(1.08)" : "scale(1)",
              }}
            >
              {done ? "✓" : i + 1}
            </span>
            <span style={{ fontSize: 11, color: active ? palette.ink : palette.muted, fontWeight: active ? 700 : 500, textAlign: "center" }}>
              {s}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/* ─────────────────────── DemoConfetti ─────────────────────── */

export function DemoConfetti({
  palette,
  show,
  count = 60,
}: {
  palette: DemoPalette;
  show: boolean;
  count?: number;
}) {
  const pieces = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const colors = [palette.primary, palette.ink, "#facc15", "#22d3ee", "#f97316"];
      return {
        left: (i * 53) % 100,
        delay: ((i * 17) % 600) / 1000,
        duration: 1.4 + ((i * 11) % 9) / 10,
        rotate: (i * 47) % 360,
        size: 6 + (i % 6),
        color: colors[i % colors.length],
      };
    });
  }, [count, palette]);

  if (!show) return null;
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {pieces.map((p, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            top: -16,
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.6,
            background: p.color,
            borderRadius: 2,
            transform: `rotate(${p.rotate}deg)`,
            animation: `demoConfettiFall ${p.duration}s cubic-bezier(.22,1,.36,1) ${p.delay}s forwards`,
          }}
        />
      ))}
      <style>{`
        @keyframes demoConfettiFall {
          0%   { transform: translate3d(0,-20px,0) rotate(0deg); opacity: 1; }
          100% { transform: translate3d(0,calc(100vh + 40px),0) rotate(720deg); opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────── DemoToast system ─────────────────────── */

export type Toast = { id: string; title: string; tone?: "success" | "info" | "warn" | "danger" };
type ToastCtx = { push: (t: Omit<Toast, "id">) => void };
const ToastContext = createContext<ToastCtx>({ push: () => {} });

export function DemoToastProvider({
  palette,
  children,
}: {
  palette: DemoPalette;
  children: ReactNode;
}) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = useCallback((t: Omit<Toast, "id">) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((cur) => [...cur, { ...t, id }]);
    setTimeout(() => setToasts((cur) => cur.filter((x) => x.id !== id)), 3200);
  }, []);

  const tone = (t?: Toast["tone"]) => {
    if (t === "success") return "#16a34a";
    if (t === "warn") return "#d97706";
    if (t === "danger") return "#dc2626";
    if (t === "info") return "#2563eb";
    return palette.primary;
  };

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div
        style={{
          position: "fixed",
          bottom: 28,
          right: 28,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          zIndex: 80,
        }}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            style={{
              minWidth: 240,
              background: palette.paper,
              border: `1px solid ${palette.border}`,
              borderLeft: `4px solid ${tone(t.tone)}`,
              borderRadius: 10,
              padding: "10px 14px",
              fontSize: 13,
              fontWeight: 600,
              color: palette.ink,
              boxShadow: "0 12px 30px -8px rgba(0,0,0,0.18)",
              animation: "demoToastIn 240ms cubic-bezier(.22,1,.36,1) both",
            }}
          >
            {t.title}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes demoToastIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useDemoToast() {
  return useContext(ToastContext);
}

/* ─────────────────────── DemoCommandPalette ─────────────────────── */

export type PaletteItem = {
  id: string;
  label: string;
  hint?: string;
  group?: string;
  onRun: () => void;
};

export function DemoCommandPalette({
  palette,
  items,
  placeholder = "Type a command or screen…",
  hint = "Cmd+K",
}: {
  palette: DemoPalette;
  items: PaletteItem[];
  placeholder?: string;
  hint?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        (i.hint?.toLowerCase().includes(q) ?? false) ||
        (i.group?.toLowerCase().includes(q) ?? false),
    );
  }, [items, query]);

  const grouped = useMemo(() => {
    const out: Record<string, PaletteItem[]> = {};
    filtered.forEach((it) => {
      const g = it.group ?? "Actions";
      if (!out[g]) out[g] = [];
      out[g].push(it);
    });
    return out;
  }, [filtered]);

  function onListKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(filtered.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter") {
      const it = filtered[active];
      if (it) {
        it.onRun();
        setOpen(false);
      }
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={placeholder}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 12px",
          background: palette.paper,
          border: `1px solid ${palette.border}`,
          borderRadius: 9999,
          fontSize: 12,
          color: palette.muted,
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          {placeholder}
        </span>
        <kbd
          style={{
            fontFamily: "ui-monospace, monospace",
            fontSize: 10,
            background: palette.bg,
            border: `1px solid ${palette.border}`,
            borderRadius: 4,
            padding: "1px 6px",
            color: palette.muted,
          }}
        >
          {hint}
        </kbd>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 90,
            background: "rgba(20, 14, 10, 0.55)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            display: "grid",
            placeItems: "start center",
            padding: "10vh 16px",
            animation: "demoOverlayIn 180ms ease-out both",
          }}
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onListKey}
            style={{
              width: "100%",
              maxWidth: 560,
              background: palette.paper,
              border: `1px solid ${palette.border}`,
              borderRadius: 14,
              overflow: "hidden",
              boxShadow: "0 30px 80px -12px rgba(0,0,0,0.45)",
              animation: "demoPaletteIn 220ms cubic-bezier(.22,1,.36,1) both",
            }}
          >
            <div style={{ position: "relative", borderBottom: `1px solid ${palette.border}` }}>
              <svg
                aria-hidden
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke={palette.muted}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ position: "absolute", left: 16, top: 16 }}
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder={placeholder}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  padding: "14px 16px 14px 42px",
                  fontSize: 14,
                  color: palette.ink,
                }}
              />
            </div>
            <div style={{ maxHeight: 380, overflowY: "auto", padding: 6 }}>
              {Object.entries(grouped).map(([group, list]) => (
                <div key={group}>
                  <div
                    style={{
                      padding: "8px 12px 4px",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      color: palette.muted,
                    }}
                  >
                    {group}
                  </div>
                  {list.map((it) => {
                    const idx = filtered.indexOf(it);
                    const isActive = idx === active;
                    return (
                      <button
                        key={it.id}
                        type="button"
                        onMouseEnter={() => setActive(idx)}
                        onClick={() => {
                          it.onRun();
                          setOpen(false);
                        }}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "10px 12px",
                          borderRadius: 8,
                          background: isActive ? palette.bg : "transparent",
                          border: "none",
                          textAlign: "left",
                          cursor: "pointer",
                          fontSize: 13,
                          color: palette.ink,
                          fontWeight: 500,
                        }}
                      >
                        <span>{it.label}</span>
                        {it.hint && (
                          <kbd
                            style={{
                              fontFamily: "ui-monospace, monospace",
                              fontSize: 10,
                              background: palette.bg,
                              border: `1px solid ${palette.border}`,
                              borderRadius: 4,
                              padding: "1px 6px",
                              color: palette.muted,
                            }}
                          >
                            {it.hint}
                          </kbd>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
              {filtered.length === 0 && (
                <div style={{ padding: "20px 12px", textAlign: "center", color: palette.muted, fontSize: 12 }}>
                  No matches
                </div>
              )}
            </div>
          </div>
          <style>{`
            @keyframes demoOverlayIn { from { opacity: 0 } to { opacity: 1 } }
            @keyframes demoPaletteIn { from { opacity: 0; transform: translateY(-8px) scale(.98) } to { opacity: 1; transform: translateY(0) scale(1) } }
          `}</style>
        </div>
      )}
    </>
  );
}
