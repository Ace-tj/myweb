"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ShoppingBagIcon, MagnifyingGlassIcon, HeartIcon, StarIcon, PlusIcon, MinusIcon, XMarkIcon } from "@heroicons/react/24/outline";

const C = {
  bg: "#fff8f3",
  surface: "#ffffff",
  ink: "#1c0d05",
  muted: "#7a5b4a",
  accent: "#e25a31",
  accentDark: "#b8401d",
  border: "#f3dccb",
};

export function ShopDemo() {
  const t = useTranslations("demoPreview.shopping");

  const PRODUCTS = [
    { id: 1, name: t("products.coralLinenTote"), price: 48, tag: t("tags.new"), rating: 4.8, img: "linear-gradient(140deg,#ffb89a,#e25a31)" },
    { id: 2, name: t("products.stonewarePourSet"), price: 96, tag: t("tags.best"), rating: 4.9, img: "linear-gradient(140deg,#fef3e6,#d8a679)" },
    { id: 3, name: t("products.cedarWalkingLamp"), price: 138, tag: t("tags.limited"), rating: 4.7, img: "linear-gradient(140deg,#fce0c8,#b46a3e)" },
    { id: 4, name: t("products.oliveQuiltedThrow"), price: 84, tag: "", rating: 4.6, img: "linear-gradient(140deg,#e9d8a6,#8b7a5a)" },
    { id: 5, name: t("products.woolLoaferSand"), price: 162, tag: "", rating: 4.8, img: "linear-gradient(140deg,#f4e0d0,#a07560)" },
    { id: 6, name: t("products.almondMugPair"), price: 38, tag: "", rating: 4.9, img: "linear-gradient(140deg,#fff0e2,#c98e6e)" },
  ];

  const [cart, setCart] = useState<{ id: number; qty: number }[]>([
    { id: 1, qty: 1 },
    { id: 3, qty: 2 },
  ]);
  const [drawer, setDrawer] = useState(false);

  const total = cart.reduce(
    (s, l) => s + l.qty * (PRODUCTS.find((p) => p.id === l.id)?.price ?? 0),
    0,
  );
  const count = cart.reduce((s, l) => s + l.qty, 0);

  function add(id: number) {
    setCart((c) => {
      const f = c.find((x) => x.id === id);
      if (f) return c.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x));
      return [...c, { id, qty: 1 }];
    });
    setDrawer(true);
  }
  function bump(id: number, d: 1 | -1) {
    setCart((c) =>
      c
        .map((x) => (x.id === id ? { ...x, qty: Math.max(0, x.qty + d) } : x))
        .filter((x) => x.qty > 0),
    );
  }

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
            onClick={() => setDrawer(true)}
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
            {count > 0 && (
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
                {count}
              </span>
            )}
          </button>
        </div>
      </header>

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
                    onClick={() => add(p.id)}
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

      {/* CART DRAWER */}
      {drawer && (
        <div
          onClick={() => setDrawer(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(20,12,5,0.45)",
            zIndex: 60,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <aside
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(420px, 100%)",
              background: C.surface,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: 20 }}>{t("cart.title")}</h3>
              <button
                onClick={() => setDrawer(false)}
                aria-label={t("aria.close")}
                style={{ background: "transparent", border: "none", cursor: "pointer" }}
              >
                <XMarkIcon style={{ width: 16, height: 16 }} />
              </button>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, overflowY: "auto" }}>
              {cart.length === 0 && (
                <p style={{ color: C.muted, fontSize: 13 }}>{t("cart.empty")}</p>
              )}
              {cart.map((line) => {
                const p = PRODUCTS.find((x) => x.id === line.id)!;
                return (
                  <div
                    key={line.id}
                    style={{ display: "flex", gap: 12, padding: 12, borderRadius: 12, background: C.bg }}
                  >
                    <div style={{ width: 60, height: 60, borderRadius: 8, background: p.img }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>${p.price}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
                        <button
                          onClick={() => bump(line.id, -1)}
                          aria-label={t("aria.decrease")}
                          style={{
                            width: 22,
                            height: 22,
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
                        <span style={{ fontSize: 13, fontWeight: 600, minWidth: 16, textAlign: "center" }}>
                          {line.qty}
                        </span>
                        <button
                          onClick={() => bump(line.id, 1)}
                          aria-label={t("aria.increase")}
                          style={{
                            width: 22,
                            height: 22,
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
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>${p.price * line.qty}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ color: C.muted, fontSize: 13 }}>{t("cart.subtotal")}</span>
                <span style={{ fontWeight: 700 }}>${total}</span>
              </div>
              <button
                style={{
                  width: "100%",
                  padding: 12,
                  background: C.accent,
                  color: "white",
                  border: "none",
                  borderRadius: 9999,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {t("cart.checkout")}
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
