"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Backpack, CheckCircle, WarningCircle, Star, Bus, ChatText } from "@phosphor-icons/react";

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
  const t = useTranslations("demoPreview.school");
  const [tab, setTab] = useState<"home" | "homework" | "grades">("home");

  const tabs = [
    { id: "home", label: t("tabs.home") },
    { id: "homework", label: t("tabs.homework") },
    { id: "grades", label: t("tabs.grades") },
  ];

  const stats = [
    { Icon: CheckCircle, label: t("stats.attendance"), v: t("stats.attendanceValue"), c: C.green },
    { Icon: Star, label: t("stats.stars"), v: t("stats.starsValue"), c: C.yellow },
    { Icon: WarningCircle, label: t("stats.overdue"), v: t("stats.overdueValue"), c: C.green },
  ];

  const schedule = [
    { time: "08:30", c: t("schedule.math"), done: true },
    { time: "09:30", c: t("schedule.english"), done: true },
    { time: "10:30", c: t("schedule.recess"), done: true },
    { time: "11:00", c: t("schedule.science"), done: false },
    { time: "12:00", c: t("schedule.lunch"), done: false },
    { time: "13:00", c: t("schedule.art"), done: false },
  ];

  const homework = [
    { sub: t("homework.subjects.math"), title: t("homework.items.math"), due: t("homework.due.tomorrow"), done: false },
    { sub: t("homework.subjects.english"), title: t("homework.items.english"), due: t("homework.due.friday"), done: false },
    { sub: t("homework.subjects.science"), title: t("homework.items.science"), due: t("homework.due.may23"), done: true },
    { sub: t("homework.subjects.art"), title: t("homework.items.art"), due: t("homework.due.may25"), done: false },
  ];

  const grades = [
    { sub: t("grades.subjects.math"), grade: "A-", trend: "↑" },
    { sub: t("grades.subjects.english"), grade: "B+", trend: "→" },
    { sub: t("grades.subjects.science"), grade: "A", trend: "↑" },
    { sub: t("grades.subjects.art"), grade: "A+", trend: "↑" },
    { sub: t("grades.subjects.pe"), grade: "B", trend: "↓" },
    { sub: t("grades.subjects.music"), grade: "A", trend: "→" },
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.ink, fontFamily: "ui-sans-serif, system-ui" }}>
      <header style={{ background: C.primary, color: "white", padding: "16px 28px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 38, height: 38, background: C.yellow, color: C.primary, borderRadius: 12, display: "grid", placeItems: "center" }}>
              <Backpack size={20} weight="duotone" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 18 }}>{t("brand")}</div>
              <div style={{ fontSize: 11, opacity: 0.85, letterSpacing: 1 }}>{t("brandSub")}</div>
            </div>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.18)", padding: "6px 14px", borderRadius: 9999, fontSize: 13 }}>
            <Bus size={14} weight="duotone" /> {t("busStatus")}
          </div>
        </div>
      </header>

      <nav style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px", display: "flex", gap: 6, marginTop: 12 }}>
        {tabs.map((tabItem) => (
          <button
            key={tabItem.id}
            onClick={() => setTab(tabItem.id as typeof tab)}
            style={{
              background: tab === tabItem.id ? C.paper : "transparent",
              color: tab === tabItem.id ? C.ink : C.muted,
              border: "none",
              padding: "10px 16px",
              borderRadius: "12px 12px 0 0",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {tabItem.label}
          </button>
        ))}
      </nav>

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px 28px" }}>
        {tab === "home" && (
          <div style={{ background: C.paper, borderRadius: "0 12px 12px 12px", padding: 24 }}>
            <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>{t("home.greeting")}</h1>
            <p style={{ color: C.muted, marginBottom: 22 }}>
              {t("home.subGreeting")}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
              {stats.map((s) => (
                <div key={s.label} style={{ background: C.bg, borderRadius: 12, padding: 16 }}>
                  <s.Icon size={18} weight="duotone" style={{ color: s.c }} />
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>{s.v}</div>
                </div>
              ))}
            </div>

            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{t("schedule.title")}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {schedule.map((row, i) => (
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
                  <div style={{ width: 56, fontWeight: 700, color: C.primary }}>{row.time}</div>
                  <div style={{ flex: 1, fontSize: 14, textDecoration: row.done ? "line-through" : "none" }}>{row.c}</div>
                  {row.done && <CheckCircle size={16} weight="duotone" style={{ color: C.green }} />}
                </div>
              ))}
            </div>

            <div style={{ marginTop: 24, padding: 16, background: C.yellow, borderRadius: 12, display: "flex", alignItems: "center", gap: 12 }}>
              <ChatText size={22} weight="duotone" style={{ color: C.primary }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>{t("note.title")}</div>
                <div style={{ fontSize: 13, color: C.ink }}>
                  {t("note.body")}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "homework" && (
          <div style={{ background: C.paper, borderRadius: "0 12px 12px 12px", padding: 24 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>{t("homework.title")}</h1>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {homework.map((h, i) => (
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
                    <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>{t("homework.duePrefix")} {h.due}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {tab === "grades" && (
          <div style={{ background: C.paper, borderRadius: "0 12px 12px 12px", padding: 24 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>{t("grades.title")}</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
              {grades.map((g) => (
                <div key={g.sub} style={{ background: C.bg, borderRadius: 12, padding: 18, textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 1 }}>{g.sub}</div>
                  <div style={{ fontSize: 40, fontWeight: 800, color: C.primary, fontFamily: "Georgia, serif", marginTop: 4 }}>
                    {g.grade}
                  </div>
                  <div style={{ fontSize: 13, color: g.trend === "↑" ? C.green : g.trend === "↓" ? "#dc2626" : C.muted, marginTop: 4 }}>
                    {g.trend} {t("grades.vsLastTerm")}
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
