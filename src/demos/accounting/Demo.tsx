"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CalculatorIcon, DocumentTextIcon, ArrowDownRightIcon, ArrowUpRightIcon, ArrowDownTrayIcon } from "@heroicons/react/20/solid";

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

const STATUS_C: Record<string, { bg: string; fg: string }> = {
  Paid: { bg: "#dcfce7", fg: "#166534" },
  Sent: { bg: "#dbeafe", fg: "#1e40af" },
  Overdue: { bg: "#fee2e2", fg: "#991b1b" },
  Draft: { bg: "#f1f5f9", fg: "#475569" },
};

export function AccountingDemo() {
  const t = useTranslations("demoPreview.accounting");
  const [tab, setTab] = useState<"ledger" | "invoices" | "reports">("invoices");

  const INVOICES = [
    { n: "INV-1042", client: t("clients.helios"), amount: 12400, status: "Paid", due: t("dates.apr18") },
    { n: "INV-1043", client: t("clients.parkEight"), amount: 4800, status: "Sent", due: t("dates.may02") },
    { n: "INV-1044", client: t("clients.northbound"), amount: 18900, status: "Overdue", due: t("dates.apr10") },
    { n: "INV-1045", client: t("clients.ridgeSons"), amount: 2150, status: "Draft", due: "—" },
    { n: "INV-1046", client: t("clients.lumen"), amount: 7600, status: "Paid", due: t("dates.apr22") },
  ];

  const statusLabel = (s: string) => {
    switch (s) {
      case "Paid": return t("status.paid");
      case "Sent": return t("status.sent");
      case "Overdue": return t("status.overdue");
      case "Draft": return t("status.draft");
      default: return s;
    }
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.ink, fontFamily: "Inter, ui-sans-serif" }}>
      <header
        style={{
          background: C.paper,
          padding: "16px 32px",
          borderBottom: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, background: C.navy, borderRadius: 10, display: "grid", placeItems: "center" }}>
            <CalculatorIcon style={{ width: 18, height: 18, color: "white" }} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>{t("brand")}</div>
            <div style={{ fontSize: 11, color: C.muted }}>{t("fiscalPeriod")}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { id: "ledger", label: t("nav.ledger") },
            { id: "invoices", label: t("nav.invoices") },
            { id: "reports", label: t("nav.reports") },
          ].map((tn) => {
            const active = tab === tn.id;
            return (
              <button
                key={tn.id}
                onClick={() => setTab(tn.id as typeof tab)}
                style={{
                  background: active ? C.navy : "transparent",
                  color: active ? "white" : C.muted,
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {tn.label}
              </button>
            );
          })}
        </div>
      </header>

      <main style={{ padding: 32, maxWidth: 1400, margin: "0 auto" }}>
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
                {INVOICES.map((inv, i) => {
                  const s = STATUS_C[inv.status];
                  return (
                    <tr key={inv.n} style={{ borderTop: i === 0 ? "none" : `1px solid ${C.border}` }}>
                      <td style={{ padding: "14px 18px", fontWeight: 600 }}>{inv.n}</td>
                      <td style={{ padding: "14px 18px" }}>{inv.client}</td>
                      <td style={{ padding: "14px 18px", color: C.muted }}>{inv.due}</td>
                      <td style={{ padding: "14px 18px", fontWeight: 700 }}>${inv.amount.toLocaleString()}</td>
                      <td style={{ padding: "14px 18px" }}>
                        <span style={{ background: s.bg, color: s.fg, padding: "3px 10px", borderRadius: 9999, fontSize: 11, fontWeight: 700 }}>
                          {statusLabel(inv.status)}
                        </span>
                      </td>
                      <td style={{ padding: "14px 18px" }}>
                        <DocumentTextIcon style={{ width: 14, height: 14, color: C.muted, cursor: "pointer" }} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        )}

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

        {tab === "reports" && (
          <section style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 18 }}>{t("reports.title")}</h2>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 18, height: 220, padding: "0 16px" }}>
              {[
                { m: t("reports.months.jan"), rev: 132, exp: 78 },
                { m: t("reports.months.feb"), rev: 148, exp: 82 },
                { m: t("reports.months.mar"), rev: 156, exp: 84 },
                { m: t("reports.months.apr"), rev: 172, exp: 88 },
                { m: t("reports.months.may"), rev: 184, exp: 91 },
              ].map((d) => (
                <div key={d.m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ width: "100%", display: "flex", gap: 4, alignItems: "flex-end", height: "100%" }}>
                    <div style={{ flex: 1, background: C.navy, borderRadius: "4px 4px 0 0", height: `${d.rev}%` }} />
                    <div style={{ flex: 1, background: C.gold, borderRadius: "4px 4px 0 0", height: `${d.exp}%` }} />
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
    </div>
  );
}
