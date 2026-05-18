"use client";

import { useState } from "react";
import { GraduationCap, FileCheck, Plane, Users, ArrowRight, Clock } from "lucide-react";

const C = {
  bg: "#fef9f0",
  paper: "#ffffff",
  ink: "#3a0a0a",
  muted: "#7a3a3a",
  red: "#b91c1c",
  gold: "#b8860b",
  border: "#eedcb8",
};

const PIPELINE = [
  { id: "Inquiry", count: 28 },
  { id: "Documents", count: 14 },
  { id: "Application", count: 22 },
  { id: "Offer", count: 9 },
  { id: "Visa", count: 6 },
  { id: "Departed", count: 47 },
];

const STUDENTS = [
  { name: "Aslan Karimov", uni: "Tsinghua University", track: "Computer Science · Bachelor", stage: "Visa", flag: "🇨🇳", days: 12 },
  { name: "Mehrangiz N.", uni: "Peking University", track: "International Trade · Master", stage: "Offer", flag: "🇨🇳", days: 4 },
  { name: "Dilshod R.", uni: "Fudan University", track: "Medicine · Bachelor", stage: "Application", flag: "🇨🇳", days: 18 },
  { name: "Aziza T.", uni: "Zhejiang University", track: "Business · Master", stage: "Documents", flag: "🇨🇳", days: 6 },
];

export function ChinaAgencyDemo() {
  const [tab, setTab] = useState<"pipeline" | "students">("pipeline");

  return (
    <div style={{ background: C.bg, color: C.ink, minHeight: "100vh", fontFamily: "ui-sans-serif, system-ui" }}>
      <header
        style={{
          padding: "20px 32px",
          background: C.paper,
          borderBottom: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, background: C.red, borderRadius: 12, display: "grid", placeItems: "center" }}>
            <GraduationCap style={{ width: 22, height: 22, color: "white" }} />
          </div>
          <div>
            <div style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 19 }}>东风 · Eastwind</div>
            <div style={{ fontSize: 11, color: C.muted, letterSpacing: 1 }}>STUDY-IN-CHINA AGENCY · CRM</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { id: "pipeline", label: "Pipeline" },
            { id: "students", label: "Students" },
          ].map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id as typeof tab)}
                style={{
                  background: active ? C.red : "transparent",
                  color: active ? "white" : C.muted,
                  border: "none",
                  padding: "8px 18px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </header>

      <main style={{ padding: 32, maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 28 }}>
          {[
            { Icon: Users, label: "Active applicants", v: "126" },
            { Icon: FileCheck, label: "Offers issued", v: "38" },
            { Icon: Plane, label: "Departures Q3", v: "47" },
            { Icon: GraduationCap, label: "Partner universities", v: "31" },
          ].map((s) => (
            <div key={s.label} style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 18 }}>
              <s.Icon style={{ width: 18, height: 18, color: C.red }} />
              <div style={{ fontSize: 11, color: C.muted, marginTop: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div>
              <div style={{ fontSize: 28, fontWeight: 800, marginTop: 4, fontFamily: "Georgia, serif" }}>{s.v}</div>
            </div>
          ))}
        </div>

        {tab === "pipeline" && (
          <section>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16, fontFamily: "Georgia, serif" }}>Application pipeline</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
              {PIPELINE.map((p, i) => (
                <div
                  key={p.id}
                  style={{
                    background: C.paper,
                    border: `1px solid ${C.border}`,
                    borderTop: `4px solid ${i === PIPELINE.length - 1 ? C.gold : C.red}`,
                    borderRadius: 12,
                    padding: 14,
                    minHeight: 220,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{p.id}</span>
                    <span style={{ background: C.bg, padding: "2px 8px", borderRadius: 9999, fontSize: 11, fontWeight: 700, color: C.red }}>
                      {p.count}
                    </span>
                  </div>
                  <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
                    {Array.from({ length: Math.min(3, p.count) }).map((_, j) => (
                      <div key={j} style={{ background: C.bg, borderRadius: 6, padding: "6px 8px", fontSize: 11 }}>
                        <div style={{ fontWeight: 600 }}>Student #{1000 + i * 5 + j}</div>
                        <div style={{ color: C.muted, marginTop: 2 }}>
                          <Clock style={{ width: 10, height: 10, display: "inline", marginRight: 3 }} />
                          {3 + j * 4} days
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === "students" && (
          <section style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14 }}>
            <header style={{ padding: 18, borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between" }}>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: 18, fontWeight: 700 }}>Active applicants</h2>
              <button style={{ background: C.red, color: "white", border: "none", padding: "8px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                + Add student
              </button>
            </header>
            <div>
              {STUDENTS.map((s, i) => (
                <div
                  key={s.name}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.4fr 1.4fr 0.8fr 90px",
                    padding: "16px 22px",
                    borderTop: i === 0 ? "none" : `1px solid ${C.border}`,
                    alignItems: "center",
                    fontSize: 14,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700 }}>{s.name}</div>
                    <div style={{ color: C.muted, fontSize: 12, marginTop: 2 }}>{s.track}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: 18, marginRight: 6 }}>{s.flag}</span>
                    {s.uni}
                  </div>
                  <span style={{ background: "#fff7e6", color: C.gold, padding: "3px 10px", borderRadius: 9999, fontSize: 11, fontWeight: 700, justifySelf: "start" }}>
                    {s.stage}
                  </span>
                  <span style={{ color: C.muted, fontSize: 12 }}>{s.days}d in stage</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <div style={{ marginTop: 28, padding: 24, background: C.red, borderRadius: 16, color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700 }}>September intake closing in 18 days</div>
            <div style={{ marginTop: 4, fontSize: 13, opacity: 0.9 }}>9 applications still awaiting visa documents</div>
          </div>
          <button style={{ background: "white", color: C.red, padding: "10px 18px", borderRadius: 9999, fontSize: 13, fontWeight: 700, border: "none", display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
            Send reminders <ArrowRight style={{ width: 14, height: 14 }} />
          </button>
        </div>
      </main>
    </div>
  );
}
