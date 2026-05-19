"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  GraduationCap,
  BookmarkBook,
  Calendar,
  Group,
  Medal,
  Page,
  User,
  Bank,
  Wallet,
  StatsUpSquare,
  Settings,
  Mail,
} from "iconoir-react";
import {
  DemoTopBar,
  DemoStatusBar,
  DemoKpiStrip,
  DemoScreenHeader,
  DemoBadge,
} from "@/components/demo-shell";
import { demoImages } from "@/lib/demo-images";
import {
  DemoCommandPalette,
  DemoCounter,
  DemoChart,
  DemoCohort,
  DemoLiveFeed,
  DemoToastProvider,
  useDemoToast,
  type PaletteItem,
} from "@/components/demo-shell/wow";

const C = {
  bg: "#fafaf7",
  paper: "#ffffff",
  ink: "#3a1f24",
  muted: "#7a5a5e",
  primary: "#7c2d12",
  accent: "#d4a056",
  border: "#e8dccd",
  card: "#fff8ef",
};

const palette = {
  bg: C.bg,
  paper: C.paper,
  ink: C.ink,
  muted: C.muted,
  primary: C.primary,
  border: C.border,
};

type TabId =
  | "dashboard"
  | "courses"
  | "gradebook"
  | "schedule"
  | "students"
  | "faculty"
  | "admissions"
  | "finance"
  | "analytics"
  | "settings";

export function UniversityDemo() {
  return (
    <DemoToastProvider palette={palette}>
      <UniversityInner />
    </DemoToastProvider>
  );
}

function UniversityInner() {
  const t = useTranslations("demoPreview.university");
  const [tab, setTab] = useState<TabId>("dashboard");
  const toast = useDemoToast();

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

  const NAV: { id: TabId; label: string; Icon: typeof Page; group: "academics" | "people" | "admin" }[] = [
    { id: "dashboard",  label: t("nav.dashboard"),  Icon: Medal,           group: "academics" },
    { id: "courses",    label: t("nav.courses"),    Icon: BookmarkBook,    group: "academics" },
    { id: "gradebook",  label: t("nav.gradebook"),  Icon: Page,            group: "academics" },
    { id: "schedule",   label: t("nav.schedule"),   Icon: Calendar,        group: "academics" },
    { id: "students",   label: t("nav.students"),   Icon: Group,           group: "people" },
    { id: "faculty",    label: t("nav.faculty"),    Icon: User,            group: "people" },
    { id: "admissions", label: t("nav.admissions"), Icon: Mail,            group: "people" },
    { id: "finance",    label: t("nav.finance"),    Icon: Wallet,          group: "admin" },
    { id: "analytics",  label: t("nav.analytics"),  Icon: StatsUpSquare,   group: "admin" },
    { id: "settings",   label: t("nav.settings"),   Icon: Settings,        group: "admin" },
  ];

  const paletteItems: PaletteItem[] = NAV.map((it) => ({
    id: it.id,
    label: it.label,
    group: t(`nav.groups.${it.group}`),
    onRun: () => {
      setTab(it.id);
      toast.push({ title: t("toast.navigated", { screen: it.label }) });
    },
  }));

  const KPIS: Partial<Record<TabId, { label: string; value: string; trend?: string }[]>> = {
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

  const screenHeader = {
    eyebrow: t(`shell.screen.${tab}.eyebrow`),
    title: t(`shell.screen.${tab}.title`),
    subtitle: t(`shell.screen.${tab}.subtitle`),
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
        breadcrumb={t(`shell.breadcrumbs.${tab}`)}
        searchPlaceholder={t("shell.searchPlaceholder")}
        userName={t("userName")}
        userInitials={t("userInitials")}
        rightSlot={<DemoCommandPalette palette={palette} items={paletteItems} placeholder={t("commandPalette.placeholder")} hint="⌘K" />}
      />

      <div style={{ flex: 1, display: "flex" }}>
        <aside
          style={{
            width: 232,
            borderRight: `1px solid ${C.border}`,
            padding: "24px 14px",
            background: C.paper,
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          {(["academics", "people", "admin"] as const).map((g) => (
            <div key={g}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  color: C.muted,
                  padding: "0 8px 8px",
                  fontFamily: "ui-sans-serif",
                }}
              >
                {t(`nav.groups.${g}`)}
              </div>
              <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {NAV.filter((n) => n.group === g).map((n) => {
                  const active = tab === n.id;
                  return (
                    <button
                      key={n.id}
                      onClick={() => setTab(n.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "9px 10px",
                        borderRadius: 8,
                        background: active ? C.primary : "transparent",
                        color: active ? "white" : C.ink,
                        border: "none",
                        fontWeight: active ? 700 : 500,
                        fontSize: 13,
                        cursor: "pointer",
                        textAlign: "left",
                        fontFamily: "ui-sans-serif",
                      }}
                    >
                      <n.Icon style={{ width: 16, height: 16 }} />
                      {n.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          ))}
        </aside>

        <main style={{ flex: 1, padding: 32, maxWidth: 1400, margin: "0 auto", width: "100%" }}>
          <DemoScreenHeader
            palette={palette}
            eyebrow={screenHeader.eyebrow}
            title={screenHeader.title}
            subtitle={screenHeader.subtitle}
          />

          {tab === "dashboard" && (
            <div
              style={{
                position: "relative",
                height: 120,
                borderRadius: 12,
                overflow: "hidden",
                marginBottom: 16,
              }}
            >
              <img
                src={demoImages.university.hero}
                alt=""
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(135deg, ${C.primary}dd, ${C.primary}88)`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  padding: 18,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  color: "white",
                  fontFamily: "ui-sans-serif",
                }}
              >
                <span style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", opacity: 0.85 }}>
                  {t("shell.screen.dashboard.eyebrow")}
                </span>
                <span style={{ fontSize: 22, fontWeight: 700 }}>
                  {t("shell.screen.dashboard.title")}
                </span>
              </div>
            </div>
          )}

          {KPIS[tab] && <DemoKpiStrip palette={palette} items={KPIS[tab]!} />}

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
                  { Icon: BookmarkBook, label: t("stats.courses"), v: 4 },
                  { Icon: Group, label: t("stats.students"), v: 202 },
                  { Icon: Calendar, label: t("stats.hoursThisWeek"), v: 12 },
                  { Icon: Medal, label: t("stats.avgRating"), v: 4.7, decimals: 1 },
                ].map((s) => (
                  <div key={s.label} style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 12, padding: 18 }}>
                    <s.Icon style={{ width: 18, height: 18, color: C.primary }} />
                    <div style={{ fontSize: 11, color: C.muted, marginTop: 8, textTransform: "uppercase", letterSpacing: 1, fontFamily: "ui-sans-serif" }}>
                      {s.label}
                    </div>
                    <div style={{ fontSize: 28, fontWeight: 700, marginTop: 4 }}>
                      <DemoCounter value={s.v} decimals={s.decimals ?? 0} />
                    </div>
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

          {tab === "students" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
              {[
                { n: t("students.list.0.name"), id: "WU-2026-0142", program: t("students.programs.cs"),    gpa: 3.92, status: "active" },
                { n: t("students.list.1.name"), id: "WU-2026-0098", program: t("students.programs.econ"),  gpa: 3.71, status: "active" },
                { n: t("students.list.2.name"), id: "WU-2026-0211", program: t("students.programs.phil"),  gpa: 3.45, status: "probation" },
                { n: t("students.list.3.name"), id: "WU-2026-0064", program: t("students.programs.bio"),   gpa: 3.88, status: "active" },
                { n: t("students.list.4.name"), id: "WU-2026-0177", program: t("students.programs.cs"),    gpa: 2.95, status: "probation" },
                { n: t("students.list.5.name"), id: "WU-2026-0203", program: t("students.programs.econ"),  gpa: 3.62, status: "active" },
                { n: t("students.list.6.name"), id: "WU-2025-1144", program: t("students.programs.bio"),   gpa: 3.79, status: "alumni" },
                { n: t("students.list.7.name"), id: "WU-2026-0238", program: t("students.programs.phil"),  gpa: 3.34, status: "active" },
              ].map((s) => (
                <div key={s.id} style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 9999, background: C.primary, color: "white", display: "grid", placeItems: "center", fontWeight: 700 }}>
                      {s.n.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{s.n}</div>
                      <div style={{ fontSize: 11, color: C.muted, fontFamily: "ui-monospace, monospace" }}>{s.id}</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, fontFamily: "ui-sans-serif" }}>
                    <span style={{ color: C.muted }}>{s.program}</span>
                    <span style={{ fontWeight: 700, color: s.gpa >= 3.5 ? "#15803d" : s.gpa >= 3.0 ? "#b45309" : "#b91c1c" }}>
                      GPA <DemoCounter value={s.gpa} decimals={2} />
                    </span>
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <DemoBadge
                      palette={palette}
                      variant={s.status === "active" ? "success" : s.status === "probation" ? "warn" : "info"}
                      label={t(`students.status.${s.status}`)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "faculty" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
              {[
                { n: t("faculty.list.0.name"), title: t("faculty.list.0.title"), dept: t("faculty.dept.cs"),   load: 12, color: "#7c2d12" },
                { n: t("faculty.list.1.name"), title: t("faculty.list.1.title"), dept: t("faculty.dept.econ"), load: 9,  color: "#a16207" },
                { n: t("faculty.list.2.name"), title: t("faculty.list.2.title"), dept: t("faculty.dept.phil"), load: 6,  color: "#65a30d" },
                { n: t("faculty.list.3.name"), title: t("faculty.list.3.title"), dept: t("faculty.dept.bio"),  load: 14, color: "#0e7490" },
                { n: t("faculty.list.4.name"), title: t("faculty.list.4.title"), dept: t("faculty.dept.cs"),   load: 8,  color: "#7e22ce" },
                { n: t("faculty.list.5.name"), title: t("faculty.list.5.title"), dept: t("faculty.dept.econ"), load: 10, color: "#be185d" },
              ].map((f) => (
                <div key={f.n} style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 9999, background: f.color, color: "white", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 18 }}>
                      {f.n.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{f.n}</div>
                      <div style={{ fontSize: 12, color: C.muted, fontFamily: "ui-sans-serif" }}>{f.title}</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 14, padding: "10px 12px", background: C.card, borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "ui-sans-serif" }}>
                    <span style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 1 }}>{f.dept}</span>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>
                      <DemoCounter value={f.load} /> {t("faculty.hoursWeek")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "admissions" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
              {([
                { stage: "applied",   count: 1240, color: "#7c2d12" },
                { stage: "reviewing", count: 612,  color: "#a16207" },
                { stage: "interview", count: 248,  color: "#0e7490" },
                { stage: "offered",   count: 184,  color: "#15803d" },
              ] as const).map((s) => (
                <div key={s.stage} style={{ background: C.paper, border: `1px solid ${C.border}`, borderTop: `3px solid ${s.color}`, borderRadius: 12, padding: 16 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: C.muted, fontFamily: "ui-sans-serif" }}>
                    {t(`admissions.stages.${s.stage}`)}
                  </div>
                  <div style={{ fontSize: 36, fontWeight: 800, marginTop: 6, color: s.color, letterSpacing: -1 }}>
                    <DemoCounter value={s.count} />
                  </div>
                  <div style={{ fontSize: 11, color: C.muted, fontFamily: "ui-sans-serif", marginTop: 2 }}>
                    {t("admissions.applicants")}
                  </div>
                  {[
                    { name: t("admissions.sample.0.name"), src: t("admissions.sample.0.src") },
                    { name: t("admissions.sample.1.name"), src: t("admissions.sample.1.src") },
                    { name: t("admissions.sample.2.name"), src: t("admissions.sample.2.src") },
                  ].map((a) => (
                    <div key={a.name} style={{ marginTop: 10, padding: "8px 10px", background: C.card, borderRadius: 8, fontFamily: "ui-sans-serif" }}>
                      <div style={{ fontWeight: 700, fontSize: 12 }}>{a.name}</div>
                      <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{a.src}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {tab === "finance" && (
            <>
              <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden", fontFamily: "ui-sans-serif" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr 110px", padding: "12px 18px", background: C.bg, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: C.muted }}>
                  <span>{t("finance.col.student")}</span>
                  <span>{t("finance.col.program")}</span>
                  <span style={{ textAlign: "right" }}>{t("finance.col.tuition")}</span>
                  <span>{t("finance.col.due")}</span>
                  <span>{t("finance.col.status")}</span>
                </div>
                {[
                  { n: t("students.list.0.name"), prog: t("students.programs.cs"),   amt: 14800, due: "Sep 15", status: "paid" },
                  { n: t("students.list.1.name"), prog: t("students.programs.econ"), amt: 14800, due: "Sep 15", status: "paid" },
                  { n: t("students.list.2.name"), prog: t("students.programs.phil"), amt: 12200, due: "Sep 30", status: "due" },
                  { n: t("students.list.3.name"), prog: t("students.programs.bio"),  amt: 16400, due: "Sep 15", status: "paid" },
                  { n: t("students.list.4.name"), prog: t("students.programs.cs"),   amt: 14800, due: "Oct 01", status: "overdue" },
                  { n: t("students.list.5.name"), prog: t("students.programs.econ"), amt: 14800, due: "Sep 30", status: "due" },
                  { n: t("students.list.7.name"), prog: t("students.programs.phil"), amt: 12200, due: "Sep 15", status: "paid" },
                ].map((r, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr 110px", padding: "13px 18px", borderTop: `1px solid ${C.border}`, alignItems: "center", fontSize: 13 }}>
                    <span style={{ fontWeight: 600 }}>{r.n}</span>
                    <span style={{ color: C.muted }}>{r.prog}</span>
                    <span style={{ textAlign: "right", fontWeight: 700 }}>${<DemoCounter value={r.amt} />}</span>
                    <span style={{ color: C.muted, fontSize: 12 }}>{r.due}</span>
                    <DemoBadge
                      palette={palette}
                      variant={r.status === "paid" ? "success" : r.status === "due" ? "warn" : "danger"}
                      label={t(`finance.status.${r.status}`)}
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === "analytics" && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 18, marginTop: 8 }}>
                <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
                    <h3 style={{ fontSize: 16, margin: 0, fontWeight: 700 }}>{t("analytics.enrollTitle")}</h3>
                    <span style={{ fontSize: 11, color: C.muted, fontFamily: "ui-sans-serif" }}>{t("analytics.last10")}</span>
                  </div>
                  <DemoChart data={[1420, 1455, 1488, 1502, 1531, 1564, 1612, 1658, 1701, 1758, 1812, 1842]} palette={palette} height={220} />
                </div>
                <DemoLiveFeed
                  palette={palette}
                  liveLabel={t("analytics.liveFeed")}
                  height={240}
                  initial={[
                    { id: "u1", title: t("analytics.events.applied"), meta: t("analytics.events.appliedMeta"), tone: "info" },
                    { id: "u2", title: t("analytics.events.graded"),  meta: t("analytics.events.gradedMeta"),  tone: "primary" },
                    { id: "u3", title: t("analytics.events.paid"),    meta: t("analytics.events.paidMeta"),    tone: "success" },
                  ]}
                  rotating={[
                    { id: "ur1", title: t("analytics.events.enrolled"),  meta: t("analytics.events.enrolledMeta"),  tone: "success" },
                    { id: "ur2", title: t("analytics.events.dropped"),   meta: t("analytics.events.droppedMeta"),   tone: "warn" },
                    { id: "ur3", title: t("analytics.events.interview"), meta: t("analytics.events.interviewMeta"), tone: "info" },
                  ]}
                />
              </div>
              <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22, marginTop: 18 }}>
                <h3 style={{ fontSize: 16, margin: "0 0 14px", fontWeight: 700 }}>{t("analytics.cohortTitle")}</h3>
                <DemoCohort palette={palette} rows={6} cols={8} />
                <p style={{ color: C.muted, fontSize: 12, marginTop: 12, fontFamily: "ui-sans-serif" }}>{t("analytics.cohortNote")}</p>
              </div>
            </>
          )}

          {tab === "settings" && (
            <>
              <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22, marginBottom: 18 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 14px", textTransform: "uppercase", letterSpacing: 1, fontFamily: "ui-sans-serif" }}>{t("settings.basics")}</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {(["universityName", "term", "registrar", "contact"] as const).map((f) => (
                    <div key={f}>
                      <label style={{ display: "block", fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700, marginBottom: 6, fontFamily: "ui-sans-serif" }}>
                        {t(`settings.fields.${f}`)}
                      </label>
                      <input
                        defaultValue={t(`settings.placeholders.${f}`)}
                        style={{ width: "100%", background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", fontSize: 13, color: C.ink, outline: "none", boxSizing: "border-box", fontFamily: "ui-sans-serif" }}
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => toast.push({ title: t("toast.settingsSaved"), tone: "success" })}
                  style={{ marginTop: 16, padding: "10px 18px", background: C.primary, color: "white", border: "none", borderRadius: 9999, fontWeight: 700, fontSize: 12, cursor: "pointer", letterSpacing: 1, textTransform: "uppercase", fontFamily: "ui-sans-serif" }}
                >
                  {t("settings.save")}
                </button>
              </div>
              <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 14px", textTransform: "uppercase", letterSpacing: 1, display: "flex", alignItems: "center", gap: 8, fontFamily: "ui-sans-serif" }}>
                  <Bank style={{ width: 16, height: 16 }} />
                  {t("settings.integrationsTitle")}
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
                  {[
                    { name: "Canvas",     emoji: "🎓", on: true,  desc: "settings.integrations.canvas" },
                    { name: "Banner",     emoji: "🏛️", on: true,  desc: "settings.integrations.banner" },
                    { name: "Stripe",     emoji: "💳", on: true,  desc: "settings.integrations.stripe" },
                    { name: "Zoom",       emoji: "📹", on: true,  desc: "settings.integrations.zoom" },
                    { name: "Slack",      emoji: "💬", on: false, desc: "settings.integrations.slack" },
                    { name: "Turnitin",   emoji: "📝", on: true,  desc: "settings.integrations.turnitin" },
                  ].map((i) => (
                    <div key={i.name} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 14 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <div style={{ fontSize: 22 }}>{i.emoji}</div>
                        <DemoBadge palette={palette} variant={i.on ? "success" : "neutral"} label={t(i.on ? "settings.connected" : "settings.disconnected")} />
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 13, fontFamily: "ui-sans-serif" }}>{i.name}</div>
                      <div style={{ color: C.muted, fontSize: 11, lineHeight: 1.5, marginTop: 4, fontFamily: "ui-sans-serif" }}>{t(i.desc)}</div>
                      <button
                        onClick={() => toast.push({ title: t(i.on ? "toast.disconnected" : "toast.connected", { name: i.name }), tone: i.on ? "warn" : "success" })}
                        style={{ marginTop: 8, padding: "5px 10px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 11, fontWeight: 700, color: C.ink, cursor: "pointer", textTransform: "uppercase", letterSpacing: 0.5, fontFamily: "ui-sans-serif" }}
                      >
                        {t(i.on ? "settings.disconnect" : "settings.connect")}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      <DemoStatusBar
        palette={palette}
        version={t("shell.status.version")}
        region={t("shell.status.region")}
        buildId={t("shell.status.build")}
      />
    </div>
  );
}
