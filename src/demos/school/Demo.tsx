"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Backpack,
  CheckCircle,
  WarningCircle,
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

  const stats = [
    { Icon: CheckCircle, label: t("stats.attendance"), v: t("stats.attendanceValue"), c: C.green },
    { Icon: Star, label: t("stats.stars"), v: t("stats.starsValue"), c: C.yellow },
    { Icon: WarningCircle, label: t("stats.overdue"), v: t("stats.overdueValue"), c: C.green },
  ];

  const attendanceLog = [
    { date: t("attendance.days.mon"), status: t("attendance.statusPresent"), checkIn: "08:12", checkOut: "15:05", present: true },
    { date: t("attendance.days.tue"), status: t("attendance.statusPresent"), checkIn: "08:08", checkOut: "15:02", present: true },
    { date: t("attendance.days.wed"), status: t("attendance.statusLate"), checkIn: "08:34", checkOut: "15:04", present: true },
    { date: t("attendance.days.thu"), status: t("attendance.statusPresent"), checkIn: "08:10", checkOut: "15:00", present: true },
    { date: t("attendance.days.fri"), status: t("attendance.statusPresent"), checkIn: "08:06", checkOut: "—", present: true },
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
      color: C.green,
    },
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

      <nav style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px", display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
        {tabs.map((tabItem) => (
          <button
            key={tabItem.id}
            onClick={() => setTab(tabItem.id)}
            style={{
              background: tab === tabItem.id ? C.paper : "transparent",
              color: tab === tabItem.id ? C.ink : C.muted,
              border: "none",
              padding: "10px 16px",
              borderRadius: "12px 12px 0 0",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <tabItem.Icon size={16} weight="duotone" />
            {tabItem.label}
          </button>
        ))}
      </nav>

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px 28px" }}>
        {tab === "attendance" && (
          <div style={{ background: C.paper, borderRadius: "0 12px 12px 12px", padding: 24 }}>
            <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>{t("attendance.greeting")}</h1>
            <p style={{ color: C.muted, marginBottom: 22 }}>{t("attendance.subGreeting")}</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
              {stats.map((s) => (
                <div key={s.label} style={{ background: C.bg, borderRadius: 12, padding: 16 }}>
                  <s.Icon size={18} weight="duotone" style={{ color: s.c }} />
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>{s.v}</div>
                </div>
              ))}
            </div>

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
                    <div style={{ fontWeight: 600 }}>{row.status}</div>
                    <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>
                      {t("attendance.in")} {row.checkIn} · {t("attendance.out")} {row.checkOut}
                    </div>
                  </div>
                  <CheckCircle size={18} weight="duotone" style={{ color: C.green }} />
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
          </div>
        )}

        {tab === "schedule" && (
          <div style={{ background: C.paper, borderRadius: "0 12px 12px 12px", padding: 24 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>{t("schedule.title")}</h1>
            <p style={{ color: C.muted, marginBottom: 22 }}>{t("schedule.sub")}</p>
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
                    <CheckCircle size={16} weight="duotone" style={{ color: C.green }} />
                  ) : (
                    <span style={{ fontSize: 11, color: C.primary, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                      {t("schedule.upcoming")}
                    </span>
                  )}
                </div>
              ))}
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
                  <div style={{ fontSize: 13, color: g.trend === "↑" ? C.green : g.trend === "↓" ? C.red : C.muted, marginTop: 4 }}>
                    {g.trend} {t("grades.vsLastTerm")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "bus" && (
          <div style={{ background: C.paper, borderRadius: "0 12px 12px 12px", padding: 24 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>{t("bus.title")}</h1>
            <p style={{ color: C.muted, marginBottom: 22 }}>{t("bus.sub")}</p>

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
                      <span
                        style={{
                          display: "inline-block",
                          padding: "4px 10px",
                          background: b.status === t("bus.statusArrived") ? C.green : C.primary,
                          color: "white",
                          borderRadius: 9999,
                          fontSize: 11,
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: 0.6,
                        }}
                      >
                        {b.status}
                      </span>
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
          </div>
        )}
      </main>
    </div>
  );
}
