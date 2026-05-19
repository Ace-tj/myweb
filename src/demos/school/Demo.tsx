"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Backpack,
  Star,
  Bus,
  ChatText,
  CalendarBlank,
  BookOpen,
  MapPin,
  Clock,
  Users,
  Path,
  House,
  ChalkboardTeacher,
  GraduationCap,
  UsersThree,
  ChartBar,
  GearSix,
  Trophy,
  PencilLine,
  Plug,
} from "@phosphor-icons/react";
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
  DemoHeatmap,
  DemoLiveFeed,
  DemoToastProvider,
  useDemoToast,
  type PaletteItem,
} from "@/components/demo-shell/wow";

const C = {
  bg: "#eff8ff",
  paper: "#ffffff",
  card: "#f3faff",
  ink: "#0c2a4d",
  muted: "#3d5a80",
  primary: "#0284c7",
  yellow: "#facc15",
  green: "#16a34a",
  red: "#dc2626",
  border: "#cbe1f1",
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
  | "attendance"
  | "schedule"
  | "homework"
  | "grades"
  | "students"
  | "teachers"
  | "parents"
  | "analytics"
  | "settings";

type NavGroup = "academics" | "people" | "admin";

export function SchoolDemo() {
  return (
    <DemoToastProvider palette={palette}>
      <SchoolInner />
    </DemoToastProvider>
  );
}

function SchoolInner() {
  const t = useTranslations("demoPreview.school");
  const [tab, setTab] = useState<TabId>("dashboard");
  const toast = useDemoToast();

  const initials = (name: string) =>
    name
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("");

  const NAV: { id: TabId; label: string; Icon: typeof Backpack; group: NavGroup }[] = [
    { id: "dashboard", label: t("nav.dashboard"), Icon: House, group: "academics" },
    { id: "attendance", label: t("nav.attendance"), Icon: Backpack, group: "academics" },
    { id: "schedule", label: t("nav.schedule"), Icon: CalendarBlank, group: "academics" },
    { id: "homework", label: t("nav.homework"), Icon: BookOpen, group: "academics" },
    { id: "grades", label: t("nav.grades"), Icon: Star, group: "academics" },
    { id: "students", label: t("nav.students"), Icon: UsersThree, group: "people" },
    { id: "teachers", label: t("nav.teachers"), Icon: ChalkboardTeacher, group: "people" },
    { id: "parents", label: t("nav.parents"), Icon: Users, group: "people" },
    { id: "analytics", label: t("nav.analytics"), Icon: ChartBar, group: "admin" },
    { id: "settings", label: t("nav.settings"), Icon: GearSix, group: "admin" },
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

  // ─── data ───
  const attendanceLog = [
    { date: t("attendance.days.mon"), status: t("attendance.statusPresent"), variant: "success" as const, checkIn: "08:12", checkOut: "15:05" },
    { date: t("attendance.days.tue"), status: t("attendance.statusPresent"), variant: "success" as const, checkIn: "08:08", checkOut: "15:02" },
    { date: t("attendance.days.wed"), status: t("attendance.statusLate"), variant: "warn" as const, checkIn: "08:34", checkOut: "15:04" },
    { date: t("attendance.days.thu"), status: t("attendance.statusPresent"), variant: "success" as const, checkIn: "08:10", checkOut: "15:00" },
    { date: t("attendance.days.fri"), status: t("attendance.statusPresent"), variant: "success" as const, checkIn: "08:06", checkOut: "—" },
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

  const buses = [
    { id: "07", route: t("bus.routes.r7"), stop: t("bus.stops.maple"), eta: t("bus.etas.fiveMin"), onboard: 24, capacity: 40, status: t("bus.statusInbound"), statusVariant: "info" as const, color: C.primary },
    { id: "12", route: t("bus.routes.r12"), stop: t("bus.stops.cedar"), eta: t("bus.etas.twelveMin"), onboard: 31, capacity: 40, status: t("bus.statusInbound"), statusVariant: "info" as const, color: C.yellow },
    { id: "03", route: t("bus.routes.r3"), stop: t("bus.stops.school"), eta: t("bus.etas.arrived"), onboard: 18, capacity: 40, status: t("bus.statusArrived"), statusVariant: "success" as const, color: C.green },
  ];

  const students = [
    { n: t("students.list.0.name"), id: "SH-5A-014", room: "5A", gpa: 3.92, status: "honor" as const, color: "#0ea5e9" },
    { n: t("students.list.1.name"), id: "SH-5A-027", room: "5A", gpa: 3.71, status: "active" as const, color: "#22c55e" },
    { n: t("students.list.2.name"), id: "SH-5A-031", room: "5A", gpa: 3.45, status: "support" as const, color: "#f59e0b" },
    { n: t("students.list.3.name"), id: "SH-5B-008", room: "5B", gpa: 3.88, status: "active" as const, color: "#a855f7" },
    { n: t("students.list.4.name"), id: "SH-5B-019", room: "5B", gpa: 2.95, status: "support" as const, color: "#ef4444" },
    { n: t("students.list.5.name"), id: "SH-5B-022", room: "5B", gpa: 3.62, status: "active" as const, color: "#14b8a6" },
    { n: t("students.list.6.name"), id: "SH-5C-005", room: "5C", gpa: 3.79, status: "honor" as const, color: "#f97316" },
    { n: t("students.list.7.name"), id: "SH-5C-018", room: "5C", gpa: 3.34, status: "active" as const, color: "#8b5cf6" },
  ];

  const teachers = [
    { n: t("teachers.list.0.name"), subject: t("teachers.list.0.subject"), room: "R-204", classes: 4, rating: 4.9, color: "#0ea5e9" },
    { n: t("teachers.list.1.name"), subject: t("teachers.list.1.subject"), room: "R-118", classes: 3, rating: 4.8, color: "#22c55e" },
    { n: t("teachers.list.2.name"), subject: t("teachers.list.2.subject"), room: "R-301", classes: 5, rating: 4.7, color: "#f59e0b" },
    { n: t("teachers.list.3.name"), subject: t("teachers.list.3.subject"), room: "R-LAB", classes: 4, rating: 4.9, color: "#a855f7" },
    { n: t("teachers.list.4.name"), subject: t("teachers.list.4.subject"), room: "R-ART", classes: 3, rating: 4.8, color: "#f97316" },
    { n: t("teachers.list.5.name"), subject: t("teachers.list.5.subject"), room: "R-GYM", classes: 4, rating: 4.6, color: "#14b8a6" },
  ];

  const parents = [
    { n: t("parents.list.0.name"), child: t("parents.list.0.child"), phone: "+992 90 123 45 67", unread: 2, last: t("parents.lastSeen.minutes", { n: 4 }) },
    { n: t("parents.list.1.name"), child: t("parents.list.1.child"), phone: "+992 90 234 56 78", unread: 0, last: t("parents.lastSeen.hours", { n: 1 }) },
    { n: t("parents.list.2.name"), child: t("parents.list.2.child"), phone: "+992 90 345 67 89", unread: 5, last: t("parents.lastSeen.minutes", { n: 18 }) },
    { n: t("parents.list.3.name"), child: t("parents.list.3.child"), phone: "+992 90 456 78 90", unread: 1, last: t("parents.lastSeen.hours", { n: 3 }) },
    { n: t("parents.list.4.name"), child: t("parents.list.4.child"), phone: "+992 90 567 89 01", unread: 0, last: t("parents.lastSeen.minutes", { n: 32 }) },
    { n: t("parents.list.5.name"), child: t("parents.list.5.child"), phone: "+992 90 678 90 12", unread: 3, last: t("parents.lastSeen.days", { n: 1 }) },
  ];

  // ─── KPIs per screen ───
  const dashboardKpis = [
    { label: t("kpi.dashboard.0.label"), value: t("kpi.dashboard.0.value"), trend: t("kpi.dashboard.0.trend"), spark: [240, 244, 246, 248, 250, 249, 252, 254] },
    { label: t("kpi.dashboard.1.label"), value: t("kpi.dashboard.1.value"), trend: t("kpi.dashboard.1.trend"), spark: [22, 23, 24, 24, 25, 25, 26, 26] },
    { label: t("kpi.dashboard.2.label"), value: t("kpi.dashboard.2.value"), trend: t("kpi.dashboard.2.trend"), spark: [88, 90, 91, 92, 94, 93, 95, 96] },
    { label: t("kpi.dashboard.3.label"), value: t("kpi.dashboard.3.value"), trend: t("kpi.dashboard.3.trend"), spark: [3, 4, 4, 5, 5, 6, 6, 7] },
  ];

  const attendanceKpis = [
    { label: t("kpi.attendance.0.label"), value: t("kpi.attendance.0.value"), trend: t("kpi.attendance.0.trend"), spark: [22, 24, 23, 25, 24, 26, 25, 26] },
    { label: t("kpi.attendance.1.label"), value: t("kpi.attendance.1.value"), trend: t("kpi.attendance.1.trend"), spark: [4, 3, 5, 2, 3, 2, 1, 1] },
    { label: t("kpi.attendance.2.label"), value: t("kpi.attendance.2.value"), trend: t("kpi.attendance.2.trend"), spark: [88, 90, 91, 92, 94, 93, 95, 96] },
    { label: t("kpi.attendance.3.label"), value: t("kpi.attendance.3.value"), trend: t("kpi.attendance.3.trend"), spark: [6, 4, 5, 3, 2, 3, 2, 2] },
  ];

  const scheduleKpis = [
    { label: t("kpi.schedule.0.label"), value: t("kpi.schedule.0.value"), trend: t("kpi.schedule.0.trend"), spark: [5, 6, 6, 7, 6, 7, 8, 8] },
    { label: t("kpi.schedule.1.label"), value: t("kpi.schedule.1.value"), trend: t("kpi.schedule.1.trend"), spark: [10, 11, 12, 12, 13, 12, 14, 14] },
    { label: t("kpi.schedule.2.label"), value: t("kpi.schedule.2.value"), trend: t("kpi.schedule.2.trend"), spark: [8, 9, 10, 10, 11, 11, 12, 12] },
    { label: t("kpi.schedule.3.label"), value: t("kpi.schedule.3.value"), trend: t("kpi.schedule.3.trend"), spark: [20, 18, 15, 12, 10, 8, 6, 4] },
  ];

  const homeworkKpis = [
    { label: t("kpi.homework.0.label"), value: t("kpi.homework.0.value"), trend: t("kpi.homework.0.trend"), spark: [6, 8, 7, 9, 8, 10, 9, 11] },
    { label: t("kpi.homework.1.label"), value: t("kpi.homework.1.value"), trend: t("kpi.homework.1.trend"), spark: [70, 74, 78, 80, 82, 85, 86, 88] },
    { label: t("kpi.homework.2.label"), value: t("kpi.homework.2.value"), trend: t("kpi.homework.2.trend"), spark: [12, 14, 13, 16, 15, 18, 17, 19] },
    { label: t("kpi.homework.3.label"), value: t("kpi.homework.3.value"), trend: t("kpi.homework.3.trend"), spark: [5, 4, 6, 3, 4, 3, 2, 3] },
  ];

  const gradesKpis = [
    { label: t("kpi.grades.0.label"), value: t("kpi.grades.0.value"), trend: t("kpi.grades.0.trend"), spark: [82, 84, 85, 86, 87, 88, 88, 89] },
    { label: t("kpi.grades.1.label"), value: t("kpi.grades.1.value"), trend: t("kpi.grades.1.trend"), spark: [92, 94, 95, 96, 97, 97, 98, 98] },
    { label: t("kpi.grades.2.label"), value: t("kpi.grades.2.value"), trend: t("kpi.grades.2.trend"), spark: [60, 80, 110, 140, 160, 180, 200, 218] },
    { label: t("kpi.grades.3.label"), value: t("kpi.grades.3.value"), trend: t("kpi.grades.3.trend"), spark: [2, 4, 6, 8, 10, 11, 12, 12] },
  ];

  const studentsKpis = [
    { label: t("kpi.students.0.label"), value: t("kpi.students.0.value"), trend: t("kpi.students.0.trend"), spark: [248, 250, 252, 252, 253, 254, 254, 256] },
    { label: t("kpi.students.1.label"), value: t("kpi.students.1.value"), trend: t("kpi.students.1.trend"), spark: [3.4, 3.45, 3.5, 3.52, 3.55, 3.58, 3.6, 3.62] },
    { label: t("kpi.students.2.label"), value: t("kpi.students.2.value"), trend: t("kpi.students.2.trend"), spark: [40, 42, 44, 45, 46, 47, 48, 48] },
    { label: t("kpi.students.3.label"), value: t("kpi.students.3.value"), trend: t("kpi.students.3.trend"), spark: [10, 9, 8, 7, 6, 5, 4, 4] },
  ];

  const teachersKpis = [
    { label: t("kpi.teachers.0.label"), value: t("kpi.teachers.0.value"), trend: t("kpi.teachers.0.trend"), spark: [16, 16, 17, 17, 18, 18, 19, 19] },
    { label: t("kpi.teachers.1.label"), value: t("kpi.teachers.1.value"), trend: t("kpi.teachers.1.trend"), spark: [22, 23, 23, 24, 24, 25, 25, 26] },
    { label: t("kpi.teachers.2.label"), value: t("kpi.teachers.2.value"), trend: t("kpi.teachers.2.trend"), spark: [4.5, 4.6, 4.6, 4.7, 4.7, 4.8, 4.8, 4.9] },
    { label: t("kpi.teachers.3.label"), value: t("kpi.teachers.3.value"), trend: t("kpi.teachers.3.trend"), spark: [12, 13, 13, 14, 14, 15, 15, 16] },
  ];

  const parentsKpis = [
    { label: t("kpi.parents.0.label"), value: t("kpi.parents.0.value"), trend: t("kpi.parents.0.trend"), spark: [180, 190, 198, 204, 210, 214, 220, 226] },
    { label: t("kpi.parents.1.label"), value: t("kpi.parents.1.value"), trend: t("kpi.parents.1.trend"), spark: [62, 65, 68, 70, 72, 74, 76, 78] },
    { label: t("kpi.parents.2.label"), value: t("kpi.parents.2.value"), trend: t("kpi.parents.2.trend"), spark: [14, 16, 17, 18, 19, 20, 22, 24] },
    { label: t("kpi.parents.3.label"), value: t("kpi.parents.3.value"), trend: t("kpi.parents.3.trend"), spark: [40, 44, 48, 52, 55, 58, 60, 62] },
  ];

  const analyticsKpis = [
    { label: t("kpi.analytics.0.label"), value: t("kpi.analytics.0.value"), trend: t("kpi.analytics.0.trend"), spark: [240, 244, 248, 250, 252, 254, 254, 256] },
    { label: t("kpi.analytics.1.label"), value: t("kpi.analytics.1.value"), trend: t("kpi.analytics.1.trend"), spark: [88, 90, 91, 92, 94, 93, 95, 96] },
    { label: t("kpi.analytics.2.label"), value: t("kpi.analytics.2.value"), trend: t("kpi.analytics.2.trend"), spark: [3.4, 3.45, 3.5, 3.52, 3.55, 3.58, 3.6, 3.62] },
    { label: t("kpi.analytics.3.label"), value: t("kpi.analytics.3.value"), trend: t("kpi.analytics.3.trend"), spark: [70, 74, 76, 80, 82, 85, 87, 89] },
  ];

  const KPIS: Record<TabId, { label: string; value: string; trend?: string; spark?: number[] }[] | null> = {
    dashboard: dashboardKpis,
    attendance: attendanceKpis,
    schedule: scheduleKpis,
    homework: homeworkKpis,
    grades: gradesKpis,
    students: studentsKpis,
    teachers: teachersKpis,
    parents: parentsKpis,
    analytics: analyticsKpis,
    settings: null,
  };

  const studentStatusVariant = (s: "honor" | "active" | "support"): "success" | "info" | "warn" =>
    s === "honor" ? "success" : s === "support" ? "warn" : "info";

  const brandMark = (
    <div
      style={{
        width: 28,
        height: 28,
        background: C.yellow,
        color: C.primary,
        borderRadius: 8,
        display: "grid",
        placeItems: "center",
      }}
    >
      <Backpack size={16} weight="duotone" />
    </div>
  );

  return (
    <div
      style={{
        background: C.bg,
        minHeight: "100vh",
        color: C.ink,
        fontFamily: "ui-sans-serif, system-ui",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <DemoTopBar
        palette={palette}
        brandName={t("brand")}
        brandMark={brandMark}
        breadcrumb={t(`breadcrumb.${tab}`)}
        searchPlaceholder={t("shell.searchPlaceholder")}
        userName={t("shell.userName")}
        userInitials={t("shell.userInitials")}
        rightSlot={
          <DemoCommandPalette
            palette={palette}
            items={paletteItems}
            placeholder={t("commandPalette.placeholder")}
            hint="⌘K"
          />
        }
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
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 6px" }}>
            <div
              style={{
                width: 38,
                height: 38,
                background: C.primary,
                color: "white",
                display: "grid",
                placeItems: "center",
                borderRadius: 10,
              }}
            >
              <GraduationCap size={20} weight="duotone" />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 800, fontSize: 14, letterSpacing: -0.3, color: C.ink }}>
                {t("brand")}
              </div>
              <div style={{ fontSize: 10, color: C.muted, letterSpacing: 1.5, textTransform: "uppercase", marginTop: 2 }}>
                {t("brandSub")}
              </div>
            </div>
          </div>

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
                      }}
                    >
                      <n.Icon size={16} weight="duotone" />
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
            eyebrow={t(`screen.${tab}.eyebrow`)}
            title={t(`screen.${tab}.title`)}
            subtitle={t(`screen.${tab}.subtitle`)}
            rightSlot={
              tab === "dashboard" || tab === "schedule" || tab === "analytics" ? (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "4px 10px",
                    background: C.bg,
                    border: `1px solid ${C.border}`,
                    borderRadius: 9999,
                    fontSize: 11,
                    color: C.muted,
                    fontWeight: 600,
                  }}
                >
                  <Bus size={12} weight="duotone" /> {t("busStatus")}
                </span>
              ) : undefined
            }
          />

          {KPIS[tab] && <DemoKpiStrip palette={palette} items={KPIS[tab]!} />}

          {tab === "dashboard" && (
            <>
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
                  src={demoImages.school.hero}
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
                  }}
                >
                  <span style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", opacity: 0.85 }}>
                    {t("screen.dashboard.eyebrow")}
                  </span>
                  <span style={{ fontSize: 22, fontWeight: 800 }}>
                    {t("screen.dashboard.title")}
                  </span>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 18, marginBottom: 18 }}>
                <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
                    <h3 style={{ fontSize: 16, margin: 0, fontWeight: 800 }}>{t("dashboard.greeting")}</h3>
                    <span style={{ fontSize: 11, color: C.muted }}>{t("dashboard.todayLabel")}</span>
                  </div>
                  <p style={{ fontSize: 13, color: C.muted, margin: 0, lineHeight: 1.6 }}>{t("dashboard.subGreeting")}</p>

                  <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                    {[
                      { Icon: BookOpen, label: t("dashboard.tiles.lessons"), v: 6 },
                      { Icon: Star, label: t("dashboard.tiles.stars"), v: 12 },
                      { Icon: Trophy, label: t("dashboard.tiles.streak"), v: 18 },
                      { Icon: Clock, label: t("dashboard.tiles.minutes"), v: 245 },
                    ].map((tile) => (
                      <div
                        key={tile.label}
                        style={{
                          background: C.card,
                          border: `1px solid ${C.border}`,
                          borderRadius: 10,
                          padding: 12,
                        }}
                      >
                        <tile.Icon size={18} weight="duotone" style={{ color: C.primary }} />
                        <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: 1, marginTop: 8, fontWeight: 700 }}>
                          {tile.label}
                        </div>
                        <div style={{ fontSize: 22, fontWeight: 800, marginTop: 2, color: C.ink, fontFamily: "Georgia, serif" }}>
                          <DemoCounter value={tile.v} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <DemoLiveFeed
                  palette={palette}
                  liveLabel={t("dashboard.feedLabel")}
                  height={260}
                  initial={[
                    { id: "d1", title: t("dashboard.feed.0.title"), meta: t("dashboard.feed.0.meta"), tone: "success" },
                    { id: "d2", title: t("dashboard.feed.1.title"), meta: t("dashboard.feed.1.meta"), tone: "info" },
                    { id: "d3", title: t("dashboard.feed.2.title"), meta: t("dashboard.feed.2.meta"), tone: "primary" },
                  ]}
                  rotating={[
                    { id: "dr1", title: t("dashboard.feed.3.title"), meta: t("dashboard.feed.3.meta"), tone: "warn" },
                    { id: "dr2", title: t("dashboard.feed.4.title"), meta: t("dashboard.feed.4.meta"), tone: "success" },
                    { id: "dr3", title: t("dashboard.feed.5.title"), meta: t("dashboard.feed.5.meta"), tone: "info" },
                  ]}
                />
              </div>

              <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
                <h3 style={{ fontSize: 14, fontWeight: 800, margin: "0 0 14px", textTransform: "uppercase", letterSpacing: 1 }}>
                  {t("dashboard.busesTitle")}
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                  {buses.map((b) => {
                    const pct = Math.round((b.onboard / b.capacity) * 100);
                    return (
                      <div key={b.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 14 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div
                            style={{
                              width: 44,
                              height: 44,
                              background: b.color,
                              color: "white",
                              borderRadius: 10,
                              display: "grid",
                              placeItems: "center",
                            }}
                          >
                            <Bus size={22} weight="duotone" />
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontWeight: 800, fontSize: 14 }}>
                              {t("bus.busPrefix")} {b.id}
                            </div>
                            <div style={{ fontSize: 11, color: C.muted }}>{b.route}</div>
                          </div>
                        </div>
                        <div style={{ marginTop: 10, fontSize: 12, color: C.muted, display: "flex", justifyContent: "space-between" }}>
                          <span><MapPin size={12} weight="duotone" /> {b.stop}</span>
                          <span style={{ fontWeight: 700, color: C.primary }}>{b.eta}</span>
                        </div>
                        <div style={{ marginTop: 8, height: 5, background: C.border, borderRadius: 999, overflow: "hidden" }}>
                          <div style={{ width: `${pct}%`, height: "100%", background: b.color }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {tab === "attendance" && (
            <>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{t("attendance.weekTitle")}</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                {attendanceLog.map((row) => (
                  <div
                    key={row.date}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: 12,
                      background: C.paper,
                      border: `1px solid ${C.border}`,
                      borderRadius: 10,
                    }}
                  >
                    <div style={{ width: 64, fontWeight: 700, color: C.primary }}>{row.date}</div>
                    <div style={{ flex: 1, fontSize: 14 }}>
                      <div style={{ fontSize: 12, color: C.muted }}>
                        {t("attendance.in")} {row.checkIn} · {t("attendance.out")} {row.checkOut}
                      </div>
                    </div>
                    <DemoBadge palette={palette} variant={row.variant} label={row.status} />
                  </div>
                ))}
              </div>

              <div
                style={{
                  background: C.paper,
                  border: `1px solid ${C.border}`,
                  borderRadius: 14,
                  padding: 22,
                  marginBottom: 18,
                }}
              >
                <div style={{ fontSize: 11, color: C.muted, marginBottom: 14, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>
                  {t("attendance.heatmapLabel")}
                </div>
                <DemoHeatmap palette={palette} weeks={14} seed={3} ariaLabel={t("attendance.heatmapLabel")} />
                <p style={{ marginTop: 14, color: C.muted, fontSize: 12 }}>{t("attendance.heatmapNote")}</p>
              </div>

              <div style={{ padding: 16, background: C.yellow, borderRadius: 12, display: "flex", alignItems: "center", gap: 12 }}>
                <ChatText size={22} weight="duotone" style={{ color: C.primary }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700 }}>{t("note.title")}</div>
                  <div style={{ fontSize: 13, color: C.ink }}>{t("note.body")}</div>
                </div>
              </div>
            </>
          )}

          {tab === "schedule" && (
            <>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
                {schedule.map((row, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: 14,
                      background: C.paper,
                      border: `1px solid ${C.border}`,
                      borderRadius: 10,
                      opacity: row.done ? 0.55 : 1,
                    }}
                  >
                    <div style={{ width: 60, fontWeight: 700, color: C.primary, display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <Clock size={14} weight="duotone" />
                      {row.time}
                    </div>
                    <div style={{ flex: 1, fontSize: 14, textDecoration: row.done ? "line-through" : "none" }}>{row.c}</div>
                    {row.done ? (
                      <DemoBadge palette={palette} variant="success" label={t("schedule.statusDone")} />
                    ) : (
                      <DemoBadge palette={palette} variant="info" label={t("schedule.upcoming")} />
                    )}
                  </div>
                ))}
              </div>

              <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
                <h3 style={{ fontSize: 14, fontWeight: 800, margin: "0 0 14px", textTransform: "uppercase", letterSpacing: 1 }}>
                  {t("schedule.busesTitle")}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {buses.map((b) => {
                    const pct = Math.round((b.onboard / b.capacity) * 100);
                    return (
                      <div
                        key={b.id}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "60px 1fr auto",
                          gap: 16,
                          alignItems: "center",
                          background: C.card,
                          padding: 14,
                          borderRadius: 12,
                          border: `1px solid ${C.border}`,
                        }}
                      >
                        <div
                          style={{
                            width: 50,
                            height: 50,
                            background: b.color,
                            color: "white",
                            borderRadius: 12,
                            display: "grid",
                            placeItems: "center",
                          }}
                        >
                          <Bus size={24} weight="duotone" />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                            <span style={{ fontWeight: 800, fontSize: 14 }}>{t("bus.busPrefix")} {b.id}</span>
                            <span style={{ fontSize: 12, color: C.muted, display: "inline-flex", alignItems: "center", gap: 4 }}>
                              <Path size={12} weight="duotone" />
                              {b.route}
                            </span>
                          </div>
                          <div style={{ display: "flex", gap: 14, fontSize: 12, color: C.ink, flexWrap: "wrap" }}>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                              <MapPin size={12} weight="duotone" style={{ color: C.primary }} />
                              <span style={{ color: C.muted }}>{t("bus.currentStop")}:</span>
                              <span style={{ fontWeight: 600 }}>{b.stop}</span>
                            </span>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                              <Clock size={12} weight="duotone" style={{ color: C.primary }} />
                              <span style={{ color: C.muted }}>{t("bus.eta")}:</span>
                              <span style={{ fontWeight: 600 }}>{b.eta}</span>
                            </span>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                              <Users size={12} weight="duotone" style={{ color: C.primary }} />
                              <span style={{ color: C.muted }}>{t("bus.onboard")}:</span>
                              <span style={{ fontWeight: 600 }}>{b.onboard}/{b.capacity}</span>
                            </span>
                          </div>
                          <div style={{ marginTop: 8, height: 5, background: C.border, borderRadius: 999, overflow: "hidden" }}>
                            <div style={{ width: `${pct}%`, height: "100%", background: b.color }} />
                          </div>
                        </div>
                        <DemoBadge palette={palette} variant={b.statusVariant} label={b.status} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {tab === "homework" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {homework.map((h, i) => (
                <article
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    background: C.paper,
                    border: `1px solid ${C.border}`,
                    padding: 16,
                    borderRadius: 12,
                  }}
                >
                  <input type="checkbox" defaultChecked={h.done} style={{ width: 18, height: 18, accentColor: C.primary }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <DemoBadge palette={palette} variant="info" label={h.sub} />
                      <span style={{ fontWeight: 600, textDecoration: h.done ? "line-through" : "none" }}>{h.title}</span>
                    </div>
                    <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>{t("homework.duePrefix")} {h.due}</div>
                  </div>
                  {h.done ? (
                    <DemoBadge palette={palette} variant="success" label={t("homework.statusDone")} />
                  ) : (
                    <DemoBadge palette={palette} variant="warn" label={t("homework.statusOpen")} />
                  )}
                </article>
              ))}
            </div>
          )}

          {tab === "grades" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
              {grades.map((g) => (
                <div
                  key={g.sub}
                  style={{
                    background: C.paper,
                    border: `1px solid ${C.border}`,
                    borderRadius: 12,
                    padding: 18,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 1 }}>{g.sub}</div>
                  <div
                    style={{
                      fontSize: 40,
                      fontWeight: 800,
                      color: C.primary,
                      fontFamily: "Georgia, serif",
                      marginTop: 4,
                    }}
                  >
                    {g.grade}
                  </div>
                  <div style={{ fontSize: 13, color: g.trend === "↑" ? C.green : g.trend === "↓" ? C.red : C.muted, marginTop: 4 }}>
                    {g.trend} {t("grades.vsLastTerm")}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "students" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
              {students.map((s) => (
                <div
                  key={s.id}
                  style={{
                    background: C.paper,
                    border: `1px solid ${C.border}`,
                    borderRadius: 12,
                    padding: 16,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 9999,
                        background: s.color,
                        color: "white",
                        display: "grid",
                        placeItems: "center",
                        fontWeight: 800,
                      }}
                    >
                      {initials(s.n)}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{s.n}</div>
                      <div style={{ fontSize: 11, color: C.muted, fontFamily: "ui-monospace, monospace" }}>{s.id}</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12 }}>
                    <span style={{ color: C.muted }}>{t("students.roomPrefix")} {s.room}</span>
                    <span style={{ fontWeight: 700, color: s.gpa >= 3.7 ? C.green : s.gpa >= 3.2 ? C.primary : C.red }}>
                      GPA <DemoCounter value={s.gpa} decimals={2} />
                    </span>
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <DemoBadge palette={palette} variant={studentStatusVariant(s.status)} label={t(`students.status.${s.status}`)} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "teachers" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
              {teachers.map((tc) => (
                <div
                  key={tc.n}
                  style={{
                    background: C.paper,
                    border: `1px solid ${C.border}`,
                    borderRadius: 14,
                    padding: 20,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: 9999,
                        background: tc.color,
                        color: "white",
                        display: "grid",
                        placeItems: "center",
                        fontWeight: 800,
                        fontSize: 18,
                      }}
                    >
                      {initials(tc.n)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 15 }}>{tc.n}</div>
                      <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{tc.subject}</div>
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: 14,
                      padding: "10px 12px",
                      background: C.card,
                      border: `1px solid ${C.border}`,
                      borderRadius: 10,
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 9, color: C.muted, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>
                        {t("teachers.room")}
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{tc.room}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 9, color: C.muted, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>
                        {t("teachers.classes")}
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>
                        <DemoCounter value={tc.classes} />
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 9, color: C.muted, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>
                        {t("teachers.rating")}
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 13, color: C.green }}>
                        <DemoCounter value={tc.rating} decimals={1} /> ★
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "parents" && (
            <div
              style={{
                background: C.paper,
                border: `1px solid ${C.border}`,
                borderRadius: 14,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.5fr 1.2fr 1fr 80px 100px",
                  padding: "12px 18px",
                  background: C.card,
                  fontSize: 10,
                  color: C.muted,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  fontWeight: 700,
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                <span>{t("parents.col.parent")}</span>
                <span>{t("parents.col.child")}</span>
                <span>{t("parents.col.phone")}</span>
                <span style={{ textAlign: "center" }}>{t("parents.col.unread")}</span>
                <span>{t("parents.col.lastSeen")}</span>
              </div>
              {parents.map((p, i) => (
                <div
                  key={p.n}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.5fr 1.2fr 1fr 80px 100px",
                    padding: "14px 18px",
                    borderBottom: i === parents.length - 1 ? "none" : `1px solid ${C.border}`,
                    alignItems: "center",
                    fontSize: 13,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 9999,
                        background: C.primary,
                        color: "white",
                        display: "grid",
                        placeItems: "center",
                        fontWeight: 700,
                        fontSize: 11,
                      }}
                    >
                      {initials(p.n)}
                    </div>
                    <span style={{ fontWeight: 700 }}>{p.n}</span>
                  </div>
                  <span style={{ color: C.muted }}>{p.child}</span>
                  <span style={{ color: C.muted, fontFamily: "ui-monospace, monospace", fontSize: 12 }}>{p.phone}</span>
                  <div style={{ textAlign: "center" }}>
                    {p.unread > 0 ? (
                      <span
                        style={{
                          display: "inline-grid",
                          placeItems: "center",
                          minWidth: 22,
                          height: 22,
                          padding: "0 6px",
                          background: C.red,
                          color: "white",
                          borderRadius: 9999,
                          fontSize: 11,
                          fontWeight: 800,
                        }}
                      >
                        {p.unread}
                      </span>
                    ) : (
                      <span style={{ color: C.muted, fontSize: 11 }}>—</span>
                    )}
                  </div>
                  <span style={{ color: C.muted, fontSize: 11 }}>{p.last}</span>
                </div>
              ))}
            </div>
          )}

          {tab === "analytics" && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 18, marginBottom: 18 }}>
                <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
                    <h3 style={{ fontSize: 16, margin: 0, fontWeight: 800 }}>{t("analytics.chartTitle")}</h3>
                    <span style={{ fontSize: 11, color: C.muted }}>{t("analytics.last30")}</span>
                  </div>
                  <DemoChart
                    data={[
                      88, 89, 90, 91, 92, 91, 92, 93, 94, 93, 94, 95, 94, 95, 95,
                      96, 95, 96, 96, 95, 96, 97, 96, 97, 97, 96, 97, 97, 98, 97,
                    ]}
                    palette={palette}
                    height={220}
                  />
                </div>
                <DemoLiveFeed
                  palette={palette}
                  liveLabel={t("analytics.liveFeed")}
                  height={250}
                  initial={[
                    { id: "an1", title: t("analytics.events.0.title"), meta: t("analytics.events.0.meta"), tone: "success" },
                    { id: "an2", title: t("analytics.events.1.title"), meta: t("analytics.events.1.meta"), tone: "primary" },
                    { id: "an3", title: t("analytics.events.2.title"), meta: t("analytics.events.2.meta"), tone: "warn" },
                  ]}
                  rotating={[
                    { id: "anr1", title: t("analytics.events.3.title"), meta: t("analytics.events.3.meta"), tone: "info" },
                    { id: "anr2", title: t("analytics.events.4.title"), meta: t("analytics.events.4.meta"), tone: "success" },
                    { id: "anr3", title: t("analytics.events.5.title"), meta: t("analytics.events.5.meta"), tone: "primary" },
                  ]}
                />
              </div>

              <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
                <h3 style={{ fontSize: 16, margin: "0 0 14px", fontWeight: 800 }}>{t("analytics.cohortTitle")}</h3>
                <DemoCohort palette={palette} rows={6} cols={8} />
                <p style={{ color: C.muted, fontSize: 12, marginTop: 12 }}>{t("analytics.cohortNote")}</p>
              </div>
            </>
          )}

          {tab === "settings" && (
            <>
              <div
                style={{
                  background: C.paper,
                  border: `1px solid ${C.border}`,
                  borderRadius: 14,
                  padding: 22,
                  marginBottom: 18,
                }}
              >
                <h3 style={{ fontSize: 14, fontWeight: 800, margin: "0 0 14px", textTransform: "uppercase", letterSpacing: 1, display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <PencilLine size={16} weight="duotone" style={{ color: C.primary }} />
                  {t("settings.basics")}
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {(["schoolName", "term", "principal", "contact"] as const).map((f) => (
                    <div key={f}>
                      <label style={{ display: "block", fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700, marginBottom: 6 }}>
                        {t(`settings.fields.${f}`)}
                      </label>
                      <input
                        defaultValue={t(`settings.placeholders.${f}`)}
                        style={{
                          width: "100%",
                          background: C.card,
                          border: `1px solid ${C.border}`,
                          borderRadius: 8,
                          padding: "10px 12px",
                          fontSize: 13,
                          color: C.ink,
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => toast.push({ title: t("toast.settingsSaved"), tone: "success" })}
                  style={{
                    marginTop: 16,
                    padding: "10px 18px",
                    background: C.primary,
                    color: "white",
                    border: "none",
                    borderRadius: 9999,
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: "pointer",
                    letterSpacing: 1,
                    textTransform: "uppercase",
                  }}
                >
                  {t("settings.save")}
                </button>
              </div>

              <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
                <h3 style={{ fontSize: 14, fontWeight: 800, margin: "0 0 14px", textTransform: "uppercase", letterSpacing: 1, display: "flex", alignItems: "center", gap: 8 }}>
                  <Plug size={16} weight="duotone" style={{ color: C.primary }} />
                  {t("settings.integrationsTitle")}
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
                  {[
                    { name: "Google Classroom", emoji: "🎓", on: true, desc: "settings.integrations.classroom" },
                    { name: "ClassDojo", emoji: "🦄", on: true, desc: "settings.integrations.classdojo" },
                    { name: "Zoom", emoji: "📹", on: true, desc: "settings.integrations.zoom" },
                    { name: "Twilio SMS", emoji: "📲", on: false, desc: "settings.integrations.twilio" },
                    { name: "Stripe", emoji: "💳", on: true, desc: "settings.integrations.stripe" },
                    { name: "Mailchimp", emoji: "✉️", on: false, desc: "settings.integrations.mailchimp" },
                  ].map((i) => (
                    <div
                      key={i.name}
                      style={{
                        background: C.card,
                        border: `1px solid ${C.border}`,
                        borderRadius: 12,
                        padding: 14,
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <div style={{ fontSize: 22 }}>{i.emoji}</div>
                        <DemoBadge palette={palette} variant={i.on ? "success" : "neutral"} label={t(i.on ? "settings.connected" : "settings.disconnected")} />
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{i.name}</div>
                      <div style={{ color: C.muted, fontSize: 11, lineHeight: 1.5, marginTop: 4 }}>{t(i.desc)}</div>
                      <button
                        onClick={() =>
                          toast.push({
                            title: t(i.on ? "toast.disconnected" : "toast.connected", { name: i.name }),
                            tone: i.on ? "warn" : "success",
                          })
                        }
                        style={{
                          marginTop: 8,
                          padding: "5px 10px",
                          background: "transparent",
                          border: `1px solid ${C.border}`,
                          borderRadius: 8,
                          fontSize: 11,
                          fontWeight: 700,
                          color: C.ink,
                          cursor: "pointer",
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                        }}
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
        version={t("shell.version")}
        region={t("shell.region")}
        buildId={t("shell.buildId")}
      />
    </div>
  );
}
