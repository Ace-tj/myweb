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
  UserGroupIcon,
  BanknotesIcon,
  ReceiptPercentIcon,
  BriefcaseIcon,
  FolderOpenIcon,
  Cog6ToothIcon,
} from "@heroicons/react/20/solid";
import {
  DemoTopBar,
  DemoStatusBar,
  DemoKpiStrip,
  DemoScreenHeader,
  DemoBadge,
} from "@/components/demo-shell";
import { demoImages } from "@/lib/demo-images";
import {
  DemoCommandPalette,
  DemoCounter,
  DemoChart,
  DemoHeatmap,
  DemoLiveFeed,
  DemoToastProvider,
  useDemoToast,
  type PaletteItem,
} from "@/components/demo-shell/wow";

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

type Tab =
  | "ledger"
  | "invoices"
  | "expenses"
  | "reports"
  | "clients"
  | "banking"
  | "taxes"
  | "payroll"
  | "projects"
  | "settings";

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
  return (
    <DemoToastProvider palette={palette}>
      <AccountingInner />
    </DemoToastProvider>
  );
}

function AccountingInner() {
  const t = useTranslations("demoPreview.accounting");
  const [tab, setTab] = useState<Tab>("ledger");
  const toast = useDemoToast();

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
    { id: "clients", label: t("nav.clients"), Icon: UserGroupIcon },
    { id: "banking", label: t("nav.banking"), Icon: BanknotesIcon },
    { id: "taxes", label: t("nav.taxes"), Icon: ReceiptPercentIcon },
    { id: "payroll", label: t("nav.payroll"), Icon: BriefcaseIcon },
    { id: "projects", label: t("nav.projects"), Icon: FolderOpenIcon },
    { id: "reports", label: t("nav.reports"), Icon: ChartPieIcon },
    { id: "settings", label: t("nav.settings"), Icon: Cog6ToothIcon },
  ];

  const paletteItems: PaletteItem[] = TABS.map((tb) => ({
    id: tb.id,
    label: tb.label,
    group: t("commandPalette.group"),
    onRun: () => {
      setTab(tb.id);
      toast.push({ title: t("toast.navigated", { screen: tb.label }) });
    },
  }));

  const breadcrumb = t(`shell.breadcrumb.${tab}`);
  const screenEyebrow = t(`shell.screen.${tab}.eyebrow`);
  const screenTitle = t(`shell.screen.${tab}.title`);
  const screenSubtitle = t(`shell.screen.${tab}.subtitle`);

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
          : tab === "reports"
          ? [
              { label: t("shell.kpi.reports.0.label"), value: t("shell.kpi.reports.0.value"), trend: t("shell.kpi.reports.0.trend"), spark: [142, 132, 148, 156, 172, 184, 192, 204] },
              { label: t("shell.kpi.reports.1.label"), value: t("shell.kpi.reports.1.value"), trend: t("shell.kpi.reports.1.trend"), spark: [44, 45, 46, 46, 47, 47, 48, 49] },
              { label: t("shell.kpi.reports.2.label"), value: t("shell.kpi.reports.2.value"), trend: t("shell.kpi.reports.2.trend"), spark: [54, 60, 68, 72, 80, 86, 92, 98] },
              { label: t("shell.kpi.reports.3.label"), value: t("shell.kpi.reports.3.value"), trend: t("shell.kpi.reports.3.trend"), spark: [9, 10, 11, 12, 13, 14, 15, 16] },
            ]
          : (["0", "1", "2", "3"] as const).map((i) => ({
              label: t(`shell.kpi.${tab}.${i}.label`),
              value: t(`shell.kpi.${tab}.${i}.value`),
              trend: t(`shell.kpi.${tab}.${i}.trend`),
              spark: [40, 44, 48, 52, 56, 60, 64, 68].map((n) => n + (Number(i) * 12)),
            }));

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
        rightSlot={<DemoCommandPalette palette={palette} items={paletteItems} placeholder={t("commandPalette.placeholder")} hint="⌘K" />}
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
        {tab === "ledger" && (
          <div
            style={{
              position: "relative",
              height: 120,
              borderRadius: 12,
              overflow: "hidden",
              marginBottom: 20,
            }}
          >
            <img
              src={demoImages.accounting.hero}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(135deg, ${C.navy}ee, ${C.navy}aa)`,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                padding: 18,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                color: "white",
              }}
            >
              <span style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", opacity: 0.85 }}>
                {screenEyebrow}
              </span>
              <span style={{ fontSize: 22, fontWeight: 700 }}>
                {screenTitle}
              </span>
            </div>
          </div>
        )}

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

        {tab === "clients" && (
          <section style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
            <div style={{ padding: "12px 18px", background: C.bg, display: "grid", gridTemplateColumns: "1fr 110px 100px 100px 90px", fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: C.muted }}>
              <span>{t("clientsScreen.col.name")}</span>
              <span>{t("clientsScreen.col.industry")}</span>
              <span style={{ textAlign: "right" }}>{t("clientsScreen.col.ytd")}</span>
              <span style={{ textAlign: "right" }}>{t("clientsScreen.col.outstanding")}</span>
              <span>{t("clientsScreen.col.status")}</span>
            </div>
            {[
              { name: "Helios Studios", industry: "Design", ytd: 84200, due: 4800, status: "active" },
              { name: "Northbound Logistics", industry: "Logistics", ytd: 142000, due: 18900, status: "overdue" },
              { name: "Park Eight Capital", industry: "Finance", ytd: 96400, due: 0, status: "active" },
              { name: "Ridge & Sons", industry: "Manufacturing", ytd: 22400, due: 2150, status: "draft" },
              { name: "Lumen Health", industry: "Healthcare", ytd: 64800, due: 0, status: "active" },
              { name: "Sunset Coast Co", industry: "Hospitality", ytd: 38200, due: 8400, status: "active" },
            ].map((c) => (
              <div key={c.name} style={{ display: "grid", gridTemplateColumns: "1fr 110px 100px 100px 90px", padding: "12px 18px", borderTop: `1px solid ${C.border}`, alignItems: "center", fontSize: 13 }}>
                <span style={{ fontWeight: 600 }}>{c.name}</span>
                <span style={{ color: C.muted }}>{c.industry}</span>
                <span style={{ textAlign: "right", fontWeight: 700 }}>$<DemoCounter value={c.ytd} /></span>
                <span style={{ textAlign: "right", color: c.due > 0 ? C.red : C.muted }}>{c.due > 0 ? `$${c.due.toLocaleString()}` : "—"}</span>
                <DemoBadge palette={palette} variant={c.status === "active" ? "success" : c.status === "overdue" ? "danger" : "neutral"} label={t(`clientsScreen.status.${c.status}`)} />
              </div>
            ))}
          </section>
        )}

        {tab === "banking" && (
          <section style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 18 }}>
            <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>{t("banking.cashFlow")}</h3>
                <span style={{ fontSize: 12, color: C.muted }}>{t("banking.last30")}</span>
              </div>
              <DemoChart data={[120, 132, 128, 145, 162, 158, 178, 184, 192, 210, 218, 232, 248, 256, 268, 284, 296, 302, 318, 332, 346, 358, 372, 388, 402, 416, 432, 448, 462, 478]} palette={palette} height={200} />
              <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                {[
                  { name: "Chase Business · 4821", bal: 312940, change: "+12.4%" },
                  { name: "Wise Multi-currency", bal: 84620, change: "+3.1%" },
                  { name: "Mercury Reserve", bal: 184000, change: "+0.8%" },
                ].map((a) => (
                  <div key={a.name} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: 12 }}>
                    <div style={{ fontSize: 11, color: C.muted, fontWeight: 600 }}>{a.name}</div>
                    <div style={{ fontSize: 18, fontWeight: 800, marginTop: 4 }}>$<DemoCounter value={a.bal} /></div>
                    <div style={{ fontSize: 11, color: C.green, fontWeight: 700, marginTop: 2 }}>{a.change}</div>
                  </div>
                ))}
              </div>
            </div>
            <DemoLiveFeed
              palette={palette}
              liveLabel={t("banking.liveFeed")}
              height={320}
              initial={[
                { id: "b1", title: "INV-1042 received · Helios", meta: "+$12,400 · just now", tone: "success" },
                { id: "b2", title: "ACH out · Payroll", meta: "−$28,400 · 14s ago", tone: "warn" },
                { id: "b3", title: "Card spend · AWS", meta: "−$1,820 · 1m ago", tone: "primary" },
              ]}
              rotating={[
                { id: "br1", title: "FX gain on EUR balance", meta: "+$240", tone: "success" },
                { id: "br2", title: "Wire received · Park Eight", meta: "+$4,800", tone: "success" },
                { id: "br3", title: "Stripe payout", meta: "+$18,420", tone: "success" },
              ]}
            />
          </section>
        )}

        {tab === "taxes" && (
          <section style={{ display: "grid", gap: 18 }}>
            <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
              <h3 style={{ margin: "0 0 14px", fontSize: 16, fontWeight: 700 }}>{t("taxes.estPaymentsTitle")}</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
                {[
                  { q: "Q1", due: "Apr 15", amt: 28400, status: "paid" },
                  { q: "Q2", due: "Jun 15", amt: 32200, status: "due" },
                  { q: "Q3", due: "Sep 15", amt: 34800, status: "future" },
                  { q: "Q4", due: "Jan 15", amt: 38600, status: "future" },
                ].map((q) => (
                  <div key={q.q} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16 }}>
                    <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>{q.q} · {q.due}</div>
                    <div style={{ fontSize: 22, fontWeight: 800, marginTop: 6 }}>$<DemoCounter value={q.amt} /></div>
                    <div style={{ marginTop: 8 }}>
                      <DemoBadge palette={palette} variant={q.status === "paid" ? "success" : q.status === "due" ? "warn" : "neutral"} label={t(`taxes.status.${q.status}`)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
              <h3 style={{ margin: "0 0 14px", fontSize: 16, fontWeight: 700 }}>{t("taxes.docTrackerTitle")}</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 140px 100px", padding: "10px 12px", background: C.bg, borderRadius: 8, fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: C.muted }}>
                <span>{t("taxes.col.doc")}</span>
                <span>{t("taxes.col.form")}</span>
                <span>{t("taxes.col.received")}</span>
                <span>{t("taxes.col.status")}</span>
              </div>
              {[
                { doc: "W-2 · Marcus J.", form: "W-2", received: "Jan 28", status: "received" },
                { doc: "1099-NEC · Sara T.", form: "1099-NEC", received: "Feb 02", status: "received" },
                { doc: "K-1 · Park Eight", form: "K-1", received: "—", status: "pending" },
                { doc: "1099-MISC · Ridge", form: "1099-MISC", received: "Feb 14", status: "received" },
              ].map((d) => (
                <div key={d.doc} style={{ display: "grid", gridTemplateColumns: "1fr 120px 140px 100px", padding: "12px 12px", borderTop: `1px solid ${C.border}`, alignItems: "center", fontSize: 13 }}>
                  <span style={{ fontWeight: 600 }}>{d.doc}</span>
                  <span style={{ color: C.muted, fontFamily: "ui-monospace, monospace" }}>{d.form}</span>
                  <span style={{ color: C.muted }}>{d.received}</span>
                  <DemoBadge palette={palette} variant={d.status === "received" ? "success" : "warn"} label={t(`taxes.docStatus.${d.status}`)} />
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === "payroll" && (
          <section style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>{t("payroll.runTitle")}</h3>
              <button
                onClick={() => toast.push({ title: t("toast.payrollProcessed"), tone: "success" })}
                style={{ padding: "8px 14px", background: C.navy, color: "white", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer" }}
              >
                {t("payroll.runPayroll")}
              </button>
            </div>
            <div style={{ padding: "10px 18px", background: C.bg, display: "grid", gridTemplateColumns: "1fr 120px 100px 100px 100px", fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: C.muted }}>
              <span>{t("payroll.col.employee")}</span>
              <span>{t("payroll.col.role")}</span>
              <span style={{ textAlign: "right" }}>{t("payroll.col.gross")}</span>
              <span style={{ textAlign: "right" }}>{t("payroll.col.net")}</span>
              <span>{t("payroll.col.status")}</span>
            </div>
            {[
              { name: "Marcus Johnson", role: "Senior accountant", gross: 9200, net: 6480, status: "ready" },
              { name: "Sara Thompson", role: "Bookkeeper", gross: 6400, net: 4710, status: "ready" },
              { name: "Liu Wei", role: "Tax associate", gross: 7800, net: 5640, status: "draft" },
              { name: "Faruh Bobojonov", role: "Junior accountant", gross: 5200, net: 3960, status: "ready" },
            ].map((e) => (
              <div key={e.name} style={{ display: "grid", gridTemplateColumns: "1fr 120px 100px 100px 100px", padding: "12px 18px", borderTop: `1px solid ${C.border}`, alignItems: "center", fontSize: 13 }}>
                <span style={{ fontWeight: 600 }}>{e.name}</span>
                <span style={{ color: C.muted }}>{e.role}</span>
                <span style={{ textAlign: "right", color: C.muted }}>${e.gross.toLocaleString()}</span>
                <span style={{ textAlign: "right", fontWeight: 700 }}>$<DemoCounter value={e.net} /></span>
                <DemoBadge palette={palette} variant={e.status === "ready" ? "success" : "neutral"} label={t(`payroll.status.${e.status}`)} />
              </div>
            ))}
          </section>
        )}

        {tab === "projects" && (
          <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
            {[
              { name: "Helios Q3 Audit", client: "Helios Studios", budget: 24000, spent: 18200, progress: 76, color: C.navy },
              { name: "Northbound 2025 Tax", client: "Northbound", budget: 38000, spent: 12400, progress: 32, color: C.gold },
              { name: "Park Eight Bookkeeping", client: "Park Eight", budget: 12000, spent: 9800, progress: 82, color: C.green },
              { name: "Ridge Restructure", client: "Ridge & Sons", budget: 18000, spent: 4200, progress: 22, color: "#7c3aed" },
              { name: "Lumen Health CFO advisory", client: "Lumen Health", budget: 48000, spent: 32600, progress: 68, color: "#0891b2" },
              { name: "Sunset Coast Annual", client: "Sunset Coast Co", budget: 22000, spent: 21000, progress: 95, color: "#be185d" },
            ].map((p) => (
              <article key={p.name} style={{ background: C.paper, border: `1px solid ${C.border}`, borderTop: `4px solid ${p.color}`, borderRadius: 12, padding: 16 }}>
                <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase" }}>{p.client}</div>
                <div style={{ fontSize: 16, fontWeight: 700, marginTop: 4 }}>{p.name}</div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontSize: 13 }}>
                  <span style={{ color: C.muted }}>{t("projects.spent")}</span>
                  <span style={{ fontWeight: 700 }}>${p.spent.toLocaleString()} / ${p.budget.toLocaleString()}</span>
                </div>
                <div style={{ marginTop: 8, height: 6, background: C.bg, borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ width: `${p.progress}%`, height: "100%", background: p.color, borderRadius: 999 }} />
                </div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 8, fontWeight: 600 }}>{p.progress}% {t("projects.complete")}</div>
              </article>
            ))}
          </section>
        )}

        {tab === "settings" && (
          <section style={{ display: "grid", gap: 18 }}>
            <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
              <h3 style={{ margin: "0 0 14px", fontSize: 16, fontWeight: 700 }}>{t("settings.firmBasics")}</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {(["firmName", "ein", "address", "fiscalYear"] as const).map((f) => (
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
                style={{ marginTop: 16, padding: "10px 18px", background: C.navy, color: "white", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: "pointer" }}
              >
                {t("settings.save")}
              </button>
            </div>
            <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
              <h3 style={{ margin: "0 0 14px", fontSize: 16, fontWeight: 700 }}>{t("settings.integrationsTitle")}</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
                {[
                  { name: "QuickBooks", emoji: "📊", on: true, desc: "settings.integrations.quickbooks" },
                  { name: "Xero", emoji: "📒", on: false, desc: "settings.integrations.xero" },
                  { name: "Stripe", emoji: "💳", on: true, desc: "settings.integrations.stripe" },
                  { name: "Plaid", emoji: "🔗", on: true, desc: "settings.integrations.plaid" },
                  { name: "Gusto", emoji: "👥", on: true, desc: "settings.integrations.gusto" },
                  { name: "DocuSign", emoji: "✍️", on: false, desc: "settings.integrations.docusign" },
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
