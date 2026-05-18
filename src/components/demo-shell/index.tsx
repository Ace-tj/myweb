"use client";

import { type ReactNode } from "react";

export type DemoPalette = {
  bg: string;
  paper: string;
  ink: string;
  muted: string;
  primary: string;
  border: string;
};

/** Sparkline using inline SVG — color via props (demos use inline styles) */
export function DemoSpark({
  data,
  color,
  width = 64,
  height = 20,
}: {
  data: number[];
  color: string;
  width?: number;
  height?: number;
}) {
  if (!data.length) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1 || 1);
  const points = data.map((v, i) => {
    const x = i * stepX;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points.join(" ")}
      />
    </svg>
  );
}

/** A 4-card KPI strip */
export function DemoKpiStrip({
  palette,
  items,
}: {
  palette: DemoPalette;
  items: { label: string; value: string; trend?: string; spark?: number[] }[];
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${items.length}, 1fr)`,
        gap: 12,
        marginBottom: 24,
      }}
    >
      {items.map((k, i) => (
        <div
          key={i}
          style={{
            background: palette.paper,
            border: `1px solid ${palette.border}`,
            borderRadius: 10,
            padding: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                fontSize: 10,
                color: palette.muted,
                textTransform: "uppercase",
                letterSpacing: 1,
                fontWeight: 600,
              }}
            >
              {k.label}
            </div>
            {k.spark && <DemoSpark data={k.spark} color={palette.primary} />}
          </div>
          <div
            style={{
              marginTop: 8,
              fontSize: 26,
              fontWeight: 800,
              fontFamily: "Georgia, serif",
              color: palette.ink,
              lineHeight: 1,
            }}
          >
            {k.value}
          </div>
          {k.trend && (
            <div style={{ marginTop: 6, fontSize: 11, color: palette.muted }}>
              {k.trend}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/** Status dot — pulsing if live */
export function DemoStatusDot({
  color,
  pulse = false,
  size = 6,
}: {
  color: string;
  pulse?: boolean;
  size?: number;
}) {
  return (
    <span style={{ display: "inline-flex", position: "relative", width: size, height: size }}>
      <span
        style={{
          position: "absolute",
          inset: 0,
          background: color,
          borderRadius: "50%",
        }}
      />
      {pulse && (
        <span
          style={{
            position: "absolute",
            inset: 0,
            background: color,
            borderRadius: "50%",
            animation: "demoPulse 1.6s ease-out infinite",
          }}
        />
      )}
      <style jsx>{`
        @keyframes demoPulse {
          0% { transform: scale(1); opacity: 0.55; }
          100% { transform: scale(2.4); opacity: 0; }
        }
      `}</style>
    </span>
  );
}

/** Top bar with brand + breadcrumb + search + actions */
export function DemoTopBar({
  palette,
  brandName,
  brandMark,
  breadcrumb,
  searchPlaceholder,
  userName,
  userInitials,
  rightSlot,
}: {
  palette: DemoPalette;
  brandName: string;
  brandMark?: ReactNode;
  breadcrumb: string;
  searchPlaceholder: string;
  userName: string;
  userInitials: string;
  rightSlot?: ReactNode;
}) {
  return (
    <header
      style={{
        background: palette.paper,
        borderBottom: `1px solid ${palette.border}`,
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        height: 56,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 200 }}>
        {brandMark}
        <div>
          <div style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 14, color: palette.ink, lineHeight: 1 }}>
            {brandName}
          </div>
          <div style={{ fontSize: 10, color: palette.muted, letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }}>
            {breadcrumb}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, maxWidth: 420, position: "relative" }}>
        <input
          type="search"
          placeholder={searchPlaceholder}
          style={{
            width: "100%",
            background: palette.bg,
            border: `1px solid ${palette.border}`,
            borderRadius: 8,
            padding: "7px 10px 7px 30px",
            fontSize: 12,
            color: palette.ink,
            outline: "none",
          }}
        />
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
          style={{ position: "absolute", left: 10, top: 9, pointerEvents: "none" }}
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      </div>

      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
        {rightSlot}
        <button
          type="button"
          aria-label="Notifications"
          style={{
            position: "relative",
            background: "transparent",
            border: `1px solid ${palette.border}`,
            borderRadius: 8,
            width: 32,
            height: 32,
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
            color: palette.muted,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
          <span
            style={{
              position: "absolute",
              top: -3,
              right: -3,
              minWidth: 14,
              height: 14,
              padding: "0 4px",
              background: palette.primary,
              color: palette.paper,
              borderRadius: 9999,
              fontSize: 9,
              fontWeight: 700,
              display: "grid",
              placeItems: "center",
            }}
          >
            3
          </span>
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: palette.primary,
              color: palette.paper,
              fontSize: 11,
              fontWeight: 700,
              display: "grid",
              placeItems: "center",
            }}
          >
            {userInitials}
          </div>
          <div style={{ fontSize: 12, color: palette.ink, fontWeight: 600 }}>{userName}</div>
        </div>
      </div>
    </header>
  );
}

/** Bottom status bar — connection / build / time */
export function DemoStatusBar({
  palette,
  version,
  region,
  buildId,
}: {
  palette: DemoPalette;
  version: string;
  region: string;
  buildId: string;
}) {
  return (
    <footer
      style={{
        background: palette.paper,
        borderTop: `1px solid ${palette.border}`,
        padding: "6px 20px",
        display: "flex",
        alignItems: "center",
        gap: 18,
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        fontSize: 10,
        color: palette.muted,
        letterSpacing: 0.5,
        textTransform: "uppercase",
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <DemoStatusDot color={palette.primary} pulse />
        live
      </span>
      <span>{version}</span>
      <span>{region}</span>
      <span style={{ marginLeft: "auto" }}>{buildId}</span>
    </footer>
  );
}

/** Breadcrumb header for a screen */
export function DemoScreenHeader({
  palette,
  eyebrow,
  title,
  subtitle,
  rightSlot,
}: {
  palette: DemoPalette;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  rightSlot?: ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 16,
        marginBottom: 20,
        paddingBottom: 16,
        borderBottom: `1px solid ${palette.border}`,
      }}
    >
      <div>
        {eyebrow && (
          <div
            style={{
              fontSize: 10,
              color: palette.muted,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              fontWeight: 600,
            }}
          >
            {eyebrow}
          </div>
        )}
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontWeight: 700,
            fontSize: 26,
            color: palette.ink,
            margin: "6px 0 0 0",
            letterSpacing: -0.3,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <div style={{ marginTop: 4, fontSize: 13, color: palette.muted }}>
            {subtitle}
          </div>
        )}
      </div>
      {rightSlot}
    </div>
  );
}

/** A status pill */
export function DemoBadge({
  palette,
  variant = "neutral",
  label,
}: {
  palette: DemoPalette;
  variant?: "neutral" | "success" | "warn" | "danger" | "info";
  label: string;
}) {
  const variants = {
    neutral: { bg: palette.bg, fg: palette.muted },
    success: { bg: "#dcfce7", fg: "#166534" },
    warn: { bg: "#fef3c7", fg: "#92400e" },
    danger: { bg: "#fee2e2", fg: "#991b1b" },
    info: { bg: "#dbeafe", fg: "#1e40af" },
  };
  const v = variants[variant];
  return (
    <span
      style={{
        background: v.bg,
        color: v.fg,
        padding: "3px 9px",
        borderRadius: 999,
        fontSize: 10,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: 0.6,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}
