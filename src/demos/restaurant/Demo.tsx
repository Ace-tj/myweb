"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ForkKnife, Clock, ChefHat, Check, Plus } from "@phosphor-icons/react";

const C = {
  bg: "#fbf6ee",
  paper: "#ffffff",
  ink: "#2a1810",
  muted: "#7a5b4a",
  accent: "#c2410c",
  green: "#3f6212",
  border: "#e8dcc5",
};

export function RestaurantDemo() {
  const t = useTranslations("demoPreview.restaurant");
  const [view, setView] = useState<"floor" | "kitchen" | "menu">("floor");

  const TABLES = [
    { n: t("tables.t1.n"), seats: 2, status: "open" },
    { n: t("tables.t2.n"), seats: 4, status: "open" },
    { n: t("tables.t3.n"), seats: 4, status: "seated", since: t("tables.t3.since") },
    { n: t("tables.t4.n"), seats: 6, status: "ordering", since: t("tables.t4.since") },
    { n: t("tables.t5.n"), seats: 2, status: "served" },
    { n: t("tables.t6.n"), seats: 4, status: "open" },
    { n: t("tables.t7.n"), seats: 8, status: "seated", since: t("tables.t7.since") },
    { n: t("tables.t8.n"), seats: 4, status: "open" },
  ];

  const KITCHEN = [
    { table: t("kitchen.k1.table"), time: t("kitchen.k1.time"), items: [t("kitchen.k1.item1"), t("kitchen.k1.item2"), t("kitchen.k1.item3")] },
    { table: t("kitchen.k2.table"), time: t("kitchen.k2.time"), items: [t("kitchen.k2.item1"), t("kitchen.k2.item2")] },
    { table: t("kitchen.k3.table"), time: t("kitchen.k3.time"), items: [t("kitchen.k3.item1"), t("kitchen.k3.item2"), t("kitchen.k3.item3")] },
  ];

  const STATUS_C: Record<string, { bg: string; fg: string; label: string }> = {
    open: { bg: "#f4f1e6", fg: "#857c5e", label: t("status.open") },
    seated: { bg: "#d8eecf", fg: "#3f6212", label: t("status.seated") },
    ordering: { bg: "#fce8d4", fg: "#c2410c", label: t("status.ordering") },
    served: { bg: "#dfe7f3", fg: "#1d4ed8", label: t("status.served") },
  };

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
            <ForkKnife size={18} weight="regular" />
          </div>
          <div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 18, fontWeight: 700 }}>{t("brand")}</div>
            <div style={{ fontSize: 11, color: C.muted }}>{t("serviceStatus")}</div>
          </div>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {[
            { id: "floor", label: t("nav.floor"), Icon: ForkKnife },
            { id: "kitchen", label: t("nav.kitchen"), Icon: ChefHat },
            { id: "menu", label: t("nav.menu"), Icon: Check },
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
                <m.Icon size={16} weight="regular" />
                {m.label}
              </button>
            );
          })}
        </nav>

        <div style={{ marginTop: "auto", borderTop: `1px solid ${C.border}`, paddingTop: 14, fontSize: 12, color: C.muted }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span>{t("stats.coversToday")}</span>
            <span style={{ color: C.ink, fontWeight: 700 }}>{t("stats.coversValue")}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{t("stats.avgTicket")}</span>
            <span style={{ color: C.ink, fontWeight: 700 }}>{t("stats.avgTicketValue")}</span>
          </div>
        </div>
      </aside>

      <main style={{ padding: 28 }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <h1 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 700 }}>
              {view === "floor" ? t("header.floorTitle") : view === "kitchen" ? t("header.kitchenTitle") : t("header.menuTitle")}
            </h1>
            <p style={{ color: C.muted, fontSize: 13 }}>
              {view === "floor"
                ? t("header.floorSubtitle")
                : view === "kitchen"
                  ? t("header.kitchenSubtitle")
                  : t("header.menuSubtitle")}
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
            <Plus size={14} weight="regular" /> {t("seatWalkIn")}
          </button>
        </header>

        {view === "floor" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px,1fr))", gap: 14 }}>
            {TABLES.map((tbl) => {
              const s = STATUS_C[tbl.status];
              return (
                <article
                  key={tbl.n}
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
                    <span style={{ fontWeight: 700, fontSize: 18 }}>{tbl.n}</span>
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
                  <div style={{ color: C.muted, fontSize: 12 }}>{tbl.seats} {t("seatsLabel")}</div>
                  {tbl.since && (
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: C.muted }}>
                      <Clock size={11} weight="regular" /> {tbl.since}
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
                    <Clock size={12} weight="regular" /> {k.time}
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
                  {t("markFired")}
                </button>
              </article>
            ))}
          </div>
        )}

        {view === "menu" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            {[
              { cat: t("menu.starters.cat"), items: [t("menu.starters.item1"), t("menu.starters.item2"), t("menu.starters.item3")] },
              { cat: t("menu.pasta.cat"), items: [t("menu.pasta.item1"), t("menu.pasta.item2"), t("menu.pasta.item3")] },
              { cat: t("menu.mains.cat"), items: [t("menu.mains.item1"), t("menu.mains.item2"), t("menu.mains.item3")] },
              { cat: t("menu.wine.cat"), items: [t("menu.wine.item1"), t("menu.wine.item2"), t("menu.wine.item3")] },
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
