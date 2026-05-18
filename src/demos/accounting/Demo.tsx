"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  CalculatorIcon,
  DocumentTextIcon,
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  ArrowDownTrayIcon,
  CurrencyDollarIcon,
  ChartPieIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/20/solid";
import {
  DemoTopBar,
  DemoStatusBar,
  DemoKpiStrip,
  DemoScreenHeader,
  DemoBadge,
} from "@/components/demo-shell";

const C = {
  bg: "#f7f8fb",
  paper: "#ffffff",
  ink: "#0f172a",
  muted: "#64748b",
  navy: "#1e3a8a",
  gold: "#b45309",
  green: "#15803d",
  red: "#b91c1c",
  border: "#e2e8f0",
};

const palette = {
  bg: C.bg,
  paper: C.paper,
  ink: C.ink,
  muted: C.muted,
  primary: C.navy,
  border: C.border,
};

const CATEGORY_C: Record<string, string> = {
  rent: "#1e3a8a",
  payroll: "#7c3aed",
  software: "#0891b2",
  utilities: "#b45309",
  marketing: "#be185d",
};

type Tab = "ledger" | "invoices" | "expenses" | "reports";

type BadgeVariant = "neutral" | "success" | "warn" | "danger" | "info";

const statusVariant = (s: string): BadgeVariant => {
  switch (s) {
    case "Paid":
      return "success";
    case "Pending":
      return "warn";
    case "Overdue":
      return "danger";
    case "Sent":
      return "info";
    default:
      return "neutral";
  }
};

export function AccountingDemo() {
  const t = useTranslations("demoPreview.accounting");
  const [tab, setTab] = useState<Tab>("ledger");

  const INVOICES = [
    { n: "INV-1042", client: t("clients.helios"), amount: 12400, status: "Paid", due: t("dates.apr18") },
    { n: "INV-1043", client: t("clients.parkEight"), amount: 4800, status: "Pending", due: t("dates.may02") },
    { n: "INV-1044", client: t("clients.northbound"), amount: 18900, status: "Overdue", due: t("dates.apr10") },
    { n: "INV-1045", client: t("clients.ridgeSons"), amount: 2150, status: "Draft", due: "—" },
    { n: "INV-1046", client: t("clients.lumen"), amount: 7600, status: "Paid", due: t("dates.apr22") },
    { n: "INV-1047", client: t("clients.atlasGrove"), amount: 9320, status: "Pending", due: t("dates.may08") },
    { n: "INV-1048", client: t("clients.brightOak"), amount: 15400, status: "Paid", due: t("dates.may01") },
    { n: "INV-1049", client: t("clients.cobalt"), amount: 3680, status: "Overdue", due: t("dates.apr14") },
    { n: "INV-1050", client: t("clients.delmarCo"), amount: 22100, status: "Pending", due: t("dates.may12") },
    { n: "INV-1051", client: t("clients.echoLabs"), amount: 5240, status: "Paid", due: t("dates.may05") },
  ];

  const EXPENSES = [
    { cat: "rent", desc: t("expenses.items.officeRent"), amount: 8500, date: t("dates.may01") },
    { cat: "rent", desc: t("expenses.items.warehouseLease"), amount: 4200, date: t("dates.may01") },
    { cat: "payroll", desc: t("expenses.items.payrollMay1"), amount: 18600, date: t("dates.may01") },
    { cat: "payroll", desc: t("expenses.items.payrollMay15"), amount: 18600, date: t("dates.may15") },
    { cat: "payroll", desc: t("expenses.items.contractor"), amount: 4500, date: t("dates.may10") },
    { cat: "software", desc: t("expenses.items.aws"), amount: 1240, date: t("dates.may16") },
    { cat: "software", desc: t("expenses.items.figma"), amount: 180, date: t("dates.may03") },
    { cat: "software", desc: t("expenses.items.salesforce"), amount: 920, date: t("dates.may07") },
    { cat: "utilities", desc: t("expenses.items.electricity"), amount: 740, date: t("dates.may06") },
    { cat: "utilities", desc: t("expenses.items.internet"), amount: 320, date: t("dates.may06") },
    { cat: "marketing", desc: t("expenses.items.adsGoogle"), amount: 2400, date: t("dates.may09") },
    { cat: "marketing", desc: t("expenses.items.adsLinkedin"), amount: 1100, date: t("dates.may11") },
  ];

  const CATEGORIES: Array<keyof typeof CATEGORY_C> = ["rent", "payroll", "software", "utilities", "marketing"];
  const categoryLabel = (k: string) => t(`expenses.categories.${k}`);
  const categoryTotal = (k: string) => EXPENSES.filter((e) => e.cat === k).reduce((s, e) => s + e.amount, 0);
  const expensesTotal = EXPENSES.reduce((s, e) => s + e.amount, 0);

  const TREND = [
    { m: t("reports.months.dec"), rev: 142, exp: 76 },
    { m: t("reports.months.jan"), rev: 132, exp: 78 },
    { m: t("reports.months.feb"), rev: 148, exp: 82 },
    { m: t("reports.months.mar"), rev: 156, exp: 84 },
    { m: t("reports.months.apr"), rev: 172, exp: 88 },
    { m: t("reports.months.may"), rev: 184, exp: 91 },
  ];
  const trendMax = Math.max(...TREND.flatMap((d) => [d.rev, d.exp]));

  const statusLabel = (s: string) => {
    switch (s) {
      case "Paid": return t("status.paid");
      case "Sent": return t("status.sent");
      case "Pending": return t("status.pending");
      case "Overdue": return t("status.overdue");
      case "Draft": return t("status.draft");
      default: return s;
    }
  };

  const TABS: Array<{ id: Tab; label: string; Icon: typeof CalculatorIcon }> = [
    { id: "ledger", label: t("nav.ledger"), Icon: CalculatorIcon },
    { id: "invoices", label: t("nav.invoices"), Icon: DocumentTextIcon },
    { id: "expenses", label: t("nav.expenses"), Icon: CurrencyDollarIcon },
    { id: "reports", label: t("nav.reports"), Icon: ChartPieIcon },
  ];

  const breadcrumb =
    tab === "ledger"
      ? t("shell.breadcrumb.ledger")
      : tab === "invoices"
        ? t("shell.breadcrumb.invoices")
        : tab === "expenses"
          ? t("shell.breadcrumb.expenses")
          : t("shell.breadcrumb.reports");

  const screenEyebrow =
    tab === "ledger"
      ? t("shell.screen.ledger.eyebrow")
      : tab === "invoices"
        ? t("shell.screen.invoices.eyebrow")
        : tab === "expenses"
          ? t("shell.screen.expenses.eyebrow")
          : t("shell.screen.reports.eyebrow");

  const screenTitle =
    tab === "ledger"
      ? t("shell.screen.ledger.title")
      : tab === "invoices"
        ? t("shell.screen.invoices.title")
        : tab === "expenses"
          ? t("shell.screen.expenses.title")
          : t("shell.screen.reports.title");

  const screenSubtitle =
    tab === "ledger"
      ? t("shell.screen.ledger.subtitle")
      : tab === "invoices"
        ? t("shell.screen.invoices.subtitle")
        : tab === "expenses"
          ? t("shell.screen.expenses.subtitle")
          : t("shell.screen.reports.subtitle");

  const kpiItems: { label: string; value: string; trend: string; spark: number[] }[] =
    tab === "ledger"
      ? [
          { label: t("shell.kpi.ledger.0.label"), value: t("shell.kpi.ledger.0.value"), trend: t("shell.kpi.ledger.0.trend"), spark: [820, 860, 895, 910, 940, 980, 1020, 1080] },
          { label: t("shell.kpi.ledger.1.label"), value: t("shell.kpi.ledger.1.value"), trend: t("shell.kpi.ledger.1.trend"), spark: [310, 305, 318, 322, 318, 314, 312, 308] },
          { label: t("shell.kpi.ledger.2.label"), value: t("shell.kpi.ledger.2.value"), trend: t("shell.kpi.ledger.2.trend"), spark: [240, 260, 270, 285, 290, 300, 308, 312] },
          { label: t("shell.kpi.ledger.3.label"), value: t("shell.kpi.ledger.3.value"), trend: t("shell.kpi.ledger.3.trend"), spark: [38, 39, 40, 41, 41, 42, 42, 43] },
        ]
      : tab === "invoices"
        ? [
            { label: t("shell.kpi.invoices.0.label"), value: t("shell.kpi.invoices.0.value"), trend: t("shell.kpi.invoices.0.trend"), spark: [18, 22, 24, 26, 28, 27, 30, 32] },
            { label: t("shell.kpi.invoices.1.label"), value: t("shell.kpi.invoices.1.value"), trend: t("shell.kpi.invoices.1.trend"), spark: [12, 14, 18, 20, 22, 24, 23, 22] },
            { label: t("shell.kpi.invoices.2.label"), value: t("shell.kpi.invoices.2.value"), trend: t("shell.kpi.invoices.2.trend"), spark: [42, 40, 38, 36, 34, 33, 31, 29] },
            { label: t("shell.kpi.invoices.3.label"), value: t("shell.kpi.invoices.3.value"), trend: t("shell.kpi.invoices.3.trend"), spark: [8, 10, 12, 14, 14, 16, 18, 22] },
          ]
        : tab === "expenses"
          ? [
              { label: t("shell.kpi.expenses.0.label"), value: t("shell.kpi.expenses.0.value"), trend: t("shell.kpi.expenses.0.trend"), spark: [22, 28, 34, 38, 44, 52, 62, 76] },
              { label: t("shell.kpi.expenses.1.label"), value: t("shell.kpi.expenses.1.value"), trend: t("shell.kpi.expenses.1.trend"), spark: [38, 40, 39, 41, 40, 42, 41, 41] },
              { label: t("shell.kpi.expenses.2.label"), value: t("shell.kpi.expenses.2.value"), trend: t("shell.kpi.expenses.2.trend"), spark: [82, 86, 88, 90, 92, 95, 96, 98] },
              { label: t("shell.kpi.expenses.3.label"), value: t("shell.kpi.expenses.3.value"), trend: t("shell.kpi.expenses.3.trend"), spark: [22, 23, 24, 25, 26, 27, 28, 29] },
            ]
          : [
              { label: t("shell.kpi.reports.0.label"), value: t("shell.kpi.reports.0.value"), trend: t("shell.kpi.reports.0.trend"), spark: [142, 132, 148, 156, 172, 184, 192, 204] },
              { label: t("shell.kpi.reports.1.label"), value: t("shell.kpi.reports.1.value"), trend: t("shell.kpi.reports.1.trend"), spark: [44, 45, 46, 46, 47, 47, 48, 49] },
              { label: t("shell.kpi.reports.2.label"), value: t("shell.kpi.reports.2.value"), trend: t("shell.kpi.reports.2.trend"), spark: [54, 60, 68, 72, 80, 86, 92, 98] },
              { label: t("shell.kpi.reports.3.label"), value: t("shell.kpi.reports.3.value"), trend: t("shell.kpi.reports.3.trend"), spark: [9, 10, 11, 12, 13, 14, 15, 16] },
            ];

  return (
    <div
      style={{
        background: C.bg,
        minHeight: "100vh",
        color: C.ink,
        fontFamily: "Inter, ui-sans-serif",
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
              background: C.navy,
              borderRadius: 8,
              display: "grid",
              placeItems: "center",
            }}
          >
            <CalculatorIcon style={{ width: 16, height: 16, color: "white" }} />
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
          padding: "10px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div style={{ fontSize: 11, color: C.muted, letterSpacing: 1, textTransform: "uppercase", fontWeight: 600 }}>
          {t("fiscalPeriod")}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {TABS.map((tn) => {
            const active = tab === tn.id;
            const Icon = tn.Icon;
            return (
              <button
                key={tn.id}
                onClick={() => setTab(tn.id)}
                style={{
                  background: active ? C.navy : "transparent",
                  color: active ? "white" : C.muted,
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Icon style={{ width: 14, height: 14 }} />
                {tn.label}
              </button>
            );
          })}
        </div>
      </div>

      <main style={{ padding: 32, maxWidth: 1400, margin: "0 auto", width: "100%", flex: 1 }}>
        <DemoScreenHeader
          palette={palette}
          eyebrow={screenEyebrow}
          title={screenTitle}
          subtitle={screenSubtitle}
        />

        <DemoKpiStrip palette={palette} items={kpiItems} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 32 }}>
          {[
            { label: t("stats.revenueMTD"), v: "$184,200", trend: "+12.4%", up: true },
            { label: t("stats.expensesMTD"), v: "$76,840", trend: "+3.1%", up: false },
            { label: t("stats.outstandingAR"), v: "$42,180", trend: "—", up: true },
            { label: t("stats.cashOnHand"), v: "$312,940", trend: "+$28k", up: true },
          ].map((s) => (
            <div key={s.label} style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 18 }}>
              <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div>
              <div style={{ fontSize: 26, fontWeight: 700, marginTop: 6 }}>{s.v}</div>
              <div
                style={{
                  marginTop: 4,
                  fontSize: 12,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  color: s.up ? C.green : C.red,
                }}
              >
                {s.up ? <ArrowUpRightIcon style={{ width: 12, height: 12 }} /> : <ArrowDownRightIcon style={{ width: 12, height: 12 }} />}
                {s.trend}
              </div>
            </div>
          ))}
        </div>

        {tab === "ledger" && (
          <section style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>{t("ledger.title")}</h2>
            {[
              { date: t("ledger.dates.may17"), desc: t("ledger.tx.heliosWire"), deb: "", cre: 12400 },
              { date: t("ledger.dates.may17"), desc: t("ledger.tx.stripePayout"), deb: "", cre: 8420 },
              { date: t("ledger.dates.may16"), desc: t("ledger.tx.awsInvoice"), deb: 1240, cre: "" },
              { date: t("ledger.dates.may16"), desc: t("ledger.tx.payroll"), deb: 18600, cre: "" },
              { date: t("ledger.dates.may15"), desc: t("ledger.tx.lumenAch"), deb: "", cre: 7600 },
            ].map((tx, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "80px 1fr 120px 120px", padding: "12px 0", borderTop: i === 0 ? "none" : `1px solid ${C.border}`, fontSize: 14 }}>
                <span style={{ color: C.muted }}>{tx.date}</span>
                <span>{tx.desc}</span>
                <span style={{ textAlign: "right", color: C.red, fontWeight: 600 }}>{tx.deb ? `-$${tx.deb.toLocaleString()}` : "—"}</span>
                <span style={{ textAlign: "right", color: C.green, fontWeight: 600 }}>{tx.cre ? `+$${tx.cre.toLocaleString()}` : "—"}</span>
              </div>
            ))}
          </section>
        )}

        {tab === "invoices" && (
          <section style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14 }}>
            <header style={{ padding: "18px 22px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between" }}>
              <h2 style={{ fontSize: 16, fontWeight: 700 }}>{t("invoices.title")}</h2>
              <button style={{ background: C.navy, color: "white", border: "none", padding: "8px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                {t("invoices.newInvoice")}
              </button>
            </header>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  {[
                    { key: "number", label: t("invoices.col.number") },
                    { key: "client", label: t("invoices.col.client") },
                    { key: "due", label: t("invoices.col.due") },
                    { key: "amount", label: t("invoices.col.amount") },
                    { key: "status", label: t("invoices.col.status") },
                    { key: "empty", label: "" },
                  ].map((h) => (
                    <th key={h.key} style={{ textAlign: "left", padding: "12px 18px", fontSize: 11, textTransform: "uppercase", color: C.muted, letterSpacing: 0.5 }}>
                      {h.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {INVOICES.map((inv, i) => (
                  <tr key={inv.n} style={{ borderTop: i === 0 ? "none" : `1px solid ${C.border}` }}>
                    <td style={{ padding: "14px 18px", fontWeight: 600 }}>{inv.n}</td>
                    <td style={{ padding: "14px 18px" }}>{inv.client}</td>
                    <td style={{ padding: "14px 18px", color: C.muted }}>{inv.due}</td>
                    <td style={{ padding: "14px 18px", fontWeight: 700 }}>${inv.amount.toLocaleString()}</td>
                    <td style={{ padding: "14px 18px" }}>
                      <DemoBadge palette={palette} variant={statusVariant(inv.status)} label={statusLabel(inv.status)} />
                    </td>
                    <td style={{ padding: "14px 18px" }}>
                      <DocumentTextIcon style={{ width: 14, height: 14, color: C.muted, cursor: "pointer" }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {tab === "expenses" && (
          <section style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14 }}>
            <header style={{ padding: "18px 22px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h2 style={{ fontSize: 16, fontWeight: 700 }}>{t("expenses.title")}</h2>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{t("expenses.subtitle")}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>{t("expenses.total")}</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>${expensesTotal.toLocaleString()}</div>
              </div>
            </header>
            <div style={{ padding: 22, display: "flex", flexDirection: "column", gap: 18 }}>
              {CATEGORIES.map((cat) => {
                const items = EXPENSES.filter((e) => e.cat === cat);
                const total = categoryTotal(cat);
                return (
                  <div key={cat}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                        <span style={{ width: 8, height: 8, borderRadius: 2, background: CATEGORY_C[cat] }} />
                        <span style={{ fontWeight: 700, fontSize: 13 }}>{categoryLabel(cat)}</span>
                        <span style={{ fontSize: 11, color: C.muted }}>· {items.length}</span>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>${total.toLocaleString()}</div>
                    </div>
                    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>
                      {items.map((e, i) => (
                        <div
                          key={i}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "80px 1fr 120px",
                            padding: "10px 14px",
                            borderTop: i === 0 ? "none" : `1px solid ${C.border}`,
                            fontSize: 13,
                            background: C.paper,
                          }}
                        >
                          <span style={{ color: C.muted }}>{e.date}</span>
                          <span>{e.desc}</span>
                          <span style={{ textAlign: "right", fontWeight: 600 }}>${e.amount.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {tab === "reports" && (
          <section style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700 }}>{t("reports.title")}</h2>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: C.green, fontWeight: 600 }}>
                <ArrowTrendingUpIcon style={{ width: 14, height: 14 }} />
                {t("reports.trendUp")}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 22 }}>
              {[
                { label: t("reports.pnl.revenue"), v: 932400, color: C.navy },
                { label: t("reports.pnl.cost"), v: 498200, color: C.gold },
                { label: t("reports.pnl.profit"), v: 434200, color: C.green },
              ].map((p) => (
                <div key={p.label} style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 16 }}>
                  <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>{p.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, marginTop: 6, color: p.color }}>${p.v.toLocaleString()}</div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 12, color: C.muted, marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
              {t("reports.sixMonthTrend")}
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 18, height: 220, padding: "0 16px" }}>
              {TREND.map((d) => (
                <div key={d.m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ width: "100%", display: "flex", gap: 4, alignItems: "flex-end", height: "100%" }}>
                    <div style={{ flex: 1, background: C.navy, borderRadius: "4px 4px 0 0", height: `${(d.rev / trendMax) * 100}%` }} />
                    <div style={{ flex: 1, background: C.gold, borderRadius: "4px 4px 0 0", height: `${(d.exp / trendMax) * 100}%` }} />
                  </div>
                  <span style={{ fontSize: 11, color: C.muted, marginTop: 6 }}>{d.m}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, display: "flex", gap: 16, justifyContent: "center", fontSize: 12, color: C.muted }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 10, height: 10, background: C.navy, borderRadius: 2 }} /> {t("reports.legend.revenue")}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 10, height: 10, background: C.gold, borderRadius: 2 }} /> {t("reports.legend.expenses")}
              </div>
            </div>
            <button
              style={{ marginTop: 18, display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", background: C.paper, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
            >
              <ArrowDownTrayIcon style={{ width: 12, height: 12 }} /> {t("reports.exportPdf")}
            </button>
          </section>
        )}
      </main>

      <DemoStatusBar
        palette={palette}
        version={t("shell.version")}
        region={t("shell.region")}
        buildId={t("shell.build")}
      />
    </div>
  );
}
