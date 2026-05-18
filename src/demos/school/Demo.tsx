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
} from "@phosphor-icons/react";
import {
  DemoTopBar,
  DemoStatusBar,
  DemoKpiStrip,
  DemoScreenHeader,
  DemoBadge,
} from "@/components/demo-shell";

const C = {
  bg: "#eff8ff",
  paper: "#ffffff",
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

type TabId = "attendance" | "schedule" | "homework" | "grades" | "bus";

export function SchoolDemo() {
  const t = useTranslations("demoPreview.school");
  const [tab, setTab] = useState<TabId>("attendance");

  const tabs: { id: TabId; label: string; Icon: typeof Backpack }[] = [
    { id: "attendance", label: t("tabs.attendance"), Icon: Backpack },
    { id: "schedule", label: t("tabs.schedule"), Icon: CalendarBlank },
    { id: "homework", label: t("tabs.homework"), Icon: BookOpen },
    { id: "grades", label: t("tabs.grades"), Icon: Star },
    { id: "bus", label: t("tabs.bus"), Icon: Bus },
  ];

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
    {
      id: "07",
      route: t("bus.routes.r7"),
      stop: t("bus.stops.maple"),
      eta: t("bus.etas.fiveMin"),
      onboard: 24,
      capacity: 40,
      status: t("bus.statusInbound"),
      statusVariant: "info" as const,
      color: C.primary,
    },
    {
      id: "12",
      route: t("bus.routes.r12"),
      stop: t("bus.stops.cedar"),
      eta: t("bus.etas.twelveMin"),
      onboard: 31,
      capacity: 40,
      status: t("bus.statusInbound"),
      statusVariant: "info" as const,
      color: C.yellow,
    },
    {
      id: "03",
      route: t("bus.routes.r3"),
      stop: t("bus.stops.school"),
      eta: t("bus.etas.arrived"),
      onboard: 18,
      capacity: 40,
      status: t("bus.statusArrived"),
      statusVariant: "success" as const,
      color: C.green,
    },
  ];

  const breadcrumb =
    tab === "attendance"
      ? t("breadcrumb.attendance")
      : tab === "schedule"
        ? t("breadcrumb.schedule")
        : tab === "homework"
          ? t("breadcrumb.homework")
          : tab === "grades"
            ? t("breadcrumb.grades")
            : t("breadcrumb.bus");

  const kpiItems: { label: string; value: string; trend?: string; spark?: number[] }[] =
    tab === "attendance"
      ? [
          { label: t("kpi.attendance.0.label"), value: t("kpi.attendance.0.value"), trend: t("kpi.attendance.0.trend"), spark: [22, 24, 23, 25, 24, 26, 25, 26] },
          { label: t("kpi.attendance.1.label"), value: t("kpi.attendance.1.value"), trend: t("kpi.attendance.1.trend"), spark: [4, 3, 5, 2, 3, 2, 1, 1] },
          { label: t("kpi.attendance.2.label"), value: t("kpi.attendance.2.value"), trend: t("kpi.attendance.2.trend"), spark: [88, 90, 91, 92, 94, 93, 95, 96] },
          { label: t("kpi.attendance.3.label"), value: t("kpi.attendance.3.value"), trend: t("kpi.attendance.3.trend"), spark: [6, 4, 5, 3, 2, 3, 2, 2] },
        ]
      : tab === "schedule"
        ? [
            { label: t("kpi.schedule.0.label"), value: t("kpi.schedule.0.value"), trend: t("kpi.schedule.0.trend"), spark: [5, 6, 6, 7, 6, 7, 8, 8] },
            { label: t("kpi.schedule.1.label"), value: t("kpi.schedule.1.value"), trend: t("kpi.schedule.1.trend"), spark: [10, 11, 12, 12, 13, 12, 14, 14] },
            { label: t("kpi.schedule.2.label"), value: t("kpi.schedule.2.value"), trend: t("kpi.schedule.2.trend"), spark: [8, 9, 10, 10, 11, 11, 12, 12] },
            { label: t("kpi.schedule.3.label"), value: t("kpi.schedule.3.value"), trend: t("kpi.schedule.3.trend"), spark: [20, 18, 15, 12, 10, 8, 6, 4] },
          ]
        : tab === "homework"
          ? [
              { label: t("kpi.homework.0.label"), value: t("kpi.homework.0.value"), trend: t("kpi.homework.0.trend"), spark: [6, 8, 7, 9, 8, 10, 9, 11] },
              { label: t("kpi.homework.1.label"), value: t("kpi.homework.1.value"), trend: t("kpi.homework.1.trend"), spark: [70, 74, 78, 80, 82, 85, 86, 88] },
              { label: t("kpi.homework.2.label"), value: t("kpi.homework.2.value"), trend: t("kpi.homework.2.trend"), spark: [12, 14, 13, 16, 15, 18, 17, 19] },
              { label: t("kpi.homework.3.label"), value: t("kpi.homework.3.value"), trend: t("kpi.homework.3.trend"), spark: [5, 4, 6, 3, 4, 3, 2, 3] },
            ]
          : tab === "grades"
            ? [
                { label: t("kpi.grades.0.label"), value: t("kpi.grades.0.value"), trend: t("kpi.grades.0.trend"), spark: [82, 84, 85, 86, 87, 88, 88, 89] },
                { label: t("kpi.grades.1.label"), value: t("kpi.grades.1.value"), trend: t("kpi.grades.1.trend"), spark: [92, 94, 95, 96, 97, 97, 98, 98] },
                { label: t("kpi.grades.2.label"), value: t("kpi.grades.2.value"), trend: t("kpi.grades.2.trend"), spark: [60, 80, 110, 140, 160, 180, 200, 218] },
                { label: t("kpi.grades.3.label"), value: t("kpi.grades.3.value"), trend: t("kpi.grades.3.trend"), spark: [2, 4, 6, 8, 10, 11, 12, 12] },
              ]
            : [
                { label: t("kpi.bus.0.label"), value: t("kpi.bus.0.value"), trend: t("kpi.bus.0.trend"), spark: [10, 11, 12, 12, 13, 13, 14, 14] },
                { label: t("kpi.bus.1.label"), value: t("kpi.bus.1.value"), trend: t("kpi.bus.1.trend"), spark: [88, 90, 91, 93, 94, 95, 96, 97] },
                { label: t("kpi.bus.2.label"), value: t("kpi.bus.2.value"), trend: t("kpi.bus.2.trend"), spark: [180, 200, 220, 240, 260, 280, 300, 312] },
                { label: t("kpi.bus.3.label"), value: t("kpi.bus.3.value"), trend: t("kpi.bus.3.trend"), spark: [12, 10, 8, 6, 5, 4, 3, 2] },
              ];

  const screenEyebrow =
    tab === "attendance"
      ? t("screen.attendance.eyebrow")
      : tab === "schedule"
        ? t("screen.schedule.eyebrow")
        : tab === "homework"
          ? t("screen.homework.eyebrow")
          : tab === "grades"
            ? t("screen.grades.eyebrow")
            : t("screen.bus.eyebrow");

  const screenTitle =
    tab === "attendance"
      ? t("screen.attendance.title")
      : tab === "schedule"
        ? t("screen.schedule.title")
        : tab === "homework"
          ? t("screen.homework.title")
          : tab === "grades"
            ? t("screen.grades.title")
            : t("screen.bus.title");

  const screenSubtitle =
    tab === "attendance"
      ? t("screen.attendance.subtitle")
      : tab === "schedule"
        ? t("screen.schedule.subtitle")
        : tab === "homework"
          ? t("screen.homework.subtitle")
          : tab === "grades"
            ? t("screen.grades.subtitle")
            : t("screen.bus.subtitle");

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
        brandMark={
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
        }
        breadcrumb={breadcrumb}
        searchPlaceholder={t("shell.searchPlaceholder")}
        userName={t("shell.userName")}
        userInitials={t("shell.userInitials")}
        rightSlot={
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
        }
      />

      <nav style={{ maxWidth: 1200, width: "100%", margin: "0 auto", padding: "12px 28px 0", display: "flex", gap: 6, flexWrap: "wrap" }}>
        {tabs.map((tabItem) => (
          <button
            key={tabItem.id}
            onClick={() => setTab(tabItem.id)}
            style={{
              background: tab === tabItem.id ? C.paper : "transparent",
              color: tab === tabItem.id ? C.ink : C.muted,
              border: tab === tabItem.id ? `1px solid ${C.border}` : "1px solid transparent",
              borderBottom: tab === tabItem.id ? `1px solid ${C.paper}` : "1px solid transparent",
              padding: "10px 16px",
              borderRadius: "12px 12px 0 0",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: -1,
            }}
          >
            <tabItem.Icon size={16} weight="duotone" />
            {tabItem.label}
          </button>
        ))}
      </nav>

      <main style={{ maxWidth: 1200, width: "100%", margin: "0 auto", padding: "0 28px 28px", flex: 1 }}>
        <div
          style={{
            background: C.paper,
            border: `1px solid ${C.border}`,
            borderRadius: "0 12px 12px 12px",
            padding: 24,
          }}
        >
          <DemoScreenHeader
            palette={palette}
            eyebrow={screenEyebrow}
            title={screenTitle}
            subtitle={screenSubtitle}
          />

          <DemoKpiStrip palette={palette} items={kpiItems} />

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
                      background: C.bg,
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
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {schedule.map((row, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: 14,
                    background: C.bg,
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
                    background: C.bg,
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
                <div key={g.sub} style={{ background: C.bg, borderRadius: 12, padding: 18, textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 1 }}>{g.sub}</div>
                  <div style={{ fontSize: 40, fontWeight: 800, color: C.primary, fontFamily: "Georgia, serif", marginTop: 4 }}>
                    {g.grade}
                  </div>
                  <div style={{ fontSize: 13, color: g.trend === "↑" ? C.green : g.trend === "↓" ? C.red : C.muted, marginTop: 4 }}>
                    {g.trend} {t("grades.vsLastTerm")}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "bus" && (
            <>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {buses.map((b) => {
                  const pct = Math.round((b.onboard / b.capacity) * 100);
                  return (
                    <article
                      key={b.id}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "60px 1fr auto",
                        gap: 16,
                        alignItems: "center",
                        background: C.bg,
                        padding: 18,
                        borderRadius: 14,
                        border: `1px solid ${C.border}`,
                      }}
                    >
                      <div
                        style={{
                          width: 60,
                          height: 60,
                          background: b.color,
                          color: "white",
                          borderRadius: 14,
                          display: "grid",
                          placeItems: "center",
                        }}
                      >
                        <Bus size={28} weight="duotone" />
                      </div>

                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                          <span style={{ fontWeight: 800, fontSize: 16 }}>
                            {t("bus.busPrefix")} {b.id}
                          </span>
                          <span style={{ fontSize: 12, color: C.muted, display: "inline-flex", alignItems: "center", gap: 4 }}>
                            <Path size={12} weight="duotone" />
                            {b.route}
                          </span>
                        </div>
                        <div style={{ display: "flex", gap: 18, fontSize: 13, color: C.ink, flexWrap: "wrap" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <MapPin size={14} weight="duotone" style={{ color: C.primary }} />
                            <span style={{ color: C.muted }}>{t("bus.currentStop")}:</span>
                            <span style={{ fontWeight: 600 }}>{b.stop}</span>
                          </span>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <Clock size={14} weight="duotone" style={{ color: C.primary }} />
                            <span style={{ color: C.muted }}>{t("bus.eta")}:</span>
                            <span style={{ fontWeight: 600 }}>{b.eta}</span>
                          </span>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <Users size={14} weight="duotone" style={{ color: C.primary }} />
                            <span style={{ color: C.muted }}>{t("bus.onboard")}:</span>
                            <span style={{ fontWeight: 600 }}>
                              {b.onboard}/{b.capacity}
                            </span>
                          </span>
                        </div>
                        <div style={{ marginTop: 10, height: 6, background: C.border, borderRadius: 999, overflow: "hidden" }}>
                          <div style={{ width: `${pct}%`, height: "100%", background: b.color }} />
                        </div>
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <DemoBadge palette={palette} variant={b.statusVariant} label={b.status} />
                      </div>
                    </article>
                  );
                })}
              </div>

              <div style={{ marginTop: 20, padding: 16, background: C.yellow, borderRadius: 12, display: "flex", alignItems: "center", gap: 12 }}>
                <ChatText size={22} weight="duotone" style={{ color: C.primary }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700 }}>{t("bus.alertTitle")}</div>
                  <div style={{ fontSize: 13, color: C.ink }}>{t("bus.alertBody")}</div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <DemoStatusBar
        palette={palette}
        version={t("shell.version")}
        region={t("shell.region")}
        buildId={t("shell.buildId")}
      />
    </div>
  );
}
