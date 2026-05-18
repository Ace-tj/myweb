"use client";

import { useState } from "react";
import { Utensils, Clock, ChefHat, Check, Plus } from "lucide-react";

const C = {
  bg: "#fbf6ee",
  paper: "#ffffff",
  ink: "#2a1810",
  muted: "#7a5b4a",
  accent: "#c2410c",
  green: "#3f6212",
  border: "#e8dcc5",
};

const TABLES = [
  { n: "T1", seats: 2, status: "open" },
  { n: "T2", seats: 4, status: "open" },
  { n: "T3", seats: 4, status: "seated", since: "12m" },
  { n: "T4", seats: 6, status: "ordering", since: "5m" },
  { n: "T5", seats: 2, status: "served" },
  { n: "T6", seats: 4, status: "open" },
  { n: "T7", seats: 8, status: "seated", since: "32m" },
  { n: "T8", seats: 4, status: "open" },
];

const KITCHEN = [
  { table: "T4", time: "5m", items: ["Burrata · 1", "Lamb tartare · 1", "Linguine vongole · 2"] },
  { table: "T7", time: "8m", items: ["Bone marrow · 2", "Wood-fired pizza ×2"] },
  { table: "T3", time: "11m", items: ["Half chicken · 1", "Risotto · 1", "Side spinach · 2"] },
];

const STATUS_C: Record<string, { bg: string; fg: string; label: string }> = {
  open: { bg: "#f4f1e6", fg: "#857c5e", label: "Open" },
  seated: { bg: "#d8eecf", fg: "#3f6212", label: "Seated" },
  ordering: { bg: "#fce8d4", fg: "#c2410c", label: "Ordering" },
  served: { bg: "#dfe7f3", fg: "#1d4ed8", label: "Served" },
};

export function RestaurantDemo() {
  const [view, setView] = useState<"floor" | "kitchen" | "menu">("floor");

  return (
    <div
      style={{
        background: C.bg,
        minHeight: "100vh",
        color: C.ink,
        fontFamily: "ui-sans-serif, system-ui",
        display: "grid",
        gridTemplateColumns: "260px 1fr",
      }}
    >
      <aside
        style={{
          background: C.paper,
          borderRight: `1px solid ${C.border}`,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: C.accent,
              display: "grid",
              placeItems: "center",
              color: "white",
            }}
          >
            <Utensils style={{ width: 18, height: 18 }} />
          </div>
          <div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 18, fontWeight: 700 }}>Tavola</div>
            <div style={{ fontSize: 11, color: C.muted }}>Tue · Service open</div>
          </div>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {[
            { id: "floor", label: "Floor", Icon: Utensils },
            { id: "kitchen", label: "Kitchen", Icon: ChefHat },
            { id: "menu", label: "Menu", Icon: Check },
          ].map((m) => {
            const active = view === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setView(m.id as typeof view)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "none",
                  background: active ? C.accent : "transparent",
                  color: active ? "white" : C.ink,
                  fontSize: 14,
                  fontWeight: 600,
                  textAlign: "left",
                  cursor: "pointer",
                }}
              >
                <m.Icon style={{ width: 16, height: 16 }} />
                {m.label}
              </button>
            );
          })}
        </nav>

        <div style={{ marginTop: "auto", borderTop: `1px solid ${C.border}`, paddingTop: 14, fontSize: 12, color: C.muted }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span>Covers today</span>
            <span style={{ color: C.ink, fontWeight: 700 }}>84</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Avg ticket</span>
            <span style={{ color: C.ink, fontWeight: 700 }}>$58</span>
          </div>
        </div>
      </aside>

      <main style={{ padding: 28 }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <h1 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 700 }}>
              {view === "floor" ? "Floor plan" : view === "kitchen" ? "Kitchen display" : "Today's menu"}
            </h1>
            <p style={{ color: C.muted, fontSize: 13 }}>
              {view === "floor"
                ? "Tap a table to seat or check status."
                : view === "kitchen"
                  ? "Live tickets, sorted by time on station."
                  : "Edit prices, mark 86'd items, push to printers."}
            </p>
          </div>
          <button
            style={{
              padding: "10px 18px",
              background: C.ink,
              color: "white",
              border: "none",
              borderRadius: 9999,
              fontWeight: 600,
              fontSize: 13,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              cursor: "pointer",
            }}
          >
            <Plus style={{ width: 14, height: 14 }} /> Seat walk-in
          </button>
        </header>

        {view === "floor" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px,1fr))", gap: 14 }}>
            {TABLES.map((t) => {
              const s = STATUS_C[t.status];
              return (
                <article
                  key={t.n}
                  style={{
                    background: C.paper,
                    border: `1px solid ${C.border}`,
                    borderRadius: 14,
                    padding: 16,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 700, fontSize: 18 }}>{t.n}</span>
                    <span
                      style={{
                        background: s.bg,
                        color: s.fg,
                        padding: "2px 8px",
                        borderRadius: 9999,
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                      }}
                    >
                      {s.label}
                    </span>
                  </div>
                  <div style={{ color: C.muted, fontSize: 12 }}>{t.seats} seats</div>
                  {t.since && (
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: C.muted }}>
                      <Clock style={{ width: 11, height: 11 }} /> {t.since}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}

        {view === "kitchen" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))", gap: 14 }}>
            {KITCHEN.map((k) => (
              <article
                key={k.table}
                style={{
                  background: C.paper,
                  border: `1px solid ${C.border}`,
                  borderTop: `4px solid ${C.accent}`,
                  borderRadius: 12,
                  padding: 16,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontWeight: 700, fontSize: 18 }}>{k.table}</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: C.accent, fontSize: 12, fontWeight: 600 }}>
                    <Clock style={{ width: 12, height: 12 }} /> {k.time}
                  </span>
                </div>
                {k.items.map((i, idx) => (
                  <div key={idx} style={{ fontSize: 13, padding: "6px 0", borderTop: idx === 0 ? "none" : `1px solid ${C.border}` }}>
                    {i}
                  </div>
                ))}
                <button
                  style={{
                    marginTop: 12,
                    width: "100%",
                    padding: 8,
                    background: C.green,
                    color: "white",
                    border: "none",
                    borderRadius: 8,
                    fontWeight: 600,
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  Mark fired
                </button>
              </article>
            ))}
          </div>
        )}

        {view === "menu" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            {[
              { cat: "Starters", items: ["Burrata · $16", "Bone marrow · $19", "Lamb tartare · $21"] },
              { cat: "Pasta", items: ["Linguine vongole · $26", "Cacio e pepe · $22", "Wild boar ragu · $28"] },
              { cat: "Mains", items: ["Half chicken · $32", "Côte de boeuf · $86", "Branzino · $38"] },
              { cat: "Wine by glass", items: ["Sangiovese · $14", "Chablis · $16", "Etna Rosso · $18"] },
            ].map((s) => (
              <div key={s.cat} style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 18 }}>
                <h3 style={{ fontFamily: "Georgia, serif", fontSize: 18, marginBottom: 12, color: C.accent }}>{s.cat}</h3>
                {s.items.map((i) => (
                  <div key={i} style={{ padding: "8px 0", borderTop: `1px dashed ${C.border}`, fontSize: 14 }}>
                    {i}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
