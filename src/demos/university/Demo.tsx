"use client";

import { useState } from "react";
import { School, Book, Calendar, Users, Award } from "lucide-react";

const C = {
  bg: "#fafaf7",
  paper: "#ffffff",
  ink: "#3a1f24",
  muted: "#7a5a5e",
  primary: "#7c2d12",
  accent: "#d4a056",
  border: "#e8dccd",
};

const COURSES = [
  { code: "CS401", name: "Distributed Systems", prof: "Dr. M. Hassan", room: "Lewin Hall · 204", students: 42, time: "Mon · 10:00" },
  { code: "ECON210", name: "Macroeconomic Theory", prof: "Prof. A. Volkov", room: "Babbage Block · 12", students: 78, time: "Tue · 14:00" },
  { code: "PHIL150", name: "Ethics in Practice", prof: "Dr. F. Okafor", room: "Old Library · 1", students: 26, time: "Wed · 09:00" },
  { code: "BIO302", name: "Molecular Biology", prof: "Dr. K. Sato", room: "Science Wing · L3", students: 56, time: "Thu · 11:00" },
];

export function UniversityDemo() {
  const [tab, setTab] = useState<"dashboard" | "courses" | "grades">("dashboard");

  return (
    <div style={{ background: C.bg, color: C.ink, minHeight: "100vh", fontFamily: "Georgia, serif" }}>
      <header style={{ background: C.primary, color: "white", padding: "22px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <School style={{ width: 28, height: 28 }} />
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Westmoor University</div>
              <div style={{ fontSize: 11, opacity: 0.75, letterSpacing: 2, textTransform: "uppercase", marginTop: 2 }}>
                Faculty Portal · Spring 2026
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9999, background: C.accent, color: C.primary, display: "grid", placeItems: "center", fontWeight: 800 }}>
              MH
            </div>
            Dr. Mira Hassan
          </div>
        </div>
      </header>

      <nav style={{ background: C.paper, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "flex", gap: 6 }}>
          {[
            { id: "dashboard", label: "Dashboard" },
            { id: "courses", label: "My Courses" },
            { id: "grades", label: "Gradebook" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as typeof tab)}
              style={{
                background: "transparent",
                color: tab === t.id ? C.primary : C.muted,
                border: "none",
                padding: "16px 18px",
                fontSize: 14,
                fontWeight: 600,
                borderBottom: `3px solid ${tab === t.id ? C.primary : "transparent"}`,
                cursor: "pointer",
                fontFamily: "Georgia, serif",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </nav>

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: 32 }}>
        {tab === "dashboard" && (
          <>
            <h1 style={{ fontSize: 30, fontWeight: 700, marginBottom: 6 }}>Welcome back, Dr. Hassan.</h1>
            <p style={{ color: C.muted, marginBottom: 24, fontFamily: "ui-sans-serif" }}>
              You have 4 active courses, 12 ungraded assignments, and an office-hour request.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
              {[
                { Icon: Book, label: "Courses", v: "4" },
                { Icon: Users, label: "Students", v: "202" },
                { Icon: Calendar, label: "Hours this week", v: "12" },
                { Icon: Award, label: "Avg. course rating", v: "4.7" },
              ].map((s) => (
                <div key={s.label} style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 12, padding: 18 }}>
                  <s.Icon style={{ width: 18, height: 18, color: C.primary }} />
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 8, textTransform: "uppercase", letterSpacing: 1, fontFamily: "ui-sans-serif" }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 700, marginTop: 4 }}>{s.v}</div>
                </div>
              ))}
            </div>

            <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 36, marginBottom: 14 }}>Up next</h2>
            <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 12 }}>
              {[
                { t: "Today · 10:00", e: "CS401 Lecture · Lewin Hall 204" },
                { t: "Today · 14:30", e: "Office hours · Room 312" },
                { t: "Tomorrow · 09:00", e: "Faculty meeting · East Wing" },
                { t: "Tomorrow · 11:00", e: "BIO302 Seminar · Science Wing L3" },
              ].map((row, i) => (
                <div
                  key={i}
                  style={{ padding: "14px 18px", borderTop: i === 0 ? "none" : `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", fontFamily: "ui-sans-serif", fontSize: 14 }}
                >
                  <span style={{ color: C.muted }}>{row.t}</span>
                  <span style={{ fontWeight: 600 }}>{row.e}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === "courses" && (
          <>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>My courses</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
              {COURSES.map((c) => (
                <article key={c.code} style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: 13, color: C.accent, fontWeight: 700, letterSpacing: 1 }}>{c.code}</span>
                    <span style={{ fontSize: 12, color: C.muted, fontFamily: "ui-sans-serif" }}>{c.time}</span>
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 6 }}>{c.name}</h3>
                  <div style={{ marginTop: 10, fontFamily: "ui-sans-serif", fontSize: 13, color: C.muted }}>
                    {c.prof} · {c.room}
                  </div>
                  <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "ui-sans-serif" }}>
                    <span style={{ fontSize: 12, color: C.muted }}>{c.students} enrolled</span>
                    <button style={{ background: C.primary, color: "white", border: "none", padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                      Open course
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {tab === "grades" && (
          <>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Gradebook · CS401</h1>
            <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden", fontFamily: "ui-sans-serif" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ background: C.bg }}>
                    {["Student", "HW1", "HW2", "Mid", "Final", "Average"].map((h) => (
                      <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { n: "Aslan K.", hw: [92, 88], m: 84, f: 91 },
                    { n: "Bermet J.", hw: [76, 82], m: 79, f: 85 },
                    { n: "Chen W.", hw: [98, 95], m: 92, f: 96 },
                    { n: "Diyora N.", hw: [85, 88], m: 86, f: 89 },
                    { n: "Erlan S.", hw: [72, 70], m: 68, f: 74 },
                  ].map((s, i) => {
                    const avg = Math.round((s.hw[0] + s.hw[1] + s.m + s.f) / 4);
                    return (
                      <tr key={s.n} style={{ borderTop: i === 0 ? "none" : `1px solid ${C.border}` }}>
                        <td style={{ padding: "12px 16px", fontWeight: 600 }}>{s.n}</td>
                        <td style={{ padding: "12px 16px" }}>{s.hw[0]}</td>
                        <td style={{ padding: "12px 16px" }}>{s.hw[1]}</td>
                        <td style={{ padding: "12px 16px" }}>{s.m}</td>
                        <td style={{ padding: "12px 16px" }}>{s.f}</td>
                        <td style={{ padding: "12px 16px", fontWeight: 700, color: avg >= 85 ? "#15803d" : avg >= 70 ? "#b45309" : "#b91c1c" }}>
                          {avg}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
