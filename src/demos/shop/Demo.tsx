"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  ShoppingBagIcon,
  HeartIcon,
  StarIcon,
  PlusIcon,
  MinusIcon,
  XMarkIcon,
  ShoppingCartIcon,
  ClipboardDocumentListIcon,
  CubeIcon,
  TruckIcon,
  CheckBadgeIcon,
  ReceiptRefundIcon,
  CreditCardIcon,
  ArrowLeftIcon,
  UsersIcon,
  ChartBarIcon,
  TagIcon,
  Cog6ToothIcon,
  ArchiveBoxIcon,
  SparklesIcon,
  ArrowRightIcon,
  BoltIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import {
  DemoTopBar,
  DemoStatusBar,
  DemoKpiStrip,
  DemoScreenHeader,
  DemoBadge,
  DemoSpark,
} from "@/components/demo-shell";
import {
  DemoCounter,
  DemoChart,
  DemoHeatmap,
  DemoCohort,
  DemoLiveFeed,
  DemoWizardSteps,
  DemoConfetti,
  DemoToastProvider,
  useDemoToast,
  DemoCommandPalette,
  type PaletteItem,
} from "@/components/demo-shell/wow";
import { demoImages } from "@/lib/demo-images";

const SHOP_PHOTOS = demoImages.shopping.products;

const C = {
  bg: "#fff8f3",
  paper: "#ffffff",
  ink: "#1c0d05",
  muted: "#7a5b4a",
  primary: "#e25a31",
  accentDark: "#b8401d",
  border: "#f3dccb",
};

const palette = {
  bg: C.bg,
  paper: C.paper,
  ink: C.ink,
  muted: C.muted,
  primary: C.primary,
  border: C.border,
};

type Screen =
  | "catalog"
  | "product"
  | "cart"
  | "checkout"
  | "orders"
  | "customers"
  | "analytics"
  | "inventory"
  | "promotions"
  | "settings";

export function ShopDemo() {
  return (
    <DemoToastProvider palette={palette}>
      <ShopInner />
    </DemoToastProvider>
  );
}

function ShopInner() {
  const t = useTranslations("demoPreview.shopping");
  const [screen, setScreen] = useState<Screen>("catalog");
  const toast = useDemoToast();

  const PRODUCTS = [
    { id: 1, name: t("products.coralLinenTote"), price: 48, tag: t("tags.new"), rating: 4.8, img: "linear-gradient(140deg,#ffb89a,#e25a31)" },
    { id: 2, name: t("products.stonewarePourSet"), price: 96, tag: t("tags.best"), rating: 4.9, img: "linear-gradient(140deg,#fef3e6,#d8a679)" },
    { id: 3, name: t("products.cedarWalkingLamp"), price: 138, tag: t("tags.limited"), rating: 4.7, img: "linear-gradient(140deg,#fce0c8,#b46a3e)" },
    { id: 4, name: t("products.oliveQuiltedThrow"), price: 84, tag: "", rating: 4.6, img: "linear-gradient(140deg,#e9d8a6,#8b7a5a)" },
    { id: 5, name: t("products.woolLoaferSand"), price: 162, tag: "", rating: 4.8, img: "linear-gradient(140deg,#f4e0d0,#a07560)" },
    { id: 6, name: t("products.almondMugPair"), price: 38, tag: "", rating: 4.9, img: "linear-gradient(140deg,#fff0e2,#c98e6e)" },
  ];

  const FEATURED = PRODUCTS[2];

  const CART_LINES = [
    { id: 1, name: t("products.coralLinenTote"), price: 48, qty: 1, img: "linear-gradient(140deg,#ffb89a,#e25a31)" },
    { id: 3, name: t("products.cedarWalkingLamp"), price: 138, qty: 2, img: "linear-gradient(140deg,#fce0c8,#b46a3e)" },
    { id: 2, name: t("products.stonewarePourSet"), price: 96, qty: 1, img: "linear-gradient(140deg,#fef3e6,#d8a679)" },
    { id: 6, name: t("products.almondMugPair"), price: 38, qty: 3, img: "linear-gradient(140deg,#fff0e2,#c98e6e)" },
    { id: 5, name: t("products.woolLoaferSand"), price: 162, qty: 1, img: "linear-gradient(140deg,#f4e0d0,#a07560)" },
  ];
  const cartSubtotal = CART_LINES.reduce((s, l) => s + l.price * l.qty, 0);
  const shipping = 12;
  const cartTotal = cartSubtotal + shipping;
  const cartCount = CART_LINES.reduce((s, l) => s + l.qty, 0);

  const SWATCHES = [
    { key: "terracotta", color: "#c8623c" },
    { key: "ivory", color: "#f1e5d3" },
    { key: "olive", color: "#7a7a44" },
    { key: "midnight", color: "#26303d" },
  ];

  const ORDERS: { id: string; customerKey: string; total: number; status: "paid" | "shipped" | "delivered" | "refunded" }[] = [
    { id: "MM-4821", customerKey: "ordersList.customer1", total: 184, status: "delivered" },
    { id: "MM-4820", customerKey: "ordersList.customer2", total: 96, status: "shipped" },
    { id: "MM-4819", customerKey: "ordersList.customer3", total: 348, status: "paid" },
    { id: "MM-4818", customerKey: "ordersList.customer4", total: 72, status: "refunded" },
    { id: "MM-4817", customerKey: "ordersList.customer5", total: 222, status: "delivered" },
    { id: "MM-4816", customerKey: "ordersList.customer6", total: 138, status: "shipped" },
    { id: "MM-4815", customerKey: "ordersList.customer7", total: 48, status: "paid" },
    { id: "MM-4814", customerKey: "ordersList.customer8", total: 416, status: "delivered" },
    { id: "MM-4813", customerKey: "ordersList.customer9", total: 84, status: "refunded" },
    { id: "MM-4812", customerKey: "ordersList.customer10", total: 162, status: "delivered" },
  ];

  type OrderStatus = "paid" | "shipped" | "delivered" | "refunded";
  const statusVariant = (s: OrderStatus): "success" | "info" | "warn" | "danger" => {
    if (s === "delivered") return "success";
    if (s === "shipped") return "info";
    if (s === "paid") return "warn";
    return "danger";
  };
  const statusLabel = (s: OrderStatus) => t(`status.${s}`);

  const NAV: { key: Screen; label: string; Icon: typeof ShoppingBagIcon; group: "storefront" | "admin" }[] = [
    { key: "catalog", label: t("tabs.catalog"), Icon: ShoppingBagIcon, group: "storefront" },
    { key: "product", label: t("tabs.product"), Icon: CubeIcon, group: "storefront" },
    { key: "cart", label: t("tabs.cart"), Icon: ShoppingCartIcon, group: "storefront" },
    { key: "checkout", label: t("tabs.checkout"), Icon: CreditCardIcon, group: "storefront" },
    { key: "orders", label: t("tabs.orders"), Icon: ClipboardDocumentListIcon, group: "admin" },
    { key: "customers", label: t("tabs.customers"), Icon: UsersIcon, group: "admin" },
    { key: "analytics", label: t("tabs.analytics"), Icon: ChartBarIcon, group: "admin" },
    { key: "inventory", label: t("tabs.inventory"), Icon: ArchiveBoxIcon, group: "admin" },
    { key: "promotions", label: t("tabs.promotions"), Icon: TagIcon, group: "admin" },
    { key: "settings", label: t("tabs.settings"), Icon: Cog6ToothIcon, group: "admin" },
  ];

  const breadcrumb = t(`shell.breadcrumb.${screen}`);
  const screenEyebrow = t(`shell.screen.${screen}.eyebrow`);
  const screenTitle = t(`shell.screen.${screen}.title`);
  const screenSubtitle = t(`shell.screen.${screen}.subtitle`);

  const KPIS: Record<Screen, { label: string; value: string; trend: string; spark: number[] }[]> = {
    catalog: [
      { label: t("shell.kpi.catalog.productsLive.label"), value: t("shell.kpi.catalog.productsLive.value"), trend: t("shell.kpi.catalog.productsLive.trend"), spark: [42, 48, 46, 52, 58, 56, 62, 64] },
      { label: t("shell.kpi.catalog.topCategory.label"), value: t("shell.kpi.catalog.topCategory.value"), trend: t("shell.kpi.catalog.topCategory.trend"), spark: [22, 28, 26, 34, 30, 38, 42, 46] },
      { label: t("shell.kpi.catalog.avgPrice.label"), value: t("shell.kpi.catalog.avgPrice.value"), trend: t("shell.kpi.catalog.avgPrice.trend"), spark: [78, 82, 80, 86, 84, 88, 90, 94] },
      { label: t("shell.kpi.catalog.lowStock.label"), value: t("shell.kpi.catalog.lowStock.value"), trend: t("shell.kpi.catalog.lowStock.trend"), spark: [18, 16, 14, 12, 14, 10, 9, 8] },
    ],
    product: [
      { label: t("shell.kpi.product.viewsToday.label"), value: t("shell.kpi.product.viewsToday.value"), trend: t("shell.kpi.product.viewsToday.trend"), spark: [120, 140, 160, 180, 220, 240, 260, 290] },
      { label: t("shell.kpi.product.conversion.label"), value: t("shell.kpi.product.conversion.value"), trend: t("shell.kpi.product.conversion.trend"), spark: [22, 24, 26, 28, 30, 32, 34, 36] },
      { label: t("shell.kpi.product.returnsRate.label"), value: t("shell.kpi.product.returnsRate.value"), trend: t("shell.kpi.product.returnsRate.trend"), spark: [12, 10, 11, 9, 8, 7, 7, 6] },
      { label: t("shell.kpi.product.avgRating.label"), value: t("shell.kpi.product.avgRating.value"), trend: t("shell.kpi.product.avgRating.trend"), spark: [46, 47, 47, 48, 48, 49, 49, 49] },
    ],
    cart: [
      { label: t("shell.kpi.cart.cartValue.label"), value: t("shell.kpi.cart.cartValue.value"), trend: t("shell.kpi.cart.cartValue.trend"), spark: [320, 360, 340, 410, 460, 480, 520, 560] },
      { label: t("shell.kpi.cart.itemsInCart.label"), value: t("shell.kpi.cart.itemsInCart.value"), trend: t("shell.kpi.cart.itemsInCart.trend"), spark: [4, 6, 5, 7, 8, 7, 8, 8] },
      { label: t("shell.kpi.cart.abandonment.label"), value: t("shell.kpi.cart.abandonment.value"), trend: t("shell.kpi.cart.abandonment.trend"), spark: [62, 58, 56, 54, 52, 50, 48, 46] },
      { label: t("shell.kpi.cart.recovery.label"), value: t("shell.kpi.cart.recovery.value"), trend: t("shell.kpi.cart.recovery.trend"), spark: [10, 14, 16, 18, 20, 22, 24, 28] },
    ],
    checkout: [
      { label: t("shell.kpi.checkout.avgCheckoutTime.label"), value: t("shell.kpi.checkout.avgCheckoutTime.value"), trend: t("shell.kpi.checkout.avgCheckoutTime.trend"), spark: [180, 170, 160, 155, 150, 142, 138, 132] },
      { label: t("shell.kpi.checkout.successRate.label"), value: t("shell.kpi.checkout.successRate.value"), trend: t("shell.kpi.checkout.successRate.trend"), spark: [88, 89, 90, 91, 92, 93, 94, 95] },
      { label: t("shell.kpi.checkout.dropoffStep.label"), value: t("shell.kpi.checkout.dropoffStep.value"), trend: t("shell.kpi.checkout.dropoffStep.trend"), spark: [24, 22, 20, 18, 17, 15, 14, 12] },
      { label: t("shell.kpi.checkout.applePayShare.label"), value: t("shell.kpi.checkout.applePayShare.value"), trend: t("shell.kpi.checkout.applePayShare.trend"), spark: [28, 32, 36, 38, 42, 46, 48, 52] },
    ],
    orders: [
      { label: t("shell.kpi.orders.ordersToday.label"), value: t("shell.kpi.orders.ordersToday.value"), trend: t("shell.kpi.orders.ordersToday.trend"), spark: [38, 42, 46, 50, 48, 54, 58, 62] },
      { label: t("shell.kpi.orders.revenueToday.label"), value: t("shell.kpi.orders.revenueToday.value"), trend: t("shell.kpi.orders.revenueToday.trend"), spark: [3200, 3600, 3400, 4200, 4600, 4800, 5200, 5400] },
      { label: t("shell.kpi.orders.avgOrder.label"), value: t("shell.kpi.orders.avgOrder.value"), trend: t("shell.kpi.orders.avgOrder.trend"), spark: [120, 124, 128, 132, 130, 136, 140, 142] },
      { label: t("shell.kpi.orders.fulfillment.label"), value: t("shell.kpi.orders.fulfillment.value"), trend: t("shell.kpi.orders.fulfillment.trend"), spark: [48, 44, 42, 40, 38, 36, 34, 32] },
    ],
    customers: [
      { label: t("shell.kpi.customers.totalActive.label"), value: t("shell.kpi.customers.totalActive.value"), trend: t("shell.kpi.customers.totalActive.trend"), spark: [240, 260, 280, 320, 360, 400, 440, 480] },
      { label: t("shell.kpi.customers.newThisMonth.label"), value: t("shell.kpi.customers.newThisMonth.value"), trend: t("shell.kpi.customers.newThisMonth.trend"), spark: [12, 18, 24, 30, 36, 42, 48, 56] },
      { label: t("shell.kpi.customers.avgLtv.label"), value: t("shell.kpi.customers.avgLtv.value"), trend: t("shell.kpi.customers.avgLtv.trend"), spark: [220, 240, 260, 280, 300, 320, 340, 360] },
      { label: t("shell.kpi.customers.churn.label"), value: t("shell.kpi.customers.churn.value"), trend: t("shell.kpi.customers.churn.trend"), spark: [8, 7, 7, 6, 6, 5, 5, 4] },
    ],
    analytics: [
      { label: t("shell.kpi.analytics.revenue30d.label"), value: t("shell.kpi.analytics.revenue30d.value"), trend: t("shell.kpi.analytics.revenue30d.trend"), spark: [12000, 13000, 14000, 16000, 18000, 19000, 21000, 24000] },
      { label: t("shell.kpi.analytics.orders30d.label"), value: t("shell.kpi.analytics.orders30d.value"), trend: t("shell.kpi.analytics.orders30d.trend"), spark: [80, 92, 110, 124, 138, 152, 168, 184] },
      { label: t("shell.kpi.analytics.conversion.label"), value: t("shell.kpi.analytics.conversion.value"), trend: t("shell.kpi.analytics.conversion.trend"), spark: [22, 24, 26, 28, 30, 32, 34, 36] },
      { label: t("shell.kpi.analytics.repeatRate.label"), value: t("shell.kpi.analytics.repeatRate.value"), trend: t("shell.kpi.analytics.repeatRate.trend"), spark: [32, 34, 36, 38, 40, 42, 44, 46] },
    ],
    inventory: [
      { label: t("shell.kpi.inventory.skusTotal.label"), value: t("shell.kpi.inventory.skusTotal.value"), trend: t("shell.kpi.inventory.skusTotal.trend"), spark: [220, 224, 228, 230, 232, 234, 236, 240] },
      { label: t("shell.kpi.inventory.unitsOnHand.label"), value: t("shell.kpi.inventory.unitsOnHand.value"), trend: t("shell.kpi.inventory.unitsOnHand.trend"), spark: [12400, 12200, 12100, 11900, 11700, 11500, 11400, 11200] },
      { label: t("shell.kpi.inventory.lowStock.label"), value: t("shell.kpi.inventory.lowStock.value"), trend: t("shell.kpi.inventory.lowStock.trend"), spark: [4, 6, 8, 10, 12, 11, 9, 8] },
      { label: t("shell.kpi.inventory.deadStock.label"), value: t("shell.kpi.inventory.deadStock.value"), trend: t("shell.kpi.inventory.deadStock.trend"), spark: [18, 17, 16, 15, 14, 13, 12, 11] },
    ],
    promotions: [
      { label: t("shell.kpi.promotions.activeCampaigns.label"), value: t("shell.kpi.promotions.activeCampaigns.value"), trend: t("shell.kpi.promotions.activeCampaigns.trend"), spark: [3, 4, 5, 5, 6, 6, 7, 7] },
      { label: t("shell.kpi.promotions.couponsUsed.label"), value: t("shell.kpi.promotions.couponsUsed.value"), trend: t("shell.kpi.promotions.couponsUsed.trend"), spark: [120, 160, 200, 240, 280, 320, 360, 420] },
      { label: t("shell.kpi.promotions.discountSpend.label"), value: t("shell.kpi.promotions.discountSpend.value"), trend: t("shell.kpi.promotions.discountSpend.trend"), spark: [800, 920, 1100, 1240, 1380, 1480, 1620, 1820] },
      { label: t("shell.kpi.promotions.roi.label"), value: t("shell.kpi.promotions.roi.value"), trend: t("shell.kpi.promotions.roi.trend"), spark: [180, 200, 220, 240, 260, 280, 300, 320] },
    ],
    settings: [
      { label: t("shell.kpi.settings.uptime.label"), value: t("shell.kpi.settings.uptime.value"), trend: t("shell.kpi.settings.uptime.trend"), spark: [99, 99, 99, 100, 99, 100, 100, 100] },
      { label: t("shell.kpi.settings.integrations.label"), value: t("shell.kpi.settings.integrations.value"), trend: t("shell.kpi.settings.integrations.trend"), spark: [4, 5, 6, 6, 7, 7, 8, 8] },
      { label: t("shell.kpi.settings.teamSeats.label"), value: t("shell.kpi.settings.teamSeats.value"), trend: t("shell.kpi.settings.teamSeats.trend"), spark: [3, 4, 4, 5, 5, 6, 6, 6] },
      { label: t("shell.kpi.settings.apiCalls.label"), value: t("shell.kpi.settings.apiCalls.value"), trend: t("shell.kpi.settings.apiCalls.trend"), spark: [1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600] },
    ],
  };

  const brandMark = (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        background: C.primary,
        display: "grid",
        placeItems: "center",
      }}
    >
      <ShoppingBagIcon style={{ width: 18, height: 18, color: "white" }} />
    </div>
  );

  const paletteItems: PaletteItem[] = NAV.map((n) => ({
    id: n.key,
    label: n.label,
    hint: n.group === "storefront" ? "→" : "⌥",
    group: n.group === "storefront" ? t("nav.groups.storefront") : t("nav.groups.admin"),
    onRun: () => {
      setScreen(n.key);
      toast.push({ title: t("toast.navigated", { screen: n.label }) });
    },
  }));

  return (
    <div style={{ background: C.bg, color: C.ink, fontFamily: "ui-sans-serif, system-ui", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <DemoTopBar
        palette={palette}
        brandName={t("brand")}
        brandMark={brandMark}
        breadcrumb={breadcrumb}
        searchPlaceholder={t("search.placeholder")}
        userName={t("shell.user.name")}
        userInitials={t("shell.user.initials")}
        rightSlot={
          <>
            <DemoCommandPalette
              palette={palette}
              items={paletteItems}
              placeholder={t("commandPalette.placeholder")}
              hint="⌘K"
            />
            <button
              onClick={() => setScreen("cart")}
              style={{
                position: "relative",
                padding: 8,
                borderRadius: 8,
                border: `1px solid ${C.border}`,
                background: C.paper,
                cursor: "pointer",
                display: "grid",
                placeItems: "center",
                width: 32,
                height: 32,
                color: C.muted,
              }}
              aria-label={t("aria.cart")}
            >
              <ShoppingBagIcon style={{ width: 14, height: 14 }} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -3,
                    right: -3,
                    background: C.primary,
                    color: "white",
                    fontSize: 9,
                    fontWeight: 700,
                    borderRadius: 9999,
                    minWidth: 14,
                    height: 14,
                    display: "grid",
                    placeItems: "center",
                    padding: "0 4px",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", flex: 1, minHeight: 0 }}>
        {/* SIDEBAR */}
        <aside
          style={{
            background: C.paper,
            borderRight: `1px solid ${C.border}`,
            padding: "18px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          {(["storefront", "admin"] as const).map((group) => (
            <div key={group}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  color: C.muted,
                  padding: "0 10px 8px",
                }}
              >
                {t(`nav.groups.${group}`)}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {NAV.filter((n) => n.group === group).map((n) => {
                  const active = screen === n.key;
                  const Icon = n.Icon;
                  return (
                    <button
                      key={n.key}
                      onClick={() => setScreen(n.key)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "8px 10px",
                        borderRadius: 8,
                        border: "none",
                        background: active ? C.primary : "transparent",
                        color: active ? "white" : C.ink,
                        fontSize: 13,
                        fontWeight: active ? 700 : 500,
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "background 160ms ease",
                      }}
                    >
                      <Icon style={{ width: 14, height: 14, color: active ? "white" : C.muted }} />
                      {n.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </aside>

        <div style={{ flex: 1, minWidth: 0 }}>
          {screen === "catalog" && (
            <section style={{ padding: "28px 28px 80px", maxWidth: 1280, margin: "0 auto" }}>
              <DemoScreenHeader
                palette={palette}
                eyebrow={screenEyebrow}
                title={screenTitle}
                subtitle={screenSubtitle}
              />
              <DemoKpiStrip palette={palette} items={KPIS.catalog} />

              {/* HERO */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1fr",
                  gap: 32,
                  alignItems: "center",
                  padding: "12px 0 36px",
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: 11,
                      letterSpacing: 3,
                      textTransform: "uppercase",
                      color: C.primary,
                      fontWeight: 700,
                    }}
                  >
                    {t("hero.eyebrow")}
                  </span>
                  <h2
                    style={{
                      fontFamily: "Georgia, serif",
                      fontSize: 44,
                      lineHeight: 1.05,
                      margin: "12px 0",
                      maxWidth: 480,
                    }}
                  >
                    {t("hero.title")}
                  </h2>
                  <p style={{ color: C.muted, maxWidth: 460, lineHeight: 1.6 }}>
                    {t("hero.description")}
                  </p>
                  <button
                    onClick={() => {
                      setScreen("product");
                      toast.push({ title: t("toast.viewingProduct"), tone: "info" });
                    }}
                    style={{
                      marginTop: 24,
                      padding: "12px 22px",
                      background: C.primary,
                      color: "white",
                      border: "none",
                      borderRadius: 9999,
                      fontWeight: 600,
                      fontSize: 14,
                      cursor: "pointer",
                    }}
                  >
                    {t("hero.cta")}
                  </button>
                </div>
                <div
                  style={{
                    aspectRatio: "5/4",
                    borderRadius: 24,
                    background: "linear-gradient(135deg,#ffb89a,#e25a31 80%)",
                    display: "grid",
                    placeItems: "center",
                    color: "white",
                    fontSize: 40,
                    fontFamily: "Georgia, serif",
                    fontWeight: 700,
                    letterSpacing: -1,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={demoImages.shopping.hero}
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
                      background: "linear-gradient(135deg,rgba(255,184,154,0.55),rgba(226,90,49,0.55) 80%)",
                      mixBlendMode: "multiply",
                    }}
                  />
                  <span style={{ position: "relative", zIndex: 1 }}>✿</span>
                </div>
              </div>

              {/* GRID */}
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 18 }}>
                <h3 style={{ fontFamily: "Georgia, serif", fontSize: 22 }}>{t("grid.title")}</h3>
                <span style={{ color: C.muted, fontSize: 12 }}>{t("grid.showing")}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
                {PRODUCTS.map((p, idx) => (
                  <article
                    key={p.id}
                    style={{
                      background: C.paper,
                      border: `1px solid ${C.border}`,
                      borderRadius: 16,
                      overflow: "hidden",
                      transition: "transform 200ms ease, box-shadow 200ms ease",
                    }}
                  >
                    <div style={{ aspectRatio: "1/1", background: p.img, position: "relative", overflow: "hidden" }}>
                      <img
                        src={SHOP_PHOTOS[idx % SHOP_PHOTOS.length]}
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
                          background: p.img,
                          mixBlendMode: "multiply",
                          opacity: 0.35,
                        }}
                      />
                      {p.tag && (
                        <span
                          style={{
                            position: "absolute",
                            top: 12,
                            left: 12,
                            background: C.paper,
                            padding: "4px 10px",
                            borderRadius: 9999,
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: 1,
                            textTransform: "uppercase",
                            color: C.accentDark,
                          }}
                        >
                          {p.tag}
                        </span>
                      )}
                      <button
                        style={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          background: "rgba(255,255,255,0.85)",
                          border: "none",
                          borderRadius: 9999,
                          width: 32,
                          height: 32,
                          display: "grid",
                          placeItems: "center",
                          cursor: "pointer",
                        }}
                        aria-label={t("aria.save")}
                        onClick={() => toast.push({ title: t("toast.savedToWishlist", { name: p.name }), tone: "success" })}
                      >
                        <HeartIcon style={{ width: 14, height: 14, color: C.accentDark }} />
                      </button>
                    </div>
                    <div style={{ padding: 14 }}>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4, color: C.muted, fontSize: 12 }}>
                        <StarIcon style={{ width: 12, height: 12, fill: "#f5b400", color: "#f5b400" }} />
                        {p.rating} · {t("product.inStock")}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                        <span style={{ fontWeight: 700, fontSize: 15 }}>${p.price}</span>
                        <button
                          onClick={() => {
                            setScreen("product");
                            toast.push({ title: t("toast.added", { name: p.name }), tone: "success" });
                          }}
                          style={{
                            padding: "6px 14px",
                            background: C.ink,
                            color: "white",
                            border: "none",
                            borderRadius: 9999,
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          {t("product.add")}
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {screen === "product" && (
            <section style={{ padding: "28px 28px 80px", maxWidth: 1280, margin: "0 auto" }}>
              <DemoScreenHeader palette={palette} eyebrow={screenEyebrow} title={screenTitle} subtitle={screenSubtitle} />
              <DemoKpiStrip palette={palette} items={KPIS.product} />
              <button
                onClick={() => setScreen("catalog")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 12px",
                  background: "transparent",
                  border: `1px solid ${C.border}`,
                  borderRadius: 9999,
                  color: C.muted,
                  fontSize: 12,
                  cursor: "pointer",
                  marginBottom: 24,
                }}
              >
                <ArrowLeftIcon style={{ width: 12, height: 12 }} />
                {t("product.back")}
              </button>
              <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 40, alignItems: "flex-start" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ aspectRatio: "1/1", borderRadius: 20, background: FEATURED.img, border: `1px solid ${C.border}`, position: "relative", overflow: "hidden" }}>
                    <img
                      src={SHOP_PHOTOS[2 % SHOP_PHOTOS.length]}
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
                        background: FEATURED.img,
                        mixBlendMode: "multiply",
                        opacity: 0.3,
                      }}
                    />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                    {PRODUCTS.slice(0, 4).map((p, idx) => (
                      <div key={p.id} style={{ aspectRatio: "1/1", borderRadius: 12, background: p.img, border: `1px solid ${C.border}`, position: "relative", overflow: "hidden" }}>
                        <img
                          src={SHOP_PHOTOS[idx % SHOP_PHOTOS.length]}
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
                            background: p.img,
                            mixBlendMode: "multiply",
                            opacity: 0.35,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: C.primary, fontWeight: 700 }}>{t("product.eyebrow")}</span>
                  <h2 style={{ fontFamily: "Georgia, serif", fontSize: 36, lineHeight: 1.1, margin: "10px 0" }}>{FEATURED.name}</h2>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, color: C.muted, fontSize: 13 }}>
                    <StarIcon style={{ width: 14, height: 14, fill: "#f5b400", color: "#f5b400" }} />
                    {FEATURED.rating} · {t("product.reviewsCount")}
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 14 }}>
                    <span style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 700 }}>${FEATURED.price}</span>
                    <span style={{ color: C.muted, fontSize: 13 }}>{t("product.shippingNote")}</span>
                  </div>
                  <p style={{ color: C.muted, marginTop: 18, lineHeight: 1.65, fontSize: 14 }}>{t("product.description")}</p>

                  <div style={{ marginTop: 24 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: C.muted, marginBottom: 10 }}>{t("product.colorLabel")}</div>
                    <div style={{ display: "flex", gap: 10 }}>
                      {SWATCHES.map((s, i) => (
                        <button
                          key={s.key}
                          aria-label={t(`product.swatches.${s.key}`)}
                          style={{
                            width: 36, height: 36, borderRadius: 9999, background: s.color,
                            border: i === 0 ? `2px solid ${C.ink}` : `2px solid ${C.border}`,
                            cursor: "pointer",
                          }}
                        />
                      ))}
                    </div>
                    <div style={{ marginTop: 8, fontSize: 12, color: C.muted }}>
                      {t("product.selectedColor")}: <span style={{ color: C.ink, fontWeight: 600 }}>{t("product.swatches.terracotta")}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
                    <button
                      onClick={() => {
                        setScreen("cart");
                        toast.push({ title: t("toast.added", { name: FEATURED.name }), tone: "success" });
                      }}
                      style={{
                        flex: 1, padding: "14px 22px", background: C.primary, color: "white",
                        border: "none", borderRadius: 9999, fontWeight: 700, fontSize: 14, cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      }}
                    >
                      <ShoppingCartIcon style={{ width: 16, height: 16 }} />
                      {t("product.addToCart")}
                    </button>
                    <button
                      aria-label={t("aria.save")}
                      style={{
                        padding: "0 16px", background: C.paper, color: C.ink,
                        border: `1px solid ${C.border}`, borderRadius: 9999, cursor: "pointer",
                      }}
                    >
                      <HeartIcon style={{ width: 16, height: 16 }} />
                    </button>
                  </div>

                  <ul style={{ listStyle: "none", padding: 0, margin: "28px 0 0", color: C.muted, fontSize: 13, lineHeight: 1.9 }}>
                    <li>· {t("product.bullets.material")}</li>
                    <li>· {t("product.bullets.origin")}</li>
                    <li>· {t("product.bullets.care")}</li>
                  </ul>
                </div>
              </div>
            </section>
          )}

          {screen === "cart" && (
            <section style={{ padding: "28px 28px 80px", maxWidth: 1100, margin: "0 auto" }}>
              <DemoScreenHeader palette={palette} eyebrow={screenEyebrow} title={screenTitle} subtitle={screenSubtitle} />
              <DemoKpiStrip palette={palette} items={KPIS.cart} />
              <p style={{ color: C.muted, fontSize: 14, margin: "0 0 24px" }}>{t("cartPage.itemsCount", { count: cartCount })}</p>
              <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead style={{ background: C.bg }}>
                    <tr>
                      {(["item", "qty", "price", "lineTotal"] as const).map((c, i) => (
                        <th key={c} style={{ textAlign: i === 0 ? "left" : i === 1 ? "center" : "right", padding: "14px 18px", fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: "uppercase", fontSize: 11 }}>
                          {t(`cartPage.col.${c}`)}
                        </th>
                      ))}
                      <th style={{ width: 40 }} />
                    </tr>
                  </thead>
                  <tbody>
                    {CART_LINES.map((line, idx) => (
                      <tr key={line.id} style={{ borderTop: `1px solid ${C.border}` }}>
                        <td style={{ padding: "14px 18px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{ width: 48, height: 48, borderRadius: 10, background: line.img, position: "relative", overflow: "hidden" }}>
                              <img
                                src={SHOP_PHOTOS[idx % SHOP_PHOTOS.length]}
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
                                  background: line.img,
                                  mixBlendMode: "multiply",
                                  opacity: 0.35,
                                }}
                              />
                            </div>
                            <div>
                              <div style={{ fontWeight: 600 }}>{line.name}</div>
                              <div style={{ color: C.muted, fontSize: 12 }}>{t("cartPage.skuPrefix")} #{line.id.toString().padStart(4, "0")}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: "14px 18px", textAlign: "center" }}>
                          <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                            <button aria-label={t("aria.decrease")} style={{ width: 24, height: 24, display: "grid", placeItems: "center", borderRadius: 6, border: `1px solid ${C.border}`, background: C.paper, cursor: "pointer" }}>
                              <MinusIcon style={{ width: 12, height: 12 }} />
                            </button>
                            <span style={{ minWidth: 18, textAlign: "center", fontWeight: 600 }}>{line.qty}</span>
                            <button aria-label={t("aria.increase")} style={{ width: 24, height: 24, display: "grid", placeItems: "center", borderRadius: 6, border: `1px solid ${C.border}`, background: C.paper, cursor: "pointer" }}>
                              <PlusIcon style={{ width: 12, height: 12 }} />
                            </button>
                          </div>
                        </td>
                        <td style={{ padding: "14px 18px", textAlign: "right" }}>${line.price}</td>
                        <td style={{ padding: "14px 18px", textAlign: "right", fontWeight: 700 }}>${line.price * line.qty}</td>
                        <td style={{ padding: "14px 18px", textAlign: "right" }}>
                          <button aria-label={t("aria.remove")} style={{ background: "transparent", border: "none", cursor: "pointer", color: C.muted }}>
                            <XMarkIcon style={{ width: 14, height: 14 }} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 360px", gap: 24, alignItems: "start" }}>
                <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 16, padding: 18, fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
                  <div style={{ fontWeight: 700, color: C.ink, marginBottom: 6 }}>{t("cartPage.promoTitle")}</div>
                  {t("cartPage.promoNote")}
                </div>
                <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 16, padding: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 13 }}>
                    <span style={{ color: C.muted }}>{t("cartPage.subtotal")}</span>
                    <span style={{ fontWeight: 600 }}>${cartSubtotal}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 13 }}>
                    <span style={{ color: C.muted }}>{t("cartPage.shipping")}</span>
                    <span style={{ fontWeight: 600 }}>${shipping}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, paddingTop: 14, borderTop: `1px solid ${C.border}`, fontSize: 15 }}>
                    <span style={{ fontWeight: 700 }}>{t("cartPage.total")}</span>
                    <span style={{ fontWeight: 700 }}>${cartTotal}</span>
                  </div>
                  <button
                    onClick={() => setScreen("checkout")}
                    style={{
                      width: "100%", marginTop: 18, padding: 14, background: C.primary, color: "white",
                      border: "none", borderRadius: 9999, fontWeight: 700, fontSize: 14, cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    }}
                  >
                    <CreditCardIcon style={{ width: 16, height: 16 }} />
                    {t("cartPage.checkout")}
                  </button>
                </div>
              </div>
            </section>
          )}

          {screen === "checkout" && <CheckoutScreen t={t} cartTotal={cartTotal} cartSubtotal={cartSubtotal} shipping={shipping} kpis={KPIS.checkout} screenEyebrow={screenEyebrow} screenTitle={screenTitle} screenSubtitle={screenSubtitle} toast={toast} />}
          {screen === "orders" && <OrdersScreen t={t} orders={ORDERS} kpis={KPIS.orders} statusVariant={statusVariant} statusLabel={statusLabel} screenEyebrow={screenEyebrow} screenTitle={screenTitle} screenSubtitle={screenSubtitle} />}
          {screen === "customers" && <CustomersScreen t={t} kpis={KPIS.customers} screenEyebrow={screenEyebrow} screenTitle={screenTitle} screenSubtitle={screenSubtitle} toast={toast} />}
          {screen === "analytics" && <AnalyticsScreen t={t} kpis={KPIS.analytics} screenEyebrow={screenEyebrow} screenTitle={screenTitle} screenSubtitle={screenSubtitle} />}
          {screen === "inventory" && <InventoryScreen t={t} kpis={KPIS.inventory} products={PRODUCTS} screenEyebrow={screenEyebrow} screenTitle={screenTitle} screenSubtitle={screenSubtitle} toast={toast} />}
          {screen === "promotions" && <PromotionsScreen t={t} kpis={KPIS.promotions} screenEyebrow={screenEyebrow} screenTitle={screenTitle} screenSubtitle={screenSubtitle} toast={toast} />}
          {screen === "settings" && <SettingsScreen t={t} kpis={KPIS.settings} screenEyebrow={screenEyebrow} screenTitle={screenTitle} screenSubtitle={screenSubtitle} toast={toast} />}
        </div>
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

/* ─────────────────────── CHECKOUT (wizard + confetti) ─────────────────────── */

type TFn = ReturnType<typeof useTranslations>;
type KpiItem = { label: string; value: string; trend: string; spark: number[] };
type ToastApi = ReturnType<typeof useDemoToast>;

function CheckoutScreen({
  t, cartTotal, cartSubtotal, shipping, kpis, screenEyebrow, screenTitle, screenSubtitle, toast,
}: {
  t: TFn; cartTotal: number; cartSubtotal: number; shipping: number; kpis: KpiItem[];
  screenEyebrow: string; screenTitle: string; screenSubtitle: string; toast: ToastApi;
}) {
  const [step, setStep] = useState(0);
  const steps = [t("checkout.steps.shipping"), t("checkout.steps.payment"), t("checkout.steps.review"), t("checkout.steps.done")];
  const tax = Math.round(cartSubtotal * 0.07);
  const grand = cartTotal + tax;

  return (
    <section style={{ position: "relative", padding: "28px 28px 80px", maxWidth: 1100, margin: "0 auto" }}>
      <DemoScreenHeader palette={palette} eyebrow={screenEyebrow} title={screenTitle} subtitle={screenSubtitle} />
      <DemoKpiStrip palette={palette} items={kpis} />

      <DemoWizardSteps palette={palette} steps={steps} current={step} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, alignItems: "start" }}>
        <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24 }}>
          {step === 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Field t={t} label="checkout.fields.fullName" placeholderKey="checkout.placeholders.fullName" />
              <Field t={t} label="checkout.fields.email" placeholderKey="checkout.placeholders.email" />
              <div style={{ gridColumn: "1 / -1" }}>
                <Field t={t} label="checkout.fields.address" placeholderKey="checkout.placeholders.address" />
              </div>
              <Field t={t} label="checkout.fields.city" placeholderKey="checkout.placeholders.city" />
              <Field t={t} label="checkout.fields.postalCode" placeholderKey="checkout.placeholders.postalCode" />
            </div>
          )}
          {step === 1 && (
            <div style={{ display: "grid", gap: 14 }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {(["card", "applePay", "paypal", "klarna"] as const).map((m) => (
                  <span key={m} style={{ padding: "10px 16px", borderRadius: 10, border: `2px solid ${m === "card" ? C.primary : C.border}`, background: m === "card" ? "#fff4ee" : C.paper, fontWeight: 600, fontSize: 13 }}>
                    {t(`checkout.methods.${m}`)}
                  </span>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 100px", gap: 14 }}>
                <div style={{ gridColumn: "1 / -1" }}>
                  <Field t={t} label="checkout.fields.cardNumber" placeholderKey="checkout.placeholders.cardNumber" />
                </div>
                <Field t={t} label="checkout.fields.cardName" placeholderKey="checkout.placeholders.cardName" />
                <Field t={t} label="checkout.fields.cardExpiry" placeholderKey="checkout.placeholders.cardExpiry" />
                <Field t={t} label="checkout.fields.cardCvc" placeholderKey="checkout.placeholders.cardCvc" />
              </div>
            </div>
          )}
          {step === 2 && (
            <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.8 }}>
              <h4 style={{ fontFamily: "Georgia, serif", fontSize: 18, color: C.ink, margin: "0 0 12px" }}>{t("checkout.reviewTitle")}</h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 8 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: C.muted, marginBottom: 4 }}>{t("checkout.shipTo")}</div>
                  <div style={{ color: C.ink, fontWeight: 600 }}>Aigerim Yusupova</div>
                  <div>17 Rudaki Ave · Dushanbe · 734001</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: C.muted, marginBottom: 4 }}>{t("checkout.payWith")}</div>
                  <div style={{ color: C.ink, fontWeight: 600 }}>Visa · 4242</div>
                  <div>{t("checkout.payerNote")}</div>
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div style={{ textAlign: "center", padding: "20px 0 12px" }}>
              <div style={{ width: 64, height: 64, borderRadius: 9999, background: "#dcfce7", display: "grid", placeItems: "center", margin: "0 auto 16px" }}>
                <CheckBadgeIcon style={{ width: 32, height: 32, color: "#16a34a" }} />
              </div>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: 28, margin: 0 }}>{t("checkout.successTitle")}</h3>
              <p style={{ color: C.muted, marginTop: 8 }}>{t("checkout.successSubtitle", { id: "MM-4822" })}</p>
              <div style={{ marginTop: 18, fontFamily: "ui-monospace, monospace", fontSize: 12, color: C.muted }}>
                {t("checkout.estDelivery")}: <span style={{ color: C.ink, fontWeight: 700 }}>Mon, May 27</span>
              </div>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0 || step === 3}
              style={{ padding: "10px 18px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 9999, color: C.ink, fontWeight: 600, fontSize: 13, cursor: step === 0 || step === 3 ? "not-allowed" : "pointer", opacity: step === 0 || step === 3 ? 0.5 : 1 }}
            >
              ← {t("checkout.back")}
            </button>
            <button
              onClick={() => {
                if (step === 2) {
                  toast.push({ title: t("toast.paymentCaptured"), tone: "success" });
                }
                if (step === 3) {
                  setStep(0);
                  return;
                }
                setStep((s) => Math.min(steps.length - 1, s + 1));
              }}
              style={{ padding: "10px 18px", background: C.primary, color: "white", border: "none", borderRadius: 9999, fontWeight: 700, fontSize: 13, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              {step === 2 ? t("checkout.placeOrder") : step === 3 ? t("checkout.startAnother") : t("checkout.next")}
              <ArrowRightIcon style={{ width: 12, height: 12 }} />
            </button>
          </div>
        </div>

        <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: C.muted, marginBottom: 12 }}>{t("checkout.summaryTitle")}</div>
          <Row label={t("cartPage.subtotal")} value={`$${cartSubtotal}`} />
          <Row label={t("cartPage.shipping")} value={`$${shipping}`} />
          <Row label={t("checkout.tax")} value={`$${tax}`} />
          <div style={{ height: 1, background: C.border, margin: "10px 0" }} />
          <Row label={t("cartPage.total")} value={`$${grand}`} bold />
          <div style={{ marginTop: 14, padding: "10px 12px", background: "#fff4ee", borderRadius: 10, fontSize: 11, color: C.accentDark, fontWeight: 600 }}>
            ⚡ {t("checkout.fastPickHint")}
          </div>
        </div>
      </div>

      <DemoConfetti palette={palette} show={step === 3} count={80} />
    </section>
  );
}

function Field({ t, label, placeholderKey }: { t: TFn; label: string; placeholderKey: string }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: C.muted, marginBottom: 6 }}>{t(label)}</label>
      <input
        placeholder={t(placeholderKey)}
        style={{ width: "100%", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", fontSize: 13, color: C.ink, outline: "none", boxSizing: "border-box" }}
      />
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: bold ? 15 : 13, marginBottom: 6 }}>
      <span style={{ color: bold ? C.ink : C.muted, fontWeight: bold ? 700 : 500 }}>{label}</span>
      <span style={{ fontWeight: bold ? 700 : 600, color: C.ink }}>{value}</span>
    </div>
  );
}

/* ─────────────────────── ORDERS ─────────────────────── */

function OrdersScreen({
  t, orders, kpis, statusVariant, statusLabel, screenEyebrow, screenTitle, screenSubtitle,
}: {
  t: TFn;
  orders: { id: string; customerKey: string; total: number; status: "paid" | "shipped" | "delivered" | "refunded" }[];
  kpis: KpiItem[];
  statusVariant: (s: "paid" | "shipped" | "delivered" | "refunded") => "success" | "info" | "warn" | "danger";
  statusLabel: (s: "paid" | "shipped" | "delivered" | "refunded") => string;
  screenEyebrow: string; screenTitle: string; screenSubtitle: string;
}) {
  return (
    <section style={{ padding: "28px 28px 80px", maxWidth: 1280, margin: "0 auto" }}>
      <DemoScreenHeader
        palette={palette}
        eyebrow={screenEyebrow}
        title={screenTitle}
        subtitle={screenSubtitle}
        rightSlot={<span style={{ color: C.muted, fontSize: 12 }}>{t("ordersPage.showing", { count: orders.length })}</span>}
      />
      <DemoKpiStrip palette={palette} items={kpis} />
      <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead style={{ background: C.bg }}>
            <tr>
              {(["order", "customer", "total", "status"] as const).map((c, i) => (
                <th key={c} style={{ textAlign: i === 2 ? "right" : "left", padding: "14px 18px", fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: "uppercase", fontSize: 11 }}>
                  {t(`ordersPage.col.${c}`)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => {
              const StatusIcon = o.status === "paid" ? CreditCardIcon : o.status === "shipped" ? TruckIcon : o.status === "delivered" ? CheckBadgeIcon : ReceiptRefundIcon;
              return (
                <tr key={o.id} style={{ borderTop: `1px solid ${C.border}` }}>
                  <td style={{ padding: "14px 18px", fontFamily: "ui-monospace, monospace", fontWeight: 600 }}>{o.id}</td>
                  <td style={{ padding: "14px 18px" }}>{t(o.customerKey)}</td>
                  <td style={{ padding: "14px 18px", textAlign: "right", fontWeight: 700 }}>${o.total}</td>
                  <td style={{ padding: "14px 18px" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <StatusIcon style={{ width: 12, height: 12, color: C.muted }} />
                      <DemoBadge palette={palette} variant={statusVariant(o.status)} label={statusLabel(o.status)} />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ─────────────────────── CUSTOMERS ─────────────────────── */

function CustomersScreen({
  t, kpis, screenEyebrow, screenTitle, screenSubtitle, toast,
}: { t: TFn; kpis: KpiItem[]; screenEyebrow: string; screenTitle: string; screenSubtitle: string; toast: ToastApi }) {
  const rows = [
    { name: "Aigerim Yusupova", segment: "vip", orders: 24, ltv: 3120, last: "2d ago", spark: [4, 6, 5, 8, 9, 12, 11, 14] },
    { name: "Daler Karimov", segment: "active", orders: 9, ltv: 980, last: "5d ago", spark: [2, 3, 4, 4, 5, 5, 6, 6] },
    { name: "Liu Wei", segment: "new", orders: 1, ltv: 142, last: "1h ago", spark: [0, 0, 0, 0, 1, 1, 1, 1] },
    { name: "Nodira Salimova", segment: "vip", orders: 32, ltv: 4280, last: "Today", spark: [6, 8, 10, 12, 14, 16, 18, 22] },
    { name: "Tomás Reyes", segment: "atrisk", orders: 6, ltv: 720, last: "62d ago", spark: [4, 5, 6, 5, 4, 3, 2, 1] },
    { name: "Mei Tanaka", segment: "active", orders: 14, ltv: 1840, last: "11d ago", spark: [3, 4, 5, 6, 7, 8, 9, 10] },
    { name: "Faruh Bobojonov", segment: "new", orders: 2, ltv: 188, last: "3d ago", spark: [0, 0, 0, 1, 1, 2, 2, 2] },
    { name: "Helena Marsh", segment: "vip", orders: 19, ltv: 2640, last: "Today", spark: [5, 7, 8, 9, 10, 12, 13, 15] },
  ];
  const variant = (s: string) => (s === "vip" ? "success" : s === "active" ? "info" : s === "new" ? "warn" : "danger");
  const [filter, setFilter] = useState<string>("all");
  const filtered = rows.filter((r) => filter === "all" || r.segment === filter);
  const segments = ["all", "vip", "active", "new", "atrisk"];

  return (
    <section style={{ padding: "28px 28px 80px", maxWidth: 1280, margin: "0 auto" }}>
      <DemoScreenHeader palette={palette} eyebrow={screenEyebrow} title={screenTitle} subtitle={screenSubtitle} />
      <DemoKpiStrip palette={palette} items={kpis} />

      <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
        {segments.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              padding: "6px 14px", borderRadius: 9999, fontSize: 12, fontWeight: 600, cursor: "pointer",
              border: `1px solid ${filter === s ? C.primary : C.border}`,
              background: filter === s ? C.primary : "transparent",
              color: filter === s ? "white" : C.ink,
            }}
          >
            {t(`customers.segments.${s}`)}
          </button>
        ))}
      </div>

      <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead style={{ background: C.bg }}>
            <tr>
              {(["customer", "segment", "orders", "ltv", "activity", "last"] as const).map((c, i) => (
                <th key={c} style={{ textAlign: i === 2 || i === 3 ? "right" : "left", padding: "12px 18px", fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: "uppercase", fontSize: 10 }}>
                  {t(`customers.col.${c}`)}
                </th>
              ))}
              <th style={{ width: 40 }} />
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.name} style={{ borderTop: `1px solid ${C.border}` }}>
                <td style={{ padding: "12px 18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 9999, background: C.primary, color: "white", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 12 }}>
                      {r.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div style={{ fontWeight: 600 }}>{r.name}</div>
                  </div>
                </td>
                <td style={{ padding: "12px 18px" }}>
                  <DemoBadge palette={palette} variant={variant(r.segment)} label={t(`customers.segments.${r.segment}`)} />
                </td>
                <td style={{ padding: "12px 18px", textAlign: "right", fontWeight: 600 }}>{r.orders}</td>
                <td style={{ padding: "12px 18px", textAlign: "right", fontWeight: 700 }}>
                  $<DemoCounter value={r.ltv} />
                </td>
                <td style={{ padding: "12px 18px" }}>
                  <DemoSpark data={r.spark} color={C.primary} width={80} height={20} />
                </td>
                <td style={{ padding: "12px 18px", color: C.muted, fontSize: 12 }}>{r.last}</td>
                <td style={{ padding: "12px 18px", textAlign: "right" }}>
                  <button
                    onClick={() => toast.push({ title: t("toast.messageSent", { name: r.name }), tone: "info" })}
                    style={{ background: "transparent", border: `1px solid ${C.border}`, borderRadius: 9999, padding: "4px 10px", fontSize: 11, color: C.ink, cursor: "pointer", fontWeight: 600 }}
                  >
                    {t("customers.message")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ─────────────────────── ANALYTICS ─────────────────────── */

function AnalyticsScreen({
  t, kpis, screenEyebrow, screenTitle, screenSubtitle,
}: { t: TFn; kpis: KpiItem[]; screenEyebrow: string; screenTitle: string; screenSubtitle: string }) {
  const series = [3200, 3600, 3400, 4200, 4800, 4600, 5200, 5800, 5400, 6200, 6800, 7200, 6900, 7400, 7800, 8400, 9000, 8800, 9400, 9800, 10200, 10600, 11200, 11800, 12400, 12800, 13200, 13800, 14600, 15200];
  const feedInitial = [
    { id: "1", title: "Order MM-4821 paid", meta: "Aigerim Y. · $184 · just now", tone: "success" as const },
    { id: "2", title: "Inventory restocked: Cedar Walking Lamp", meta: "+24 units · 14s ago", tone: "info" as const },
    { id: "3", title: "Coupon SPRING20 redeemed", meta: "−$36 · 28s ago", tone: "primary" as const },
  ];
  const feedRotating = [
    { id: "r1", title: "Order MM-4825 placed", meta: "Daler K. · $268", tone: "success" as const },
    { id: "r2", title: "Refund issued for MM-4818", meta: "−$72", tone: "warn" as const },
    { id: "r3", title: "New customer signup", meta: "Faruh B. · Dushanbe", tone: "info" as const },
    { id: "r4", title: "Cart abandoned: 3 items", meta: "Tomás R. · $164", tone: "warn" as const },
    { id: "r5", title: "Order MM-4827 paid", meta: "Helena M. · $96", tone: "success" as const },
  ];

  return (
    <section style={{ padding: "28px 28px 80px", maxWidth: 1280, margin: "0 auto" }}>
      <DemoScreenHeader palette={palette} eyebrow={screenEyebrow} title={screenTitle} subtitle={screenSubtitle} />
      <DemoKpiStrip palette={palette} items={kpis} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20, alignItems: "start" }}>
        <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 16, padding: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
            <h3 style={{ fontFamily: "Georgia, serif", fontSize: 20, margin: 0 }}>{t("analytics.revenueTitle")}</h3>
            <span style={{ color: C.muted, fontSize: 12 }}>{t("analytics.last30")}</span>
          </div>
          <DemoChart data={series} palette={palette} height={220} />
        </div>
        <DemoLiveFeed
          palette={palette}
          initial={feedInitial}
          rotating={feedRotating}
          liveLabel={t("analytics.liveFeed")}
          height={250}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20, marginTop: 20, alignItems: "start" }}>
        <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 16, padding: 22 }}>
          <h3 style={{ fontFamily: "Georgia, serif", fontSize: 20, margin: "0 0 14px" }}>{t("analytics.cohortTitle")}</h3>
          <DemoCohort palette={palette} rows={6} cols={8} />
          <p style={{ marginTop: 12, color: C.muted, fontSize: 12 }}>{t("analytics.cohortNote")}</p>
        </div>
        <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 16, padding: 22 }}>
          <h3 style={{ fontFamily: "Georgia, serif", fontSize: 20, margin: "0 0 14px" }}>{t("analytics.heatmapTitle")}</h3>
          <DemoHeatmap palette={palette} weeks={14} seed={7} ariaLabel={t("analytics.heatmapAria")} />
          <p style={{ marginTop: 12, color: C.muted, fontSize: 12 }}>{t("analytics.heatmapNote")}</p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── INVENTORY ─────────────────────── */

function InventoryScreen({
  t, kpis, products, screenEyebrow, screenTitle, screenSubtitle, toast,
}: {
  t: TFn; kpis: KpiItem[]; products: { id: number; name: string; img: string }[];
  screenEyebrow: string; screenTitle: string; screenSubtitle: string; toast: ToastApi;
}) {
  const alerts = [
    { sku: "CWL-04", name: products[2].name, stock: 4, reorder: 24, status: "low" },
    { sku: "WLS-07", name: products[4].name, stock: 2, reorder: 18, status: "critical" },
    { sku: "AMP-12", name: products[5].name, stock: 9, reorder: 24, status: "low" },
    { sku: "OQT-03", name: products[3].name, stock: 12, reorder: 30, status: "ok" },
  ];
  const variant = (s: string): "success" | "info" | "warn" | "danger" =>
    s === "critical" ? "danger" : s === "low" ? "warn" : "success";
  const feedInitial = [
    { id: "i1", title: `+24 units → CWL-04`, meta: "Restock · 12s ago", tone: "success" as const },
    { id: "i2", title: `−1 unit → AMP-12`, meta: "Sale · 28s ago", tone: "primary" as const },
    { id: "i3", title: `Transfer scheduled → WLS-07`, meta: "Warehouse B · 1m ago", tone: "info" as const },
  ];
  const feedRotating = [
    { id: "ir1", title: "−2 units → CWL-04", meta: "Sale", tone: "primary" as const },
    { id: "ir2", title: "Low-stock alert: WLS-07", meta: "Stock: 2 units", tone: "warn" as const },
    { id: "ir3", title: "Cycle count complete", meta: "Aisle 3 · variance 0", tone: "success" as const },
  ];

  return (
    <section style={{ padding: "28px 28px 80px", maxWidth: 1280, margin: "0 auto" }}>
      <DemoScreenHeader palette={palette} eyebrow={screenEyebrow} title={screenTitle} subtitle={screenSubtitle} />
      <DemoKpiStrip palette={palette} items={kpis} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20, alignItems: "start" }}>
        <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 16, padding: 22 }}>
          <h3 style={{ fontFamily: "Georgia, serif", fontSize: 20, margin: "0 0 14px" }}>{t("inventory.heatTitle")}</h3>
          <DemoHeatmap palette={palette} weeks={20} seed={3} ariaLabel={t("inventory.heatAria")} />
          <p style={{ marginTop: 12, color: C.muted, fontSize: 12 }}>{t("inventory.heatNote")}</p>
        </div>
        <DemoLiveFeed palette={palette} initial={feedInitial} rotating={feedRotating} liveLabel={t("inventory.liveFeed")} height={250} />
      </div>

      <div style={{ marginTop: 24, background: C.paper, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
        <div style={{ padding: "14px 18px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 8 }}>
          <ExclamationTriangleIcon style={{ width: 16, height: 16, color: "#d97706" }} />
          <h4 style={{ fontFamily: "Georgia, serif", fontSize: 16, margin: 0 }}>{t("inventory.alertsTitle")}</h4>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead style={{ background: C.bg }}>
            <tr>
              {(["sku", "product", "stock", "reorder", "status"] as const).map((c, i) => (
                <th key={c} style={{ textAlign: i === 2 || i === 3 ? "right" : "left", padding: "12px 18px", fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: "uppercase", fontSize: 10 }}>
                  {t(`inventory.col.${c}`)}
                </th>
              ))}
              <th style={{ width: 100 }} />
            </tr>
          </thead>
          <tbody>
            {alerts.map((a) => (
              <tr key={a.sku} style={{ borderTop: `1px solid ${C.border}` }}>
                <td style={{ padding: "12px 18px", fontFamily: "ui-monospace, monospace", fontWeight: 600 }}>{a.sku}</td>
                <td style={{ padding: "12px 18px" }}>{a.name}</td>
                <td style={{ padding: "12px 18px", textAlign: "right", fontWeight: 700, color: a.status === "critical" ? "#dc2626" : C.ink }}>{a.stock}</td>
                <td style={{ padding: "12px 18px", textAlign: "right", color: C.muted }}>{a.reorder}</td>
                <td style={{ padding: "12px 18px" }}>
                  <DemoBadge palette={palette} variant={variant(a.status)} label={t(`inventory.status.${a.status}`)} />
                </td>
                <td style={{ padding: "12px 18px", textAlign: "right" }}>
                  <button
                    onClick={() => toast.push({ title: t("toast.reorderPlaced", { sku: a.sku }), tone: "success" })}
                    style={{ padding: "6px 12px", background: C.ink, color: "white", border: "none", borderRadius: 9999, fontSize: 11, fontWeight: 700, cursor: "pointer" }}
                  >
                    {t("inventory.reorder")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ─────────────────────── PROMOTIONS ─────────────────────── */

function PromotionsScreen({
  t, kpis, screenEyebrow, screenTitle, screenSubtitle, toast,
}: { t: TFn; kpis: KpiItem[]; screenEyebrow: string; screenTitle: string; screenSubtitle: string; toast: ToastApi }) {
  const [code, setCode] = useState("SPRING20");
  const [pct, setPct] = useState(20);
  const sample = 248;
  const discounted = Math.round(sample - sample * (pct / 100));
  const campaigns = [
    { id: "C-001", name: "Spring drop · 20% off", redemptions: 184, spend: 1820, status: "active" },
    { id: "C-002", name: "Welcome 10", redemptions: 412, spend: 980, status: "active" },
    { id: "C-003", name: "VIP early access", redemptions: 68, spend: 1240, status: "scheduled" },
    { id: "C-004", name: "Winter clearance", redemptions: 624, spend: 4280, status: "ended" },
  ];
  const variant = (s: string): "success" | "info" | "warn" => (s === "active" ? "success" : s === "scheduled" ? "info" : "warn");

  return (
    <section style={{ padding: "28px 28px 80px", maxWidth: 1280, margin: "0 auto" }}>
      <DemoScreenHeader palette={palette} eyebrow={screenEyebrow} title={screenTitle} subtitle={screenSubtitle} />
      <DemoKpiStrip palette={palette} items={kpis} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "start" }}>
        <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 16, padding: 22 }}>
          <h3 style={{ fontFamily: "Georgia, serif", fontSize: 20, margin: "0 0 16px" }}>{t("promotions.builderTitle")}</h3>
          <div style={{ display: "grid", gap: 14 }}>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: C.muted, marginBottom: 6 }}>{t("promotions.fields.code")}</label>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase().slice(0, 16))}
                style={{ width: "100%", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", fontSize: 14, color: C.ink, outline: "none", fontFamily: "ui-monospace, monospace", letterSpacing: 1, fontWeight: 700, boxSizing: "border-box" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: C.muted, marginBottom: 6 }}>{t("promotions.fields.percent")}: {pct}%</label>
              <input
                type="range" min={5} max={50} step={5}
                value={pct} onChange={(e) => setPct(Number(e.target.value))}
                style={{ width: "100%", accentColor: C.primary }}
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: C.muted, marginBottom: 6 }}>{t("promotions.fields.starts")}</label>
                <input defaultValue="May 22" style={{ width: "100%", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", fontSize: 13, color: C.ink, outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: C.muted, marginBottom: 6 }}>{t("promotions.fields.ends")}</label>
                <input defaultValue="Jun 30" style={{ width: "100%", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", fontSize: 13, color: C.ink, outline: "none", boxSizing: "border-box" }} />
              </div>
            </div>
            <button
              onClick={() => toast.push({ title: t("toast.promotionScheduled", { code }), tone: "success" })}
              style={{ marginTop: 6, padding: "12px 18px", background: C.primary, color: "white", border: "none", borderRadius: 9999, fontWeight: 700, fontSize: 13, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <BoltIcon style={{ width: 14, height: 14 }} />
              {t("promotions.schedule")}
            </button>
          </div>
        </div>

        <div style={{ background: "linear-gradient(135deg,#fff4ee,#ffe1d2)", border: `1px solid ${C.border}`, borderRadius: 16, padding: 22, position: "relative", overflow: "hidden" }}>
          <SparklesIcon style={{ width: 24, height: 24, color: C.primary }} />
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: C.accentDark, marginTop: 8 }}>{t("promotions.previewLabel")}</div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 38, fontWeight: 800, margin: "8px 0 4px", color: C.ink, lineHeight: 1 }}>
            {pct}% OFF
          </div>
          <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 14, color: C.accentDark, fontWeight: 700 }}>
            CODE · {code || "ABCDEF"}
          </div>
          <div style={{ marginTop: 22, padding: "12px 14px", background: "rgba(255,255,255,0.6)", borderRadius: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: C.muted, marginBottom: 6 }}>
              <span>{t("promotions.exampleCart")}</span>
              <span style={{ textDecoration: "line-through" }}>${sample}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 800, color: C.ink }}>
              <span>{t("promotions.afterDiscount")}</span>
              <span>$<DemoCounter value={discounted} /></span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24, background: C.paper, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
        <div style={{ padding: "14px 18px", borderBottom: `1px solid ${C.border}`, fontFamily: "Georgia, serif", fontSize: 16 }}>{t("promotions.campaignsTitle")}</div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead style={{ background: C.bg }}>
            <tr>
              {(["id", "name", "redemptions", "spend", "status"] as const).map((c, i) => (
                <th key={c} style={{ textAlign: i === 2 || i === 3 ? "right" : "left", padding: "12px 18px", fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: "uppercase", fontSize: 10 }}>
                  {t(`promotions.col.${c}`)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c.id} style={{ borderTop: `1px solid ${C.border}` }}>
                <td style={{ padding: "12px 18px", fontFamily: "ui-monospace, monospace", fontWeight: 600 }}>{c.id}</td>
                <td style={{ padding: "12px 18px", fontWeight: 600 }}>{c.name}</td>
                <td style={{ padding: "12px 18px", textAlign: "right" }}>{c.redemptions}</td>
                <td style={{ padding: "12px 18px", textAlign: "right", fontWeight: 700 }}>${c.spend}</td>
                <td style={{ padding: "12px 18px" }}>
                  <DemoBadge palette={palette} variant={variant(c.status)} label={t(`promotions.status.${c.status}`)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ─────────────────────── SETTINGS ─────────────────────── */

function SettingsScreen({
  t, kpis, screenEyebrow, screenTitle, screenSubtitle, toast,
}: { t: TFn; kpis: KpiItem[]; screenEyebrow: string; screenTitle: string; screenSubtitle: string; toast: ToastApi }) {
  const integrations = [
    { name: "Stripe", desc: "settings.integrations.stripe", emoji: "💳", connected: true },
    { name: "Shopify", desc: "settings.integrations.shopify", emoji: "🛒", connected: true },
    { name: "Mailchimp", desc: "settings.integrations.mailchimp", emoji: "✉️", connected: false },
    { name: "Klaviyo", desc: "settings.integrations.klaviyo", emoji: "📧", connected: true },
    { name: "Slack", desc: "settings.integrations.slack", emoji: "💬", connected: false },
    { name: "Google Analytics", desc: "settings.integrations.ga", emoji: "📊", connected: true },
  ];

  return (
    <section style={{ padding: "28px 28px 80px", maxWidth: 1100, margin: "0 auto" }}>
      <DemoScreenHeader palette={palette} eyebrow={screenEyebrow} title={screenTitle} subtitle={screenSubtitle} />
      <DemoKpiStrip palette={palette} items={kpis} />

      <div style={{ display: "grid", gap: 20 }}>
        <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 16, padding: 22 }}>
          <h3 style={{ fontFamily: "Georgia, serif", fontSize: 20, margin: "0 0 16px" }}>{t("settings.storeBasics")}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Field t={t} label="settings.fields.storeName" placeholderKey="settings.placeholders.storeName" />
            <Field t={t} label="settings.fields.currency" placeholderKey="settings.placeholders.currency" />
            <Field t={t} label="settings.fields.timezone" placeholderKey="settings.placeholders.timezone" />
            <Field t={t} label="settings.fields.contactEmail" placeholderKey="settings.placeholders.contactEmail" />
          </div>
          <button
            onClick={() => toast.push({ title: t("toast.settingsSaved"), tone: "success" })}
            style={{ marginTop: 16, padding: "10px 18px", background: C.primary, color: "white", border: "none", borderRadius: 9999, fontWeight: 700, fontSize: 13, cursor: "pointer" }}
          >
            {t("settings.save")}
          </button>
        </div>

        <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 16, padding: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
            <h3 style={{ fontFamily: "Georgia, serif", fontSize: 20, margin: 0 }}>{t("settings.integrationsTitle")}</h3>
            <span style={{ color: C.muted, fontSize: 12 }}>{t("settings.integrationsCount", { count: integrations.filter((i) => i.connected).length, total: integrations.length })}</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
            {integrations.map((it) => (
              <div key={it.name} style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 14, display: "flex", flexDirection: "column", gap: 8, background: C.bg }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 22 }}>{it.emoji}</div>
                  <DemoBadge palette={palette} variant={it.connected ? "success" : "neutral"} label={t(it.connected ? "settings.connected" : "settings.disconnected")} />
                </div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{it.name}</div>
                <div style={{ color: C.muted, fontSize: 11, lineHeight: 1.5 }}>{t(it.desc)}</div>
                <button
                  onClick={() => toast.push({ title: t(it.connected ? "toast.disconnected" : "toast.connected", { name: it.name }), tone: it.connected ? "warn" : "success" })}
                  style={{ marginTop: 4, padding: "6px 10px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 11, fontWeight: 600, color: C.ink, cursor: "pointer", alignSelf: "flex-start" }}
                >
                  {t(it.connected ? "settings.disconnect" : "settings.connect")}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
