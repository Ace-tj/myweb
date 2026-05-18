"use client";

import { useState } from "react";
import { Stethoscope, Heart, Calendar, FileText, Pill, Activity, User } from "lucide-react";

const C = {
  bg: "#f0fdfa",
  paper: "#ffffff",
  ink: "#0f2c2c",
  muted: "#557575",
  primary: "#0d9488",
  primaryDark: "#0f766e",
  red: "#dc2626",
  yellow: "#ca8a04",
  border: "#cbeae5",
};

const TODAY = [
  { time: "09:00", patient: "Aslan K., 42", reason: "Follow-up · diabetes", room: "C-3", status: "Waiting" },
  { time: "09:30", patient: "Mehri T., 34", reason: "Annual physical", room: "B-1", status: "In room" },
  { time: "10:15", patient: "Daler R., 67", reason: "Cardiology consult", room: "C-4", status: "Scheduled" },
  { time: "11:00", patient: "Aziza N., 29", reason: "Prenatal week 32", room: "B-2", status: "Scheduled" },
  { time: "11:30", patient: "Karim S., 51", reason: "Back pain · MRI review", room: "C-3", status: "Scheduled" },
];

export function HospitalDemo() {
  const [view, setView] = useState<"schedule" | "patient">("schedule");

  return (
    <div style={{ background: C.bg, color: C.ink, minHeight: "100vh", fontFamily: "ui-sans-serif, system-ui", display: "grid", gridTemplateColumns: "240px 1fr" }}>
      <aside style={{ background: C.paper, padding: 22, borderRight: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <div style={{ width: 36, height: 36, background: C.primary, borderRadius: 10, display: "grid", placeItems: "center" }}>
            <Stethoscope style={{ width: 18, height: 18, color: "white" }} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Cedar Clinic</div>
            <div style={{ fontSize: 11, color: C.muted }}>Dr. Hassan · Family</div>
          </div>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {[
            { id: "schedule", label: "Schedule", Icon: Calendar },
            { id: "patient", label: "Active patient", Icon: User },
          ].map((m) => (
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
                background: view === m.id ? C.primary : "transparent",
                color: view === m.id ? "white" : C.ink,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <m.Icon style={{ width: 16, height: 16 }} />
              {m.label}
            </button>
          ))}
        </nav>

        <div style={{ marginTop: 28, padding: 14, background: C.bg, borderRadius: 10, fontSize: 12 }}>
          <div style={{ color: C.muted, marginBottom: 6, fontWeight: 600 }}>Today's load</div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Booked</span>
            <strong>14</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
            <span>Seen</span>
            <strong>4</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
            <span>No-shows</span>
            <strong>0</strong>
          </div>
        </div>
      </aside>

      <main style={{ padding: 32 }}>
        {view === "schedule" && (
          <>
            <h1 style={{ fontSize: 26, fontWeight: 700 }}>Tuesday, May 18</h1>
            <p style={{ color: C.muted, fontSize: 13, marginTop: 4 }}>14 appointments · 4 unsigned charts from yesterday</p>

            <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 8 }}>
              {TODAY.map((row, i) => (
                <article
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "80px 1.5fr 1.4fr 100px 110px 100px",
                    alignItems: "center",
                    padding: "14px 18px",
                    background: C.paper,
                    border: `1px solid ${C.border}`,
                    borderLeft: `4px solid ${row.status === "In room" ? C.red : row.status === "Waiting" ? C.yellow : C.primary}`,
                    borderRadius: 10,
                    fontSize: 14,
                    gap: 12,
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: 16 }}>{row.time}</span>
                  <div>
                    <div style={{ fontWeight: 600 }}>{row.patient}</div>
                  </div>
                  <div style={{ color: C.muted }}>{row.reason}</div>
                  <span style={{ color: C.muted }}>Room {row.room}</span>
                  <span
                    style={{
                      background: row.status === "In room" ? "#fee2e2" : row.status === "Waiting" ? "#fef3c7" : "#ccfbf1",
                      color: row.status === "In room" ? "#991b1b" : row.status === "Waiting" ? "#854d0e" : C.primaryDark,
                      padding: "3px 10px",
                      borderRadius: 9999,
                      fontSize: 11,
                      fontWeight: 700,
                      justifySelf: "start",
                    }}
                  >
                    {row.status}
                  </span>
                  <button style={{ background: C.primary, color: "white", border: "none", padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                    Open chart
                  </button>
                </article>
              ))}
            </div>
          </>
        )}

        {view === "patient" && (
          <>
            <header style={{ display: "flex", alignItems: "center", gap: 18, paddingBottom: 18, borderBottom: `1px solid ${C.border}`, marginBottom: 22 }}>
              <div style={{ width: 64, height: 64, borderRadius: 9999, background: C.primary, color: "white", display: "grid", placeItems: "center", fontSize: 22, fontWeight: 700 }}>
                MT
              </div>
              <div style={{ flex: 1 }}>
                <h1 style={{ fontSize: 22, fontWeight: 700 }}>Mehri Tursunova</h1>
                <div style={{ color: C.muted, fontSize: 13, marginTop: 2 }}>F · 34 yrs · MRN 008142 · No known allergies</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: C.muted, fontSize: 11 }}>Last visit</div>
                <div style={{ fontWeight: 700 }}>Mar 04, 2026</div>
              </div>
            </header>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
              {[
                { Icon: Heart, label: "HR", v: "72 bpm", c: C.primary },
                { Icon: Activity, label: "BP", v: "118/76", c: C.primary },
                { Icon: Pill, label: "Active meds", v: "2", c: C.yellow },
                { Icon: FileText, label: "Notes (12mo)", v: "8", c: C.muted },
              ].map((s) => (
                <div key={s.label} style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16 }}>
                  <s.Icon style={{ width: 18, height: 18, color: s.c }} />
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>{s.v}</div>
                </div>
              ))}
            </div>

            <h2 style={{ fontSize: 16, fontWeight: 700, marginTop: 28, marginBottom: 12 }}>Recent notes</h2>
            <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 12 }}>
              {[
                { date: "Mar 04", note: "Routine physical. BMI in range. Recommended iron supplement." },
                { date: "Jan 12", note: "URI symptoms x 5 days. Conservative care, no antibiotics." },
                { date: "Nov 22, 2025", note: "Annual blood work — within normal limits." },
              ].map((n, i) => (
                <div key={i} style={{ padding: "14px 18px", borderTop: i === 0 ? "none" : `1px solid ${C.border}`, fontSize: 14 }}>
                  <div style={{ fontSize: 11, color: C.muted, fontWeight: 600 }}>{n.date}</div>
                  <div style={{ marginTop: 4 }}>{n.note}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
