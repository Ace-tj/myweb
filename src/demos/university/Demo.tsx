"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { GraduationCap, BookmarkBook, Calendar, Group, Medal } from "iconoir-react";

const C = {
  bg: "#fafaf7",
  paper: "#ffffff",
  ink: "#3a1f24",
  muted: "#7a5a5e",
  primary: "#7c2d12",
  accent: "#d4a056",
  border: "#e8dccd",
};

export function UniversityDemo() {
  const t = useTranslations("demoPreview.university");
  const [tab, setTab] = useState<"dashboard" | "courses" | "grades">("dashboard");

  const COURSES = [
    { code: "CS401", name: t("courses.cs401.name"), prof: t("courses.cs401.prof"), room: t("courses.cs401.room"), students: 42, time: t("courses.cs401.time") },
    { code: "ECON210", name: t("courses.econ210.name"), prof: t("courses.econ210.prof"), room: t("courses.econ210.room"), students: 78, time: t("courses.econ210.time") },
    { code: "PHIL150", name: t("courses.phil150.name"), prof: t("courses.phil150.prof"), room: t("courses.phil150.room"), students: 26, time: t("courses.phil150.time") },
    { code: "BIO302", name: t("courses.bio302.name"), prof: t("courses.bio302.prof"), room: t("courses.bio302.room"), students: 56, time: t("courses.bio302.time") },
  ];

  return (
    <div style={{ background: C.bg, color: C.ink, minHeight: "100vh", fontFamily: "Georgia, serif" }}>
      <header style={{ background: C.primary, color: "white", padding: "22px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <GraduationCap style={{ width: 28, height: 28 }} />
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{t("brand")}</div>
              <div style={{ fontSize: 11, opacity: 0.75, letterSpacing: 2, textTransform: "uppercase", marginTop: 2 }}>
                {t("brandSubtitle")}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9999, background: C.accent, color: C.primary, display: "grid", placeItems: "center", fontWeight: 800 }}>
              {t("userInitials")}
            </div>
            {t("userName")}
          </div>
        </div>
      </header>

      <nav style={{ background: C.paper, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "flex", gap: 6 }}>
          {[
            { id: "dashboard", label: t("nav.dashboard") },
            { id: "courses", label: t("nav.courses") },
            { id: "grades", label: t("nav.grades") },
          ].map((it) => (
            <button
              key={it.id}
              onClick={() => setTab(it.id as typeof tab)}
              style={{
                background: "transparent",
                color: tab === it.id ? C.primary : C.muted,
                border: "none",
                padding: "16px 18px",
                fontSize: 14,
                fontWeight: 600,
                borderBottom: `3px solid ${tab === it.id ? C.primary : "transparent"}`,
                cursor: "pointer",
                fontFamily: "Georgia, serif",
              }}
            >
              {it.label}
            </button>
          ))}
        </div>
      </nav>

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: 32 }}>
        {tab === "dashboard" && (
          <>
            <h1 style={{ fontSize: 30, fontWeight: 700, marginBottom: 6 }}>{t("dashboard.welcome")}</h1>
            <p style={{ color: C.muted, marginBottom: 24, fontFamily: "ui-sans-serif" }}>
              {t("dashboard.summary")}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
              {[
                { Icon: BookmarkBook, label: t("stats.courses"), v: "4" },
                { Icon: Group, label: t("stats.students"), v: "202" },
                { Icon: Calendar, label: t("stats.hoursThisWeek"), v: "12" },
                { Icon: Medal, label: t("stats.avgRating"), v: "4.7" },
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

            <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 36, marginBottom: 14 }}>{t("dashboard.upNext")}</h2>
            <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 12 }}>
              {[
                { t: t("upNext.row1.time"), e: t("upNext.row1.event") },
                { t: t("upNext.row2.time"), e: t("upNext.row2.event") },
                { t: t("upNext.row3.time"), e: t("upNext.row3.event") },
                { t: t("upNext.row4.time"), e: t("upNext.row4.event") },
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
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>{t("coursesPage.title")}</h1>
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
                    <span style={{ fontSize: 12, color: C.muted }}>{t("coursesPage.enrolled", { count: c.students })}</span>
                    <button style={{ background: C.primary, color: "white", border: "none", padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                      {t("coursesPage.openCourse")}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {tab === "grades" && (
          <>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>{t("gradebook.title")}</h1>
            <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden", fontFamily: "ui-sans-serif" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ background: C.bg }}>
                    {[
                      t("gradebook.col.student"),
                      t("gradebook.col.hw1"),
                      t("gradebook.col.hw2"),
                      t("gradebook.col.mid"),
                      t("gradebook.col.final"),
                      t("gradebook.col.average"),
                    ].map((h) => (
                      <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { n: t("gradebook.students.s1"), hw: [92, 88], m: 84, f: 91 },
                    { n: t("gradebook.students.s2"), hw: [76, 82], m: 79, f: 85 },
                    { n: t("gradebook.students.s3"), hw: [98, 95], m: 92, f: 96 },
                    { n: t("gradebook.students.s4"), hw: [85, 88], m: 86, f: 89 },
                    { n: t("gradebook.students.s5"), hw: [72, 70], m: 68, f: 74 },
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
