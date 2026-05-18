"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  ShoppingBagIcon,
  MagnifyingGlassIcon,
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
} from "@heroicons/react/24/outline";

const C = {
  bg: "#fff8f3",
  surface: "#ffffff",
  ink: "#1c0d05",
  muted: "#7a5b4a",
  accent: "#e25a31",
  accentDark: "#b8401d",
  border: "#f3dccb",
};

type Screen = "catalog" | "product" | "cart" | "orders";

export function ShopDemo() {
  const t = useTranslations("demoPreview.shopping");
  const [screen, setScreen] = useState<Screen>("catalog");

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

  const statusMeta = (s: "paid" | "shipped" | "delivered" | "refunded") => {
    if (s === "paid")
      return { label: t("status.paid"), bg: "#fff1e0", color: "#b8401d", Icon: CreditCardIcon };
    if (s === "shipped")
      return { label: t("status.shipped"), bg: "#e9efff", color: "#3756b3", Icon: TruckIcon };
    if (s === "delivered")
      return { label: t("status.delivered"), bg: "#e6f5e9", color: "#2f7a45", Icon: CheckBadgeIcon };
    return { label: t("status.refunded"), bg: "#fbe6e6", color: "#a83434", Icon: ReceiptRefundIcon };
  };

  const TABS: { key: Screen; label: string; Icon: typeof ShoppingBagIcon }[] = [
    { key: "catalog", label: t("tabs.catalog"), Icon: ShoppingBagIcon },
    { key: "product", label: t("tabs.product"), Icon: CubeIcon },
    { key: "cart", label: t("tabs.cart"), Icon: ShoppingCartIcon },
    { key: "orders", label: t("tabs.orders"), Icon: ClipboardDocumentListIcon },
  ];

  return (
    <div style={{ background: C.bg, color: C.ink, fontFamily: "ui-sans-serif, system-ui", minHeight: "100vh" }}>
      {/* TOP */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          padding: "20px 28px",
          background: C.surface,
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700, color: C.accent }}>
          {t("brand")}
        </div>
        <nav style={{ display: "flex", gap: 18, fontSize: 14, color: C.muted }}>
          <span style={{ color: C.ink, fontWeight: 600 }}>{t("nav.homeGoods")}</span>
          <span>{t("nav.apparel")}</span>
          <span>{t("nav.studio")}</span>
          <span>{t("nav.journal")}</span>
        </nav>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 14px",
              border: `1px solid ${C.border}`,
              borderRadius: 9999,
              background: C.bg,
              minWidth: 220,
            }}
          >
            <MagnifyingGlassIcon style={{ width: 14, height: 14, color: C.muted }} />
            <input
              placeholder={t("search.placeholder")}
              style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 13 }}
            />
          </div>
          <button
            onClick={() => setScreen("cart")}
            style={{
              position: "relative",
              padding: 10,
              borderRadius: 9999,
              border: `1px solid ${C.border}`,
              background: C.surface,
              cursor: "pointer",
            }}
            aria-label={t("aria.cart")}
          >
            <ShoppingBagIcon style={{ width: 16, height: 16 }} />
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -4,
                  right: -4,
                  background: C.accent,
                  color: "white",
                  fontSize: 10,
                  fontWeight: 700,
                  borderRadius: 9999,
                  minWidth: 18,
                  height: 18,
                  display: "grid",
                  placeItems: "center",
                  padding: "0 5px",
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* TABS */}
      <div
        style={{
          display: "flex",
          gap: 6,
          padding: "12px 28px",
          background: C.surface,
          borderBottom: `1px solid ${C.border}`,
          maxWidth: 1280,
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {TABS.map((tab) => {
          const active = screen === tab.key;
          const Icon = tab.Icon;
          return (
            <button
              key={tab.key}
              onClick={() => setScreen(tab.key)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                borderRadius: 9999,
                border: `1px solid ${active ? C.accent : C.border}`,
                background: active ? C.accent : "transparent",
                color: active ? "white" : C.ink,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <Icon style={{ width: 14, height: 14 }} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {screen === "catalog" && (
        <>
          {/* HERO */}
          <section
            style={{
              padding: "56px 28px 40px",
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: 32,
              alignItems: "center",
              maxWidth: 1280,
              margin: "0 auto",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: C.accent,
                  fontWeight: 700,
                }}
              >
                {t("hero.eyebrow")}
              </span>
              <h1
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: 48,
                  lineHeight: 1.05,
                  margin: "12px 0",
                  maxWidth: 480,
                }}
              >
                {t("hero.title")}
              </h1>
              <p style={{ color: C.muted, maxWidth: 460, lineHeight: 1.6 }}>
                {t("hero.description")}
              </p>
              <button
                style={{
                  marginTop: 24,
                  padding: "12px 22px",
                  background: C.accent,
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
              }}
            >
              ✿
            </div>
          </section>

          {/* GRID */}
          <section style={{ padding: "20px 28px 80px", maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 18 }}>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: 22 }}>{t("grid.title")}</h2>
              <span style={{ color: C.muted, fontSize: 12 }}>{t("grid.showing")}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
              {PRODUCTS.map((p) => (
                <article
                  key={p.id}
                  style={{
                    background: C.surface,
                    border: `1px solid ${C.border}`,
                    borderRadius: 16,
                    overflow: "hidden",
                  }}
                >
                  <div style={{ aspectRatio: "1/1", background: p.img, position: "relative" }}>
                    {p.tag && (
                      <span
                        style={{
                          position: "absolute",
                          top: 12,
                          left: 12,
                          background: C.surface,
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
                        onClick={() => setScreen("product")}
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
        </>
      )}

      {screen === "product" && (
        <section
          style={{
            padding: "40px 28px 80px",
            maxWidth: 1280,
            margin: "0 auto",
          }}
        >
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 1fr",
              gap: 40,
              alignItems: "flex-start",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div
                style={{
                  aspectRatio: "1/1",
                  borderRadius: 20,
                  background: FEATURED.img,
                  border: `1px solid ${C.border}`,
                }}
              />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                {PRODUCTS.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    style={{
                      aspectRatio: "1/1",
                      borderRadius: 12,
                      background: p.img,
                      border: `1px solid ${C.border}`,
                    }}
                  />
                ))}
              </div>
            </div>
            <div>
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: C.accent,
                  fontWeight: 700,
                }}
              >
                {t("product.eyebrow")}
              </span>
              <h1
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: 36,
                  lineHeight: 1.1,
                  margin: "10px 0",
                }}
              >
                {FEATURED.name}
              </h1>
              <div style={{ display: "flex", alignItems: "center", gap: 10, color: C.muted, fontSize: 13 }}>
                <StarIcon style={{ width: 14, height: 14, fill: "#f5b400", color: "#f5b400" }} />
                {FEATURED.rating} · {t("product.reviewsCount")}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 14 }}>
                <span style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 700 }}>
                  ${FEATURED.price}
                </span>
                <span style={{ color: C.muted, fontSize: 13 }}>{t("product.shippingNote")}</span>
              </div>
              <p style={{ color: C.muted, marginTop: 18, lineHeight: 1.65, fontSize: 14 }}>
                {t("product.description")}
              </p>

              <div style={{ marginTop: 24 }}>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: C.muted, marginBottom: 10 }}>
                  {t("product.colorLabel")}
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  {SWATCHES.map((s, i) => (
                    <button
                      key={s.key}
                      aria-label={t(`product.swatches.${s.key}`)}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 9999,
                        background: s.color,
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
                  onClick={() => setScreen("cart")}
                  style={{
                    flex: 1,
                    padding: "14px 22px",
                    background: C.accent,
                    color: "white",
                    border: "none",
                    borderRadius: 9999,
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  <ShoppingCartIcon style={{ width: 16, height: 16 }} />
                  {t("product.addToCart")}
                </button>
                <button
                  aria-label={t("aria.save")}
                  style={{
                    padding: "0 16px",
                    background: C.surface,
                    color: C.ink,
                    border: `1px solid ${C.border}`,
                    borderRadius: 9999,
                    cursor: "pointer",
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
        <section
          style={{
            padding: "40px 28px 80px",
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: 32, margin: "0 0 6px" }}>
            {t("cartPage.title")}
          </h1>
          <p style={{ color: C.muted, fontSize: 14, margin: "0 0 24px" }}>
            {t("cartPage.itemsCount", { count: cartCount })}
          </p>
          <div
            style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead style={{ background: C.bg }}>
                <tr>
                  <th style={{ textAlign: "left", padding: "14px 18px", fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: "uppercase", fontSize: 11 }}>
                    {t("cartPage.col.item")}
                  </th>
                  <th style={{ textAlign: "center", padding: "14px 18px", fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: "uppercase", fontSize: 11 }}>
                    {t("cartPage.col.qty")}
                  </th>
                  <th style={{ textAlign: "right", padding: "14px 18px", fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: "uppercase", fontSize: 11 }}>
                    {t("cartPage.col.price")}
                  </th>
                  <th style={{ textAlign: "right", padding: "14px 18px", fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: "uppercase", fontSize: 11 }}>
                    {t("cartPage.col.lineTotal")}
                  </th>
                  <th style={{ width: 40 }} />
                </tr>
              </thead>
              <tbody>
                {CART_LINES.map((line) => (
                  <tr key={line.id} style={{ borderTop: `1px solid ${C.border}` }}>
                    <td style={{ padding: "14px 18px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 48, height: 48, borderRadius: 10, background: line.img }} />
                        <div>
                          <div style={{ fontWeight: 600 }}>{line.name}</div>
                          <div style={{ color: C.muted, fontSize: 12 }}>{t("cartPage.skuPrefix")} #{line.id.toString().padStart(4, "0")}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "14px 18px", textAlign: "center" }}>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                        <button
                          aria-label={t("aria.decrease")}
                          style={{
                            width: 24,
                            height: 24,
                            display: "grid",
                            placeItems: "center",
                            borderRadius: 6,
                            border: `1px solid ${C.border}`,
                            background: C.surface,
                            cursor: "pointer",
                          }}
                        >
                          <MinusIcon style={{ width: 12, height: 12 }} />
                        </button>
                        <span style={{ minWidth: 18, textAlign: "center", fontWeight: 600 }}>{line.qty}</span>
                        <button
                          aria-label={t("aria.increase")}
                          style={{
                            width: 24,
                            height: 24,
                            display: "grid",
                            placeItems: "center",
                            borderRadius: 6,
                            border: `1px solid ${C.border}`,
                            background: C.surface,
                            cursor: "pointer",
                          }}
                        >
                          <PlusIcon style={{ width: 12, height: 12 }} />
                        </button>
                      </div>
                    </td>
                    <td style={{ padding: "14px 18px", textAlign: "right" }}>${line.price}</td>
                    <td style={{ padding: "14px 18px", textAlign: "right", fontWeight: 700 }}>
                      ${line.price * line.qty}
                    </td>
                    <td style={{ padding: "14px 18px", textAlign: "right" }}>
                      <button
                        aria-label={t("aria.remove")}
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: C.muted,
                        }}
                      >
                        <XMarkIcon style={{ width: 14, height: 14 }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            style={{
              marginTop: 24,
              display: "grid",
              gridTemplateColumns: "1fr 360px",
              gap: 24,
              alignItems: "start",
            }}
          >
            <div
              style={{
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 16,
                padding: 18,
                fontSize: 13,
                color: C.muted,
                lineHeight: 1.6,
              }}
            >
              <div style={{ fontWeight: 700, color: C.ink, marginBottom: 6 }}>
                {t("cartPage.promoTitle")}
              </div>
              {t("cartPage.promoNote")}
            </div>
            <div
              style={{
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 16,
                padding: 20,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 13 }}>
                <span style={{ color: C.muted }}>{t("cartPage.subtotal")}</span>
                <span style={{ fontWeight: 600 }}>${cartSubtotal}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 13 }}>
                <span style={{ color: C.muted }}>{t("cartPage.shipping")}</span>
                <span style={{ fontWeight: 600 }}>${shipping}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 14,
                  paddingTop: 14,
                  borderTop: `1px solid ${C.border}`,
                  fontSize: 15,
                }}
              >
                <span style={{ fontWeight: 700 }}>{t("cartPage.total")}</span>
                <span style={{ fontWeight: 700 }}>${cartTotal}</span>
              </div>
              <button
                style={{
                  width: "100%",
                  marginTop: 18,
                  padding: 14,
                  background: C.accent,
                  color: "white",
                  border: "none",
                  borderRadius: 9999,
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <CreditCardIcon style={{ width: 16, height: 16 }} />
                {t("cartPage.checkout")}
              </button>
            </div>
          </div>
        </section>
      )}

      {screen === "orders" && (
        <section
          style={{
            padding: "40px 28px 80px",
            maxWidth: 1280,
            margin: "0 auto",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 18 }}>
            <div>
              <h1 style={{ fontFamily: "Georgia, serif", fontSize: 32, margin: "0 0 6px" }}>
                {t("ordersPage.title")}
              </h1>
              <p style={{ color: C.muted, fontSize: 14, margin: 0 }}>
                {t("ordersPage.subtitle")}
              </p>
            </div>
            <span style={{ color: C.muted, fontSize: 12 }}>
              {t("ordersPage.showing", { count: ORDERS.length })}
            </span>
          </div>
          <div
            style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead style={{ background: C.bg }}>
                <tr>
                  <th style={{ textAlign: "left", padding: "14px 18px", fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: "uppercase", fontSize: 11 }}>
                    {t("ordersPage.col.order")}
                  </th>
                  <th style={{ textAlign: "left", padding: "14px 18px", fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: "uppercase", fontSize: 11 }}>
                    {t("ordersPage.col.customer")}
                  </th>
                  <th style={{ textAlign: "right", padding: "14px 18px", fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: "uppercase", fontSize: 11 }}>
                    {t("ordersPage.col.total")}
                  </th>
                  <th style={{ textAlign: "left", padding: "14px 18px", fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: "uppercase", fontSize: 11 }}>
                    {t("ordersPage.col.status")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {ORDERS.map((o) => {
                  const m = statusMeta(o.status);
                  const Icon = m.Icon;
                  return (
                    <tr key={o.id} style={{ borderTop: `1px solid ${C.border}` }}>
                      <td style={{ padding: "14px 18px", fontFamily: "ui-monospace, monospace", fontWeight: 600 }}>
                        {o.id}
                      </td>
                      <td style={{ padding: "14px 18px" }}>{t(o.customerKey)}</td>
                      <td style={{ padding: "14px 18px", textAlign: "right", fontWeight: 700 }}>
                        ${o.total}
                      </td>
                      <td style={{ padding: "14px 18px" }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            background: m.bg,
                            color: m.color,
                            padding: "4px 10px",
                            borderRadius: 9999,
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: 0.6,
                            textTransform: "uppercase",
                          }}
                        >
                          <Icon style={{ width: 12, height: 12 }} />
                          {m.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
