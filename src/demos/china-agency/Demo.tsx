"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  GraduationCap,
  ArrowRight,
  Clock,
  Files,
  Buildings,
  MapPin,
  Certificate,
  ChatTeardropDots,
  Handshake,
  CurrencyDollar,
  Airplane,
  ChartPie,
  Gear,
} from "@phosphor-icons/react";
import { demoImages } from "@/lib/demo-images";
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
  DemoLiveFeed,
  DemoToastProvider,
  useDemoToast,
  type PaletteItem,
} from "@/components/demo-shell/wow";

const C = {
  bg: "#fef9f0",
  paper: "#ffffff",
  ink: "#3a0a0a",
  muted: "#7a3a3a",
  red: "#b91c1c",
  gold: "#b8860b",
  border: "#eedcb8",
};

const palette = {
  bg: C.bg,
  paper: C.paper,
  ink: C.ink,
  muted: C.muted,
  primary: C.red,
  border: C.border,
};

type Tab =
  | "pipeline"
  | "students"
  | "universities"
  | "documents"
  | "consulting"
  | "partners"
  | "payments"
  | "visa"
  | "analytics"
  | "settings";

export function ChinaAgencyDemo() {
  return (
    <DemoToastProvider palette={palette}>
      <ChinaAgencyInner />
    </DemoToastProvider>
  );
}

function ChinaAgencyInner() {
  const t = useTranslations("demoPreview.china-agency");
  const [tab, setTab] = useState<Tab>("pipeline");
  const toast = useDemoToast();

  const PIPELINE = [
    { id: "Inquiry", label: t("pipeline.inquiry"), count: 28 },
    { id: "Documents", label: t("pipeline.documents"), count: 14 },
    { id: "Application", label: t("pipeline.application"), count: 22 },
    { id: "Offer", label: t("pipeline.offer"), count: 9 },
    { id: "Visa", label: t("pipeline.visa"), count: 6 },
    { id: "Departed", label: t("pipeline.departed"), count: 47 },
  ];

  const STUDENTS = [
    { name: t("students.0.name"), uni: t("students.0.uni"), track: t("students.0.track"), stage: t("stages.visa"), flag: "🇨🇳", days: 12 },
    { name: t("students.1.name"), uni: t("students.1.uni"), track: t("students.1.track"), stage: t("stages.offer"), flag: "🇨🇳", days: 4 },
    { name: t("students.2.name"), uni: t("students.2.uni"), track: t("students.2.track"), stage: t("stages.application"), flag: "🇨🇳", days: 18 },
    { name: t("students.3.name"), uni: t("students.3.uni"), track: t("students.3.track"), stage: t("stages.documents"), flag: "🇨🇳", days: 6 },
  ];

  const UNIVERSITIES = [
    { i: 0, success: 92, placed: 47 },
    { i: 1, success: 88, placed: 39 },
    { i: 2, success: 84, placed: 31 },
    { i: 3, success: 79, placed: 28 },
    { i: 4, success: 76, placed: 22 },
    { i: 5, success: 74, placed: 18 },
    { i: 6, success: 71, placed: 15 },
    { i: 7, success: 68, placed: 12 },
  ];

  const DOCUMENTS = [
    { i: 0, studentIdx: 0, typeKey: "passport", statusKey: "verified" },
    { i: 1, studentIdx: 0, typeKey: "transcript", statusKey: "verified" },
    { i: 2, studentIdx: 0, typeKey: "visa", statusKey: "issued" },
    { i: 3, studentIdx: 1, typeKey: "passport", statusKey: "verified" },
    { i: 4, studentIdx: 1, typeKey: "sponsorship", statusKey: "sent" },
    { i: 5, studentIdx: 1, typeKey: "transcript", statusKey: "submitted" },
    { i: 6, studentIdx: 2, typeKey: "passport", statusKey: "submitted" },
    { i: 7, studentIdx: 2, typeKey: "transcript", statusKey: "verified" },
    { i: 8, studentIdx: 2, typeKey: "sponsorship", statusKey: "submitted" },
    { i: 9, studentIdx: 3, typeKey: "passport", statusKey: "verified" },
    { i: 10, studentIdx: 3, typeKey: "transcript", statusKey: "sent" },
    { i: 11, studentIdx: 3, typeKey: "visa", statusKey: "submitted" },
  ];

  // Map status keys -> DemoBadge variants
  const badgeVariantFor = (k: string): "neutral" | "success" | "warn" | "danger" | "info" => {
    switch (k) {
      case "verified":
        return "warn";
      case "issued":
        return "success";
      case "sent":
        return "danger";
      case "submitted":
      default:
        return "neutral";
    }
  };

  const breadcrumb = t(`shell.breadcrumb.${tab}`);
  const screenEyebrow = t(`screen.${tab}.eyebrow`);
  const screenTitle = t(`screen.${tab}.title`);
  const screenSubtitle = t(`screen.${tab}.subtitle`);

  const NAV_ITEMS: { id: Tab; label: string }[] = [
    { id: "pipeline", label: t("nav.pipeline") },
    { id: "students", label: t("nav.students") },
    { id: "universities", label: t("nav.universities") },
    { id: "documents", label: t("nav.documents") },
    { id: "consulting", label: t("nav.consulting") },
    { id: "partners", label: t("nav.partners") },
    { id: "payments", label: t("nav.payments") },
    { id: "visa", label: t("nav.visa") },
    { id: "analytics", label: t("nav.analytics") },
    { id: "settings", label: t("nav.settings") },
  ];

  const paletteItems: PaletteItem[] = NAV_ITEMS.map((n) => ({
    id: n.id,
    label: n.label,
    group: t("commandPalette.group"),
    onRun: () => {
      setTab(n.id);
      toast.push({ title: t("toast.navigated", { screen: n.label }) });
    },
  }));

  const kpiItems: { label: string; value: string; trend: string; spark: number[] }[] =
    tab === "pipeline"
      ? [
          { label: t("kpi.pipeline.0.label"), value: t("kpi.pipeline.0.value"), trend: t("kpi.pipeline.0.trend"), spark: [98, 104, 112, 118, 121, 124, 122, 126] },
          { label: t("kpi.pipeline.1.label"), value: t("kpi.pipeline.1.value"), trend: t("kpi.pipeline.1.trend"), spark: [22, 24, 23, 26, 28, 27, 29, 31] },
          { label: t("kpi.pipeline.2.label"), value: t("kpi.pipeline.2.value"), trend: t("kpi.pipeline.2.trend"), spark: [18, 22, 26, 28, 30, 34, 36, 38] },
          { label: t("kpi.pipeline.3.label"), value: t("kpi.pipeline.3.value"), trend: t("kpi.pipeline.3.trend"), spark: [12, 18, 24, 30, 36, 40, 44, 47] },
        ]
      : tab === "students"
        ? [
            { label: t("kpi.students.0.label"), value: t("kpi.students.0.value"), trend: t("kpi.students.0.trend"), spark: [108, 112, 116, 118, 121, 124, 123, 126] },
            { label: t("kpi.students.1.label"), value: t("kpi.students.1.value"), trend: t("kpi.students.1.trend"), spark: [88, 84, 80, 76, 74, 72, 70, 68] },
            { label: t("kpi.students.2.label"), value: t("kpi.students.2.value"), trend: t("kpi.students.2.trend"), spark: [32, 36, 38, 41, 44, 46, 48, 51] },
            { label: t("kpi.students.3.label"), value: t("kpi.students.3.value"), trend: t("kpi.students.3.trend"), spark: [18, 22, 26, 30, 34, 38, 42, 46] },
          ]
        : tab === "universities"
          ? [
              { label: t("kpi.universities.0.label"), value: t("kpi.universities.0.value"), trend: t("kpi.universities.0.trend"), spark: [22, 24, 26, 27, 28, 29, 30, 31] },
              { label: t("kpi.universities.1.label"), value: t("kpi.universities.1.value"), trend: t("kpi.universities.1.trend"), spark: [62, 66, 70, 74, 78, 82, 86, 92] },
              { label: t("kpi.universities.2.label"), value: t("kpi.universities.2.value"), trend: t("kpi.universities.2.trend"), spark: [74, 76, 78, 80, 82, 84, 85, 86] },
              { label: t("kpi.universities.3.label"), value: t("kpi.universities.3.value"), trend: t("kpi.universities.3.trend"), spark: [18, 22, 26, 30, 34, 38, 42, 47] },
            ]
          : tab === "documents"
          ? [
              { label: t("kpi.documents.0.label"), value: t("kpi.documents.0.value"), trend: t("kpi.documents.0.trend"), spark: [44, 48, 52, 56, 58, 62, 64, 68] },
              { label: t("kpi.documents.1.label"), value: t("kpi.documents.1.value"), trend: t("kpi.documents.1.trend"), spark: [6, 8, 9, 11, 12, 14, 16, 18] },
              { label: t("kpi.documents.2.label"), value: t("kpi.documents.2.value"), trend: t("kpi.documents.2.trend"), spark: [12, 11, 10, 9, 8, 8, 7, 7] },
              { label: t("kpi.documents.3.label"), value: t("kpi.documents.3.value"), trend: t("kpi.documents.3.trend"), spark: [8, 7, 6, 6, 5, 4, 4, 3] },
            ]
          : (["0", "1", "2", "3"] as const).map((i) => ({
              label: t(`kpi.${tab}.${i}.label`),
              value: t(`kpi.${tab}.${i}.value`),
              trend: t(`kpi.${tab}.${i}.trend`),
              spark: [40, 44, 48, 52, 56, 60, 64, 68].map((n) => n + (Number(i) * 9)),
            }));

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
        brandName={t("brand")}
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
            <GraduationCap weight="bold" size={16} style={{ color: palette.paper }} />
          </div>
        }
        breadcrumb={breadcrumb}
        searchPlaceholder={t("shell.searchPlaceholder")}
        userName={t("shell.userName")}
        userInitials={t("shell.userInitials")}
        rightSlot={<DemoCommandPalette palette={palette} items={paletteItems} placeholder={t("commandPalette.placeholder")} hint="⌘K" />}
      />

      <div
        style={{
          background: C.paper,
          borderBottom: `1px solid ${C.border}`,
          padding: "8px 32px",
          display: "flex",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {NAV_ITEMS.map((tItem) => {
            const active = tab === tItem.id;
            return (
              <button
                key={tItem.id}
                onClick={() => setTab(tItem.id)}
                style={{
                  background: active ? C.red : "transparent",
                  color: active ? "white" : C.muted,
                  border: "none",
                  padding: "7px 14px",
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {tItem.label}
              </button>
            );
          })}
        </div>
      </div>

      <main style={{ flex: 1, padding: 32, maxWidth: 1400, margin: "0 auto", width: "100%" }}>
        <DemoScreenHeader
          palette={palette}
          eyebrow={screenEyebrow}
          title={screenTitle}
          subtitle={screenSubtitle}
        />

        <DemoKpiStrip palette={palette} items={kpiItems} />

        {tab === "pipeline" && (
          <section>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16, fontFamily: "Georgia, serif" }}>{t("pipeline.title")}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
              {PIPELINE.map((p, i) => (
                <div
                  key={p.id}
                  style={{
                    background: C.paper,
                    border: `1px solid ${C.border}`,
                    borderTop: `4px solid ${i === PIPELINE.length - 1 ? C.gold : C.red}`,
                    borderRadius: 12,
                    padding: 14,
                    minHeight: 220,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{p.label}</span>
                    <span style={{ background: C.bg, padding: "2px 8px", borderRadius: 9999, fontSize: 11, fontWeight: 700, color: C.red }}>
                      {p.count}
                    </span>
                  </div>
                  <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
                    {Array.from({ length: Math.min(3, p.count) }).map((_, j) => (
                      <div key={j} style={{ background: C.bg, borderRadius: 6, padding: "6px 8px", fontSize: 11 }}>
                        <div style={{ fontWeight: 600 }}>{t("pipeline.studentLabel")} #{1000 + i * 5 + j}</div>
                        <div style={{ color: C.muted, marginTop: 2 }}>
                          <Clock weight="bold" size={10} style={{ display: "inline", marginRight: 3 }} />
                          {t("pipeline.daysLabel", { days: 3 + j * 4 })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === "students" && (
          <section style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14 }}>
            <header style={{ padding: 18, borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between" }}>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: 18, fontWeight: 700 }}>{t("students.title")}</h2>
              <button style={{ background: C.red, color: "white", border: "none", padding: "8px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                {t("students.addButton")}
              </button>
            </header>
            <div>
              {STUDENTS.map((s, i) => (
                <div
                  key={s.name}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.4fr 1.4fr 0.8fr 90px",
                    padding: "16px 22px",
                    borderTop: i === 0 ? "none" : `1px solid ${C.border}`,
                    alignItems: "center",
                    fontSize: 14,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700 }}>{s.name}</div>
                    <div style={{ color: C.muted, fontSize: 12, marginTop: 2 }}>{s.track}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: 18, marginRight: 6 }}>{s.flag}</span>
                    {s.uni}
                  </div>
                  <span style={{ background: "#fff7e6", color: C.gold, padding: "3px 10px", borderRadius: 9999, fontSize: 11, fontWeight: 700, justifySelf: "start" }}>
                    {s.stage}
                  </span>
                  <span style={{ color: C.muted, fontSize: 12 }}>{t("students.daysInStage", { days: s.days })}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === "universities" && (
          <section>
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <h2 style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 800 }}>{t("universities.title")}</h2>
                <div style={{ color: C.muted, fontSize: 12, marginTop: 4 }}>{t("universities.subtitle")}</div>
              </div>
              <button style={{ background: C.red, color: "white", border: "none", padding: "8px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                {t("universities.addButton")}
              </button>
            </header>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
              {UNIVERSITIES.map((u) => (
                <div
                  key={u.i}
                  style={{
                    background: C.paper,
                    border: `1px solid ${C.border}`,
                    borderLeft: `4px solid ${u.success >= 85 ? C.gold : C.red}`,
                    borderRadius: 12,
                    padding: 18,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ position: "relative", width: 56, height: 56, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
                        <img
                          src={demoImages["china-agency"].photos[u.i % demoImages["china-agency"].photos.length]}
                          alt=""
                          loading="lazy"
                          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(135deg, rgba(185,28,28,0.55), rgba(58,10,10,0.65))",
                            pointerEvents: "none",
                          }}
                        />
                        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
                          <Buildings weight="bold" size={22} style={{ color: "white" }} />
                        </div>
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15, fontFamily: "Georgia, serif" }}>{t(`universities.list.${u.i}.name`)}</div>
                        <div style={{ color: C.muted, fontSize: 12, marginTop: 3, display: "flex", alignItems: "center", gap: 4 }}>
                          <MapPin weight="bold" size={11} />
                          {t(`universities.list.${u.i}.city`)}
                        </div>
                      </div>
                    </div>
                    <span style={{ background: u.success >= 85 ? "#fff7e6" : "#fbe9e7", color: u.success >= 85 ? C.gold : C.red, padding: "3px 9px", borderRadius: 9999, fontSize: 11, fontWeight: 800 }}>
                      {u.success}%
                    </span>
                  </div>

                  <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {[0, 1, 2].map((pi) => (
                      <span
                        key={pi}
                        style={{
                          background: C.bg,
                          border: `1px solid ${C.border}`,
                          borderRadius: 9999,
                          fontSize: 11,
                          padding: "3px 9px",
                          color: C.ink,
                          fontWeight: 600,
                        }}
                      >
                        {t(`universities.list.${u.i}.programs.${pi}`)}
                      </span>
                    ))}
                  </div>

                  <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px dashed ${C.border}`, display: "flex", justifyContent: "space-between", fontSize: 11, color: C.muted }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                      <Certificate weight="bold" size={12} style={{ color: C.gold }} />
                      {t("universities.successRate")}
                    </span>
                    <span>
                      <strong style={{ color: C.ink, fontWeight: 700 }}>{u.placed}</strong> {t("universities.placedSuffix")} · {t("universities.lastBatch")} {t(`universities.list.${u.i}.lastBatchMonth`)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === "documents" && (
          <section style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14 }}>
            <header style={{ padding: 18, borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h2 style={{ fontFamily: "Georgia, serif", fontSize: 18, fontWeight: 700 }}>{t("documents.title")}</h2>
                <div style={{ color: C.muted, fontSize: 12, marginTop: 4 }}>{t("documents.subtitle")}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ background: C.bg, color: C.ink, border: `1px solid ${C.border}`, padding: "8px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                  {t("documents.exportButton")}
                </button>
                <button style={{ background: C.red, color: "white", border: "none", padding: "8px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                  {t("documents.uploadButton")}
                </button>
              </div>
            </header>

            <div style={{ display: "grid", gridTemplateColumns: "32px 1.6fr 1.2fr 0.9fr 0.9fr", padding: "12px 22px", background: C.bg, fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 1, borderBottom: `1px solid ${C.border}` }}>
              <span></span>
              <span>{t("documents.col.student")}</span>
              <span>{t("documents.col.type")}</span>
              <span>{t("documents.col.status")}</span>
              <span>{t("documents.col.date")}</span>
            </div>

            <div>
              {DOCUMENTS.map((d) => {
                return (
                  <div
                    key={d.i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "32px 1.6fr 1.2fr 0.9fr 0.9fr",
                      padding: "14px 22px",
                      borderTop: `1px solid ${C.border}`,
                      alignItems: "center",
                      fontSize: 13,
                    }}
                  >
                    <span style={{ width: 26, height: 26, background: C.bg, borderRadius: 8, display: "grid", placeItems: "center" }}>
                      <Files weight="bold" size={14} style={{ color: C.red }} />
                    </span>
                    <div>
                      <div style={{ fontWeight: 700 }}>{t(`students.${d.studentIdx}.name`)}</div>
                      <div style={{ color: C.muted, fontSize: 11, marginTop: 2 }}>{t(`documents.entries.${d.i}.ref`)}</div>
                    </div>
                    <span style={{ color: C.ink }}>{t(`documents.types.${d.typeKey}`)}</span>
                    <span style={{ justifySelf: "start", display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <DemoBadge
                        palette={palette}
                        variant={badgeVariantFor(d.statusKey)}
                        label={t(`documents.status.${d.statusKey}`)}
                      />
                    </span>
                    <span style={{ color: C.muted, fontSize: 12 }}>{t(`documents.entries.${d.i}.date`)}</span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {tab === "consulting" && (
          <section style={{ display: "grid", gap: 18 }}>
            {[
              { date: "Mon · May 22", time: "10:00 — 11:00", student: "Liu Wei", topic: "HSK 5 prep + Tsinghua applications", mode: "in-person" },
              { date: "Mon · May 22", time: "14:30 — 15:30", student: "Faruh Bobojonov", topic: "Visa interview rehearsal", mode: "video" },
              { date: "Tue · May 23", time: "11:00 — 12:00", student: "Nodira Salimova", topic: "Scholarship essays review", mode: "video" },
              { date: "Tue · May 23", time: "16:00 — 17:00", student: "Daler Karimov", topic: "Career-track selection", mode: "in-person" },
              { date: "Wed · May 24", time: "09:30 — 10:30", student: "Aigerim Yusupova", topic: "PSC enrollment walkthrough", mode: "video" },
              { date: "Wed · May 24", time: "13:00 — 14:00", student: "Helena Marsh", topic: "Document checklist review", mode: "in-person" },
            ].map((s, i) => (
              <article key={i} style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 18, display: "grid", gridTemplateColumns: "160px 1fr auto auto", gap: 16, alignItems: "center" }}>
                <div>
                  <div style={{ fontFamily: "Georgia, serif", fontSize: 14, fontWeight: 700 }}>{s.date}</div>
                  <div style={{ color: C.muted, fontSize: 12 }}>{s.time}</div>
                </div>
                <div>
                  <div style={{ fontWeight: 700 }}>{s.student}</div>
                  <div style={{ color: C.muted, fontSize: 12, marginTop: 2 }}>{s.topic}</div>
                </div>
                <DemoBadge palette={palette} variant={s.mode === "in-person" ? "info" : "success"} label={t(`consulting.mode.${s.mode === "in-person" ? "inPerson" : "video"}`)} />
                <button
                  onClick={() => toast.push({ title: t("toast.sessionConfirmed", { name: s.student }), tone: "success" })}
                  style={{ padding: "6px 12px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12, fontWeight: 700, color: C.red, cursor: "pointer" }}
                >
                  {t("consulting.confirm")}
                </button>
              </article>
            ))}
          </section>
        )}

        {tab === "partners" && (
          <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
            {[
              { name: "Tsinghua University", city: "Beijing", placements: 84, commission: 18, hot: true },
              { name: "Fudan University", city: "Shanghai", placements: 62, commission: 16, hot: false },
              { name: "Zhejiang University", city: "Hangzhou", placements: 48, commission: 14, hot: false },
              { name: "Shanghai Jiao Tong", city: "Shanghai", placements: 56, commission: 17, hot: true },
              { name: "Wuhan University", city: "Wuhan", placements: 32, commission: 12, hot: false },
              { name: "Nanjing University", city: "Nanjing", placements: 28, commission: 13, hot: false },
            ].map((p, pIdx) => (
              <article key={p.name} style={{ background: C.paper, border: `1px solid ${C.border}`, borderTop: p.hot ? `4px solid ${C.red}` : `4px solid ${C.gold}`, borderRadius: 12, overflow: "hidden" }}>
                <div style={{ position: "relative", aspectRatio: "16/7", overflow: "hidden" }}>
                  <img
                    src={demoImages["china-agency"].photos[pIdx % demoImages["china-agency"].photos.length]}
                    alt=""
                    loading="lazy"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: p.hot
                        ? "linear-gradient(180deg, rgba(185,28,28,0.20) 0%, rgba(58,10,10,0.70) 100%)"
                        : "linear-gradient(180deg, rgba(184,134,11,0.18) 0%, rgba(58,10,10,0.65) 100%)",
                      pointerEvents: "none",
                    }}
                  />
                </div>
                <div style={{ padding: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontFamily: "Georgia, serif", fontSize: 16, fontWeight: 700 }}>{p.name}</div>
                    <div style={{ color: C.muted, fontSize: 12, marginTop: 2 }}>📍 {p.city}</div>
                  </div>
                  {p.hot && <DemoBadge palette={palette} variant="danger" label={t("partners.hot")} />}
                </div>
                <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div style={{ background: C.bg, padding: 10, borderRadius: 8 }}>
                    <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>{t("partners.placements")}</div>
                    <div style={{ fontSize: 20, fontWeight: 800, marginTop: 2 }}><DemoCounter value={p.placements} /></div>
                  </div>
                  <div style={{ background: C.bg, padding: 10, borderRadius: 8 }}>
                    <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>{t("partners.commission")}</div>
                    <div style={{ fontSize: 20, fontWeight: 800, marginTop: 2 }}>{p.commission}%</div>
                  </div>
                </div>
                </div>
              </article>
            ))}
          </section>
        )}

        {tab === "payments" && (
          <section style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
            <div style={{ padding: "12px 18px", background: C.bg, display: "grid", gridTemplateColumns: "1fr 140px 100px 120px 100px", fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: C.muted }}>
              <span>{t("payments.col.student")}</span>
              <span>{t("payments.col.purpose")}</span>
              <span style={{ textAlign: "right" }}>{t("payments.col.amount")}</span>
              <span>{t("payments.col.due")}</span>
              <span>{t("payments.col.status")}</span>
            </div>
            {[
              { student: "Liu Wei", purpose: "Service fee", amount: 1800, due: "May 24", status: "paid" },
              { student: "Faruh B.", purpose: "Tuition Tsinghua", amount: 12400, due: "Jun 04", status: "partial" },
              { student: "Nodira S.", purpose: "Service fee", amount: 1800, due: "May 26", status: "due" },
              { student: "Daler K.", purpose: "Visa fee + insurance", amount: 480, due: "May 22", status: "paid" },
              { student: "Aigerim Y.", purpose: "Tuition Fudan", amount: 10800, due: "Jun 12", status: "scheduled" },
              { student: "Helena M.", purpose: "Service fee + housing", amount: 4200, due: "May 30", status: "overdue" },
            ].map((p) => (
              <div key={p.student} style={{ display: "grid", gridTemplateColumns: "1fr 140px 100px 120px 100px", padding: "12px 18px", borderTop: `1px solid ${C.border}`, alignItems: "center", fontSize: 13 }}>
                <span style={{ fontWeight: 600 }}>{p.student}</span>
                <span style={{ color: C.muted }}>{p.purpose}</span>
                <span style={{ textAlign: "right", fontWeight: 700 }}>$<DemoCounter value={p.amount} /></span>
                <span style={{ color: C.muted, fontSize: 12 }}>{p.due}</span>
                <DemoBadge palette={palette} variant={p.status === "paid" ? "success" : p.status === "overdue" ? "danger" : p.status === "partial" ? "warn" : "info"} label={t(`payments.status.${p.status}`)} />
              </div>
            ))}
          </section>
        )}

        {tab === "visa" && (
          <section style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
            {(["docPrep", "submitted", "interview", "issued", "departed"] as const).map((stage, idx) => (
              <div key={stage} style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontSize: 10, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{t(`visa.stages.${stage}`)}</span>
                  <span style={{ background: C.red, color: "white", padding: "2px 8px", borderRadius: 9999, fontSize: 10, fontWeight: 800 }}>{[8, 5, 3, 6, 12][idx]}</span>
                </div>
                {([
                  ["Liu Wei", "May 18"],
                  ["Nodira S.", "May 16"],
                ] as [string, string][]).map(([name, date]) => (
                  <div key={name} style={{ padding: 10, background: C.bg, borderRadius: 8, marginBottom: 6, fontSize: 12 }}>
                    <div style={{ fontWeight: 700 }}>{name}</div>
                    <div style={{ color: C.muted, marginTop: 2, fontSize: 11 }}>{date}</div>
                  </div>
                ))}
              </div>
            ))}
          </section>
        )}

        {tab === "analytics" && (
          <section style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 18 }}>
            <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, fontFamily: "Georgia, serif" }}>{t("analytics.revenueTitle")}</h3>
                <span style={{ fontSize: 12, color: C.muted }}>{t("analytics.last30")}</span>
              </div>
              <DemoChart data={[1200, 1400, 1600, 1900, 2200, 2600, 2900, 3200, 3600, 4000, 4400, 4900, 5300, 5800, 6200, 6800, 7200, 7800, 8400, 9000, 9600, 10200, 10800, 11400, 12000, 12600, 13200, 13800, 14400, 15200]} palette={palette} height={200} />
            </div>
            <DemoLiveFeed
              palette={palette}
              liveLabel={t("analytics.liveFeed")}
              height={250}
              initial={[
                { id: "a1", title: "Visa issued · Liu Wei", meta: "Tsinghua · just now", tone: "success" },
                { id: "a2", title: "New inquiry · Karimov family", meta: "Dushanbe · 12s ago", tone: "info" },
                { id: "a3", title: "Tuition paid · $12,400", meta: "Faruh B. · 1m ago", tone: "success" },
              ]}
              rotating={[
                { id: "ar1", title: "Offer received · Fudan", meta: "Aigerim Y.", tone: "success" },
                { id: "ar2", title: "Doc uploaded · transcript", meta: "Nodira S.", tone: "info" },
                { id: "ar3", title: "Consulting session done", meta: "Daler K.", tone: "primary" },
              ]}
            />
          </section>
        )}

        {tab === "settings" && (
          <section style={{ display: "grid", gap: 18 }}>
            <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
              <h3 style={{ margin: "0 0 14px", fontSize: 16, fontWeight: 700, fontFamily: "Georgia, serif" }}>{t("settings.basicsTitle")}</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {(["agencyName", "contactEmail", "officeAddress", "license"] as const).map((f) => (
                  <div key={f}>
                    <label style={{ display: "block", fontSize: 10, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{t(`settings.fields.${f}`)}</label>
                    <input
                      defaultValue={t(`settings.placeholders.${f}`)}
                      style={{ width: "100%", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", fontSize: 13, color: C.ink, outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={() => toast.push({ title: t("toast.settingsSaved"), tone: "success" })}
                style={{ marginTop: 16, padding: "10px 18px", background: C.red, color: "white", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: "pointer" }}
              >
                {t("settings.save")}
              </button>
            </div>
            <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
              <h3 style={{ margin: "0 0 14px", fontSize: 16, fontWeight: 700, fontFamily: "Georgia, serif" }}>{t("settings.integrationsTitle")}</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
                {[
                  { name: "WeChat", emoji: "💬", on: true, desc: "settings.integrations.wechat" },
                  { name: "Stripe", emoji: "💳", on: true, desc: "settings.integrations.stripe" },
                  { name: "DocuSign", emoji: "✍️", on: true, desc: "settings.integrations.docusign" },
                  { name: "Zoom", emoji: "🎥", on: true, desc: "settings.integrations.zoom" },
                  { name: "Mailchimp", emoji: "✉️", on: false, desc: "settings.integrations.mailchimp" },
                  { name: "Notion", emoji: "📝", on: false, desc: "settings.integrations.notion" },
                ].map((i) => (
                  <div key={i.name} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ fontSize: 22 }}>{i.emoji}</div>
                      <DemoBadge palette={palette} variant={i.on ? "success" : "neutral"} label={t(i.on ? "settings.connected" : "settings.disconnected")} />
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 13, marginTop: 6 }}>{i.name}</div>
                    <div style={{ color: C.muted, fontSize: 11, lineHeight: 1.5, marginTop: 4 }}>{t(i.desc)}</div>
                    <button
                      onClick={() => toast.push({ title: t(i.on ? "toast.disconnected" : "toast.connected", { name: i.name }), tone: i.on ? "warn" : "success" })}
                      style={{ marginTop: 8, padding: "5px 10px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 11, fontWeight: 600, color: C.ink, cursor: "pointer" }}
                    >
                      {t(i.on ? "settings.disconnect" : "settings.connect")}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <div style={{ marginTop: 28, padding: 24, background: C.red, borderRadius: 16, color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700 }}>{t("cta.title")}</div>
            <div style={{ marginTop: 4, fontSize: 13, opacity: 0.9 }}>{t("cta.subtitle")}</div>
          </div>
          <button style={{ background: "white", color: C.red, padding: "10px 18px", borderRadius: 9999, fontSize: 13, fontWeight: 700, border: "none", display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
            {t("cta.button")} <ArrowRight weight="bold" size={14} />
          </button>
        </div>
      </main>

      <DemoStatusBar
        palette={palette}
        version={t("shell.statusBar.version")}
        region={t("shell.statusBar.region")}
        buildId={t("shell.statusBar.buildId")}
      />
    </div>
  );
}
