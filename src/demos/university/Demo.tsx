"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { GraduationCap, BookmarkBook, Calendar, Group, Medal, Page } from "iconoir-react";
import {
  DemoTopBar,
  DemoStatusBar,
  DemoKpiStrip,
  DemoScreenHeader,
  DemoBadge,
} from "@/components/demo-shell";

const C = {
  bg: "#fafaf7",
  paper: "#ffffff",
  ink: "#3a1f24",
  muted: "#7a5a5e",
  primary: "#7c2d12",
  accent: "#d4a056",
  border: "#e8dccd",
};

const palette = {
  bg: C.bg,
  paper: C.paper,
  ink: C.ink,
  muted: C.muted,
  primary: C.primary,
  border: C.border,
};

type TabId = "dashboard" | "courses" | "gradebook" | "schedule";

export function UniversityDemo() {
  const t = useTranslations("demoPreview.university");
  const [tab, setTab] = useState<TabId>("dashboard");

  const COURSES = [
    { code: "CS401", name: t("courses.cs401.name"), prof: t("courses.cs401.prof"), room: t("courses.cs401.room"), students: 42, time: t("courses.cs401.time"), status: "active" as const },
    { code: "ECON210", name: t("courses.econ210.name"), prof: t("courses.econ210.prof"), room: t("courses.econ210.room"), students: 78, time: t("courses.econ210.time"), status: "active" as const },
    { code: "PHIL150", name: t("courses.phil150.name"), prof: t("courses.phil150.prof"), room: t("courses.phil150.room"), students: 26, time: t("courses.phil150.time"), status: "waitlist" as const },
    { code: "BIO302", name: t("courses.bio302.name"), prof: t("courses.bio302.prof"), room: t("courses.bio302.room"), students: 56, time: t("courses.bio302.time"), status: "active" as const },
  ];

  const ASSIGNMENTS = [
    t("gradebook.col.hw1"),
    t("gradebook.col.hw2"),
    t("gradebook.col.project"),
    t("gradebook.col.mid"),
    t("gradebook.col.final"),
  ];

  const GRADEBOOK_ROWS: { n: string; grades: number[] }[] = [
    { n: t("gradebook.students.s1"), grades: [92, 88, 90, 84, 91] },
    { n: t("gradebook.students.s2"), grades: [76, 82, 78, 79, 85] },
    { n: t("gradebook.students.s3"), grades: [98, 95, 97, 92, 96] },
    { n: t("gradebook.students.s4"), grades: [85, 88, 82, 86, 89] },
    { n: t("gradebook.students.s5"), grades: [72, 70, 74, 68, 74] },
    { n: t("gradebook.students.s6"), grades: [88, 91, 87, 90, 93] },
    { n: t("gradebook.students.s7"), grades: [65, 70, 72, 64, 69] },
    { n: t("gradebook.students.s8"), grades: [94, 90, 92, 89, 95] },
    { n: t("gradebook.students.s9"), grades: [80, 78, 83, 76, 81] },
  ];

  const DAYS = [
    t("schedule.days.mon"),
    t("schedule.days.tue"),
    t("schedule.days.wed"),
    t("schedule.days.thu"),
    t("schedule.days.fri"),
  ];
  const HOURS = ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30"];

  // 10 classes plotted across the week
  const CLASSES: { day: number; hour: number; code: string; name: string; room: string }[] = [
    { day: 0, hour: 0, code: "CS401",   name: t("courses.cs401.name"),   room: t("courses.cs401.room") },
    { day: 0, hour: 2, code: "ECON210", name: t("courses.econ210.name"), room: t("courses.econ210.room") },
    { day: 1, hour: 1, code: "PHIL150", name: t("courses.phil150.name"), room: t("courses.phil150.room") },
    { day: 1, hour: 3, code: "BIO302",  name: t("courses.bio302.name"),  room: t("courses.bio302.room") },
    { day: 2, hour: 0, code: "CS401",   name: t("courses.cs401.name"),   room: t("courses.cs401.room") },
    { day: 2, hour: 4, code: "ECON210", name: t("courses.econ210.name"), room: t("courses.econ210.room") },
    { day: 3, hour: 1, code: "BIO302",  name: t("courses.bio302.name"),  room: t("courses.bio302.room") },
    { day: 3, hour: 5, code: "PHIL150", name: t("courses.phil150.name"), room: t("courses.phil150.room") },
    { day: 4, hour: 0, code: "CS401",   name: t("courses.cs401.name"),   room: t("courses.cs401.room") },
    { day: 4, hour: 3, code: "ECON210", name: t("courses.econ210.name"), room: t("courses.econ210.room") },
  ];

  const NAV: { id: TabId; label: string; Icon: typeof Page }[] = [
    { id: "dashboard", label: t("nav.dashboard"), Icon: Medal },
    { id: "courses",   label: t("nav.courses"),   Icon: BookmarkBook },
    { id: "gradebook", label: t("nav.gradebook"), Icon: Page },
    { id: "schedule",  label: t("nav.schedule"),  Icon: Calendar },
  ];

  const KPIS: Record<TabId, { label: string; value: string; trend?: string }[]> = {
    dashboard: [
      { label: t("shell.kpi.dashboard.enrolled.label"), value: t("shell.kpi.dashboard.enrolled.value"), trend: t("shell.kpi.dashboard.enrolled.trend") },
      { label: t("shell.kpi.dashboard.gradRate.label"), value: t("shell.kpi.dashboard.gradRate.value"), trend: t("shell.kpi.dashboard.gradRate.trend") },
      { label: t("shell.kpi.dashboard.faculty.label"), value: t("shell.kpi.dashboard.faculty.value"), trend: t("shell.kpi.dashboard.faculty.trend") },
      { label: t("shell.kpi.dashboard.courses.label"), value: t("shell.kpi.dashboard.courses.value"), trend: t("shell.kpi.dashboard.courses.trend") },
    ],
    courses: [
      { label: t("shell.kpi.courses.offered.label"), value: t("shell.kpi.courses.offered.value"), trend: t("shell.kpi.courses.offered.trend") },
      { label: t("shell.kpi.courses.avgEnroll.label"), value: t("shell.kpi.courses.avgEnroll.value"), trend: t("shell.kpi.courses.avgEnroll.trend") },
      { label: t("shell.kpi.courses.topCourse.label"), value: t("shell.kpi.courses.topCourse.value"), trend: t("shell.kpi.courses.topCourse.trend") },
      { label: t("shell.kpi.courses.sections.label"), value: t("shell.kpi.courses.sections.value"), trend: t("shell.kpi.courses.sections.trend") },
    ],
    gradebook: [
      { label: t("shell.kpi.gradebook.graded.label"), value: t("shell.kpi.gradebook.graded.value"), trend: t("shell.kpi.gradebook.graded.trend") },
      { label: t("shell.kpi.gradebook.avgGrade.label"), value: t("shell.kpi.gradebook.avgGrade.value"), trend: t("shell.kpi.gradebook.avgGrade.trend") },
      { label: t("shell.kpi.gradebook.late.label"), value: t("shell.kpi.gradebook.late.value"), trend: t("shell.kpi.gradebook.late.trend") },
      { label: t("shell.kpi.gradebook.pending.label"), value: t("shell.kpi.gradebook.pending.value"), trend: t("shell.kpi.gradebook.pending.trend") },
    ],
    schedule: [
      { label: t("shell.kpi.schedule.classes.label"), value: t("shell.kpi.schedule.classes.value"), trend: t("shell.kpi.schedule.classes.trend") },
      { label: t("shell.kpi.schedule.rooms.label"), value: t("shell.kpi.schedule.rooms.value"), trend: t("shell.kpi.schedule.rooms.trend") },
      { label: t("shell.kpi.schedule.conflicts.label"), value: t("shell.kpi.schedule.conflicts.value"), trend: t("shell.kpi.schedule.conflicts.trend") },
      { label: t("shell.kpi.schedule.peakHour.label"), value: t("shell.kpi.schedule.peakHour.value"), trend: t("shell.kpi.schedule.peakHour.trend") },
    ],
  };

  const SCREEN: Record<TabId, { eyebrow: string; title: string; subtitle: string }> = {
    dashboard: {
      eyebrow: t("shell.screen.dashboard.eyebrow"),
      title: t("shell.screen.dashboard.title"),
      subtitle: t("shell.screen.dashboard.subtitle"),
    },
    courses: {
      eyebrow: t("shell.screen.courses.eyebrow"),
      title: t("shell.screen.courses.title"),
      subtitle: t("shell.screen.courses.subtitle"),
    },
    gradebook: {
      eyebrow: t("shell.screen.gradebook.eyebrow"),
      title: t("shell.screen.gradebook.title"),
      subtitle: t("shell.screen.gradebook.subtitle"),
    },
    schedule: {
      eyebrow: t("shell.screen.schedule.eyebrow"),
      title: t("shell.screen.schedule.title"),
      subtitle: t("shell.screen.schedule.subtitle"),
    },
  };

  const brandMark = (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        background: C.primary,
        color: "white",
        display: "grid",
        placeItems: "center",
      }}
    >
      <GraduationCap style={{ width: 18, height: 18 }} />
    </div>
  );

  return (
    <div style={{ background: C.bg, color: C.ink, minHeight: "100vh", fontFamily: "Georgia, serif", display: "flex", flexDirection: "column" }}>
      <DemoTopBar
        palette={palette}
        brandName={t("brand")}
        brandMark={brandMark}
        breadcrumb={t("shell.breadcrumb")}
        searchPlaceholder={t("shell.searchPlaceholder")}
        userName={t("userName")}
        userInitials={t("userInitials")}
      />

      <nav style={{ background: C.paper, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "flex", gap: 6 }}>
          {NAV.map((it) => (
            <button
              key={it.id}
              onClick={() => setTab(it.id)}
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
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <it.Icon style={{ width: 16, height: 16 }} />
              {it.label}
            </button>
          ))}
        </div>
      </nav>

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: 32, width: "100%", flex: 1 }}>
        <DemoScreenHeader
          palette={palette}
          eyebrow={SCREEN[tab].eyebrow}
          title={SCREEN[tab].title}
          subtitle={SCREEN[tab].subtitle}
        />

        <DemoKpiStrip palette={palette} items={KPIS[tab]} />

        {tab === "dashboard" && (
          <>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 12, marginBottom: 14 }}>{t("dashboard.upNext")}</h2>
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

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginTop: 24 }}>
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
          </>
        )}

        {tab === "courses" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
            {COURSES.map((c) => (
              <article key={c.code} style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13, color: C.accent, fontWeight: 700, letterSpacing: 1 }}>{c.code}</span>
                  <DemoBadge
                    palette={palette}
                    variant={c.status === "active" ? "success" : "warn"}
                    label={c.status === "active" ? t("shell.status.active") : t("shell.status.waitlist")}
                  />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 6 }}>{c.name}</h3>
                <div style={{ marginTop: 10, fontFamily: "ui-sans-serif", fontSize: 13, color: C.muted }}>
                  {c.prof} · {c.room}
                </div>
                <div style={{ marginTop: 4, fontFamily: "ui-sans-serif", fontSize: 12, color: C.muted }}>
                  {c.time}
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
        )}

        {tab === "gradebook" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span style={{ fontSize: 13, color: C.muted, fontFamily: "ui-sans-serif" }}>
                {t("gradebook.courseLabel")}: <strong style={{ color: C.primary }}>CS401 — {t("courses.cs401.name")}</strong>
              </span>
              <DemoBadge palette={palette} variant="info" label={t("shell.status.inProgress")} />
            </div>

            <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden", fontFamily: "ui-sans-serif" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ background: C.bg }}>
                    <th style={{ textAlign: "left", padding: "12px 16px", fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>
                      {t("gradebook.col.student")}
                    </th>
                    {ASSIGNMENTS.map((h) => (
                      <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>
                        {h}
                      </th>
                    ))}
                    <th style={{ textAlign: "left", padding: "12px 16px", fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>
                      {t("gradebook.col.average")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {GRADEBOOK_ROWS.map((s, i) => {
                    const sum = s.grades.reduce((a, b) => a + b, 0);
                    const avg = Math.round(sum / s.grades.length);
                    const color = avg >= 85 ? "#15803d" : avg >= 70 ? "#b45309" : "#b91c1c";
                    return (
                      <tr key={s.n} style={{ borderTop: i === 0 ? "none" : `1px solid ${C.border}` }}>
                        <td style={{ padding: "12px 16px", fontWeight: 600 }}>{s.n}</td>
                        {s.grades.map((g, gi) => (
                          <td key={gi} style={{ padding: "12px 16px" }}>{g}</td>
                        ))}
                        <td style={{ padding: "12px 16px", fontWeight: 700, color }}>{avg}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === "schedule" && (
          <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden", fontFamily: "ui-sans-serif" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `90px repeat(${DAYS.length}, 1fr)`,
                background: C.bg,
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              <div style={{ padding: "12px 14px", fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>
                {t("schedule.col.time")}
              </div>
              {DAYS.map((d) => (
                <div key={d} style={{ padding: "12px 14px", fontSize: 12, color: C.primary, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>
                  {d}
                </div>
              ))}
            </div>

            {HOURS.map((hr, hi) => (
              <div
                key={hr}
                style={{
                  display: "grid",
                  gridTemplateColumns: `90px repeat(${DAYS.length}, 1fr)`,
                  borderTop: hi === 0 ? "none" : `1px solid ${C.border}`,
                  minHeight: 84,
                }}
              >
                <div style={{ padding: "12px 14px", fontSize: 12, color: C.muted, borderRight: `1px solid ${C.border}` }}>
                  {hr}
                </div>
                {DAYS.map((_d, di) => {
                  const cls = CLASSES.find((c) => c.day === di && c.hour === hi);
                  return (
                    <div
                      key={di}
                      style={{
                        padding: 8,
                        borderRight: di === DAYS.length - 1 ? "none" : `1px solid ${C.border}`,
                      }}
                    >
                      {cls && (
                        <div
                          style={{
                            background: "#fff7ed",
                            border: `1px solid ${C.accent}`,
                            borderLeft: `3px solid ${C.primary}`,
                            borderRadius: 8,
                            padding: "8px 10px",
                            height: "100%",
                            fontFamily: "ui-sans-serif",
                          }}
                        >
                          <div style={{ fontSize: 11, fontWeight: 700, color: C.accent, letterSpacing: 0.5 }}>{cls.code}</div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: C.ink, marginTop: 2, lineHeight: 1.2 }}>
                            {cls.name}
                          </div>
                          <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>
                            {hr} · {cls.room}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </main>

      <DemoStatusBar
        palette={palette}
        version={t("shell.status.version")}
        region={t("shell.status.region")}
        buildId={t("shell.status.build")}
      />
    </div>
  );
}
