"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  IconBarbell,
  IconUsers,
  IconCalendar,
  IconUser,
  IconLogin,
} from "@tabler/icons-react";
import {
  DemoTopBar,
  DemoStatusBar,
  DemoKpiStrip,
  DemoScreenHeader,
  DemoBadge,
} from "@/components/demo-shell";

const C = {
  bg: "#0a0a0a",
  surface: "#141414",
  card: "#1c1c1c",
  ink: "#fafafa",
  muted: "#888",
  neon: "#a3e635",
  border: "#262626",
};

const palette = {
  bg: C.bg,
  paper: C.surface,
  ink: C.ink,
  muted: C.muted,
  primary: C.neon,
  border: C.border,
};

type TabId = "members" | "classes" | "trainers" | "checkin";

export function GymDemo() {
  const t = useTranslations("demoPreview.gym");
  const [tab, setTab] = useState<TabId>("members");

  const MEMBERS = [
    { n: t("members.list.tatiana"), plan: t("members.plans.proAnnual"), days: 312, status: t("members.status.active") },
    { n: t("members.list.marcus"), plan: t("members.plans.liteMonthly"), days: 28, status: t("members.status.active") },
    { n: t("members.list.anya"), plan: t("members.plans.proQuarterly"), days: 90, status: t("members.status.pending") },
    { n: t("members.list.daler"), plan: t("members.plans.dropIn"), days: 1, status: t("members.status.new") },
    { n: t("members.list.maya"), plan: t("members.plans.proAnnual"), days: 184, status: t("members.status.active") },
    { n: t("members.list.sergei"), plan: t("members.plans.liteMonthly"), days: 9, status: t("members.status.expiring") },
  ];

  const CLASSES = [
    { name: t("classes.list.0.name"), day: t("classes.days.mon"), time: "07:00", coach: t("coaches.sara"), booked: 18, max: 20 },
    { name: t("classes.list.1.name"), day: t("classes.days.mon"), time: "18:30", coach: t("coaches.mira"), booked: 12, max: 14 },
    { name: t("classes.list.2.name"), day: t("classes.days.tue"), time: "06:30", coach: t("coaches.alex"), booked: 14, max: 16 },
    { name: t("classes.list.3.name"), day: t("classes.days.tue"), time: "19:00", coach: t("coaches.jordan"), booked: 9, max: 14 },
    { name: t("classes.list.4.name"), day: t("classes.days.wed"), time: "12:00", coach: t("coaches.sam"), booked: 6, max: 10 },
    { name: t("classes.list.5.name"), day: t("classes.days.wed"), time: "18:00", coach: t("coaches.mira"), booked: 12, max: 12 },
    { name: t("classes.list.6.name"), day: t("classes.days.thu"), time: "07:00", coach: t("coaches.sara"), booked: 16, max: 20 },
    { name: t("classes.list.7.name"), day: t("classes.days.thu"), time: "19:30", coach: t("coaches.alex"), booked: 8, max: 16 },
    { name: t("classes.list.8.name"), day: t("classes.days.fri"), time: "06:30", coach: t("coaches.jordan"), booked: 11, max: 14 },
    { name: t("classes.list.9.name"), day: t("classes.days.fri"), time: "18:30", coach: t("coaches.mira"), booked: 13, max: 14 },
    { name: t("classes.list.10.name"), day: t("classes.days.sat"), time: "09:00", coach: t("coaches.sam"), booked: 15, max: 18 },
    { name: t("classes.list.11.name"), day: t("classes.days.sat"), time: "11:00", coach: t("coaches.sara"), booked: 17, max: 20 },
  ];

  const TRAINERS = [
    { name: t("trainers.list.0.name"), specialty: t("trainers.list.0.specialty"), sessions: 22, color: "#a3e635" },
    { name: t("trainers.list.1.name"), specialty: t("trainers.list.1.specialty"), sessions: 18, color: "#fbbf24" },
    { name: t("trainers.list.2.name"), specialty: t("trainers.list.2.specialty"), sessions: 25, color: "#60a5fa" },
    { name: t("trainers.list.3.name"), specialty: t("trainers.list.3.specialty"), sessions: 14, color: "#f472b6" },
    { name: t("trainers.list.4.name"), specialty: t("trainers.list.4.specialty"), sessions: 20, color: "#34d399" },
    { name: t("trainers.list.5.name"), specialty: t("trainers.list.5.specialty"), sessions: 16, color: "#c084fc" },
  ];

  const CHECKINS = [
    { name: t("checkin.feed.0.name"), at: "10:42", type: t("checkin.types.gym") },
    { name: t("checkin.feed.1.name"), at: "10:38", type: t("checkin.types.class") },
    { name: t("checkin.feed.2.name"), at: "10:31", type: t("checkin.types.gym") },
    { name: t("checkin.feed.3.name"), at: "10:24", type: t("checkin.types.pt") },
    { name: t("checkin.feed.4.name"), at: "10:18", type: t("checkin.types.gym") },
    { name: t("checkin.feed.5.name"), at: "10:11", type: t("checkin.types.class") },
    { name: t("checkin.feed.6.name"), at: "10:03", type: t("checkin.types.gym") },
    { name: t("checkin.feed.7.name"), at: "09:57", type: t("checkin.types.gym") },
    { name: t("checkin.feed.8.name"), at: "09:50", type: t("checkin.types.pt") },
    { name: t("checkin.feed.9.name"), at: "09:42", type: t("checkin.types.gym") },
    { name: t("checkin.feed.10.name"), at: "09:35", type: t("checkin.types.class") },
    { name: t("checkin.feed.11.name"), at: "09:28", type: t("checkin.types.gym") },
  ];

  const initials = (name: string) =>
    name
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("");

  const TABS: { id: TabId; label: string; Icon: typeof IconUsers }[] = [
    { id: "members", label: t("nav.members"), Icon: IconUsers },
    { id: "classes", label: t("nav.classes"), Icon: IconCalendar },
    { id: "trainers", label: t("nav.trainers"), Icon: IconUser },
    { id: "checkin", label: t("nav.checkin"), Icon: IconLogin },
  ];

  const memberStatusVariant = (status: string): "success" | "warn" | "info" | "neutral" => {
    if (status === t("members.status.active")) return "success";
    if (status === t("members.status.expiring")) return "warn";
    if (status === t("members.status.new")) return "info";
    if (status === t("members.status.pending")) return "warn";
    return "neutral";
  };

  const brandMark = (
    <div
      style={{
        width: 24,
        height: 24,
        background: C.neon,
        color: C.bg,
        display: "grid",
        placeItems: "center",
        borderRadius: 6,
      }}
    >
      <IconBarbell style={{ width: 16, height: 16 }} stroke={2} />
    </div>
  );

  const membersKpis = [
    {
      label: t("shell.kpi.members.totalLabel"),
      value: t("shell.kpi.members.totalValue"),
      trend: t("shell.kpi.members.totalTrend"),
      spark: [180, 192, 205, 214, 221, 230, 239, 247, 256, 264, 271, 282],
    },
    {
      label: t("shell.kpi.members.newLabel"),
      value: t("shell.kpi.members.newValue"),
      trend: t("shell.kpi.members.newTrend"),
      spark: [3, 5, 4, 7, 9, 8, 12, 14, 11, 16, 18, 21],
    },
    {
      label: t("shell.kpi.members.churnLabel"),
      value: t("shell.kpi.members.churnValue"),
      trend: t("shell.kpi.members.churnTrend"),
      spark: [5.2, 4.9, 4.7, 4.4, 4.1, 3.9, 3.6, 3.4, 3.2, 3.1, 3.0, 2.8],
    },
    {
      label: t("shell.kpi.members.ltvLabel"),
      value: t("shell.kpi.members.ltvValue"),
      trend: t("shell.kpi.members.ltvTrend"),
      spark: [820, 845, 870, 902, 928, 954, 980, 1010, 1042, 1078, 1115, 1156],
    },
  ];

  const classesKpis = [
    {
      label: t("shell.kpi.classes.weekLabel"),
      value: t("shell.kpi.classes.weekValue"),
      trend: t("shell.kpi.classes.weekTrend"),
      spark: [34, 38, 41, 39, 44, 47, 50, 48, 52, 54, 56, 58],
    },
    {
      label: t("shell.kpi.classes.fillLabel"),
      value: t("shell.kpi.classes.fillValue"),
      trend: t("shell.kpi.classes.fillTrend"),
      spark: [62, 65, 68, 70, 72, 74, 76, 79, 81, 83, 85, 87],
    },
    {
      label: t("shell.kpi.classes.topLabel"),
      value: t("shell.kpi.classes.topValue"),
      trend: t("shell.kpi.classes.topTrend"),
      spark: [12, 14, 13, 16, 15, 17, 18, 17, 19, 20, 19, 21],
    },
    {
      label: t("shell.kpi.classes.instructorsLabel"),
      value: t("shell.kpi.classes.instructorsValue"),
      trend: t("shell.kpi.classes.instructorsTrend"),
      spark: [4, 5, 5, 6, 6, 6, 7, 7, 6, 7, 8, 8],
    },
  ];

  const trainersKpis = [
    {
      label: t("shell.kpi.trainers.totalLabel"),
      value: t("shell.kpi.trainers.totalValue"),
      trend: t("shell.kpi.trainers.totalTrend"),
      spark: [4, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8],
    },
    {
      label: t("shell.kpi.trainers.sessionsLabel"),
      value: t("shell.kpi.trainers.sessionsValue"),
      trend: t("shell.kpi.trainers.sessionsTrend"),
      spark: [86, 92, 98, 102, 108, 112, 118, 121, 124, 128, 132, 135],
    },
    {
      label: t("shell.kpi.trainers.ratingLabel"),
      value: t("shell.kpi.trainers.ratingValue"),
      trend: t("shell.kpi.trainers.ratingTrend"),
      spark: [4.5, 4.6, 4.6, 4.7, 4.7, 4.7, 4.8, 4.8, 4.8, 4.9, 4.9, 4.9],
    },
    {
      label: t("shell.kpi.trainers.payrollLabel"),
      value: t("shell.kpi.trainers.payrollValue"),
      trend: t("shell.kpi.trainers.payrollTrend"),
      spark: [10, 11, 11, 12, 12, 12, 13, 13, 13, 14, 14, 14],
    },
  ];

  const checkinKpis = [
    {
      label: t("shell.kpi.checkin.insideLabel"),
      value: t("shell.kpi.checkin.insideValue"),
      trend: t("shell.kpi.checkin.insideTrend"),
      spark: [22, 31, 38, 45, 52, 58, 61, 64, 65, 66, 67, 67],
    },
    {
      label: t("shell.kpi.checkin.todayLabel"),
      value: t("shell.kpi.checkin.todayValue"),
      trend: t("shell.kpi.checkin.todayTrend"),
      spark: [120, 168, 210, 254, 298, 332, 358, 380, 398, 412, 425, 438],
    },
    {
      label: t("shell.kpi.checkin.peakLabel"),
      value: t("shell.kpi.checkin.peakValue"),
      trend: t("shell.kpi.checkin.peakTrend"),
      spark: [60, 65, 72, 78, 82, 88, 90, 92, 91, 90, 89, 88],
    },
    {
      label: t("shell.kpi.checkin.avgLabel"),
      value: t("shell.kpi.checkin.avgValue"),
      trend: t("shell.kpi.checkin.avgTrend"),
      spark: [58, 60, 62, 63, 64, 65, 66, 67, 68, 68, 69, 70],
    },
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.ink, fontFamily: "Inter, ui-sans-serif", display: "flex", flexDirection: "column" }}>
      <DemoTopBar
        palette={palette}
        brandName={t("brand")}
        brandMark={brandMark}
        breadcrumb={t(`shell.breadcrumb.${tab}`)}
        searchPlaceholder={t("shell.searchPlaceholder")}
        userName={t("shell.userName")}
        userInitials={t("shell.userInitials")}
      />

      <div style={{ flex: 1, display: "flex" }}>
        <aside
          style={{
            width: 220,
            borderRight: `1px solid ${C.border}`,
            padding: "24px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 24,
            background: C.surface,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 4px" }}>
            <div style={{ width: 38, height: 38, background: C.neon, color: C.bg, display: "grid", placeItems: "center", borderRadius: 10 }}>
              <IconBarbell style={{ width: 20, height: 20 }} stroke={2} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, letterSpacing: -0.5 }}>{t("brand")}</div>
              <div style={{ fontSize: 10, color: C.muted, letterSpacing: 2, textTransform: "uppercase" }}>
                {t("tagline")}
              </div>
            </div>
          </div>

          <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {TABS.map((tabItem) => {
              const active = tab === tabItem.id;
              const Icon = tabItem.Icon;
              return (
                <button
                  key={tabItem.id}
                  onClick={() => setTab(tabItem.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    background: active ? C.neon : "transparent",
                    color: active ? C.bg : C.ink,
                    border: "none",
                    padding: "10px 14px",
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <Icon style={{ width: 16, height: 16 }} stroke={2} />
                  {tabItem.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <main style={{ flex: 1, padding: 32, maxWidth: 1400, margin: "0 auto" }}>
          {tab === "members" && (
            <section>
              <DemoKpiStrip palette={palette} items={membersKpis} />
              <DemoScreenHeader
                palette={palette}
                eyebrow={t("shell.screen.members.eyebrow")}
                title={t("members.heading")}
                subtitle={t("members.subheading")}
              />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
                {MEMBERS.map((m) => (
                  <div key={m.n} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 999,
                          background: C.neon,
                          color: C.bg,
                          display: "grid",
                          placeItems: "center",
                          fontWeight: 800,
                        }}
                      >
                        {m.n[0]}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{m.n}</div>
                        <div style={{ fontSize: 11, color: C.muted }}>{m.plan}</div>
                      </div>
                    </div>
                    <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, color: C.muted }}>
                      <span>
                        {t("members.dayPrefix")} {m.days}
                      </span>
                      <DemoBadge palette={palette} variant={memberStatusVariant(m.status)} label={m.status} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {tab === "classes" && (
            <section>
              <DemoKpiStrip palette={palette} items={classesKpis} />
              <DemoScreenHeader
                palette={palette}
                eyebrow={t("shell.screen.classes.eyebrow")}
                title={t("classes.title")}
                subtitle={t("classes.subtitle")}
              />
              <div
                style={{
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: 14,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "120px 1fr 1fr 1fr 140px",
                    padding: "12px 20px",
                    background: C.card,
                    fontSize: 11,
                    color: C.muted,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    fontWeight: 700,
                    borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  <span>{t("classes.col.when")}</span>
                  <span>{t("classes.col.class")}</span>
                  <span>{t("classes.col.instructor")}</span>
                  <span>{t("classes.col.capacity")}</span>
                  <span style={{ textAlign: "right" }}>{t("classes.col.fill")}</span>
                </div>
                {CLASSES.map((cl, i) => {
                  const pct = (cl.booked / cl.max) * 100;
                  const full = cl.booked >= cl.max;
                  return (
                    <div
                      key={i}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "120px 1fr 1fr 1fr 140px",
                        padding: "14px 20px",
                        borderBottom: i === CLASSES.length - 1 ? "none" : `1px solid ${C.border}`,
                        alignItems: "center",
                        fontSize: 13,
                      }}
                    >
                      <span style={{ fontWeight: 700 }}>
                        {cl.day} · {cl.time}
                      </span>
                      <span style={{ fontWeight: 600 }}>{cl.name}</span>
                      <span style={{ color: C.muted }}>{cl.coach}</span>
                      <span style={{ color: full ? "#f87171" : C.ink }}>
                        {cl.booked}/{cl.max}
                      </span>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "flex-end" }}>
                        <div style={{ width: 80, height: 6, background: C.card, borderRadius: 999, overflow: "hidden" }}>
                          <div style={{ width: `${pct}%`, height: "100%", background: full ? "#f87171" : C.neon }} />
                        </div>
                        <span style={{ fontSize: 11, color: C.muted, width: 30, textAlign: "right" }}>{Math.round(pct)}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {tab === "trainers" && (
            <section>
              <DemoKpiStrip palette={palette} items={trainersKpis} />
              <DemoScreenHeader
                palette={palette}
                eyebrow={t("shell.screen.trainers.eyebrow")}
                title={t("trainers.title")}
                subtitle={t("trainers.subtitle")}
              />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
                {TRAINERS.map((tr) => (
                  <div
                    key={tr.name}
                    style={{
                      background: C.surface,
                      border: `1px solid ${C.border}`,
                      borderRadius: 14,
                      padding: 20,
                      display: "flex",
                      flexDirection: "column",
                      gap: 14,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: 999,
                          background: tr.color,
                          color: C.bg,
                          display: "grid",
                          placeItems: "center",
                          fontWeight: 800,
                          fontSize: 18,
                        }}
                      >
                        {initials(tr.name)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: 16 }}>{tr.name}</div>
                        <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{tr.specialty}</div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 12px",
                        background: C.card,
                        borderRadius: 10,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <IconCalendar style={{ width: 14, height: 14, color: C.neon }} stroke={2} />
                        <span style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 1 }}>
                          {t("trainers.sessionsThisWeek")}
                        </span>
                      </div>
                      <span style={{ fontWeight: 800, fontSize: 18 }}>{tr.sessions}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {tab === "checkin" && (
            <section>
              <DemoKpiStrip palette={palette} items={checkinKpis} />
              <DemoScreenHeader
                palette={palette}
                eyebrow={t("shell.screen.checkin.eyebrow")}
                title={t("checkin.title")}
                subtitle={t("checkin.subtitle")}
              />

              <div
                style={{
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: 16,
                  padding: 32,
                  marginBottom: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>
                    {t("checkin.currentlyInside")}
                  </div>
                  <div style={{ fontSize: 72, fontWeight: 900, color: C.neon, letterSpacing: -3, lineHeight: 1 }}>67</div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 8 }}>{t("checkin.peakToday")}</div>
                </div>
                <div
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 999,
                    background: C.bg,
                    border: `4px solid ${C.neon}`,
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <IconLogin style={{ width: 56, height: 56, color: C.neon }} stroke={2} />
                </div>
              </div>

              <div
                style={{
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: 14,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "12px 20px",
                    background: C.card,
                    borderBottom: `1px solid ${C.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>
                    {t("checkin.liveFeed")}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: C.neon }}>
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: C.neon }} />
                    {t("checkin.live")}
                  </span>
                </div>
                {CHECKINS.map((entry, i) => (
                  <div
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "80px 1fr auto auto",
                      alignItems: "center",
                      gap: 16,
                      padding: "12px 20px",
                      borderBottom: i === CHECKINS.length - 1 ? "none" : `1px solid ${C.border}`,
                    }}
                  >
                    <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 13, color: C.neon, fontWeight: 700 }}>
                      {entry.at}
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 999,
                          background: C.card,
                          border: `1px solid ${C.border}`,
                          display: "grid",
                          placeItems: "center",
                          fontSize: 10,
                          fontWeight: 800,
                        }}
                      >
                        {initials(entry.name)}
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{entry.name}</span>
                    </div>
                    <DemoBadge palette={palette} variant="info" label={entry.type} />
                    <IconLogin style={{ width: 14, height: 14, color: C.neon }} stroke={2} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>

      <DemoStatusBar
        palette={palette}
        version={t("shell.statusBar.version")}
        region={t("shell.statusBar.region")}
        buildId={t("shell.statusBar.buildId")}
      />
    </div>
  );
}
