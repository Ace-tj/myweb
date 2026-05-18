"use client";

import { useState } from "react";
import { Dumbbell, Flame, Calendar, Users, TrendingUp, Zap } from "lucide-react";

const C = {
  bg: "#0a0a0a",
  surface: "#141414",
  card: "#1c1c1c",
  ink: "#fafafa",
  muted: "#888",
  neon: "#a3e635",
  border: "#262626",
};

const CLASSES = [
  { time: "06:00", name: "HIIT Burner", coach: "Alex", spots: 4, max: 16, intensity: 4 },
  { time: "07:30", name: "Power Hour", coach: "Mira", spots: 12, max: 14, intensity: 5 },
  { time: "12:00", name: "Lunch Mobility", coach: "Sam", spots: 2, max: 10, intensity: 1 },
  { time: "17:30", name: "Strength Lab", coach: "Mira", spots: 8, max: 12, intensity: 4 },
  { time: "18:30", name: "Boxing Foundations", coach: "Jordan", spots: 6, max: 14, intensity: 3 },
  { time: "19:30", name: "Cool Down Yoga", coach: "Alex", spots: 10, max: 16, intensity: 1 },
];

export function GymDemo() {
  const [tab, setTab] = useState<"today" | "members" | "kpi">("today");

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.ink, fontFamily: "Inter, ui-sans-serif" }}>
      <header
        style={{
          padding: "20px 32px",
          borderBottom: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: C.neon, color: C.bg, display: "grid", placeItems: "center", borderRadius: 10 }}>
            <Dumbbell style={{ width: 20, height: 20 }} strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18, letterSpacing: -0.5 }}>IRON / PARK</div>
            <div style={{ fontSize: 11, color: C.muted, letterSpacing: 2, textTransform: "uppercase" }}>
              Coach console
            </div>
          </div>
        </div>
        <nav style={{ display: "flex", gap: 4 }}>
          {[
            { id: "today", label: "Today" },
            { id: "members", label: "Members" },
            { id: "kpi", label: "KPIs" },
          ].map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id as typeof tab)}
                style={{
                  background: active ? C.neon : "transparent",
                  color: active ? C.bg : C.ink,
                  border: "none",
                  padding: "8px 18px",
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  cursor: "pointer",
                }}
              >
                {t.label}
              </button>
            );
          })}
        </nav>
      </header>

      <main style={{ padding: 32, maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
          {[
            { Icon: Users, label: "Active members", v: "412", sub: "+12 this week" },
            { Icon: Calendar, label: "Bookings today", v: "186", sub: "32 walk-ins" },
            { Icon: Flame, label: "Check-ins live", v: "67", sub: "Peak: 84 @ 18:00" },
            { Icon: TrendingUp, label: "Revenue MTD", v: "$24,180", sub: "+8% vs last" },
          ].map((s) => (
            <div key={s.label} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 18 }}>
              <s.Icon style={{ width: 18, height: 18, color: C.neon }} strokeWidth={2.5} />
              <div style={{ fontSize: 11, color: C.muted, marginTop: 8, textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</div>
              <div style={{ fontSize: 26, fontWeight: 800, marginTop: 4 }}>{s.v}</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {tab === "today" && (
          <section>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16, letterSpacing: -0.5 }}>
              Today's classes
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {CLASSES.map((c) => {
                const full = c.spots === 0;
                const pct = ((c.max - c.spots) / c.max) * 100;
                return (
                  <article
                    key={c.time}
                    style={{
                      background: C.surface,
                      border: `1px solid ${C.border}`,
                      borderRadius: 14,
                      padding: "16px 20px",
                      display: "grid",
                      gridTemplateColumns: "80px 1.5fr 1fr 200px 100px",
                      alignItems: "center",
                      gap: 16,
                    }}
                  >
                    <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -1 }}>{c.time}</div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700 }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>Coach {c.coach}</div>
                    </div>
                    <div style={{ display: "flex", gap: 3 }}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Zap
                          key={i}
                          style={{
                            width: 14,
                            height: 14,
                            color: i < c.intensity ? C.neon : "#333",
                            fill: i < c.intensity ? C.neon : "transparent",
                          }}
                        />
                      ))}
                    </div>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.muted, marginBottom: 4 }}>
                        <span>{c.max - c.spots}/{c.max} booked</span>
                        <span>{c.spots} left</span>
                      </div>
                      <div style={{ height: 6, background: C.card, borderRadius: 999 }}>
                        <div style={{ width: `${pct}%`, height: "100%", background: C.neon, borderRadius: 999 }} />
                      </div>
                    </div>
                    <button
                      disabled={full}
                      style={{
                        padding: "10px 14px",
                        background: full ? C.card : C.neon,
                        color: full ? C.muted : C.bg,
                        border: "none",
                        borderRadius: 8,
                        fontWeight: 700,
                        fontSize: 12,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        cursor: full ? "not-allowed" : "pointer",
                      }}
                    >
                      {full ? "Full" : "Book"}
                    </button>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {tab === "members" && (
          <section>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>Recent members</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
              {[
                { n: "Tatiana K.", plan: "Pro · Annual", days: 312, status: "Active" },
                { n: "Marcus L.", plan: "Lite · Monthly", days: 28, status: "Active" },
                { n: "Anya P.", plan: "Pro · Quarterly", days: 90, status: "Pending" },
                { n: "Daler R.", plan: "Drop-in", days: 1, status: "New" },
                { n: "Maya O.", plan: "Pro · Annual", days: 184, status: "Active" },
                { n: "Sergei T.", plan: "Lite · Monthly", days: 9, status: "Expiring" },
              ].map((m) => (
                <div key={m.n} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 999,
                        background: C.neon,
                        color: C.bg,
                        display: "grid",
                        placeItems: "center",
                        fontWeight: 800,
                      }}
                    >
                      {m.n[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{m.n}</div>
                      <div style={{ fontSize: 11, color: C.muted }}>{m.plan}</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", fontSize: 11, color: C.muted }}>
                    <span>Day {m.days}</span>
                    <span style={{ color: m.status === "Expiring" ? "#f87171" : C.neon }}>{m.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === "kpi" && (
          <section>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>This month</h2>
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 24 }}>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 200 }}>
                {[34, 52, 41, 67, 73, 58, 81, 95, 78, 88, 102, 96, 110, 124].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      background: i === 13 ? C.neon : `${C.neon}50`,
                      borderRadius: "4px 4px 0 0",
                      height: `${h}%`,
                    }}
                  />
                ))}
              </div>
              <div style={{ marginTop: 12, fontSize: 12, color: C.muted, textAlign: "center" }}>
                Daily check-ins · Last 14 days
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
