"use client";

import { useState } from "react";
import { Backpack, Check, AlertCircle, Star, Bus, MessageSquare } from "lucide-react";

const C = {
  bg: "#eff8ff",
  paper: "#ffffff",
  ink: "#0c2a4d",
  muted: "#3d5a80",
  primary: "#0284c7",
  yellow: "#facc15",
  green: "#16a34a",
  border: "#cbe1f1",
};

export function SchoolDemo() {
  const [tab, setTab] = useState<"home" | "homework" | "grades">("home");

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.ink, fontFamily: "ui-sans-serif, system-ui" }}>
      <header style={{ background: C.primary, color: "white", padding: "16px 28px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 38, height: 38, background: C.yellow, color: C.primary, borderRadius: 12, display: "grid", placeItems: "center" }}>
              <Backpack style={{ width: 20, height: 20 }} strokeWidth={2.5} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 18 }}>Sunny Hills · Parent Portal</div>
              <div style={{ fontSize: 11, opacity: 0.85, letterSpacing: 1 }}>Grade 5 · Mrs. Petrova</div>
            </div>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.18)", padding: "6px 14px", borderRadius: 9999, fontSize: 13 }}>
            <Bus style={{ width: 14, height: 14 }} /> Bus 7 · 5 min away
          </div>
        </div>
      </header>

      <nav style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px", display: "flex", gap: 6, marginTop: 12 }}>
        {[
          { id: "home", label: "Home" },
          { id: "homework", label: "Homework" },
          { id: "grades", label: "Grades" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as typeof tab)}
            style={{
              background: tab === t.id ? C.paper : "transparent",
              color: tab === t.id ? C.ink : C.muted,
              border: "none",
              padding: "10px 16px",
              borderRadius: "12px 12px 0 0",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px 28px" }}>
        {tab === "home" && (
          <div style={{ background: C.paper, borderRadius: "0 12px 12px 12px", padding: 24 }}>
            <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Good morning, Karim 👋</h1>
            <p style={{ color: C.muted, marginBottom: 22 }}>
              Mom checked you in 3 minutes ago. Math homework is due tomorrow.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
              {[
                { Icon: Check, label: "Today's attendance", v: "Present", c: C.green },
                { Icon: Star, label: "Stars this week", v: "12 ⭐", c: C.yellow },
                { Icon: AlertCircle, label: "Overdue", v: "0", c: C.green },
              ].map((s) => (
                <div key={s.label} style={{ background: C.bg, borderRadius: 12, padding: 16 }}>
                  <s.Icon style={{ width: 18, height: 18, color: s.c }} />
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>{s.v}</div>
                </div>
              ))}
            </div>

            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Today's schedule</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { t: "08:30", c: "Math · Multiplication tables", done: true },
                { t: "09:30", c: "English · Reading aloud", done: true },
                { t: "10:30", c: "Recess", done: true },
                { t: "11:00", c: "Science · Plants & soil", done: false },
                { t: "12:00", c: "Lunch", done: false },
                { t: "13:00", c: "Art · Spring posters", done: false },
              ].map((row, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: 12,
                    background: C.bg,
                    borderRadius: 10,
                    opacity: row.done ? 0.5 : 1,
                  }}
                >
                  <div style={{ width: 56, fontWeight: 700, color: C.primary }}>{row.t}</div>
                  <div style={{ flex: 1, fontSize: 14, textDecoration: row.done ? "line-through" : "none" }}>{row.c}</div>
                  {row.done && <Check style={{ width: 16, height: 16, color: C.green }} />}
                </div>
              ))}
            </div>

            <div style={{ marginTop: 24, padding: 16, background: C.yellow, borderRadius: 12, display: "flex", alignItems: "center", gap: 12 }}>
              <MessageSquare style={{ width: 22, height: 22, color: C.primary }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>Note from Mrs. Petrova</div>
                <div style={{ fontSize: 13, color: C.ink }}>
                  Reminder: bring a labelled water bottle for tomorrow's field trip to the planetarium.
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "homework" && (
          <div style={{ background: C.paper, borderRadius: "0 12px 12px 12px", padding: 24 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>Homework</h1>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { sub: "Math", title: "Tables of 6 and 7 — pages 24-25", due: "Tomorrow", done: false },
                { sub: "English", title: "Read 'The Lost Kite' chapter 3", due: "Friday", done: false },
                { sub: "Science", title: "Plant cuttings observation log", due: "Mon May 23", done: true },
                { sub: "Art", title: "Bring magazines for collage", due: "Wed May 25", done: false },
              ].map((h, i) => (
                <article
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    background: C.bg,
                    padding: 16,
                    borderRadius: 12,
                  }}
                >
                  <input type="checkbox" defaultChecked={h.done} style={{ width: 18, height: 18, accentColor: C.primary }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ background: C.primary, color: "white", padding: "2px 8px", borderRadius: 9999, fontSize: 10, fontWeight: 700 }}>
                        {h.sub.toUpperCase()}
                      </span>
                      <span style={{ fontWeight: 600, textDecoration: h.done ? "line-through" : "none" }}>{h.title}</span>
                    </div>
                    <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>Due {h.due}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {tab === "grades" && (
          <div style={{ background: C.paper, borderRadius: "0 12px 12px 12px", padding: 24 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>This term so far</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
              {[
                { sub: "Math", grade: "A-", trend: "↑" },
                { sub: "English", grade: "B+", trend: "→" },
                { sub: "Science", grade: "A", trend: "↑" },
                { sub: "Art", grade: "A+", trend: "↑" },
                { sub: "P.E.", grade: "B", trend: "↓" },
                { sub: "Music", grade: "A", trend: "→" },
              ].map((g) => (
                <div key={g.sub} style={{ background: C.bg, borderRadius: 12, padding: 18, textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 1 }}>{g.sub}</div>
                  <div style={{ fontSize: 40, fontWeight: 800, color: C.primary, fontFamily: "Georgia, serif", marginTop: 4 }}>
                    {g.grade}
                  </div>
                  <div style={{ fontSize: 13, color: g.trend === "↑" ? C.green : g.trend === "↓" ? "#dc2626" : C.muted, marginTop: 4 }}>
                    {g.trend} vs last term
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
