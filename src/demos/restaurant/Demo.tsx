"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  ForkKnife,
  Clock,
  ChefHat,
  Check,
  Plus,
  CalendarBlank,
  ChartBar,
  Receipt,
  Users,
  Package,
  Calendar,
  Gear,
  Warning,
  Storefront,
} from "@phosphor-icons/react";
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
  DemoHeatmap,
  DemoLiveFeed,
  DemoToastProvider,
  useDemoToast,
  type PaletteItem,
} from "@/components/demo-shell/wow";
import { demoImages } from "@/lib/demo-images";

const DISH_PHOTOS = demoImages.restaurant.dishes;

const C = {
  bg: "#fbf6ee",
  paper: "#ffffff",
  ink: "#2a1810",
  muted: "#7a5b4a",
  accent: "#c2410c",
  green: "#3f6212",
  border: "#e8dcc5",
};

const palette = { ...C, primary: C.accent };

type View =
  | "floor"
  | "kitchen"
  | "menu"
  | "orders"
  | "reservations"
  | "customers"
  | "inventory"
  | "staff"
  | "reports"
  | "settings";

export function RestaurantDemo() {
  return (
    <DemoToastProvider palette={palette}>
      <RestaurantInner />
    </DemoToastProvider>
  );
}

function RestaurantInner() {
  const t = useTranslations("demoPreview.restaurant");
  const [view, setView] = useState<View>("floor");
  const toast = useDemoToast();

  const TABLES = [
    { n: t("tables.t1.n"), seats: 2, status: "open" },
    { n: t("tables.t2.n"), seats: 4, status: "open" },
    { n: t("tables.t3.n"), seats: 4, status: "seated", since: t("tables.t3.since") },
    { n: t("tables.t4.n"), seats: 6, status: "ordering", since: t("tables.t4.since") },
    { n: t("tables.t5.n"), seats: 2, status: "served" },
    { n: t("tables.t6.n"), seats: 4, status: "open" },
    { n: t("tables.t7.n"), seats: 8, status: "seated", since: t("tables.t7.since") },
    { n: t("tables.t8.n"), seats: 4, status: "open" },
  ];

  const KITCHEN = [
    { table: t("kitchen.k1.table"), time: t("kitchen.k1.time"), items: [t("kitchen.k1.item1"), t("kitchen.k1.item2"), t("kitchen.k1.item3")] },
    { table: t("kitchen.k2.table"), time: t("kitchen.k2.time"), items: [t("kitchen.k2.item1"), t("kitchen.k2.item2")] },
    { table: t("kitchen.k3.table"), time: t("kitchen.k3.time"), items: [t("kitchen.k3.item1"), t("kitchen.k3.item2"), t("kitchen.k3.item3")] },
  ];

  const STATUS_C: Record<string, { bg: string; fg: string; label: string }> = {
    open: { bg: "#f4f1e6", fg: "#857c5e", label: t("status.open") },
    seated: { bg: "#d8eecf", fg: "#3f6212", label: t("status.seated") },
    ordering: { bg: "#fce8d4", fg: "#c2410c", label: t("status.ordering") },
    served: { bg: "#dfe7f3", fg: "#1d4ed8", label: t("status.served") },
  };

  const RESERVATIONS = [
    { name: t("reservations.r1.name"), party: 2, time: t("reservations.r1.time"), table: t("reservations.r1.table"), status: "confirmed" },
    { name: t("reservations.r2.name"), party: 4, time: t("reservations.r2.time"), table: t("reservations.r2.table"), status: "seated" },
    { name: t("reservations.r3.name"), party: 6, time: t("reservations.r3.time"), table: t("reservations.r3.table"), status: "confirmed" },
    { name: t("reservations.r4.name"), party: 2, time: t("reservations.r4.time"), table: t("reservations.r4.table"), status: "confirmed" },
    { name: t("reservations.r5.name"), party: 3, time: t("reservations.r5.time"), table: t("reservations.r5.table"), status: "no_show" },
    { name: t("reservations.r6.name"), party: 5, time: t("reservations.r6.time"), table: t("reservations.r6.table"), status: "confirmed" },
    { name: t("reservations.r7.name"), party: 2, time: t("reservations.r7.time"), table: t("reservations.r7.table"), status: "seated" },
    { name: t("reservations.r8.name"), party: 8, time: t("reservations.r8.time"), table: t("reservations.r8.table"), status: "confirmed" },
    { name: t("reservations.r9.name"), party: 4, time: t("reservations.r9.time"), table: t("reservations.r9.table"), status: "confirmed" },
    { name: t("reservations.r10.name"), party: 2, time: t("reservations.r10.time"), table: t("reservations.r10.table"), status: "no_show" },
  ];

  const RES_STATUS_C: Record<string, { bg: string; fg: string; label: string }> = {
    confirmed: { bg: "#fce8d4", fg: "#c2410c", label: t("reservations.statusLabels.confirmed") },
    seated: { bg: "#d8eecf", fg: "#3f6212", label: t("reservations.statusLabels.seated") },
    no_show: { bg: "#f1d6d6", fg: "#9b2c2c", label: t("reservations.statusLabels.noShow") },
  };

  const HOURS = [
    { h: t("reports.hours.h1"), v: 32 }, { h: t("reports.hours.h2"), v: 48 },
    { h: t("reports.hours.h3"), v: 64 }, { h: t("reports.hours.h4"), v: 96 },
    { h: t("reports.hours.h5"), v: 72 }, { h: t("reports.hours.h6"), v: 58 },
    { h: t("reports.hours.h7"), v: 88 }, { h: t("reports.hours.h8"), v: 100 },
    { h: t("reports.hours.h9"), v: 76 }, { h: t("reports.hours.h10"), v: 42 },
  ];

  const TOP_ITEMS = [
    { name: t("reports.topItems.i1.name"), count: t("reports.topItems.i1.count") },
    { name: t("reports.topItems.i2.name"), count: t("reports.topItems.i2.count") },
    { name: t("reports.topItems.i3.name"), count: t("reports.topItems.i3.count") },
    { name: t("reports.topItems.i4.name"), count: t("reports.topItems.i4.count") },
    { name: t("reports.topItems.i5.name"), count: t("reports.topItems.i5.count") },
    { name: t("reports.topItems.i6.name"), count: t("reports.topItems.i6.count") },
  ];

  const NAV: { id: View; label: string; Icon: typeof ForkKnife; group: "service" | "back" }[] = [
    { id: "floor", label: t("nav.floor"), Icon: ForkKnife, group: "service" },
    { id: "kitchen", label: t("nav.kitchen"), Icon: ChefHat, group: "service" },
    { id: "menu", label: t("nav.menu"), Icon: Check, group: "service" },
    { id: "orders", label: t("nav.orders"), Icon: Receipt, group: "service" },
    { id: "reservations", label: t("nav.reservations"), Icon: CalendarBlank, group: "service" },
    { id: "customers", label: t("nav.customers"), Icon: Users, group: "back" },
    { id: "inventory", label: t("nav.inventory"), Icon: Package, group: "back" },
    { id: "staff", label: t("nav.staff"), Icon: Calendar, group: "back" },
    { id: "reports", label: t("nav.reports"), Icon: ChartBar, group: "back" },
    { id: "settings", label: t("nav.settings"), Icon: Gear, group: "back" },
  ];

  const headerTitle = t(`header.${view}Title`);
  const headerSubtitle = t(`header.${view}Subtitle`);
  const breadcrumb = t(`breadcrumb.${view}`);
  const screenEyebrow = t(`screen.${view}.eyebrow`);

  const kpiMap: Record<View, { label: string; value: string; trend: string; spark: number[] }[]> = {
    floor: [
      { label: t("kpi.floor.0.label"), value: t("kpi.floor.0.value"), trend: t("kpi.floor.0.trend"), spark: [42, 48, 55, 60, 58, 66, 72, 78] },
      { label: t("kpi.floor.1.label"), value: t("kpi.floor.1.value"), trend: t("kpi.floor.1.trend"), spark: [3, 4, 5, 4, 6, 5, 7, 6] },
      { label: t("kpi.floor.2.label"), value: t("kpi.floor.2.value"), trend: t("kpi.floor.2.trend"), spark: [10, 12, 11, 14, 13, 15, 14, 16] },
      { label: t("kpi.floor.3.label"), value: t("kpi.floor.3.value"), trend: t("kpi.floor.3.trend"), spark: [22, 18, 20, 16, 14, 15, 12, 11] },
    ],
    kitchen: [
      { label: t("kpi.kitchen.0.label"), value: t("kpi.kitchen.0.value"), trend: t("kpi.kitchen.0.trend"), spark: [6, 8, 7, 10, 9, 11, 12, 10] },
      { label: t("kpi.kitchen.1.label"), value: t("kpi.kitchen.1.value"), trend: t("kpi.kitchen.1.trend"), spark: [14, 12, 13, 11, 12, 10, 11, 10] },
      { label: t("kpi.kitchen.2.label"), value: t("kpi.kitchen.2.value"), trend: t("kpi.kitchen.2.trend"), spark: [3, 4, 5, 4, 6, 7, 5, 6] },
      { label: t("kpi.kitchen.3.label"), value: t("kpi.kitchen.3.value"), trend: t("kpi.kitchen.3.trend"), spark: [38, 42, 48, 52, 55, 60, 58, 64] },
    ],
    menu: [
      { label: t("kpi.menu.0.label"), value: t("kpi.menu.0.value"), trend: t("kpi.menu.0.trend"), spark: [48, 50, 52, 51, 54, 56, 55, 58] },
      { label: t("kpi.menu.1.label"), value: t("kpi.menu.1.value"), trend: t("kpi.menu.1.trend"), spark: [62, 64, 63, 66, 67, 68, 67, 70] },
      { label: t("kpi.menu.2.label"), value: t("kpi.menu.2.value"), trend: t("kpi.menu.2.trend"), spark: [20, 24, 22, 28, 26, 30, 32, 34] },
      { label: t("kpi.menu.3.label"), value: t("kpi.menu.3.value"), trend: t("kpi.menu.3.trend"), spark: [4, 3, 2, 3, 2, 1, 2, 2] },
    ],
    orders: [
      { label: t("kpi.orders.0.label"), value: t("kpi.orders.0.value"), trend: t("kpi.orders.0.trend"), spark: [12, 16, 14, 18, 22, 20, 24, 28] },
      { label: t("kpi.orders.1.label"), value: t("kpi.orders.1.value"), trend: t("kpi.orders.1.trend"), spark: [320, 360, 380, 420, 460, 480, 520, 560] },
      { label: t("kpi.orders.2.label"), value: t("kpi.orders.2.value"), trend: t("kpi.orders.2.trend"), spark: [3, 4, 4, 3, 4, 5, 4, 6] },
      { label: t("kpi.orders.3.label"), value: t("kpi.orders.3.value"), trend: t("kpi.orders.3.trend"), spark: [82, 84, 86, 85, 88, 89, 90, 92] },
    ],
    reservations: [
      { label: t("kpi.reservations.0.label"), value: t("kpi.reservations.0.value"), trend: t("kpi.reservations.0.trend"), spark: [28, 32, 36, 40, 42, 44, 46, 48] },
      { label: t("kpi.reservations.1.label"), value: t("kpi.reservations.1.value"), trend: t("kpi.reservations.1.trend"), spark: [6, 8, 7, 9, 10, 8, 11, 12] },
      { label: t("kpi.reservations.2.label"), value: t("kpi.reservations.2.value"), trend: t("kpi.reservations.2.trend"), spark: [8, 7, 6, 5, 6, 5, 4, 4] },
      { label: t("kpi.reservations.3.label"), value: t("kpi.reservations.3.value"), trend: t("kpi.reservations.3.trend"), spark: [2, 3, 2, 4, 3, 5, 4, 6] },
    ],
    customers: [
      { label: t("kpi.customers.0.label"), value: t("kpi.customers.0.value"), trend: t("kpi.customers.0.trend"), spark: [240, 280, 320, 360, 400, 440, 480, 520] },
      { label: t("kpi.customers.1.label"), value: t("kpi.customers.1.value"), trend: t("kpi.customers.1.trend"), spark: [42, 48, 52, 56, 60, 64, 68, 72] },
      { label: t("kpi.customers.2.label"), value: t("kpi.customers.2.value"), trend: t("kpi.customers.2.trend"), spark: [38, 42, 44, 46, 48, 50, 52, 54] },
      { label: t("kpi.customers.3.label"), value: t("kpi.customers.3.value"), trend: t("kpi.customers.3.trend"), spark: [4, 3, 4, 5, 4, 5, 6, 5] },
    ],
    inventory: [
      { label: t("kpi.inventory.0.label"), value: t("kpi.inventory.0.value"), trend: t("kpi.inventory.0.trend"), spark: [120, 124, 118, 122, 128, 126, 130, 132] },
      { label: t("kpi.inventory.1.label"), value: t("kpi.inventory.1.value"), trend: t("kpi.inventory.1.trend"), spark: [4, 5, 6, 7, 8, 6, 5, 4] },
      { label: t("kpi.inventory.2.label"), value: t("kpi.inventory.2.value"), trend: t("kpi.inventory.2.trend"), spark: [3, 4, 4, 5, 6, 7, 8, 7] },
      { label: t("kpi.inventory.3.label"), value: t("kpi.inventory.3.value"), trend: t("kpi.inventory.3.trend"), spark: [880, 920, 940, 960, 980, 1000, 1020, 1040] },
    ],
    staff: [
      { label: t("kpi.staff.0.label"), value: t("kpi.staff.0.value"), trend: t("kpi.staff.0.trend"), spark: [12, 13, 14, 13, 14, 15, 14, 16] },
      { label: t("kpi.staff.1.label"), value: t("kpi.staff.1.value"), trend: t("kpi.staff.1.trend"), spark: [4, 5, 6, 6, 7, 7, 8, 8] },
      { label: t("kpi.staff.2.label"), value: t("kpi.staff.2.value"), trend: t("kpi.staff.2.trend"), spark: [82, 84, 86, 88, 90, 92, 91, 94] },
      { label: t("kpi.staff.3.label"), value: t("kpi.staff.3.value"), trend: t("kpi.staff.3.trend"), spark: [6, 5, 4, 5, 4, 3, 3, 2] },
    ],
    reports: [
      { label: t("kpi.reports.0.label"), value: t("kpi.reports.0.value"), trend: t("kpi.reports.0.trend"), spark: [42, 48, 55, 60, 58, 66, 72, 78] },
      { label: t("kpi.reports.1.label"), value: t("kpi.reports.1.value"), trend: t("kpi.reports.1.trend"), spark: [320, 380, 410, 460, 480, 520, 540, 580] },
      { label: t("kpi.reports.2.label"), value: t("kpi.reports.2.value"), trend: t("kpi.reports.2.trend"), spark: [42, 44, 46, 45, 48, 47, 49, 50] },
      { label: t("kpi.reports.3.label"), value: t("kpi.reports.3.value"), trend: t("kpi.reports.3.trend"), spark: [12, 14, 15, 18, 20, 22, 24, 26] },
    ],
    settings: [
      { label: t("kpi.settings.0.label"), value: t("kpi.settings.0.value"), trend: t("kpi.settings.0.trend"), spark: [99, 99, 99, 100, 100, 100, 100, 100] },
      { label: t("kpi.settings.1.label"), value: t("kpi.settings.1.value"), trend: t("kpi.settings.1.trend"), spark: [4, 5, 5, 6, 6, 7, 7, 8] },
      { label: t("kpi.settings.2.label"), value: t("kpi.settings.2.value"), trend: t("kpi.settings.2.trend"), spark: [6, 7, 8, 8, 9, 9, 10, 10] },
      { label: t("kpi.settings.3.label"), value: t("kpi.settings.3.value"), trend: t("kpi.settings.3.trend"), spark: [1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600] },
    ],
  };

  const resBadgeVariant = (status: string): "success" | "warn" | "info" | "neutral" | "danger" =>
    status === "seated" ? "success" : status === "no_show" ? "danger" : status === "confirmed" ? "info" : "neutral";

  const paletteItems: PaletteItem[] = NAV.map((n) => ({
    id: n.id,
    label: n.label,
    group: t(`nav.groups.${n.group}`),
    onRun: () => {
      setView(n.id);
      toast.push({ title: t("toast.navigated", { screen: n.label }) });
    },
  }));

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.ink, fontFamily: "ui-sans-serif, system-ui", display: "flex", flexDirection: "column" }}>
      <DemoTopBar
        palette={palette}
        brandName={t("brand")}
        brandMark={
          <div style={{ width: 24, height: 24, background: palette.primary, borderRadius: 6, display: "grid", placeItems: "center" }}>
            <ForkKnife weight="regular" size={14} style={{ color: palette.paper }} />
          </div>
        }
        breadcrumb={breadcrumb}
        searchPlaceholder={t("shell.searchPlaceholder")}
        userName={t("shell.userName")}
        userInitials={t("shell.userInitials")}
        rightSlot={<DemoCommandPalette palette={palette} items={paletteItems} placeholder={t("commandPalette.placeholder")} hint="⌘K" />}
      />

      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "240px 1fr", minHeight: 0 }}>
        <aside style={{ background: C.paper, borderRight: `1px solid ${C.border}`, padding: "20px 14px", display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 6px" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: C.accent, display: "grid", placeItems: "center", color: "white" }}>
              <ForkKnife size={18} weight="regular" />
            </div>
            <div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 16, fontWeight: 700 }}>{t("brand")}</div>
              <div style={{ fontSize: 11, color: C.muted }}>{t("serviceStatus")}</div>
            </div>
          </div>

          {(["service", "back"] as const).map((g) => (
            <div key={g}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: C.muted, padding: "0 10px 6px" }}>
                {t(`nav.groups.${g}`)}
              </div>
              <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {NAV.filter((n) => n.group === g).map((m) => {
                  const active = view === m.id;
                  const Icon = m.Icon;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setView(m.id)}
                      style={{
                        display: "flex", alignItems: "center", gap: 10, padding: "8px 10px",
                        borderRadius: 8, border: "none",
                        background: active ? C.accent : "transparent",
                        color: active ? "white" : C.ink,
                        fontSize: 13, fontWeight: active ? 700 : 500, textAlign: "left", cursor: "pointer",
                      }}
                    >
                      <Icon size={14} weight="regular" />
                      {m.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          ))}
        </aside>

        <main style={{ padding: 28, minWidth: 0, overflow: "auto" }}>
          <DemoKpiStrip palette={palette} items={kpiMap[view]} />

          <DemoScreenHeader
            palette={palette}
            eyebrow={screenEyebrow}
            title={headerTitle}
            subtitle={headerSubtitle}
            rightSlot={
              <button
                onClick={() => toast.push({ title: t("toast.actionRun"), tone: "info" })}
                style={{ padding: "10px 18px", background: C.ink, color: "white", border: "none", borderRadius: 9999, fontWeight: 600, fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer" }}
              >
                <Plus size={14} weight="regular" /> {t(`actions.${view}`)}
              </button>
            }
          />

          {view === "floor" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px,1fr))", gap: 14 }}>
              {TABLES.map((tbl) => {
                const s = STATUS_C[tbl.status];
                return (
                  <article key={tbl.n} style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontWeight: 700, fontSize: 18 }}>{tbl.n}</span>
                      <span style={{ background: s.bg, color: s.fg, padding: "2px 8px", borderRadius: 9999, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</span>
                    </div>
                    <div style={{ color: C.muted, fontSize: 12 }}>{tbl.seats} {t("seatsLabel")}</div>
                    {tbl.since && (
                      <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: C.muted }}>
                        <Clock size={11} weight="regular" /> {tbl.since}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}

          {view === "kitchen" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))", gap: 14 }}>
              {KITCHEN.map((k, ki) => (
                <article key={k.table} style={{ background: C.paper, border: `1px solid ${C.border}`, borderTop: `4px solid ${C.accent}`, borderRadius: 12, padding: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                    <span style={{ fontWeight: 700, fontSize: 18 }}>{k.table}</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: C.accent, fontSize: 12, fontWeight: 600 }}>
                      <Clock size={12} weight="regular" /> {k.time}
                    </span>
                  </div>
                  {k.items.map((i, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        fontSize: 13,
                        padding: "6px 0",
                        borderTop: idx === 0 ? "none" : `1px solid ${C.border}`,
                      }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 6,
                          overflow: "hidden",
                          position: "relative",
                          flex: "0 0 auto",
                          background: "linear-gradient(135deg,#fce8d4,#c2410c)",
                        }}
                      >
                        <img
                          src={DISH_PHOTOS[(ki * 3 + idx) % DISH_PHOTOS.length]}
                          alt=""
                          loading="lazy"
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
                            background: "rgba(194,65,12,0.2)",
                            mixBlendMode: "multiply",
                          }}
                        />
                      </div>
                      <span>{i}</span>
                    </div>
                  ))}
                  <button
                    onClick={() => toast.push({ title: t("toast.firedTo", { table: k.table }), tone: "success" })}
                    style={{ marginTop: 12, width: "100%", padding: 8, background: C.green, color: "white", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 12, cursor: "pointer" }}
                  >
                    {t("markFired")}
                  </button>
                </article>
              ))}
            </div>
          )}

          {view === "menu" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              {[
                { cat: t("menu.starters.cat"), items: [t("menu.starters.item1"), t("menu.starters.item2"), t("menu.starters.item3")] },
                { cat: t("menu.pasta.cat"), items: [t("menu.pasta.item1"), t("menu.pasta.item2"), t("menu.pasta.item3")] },
                { cat: t("menu.mains.cat"), items: [t("menu.mains.item1"), t("menu.mains.item2"), t("menu.mains.item3")] },
                { cat: t("menu.wine.cat"), items: [t("menu.wine.item1"), t("menu.wine.item2"), t("menu.wine.item3")] },
              ].map((s, ci) => (
                <div key={s.cat} style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 18 }}>
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "16/7",
                      borderRadius: 10,
                      overflow: "hidden",
                      marginBottom: 14,
                      background: "linear-gradient(135deg,#fce8d4,#c2410c)",
                    }}
                  >
                    <img
                      src={DISH_PHOTOS[ci % DISH_PHOTOS.length]}
                      alt=""
                      loading="lazy"
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
                        background: "linear-gradient(135deg,rgba(252,232,212,0.35),rgba(194,65,12,0.45))",
                        mixBlendMode: "multiply",
                      }}
                    />
                  </div>
                  <h3 style={{ fontFamily: "Georgia, serif", fontSize: 18, marginBottom: 12, color: C.accent }}>{s.cat}</h3>
                  {s.items.map((i, ii) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "8px 0",
                        borderTop: `1px dashed ${C.border}`,
                        fontSize: 14,
                      }}
                    >
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 8,
                          overflow: "hidden",
                          position: "relative",
                          flex: "0 0 auto",
                          background: "linear-gradient(135deg,#fce8d4,#c2410c)",
                        }}
                      >
                        <img
                          src={DISH_PHOTOS[(ci * 3 + ii + 4) % DISH_PHOTOS.length]}
                          alt=""
                          loading="lazy"
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
                            background: "rgba(194,65,12,0.18)",
                            mixBlendMode: "multiply",
                          }}
                        />
                      </div>
                      <span>{i}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {view === "orders" && <OrdersScreen t={t} toast={toast} />}
          {view === "reservations" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 18, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                <CalendarBlank size={18} weight="regular" color={C.accent} />
                <Stat label={t("reservations.dateLabel")} value={t("reservations.dateValue")} />
                <Sep />
                <Stat label={t("reservations.totalLabel")} value={t("reservations.totalValue")} />
                <Sep />
                <Stat label={t("reservations.coversLabel")} value={t("reservations.coversValue")} />
              </div>
              <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 90px 110px 110px 120px", padding: "12px 18px", background: "#f4f1e6", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: C.muted }}>
                  <span>{t("reservations.columns.guest")}</span>
                  <span>{t("reservations.columns.party")}</span>
                  <span>{t("reservations.columns.time")}</span>
                  <span>{t("reservations.columns.table")}</span>
                  <span>{t("reservations.columns.status")}</span>
                </div>
                {RESERVATIONS.map((r, idx) => {
                  const s = RES_STATUS_C[r.status];
                  return (
                    <div key={`${r.name}-${idx}`} style={{ display: "grid", gridTemplateColumns: "1fr 90px 110px 110px 120px", padding: "14px 18px", borderTop: `1px solid ${C.border}`, alignItems: "center", fontSize: 14 }}>
                      <span style={{ fontWeight: 600 }}>{r.name}</span>
                      <span style={{ color: C.muted }}>{r.party} {t("reservations.partyLabel")}</span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: C.ink }}>
                        <Clock size={12} weight="regular" color={C.accent} /> {r.time}
                      </span>
                      <span style={{ color: C.muted }}>{r.table}</span>
                      <span><DemoBadge palette={palette} variant={resBadgeVariant(r.status)} label={s.label} /></span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {view === "customers" && <CustomersScreen t={t} toast={toast} />}
          {view === "inventory" && <InventoryScreen t={t} toast={toast} />}
          {view === "staff" && <StaffScreen t={t} toast={toast} />}

          {view === "reports" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
                  <h3 style={{ fontFamily: "Georgia, serif", fontSize: 18 }}>{t("reports.revenueTrend")}</h3>
                  <span style={{ fontSize: 12, color: C.muted }}>{t("reports.last30")}</span>
                </div>
                <DemoChart data={[2400, 2800, 2600, 3200, 3800, 4200, 4000, 4600, 5200, 4800, 5400, 6000, 5800, 6400, 6800, 7200, 6900, 7400, 7800, 8400, 9000, 8800, 9400, 9800, 10200, 10600, 11000, 11400, 11800, 12200]} palette={palette} height={200} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18 }}>
                <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
                    <h3 style={{ fontFamily: "Georgia, serif", fontSize: 18 }}>{t("reports.hourly.title")}</h3>
                    <span style={{ fontSize: 12, color: C.muted }}>{t("reports.hourly.subtitle")}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 160, padding: "6px 0" }}>
                    {HOURS.map((row) => (
                      <div key={row.h} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                        <div style={{ width: "100%", height: `${row.v}%`, background: row.v >= 80 ? C.accent : "#f0c3a0", borderRadius: "6px 6px 0 0", transition: "height 0.3s" }} />
                        <span style={{ fontSize: 10, color: C.muted, fontWeight: 600 }}>{row.h}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
                    <h3 style={{ fontFamily: "Georgia, serif", fontSize: 18 }}>{t("reports.topItemsTitle")}</h3>
                    <span style={{ fontSize: 12, color: C.muted }}>{t("reports.topItemsSubtitle")}</span>
                  </div>
                  {TOP_ITEMS.map((item, idx) => (
                    <div key={item.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderTop: idx === 0 ? "none" : `1px dashed ${C.border}`, fontSize: 14 }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                        <span style={{ width: 22, height: 22, borderRadius: 6, background: idx < 3 ? C.accent : "#f4f1e6", color: idx < 3 ? "white" : C.muted, display: "grid", placeItems: "center", fontSize: 11, fontWeight: 700 }}>{idx + 1}</span>
                        {item.name}
                      </span>
                      <span style={{ color: C.muted, fontWeight: 600 }}>{item.count} {t("reports.servedLabel")}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {view === "settings" && <SettingsScreen t={t} toast={toast} />}
        </main>
      </div>

      <DemoStatusBar palette={palette} version={t("shell.version")} region={t("shell.region")} buildId={t("shell.build")} />
    </div>
  );
}

type TFn = ReturnType<typeof useTranslations>;
type ToastApi = ReturnType<typeof useDemoToast>;

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</span>
      <span style={{ fontFamily: "Georgia, serif", fontSize: 16, fontWeight: 700 }}>{value}</span>
    </div>
  );
}

function Sep() {
  return <div style={{ width: 1, height: 32, background: C.border, margin: "0 6px" }} />;
}

function OrdersScreen({ t, toast }: { t: TFn; toast: ToastApi }) {
  const orders = [
    { id: "R-2421", table: "T3", guest: "Karimov", items: 4, total: 124, status: "open" },
    { id: "R-2420", table: "T7", guest: "Yusupova", items: 8, total: 348, status: "fired" },
    { id: "R-2419", table: "T4", guest: "Salimova", items: 6, total: 216, status: "served" },
    { id: "R-2418", table: "T1", guest: "Mahmood", items: 2, total: 48, status: "paid" },
    { id: "R-2417", table: "T5", guest: "Ivanov", items: 3, total: 96, status: "served" },
    { id: "R-2416", table: "T8", guest: "Wang", items: 7, total: 278, status: "paid" },
  ];
  const variant = (s: string): "success" | "info" | "warn" | "neutral" =>
    s === "paid" ? "success" : s === "served" ? "info" : s === "fired" ? "warn" : "neutral";

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18 }}>
      <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
        <div style={{ padding: "12px 16px", background: "#f4f1e6", display: "grid", gridTemplateColumns: "80px 60px 1fr 60px 90px 100px", fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: C.muted }}>
          <span>{t("orders.col.id")}</span>
          <span>{t("orders.col.table")}</span>
          <span>{t("orders.col.guest")}</span>
          <span>{t("orders.col.items")}</span>
          <span style={{ textAlign: "right" }}>{t("orders.col.total")}</span>
          <span>{t("orders.col.status")}</span>
        </div>
        {orders.map((o) => (
          <div key={o.id} style={{ display: "grid", gridTemplateColumns: "80px 60px 1fr 60px 90px 100px", padding: "12px 16px", borderTop: `1px solid ${C.border}`, alignItems: "center", fontSize: 13 }}>
            <span style={{ fontFamily: "ui-monospace, monospace", fontWeight: 600 }}>{o.id}</span>
            <span style={{ color: C.accent, fontWeight: 700 }}>{o.table}</span>
            <span>{o.guest}</span>
            <span>{o.items}</span>
            <span style={{ textAlign: "right", fontWeight: 700 }}>$<DemoCounter value={o.total} /></span>
            <DemoBadge palette={palette} variant={variant(o.status)} label={t(`orders.status.${o.status}`)} />
          </div>
        ))}
      </div>

      <DemoLiveFeed
        palette={palette}
        liveLabel={t("orders.liveFeed")}
        height={320}
        initial={[
          { id: "f1", title: t("orders.feed.paid", { id: "R-2418" }), meta: "12s ago · $48", tone: "success" },
          { id: "f2", title: t("orders.feed.fired", { id: "R-2420" }), meta: "1m ago · T7", tone: "primary" },
          { id: "f3", title: t("orders.feed.served", { id: "R-2419" }), meta: "3m ago · T4", tone: "info" },
        ]}
        rotating={[
          { id: "r1", title: t("orders.feed.opened", { id: "R-2422" }), meta: "T2 · 2 guests", tone: "info" },
          { id: "r2", title: t("orders.feed.paid", { id: "R-2417" }), meta: "T5 · $96", tone: "success" },
          { id: "r3", title: t("orders.feed.fired", { id: "R-2421" }), meta: "T3 · 4 dishes", tone: "primary" },
        ]}
      />
    </div>
  );
}

function CustomersScreen({ t, toast }: { t: TFn; toast: ToastApi }) {
  const rows = [
    { name: "Nodira Salimova", visits: 28, ltv: 2480, last: "Today", tier: "vip" },
    { name: "Daler Karimov", visits: 14, ltv: 1180, last: "3d ago", tier: "regular" },
    { name: "Helena Marsh", visits: 21, ltv: 2120, last: "Today", tier: "vip" },
    { name: "Mei Tanaka", visits: 8, ltv: 640, last: "11d ago", tier: "regular" },
    { name: "Liu Wei", visits: 2, ltv: 120, last: "2h ago", tier: "new" },
    { name: "Tomás Reyes", visits: 5, ltv: 380, last: "48d ago", tier: "atrisk" },
  ];
  const variant = (s: string): "success" | "info" | "warn" | "danger" =>
    s === "vip" ? "success" : s === "regular" ? "info" : s === "new" ? "warn" : "danger";
  return (
    <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
      <div style={{ padding: "12px 16px", background: "#f4f1e6", display: "grid", gridTemplateColumns: "1fr 110px 80px 100px 100px 80px", fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: C.muted }}>
        <span>{t("customers.col.guest")}</span>
        <span>{t("customers.col.tier")}</span>
        <span>{t("customers.col.visits")}</span>
        <span style={{ textAlign: "right" }}>{t("customers.col.ltv")}</span>
        <span>{t("customers.col.last")}</span>
        <span />
      </div>
      {rows.map((r) => (
        <div key={r.name} style={{ display: "grid", gridTemplateColumns: "1fr 110px 80px 100px 100px 80px", padding: "12px 16px", borderTop: `1px solid ${C.border}`, alignItems: "center", fontSize: 13 }}>
          <span style={{ fontWeight: 600 }}>{r.name}</span>
          <DemoBadge palette={palette} variant={variant(r.tier)} label={t(`customers.tiers.${r.tier}`)} />
          <span>{r.visits}</span>
          <span style={{ textAlign: "right", fontWeight: 700 }}>$<DemoCounter value={r.ltv} /></span>
          <span style={{ color: C.muted, fontSize: 12 }}>{r.last}</span>
          <button
            onClick={() => toast.push({ title: t("toast.messageSent", { name: r.name }), tone: "info" })}
            style={{ background: "transparent", border: `1px solid ${C.border}`, borderRadius: 9999, padding: "4px 10px", fontSize: 11, color: C.ink, cursor: "pointer", fontWeight: 600 }}
          >
            {t("customers.message")}
          </button>
        </div>
      ))}
    </div>
  );
}

function InventoryScreen({ t, toast }: { t: TFn; toast: ToastApi }) {
  const items = [
    { sku: "ING-FLR", name: "Flour, 50kg", stock: 4, reorder: 12, status: "low" },
    { sku: "ING-TOM", name: "Roma tomatoes", stock: 18, reorder: 24, status: "ok" },
    { sku: "ING-BAS", name: "Fresh basil", stock: 1, reorder: 8, status: "critical" },
    { sku: "ING-OIL", name: "EV Olive oil 5L", stock: 6, reorder: 10, status: "low" },
    { sku: "ING-PRM", name: "Parmigiano 1kg", stock: 12, reorder: 6, status: "ok" },
    { sku: "ING-WIN", name: "Chianti Riserva", stock: 22, reorder: 12, status: "ok" },
  ];
  const variant = (s: string): "success" | "warn" | "danger" => s === "critical" ? "danger" : s === "low" ? "warn" : "success";

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 18, alignItems: "start" }}>
      <div style={{ display: "grid", gap: 18 }}>
        <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
          <h3 style={{ fontFamily: "Georgia, serif", fontSize: 18, margin: "0 0 14px" }}>{t("inventory.heatTitle")}</h3>
          <DemoHeatmap palette={palette} weeks={16} seed={4} ariaLabel={t("inventory.heatAria")} />
          <p style={{ marginTop: 12, color: C.muted, fontSize: 12 }}>{t("inventory.heatNote")}</p>
        </div>
        <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 8 }}>
            <Warning size={16} color="#d97706" />
            <h4 style={{ fontFamily: "Georgia, serif", fontSize: 16, margin: 0 }}>{t("inventory.alertsTitle")}</h4>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead style={{ background: "#f4f1e6" }}>
              <tr>
                <th style={{ textAlign: "left", padding: "10px 16px", fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: "uppercase", fontSize: 10 }}>{t("inventory.col.sku")}</th>
                <th style={{ textAlign: "left", padding: "10px 16px", fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: "uppercase", fontSize: 10 }}>{t("inventory.col.name")}</th>
                <th style={{ textAlign: "right", padding: "10px 16px", fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: "uppercase", fontSize: 10 }}>{t("inventory.col.stock")}</th>
                <th style={{ textAlign: "right", padding: "10px 16px", fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: "uppercase", fontSize: 10 }}>{t("inventory.col.reorder")}</th>
                <th style={{ textAlign: "left", padding: "10px 16px", fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: "uppercase", fontSize: 10 }}>{t("inventory.col.status")}</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.sku} style={{ borderTop: `1px solid ${C.border}` }}>
                  <td style={{ padding: "10px 16px", fontFamily: "ui-monospace, monospace", fontWeight: 600 }}>{i.sku}</td>
                  <td style={{ padding: "10px 16px" }}>{i.name}</td>
                  <td style={{ padding: "10px 16px", textAlign: "right", fontWeight: 700, color: i.status === "critical" ? "#dc2626" : C.ink }}>{i.stock}</td>
                  <td style={{ padding: "10px 16px", textAlign: "right", color: C.muted }}>{i.reorder}</td>
                  <td style={{ padding: "10px 16px" }}>
                    <DemoBadge palette={palette} variant={variant(i.status)} label={t(`inventory.status.${i.status}`)} />
                  </td>
                  <td style={{ padding: "10px 16px", textAlign: "right" }}>
                    <button
                      onClick={() => toast.push({ title: t("toast.reordered", { sku: i.sku }), tone: "success" })}
                      style={{ padding: "5px 10px", background: C.ink, color: "white", border: "none", borderRadius: 9999, fontSize: 11, fontWeight: 700, cursor: "pointer" }}
                    >
                      {t("inventory.reorder")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <DemoLiveFeed
        palette={palette}
        liveLabel={t("inventory.liveFeed")}
        height={320}
        initial={[
          { id: "i1", title: "−2 kg Flour", meta: "12s ago", tone: "primary" },
          { id: "i2", title: "+18 Tomatoes", meta: "1m ago", tone: "success" },
          { id: "i3", title: "Low stock: Basil", meta: "2m ago", tone: "warn" },
        ]}
        rotating={[
          { id: "ir1", title: "+5 L Olive oil", meta: "Delivery", tone: "success" },
          { id: "ir2", title: "−1 Parmigiano", meta: "Used in 3 dishes", tone: "primary" },
          { id: "ir3", title: "Cycle count complete", meta: "Variance 0", tone: "info" },
        ]}
      />
    </div>
  );
}

function StaffScreen({ t, toast }: { t: TFn; toast: ToastApi }) {
  const shifts = [
    { name: "Roman Tselishchev", role: "headChef", shift: "10:00 — 22:00", status: "on" },
    { name: "Aigerim Yusupova", role: "sousChef", shift: "11:00 — 23:00", status: "on" },
    { name: "Faruh Bobojonov", role: "lineChef", shift: "16:00 — 00:00", status: "incoming" },
    { name: "Nodira Salimova", role: "server", shift: "17:00 — 23:00", status: "on" },
    { name: "Daler Karimov", role: "server", shift: "11:00 — 17:00", status: "ended" },
    { name: "Liu Wei", role: "host", shift: "17:00 — 23:00", status: "on" },
    { name: "Helena Marsh", role: "bartender", shift: "16:00 — 01:00", status: "incoming" },
    { name: "Tomás Reyes", role: "dishwasher", shift: "18:00 — 02:00", status: "incoming" },
  ];
  const variant = (s: string): "success" | "info" | "neutral" => s === "on" ? "success" : s === "incoming" ? "info" : "neutral";

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
      {shifts.map((s) => (
        <article key={s.name} style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 9999, background: C.accent, color: "white", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 13 }}>
              {s.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{s.name}</div>
              <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600 }}>{t(`staff.roles.${s.role}`)}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: C.muted, fontSize: 12 }}>
            <Clock size={12} /> {s.shift}
          </div>
          <DemoBadge palette={palette} variant={variant(s.status)} label={t(`staff.status.${s.status}`)} />
          <button
            onClick={() => toast.push({ title: t("toast.messageSent", { name: s.name }), tone: "info" })}
            style={{ padding: "6px 10px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 11, fontWeight: 600, color: C.ink, cursor: "pointer", alignSelf: "flex-start" }}
          >
            {t("staff.contact")}
          </button>
        </article>
      ))}
    </div>
  );
}

function SettingsScreen({ t, toast }: { t: TFn; toast: ToastApi }) {
  const integrations = [
    { name: "Stripe Terminal", emoji: "💳", on: true, desc: "settings.integrations.stripe" },
    { name: "OpenTable", emoji: "📅", on: true, desc: "settings.integrations.opentable" },
    { name: "Yandex Eda", emoji: "🛵", on: true, desc: "settings.integrations.yandex" },
    { name: "Glovo", emoji: "📦", on: false, desc: "settings.integrations.glovo" },
    { name: "QuickBooks", emoji: "📊", on: true, desc: "settings.integrations.quickbooks" },
    { name: "Twilio SMS", emoji: "📲", on: false, desc: "settings.integrations.twilio" },
  ];
  return (
    <div style={{ display: "grid", gap: 18 }}>
      <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
        <h3 style={{ fontFamily: "Georgia, serif", fontSize: 18, margin: "0 0 14px" }}>{t("settings.basicsTitle")}</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {(["restaurantName", "currency", "timezone", "contactEmail"] as const).map((f) => (
            <div key={f}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: C.muted, marginBottom: 6 }}>{t(`settings.fields.${f}`)}</label>
              <input
                defaultValue={t(`settings.placeholders.${f}`)}
                style={{ width: "100%", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", fontSize: 13, color: C.ink, outline: "none", boxSizing: "border-box" }}
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => toast.push({ title: t("toast.settingsSaved"), tone: "success" })}
          style={{ marginTop: 16, padding: "10px 18px", background: C.accent, color: "white", border: "none", borderRadius: 9999, fontWeight: 700, fontSize: 13, cursor: "pointer" }}
        >
          {t("settings.save")}
        </button>
      </div>
      <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
          <h3 style={{ fontFamily: "Georgia, serif", fontSize: 18, margin: 0 }}>{t("settings.integrationsTitle")}</h3>
          <Storefront size={18} color={C.muted} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
          {integrations.map((i) => (
            <div key={i.name} style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 14, display: "flex", flexDirection: "column", gap: 8, background: C.bg }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 22 }}>{i.emoji}</div>
                <DemoBadge palette={palette} variant={i.on ? "success" : "neutral"} label={t(i.on ? "settings.connected" : "settings.disconnected")} />
              </div>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{i.name}</div>
              <div style={{ color: C.muted, fontSize: 11, lineHeight: 1.5 }}>{t(i.desc)}</div>
              <button
                onClick={() => toast.push({ title: t(i.on ? "toast.disconnected" : "toast.connected", { name: i.name }), tone: i.on ? "warn" : "success" })}
                style={{ padding: "6px 10px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 11, fontWeight: 600, color: C.ink, cursor: "pointer", alignSelf: "flex-start" }}
              >
                {t(i.on ? "settings.disconnect" : "settings.connect")}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
