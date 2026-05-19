"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Scissors,
  Clock,
  User,
  Sparkle,
  Heart,
  Star,
  UsersThree,
  Package,
  Stack,
  CalendarBlank,
  Megaphone,
  ChartLine,
  Gear,
  Storefront,
  CreditCard,
  Envelope,
  InstagramLogo,
  WhatsappLogo,
  GoogleLogo,
  TrendUp,
  Tag,
} from "@phosphor-icons/react";
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
  DemoCohort,
  DemoHeatmap,
  DemoLiveFeed,
  DemoToastProvider,
  useDemoToast,
  type PaletteItem,
} from "@/components/demo-shell/wow";

const C = {
  bg: "#fdf4ff",
  paper: "#ffffff",
  ink: "#3a0a3a",
  muted: "#7a4a7a",
  primary: "#a21caf",
  accent: "#e879f9",
  border: "#f0d3f0",
  card: "#fbeafb",
};

const palette = {
  bg: C.bg,
  paper: C.paper,
  ink: C.ink,
  muted: C.muted,
  primary: C.primary,
  border: C.border,
};

const SLOTS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

type TabId =
  | "bookings"
  | "services"
  | "staff"
  | "clients"
  | "products"
  | "inventory"
  | "schedule"
  | "marketing"
  | "analytics"
  | "settings";

type CategoryKey = "hair" | "nails" | "skin" | "spa";
type GroupKey = "front" | "inventory" | "ops";

export function BeautySalonDemo() {
  return (
    <DemoToastProvider palette={palette}>
      <BeautySalonInner />
    </DemoToastProvider>
  );
}

function BeautySalonInner() {
  const t = useTranslations("demoPreview.beauty-salon");
  const [tab, setTab] = useState<TabId>("bookings");
  const [chosen, setChosen] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const toast = useDemoToast();

  const SERVICES = [
    { name: t("services.signatureCut.name"), price: 65, duration: t("services.signatureCut.duration"), stylist: t("stylists.nora") },
    { name: t("services.balayageFull.name"), price: 220, duration: t("services.balayageFull.duration"), stylist: t("stylists.mara") },
    { name: t("services.colorRefresh.name"), price: 95, duration: t("services.colorRefresh.duration"), stylist: t("stylists.mara") },
    { name: t("services.bridalTrial.name"), price: 140, duration: t("services.bridalTrial.duration"), stylist: t("stylists.nora") },
    { name: t("services.expressBlowout.name"), price: 45, duration: t("services.expressBlowout.duration"), stylist: t("stylists.liv") },
    { name: t("services.keratinSmoothing.name"), price: 280, duration: t("services.keratinSmoothing.duration"), stylist: t("stylists.mara") },
  ];

  const MENU: { category: CategoryKey; items: { name: string; duration: string; price: number }[] }[] = [
    {
      category: "hair",
      items: [
        { name: t("menu.hair.0.name"), duration: t("menu.hair.0.duration"), price: 65 },
        { name: t("menu.hair.1.name"), duration: t("menu.hair.1.duration"), price: 220 },
        { name: t("menu.hair.2.name"), duration: t("menu.hair.2.duration"), price: 45 },
      ],
    },
    {
      category: "nails",
      items: [
        { name: t("menu.nails.0.name"), duration: t("menu.nails.0.duration"), price: 38 },
        { name: t("menu.nails.1.name"), duration: t("menu.nails.1.duration"), price: 62 },
        { name: t("menu.nails.2.name"), duration: t("menu.nails.2.duration"), price: 95 },
      ],
    },
    {
      category: "skin",
      items: [
        { name: t("menu.skin.0.name"), duration: t("menu.skin.0.duration"), price: 85 },
        { name: t("menu.skin.1.name"), duration: t("menu.skin.1.duration"), price: 120 },
        { name: t("menu.skin.2.name"), duration: t("menu.skin.2.duration"), price: 160 },
      ],
    },
    {
      category: "spa",
      items: [
        { name: t("menu.spa.0.name"), duration: t("menu.spa.0.duration"), price: 110 },
        { name: t("menu.spa.1.name"), duration: t("menu.spa.1.duration"), price: 140 },
        { name: t("menu.spa.2.name"), duration: t("menu.spa.2.duration"), price: 195 },
      ],
    },
  ];

  const CATEGORY_ICON: Record<CategoryKey, typeof Scissors> = {
    hair: Scissors,
    nails: Sparkle,
    skin: Heart,
    spa: Star,
  };

  const ROSTER = [
    {
      name: t("roster.0.name"),
      specialties: t("roster.0.specialties"),
      rating: 4.9,
      nextSlot: t("roster.0.nextSlot"),
      tint: "#f0abfc",
      availability: "available" as const,
      bookedHours: 38,
    },
    {
      name: t("roster.1.name"),
      specialties: t("roster.1.specialties"),
      rating: 4.8,
      nextSlot: t("roster.1.nextSlot"),
      tint: "#fbcfe8",
      availability: "available" as const,
      bookedHours: 42,
    },
    {
      name: t("roster.2.name"),
      specialties: t("roster.2.specialties"),
      rating: 5.0,
      nextSlot: t("roster.2.nextSlot"),
      tint: "#ddd6fe",
      availability: "limited" as const,
      bookedHours: 35,
    },
    {
      name: t("roster.3.name"),
      specialties: t("roster.3.specialties"),
      rating: 4.7,
      nextSlot: t("roster.3.nextSlot"),
      tint: "#fde68a",
      availability: "available" as const,
      bookedHours: 28,
    },
    {
      name: t("roster.4.name"),
      specialties: t("roster.4.specialties"),
      rating: 4.9,
      nextSlot: t("roster.4.nextSlot"),
      tint: "#c7d2fe",
      availability: "booked" as const,
      bookedHours: 44,
    },
  ];

  const CLIENTS = [
    { name: t("clients.list.0.name"), visits: 24, lastVisit: t("clients.list.0.lastVisit"), spend: 1840, tier: "vip" as const, fav: t("clients.list.0.fav") },
    { name: t("clients.list.1.name"), visits: 12, lastVisit: t("clients.list.1.lastVisit"), spend: 920, tier: "gold" as const, fav: t("clients.list.1.fav") },
    { name: t("clients.list.2.name"), visits: 8, lastVisit: t("clients.list.2.lastVisit"), spend: 540, tier: "silver" as const, fav: t("clients.list.2.fav") },
    { name: t("clients.list.3.name"), visits: 3, lastVisit: t("clients.list.3.lastVisit"), spend: 220, tier: "new" as const, fav: t("clients.list.3.fav") },
    { name: t("clients.list.4.name"), visits: 18, lastVisit: t("clients.list.4.lastVisit"), spend: 1320, tier: "vip" as const, fav: t("clients.list.4.fav") },
    { name: t("clients.list.5.name"), visits: 6, lastVisit: t("clients.list.5.lastVisit"), spend: 390, tier: "silver" as const, fav: t("clients.list.5.fav") },
  ];

  const PRODUCTS = [
    { name: t("products.list.0.name"), brand: t("products.list.0.brand"), price: 38, stock: 14, sales: 92 },
    { name: t("products.list.1.name"), brand: t("products.list.1.brand"), price: 28, stock: 6, sales: 78 },
    { name: t("products.list.2.name"), brand: t("products.list.2.brand"), price: 52, stock: 22, sales: 64 },
    { name: t("products.list.3.name"), brand: t("products.list.3.brand"), price: 19, stock: 3, sales: 110 },
    { name: t("products.list.4.name"), brand: t("products.list.4.brand"), price: 88, stock: 11, sales: 41 },
    { name: t("products.list.5.name"), brand: t("products.list.5.brand"), price: 45, stock: 18, sales: 56 },
  ];

  const INVENTORY = [
    { sku: "DEV-001", name: t("inventory.list.0.name"), qty: 28, par: 40, supplier: t("inventory.list.0.supplier"), status: "ok" as const },
    { sku: "DEV-002", name: t("inventory.list.1.name"), qty: 6, par: 24, supplier: t("inventory.list.1.supplier"), status: "low" as const },
    { sku: "DEV-003", name: t("inventory.list.2.name"), qty: 0, par: 12, supplier: t("inventory.list.2.supplier"), status: "out" as const },
    { sku: "DEV-004", name: t("inventory.list.3.name"), qty: 42, par: 50, supplier: t("inventory.list.3.supplier"), status: "ok" as const },
    { sku: "DEV-005", name: t("inventory.list.4.name"), qty: 14, par: 30, supplier: t("inventory.list.4.supplier"), status: "low" as const },
    { sku: "DEV-006", name: t("inventory.list.5.name"), qty: 60, par: 60, supplier: t("inventory.list.5.supplier"), status: "ok" as const },
    { sku: "DEV-007", name: t("inventory.list.6.name"), qty: 8, par: 20, supplier: t("inventory.list.6.supplier"), status: "low" as const },
    { sku: "DEV-008", name: t("inventory.list.7.name"), qty: 35, par: 40, supplier: t("inventory.list.7.supplier"), status: "ok" as const },
  ];

  const CAMPAIGNS = [
    { name: t("marketing.campaigns.0.name"), channel: "Instagram", sent: 1240, opened: 612, booked: 38, status: "live" as const },
    { name: t("marketing.campaigns.1.name"), channel: "Email", sent: 2180, opened: 845, booked: 52, status: "live" as const },
    { name: t("marketing.campaigns.2.name"), channel: "WhatsApp", sent: 480, opened: 410, booked: 22, status: "scheduled" as const },
    { name: t("marketing.campaigns.3.name"), channel: "SMS", sent: 760, opened: 622, booked: 31, status: "ended" as const },
  ];

  const TABS: { id: TabId; label: string; Icon: typeof Scissors; group: GroupKey }[] = [
    { id: "bookings", label: t("nav.bookings"), Icon: CalendarBlank, group: "front" },
    { id: "services", label: t("nav.services"), Icon: Scissors, group: "front" },
    { id: "staff", label: t("nav.staff"), Icon: UsersThree, group: "front" },
    { id: "clients", label: t("nav.clients"), Icon: User, group: "front" },
    { id: "products", label: t("nav.products"), Icon: Package, group: "inventory" },
    { id: "inventory", label: t("nav.inventory"), Icon: Stack, group: "inventory" },
    { id: "schedule", label: t("nav.schedule"), Icon: Clock, group: "ops" },
    { id: "marketing", label: t("nav.marketing"), Icon: Megaphone, group: "ops" },
    { id: "analytics", label: t("nav.analytics"), Icon: ChartLine, group: "ops" },
    { id: "settings", label: t("nav.settings"), Icon: Gear, group: "ops" },
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

  const initials = (name: string) =>
    name
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("");

  const availabilityVariant = (a: "available" | "limited" | "booked"): "success" | "warn" | "danger" =>
    a === "available" ? "success" : a === "limited" ? "warn" : "danger";

  const availabilityLabel = (a: "available" | "limited" | "booked") =>
    a === "available"
      ? t("shell.availability.available")
      : a === "limited"
        ? t("shell.availability.limited")
        : t("shell.availability.booked");

  const tierVariant = (tier: "vip" | "gold" | "silver" | "new"): "success" | "warn" | "info" | "neutral" =>
    tier === "vip" ? "success" : tier === "gold" ? "warn" : tier === "new" ? "info" : "neutral";

  const stockVariant = (s: "ok" | "low" | "out"): "success" | "warn" | "danger" =>
    s === "ok" ? "success" : s === "low" ? "warn" : "danger";

  const campaignVariant = (s: "live" | "scheduled" | "ended"): "success" | "info" | "neutral" =>
    s === "live" ? "success" : s === "scheduled" ? "info" : "neutral";

  // KPI strips per screen
  const bookingsKpis = [
    { label: t("kpi.bookings.0.label"), value: t("kpi.bookings.0.value"), trend: t("kpi.bookings.0.trend"), spark: [12, 14, 13, 16, 18, 20, 22, 24] },
    { label: t("kpi.bookings.1.label"), value: t("kpi.bookings.1.value"), trend: t("kpi.bookings.1.trend"), spark: [48, 52, 55, 58, 60, 62, 65, 68] },
    { label: t("kpi.bookings.2.label"), value: t("kpi.bookings.2.value"), trend: t("kpi.bookings.2.trend"), spark: [8, 7, 6, 5, 4, 5, 4, 3] },
    { label: t("kpi.bookings.3.label"), value: t("kpi.bookings.3.value"), trend: t("kpi.bookings.3.trend"), spark: [20, 22, 28, 32, 38, 42, 40, 36] },
  ];

  const servicesKpis = [
    { label: t("kpi.services.0.label"), value: t("kpi.services.0.value"), trend: t("kpi.services.0.trend"), spark: [10, 11, 12, 12, 13, 13, 14, 14] },
    { label: t("kpi.services.1.label"), value: t("kpi.services.1.value"), trend: t("kpi.services.1.trend"), spark: [28, 32, 30, 34, 36, 38, 40, 42] },
    { label: t("kpi.services.2.label"), value: t("kpi.services.2.value"), trend: t("kpi.services.2.trend"), spark: [55, 58, 60, 62, 65, 68, 70, 72] },
    { label: t("kpi.services.3.label"), value: t("kpi.services.3.value"), trend: t("kpi.services.3.trend"), spark: [42, 44, 46, 48, 50, 52, 54, 56] },
  ];

  const staffKpis = [
    { label: t("kpi.staff.0.label"), value: t("kpi.staff.0.value"), trend: t("kpi.staff.0.trend"), spark: [4, 4, 5, 5, 5, 5, 5, 5] },
    { label: t("kpi.staff.1.label"), value: t("kpi.staff.1.value"), trend: t("kpi.staff.1.trend"), spark: [4.7, 4.8, 4.8, 4.9, 4.9, 4.9, 5.0, 5.0] },
    { label: t("kpi.staff.2.label"), value: t("kpi.staff.2.value"), trend: t("kpi.staff.2.trend"), spark: [80, 90, 110, 130, 140, 155, 170, 180] },
    { label: t("kpi.staff.3.label"), value: t("kpi.staff.3.value"), trend: t("kpi.staff.3.trend"), spark: [55, 58, 60, 62, 65, 68, 70, 72] },
  ];

  const clientsKpis = [
    { label: t("kpi.clients.0.label"), value: t("kpi.clients.0.value"), trend: t("kpi.clients.0.trend"), spark: [820, 880, 930, 1010, 1080, 1140, 1210, 1280] },
    { label: t("kpi.clients.1.label"), value: t("kpi.clients.1.value"), trend: t("kpi.clients.1.trend"), spark: [12, 18, 22, 28, 34, 40, 46, 52] },
    { label: t("kpi.clients.2.label"), value: t("kpi.clients.2.value"), trend: t("kpi.clients.2.trend"), spark: [60, 62, 64, 66, 68, 70, 71, 72] },
    { label: t("kpi.clients.3.label"), value: t("kpi.clients.3.value"), trend: t("kpi.clients.3.trend"), spark: [142, 156, 168, 172, 184, 198, 212, 224] },
  ];

  const productsKpis = [
    { label: t("kpi.products.0.label"), value: t("kpi.products.0.value"), trend: t("kpi.products.0.trend"), spark: [28, 32, 34, 36, 38, 40, 42, 46] },
    { label: t("kpi.products.1.label"), value: t("kpi.products.1.value"), trend: t("kpi.products.1.trend"), spark: [820, 940, 1080, 1180, 1240, 1320, 1410, 1520] },
    { label: t("kpi.products.2.label"), value: t("kpi.products.2.value"), trend: t("kpi.products.2.trend"), spark: [22, 24, 26, 28, 31, 33, 34, 36] },
    { label: t("kpi.products.3.label"), value: t("kpi.products.3.value"), trend: t("kpi.products.3.trend"), spark: [4, 6, 5, 7, 8, 6, 5, 4] },
  ];

  const inventoryKpis = [
    { label: t("kpi.inventory.0.label"), value: t("kpi.inventory.0.value"), trend: t("kpi.inventory.0.trend"), spark: [180, 192, 188, 196, 204, 212, 218, 224] },
    { label: t("kpi.inventory.1.label"), value: t("kpi.inventory.1.value"), trend: t("kpi.inventory.1.trend"), spark: [3, 4, 4, 5, 6, 5, 6, 5] },
    { label: t("kpi.inventory.2.label"), value: t("kpi.inventory.2.value"), trend: t("kpi.inventory.2.trend"), spark: [1, 1, 0, 1, 1, 1, 1, 1] },
    { label: t("kpi.inventory.3.label"), value: t("kpi.inventory.3.value"), trend: t("kpi.inventory.3.trend"), spark: [22, 24, 26, 25, 27, 28, 30, 32] },
  ];

  const scheduleKpis = [
    { label: t("kpi.schedule.0.label"), value: t("kpi.schedule.0.value"), trend: t("kpi.schedule.0.trend"), spark: [62, 65, 68, 72, 75, 78, 82, 85] },
    { label: t("kpi.schedule.1.label"), value: t("kpi.schedule.1.value"), trend: t("kpi.schedule.1.trend"), spark: [38, 42, 44, 46, 48, 52, 54, 56] },
    { label: t("kpi.schedule.2.label"), value: t("kpi.schedule.2.value"), trend: t("kpi.schedule.2.trend"), spark: [8, 10, 12, 12, 13, 14, 14, 15] },
    { label: t("kpi.schedule.3.label"), value: t("kpi.schedule.3.value"), trend: t("kpi.schedule.3.trend"), spark: [4, 5, 4, 6, 5, 4, 3, 4] },
  ];

  const marketingKpis = [
    { label: t("kpi.marketing.0.label"), value: t("kpi.marketing.0.value"), trend: t("kpi.marketing.0.trend"), spark: [12, 14, 18, 22, 24, 28, 32, 36] },
    { label: t("kpi.marketing.1.label"), value: t("kpi.marketing.1.value"), trend: t("kpi.marketing.1.trend"), spark: [22, 26, 30, 34, 38, 42, 46, 50] },
    { label: t("kpi.marketing.2.label"), value: t("kpi.marketing.2.value"), trend: t("kpi.marketing.2.trend"), spark: [3.4, 3.6, 3.8, 4.0, 4.2, 4.4, 4.6, 4.8] },
    { label: t("kpi.marketing.3.label"), value: t("kpi.marketing.3.value"), trend: t("kpi.marketing.3.trend"), spark: [180, 220, 260, 290, 320, 360, 410, 460] },
  ];

  const analyticsKpis = [
    { label: t("kpi.analytics.0.label"), value: t("kpi.analytics.0.value"), trend: t("kpi.analytics.0.trend"), spark: [8400, 9200, 10200, 11200, 12200, 13200, 14200, 15400] },
    { label: t("kpi.analytics.1.label"), value: t("kpi.analytics.1.value"), trend: t("kpi.analytics.1.trend"), spark: [62, 64, 66, 68, 70, 71, 72, 74] },
    { label: t("kpi.analytics.2.label"), value: t("kpi.analytics.2.value"), trend: t("kpi.analytics.2.trend"), spark: [84, 86, 88, 90, 91, 92, 93, 94] },
    { label: t("kpi.analytics.3.label"), value: t("kpi.analytics.3.value"), trend: t("kpi.analytics.3.trend"), spark: [180, 192, 204, 218, 226, 238, 248, 262] },
  ];

  const brandMark = (
    <div
      style={{
        width: 28,
        height: 28,
        background: C.primary,
        borderRadius: 8,
        display: "grid",
        placeItems: "center",
      }}
    >
      <Scissors weight="thin" size={16} style={{ color: C.paper }} />
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
        rightSlot={
          <DemoCommandPalette
            palette={palette}
            items={paletteItems}
            placeholder={t("commandPalette.placeholder")}
            hint="⌘K"
          />
        }
      />

      <div style={{ flex: 1, display: "flex" }}>
        <aside
          style={{
            width: 220,
            borderRight: `1px solid ${C.border}`,
            padding: "24px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 22,
            background: C.paper,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 4px" }}>
            <div
              style={{
                width: 38,
                height: 38,
                background: C.primary,
                color: C.paper,
                display: "grid",
                placeItems: "center",
                borderRadius: 10,
              }}
            >
              <Scissors weight="thin" size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15, letterSpacing: -0.3, fontFamily: "Georgia, serif" }}>
                {t("brand.name")}
              </div>
              <div style={{ fontSize: 10, color: C.muted, letterSpacing: 2, textTransform: "uppercase" }}>
                {t("brand.tagline")}
              </div>
            </div>
          </div>

          {(["front", "inventory", "ops"] as const).map((g) => (
            <div key={g}>
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: C.muted,
                  padding: "0 6px 6px",
                }}
              >
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
                        background: active ? C.primary : "transparent",
                        color: active ? C.paper : C.ink,
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
                      <Icon weight="thin" style={{ width: 14, height: 14 }} />
                      {tabItem.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          ))}
        </aside>

        <main style={{ flex: 1, padding: 32, maxWidth: 1400, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
          {tab === "bookings" && (
            <section>
              <DemoKpiStrip palette={palette} items={bookingsKpis} />
              <DemoScreenHeader
                palette={palette}
                eyebrow={t("screen.bookings.eyebrow")}
                title={t("screen.bookings.title")}
                subtitle={t("screen.bookings.subtitle")}
              />

              <section style={{ textAlign: "center", padding: "8px 0 28px" }}>
                <span
                  style={{
                    fontSize: 11,
                    color: C.primary,
                    letterSpacing: 3,
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}
                >
                  {t("hero.eyebrow")}
                </span>
                <h2
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: 36,
                    lineHeight: 1.1,
                    margin: "10px auto",
                    maxWidth: 600,
                  }}
                >
                  {t("hero.title")}
                </h2>
                <p style={{ color: C.muted, maxWidth: 540, margin: "0 auto" }}>{t("hero.subtitle")}</p>
              </section>

              <section style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24 }}>
                <div>
                  <h3 style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700, marginBottom: 14 }}>
                    {t("services.heading")}
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {SERVICES.map((s, i) => {
                      const active = chosen === s.name;
                      return (
                        <button
                          key={s.name}
                          onClick={() => {
                            setChosen(s.name);
                            toast.push({ title: t("toast.serviceChosen", { name: s.name }) });
                          }}
                          style={{
                            textAlign: "left",
                            background: active ? C.primary : C.paper,
                            color: active ? "white" : C.ink,
                            border: `1px solid ${active ? C.primary : C.border}`,
                            borderRadius: 14,
                            padding: 0,
                            cursor: "pointer",
                            overflow: "hidden",
                          }}
                        >
                          <div style={{ position: "relative", height: 90, overflow: "hidden" }}>
                            <img
                              src={demoImages["beauty-salon"].services[i % demoImages["beauty-salon"].services.length]}
                              alt=""
                              loading="lazy"
                              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                inset: 0,
                                background: active
                                  ? `linear-gradient(180deg, ${C.primary}66 0%, ${C.primary}cc 100%)`
                                  : `linear-gradient(180deg, transparent 0%, ${C.paper}66 100%)`,
                              }}
                            />
                          </div>
                          <div style={{ padding: 16 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                              <span style={{ fontWeight: 700, fontSize: 15 }}>{s.name}</span>
                              <span style={{ fontWeight: 800, fontSize: 17 }}>
                                $<DemoCounter value={s.price} />
                              </span>
                            </div>
                            <div style={{ marginTop: 8, display: "flex", gap: 12, fontSize: 12, opacity: active ? 0.9 : 0.7 }}>
                              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                                <Clock weight="thin" style={{ width: 12, height: 12 }} /> {s.duration}
                              </span>
                              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                                <User weight="thin" style={{ width: 12, height: 12 }} />{" "}
                                {t("services.withStylist", { stylist: s.stylist })}
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <aside
                  style={{
                    background: C.paper,
                    border: `1px solid ${C.border}`,
                    borderRadius: 16,
                    padding: 22,
                    position: "sticky",
                    top: 24,
                    alignSelf: "start",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                    <h3 style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 700, margin: 0 }}>
                      {t("booking.heading")}
                    </h3>
                    <DemoBadge
                      palette={palette}
                      variant={chosen && time ? "success" : "neutral"}
                      label={chosen && time ? t("shell.bookingStatus.ready") : t("shell.bookingStatus.draft")}
                    />
                  </div>
                  <div style={{ marginTop: 12, padding: 14, background: C.bg, borderRadius: 10 }}>
                    <div
                      style={{
                        fontSize: 11,
                        color: C.primary,
                        fontWeight: 700,
                        letterSpacing: 1,
                        textTransform: "uppercase",
                      }}
                    >
                      {t("booking.serviceLabel")}
                    </div>
                    <div style={{ marginTop: 4, fontWeight: 600 }}>{chosen ?? t("booking.servicePlaceholder")}</div>
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <div
                      style={{
                        fontSize: 11,
                        color: C.primary,
                        fontWeight: 700,
                        letterSpacing: 1,
                        textTransform: "uppercase",
                        marginBottom: 8,
                      }}
                    >
                      {t("booking.dateLabel")}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
                      {SLOTS.map((s) => {
                        const taken = ["10:00", "13:00"].includes(s);
                        const active = time === s;
                        return (
                          <button
                            key={s}
                            disabled={taken}
                            onClick={() => {
                              setTime(s);
                              toast.push({ title: t("toast.slotChosen", { time: s }) });
                            }}
                            style={{
                              padding: "8px 4px",
                              borderRadius: 8,
                              border: `1px solid ${active ? C.primary : C.border}`,
                              background: taken ? C.bg : active ? C.primary : C.paper,
                              color: taken ? C.muted : active ? "white" : C.ink,
                              fontSize: 13,
                              fontWeight: 600,
                              cursor: taken ? "not-allowed" : "pointer",
                              textDecoration: taken ? "line-through" : "none",
                            }}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <button
                    disabled={!chosen || !time}
                    onClick={() =>
                      toast.push({
                        title: t("toast.bookingConfirmed", { name: chosen ?? "", time: time ?? "" }),
                        tone: "success",
                      })
                    }
                    style={{
                      marginTop: 22,
                      width: "100%",
                      padding: 12,
                      background: !chosen || !time ? C.border : C.primary,
                      color: !chosen || !time ? C.muted : "white",
                      border: "none",
                      borderRadius: 9999,
                      fontWeight: 700,
                      cursor: !chosen || !time ? "not-allowed" : "pointer",
                    }}
                  >
                    <Sparkle weight="thin" style={{ width: 14, height: 14, display: "inline", marginRight: 6, verticalAlign: -2 }} />
                    {t("booking.confirmButton")}
                  </button>
                  <p style={{ marginTop: 10, fontSize: 11, color: C.muted, textAlign: "center" }}>
                    <Heart
                      weight="thin"
                      style={{ width: 11, height: 11, display: "inline", marginRight: 4, color: C.accent, verticalAlign: -1 }}
                    />
                    {t("booking.noCard")}
                  </p>
                </aside>
              </section>
            </section>
          )}

          {tab === "services" && (
            <section>
              <DemoKpiStrip palette={palette} items={servicesKpis} />
              <DemoScreenHeader
                palette={palette}
                eyebrow={t("screen.services.eyebrow")}
                title={t("screen.services.title")}
                subtitle={t("screen.services.subtitle")}
              />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                {MENU.map(({ category, items }, idx) => {
                  const Icon = CATEGORY_ICON[category];
                  return (
                    <div
                      key={category}
                      style={{
                        background: C.paper,
                        border: `1px solid ${C.border}`,
                        borderRadius: 18,
                        padding: 22,
                        overflow: "hidden",
                      }}
                    >
                      <div style={{ position: "relative", margin: "-22px -22px 18px", height: 110, overflow: "hidden" }}>
                        <img
                          src={demoImages["beauty-salon"].services[idx % demoImages["beauty-salon"].services.length]}
                          alt=""
                          loading="lazy"
                          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: `linear-gradient(180deg, ${C.primary}33 0%, ${C.paper}f0 100%)`,
                          }}
                        />
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 10,
                            background: C.bg,
                            display: "grid",
                            placeItems: "center",
                            color: C.primary,
                          }}
                        >
                          <Icon weight="thin" style={{ width: 20, height: 20 }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 18 }}>
                            {t(`menu.categories.${category}`)}
                          </div>
                          <div style={{ fontSize: 10, color: C.muted, letterSpacing: 2, textTransform: "uppercase" }}>
                            {t("menu.itemCount", { count: items.length })}
                          </div>
                        </div>
                        <DemoBadge palette={palette} variant="info" label={t("shell.serviceTag.active")} />
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {items.map((item) => (
                          <div
                            key={item.name}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "10px 12px",
                              background: C.bg,
                              borderRadius: 10,
                            }}
                          >
                            <div>
                              <div style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</div>
                              <div
                                style={{
                                  fontSize: 11,
                                  color: C.muted,
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 4,
                                  marginTop: 4,
                                }}
                              >
                                <Clock weight="thin" style={{ width: 11, height: 11 }} /> {item.duration}
                              </div>
                            </div>
                            <span style={{ fontWeight: 800, fontSize: 16, color: C.primary }}>
                              $<DemoCounter value={item.price} />
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {tab === "staff" && (
            <section>
              <DemoKpiStrip palette={palette} items={staffKpis} />
              <DemoScreenHeader
                palette={palette}
                eyebrow={t("screen.staff.eyebrow")}
                title={t("screen.staff.title")}
                subtitle={t("screen.staff.subtitle")}
              />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
                {ROSTER.map((person) => (
                  <div
                    key={person.name}
                    style={{
                      background: C.paper,
                      border: `1px solid ${C.border}`,
                      borderRadius: 18,
                      padding: 22,
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
                          background: person.tint,
                          color: C.ink,
                          display: "grid",
                          placeItems: "center",
                          fontWeight: 800,
                          fontSize: 18,
                          fontFamily: "Georgia, serif",
                        }}
                      >
                        {initials(person.name)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 17 }}>{person.name}</div>
                        <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{person.specialties}</div>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "6px 10px",
                          background: C.bg,
                          borderRadius: 999,
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        <Star weight="thin" style={{ width: 14, height: 14, color: C.primary }} />
                        {person.rating.toFixed(1)}
                        <span style={{ color: C.muted, fontWeight: 500, marginLeft: 4 }}>{t("roster.ratingLabel")}</span>
                      </div>
                      <DemoBadge palette={palette} variant={availabilityVariant(person.availability)} label={availabilityLabel(person.availability)} />
                    </div>

                    <div
                      style={{
                        padding: 12,
                        background: C.bg,
                        borderRadius: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: 10,
                            color: C.primary,
                            fontWeight: 700,
                            letterSpacing: 1,
                            textTransform: "uppercase",
                          }}
                        >
                          {t("roster.nextAvailable")}
                        </div>
                        <div style={{ fontWeight: 700, fontSize: 14, marginTop: 2 }}>{person.nextSlot}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div
                          style={{
                            fontSize: 10,
                            color: C.muted,
                            fontWeight: 700,
                            letterSpacing: 1,
                            textTransform: "uppercase",
                          }}
                        >
                          {t("roster.bookedHours")}
                        </div>
                        <div style={{ fontWeight: 800, fontSize: 16, color: C.primary, marginTop: 2 }}>
                          <DemoCounter value={person.bookedHours} suffix="h" />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => toast.push({ title: t("toast.staffBooked", { name: person.name }), tone: "success" })}
                      style={{
                        background: C.primary,
                        color: "white",
                        border: "none",
                        padding: "10px 14px",
                        borderRadius: 9999,
                        fontWeight: 700,
                        fontSize: 12,
                        cursor: "pointer",
                        textTransform: "uppercase",
                        letterSpacing: 1.5,
                      }}
                    >
                      {t("roster.bookButton")}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {tab === "clients" && (
            <section>
              <DemoKpiStrip palette={palette} items={clientsKpis} />
              <DemoScreenHeader
                palette={palette}
                eyebrow={t("screen.clients.eyebrow")}
                title={t("screen.clients.title")}
                subtitle={t("screen.clients.subtitle")}
              />
              <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.6fr 0.7fr 1fr 0.9fr 1.1fr 0.9fr",
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
                  <span>{t("clients.col.name")}</span>
                  <span>{t("clients.col.visits")}</span>
                  <span>{t("clients.col.lastVisit")}</span>
                  <span style={{ textAlign: "right" }}>{t("clients.col.spend")}</span>
                  <span>{t("clients.col.favorite")}</span>
                  <span style={{ textAlign: "right" }}>{t("clients.col.tier")}</span>
                </div>
                {CLIENTS.map((c) => (
                  <div
                    key={c.name}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.6fr 0.7fr 1fr 0.9fr 1.1fr 0.9fr",
                      padding: "14px 20px",
                      borderBottom: `1px solid ${C.border}`,
                      alignItems: "center",
                      fontSize: 13,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 999,
                          background: C.card,
                          color: C.primary,
                          display: "grid",
                          placeItems: "center",
                          fontWeight: 800,
                          fontSize: 12,
                        }}
                      >
                        {initials(c.name)}
                      </div>
                      <span style={{ fontWeight: 700 }}>{c.name}</span>
                    </div>
                    <span style={{ fontWeight: 600 }}>{c.visits}</span>
                    <span style={{ color: C.muted, fontSize: 12 }}>{c.lastVisit}</span>
                    <span style={{ textAlign: "right", fontWeight: 800, color: C.primary }}>
                      $<DemoCounter value={c.spend} />
                    </span>
                    <span style={{ fontSize: 12, color: C.muted }}>{c.fav}</span>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <DemoBadge palette={palette} variant={tierVariant(c.tier)} label={t(`clients.tiers.${c.tier}`)} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {tab === "products" && (
            <section>
              <DemoKpiStrip palette={palette} items={productsKpis} />
              <DemoScreenHeader
                palette={palette}
                eyebrow={t("screen.products.eyebrow")}
                title={t("screen.products.title")}
                subtitle={t("screen.products.subtitle")}
              />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
                {PRODUCTS.map((p, idx) => {
                  const low = p.stock <= 5;
                  return (
                    <div
                      key={p.name}
                      style={{
                        background: C.paper,
                        border: `1px solid ${C.border}`,
                        borderRadius: 16,
                        padding: 18,
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          borderRadius: 12,
                          height: 90,
                          overflow: "hidden",
                          color: C.primary,
                        }}
                      >
                        <img
                          src={demoImages["beauty-salon"].services[idx % demoImages["beauty-salon"].services.length]}
                          alt=""
                          loading="lazy"
                          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: `linear-gradient(135deg, ${C.card}66, ${C.primary}33)`,
                            display: "grid",
                            placeItems: "center",
                          }}
                        >
                          <Package weight="thin" size={36} style={{ color: C.paper, filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.25))" }} />
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, color: C.muted, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 700 }}>
                          {p.brand}
                        </div>
                        <div style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 16, marginTop: 2 }}>
                          {p.name}
                        </div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontWeight: 800, fontSize: 18, color: C.primary }}>
                          $<DemoCounter value={p.price} />
                        </span>
                        <DemoBadge
                          palette={palette}
                          variant={low ? "warn" : "success"}
                          label={t("products.stockLabel", { qty: p.stock })}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "8px 10px",
                          background: C.bg,
                          borderRadius: 8,
                          fontSize: 12,
                        }}
                      >
                        <span style={{ color: C.muted, display: "inline-flex", alignItems: "center", gap: 6 }}>
                          <TrendUp weight="thin" size={14} />
                          {t("products.salesLabel")}
                        </span>
                        <span style={{ fontWeight: 800 }}>
                          <DemoCounter value={p.sales} />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {tab === "inventory" && (
            <section>
              <DemoKpiStrip palette={palette} items={inventoryKpis} />
              <DemoScreenHeader
                palette={palette}
                eyebrow={t("screen.inventory.eyebrow")}
                title={t("screen.inventory.title")}
                subtitle={t("screen.inventory.subtitle")}
              />
              <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "100px 1.6fr 1fr 1.2fr 0.8fr 110px",
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
                  <span>{t("inventory.col.sku")}</span>
                  <span>{t("inventory.col.item")}</span>
                  <span>{t("inventory.col.supplier")}</span>
                  <span>{t("inventory.col.qty")}</span>
                  <span>{t("inventory.col.status")}</span>
                  <span style={{ textAlign: "right" }}>{t("inventory.col.action")}</span>
                </div>
                {INVENTORY.map((row) => {
                  const pct = Math.min(100, Math.round((row.qty / row.par) * 100));
                  return (
                    <div
                      key={row.sku}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "100px 1.6fr 1fr 1.2fr 0.8fr 110px",
                        padding: "14px 20px",
                        borderBottom: `1px solid ${C.border}`,
                        alignItems: "center",
                        fontSize: 13,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "ui-monospace, monospace",
                          color: C.muted,
                          fontWeight: 700,
                          fontSize: 11,
                        }}
                      >
                        {row.sku}
                      </span>
                      <span style={{ fontWeight: 700 }}>{row.name}</span>
                      <span style={{ color: C.muted, fontSize: 12 }}>{row.supplier}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ flex: 1, height: 6, background: C.bg, borderRadius: 999, overflow: "hidden", maxWidth: 90 }}>
                          <div
                            style={{
                              width: `${pct}%`,
                              height: "100%",
                              background: row.status === "out" ? "#dc2626" : row.status === "low" ? "#d97706" : C.primary,
                            }}
                          />
                        </div>
                        <span style={{ fontSize: 11, color: C.muted, width: 50 }}>
                          {row.qty}/{row.par}
                        </span>
                      </div>
                      <DemoBadge palette={palette} variant={stockVariant(row.status)} label={t(`inventory.status.${row.status}`)} />
                      <button
                        onClick={() => toast.push({ title: t("toast.reordered", { name: row.name }), tone: "success" })}
                        style={{
                          justifySelf: "end",
                          padding: "6px 12px",
                          background: "transparent",
                          color: C.primary,
                          border: `1px solid ${C.border}`,
                          borderRadius: 9999,
                          fontWeight: 700,
                          fontSize: 11,
                          cursor: "pointer",
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                        }}
                      >
                        {t("inventory.reorder")}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {tab === "schedule" && (
            <section>
              <DemoKpiStrip palette={palette} items={scheduleKpis} />
              <DemoScreenHeader
                palette={palette}
                eyebrow={t("screen.schedule.eyebrow")}
                title={t("screen.schedule.title")}
                subtitle={t("screen.schedule.subtitle")}
              />
              <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22, marginBottom: 18 }}>
                <div
                  style={{
                    fontSize: 11,
                    color: C.muted,
                    marginBottom: 14,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    fontWeight: 700,
                  }}
                >
                  {t("schedule.heatmapLabel")}
                </div>
                <DemoHeatmap palette={palette} weeks={14} seed={7} ariaLabel={t("schedule.heatmapLabel")} />
                <p style={{ marginTop: 14, color: C.muted, fontSize: 12 }}>{t("schedule.heatmapNote")}</p>
              </div>

              <div
                style={{
                  background: C.paper,
                  border: `1px solid ${C.border}`,
                  borderRadius: 14,
                  padding: 22,
                }}
              >
                <h3 style={{ fontSize: 14, fontWeight: 800, margin: "0 0 14px", textTransform: "uppercase", letterSpacing: 1 }}>
                  {t("schedule.todayTitle")}
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
                  {[
                    { time: "09:00", client: t("schedule.appointments.0.client"), service: t("schedule.appointments.0.service"), stylist: t("stylists.nora") },
                    { time: "10:30", client: t("schedule.appointments.1.client"), service: t("schedule.appointments.1.service"), stylist: t("stylists.mara") },
                    { time: "11:00", client: t("schedule.appointments.2.client"), service: t("schedule.appointments.2.service"), stylist: t("stylists.liv") },
                    { time: "12:30", client: t("schedule.appointments.3.client"), service: t("schedule.appointments.3.service"), stylist: t("stylists.nora") },
                    { time: "14:00", client: t("schedule.appointments.4.client"), service: t("schedule.appointments.4.service"), stylist: t("stylists.mara") },
                    { time: "15:30", client: t("schedule.appointments.5.client"), service: t("schedule.appointments.5.service"), stylist: t("stylists.liv") },
                  ].map((appt, i) => (
                    <div
                      key={i}
                      style={{
                        background: C.bg,
                        border: `1px solid ${C.border}`,
                        borderLeft: `3px solid ${C.primary}`,
                        borderRadius: 10,
                        padding: 12,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "ui-monospace, monospace",
                          fontWeight: 800,
                          fontSize: 13,
                          color: C.primary,
                        }}
                      >
                        {appt.time}
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 13, marginTop: 4 }}>{appt.client}</div>
                      <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{appt.service}</div>
                      <div
                        style={{
                          fontSize: 11,
                          color: C.muted,
                          marginTop: 4,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <User weight="thin" size={11} />
                        {appt.stylist}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {tab === "marketing" && (
            <section>
              <DemoKpiStrip palette={palette} items={marketingKpis} />
              <DemoScreenHeader
                palette={palette}
                eyebrow={t("screen.marketing.eyebrow")}
                title={t("screen.marketing.title")}
                subtitle={t("screen.marketing.subtitle")}
              />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 18 }}>
                <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.4fr 0.9fr 0.7fr 0.7fr 0.7fr 0.8fr",
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
                    <span>{t("marketing.col.campaign")}</span>
                    <span>{t("marketing.col.channel")}</span>
                    <span style={{ textAlign: "right" }}>{t("marketing.col.sent")}</span>
                    <span style={{ textAlign: "right" }}>{t("marketing.col.opened")}</span>
                    <span style={{ textAlign: "right" }}>{t("marketing.col.booked")}</span>
                    <span style={{ textAlign: "right" }}>{t("marketing.col.status")}</span>
                  </div>
                  {CAMPAIGNS.map((c) => (
                    <div
                      key={c.name}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1.4fr 0.9fr 0.7fr 0.7fr 0.7fr 0.8fr",
                        padding: "14px 20px",
                        borderBottom: `1px solid ${C.border}`,
                        alignItems: "center",
                        fontSize: 13,
                      }}
                    >
                      <span style={{ fontWeight: 700 }}>{c.name}</span>
                      <span style={{ color: C.muted, fontSize: 12 }}>{c.channel}</span>
                      <span style={{ textAlign: "right" }}>
                        <DemoCounter value={c.sent} />
                      </span>
                      <span style={{ textAlign: "right" }}>
                        <DemoCounter value={c.opened} />
                      </span>
                      <span style={{ textAlign: "right", fontWeight: 800, color: C.primary }}>
                        <DemoCounter value={c.booked} />
                      </span>
                      <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <DemoBadge palette={palette} variant={campaignVariant(c.status)} label={t(`marketing.status.${c.status}`)} />
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    background: C.paper,
                    border: `1px solid ${C.border}`,
                    borderRadius: 14,
                    padding: 20,
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  <h3 style={{ fontSize: 14, fontWeight: 800, margin: 0, textTransform: "uppercase", letterSpacing: 1 }}>
                    {t("marketing.newCampaign")}
                  </h3>
                  <input
                    placeholder={t("marketing.placeholders.name")}
                    style={{
                      background: C.bg,
                      border: `1px solid ${C.border}`,
                      borderRadius: 8,
                      padding: "10px 12px",
                      fontSize: 13,
                      color: C.ink,
                      outline: "none",
                    }}
                  />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {(["instagram", "email", "whatsapp", "sms"] as const).map((ch) => (
                      <button
                        key={ch}
                        onClick={() => toast.push({ title: t("toast.channelSelected", { channel: t(`marketing.channels.${ch}`) }) })}
                        style={{
                          padding: "10px 8px",
                          background: C.bg,
                          border: `1px solid ${C.border}`,
                          borderRadius: 8,
                          fontSize: 11,
                          color: C.ink,
                          fontWeight: 700,
                          cursor: "pointer",
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                        }}
                      >
                        {t(`marketing.channels.${ch}`)}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => toast.push({ title: t("toast.campaignLaunched"), tone: "success" })}
                    style={{
                      marginTop: 4,
                      padding: "10px 14px",
                      background: C.primary,
                      color: "white",
                      border: "none",
                      borderRadius: 9999,
                      fontWeight: 800,
                      fontSize: 12,
                      cursor: "pointer",
                      textTransform: "uppercase",
                      letterSpacing: 1,
                    }}
                  >
                    <Megaphone weight="thin" style={{ width: 14, height: 14, display: "inline", marginRight: 6, verticalAlign: -2 }} />
                    {t("marketing.launch")}
                  </button>
                </div>
              </div>
            </section>
          )}

          {tab === "analytics" && (
            <section>
              <DemoKpiStrip palette={palette} items={analyticsKpis} />
              <DemoScreenHeader
                palette={palette}
                eyebrow={t("screen.analytics.eyebrow")}
                title={t("screen.analytics.title")}
                subtitle={t("screen.analytics.subtitle")}
              />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 18, marginBottom: 18 }}>
                <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
                    <h3 style={{ fontSize: 16, margin: 0, fontWeight: 800, fontFamily: "Georgia, serif" }}>
                      {t("analytics.revenueTitle")}
                    </h3>
                    <span style={{ fontSize: 11, color: C.muted }}>{t("analytics.last30")}</span>
                  </div>
                  <DemoChart
                    data={[
                      4200, 4350, 4480, 4620, 4710, 4880, 5020, 5180, 5290, 5410,
                      5560, 5680, 5820, 5910, 6080, 6210, 6340, 6480, 6610, 6740,
                      6890, 7020, 7180, 7290, 7440, 7580, 7720, 7880, 8050, 8240,
                    ]}
                    palette={palette}
                    height={200}
                  />
                </div>
                <DemoLiveFeed
                  palette={palette}
                  liveLabel={t("analytics.liveFeed")}
                  height={250}
                  initial={[
                    { id: "a1", title: t("analytics.feed.initial.0.title"), meta: t("analytics.feed.initial.0.meta"), tone: "success" },
                    { id: "a2", title: t("analytics.feed.initial.1.title"), meta: t("analytics.feed.initial.1.meta"), tone: "primary" },
                    { id: "a3", title: t("analytics.feed.initial.2.title"), meta: t("analytics.feed.initial.2.meta"), tone: "info" },
                  ]}
                  rotating={[
                    { id: "ar1", title: t("analytics.feed.rotating.0.title"), meta: t("analytics.feed.rotating.0.meta"), tone: "success" },
                    { id: "ar2", title: t("analytics.feed.rotating.1.title"), meta: t("analytics.feed.rotating.1.meta"), tone: "primary" },
                    { id: "ar3", title: t("analytics.feed.rotating.2.title"), meta: t("analytics.feed.rotating.2.meta"), tone: "info" },
                    { id: "ar4", title: t("analytics.feed.rotating.3.title"), meta: t("analytics.feed.rotating.3.meta"), tone: "warn" },
                  ]}
                />
              </div>
              <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
                <h3 style={{ fontSize: 16, margin: "0 0 14px", fontWeight: 800, fontFamily: "Georgia, serif" }}>
                  {t("analytics.cohortTitle")}
                </h3>
                <DemoCohort palette={palette} rows={6} cols={8} />
                <p style={{ color: C.muted, fontSize: 12, marginTop: 12 }}>{t("analytics.cohortNote")}</p>
              </div>
            </section>
          )}

          {tab === "settings" && (
            <section>
              <DemoScreenHeader
                palette={palette}
                eyebrow={t("screen.settings.eyebrow")}
                title={t("screen.settings.title")}
                subtitle={t("screen.settings.subtitle")}
              />
              <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22, marginBottom: 18 }}>
                <h3 style={{ fontSize: 14, fontWeight: 800, margin: "0 0 14px", textTransform: "uppercase", letterSpacing: 1 }}>
                  {t("settings.basics")}
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {(["salonName", "currency", "openHours", "contact"] as const).map((f) => (
                    <div key={f}>
                      <label
                        style={{
                          display: "block",
                          fontSize: 10,
                          color: C.muted,
                          textTransform: "uppercase",
                          letterSpacing: 1,
                          fontWeight: 700,
                          marginBottom: 6,
                        }}
                      >
                        {t(`settings.fields.${f}`)}
                      </label>
                      <input
                        defaultValue={t(`settings.placeholders.${f}`)}
                        style={{
                          width: "100%",
                          background: C.bg,
                          border: `1px solid ${C.border}`,
                          borderRadius: 8,
                          padding: "10px 12px",
                          fontSize: 13,
                          color: C.ink,
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => toast.push({ title: t("toast.settingsSaved"), tone: "success" })}
                  style={{
                    marginTop: 16,
                    padding: "10px 18px",
                    background: C.primary,
                    color: "white",
                    border: "none",
                    borderRadius: 9999,
                    fontWeight: 800,
                    fontSize: 12,
                    cursor: "pointer",
                    letterSpacing: 1,
                    textTransform: "uppercase",
                  }}
                >
                  {t("settings.save")}
                </button>
              </div>
              <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
                <h3
                  style={{
                    fontSize: 14,
                    fontWeight: 800,
                    margin: "0 0 14px",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Storefront weight="thin" size={16} />
                  {t("settings.integrationsTitle")}
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
                  {([
                    { name: "Stripe", Icon: CreditCard, on: true, desc: "stripe" },
                    { name: "Square", Icon: Tag, on: false, desc: "square" },
                    { name: "Mailchimp", Icon: Envelope, on: true, desc: "mailchimp" },
                    { name: "Instagram", Icon: InstagramLogo, on: true, desc: "instagram" },
                    { name: "WhatsApp", Icon: WhatsappLogo, on: false, desc: "whatsapp" },
                    { name: "Google Calendar", Icon: GoogleLogo, on: true, desc: "google" },
                  ] as const).map((i) => {
                    const Icon = i.Icon;
                    return (
                      <div
                        key={i.name}
                        style={{
                          background: C.bg,
                          border: `1px solid ${C.border}`,
                          borderRadius: 12,
                          padding: 14,
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                          <div
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 8,
                              background: C.paper,
                              border: `1px solid ${C.border}`,
                              display: "grid",
                              placeItems: "center",
                              color: C.primary,
                            }}
                          >
                            <Icon weight="thin" size={18} />
                          </div>
                          <DemoBadge
                            palette={palette}
                            variant={i.on ? "success" : "neutral"}
                            label={t(i.on ? "settings.connected" : "settings.disconnected")}
                          />
                        </div>
                        <div style={{ fontWeight: 700, fontSize: 13 }}>{i.name}</div>
                        <div style={{ color: C.muted, fontSize: 11, lineHeight: 1.5, marginTop: 4 }}>
                          {t(`settings.integrations.${i.desc}`)}
                        </div>
                        <button
                          onClick={() =>
                            toast.push({
                              title: t(i.on ? "toast.disconnected" : "toast.connected", { name: i.name }),
                              tone: i.on ? "warn" : "success",
                            })
                          }
                          style={{
                            marginTop: 8,
                            padding: "5px 10px",
                            background: "transparent",
                            border: `1px solid ${C.border}`,
                            borderRadius: 8,
                            fontSize: 11,
                            fontWeight: 700,
                            color: C.ink,
                            cursor: "pointer",
                            textTransform: "uppercase",
                            letterSpacing: 0.5,
                          }}
                        >
                          {t(i.on ? "settings.disconnect" : "settings.connect")}
                        </button>
                      </div>
                    );
                  })}
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
