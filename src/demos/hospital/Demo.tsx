"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  IconStethoscope,
  IconCalendar,
  IconPill,
  IconUser,
  IconFlask,
  IconUsers,
  IconReceipt2,
  IconBuildingHospital,
  IconChartBar,
  IconSettings,
  IconClipboardList,
  IconPlug,
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
  bg: "#f0fdfa",
  paper: "#ffffff",
  ink: "#0f2c2c",
  muted: "#557575",
  primary: "#0d9488",
  primaryDark: "#0f766e",
  red: "#dc2626",
  yellow: "#ca8a04",
  blue: "#2563eb",
  border: "#cbeae5",
  card: "#e6f7f4",
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
  | "appointments"
  | "patients"
  | "doctors"
  | "prescriptions"
  | "lab"
  | "billing"
  | "departments"
  | "schedule"
  | "analytics"
  | "settings";

type GroupId = "clinical" | "operations" | "admin";

export function HospitalDemo() {
  return (
    <DemoToastProvider palette={palette}>
      <HospitalInner />
    </DemoToastProvider>
  );
}

function HospitalInner() {
  const t = useTranslations("demoPreview.hospital");
  const [tab, setTab] = useState<TabId>("appointments");
  const toast = useDemoToast();

  const initials = (name: string) =>
    name
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("");

  const TABS: { id: TabId; label: string; Icon: typeof IconUsers; group: GroupId }[] = [
    { id: "appointments", label: t("nav.appointments"), Icon: IconCalendar, group: "clinical" },
    { id: "patients", label: t("nav.patients"), Icon: IconUsers, group: "clinical" },
    { id: "doctors", label: t("nav.doctors"), Icon: IconUser, group: "clinical" },
    { id: "prescriptions", label: t("nav.prescriptions"), Icon: IconPill, group: "clinical" },
    { id: "lab", label: t("nav.lab"), Icon: IconFlask, group: "clinical" },
    { id: "billing", label: t("nav.billing"), Icon: IconReceipt2, group: "operations" },
    { id: "departments", label: t("nav.departments"), Icon: IconBuildingHospital, group: "operations" },
    { id: "schedule", label: t("nav.schedule"), Icon: IconClipboardList, group: "operations" },
    { id: "analytics", label: t("nav.analytics"), Icon: IconChartBar, group: "admin" },
    { id: "settings", label: t("nav.settings"), Icon: IconSettings, group: "admin" },
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

  /* ───────── DATA ───────── */

  const APPOINTMENTS = [
    { time: "09:00", patient: t("appointments.list.0.patient"), reason: t("appointments.list.0.reason"), room: "C-3", doctor: t("doctors.list.0.name"), statusKey: "waiting" as const },
    { time: "09:30", patient: t("appointments.list.1.patient"), reason: t("appointments.list.1.reason"), room: "B-1", doctor: t("doctors.list.1.name"), statusKey: "inRoom" as const },
    { time: "10:15", patient: t("appointments.list.2.patient"), reason: t("appointments.list.2.reason"), room: "C-4", doctor: t("doctors.list.2.name"), statusKey: "scheduled" as const },
    { time: "11:00", patient: t("appointments.list.3.patient"), reason: t("appointments.list.3.reason"), room: "B-2", doctor: t("doctors.list.0.name"), statusKey: "scheduled" as const },
    { time: "11:30", patient: t("appointments.list.4.patient"), reason: t("appointments.list.4.reason"), room: "C-3", doctor: t("doctors.list.3.name"), statusKey: "scheduled" as const },
    { time: "13:00", patient: t("appointments.list.5.patient"), reason: t("appointments.list.5.reason"), room: "A-1", doctor: t("doctors.list.4.name"), statusKey: "scheduled" as const },
    { time: "14:00", patient: t("appointments.list.6.patient"), reason: t("appointments.list.6.reason"), room: "B-3", doctor: t("doctors.list.1.name"), statusKey: "scheduled" as const },
    { time: "15:30", patient: t("appointments.list.7.patient"), reason: t("appointments.list.7.reason"), room: "C-2", doctor: t("doctors.list.5.name"), statusKey: "scheduled" as const },
  ];

  const PATIENTS = Array.from({ length: 9 }, (_, i) => ({
    name: t(`patients.list.${i}.name`),
    mrn: t(`patients.list.${i}.mrn`),
    age: t(`patients.list.${i}.age`),
    condition: t(`patients.list.${i}.condition`),
    lastVisit: t(`patients.list.${i}.lastVisit`),
    riskKey: t(`patients.list.${i}.riskKey`) as "low" | "med" | "high",
  }));

  const DOCTORS = [
    { name: t("doctors.list.0.name"), specialty: t("doctors.list.0.specialty"), patients: 124, rating: "4.9", color: "#0d9488", onCallKey: "true" },
    { name: t("doctors.list.1.name"), specialty: t("doctors.list.1.specialty"), patients: 98, rating: "4.8", color: "#2563eb", onCallKey: "true" },
    { name: t("doctors.list.2.name"), specialty: t("doctors.list.2.specialty"), patients: 156, rating: "4.9", color: "#7c3aed", onCallKey: "false" },
    { name: t("doctors.list.3.name"), specialty: t("doctors.list.3.specialty"), patients: 87, rating: "4.7", color: "#ca8a04", onCallKey: "true" },
    { name: t("doctors.list.4.name"), specialty: t("doctors.list.4.specialty"), patients: 112, rating: "4.8", color: "#dc2626", onCallKey: "false" },
    { name: t("doctors.list.5.name"), specialty: t("doctors.list.5.specialty"), patients: 142, rating: "4.9", color: "#16a34a", onCallKey: "true" },
  ];

  const PRESCRIPTIONS = Array.from({ length: 10 }, (_, i) => ({
    patient: t(`prescriptions.items.${i}.patient`),
    drug: t(`prescriptions.items.${i}.drug`),
    dosage: t(`prescriptions.items.${i}.dosage`),
    frequency: t(`prescriptions.items.${i}.frequency`),
    refills: t(`prescriptions.items.${i}.refills`),
    date: t(`prescriptions.items.${i}.date`),
  }));

  const LABS = Array.from({ length: 8 }, (_, i) => ({
    patient: t(`lab.items.${i}.patient`),
    test: t(`lab.items.${i}.test`),
    value: t(`lab.items.${i}.value`),
    range: t(`lab.items.${i}.range`),
    flag: t(`lab.items.${i}.flag`),
    abnormal: t(`lab.items.${i}.abnormal`) === "true",
    date: t(`lab.items.${i}.date`),
  }));

  const BILLING = [
    { name: t("billing.items.0.patient"), service: t("billing.items.0.service"), amount: 1240, insurance: t("billing.items.0.insurance"), statusKey: "paid" as const },
    { name: t("billing.items.1.patient"), service: t("billing.items.1.service"), amount: 380, insurance: t("billing.items.1.insurance"), statusKey: "pending" as const },
    { name: t("billing.items.2.patient"), service: t("billing.items.2.service"), amount: 2680, insurance: t("billing.items.2.insurance"), statusKey: "paid" as const },
    { name: t("billing.items.3.patient"), service: t("billing.items.3.service"), amount: 95, insurance: t("billing.items.3.insurance"), statusKey: "denied" as const },
    { name: t("billing.items.4.patient"), service: t("billing.items.4.service"), amount: 540, insurance: t("billing.items.4.insurance"), statusKey: "paid" as const },
    { name: t("billing.items.5.patient"), service: t("billing.items.5.service"), amount: 1820, insurance: t("billing.items.5.insurance"), statusKey: "pending" as const },
    { name: t("billing.items.6.patient"), service: t("billing.items.6.service"), amount: 320, insurance: t("billing.items.6.insurance"), statusKey: "paid" as const },
  ];

  const DEPARTMENTS = [
    { id: "ER", name: t("departments.list.0.name"), beds: 28, occupied: 24, head: t("departments.list.0.head") },
    { id: "ICU", name: t("departments.list.1.name"), beds: 16, occupied: 12, head: t("departments.list.1.head") },
    { id: "CARD", name: t("departments.list.2.name"), beds: 32, occupied: 19, head: t("departments.list.2.head") },
    { id: "PED", name: t("departments.list.3.name"), beds: 24, occupied: 10, head: t("departments.list.3.head") },
    { id: "ORTH", name: t("departments.list.4.name"), beds: 20, occupied: 14, head: t("departments.list.4.head") },
    { id: "ONC", name: t("departments.list.5.name"), beds: 18, occupied: 15, head: t("departments.list.5.head") },
  ];

  const SHIFTS = Array.from({ length: 6 }, (_, i) => ({
    doctor: t(`schedule.shifts.${i}.doctor`),
    role: t(`schedule.shifts.${i}.role`),
    mon: t(`schedule.shifts.${i}.mon`),
    tue: t(`schedule.shifts.${i}.tue`),
    wed: t(`schedule.shifts.${i}.wed`),
    thu: t(`schedule.shifts.${i}.thu`),
    fri: t(`schedule.shifts.${i}.fri`),
    sat: t(`schedule.shifts.${i}.sat`),
    sun: t(`schedule.shifts.${i}.sun`),
  }));

  /* ───────── KPIs ───────── */

  const appointmentsKpis = [
    { label: t("kpi.appointments.0.label"), value: t("kpi.appointments.0.value"), trend: t("kpi.appointments.0.trend"), spark: [8, 10, 12, 11, 13, 14, 13, 14] },
    { label: t("kpi.appointments.1.label"), value: t("kpi.appointments.1.value"), trend: t("kpi.appointments.1.trend"), spark: [1, 2, 3, 3, 4, 4, 5, 6] },
    { label: t("kpi.appointments.2.label"), value: t("kpi.appointments.2.value"), trend: t("kpi.appointments.2.trend"), spark: [6, 5, 4, 5, 4, 3, 3, 2] },
    { label: t("kpi.appointments.3.label"), value: t("kpi.appointments.3.value"), trend: t("kpi.appointments.3.trend"), spark: [12, 14, 11, 13, 10, 12, 9, 11] },
  ];

  const patientsKpis = [
    { label: t("kpi.patients.0.label"), value: t("kpi.patients.0.value"), trend: t("kpi.patients.0.trend"), spark: [820, 845, 870, 890, 910, 932, 948, 962] },
    { label: t("kpi.patients.1.label"), value: t("kpi.patients.1.value"), trend: t("kpi.patients.1.trend"), spark: [12, 14, 17, 18, 20, 22, 25, 27] },
    { label: t("kpi.patients.2.label"), value: t("kpi.patients.2.value"), trend: t("kpi.patients.2.trend"), spark: [10, 8, 9, 7, 6, 5, 4, 4] },
    { label: t("kpi.patients.3.label"), value: t("kpi.patients.3.value"), trend: t("kpi.patients.3.trend"), spark: [1, 2, 3, 2, 4, 3, 3, 2] },
  ];

  const doctorsKpis = [
    { label: t("kpi.doctors.0.label"), value: t("kpi.doctors.0.value"), trend: t("kpi.doctors.0.trend"), spark: [38, 40, 41, 42, 43, 44, 45, 46] },
    { label: t("kpi.doctors.1.label"), value: t("kpi.doctors.1.value"), trend: t("kpi.doctors.1.trend"), spark: [16, 18, 20, 19, 21, 22, 23, 24] },
    { label: t("kpi.doctors.2.label"), value: t("kpi.doctors.2.value"), trend: t("kpi.doctors.2.trend"), spark: [4.5, 4.6, 4.7, 4.7, 4.8, 4.8, 4.9, 4.9] },
    { label: t("kpi.doctors.3.label"), value: t("kpi.doctors.3.value"), trend: t("kpi.doctors.3.trend"), spark: [120, 124, 128, 132, 136, 140, 144, 148] },
  ];

  const prescriptionsKpis = [
    { label: t("kpi.prescriptions.0.label"), value: t("kpi.prescriptions.0.value"), trend: t("kpi.prescriptions.0.trend"), spark: [220, 232, 244, 251, 260, 268, 274, 282] },
    { label: t("kpi.prescriptions.1.label"), value: t("kpi.prescriptions.1.value"), trend: t("kpi.prescriptions.1.trend"), spark: [6, 8, 10, 9, 11, 12, 11, 13] },
    { label: t("kpi.prescriptions.2.label"), value: t("kpi.prescriptions.2.value"), trend: t("kpi.prescriptions.2.trend"), spark: [4, 5, 4, 5, 6, 5, 6, 7] },
    { label: t("kpi.prescriptions.3.label"), value: t("kpi.prescriptions.3.value"), trend: t("kpi.prescriptions.3.trend"), spark: [2, 1, 2, 1, 2, 1, 0, 1] },
  ];

  const labKpis = [
    { label: t("kpi.lab.0.label"), value: t("kpi.lab.0.value"), trend: t("kpi.lab.0.trend"), spark: [12, 14, 16, 15, 18, 17, 19, 18] },
    { label: t("kpi.lab.1.label"), value: t("kpi.lab.1.value"), trend: t("kpi.lab.1.trend"), spark: [3, 4, 3, 5, 4, 5, 6, 5] },
    { label: t("kpi.lab.2.label"), value: t("kpi.lab.2.value"), trend: t("kpi.lab.2.trend"), spark: [120, 115, 110, 108, 102, 98, 95, 92] },
    { label: t("kpi.lab.3.label"), value: t("kpi.lab.3.value"), trend: t("kpi.lab.3.trend"), spark: [42, 48, 56, 62, 58, 66, 72, 76] },
  ];

  const billingKpis = [
    { label: t("kpi.billing.0.label"), value: t("kpi.billing.0.value"), trend: t("kpi.billing.0.trend"), spark: [120, 132, 144, 156, 168, 180, 192, 208] },
    { label: t("kpi.billing.1.label"), value: t("kpi.billing.1.value"), trend: t("kpi.billing.1.trend"), spark: [82, 84, 85, 86, 87, 88, 89, 90] },
    { label: t("kpi.billing.2.label"), value: t("kpi.billing.2.value"), trend: t("kpi.billing.2.trend"), spark: [14, 12, 11, 10, 9, 8, 7, 6] },
    { label: t("kpi.billing.3.label"), value: t("kpi.billing.3.value"), trend: t("kpi.billing.3.trend"), spark: [4, 5, 6, 5, 6, 7, 7, 8] },
  ];

  const departmentsKpis = [
    { label: t("kpi.departments.0.label"), value: t("kpi.departments.0.value"), trend: t("kpi.departments.0.trend"), spark: [12, 13, 13, 14, 14, 14, 14, 14] },
    { label: t("kpi.departments.1.label"), value: t("kpi.departments.1.value"), trend: t("kpi.departments.1.trend"), spark: [72, 74, 76, 78, 80, 82, 83, 85] },
    { label: t("kpi.departments.2.label"), value: t("kpi.departments.2.value"), trend: t("kpi.departments.2.trend"), spark: [108, 112, 116, 118, 120, 122, 124, 128] },
    { label: t("kpi.departments.3.label"), value: t("kpi.departments.3.value"), trend: t("kpi.departments.3.trend"), spark: [22, 20, 18, 16, 14, 12, 11, 10] },
  ];

  const scheduleKpis = [
    { label: t("kpi.schedule.0.label"), value: t("kpi.schedule.0.value"), trend: t("kpi.schedule.0.trend"), spark: [38, 40, 42, 44, 46, 48, 49, 50] },
    { label: t("kpi.schedule.1.label"), value: t("kpi.schedule.1.value"), trend: t("kpi.schedule.1.trend"), spark: [8, 9, 10, 11, 12, 12, 13, 14] },
    { label: t("kpi.schedule.2.label"), value: t("kpi.schedule.2.value"), trend: t("kpi.schedule.2.trend"), spark: [3, 2, 2, 1, 1, 1, 0, 0] },
    { label: t("kpi.schedule.3.label"), value: t("kpi.schedule.3.value"), trend: t("kpi.schedule.3.trend"), spark: [62, 64, 66, 68, 70, 72, 74, 76] },
  ];

  const analyticsKpis = [
    { label: t("kpi.analytics.0.label"), value: t("kpi.analytics.0.value"), trend: t("kpi.analytics.0.trend"), spark: [220, 232, 244, 256, 268, 280, 292, 304] },
    { label: t("kpi.analytics.1.label"), value: t("kpi.analytics.1.value"), trend: t("kpi.analytics.1.trend"), spark: [4.5, 4.6, 4.6, 4.7, 4.7, 4.8, 4.8, 4.9] },
    { label: t("kpi.analytics.2.label"), value: t("kpi.analytics.2.value"), trend: t("kpi.analytics.2.trend"), spark: [82, 84, 85, 86, 87, 88, 89, 90] },
    { label: t("kpi.analytics.3.label"), value: t("kpi.analytics.3.value"), trend: t("kpi.analytics.3.trend"), spark: [12, 10, 9, 8, 7, 6, 5, 5] },
  ];

  const apptBadgeVariant = (statusKey: "waiting" | "inRoom" | "scheduled"): "warn" | "danger" | "success" =>
    statusKey === "inRoom" ? "danger" : statusKey === "waiting" ? "warn" : "success";

  const riskBadgeVariant = (k: "low" | "med" | "high"): "success" | "warn" | "danger" =>
    k === "high" ? "danger" : k === "med" ? "warn" : "success";

  const billingBadgeVariant = (k: "paid" | "pending" | "denied"): "success" | "warn" | "danger" =>
    k === "paid" ? "success" : k === "pending" ? "warn" : "danger";

  const brandMark = (
    <div style={{ width: 28, height: 28, background: C.primary, borderRadius: 8, display: "grid", placeItems: "center" }}>
      <IconStethoscope size={16} stroke={1.5} style={{ color: "white" }} />
    </div>
  );

  return (
    <div
      style={{
        background: C.bg,
        color: C.ink,
        minHeight: "100vh",
        fontFamily: "ui-sans-serif, system-ui",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <DemoTopBar
        palette={palette}
        brandName={t("brand.name")}
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
            width: 240,
            background: C.paper,
            borderRight: `1px solid ${C.border}`,
            padding: "24px 18px",
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, background: C.primary, borderRadius: 10, display: "grid", placeItems: "center" }}>
              <IconStethoscope size={20} stroke={1.5} style={{ color: "white" }} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{t("brand.name")}</div>
              <div style={{ fontSize: 11, color: C.muted }}>{t("brand.doctor")}</div>
            </div>
          </div>

          {(["clinical", "operations", "admin"] as const).map((g) => (
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
                        padding: "9px 12px",
                        borderRadius: 8,
                        border: "none",
                        background: active ? C.primary : "transparent",
                        color: active ? "white" : C.ink,
                        fontSize: 13,
                        fontWeight: active ? 700 : 600,
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                    >
                      <Icon size={15} stroke={1.6} />
                      {tabItem.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          ))}
        </aside>

        <main style={{ flex: 1, padding: 28, maxWidth: 1400, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
          {/* ───────── APPOINTMENTS ───────── */}
          {tab === "appointments" && (
            <section>
              <DemoKpiStrip palette={palette} items={appointmentsKpis} />
              <DemoScreenHeader
                palette={palette}
                eyebrow={t("shell.screen.appointments.eyebrow")}
                title={t("appointments.title")}
                subtitle={t("appointments.subtitle")}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {APPOINTMENTS.map((row, i) => (
                  <article
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "70px 1.5fr 1.5fr 1.2fr 100px 110px 110px",
                      alignItems: "center",
                      padding: "13px 18px",
                      background: C.paper,
                      border: `1px solid ${C.border}`,
                      borderLeft: `4px solid ${row.statusKey === "inRoom" ? C.red : row.statusKey === "waiting" ? C.yellow : C.primary}`,
                      borderRadius: 10,
                      fontSize: 13,
                      gap: 10,
                    }}
                  >
                    <span style={{ fontWeight: 700, fontSize: 15 }}>{row.time}</span>
                    <div style={{ fontWeight: 600 }}>{row.patient}</div>
                    <div style={{ color: C.muted }}>{row.reason}</div>
                    <div style={{ color: C.muted, fontSize: 12 }}>{row.doctor}</div>
                    <span style={{ color: C.muted }}>{t("appointments.room", { room: row.room })}</span>
                    <span style={{ justifySelf: "start" }}>
                      <DemoBadge palette={palette} variant={apptBadgeVariant(row.statusKey)} label={t(`appointments.status.${row.statusKey}`)} />
                    </span>
                    <button
                      onClick={() => toast.push({ title: t("toast.chartOpened", { name: row.patient }), tone: "info" })}
                      style={{ background: C.primary, color: "white", border: "none", padding: "6px 12px", borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: "pointer", letterSpacing: 0.5 }}
                    >
                      {t("appointments.openChart")}
                    </button>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* ───────── PATIENTS ───────── */}
          {tab === "patients" && (
            <section>
              <DemoKpiStrip palette={palette} items={patientsKpis} />
              <DemoScreenHeader
                palette={palette}
                eyebrow={t("shell.screen.patients.eyebrow")}
                title={t("patients.title")}
                subtitle={t("patients.subtitle")}
              />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
                {PATIENTS.map((p) => (
                  <div
                    key={p.mrn}
                    style={{
                      background: C.paper,
                      border: `1px solid ${C.border}`,
                      borderRadius: 12,
                      padding: 16,
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div
                        style={{
                          width: 42,
                          height: 42,
                          borderRadius: 999,
                          background: C.primary,
                          color: "white",
                          display: "grid",
                          placeItems: "center",
                          fontWeight: 700,
                        }}
                      >
                        {initials(p.name)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</div>
                        <div style={{ fontSize: 11, color: C.muted, fontFamily: "ui-monospace, monospace" }}>{p.mrn}</div>
                      </div>
                      <DemoBadge palette={palette} variant={riskBadgeVariant(p.riskKey)} label={t(`patients.risk.${p.riskKey}`)} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.muted }}>
                      <span>{t("patients.ageLabel", { age: p.age })}</span>
                      <span>{p.lastVisit}</span>
                    </div>
                    <div style={{ padding: "8px 10px", background: C.card, borderRadius: 8, fontSize: 12, fontWeight: 600 }}>
                      {p.condition}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ───────── DOCTORS ───────── */}
          {tab === "doctors" && (
            <section>
              <DemoKpiStrip palette={palette} items={doctorsKpis} />
              <DemoScreenHeader
                palette={palette}
                eyebrow={t("shell.screen.doctors.eyebrow")}
                title={t("doctors.title")}
                subtitle={t("doctors.subtitle")}
              />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
                {DOCTORS.map((d) => {
                  const onCall = d.onCallKey === "true";
                  return (
                    <div
                      key={d.name}
                      style={{
                        background: C.paper,
                        border: `1px solid ${C.border}`,
                        borderRadius: 14,
                        padding: 18,
                        display: "flex",
                        flexDirection: "column",
                        gap: 14,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div
                          style={{
                            width: 52,
                            height: 52,
                            borderRadius: 999,
                            background: d.color,
                            color: "white",
                            display: "grid",
                            placeItems: "center",
                            fontWeight: 800,
                            fontSize: 16,
                          }}
                        >
                          {initials(d.name)}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: 15 }}>{d.name}</div>
                          <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{d.specialty}</div>
                        </div>
                        <DemoBadge palette={palette} variant={onCall ? "success" : "neutral"} label={t(onCall ? "doctors.onCall" : "doctors.offDuty")} />
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        <div style={{ padding: "8px 10px", background: C.card, borderRadius: 8 }}>
                          <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 700 }}>{t("doctors.patientsLabel")}</div>
                          <div style={{ fontWeight: 800, fontSize: 18 }}>
                            <DemoCounter value={d.patients} />
                          </div>
                        </div>
                        <div style={{ padding: "8px 10px", background: C.card, borderRadius: 8 }}>
                          <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 700 }}>{t("doctors.ratingLabel")}</div>
                          <div style={{ fontWeight: 800, fontSize: 18 }}>{d.rating} ★</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ───────── PRESCRIPTIONS ───────── */}
          {tab === "prescriptions" && (
            <section>
              <DemoKpiStrip palette={palette} items={prescriptionsKpis} />
              <DemoScreenHeader
                palette={palette}
                eyebrow={t("shell.screen.prescriptions.eyebrow")}
                title={t("prescriptions.title")}
                subtitle={t("prescriptions.subtitle")}
              />
              <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.2fr 1.3fr 0.9fr 1fr 0.8fr 1fr",
                    padding: "12px 18px",
                    background: C.bg,
                    fontSize: 11,
                    fontWeight: 700,
                    color: C.muted,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    gap: 12,
                  }}
                >
                  <span>{t("prescriptions.col.patient")}</span>
                  <span>{t("prescriptions.col.drug")}</span>
                  <span>{t("prescriptions.col.dosage")}</span>
                  <span>{t("prescriptions.col.frequency")}</span>
                  <span>{t("prescriptions.col.refills")}</span>
                  <span>{t("prescriptions.col.date")}</span>
                </div>
                {PRESCRIPTIONS.map((p, i) => {
                  const refillsNum = parseInt(p.refills, 10);
                  const lowRefill = !Number.isNaN(refillsNum) && refillsNum <= 1;
                  return (
                    <div
                      key={i}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1.2fr 1.3fr 0.9fr 1fr 0.8fr 1fr",
                        padding: "14px 18px",
                        borderTop: `1px solid ${C.border}`,
                        fontSize: 13,
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <span style={{ fontWeight: 600 }}>{p.patient}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <IconPill size={14} stroke={1.5} style={{ color: C.primary }} />
                        {p.drug}
                      </span>
                      <span style={{ color: C.muted }}>{p.dosage}</span>
                      <span style={{ color: C.muted }}>{p.frequency}</span>
                      <span style={{ justifySelf: "start" }}>
                        <DemoBadge palette={palette} variant={lowRefill ? "warn" : "success"} label={p.refills} />
                      </span>
                      <span style={{ color: C.muted }}>{p.date}</span>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ───────── LAB ───────── */}
          {tab === "lab" && (
            <section>
              <DemoKpiStrip palette={palette} items={labKpis} />
              <DemoScreenHeader
                palette={palette}
                eyebrow={t("shell.screen.lab.eyebrow")}
                title={t("lab.title")}
                subtitle={t("lab.subtitle")}
              />
              <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.2fr 1.4fr 1fr 1.2fr 0.8fr 1fr",
                    padding: "12px 18px",
                    background: C.bg,
                    fontSize: 11,
                    fontWeight: 700,
                    color: C.muted,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    gap: 12,
                  }}
                >
                  <span>{t("lab.col.patient")}</span>
                  <span>{t("lab.col.test")}</span>
                  <span>{t("lab.col.value")}</span>
                  <span>{t("lab.col.range")}</span>
                  <span>{t("lab.col.flag")}</span>
                  <span>{t("lab.col.date")}</span>
                </div>
                {LABS.map((l, i) => (
                  <div
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.2fr 1.4fr 1fr 1.2fr 0.8fr 1fr",
                      padding: "14px 18px",
                      borderTop: `1px solid ${C.border}`,
                      borderLeft: l.abnormal ? `4px solid ${C.red}` : "4px solid transparent",
                      fontSize: 13,
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>{l.patient}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <IconFlask size={14} stroke={1.5} style={{ color: l.abnormal ? C.red : C.primary }} />
                      {l.test}
                    </span>
                    <span style={{ fontWeight: 700, color: l.abnormal ? C.red : C.ink }}>{l.value}</span>
                    <span style={{ color: C.muted }}>{l.range}</span>
                    <span style={{ justifySelf: "start" }}>
                      <DemoBadge palette={palette} variant={l.abnormal ? "danger" : "success"} label={l.flag} />
                    </span>
                    <span style={{ color: C.muted }}>{l.date}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ───────── BILLING ───────── */}
          {tab === "billing" && (
            <section>
              <DemoKpiStrip palette={palette} items={billingKpis} />
              <DemoScreenHeader
                palette={palette}
                eyebrow={t("shell.screen.billing.eyebrow")}
                title={t("billing.title")}
                subtitle={t("billing.subtitle")}
              />
              <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.4fr 1.5fr 1fr 1.2fr 0.9fr",
                    padding: "12px 18px",
                    background: C.bg,
                    fontSize: 11,
                    fontWeight: 700,
                    color: C.muted,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    gap: 12,
                  }}
                >
                  <span>{t("billing.col.patient")}</span>
                  <span>{t("billing.col.service")}</span>
                  <span style={{ textAlign: "right" }}>{t("billing.col.amount")}</span>
                  <span>{t("billing.col.insurance")}</span>
                  <span>{t("billing.col.status")}</span>
                </div>
                {BILLING.map((b, i) => (
                  <div
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.4fr 1.5fr 1fr 1.2fr 0.9fr",
                      padding: "14px 18px",
                      borderTop: `1px solid ${C.border}`,
                      fontSize: 13,
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>{b.name}</span>
                    <span style={{ color: C.muted }}>{b.service}</span>
                    <span style={{ textAlign: "right", fontWeight: 700 }}>
                      $<DemoCounter value={b.amount} />
                    </span>
                    <span style={{ color: C.muted, fontSize: 12 }}>{b.insurance}</span>
                    <span style={{ justifySelf: "start" }}>
                      <DemoBadge palette={palette} variant={billingBadgeVariant(b.statusKey)} label={t(`billing.status.${b.statusKey}`)} />
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ───────── DEPARTMENTS ───────── */}
          {tab === "departments" && (
            <section>
              <DemoKpiStrip palette={palette} items={departmentsKpis} />
              <DemoScreenHeader
                palette={palette}
                eyebrow={t("shell.screen.departments.eyebrow")}
                title={t("departments.title")}
                subtitle={t("departments.subtitle")}
              />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14, marginBottom: 18 }}>
                {DEPARTMENTS.map((d) => {
                  const pct = Math.round((d.occupied / d.beds) * 100);
                  const full = pct >= 85;
                  return (
                    <div
                      key={d.id}
                      style={{
                        background: C.paper,
                        border: `1px solid ${C.border}`,
                        borderTop: `3px solid ${full ? C.red : C.primary}`,
                        borderRadius: 12,
                        padding: 16,
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 11, color: C.muted, fontFamily: "ui-monospace, monospace", fontWeight: 700 }}>{d.id}</span>
                        <DemoBadge palette={palette} variant={full ? "danger" : "success"} label={t(full ? "departments.full" : "departments.available")} />
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 15, marginTop: 6 }}>{d.name}</div>
                      <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{d.head}</div>
                      <div style={{ marginTop: 12 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.muted, marginBottom: 4 }}>
                          <span>{t("departments.occupied")}</span>
                          <span>
                            {d.occupied}/{d.beds}
                          </span>
                        </div>
                        <div style={{ width: "100%", height: 6, background: C.card, borderRadius: 999, overflow: "hidden" }}>
                          <div style={{ width: `${pct}%`, height: "100%", background: full ? C.red : C.primary }} />
                        </div>
                        <div style={{ marginTop: 6, fontSize: 11, color: C.muted, textAlign: "right" }}>{pct}%</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 20 }}>
                <div style={{ fontSize: 11, color: C.muted, marginBottom: 14, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>
                  {t("departments.heatmapLabel")}
                </div>
                <DemoHeatmap palette={palette} weeks={14} seed={7} ariaLabel={t("departments.heatmapLabel")} />
                <p style={{ marginTop: 14, color: C.muted, fontSize: 12 }}>{t("departments.heatmapNote")}</p>
              </div>
            </section>
          )}

          {/* ───────── SCHEDULE ───────── */}
          {tab === "schedule" && (
            <section>
              <DemoKpiStrip palette={palette} items={scheduleKpis} />
              <DemoScreenHeader
                palette={palette}
                eyebrow={t("shell.screen.schedule.eyebrow")}
                title={t("schedule.title")}
                subtitle={t("schedule.subtitle")}
              />
              <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.4fr 1fr repeat(7, 1fr)",
                    padding: "12px 18px",
                    background: C.bg,
                    fontSize: 11,
                    fontWeight: 700,
                    color: C.muted,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    gap: 8,
                  }}
                >
                  <span>{t("schedule.col.doctor")}</span>
                  <span>{t("schedule.col.role")}</span>
                  {(["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const).map((d) => (
                    <span key={d} style={{ textAlign: "center" }}>{t(`schedule.days.${d}`)}</span>
                  ))}
                </div>
                {SHIFTS.map((s, i) => (
                  <div
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.4fr 1fr repeat(7, 1fr)",
                      padding: "12px 18px",
                      borderTop: `1px solid ${C.border}`,
                      fontSize: 12,
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span style={{ fontWeight: 700 }}>{s.doctor}</span>
                    <span style={{ color: C.muted }}>{s.role}</span>
                    {([s.mon, s.tue, s.wed, s.thu, s.fri, s.sat, s.sun] as string[]).map((cell, j) => {
                      const off = cell === "" || cell.toLowerCase() === "off" || cell === "—";
                      return (
                        <span
                          key={j}
                          style={{
                            textAlign: "center",
                            padding: "5px 6px",
                            background: off ? "transparent" : C.card,
                            color: off ? C.muted : C.primaryDark,
                            borderRadius: 6,
                            fontWeight: 600,
                            fontSize: 11,
                          }}
                        >
                          {off ? "—" : cell}
                        </span>
                      );
                    })}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ───────── ANALYTICS ───────── */}
          {tab === "analytics" && (
            <section>
              <DemoKpiStrip palette={palette} items={analyticsKpis} />
              <DemoScreenHeader
                palette={palette}
                eyebrow={t("shell.screen.analytics.eyebrow")}
                title={t("analytics.title")}
                subtitle={t("analytics.subtitle")}
              />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 18, marginBottom: 18 }}>
                <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
                    <h3 style={{ fontSize: 16, margin: 0, fontWeight: 800 }}>{t("analytics.visitsTitle")}</h3>
                    <span style={{ fontSize: 11, color: C.muted }}>{t("analytics.last30")}</span>
                  </div>
                  <DemoChart
                    data={[180, 192, 205, 198, 218, 232, 244, 230, 252, 268, 261, 278, 290, 286, 302, 318, 308, 326, 340, 332, 354, 368, 360, 378, 392, 386, 410, 424, 418, 442]}
                    palette={palette}
                    height={200}
                  />
                </div>
                <DemoLiveFeed
                  palette={palette}
                  liveLabel={t("analytics.liveFeed")}
                  height={250}
                  initial={[
                    { id: "a1", title: t("analytics.feed.0.title"), meta: t("analytics.feed.0.meta"), tone: "success" },
                    { id: "a2", title: t("analytics.feed.1.title"), meta: t("analytics.feed.1.meta"), tone: "primary" },
                    { id: "a3", title: t("analytics.feed.2.title"), meta: t("analytics.feed.2.meta"), tone: "warn" },
                  ]}
                  rotating={[
                    { id: "ar1", title: t("analytics.feed.3.title"), meta: t("analytics.feed.3.meta"), tone: "info" },
                    { id: "ar2", title: t("analytics.feed.4.title"), meta: t("analytics.feed.4.meta"), tone: "success" },
                    { id: "ar3", title: t("analytics.feed.5.title"), meta: t("analytics.feed.5.meta"), tone: "primary" },
                  ]}
                />
              </div>
              <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
                <h3 style={{ fontSize: 16, margin: "0 0 14px", fontWeight: 800 }}>{t("analytics.cohortTitle")}</h3>
                <DemoCohort palette={palette} rows={6} cols={8} />
                <p style={{ color: C.muted, fontSize: 12, marginTop: 12 }}>{t("analytics.cohortNote")}</p>
              </div>
            </section>
          )}

          {/* ───────── SETTINGS ───────── */}
          {tab === "settings" && (
            <section>
              <DemoScreenHeader
                palette={palette}
                eyebrow={t("shell.screen.settings.eyebrow")}
                title={t("settings.title")}
                subtitle={t("settings.subtitle")}
              />
              <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22, marginBottom: 18 }}>
                <h3 style={{ fontSize: 14, fontWeight: 800, margin: "0 0 14px", textTransform: "uppercase", letterSpacing: 1 }}>{t("settings.basics")}</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {(["clinicName", "currency", "openHours", "contact"] as const).map((f) => (
                    <div key={f}>
                      <label style={{ display: "block", fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700, marginBottom: 6 }}>
                        {t(`settings.fields.${f}`)}
                      </label>
                      <input
                        defaultValue={t(`settings.placeholders.${f}`)}
                        style={{ width: "100%", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", fontSize: 13, color: C.ink, outline: "none", boxSizing: "border-box" }}
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => toast.push({ title: t("toast.settingsSaved"), tone: "success" })}
                  style={{ marginTop: 16, padding: "10px 18px", background: C.primary, color: "white", border: "none", borderRadius: 9999, fontWeight: 800, fontSize: 12, cursor: "pointer", letterSpacing: 1, textTransform: "uppercase" }}
                >
                  {t("settings.save")}
                </button>
              </div>
              <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
                <h3 style={{ fontSize: 14, fontWeight: 800, margin: "0 0 14px", textTransform: "uppercase", letterSpacing: 1, display: "flex", alignItems: "center", gap: 8 }}>
                  <IconPlug size={16} stroke={1.6} />
                  {t("settings.integrationsTitle")}
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
                  {[
                    { name: "Stripe", emoji: "💳", on: true, desc: "settings.integrations.stripe" },
                    { name: "Epic", emoji: "🏥", on: true, desc: "settings.integrations.epic" },
                    { name: "HL7", emoji: "🔗", on: true, desc: "settings.integrations.hl7" },
                    { name: "Twilio", emoji: "📲", on: false, desc: "settings.integrations.twilio" },
                    { name: "Slack", emoji: "💬", on: true, desc: "settings.integrations.slack" },
                    { name: "DICOM", emoji: "🩻", on: false, desc: "settings.integrations.dicom" },
                  ].map((i) => (
                    <div key={i.name} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: 14 }}>
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
        version={t("shell.version")}
        region={t("shell.region")}
        buildId={t("shell.buildId")}
      />
    </div>
  );
}
