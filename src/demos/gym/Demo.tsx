"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { IconBarbell, IconFlame, IconCalendar, IconUsers, IconTrendingUp, IconBolt } from "@tabler/icons-react";

const C = {
  bg: "#0a0a0a",
  surface: "#141414",
  card: "#1c1c1c",
  ink: "#fafafa",
  muted: "#888",
  neon: "#a3e635",
  border: "#262626",
};

export function GymDemo() {
  const t = useTranslations("demoPreview.gym");
  const [tab, setTab] = useState<"today" | "members" | "kpi">("today");

  const CLASSES = [
    { time: "06:00", name: t("classes.hiitBurner"), coach: t("coaches.alex"), spots: 4, max: 16, intensity: 4 },
    { time: "07:30", name: t("classes.powerHour"), coach: t("coaches.mira"), spots: 12, max: 14, intensity: 5 },
    { time: "12:00", name: t("classes.lunchMobility"), coach: t("coaches.sam"), spots: 2, max: 10, intensity: 1 },
    { time: "17:30", name: t("classes.strengthLab"), coach: t("coaches.mira"), spots: 8, max: 12, intensity: 4 },
    { time: "18:30", name: t("classes.boxingFoundations"), coach: t("coaches.jordan"), spots: 6, max: 14, intensity: 3 },
    { time: "19:30", name: t("classes.coolDownYoga"), coach: t("coaches.alex"), spots: 10, max: 16, intensity: 1 },
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.ink, fontFamily: "Inter, ui-sans-serif" }}>
      <header
        style={{
          padding: "20px 32px",
          borderBottom: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: C.neon, color: C.bg, display: "grid", placeItems: "center", borderRadius: 10 }}>
            <IconBarbell style={{ width: 20, height: 20 }} stroke={2} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18, letterSpacing: -0.5 }}>{t("brand")}</div>
            <div style={{ fontSize: 11, color: C.muted, letterSpacing: 2, textTransform: "uppercase" }}>
              {t("tagline")}
            </div>
          </div>
        </div>
        <nav style={{ display: "flex", gap: 4 }}>
          {[
            { id: "today", label: t("nav.today") },
            { id: "members", label: t("nav.members") },
            { id: "kpi", label: t("nav.kpis") },
          ].map((tab2) => {
            const active = tab === tab2.id;
            return (
              <button
                key={tab2.id}
                onClick={() => setTab(tab2.id as typeof tab)}
                style={{
                  background: active ? C.neon : "transparent",
                  color: active ? C.bg : C.ink,
                  border: "none",
                  padding: "8px 18px",
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  cursor: "pointer",
                }}
              >
                {tab2.label}
              </button>
            );
          })}
        </nav>
      </header>

      <main style={{ padding: 32, maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
          {[
            { Icon: IconUsers, label: t("stats.activeMembers.label"), v: "412", sub: t("stats.activeMembers.sub") },
            { Icon: IconCalendar, label: t("stats.bookingsToday.label"), v: "186", sub: t("stats.bookingsToday.sub") },
            { Icon: IconFlame, label: t("stats.checkInsLive.label"), v: "67", sub: t("stats.checkInsLive.sub") },
            { Icon: IconTrendingUp, label: t("stats.revenueMtd.label"), v: "$24,180", sub: t("stats.revenueMtd.sub") },
          ].map((s) => (
            <div key={s.label} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 18 }}>
              <s.Icon style={{ width: 18, height: 18, color: C.neon }} stroke={2} />
              <div style={{ fontSize: 11, color: C.muted, marginTop: 8, textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</div>
              <div style={{ fontSize: 26, fontWeight: 800, marginTop: 4 }}>{s.v}</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {tab === "today" && (
          <section>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16, letterSpacing: -0.5 }}>
              {t("today.heading")}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {CLASSES.map((c) => {
                const full = c.spots === 0;
                const pct = ((c.max - c.spots) / c.max) * 100;
                return (
                  <article
                    key={c.time}
                    style={{
                      background: C.surface,
                      border: `1px solid ${C.border}`,
                      borderRadius: 14,
                      padding: "16px 20px",
                      display: "grid",
                      gridTemplateColumns: "80px 1.5fr 1fr 200px 100px",
                      alignItems: "center",
                      gap: 16,
                    }}
                  >
                    <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -1 }}>{c.time}</div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700 }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{t("today.coachPrefix")} {c.coach}</div>
                    </div>
                    <div style={{ display: "flex", gap: 3 }}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <IconBolt
                          key={i}
                          stroke={2}
                          style={{
                            width: 14,
                            height: 14,
                            color: i < c.intensity ? C.neon : "#333",
                            fill: i < c.intensity ? C.neon : "transparent",
                          }}
                        />
                      ))}
                    </div>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.muted, marginBottom: 4 }}>
                        <span>{c.max - c.spots}/{c.max} {t("today.booked")}</span>
                        <span>{c.spots} {t("today.left")}</span>
                      </div>
                      <div style={{ height: 6, background: C.card, borderRadius: 999 }}>
                        <div style={{ width: `${pct}%`, height: "100%", background: C.neon, borderRadius: 999 }} />
                      </div>
                    </div>
                    <button
                      disabled={full}
                      style={{
                        padding: "10px 14px",
                        background: full ? C.card : C.neon,
                        color: full ? C.muted : C.bg,
                        border: "none",
                        borderRadius: 8,
                        fontWeight: 700,
                        fontSize: 12,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        cursor: full ? "not-allowed" : "pointer",
                      }}
                    >
                      {full ? t("today.full") : t("today.book")}
                    </button>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {tab === "members" && (
          <section>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>{t("members.heading")}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
              {[
                { n: t("members.list.tatiana"), plan: t("members.plans.proAnnual"), days: 312, status: t("members.status.active") },
                { n: t("members.list.marcus"), plan: t("members.plans.liteMonthly"), days: 28, status: t("members.status.active") },
                { n: t("members.list.anya"), plan: t("members.plans.proQuarterly"), days: 90, status: t("members.status.pending") },
                { n: t("members.list.daler"), plan: t("members.plans.dropIn"), days: 1, status: t("members.status.new") },
                { n: t("members.list.maya"), plan: t("members.plans.proAnnual"), days: 184, status: t("members.status.active") },
                { n: t("members.list.sergei"), plan: t("members.plans.liteMonthly"), days: 9, status: t("members.status.expiring") },
              ].map((m) => (
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
                  <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", fontSize: 11, color: C.muted }}>
                    <span>{t("members.dayPrefix")} {m.days}</span>
                    <span style={{ color: m.status === t("members.status.expiring") ? "#f87171" : C.neon }}>{m.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === "kpi" && (
          <section>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>{t("kpi.heading")}</h2>
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 24 }}>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 200 }}>
                {[34, 52, 41, 67, 73, 58, 81, 95, 78, 88, 102, 96, 110, 124].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      background: i === 13 ? C.neon : `${C.neon}50`,
                      borderRadius: "4px 4px 0 0",
                      height: `${h}%`,
                    }}
                  />
                ))}
              </div>
              <div style={{ marginTop: 12, fontSize: 12, color: C.muted, textAlign: "center" }}>
                {t("kpi.caption")}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
