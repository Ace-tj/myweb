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
} from "@phosphor-icons/react";
import {
  DemoTopBar,
  DemoStatusBar,
  DemoKpiStrip,
  DemoScreenHeader,
  DemoBadge,
} from "@/components/demo-shell";

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

type Tab = "pipeline" | "students" | "universities" | "documents";

export function ChinaAgencyDemo() {
  const t = useTranslations("demoPreview.china-agency");
  const [tab, setTab] = useState<Tab>("pipeline");

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

  const breadcrumb =
    tab === "pipeline"
      ? t("shell.breadcrumb.pipeline")
      : tab === "students"
        ? t("shell.breadcrumb.students")
        : tab === "universities"
          ? t("shell.breadcrumb.universities")
          : t("shell.breadcrumb.documents");

  const screenEyebrow =
    tab === "pipeline"
      ? t("screen.pipeline.eyebrow")
      : tab === "students"
        ? t("screen.students.eyebrow")
        : tab === "universities"
          ? t("screen.universities.eyebrow")
          : t("screen.documents.eyebrow");

  const screenTitle =
    tab === "pipeline"
      ? t("screen.pipeline.title")
      : tab === "students"
        ? t("screen.students.title")
        : tab === "universities"
          ? t("screen.universities.title")
          : t("screen.documents.title");

  const screenSubtitle =
    tab === "pipeline"
      ? t("screen.pipeline.subtitle")
      : tab === "students"
        ? t("screen.students.subtitle")
        : tab === "universities"
          ? t("screen.universities.subtitle")
          : t("screen.documents.subtitle");

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
          : [
              { label: t("kpi.documents.0.label"), value: t("kpi.documents.0.value"), trend: t("kpi.documents.0.trend"), spark: [44, 48, 52, 56, 58, 62, 64, 68] },
              { label: t("kpi.documents.1.label"), value: t("kpi.documents.1.value"), trend: t("kpi.documents.1.trend"), spark: [6, 8, 9, 11, 12, 14, 16, 18] },
              { label: t("kpi.documents.2.label"), value: t("kpi.documents.2.value"), trend: t("kpi.documents.2.trend"), spark: [12, 11, 10, 9, 8, 8, 7, 7] },
              { label: t("kpi.documents.3.label"), value: t("kpi.documents.3.value"), trend: t("kpi.documents.3.trend"), spark: [8, 7, 6, 6, 5, 4, 4, 3] },
            ];

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
        {[
          { id: "pipeline" as const, label: t("nav.pipeline") },
          { id: "students" as const, label: t("nav.students") },
          { id: "universities" as const, label: t("nav.universities") },
          { id: "documents" as const, label: t("nav.documents") },
        ].map((tItem) => {
          const active = tab === tItem.id;
          return (
            <button
              key={tItem.id}
              onClick={() => setTab(tItem.id)}
              style={{
                background: active ? C.red : "transparent",
                color: active ? "white" : C.muted,
                border: "none",
                padding: "8px 18px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {tItem.label}
            </button>
          );
        })}
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
                      <div style={{ width: 38, height: 38, background: C.bg, borderRadius: 10, display: "grid", placeItems: "center", flexShrink: 0 }}>
                        <Buildings weight="bold" size={20} style={{ color: C.red }} />
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
