"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { IconStethoscope, IconHeart, IconCalendar, IconFileText, IconPill, IconActivity, IconUser, IconFlask } from "@tabler/icons-react";
import {
  DemoTopBar,
  DemoStatusBar,
  DemoKpiStrip,
  DemoScreenHeader,
  DemoBadge,
} from "@/components/demo-shell";

const C = {
  bg: "#f0fdfa",
  paper: "#ffffff",
  ink: "#0f2c2c",
  muted: "#557575",
  primary: "#0d9488",
  primaryDark: "#0f766e",
  red: "#dc2626",
  yellow: "#ca8a04",
  border: "#cbeae5",
};

const palette = {
  bg: C.bg,
  paper: C.paper,
  ink: C.ink,
  muted: C.muted,
  primary: C.primary,
  border: C.border,
};

type View = "schedule" | "patient" | "prescriptions" | "labs";

export function HospitalDemo() {
  const t = useTranslations("demoPreview.hospital");
  const [view, setView] = useState<View>("schedule");

  const TODAY = [
    { time: "09:00", patient: t("appointments.0.patient"), reason: t("appointments.0.reason"), room: "C-3", status: t("status.waiting"), statusKey: "waiting" as const },
    { time: "09:30", patient: t("appointments.1.patient"), reason: t("appointments.1.reason"), room: "B-1", status: t("status.inRoom"), statusKey: "inRoom" as const },
    { time: "10:15", patient: t("appointments.2.patient"), reason: t("appointments.2.reason"), room: "C-4", status: t("status.scheduled"), statusKey: "scheduled" as const },
    { time: "11:00", patient: t("appointments.3.patient"), reason: t("appointments.3.reason"), room: "B-2", status: t("status.scheduled"), statusKey: "scheduled" as const },
    { time: "11:30", patient: t("appointments.4.patient"), reason: t("appointments.4.reason"), room: "C-3", status: t("status.scheduled"), statusKey: "scheduled" as const },
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
    patient: t(`labs.items.${i}.patient`),
    test: t(`labs.items.${i}.test`),
    value: t(`labs.items.${i}.value`),
    range: t(`labs.items.${i}.range`),
    flag: t(`labs.items.${i}.flag`),
    abnormal: t(`labs.items.${i}.abnormal`) === "true",
    date: t(`labs.items.${i}.date`),
  }));

  const headerTitle =
    view === "schedule"
      ? t("schedule.title")
      : view === "patient"
        ? t("patient.name")
        : view === "prescriptions"
          ? t("prescriptions.title")
          : t("labs.title");

  const headerSubtitle =
    view === "schedule"
      ? t("schedule.subtitle")
      : view === "patient"
        ? t("patient.meta")
        : view === "prescriptions"
          ? t("prescriptions.subtitle")
          : t("labs.subtitle");

  const screenEyebrow =
    view === "schedule"
      ? t("screen.schedule.eyebrow")
      : view === "patient"
        ? t("screen.patient.eyebrow")
        : view === "prescriptions"
          ? t("screen.prescriptions.eyebrow")
          : t("screen.labs.eyebrow");

  const breadcrumb =
    view === "schedule"
      ? t("breadcrumb.schedule")
      : view === "patient"
        ? t("breadcrumb.patient")
        : view === "prescriptions"
          ? t("breadcrumb.prescriptions")
          : t("breadcrumb.labs");

  const kpiItems: { label: string; value: string; trend: string; spark: number[] }[] =
    view === "schedule"
      ? [
          { label: t("kpi.schedule.0.label"), value: t("kpi.schedule.0.value"), trend: t("kpi.schedule.0.trend"), spark: [8, 10, 12, 11, 13, 14, 13, 14] },
          { label: t("kpi.schedule.1.label"), value: t("kpi.schedule.1.value"), trend: t("kpi.schedule.1.trend"), spark: [1, 2, 3, 3, 4, 4, 5, 6] },
          { label: t("kpi.schedule.2.label"), value: t("kpi.schedule.2.value"), trend: t("kpi.schedule.2.trend"), spark: [6, 5, 4, 5, 4, 3, 3, 2] },
          { label: t("kpi.schedule.3.label"), value: t("kpi.schedule.3.value"), trend: t("kpi.schedule.3.trend"), spark: [12, 14, 11, 13, 10, 12, 9, 11] },
        ]
      : view === "patient"
        ? [
            { label: t("kpi.patient.0.label"), value: t("kpi.patient.0.value"), trend: t("kpi.patient.0.trend"), spark: [820, 845, 870, 890, 910, 932, 948, 962] },
            { label: t("kpi.patient.1.label"), value: t("kpi.patient.1.value"), trend: t("kpi.patient.1.trend"), spark: [120, 124, 128, 130, 133, 136, 138, 142] },
            { label: t("kpi.patient.2.label"), value: t("kpi.patient.2.value"), trend: t("kpi.patient.2.trend"), spark: [10, 8, 9, 7, 6, 5, 4, 4] },
            { label: t("kpi.patient.3.label"), value: t("kpi.patient.3.value"), trend: t("kpi.patient.3.trend"), spark: [1, 2, 3, 2, 4, 3, 3, 2] },
          ]
        : view === "prescriptions"
          ? [
              { label: t("kpi.prescriptions.0.label"), value: t("kpi.prescriptions.0.value"), trend: t("kpi.prescriptions.0.trend"), spark: [220, 232, 244, 251, 260, 268, 274, 282] },
              { label: t("kpi.prescriptions.1.label"), value: t("kpi.prescriptions.1.value"), trend: t("kpi.prescriptions.1.trend"), spark: [6, 8, 10, 9, 11, 12, 11, 13] },
              { label: t("kpi.prescriptions.2.label"), value: t("kpi.prescriptions.2.value"), trend: t("kpi.prescriptions.2.trend"), spark: [4, 5, 4, 5, 6, 5, 6, 7] },
              { label: t("kpi.prescriptions.3.label"), value: t("kpi.prescriptions.3.value"), trend: t("kpi.prescriptions.3.trend"), spark: [2, 1, 2, 1, 2, 1, 0, 1] },
            ]
          : [
              { label: t("kpi.labs.0.label"), value: t("kpi.labs.0.value"), trend: t("kpi.labs.0.trend"), spark: [12, 14, 16, 15, 18, 17, 19, 18] },
              { label: t("kpi.labs.1.label"), value: t("kpi.labs.1.value"), trend: t("kpi.labs.1.trend"), spark: [3, 4, 3, 5, 4, 5, 6, 5] },
              { label: t("kpi.labs.2.label"), value: t("kpi.labs.2.value"), trend: t("kpi.labs.2.trend"), spark: [120, 115, 110, 108, 102, 98, 95, 92] },
              { label: t("kpi.labs.3.label"), value: t("kpi.labs.3.value"), trend: t("kpi.labs.3.trend"), spark: [42, 48, 56, 62, 58, 66, 72, 76] },
            ];

  const apptBadgeVariant = (statusKey: "waiting" | "inRoom" | "scheduled"): "warn" | "danger" | "success" =>
    statusKey === "inRoom" ? "danger" : statusKey === "waiting" ? "warn" : "success";

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
        brandMark={
          <div
            style={{
              width: 28,
              height: 28,
              background: palette.primary,
              borderRadius: 8,
              display: "grid",
              placeItems: "center",
            }}
          >
            <IconStethoscope size={16} stroke={1.5} style={{ color: palette.paper }} />
          </div>
        }
        breadcrumb={breadcrumb}
        searchPlaceholder={t("shell.searchPlaceholder")}
        userName={t("shell.userName")}
        userInitials={t("shell.userInitials")}
      />

      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "240px 1fr" }}>
        <aside style={{ background: C.paper, padding: 22, borderRight: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <div style={{ width: 36, height: 36, background: C.primary, borderRadius: 10, display: "grid", placeItems: "center" }}>
              <IconStethoscope size={18} stroke={1.5} style={{ color: "white" }} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{t("brand.name")}</div>
              <div style={{ fontSize: 11, color: C.muted }}>{t("brand.doctor")}</div>
            </div>
          </div>

          <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              { id: "schedule", label: t("nav.schedule"), Icon: IconCalendar },
              { id: "patient", label: t("nav.activePatient"), Icon: IconUser },
              { id: "prescriptions", label: t("nav.prescriptions"), Icon: IconPill },
              { id: "labs", label: t("nav.labs"), Icon: IconFlask },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setView(m.id as View)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "none",
                  background: view === m.id ? C.primary : "transparent",
                  color: view === m.id ? "white" : C.ink,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <m.Icon size={16} stroke={1.5} />
                {m.label}
              </button>
            ))}
          </nav>

          <div style={{ marginTop: 28, padding: 14, background: C.bg, borderRadius: 10, fontSize: 12 }}>
            <div style={{ color: C.muted, marginBottom: 6, fontWeight: 600 }}>{t("load.title")}</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>{t("load.booked")}</span>
              <strong>14</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <span>{t("load.seen")}</span>
              <strong>4</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <span>{t("load.noShows")}</span>
              <strong>0</strong>
            </div>
          </div>
        </aside>

        <main style={{ padding: 28 }}>
          <DemoKpiStrip palette={palette} items={kpiItems} />

          <DemoScreenHeader
            palette={palette}
            eyebrow={screenEyebrow}
            title={headerTitle}
            subtitle={headerSubtitle}
          />

          {view === "schedule" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {TODAY.map((row, i) => (
                <article
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "80px 1.5fr 1.4fr 100px 110px 100px",
                    alignItems: "center",
                    padding: "14px 18px",
                    background: C.paper,
                    border: `1px solid ${C.border}`,
                    borderLeft: `4px solid ${row.statusKey === "inRoom" ? C.red : row.statusKey === "waiting" ? C.yellow : C.primary}`,
                    borderRadius: 10,
                    fontSize: 14,
                    gap: 12,
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: 16 }}>{row.time}</span>
                  <div>
                    <div style={{ fontWeight: 600 }}>{row.patient}</div>
                  </div>
                  <div style={{ color: C.muted }}>{row.reason}</div>
                  <span style={{ color: C.muted }}>{t("schedule.room", { room: row.room })}</span>
                  <span style={{ justifySelf: "start" }}>
                    <DemoBadge palette={palette} variant={apptBadgeVariant(row.statusKey)} label={row.status} />
                  </span>
                  <button style={{ background: C.primary, color: "white", border: "none", padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                    {t("schedule.openChart")}
                  </button>
                </article>
              ))}
            </div>
          )}

          {view === "patient" && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 18, paddingBottom: 18, borderBottom: `1px solid ${C.border}`, marginBottom: 22 }}>
                <div style={{ width: 56, height: 56, borderRadius: 9999, background: C.primary, color: "white", display: "grid", placeItems: "center", fontSize: 20, fontWeight: 700 }}>
                  {t("patient.initials")}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600 }}>{t("patient.mrnLabel")}</div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{t("patient.mrn")}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: C.muted, fontSize: 11 }}>{t("patient.lastVisit")}</div>
                  <div style={{ fontWeight: 700 }}>{t("patient.lastVisitDate")}</div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
                {[
                  { Icon: IconHeart, label: t("stats.hr.label"), v: t("stats.hr.value"), c: C.primary },
                  { Icon: IconActivity, label: t("stats.bp.label"), v: t("stats.bp.value"), c: C.primary },
                  { Icon: IconPill, label: t("stats.meds.label"), v: t("stats.meds.value"), c: C.yellow },
                  { Icon: IconFileText, label: t("stats.notes.label"), v: t("stats.notes.value"), c: C.muted },
                ].map((s) => (
                  <div key={s.label} style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16 }}>
                    <s.Icon size={18} stroke={1.5} style={{ color: s.c }} />
                    <div style={{ fontSize: 11, color: C.muted, marginTop: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div>
                    <div style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>{s.v}</div>
                  </div>
                ))}
              </div>

              <h2 style={{ fontSize: 16, fontWeight: 700, marginTop: 28, marginBottom: 12 }}>{t("notes.title")}</h2>
              <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 12 }}>
                {[
                  { date: t("notes.0.date"), note: t("notes.0.note") },
                  { date: t("notes.1.date"), note: t("notes.1.note") },
                  { date: t("notes.2.date"), note: t("notes.2.note") },
                ].map((n, i) => (
                  <div key={i} style={{ padding: "14px 18px", borderTop: i === 0 ? "none" : `1px solid ${C.border}`, fontSize: 14 }}>
                    <div style={{ fontSize: 11, color: C.muted, fontWeight: 600 }}>{n.date}</div>
                    <div style={{ marginTop: 4 }}>{n.note}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {view === "prescriptions" && (
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
          )}

          {view === "labs" && (
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
                <span>{t("labs.col.patient")}</span>
                <span>{t("labs.col.test")}</span>
                <span>{t("labs.col.value")}</span>
                <span>{t("labs.col.range")}</span>
                <span>{t("labs.col.flag")}</span>
                <span>{t("labs.col.date")}</span>
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
