"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  IconBarbell,
  IconUsers,
  IconCalendar,
  IconUser,
  IconLogin,
  IconReceipt2,
  IconChartBar,
  IconSettings,
  IconBuildingStore,
  IconActivity,
  IconUserPlus,
  IconAlertTriangle,
} from "@tabler/icons-react";
import {
  DemoTopBar,
  DemoStatusBar,
  DemoKpiStrip,
  DemoScreenHeader,
  DemoBadge,
} from "@/components/demo-shell";
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

type TabId =
  | "members"
  | "classes"
  | "trainers"
  | "checkin"
  | "schedule"
  | "billing"
  | "equipment"
  | "leads"
  | "analytics"
  | "settings";

export function GymDemo() {
  return (
    <DemoToastProvider palette={palette}>
      <GymInner />
    </DemoToastProvider>
  );
}

function GymInner() {
  const t = useTranslations("demoPreview.gym");
  const [tab, setTab] = useState<TabId>("members");
  const toast = useDemoToast();

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

  const TABS: { id: TabId; label: string; Icon: typeof IconUsers; group: "people" | "ops" }[] = [
    { id: "members", label: t("nav.members"), Icon: IconUsers, group: "people" },
    { id: "trainers", label: t("nav.trainers"), Icon: IconUser, group: "people" },
    { id: "leads", label: t("nav.leads"), Icon: IconUserPlus, group: "people" },
    { id: "checkin", label: t("nav.checkin"), Icon: IconLogin, group: "people" },
    { id: "classes", label: t("nav.classes"), Icon: IconCalendar, group: "ops" },
    { id: "schedule", label: t("nav.schedule"), Icon: IconActivity, group: "ops" },
    { id: "equipment", label: t("nav.equipment"), Icon: IconAlertTriangle, group: "ops" },
    { id: "billing", label: t("nav.billing"), Icon: IconReceipt2, group: "ops" },
    { id: "analytics", label: t("nav.analytics"), Icon: IconChartBar, group: "ops" },
    { id: "settings", label: t("nav.settings"), Icon: IconSettings, group: "ops" },
  ];

  const paletteItems: PaletteItem[] = TABS.map((tb) => ({
    id: tb.id,
    label: tb.label,
    group: t(`nav.groups.${tb.group}`),
    onRun: () => {
      setTab(tb.id);
      toast.push({ title: t("toast.navigated", { screen: tb.label }) });
    },
  }));

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
        rightSlot={<DemoCommandPalette palette={palette} items={paletteItems} placeholder={t("commandPalette.placeholder")} hint="⌘K" />}
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

          {(["people", "ops"] as const).map((g) => (
            <div key={g}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: C.muted, padding: "0 6px 6px" }}>
                {t(`nav.groups.${g}`)}
              </div>
              <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {TABS.filter((tb) => tb.group === g).map((tabItem) => {
                  const active = tab === tabItem.id;
                  const Icon = tabItem.Icon;
                  return (
                    <button
                      key={tabItem.id}
                      onClick={() => setTab(tabItem.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        background: active ? C.neon : "transparent",
                        color: active ? C.bg : C.ink,
                        border: "none",
                        padding: "8px 10px",
                        borderRadius: 8,
                        fontWeight: active ? 800 : 600,
                        fontSize: 12,
                        textTransform: "uppercase",
                        letterSpacing: 0.8,
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                    >
                      <Icon style={{ width: 14, height: 14 }} stroke={2} />
                      {tabItem.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          ))}
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

          {tab === "schedule" && (
            <section>
              <DemoScreenHeader palette={palette} eyebrow={t("shell.screen.schedule.eyebrow")} title={t("schedule.title")} subtitle={t("schedule.subtitle")} />
              <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 20 }}>
                <div style={{ fontSize: 11, color: C.muted, marginBottom: 14, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>
                  {t("schedule.heatmapLabel")}
                </div>
                <DemoHeatmap palette={palette} weeks={14} seed={5} ariaLabel={t("schedule.heatmapLabel")} />
                <p style={{ marginTop: 14, color: C.muted, fontSize: 12 }}>{t("schedule.heatmapNote")}</p>
              </div>
            </section>
          )}

          {tab === "billing" && (
            <section>
              <DemoScreenHeader palette={palette} eyebrow={t("shell.screen.billing.eyebrow")} title={t("billing.title")} subtitle={t("billing.subtitle")} />
              <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
                <div style={{ padding: "12px 20px", background: C.card, display: "grid", gridTemplateColumns: "1fr 110px 110px 110px 100px", fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: C.muted }}>
                  <span>{t("billing.col.member")}</span>
                  <span>{t("billing.col.plan")}</span>
                  <span style={{ textAlign: "right" }}>{t("billing.col.mrr")}</span>
                  <span>{t("billing.col.next")}</span>
                  <span>{t("billing.col.status")}</span>
                </div>
                {[
                  { name: "Tatiana K.", plan: "Pro · Annual", mrr: 89, next: "Jun 12", status: "paid" },
                  { name: "Marcus J.", plan: "Lite · Monthly", mrr: 29, next: "May 28", status: "paid" },
                  { name: "Anya R.", plan: "Pro · Quarterly", mrr: 79, next: "Jun 04", status: "due" },
                  { name: "Daler S.", plan: "Drop-in", mrr: 12, next: "—", status: "paid" },
                  { name: "Maya P.", plan: "Pro · Annual", mrr: 89, next: "Aug 21", status: "paid" },
                  { name: "Sergei V.", plan: "Lite · Monthly", mrr: 29, next: "May 24", status: "failed" },
                ].map((b) => (
                  <div key={b.name} style={{ display: "grid", gridTemplateColumns: "1fr 110px 110px 110px 100px", padding: "12px 20px", borderTop: `1px solid ${C.border}`, alignItems: "center", fontSize: 13 }}>
                    <span style={{ fontWeight: 600 }}>{b.name}</span>
                    <span style={{ color: C.muted }}>{b.plan}</span>
                    <span style={{ textAlign: "right", fontWeight: 700 }}>$<DemoCounter value={b.mrr} /></span>
                    <span style={{ color: C.muted, fontSize: 12 }}>{b.next}</span>
                    <DemoBadge palette={palette} variant={b.status === "paid" ? "success" : b.status === "due" ? "warn" : "danger"} label={t(`billing.status.${b.status}`)} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {tab === "equipment" && (
            <section>
              <DemoScreenHeader palette={palette} eyebrow={t("shell.screen.equipment.eyebrow")} title={t("equipment.title")} subtitle={t("equipment.subtitle")} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 18 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: 12 }}>
                  {[
                    { id: "T-01", name: "Treadmill 01", status: "online" },
                    { id: "T-02", name: "Treadmill 02", status: "online" },
                    { id: "T-03", name: "Treadmill 03", status: "service" },
                    { id: "R-01", name: "Rower 01", status: "online" },
                    { id: "R-02", name: "Rower 02", status: "offline" },
                    { id: "B-01", name: "Bike 01", status: "online" },
                    { id: "B-02", name: "Bike 02", status: "online" },
                    { id: "S-01", name: "Smith Rack", status: "online" },
                    { id: "C-01", name: "Cable Tower", status: "online" },
                    { id: "F-01", name: "Functional Rig", status: "service" },
                  ].map((e) => (
                    <div key={e.id} style={{ background: C.surface, border: `1px solid ${C.border}`, borderTop: `3px solid ${e.status === "online" ? C.neon : e.status === "service" ? "#fbbf24" : "#f87171"}`, borderRadius: 12, padding: 14 }}>
                      <div style={{ fontSize: 11, color: C.muted, fontFamily: "ui-monospace, monospace", fontWeight: 700 }}>{e.id}</div>
                      <div style={{ fontWeight: 700, fontSize: 13, marginTop: 4 }}>{e.name}</div>
                      <div style={{ marginTop: 8 }}>
                        <DemoBadge palette={palette} variant={e.status === "online" ? "success" : e.status === "service" ? "warn" : "danger"} label={t(`equipment.status.${e.status}`)} />
                      </div>
                    </div>
                  ))}
                </div>
                <DemoLiveFeed
                  palette={palette}
                  liveLabel={t("equipment.liveFeed")}
                  height={320}
                  initial={[
                    { id: "e1", title: "Treadmill 03 — service mode", meta: "Belt wear · 12s ago", tone: "warn" },
                    { id: "e2", title: "Rower 02 reconnected", meta: "Network OK · 1m ago", tone: "success" },
                    { id: "e3", title: "Functional Rig calibrated", meta: "3m ago", tone: "info" },
                  ]}
                  rotating={[
                    { id: "er1", title: "Smith Rack used", meta: "Member checked in", tone: "primary" },
                    { id: "er2", title: "Bike 01 firmware updated", meta: "v2.4.1", tone: "info" },
                    { id: "er3", title: "Treadmill 02 hot bearing", meta: "Auto-throttle on", tone: "warn" },
                  ]}
                />
              </div>
            </section>
          )}

          {tab === "leads" && (
            <section>
              <DemoScreenHeader palette={palette} eyebrow={t("shell.screen.leads.eyebrow")} title={t("leads.title")} subtitle={t("leads.subtitle")} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
                {(["new", "tour", "trial", "closed"] as const).map((stage, idx) => (
                  <div key={stage} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                      <span style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{t(`leads.stages.${stage}`)}</span>
                      <span style={{ background: C.neon, color: C.bg, borderRadius: 9999, padding: "2px 8px", fontSize: 10, fontWeight: 800 }}>
                        {[8, 5, 3, 12][idx]}
                      </span>
                    </div>
                    {([
                      ["Aigerim Y.", "WhatsApp"],
                      ["Faruh B.", "Walk-in"],
                      ["Liu W.", "Instagram"],
                    ] as [string, string][]).map(([name, src]) => (
                      <div key={name} style={{ padding: 10, background: C.card, borderRadius: 8, marginBottom: 8 }}>
                        <div style={{ fontWeight: 700, fontSize: 13 }}>{name}</div>
                        <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{src}</div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          )}

          {tab === "analytics" && (
            <section>
              <DemoScreenHeader palette={palette} eyebrow={t("shell.screen.analytics.eyebrow")} title={t("analytics.title")} subtitle={t("analytics.subtitle")} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 18, marginBottom: 18 }}>
                <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
                    <h3 style={{ fontSize: 16, margin: 0, fontWeight: 800 }}>{t("analytics.mrrTitle")}</h3>
                    <span style={{ fontSize: 11, color: C.muted }}>{t("analytics.last30")}</span>
                  </div>
                  <DemoChart data={[8400, 8900, 9200, 9800, 10200, 10800, 11200, 11800, 12200, 12800, 13200, 13600, 14000, 14600, 15200, 15800, 16200, 16800, 17400, 17800, 18400, 19000, 19600, 20200, 20800, 21400, 22000, 22600, 23200, 24000]} palette={palette} height={200} />
                </div>
                <DemoLiveFeed
                  palette={palette}
                  liveLabel={t("analytics.liveFeed")}
                  height={250}
                  initial={[
                    { id: "a1", title: "New signup: Maya P.", meta: "Pro Annual · just now", tone: "success" },
                    { id: "a2", title: "Class booked: HIIT", meta: "Mon 18:30 · 28s", tone: "primary" },
                    { id: "a3", title: "Cancellation: Sergei V.", meta: "1m ago", tone: "warn" },
                  ]}
                  rotating={[
                    { id: "ar1", title: "Trial converted: Faruh B.", meta: "Lite Monthly", tone: "success" },
                    { id: "ar2", title: "PT session booked", meta: "Sara · Fri 07:00", tone: "info" },
                    { id: "ar3", title: "Renewal: Tatiana K.", meta: "Pro Annual", tone: "success" },
                  ]}
                />
              </div>
              <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
                <h3 style={{ fontSize: 16, margin: "0 0 14px", fontWeight: 800 }}>{t("analytics.cohortTitle")}</h3>
                <DemoCohort palette={palette} rows={6} cols={8} />
                <p style={{ color: C.muted, fontSize: 12, marginTop: 12 }}>{t("analytics.cohortNote")}</p>
              </div>
            </section>
          )}

          {tab === "settings" && (
            <section>
              <DemoScreenHeader palette={palette} eyebrow={t("shell.screen.settings.eyebrow")} title={t("settings.title")} subtitle={t("settings.subtitle")} />
              <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22, marginBottom: 18 }}>
                <h3 style={{ fontSize: 14, fontWeight: 800, margin: "0 0 14px", textTransform: "uppercase", letterSpacing: 1 }}>{t("settings.basics")}</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {(["gymName", "currency", "openHours", "contact"] as const).map((f) => (
                    <div key={f}>
                      <label style={{ display: "block", fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700, marginBottom: 6 }}>
                        {t(`settings.fields.${f}`)}
                      </label>
                      <input
                        defaultValue={t(`settings.placeholders.${f}`)}
                        style={{ width: "100%", background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", fontSize: 13, color: C.ink, outline: "none", boxSizing: "border-box" }}
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => toast.push({ title: t("toast.settingsSaved"), tone: "success" })}
                  style={{ marginTop: 16, padding: "10px 18px", background: C.neon, color: C.bg, border: "none", borderRadius: 9999, fontWeight: 800, fontSize: 12, cursor: "pointer", letterSpacing: 1, textTransform: "uppercase" }}
                >
                  {t("settings.save")}
                </button>
              </div>
              <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
                <h3 style={{ fontSize: 14, fontWeight: 800, margin: "0 0 14px", textTransform: "uppercase", letterSpacing: 1, display: "flex", alignItems: "center", gap: 8 }}>
                  <IconBuildingStore size={16} stroke={2} />
                  {t("settings.integrationsTitle")}
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
                  {[
                    { name: "Stripe", emoji: "💳", on: true, desc: "settings.integrations.stripe" },
                    { name: "MindBody", emoji: "🧘", on: true, desc: "settings.integrations.mindbody" },
                    { name: "Mailchimp", emoji: "✉️", on: false, desc: "settings.integrations.mailchimp" },
                    { name: "Slack", emoji: "💬", on: true, desc: "settings.integrations.slack" },
                    { name: "QuickBooks", emoji: "📊", on: false, desc: "settings.integrations.quickbooks" },
                    { name: "Twilio", emoji: "📲", on: true, desc: "settings.integrations.twilio" },
                  ].map((i) => (
                    <div key={i.name} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 14 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <div style={{ fontSize: 22 }}>{i.emoji}</div>
                        <DemoBadge palette={palette} variant={i.on ? "success" : "neutral"} label={t(i.on ? "settings.connected" : "settings.disconnected")} />
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{i.name}</div>
                      <div style={{ color: C.muted, fontSize: 11, lineHeight: 1.5, marginTop: 4 }}>{t(i.desc)}</div>
                      <button
                        onClick={() => toast.push({ title: t(i.on ? "toast.disconnected" : "toast.connected", { name: i.name }), tone: i.on ? "warn" : "success" })}
                        style={{ marginTop: 8, padding: "5px 10px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 11, fontWeight: 700, color: C.ink, cursor: "pointer", textTransform: "uppercase", letterSpacing: 0.5 }}
                      >
                        {t(i.on ? "settings.disconnect" : "settings.connect")}
                      </button>
                    </div>
                  ))}
                </div>
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
