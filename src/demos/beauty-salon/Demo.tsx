"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Scissors, Clock, User, Sparkle, Heart, Star } from "@phosphor-icons/react";

const C = {
  bg: "#fdf4ff",
  paper: "#ffffff",
  ink: "#3a0a3a",
  muted: "#7a4a7a",
  primary: "#a21caf",
  accent: "#e879f9",
  border: "#f0d3f0",
};

const SLOTS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

type TabId = "booking" | "services" | "stylists";
type CategoryKey = "hair" | "nails" | "skin" | "spa";

export function BeautySalonDemo() {
  const t = useTranslations("demoPreview.beauty-salon");
  const [tab, setTab] = useState<TabId>("booking");
  const [chosen, setChosen] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);

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
    },
    {
      name: t("roster.1.name"),
      specialties: t("roster.1.specialties"),
      rating: 4.8,
      nextSlot: t("roster.1.nextSlot"),
      tint: "#fbcfe8",
    },
    {
      name: t("roster.2.name"),
      specialties: t("roster.2.specialties"),
      rating: 5.0,
      nextSlot: t("roster.2.nextSlot"),
      tint: "#ddd6fe"
    },
    {
      name: t("roster.3.name"),
      specialties: t("roster.3.specialties"),
      rating: 4.7,
      nextSlot: t("roster.3.nextSlot"),
      tint: "#fde68a",
    },
    {
      name: t("roster.4.name"),
      specialties: t("roster.4.specialties"),
      rating: 4.9,
      nextSlot: t("roster.4.nextSlot"),
      tint: "#c7d2fe",
    },
  ];

  const TABS: { id: TabId; label: string; Icon: typeof Scissors }[] = [
    { id: "booking", label: t("nav.booking"), Icon: Sparkle },
    { id: "services", label: t("nav.services"), Icon: Scissors },
    { id: "stylists", label: t("nav.stylists"), Icon: User },
  ];

  const initials = (name: string) =>
    name
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("");

  return (
    <div style={{ background: C.bg, color: C.ink, minHeight: "100vh", fontFamily: "ui-sans-serif, system-ui" }}>
      <header style={{ background: C.paper, padding: "20px 32px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, background: C.primary, borderRadius: 12, display: "grid", placeItems: "center" }}>
            <Scissors weight="thin" style={{ width: 20, height: 20, color: "white" }} />
          </div>
          <div>
            <div style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 20 }}>{t("brand.name")}</div>
            <div style={{ fontSize: 11, color: C.muted, letterSpacing: 2, textTransform: "uppercase" }}>{t("brand.tagline")}</div>
          </div>
        </div>
        <button style={{ background: C.primary, color: "white", border: "none", padding: "10px 18px", borderRadius: 9999, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          {t("nav.signIn")}
        </button>
      </header>

      <nav
        style={{
          background: C.paper,
          borderBottom: `1px solid ${C.border}`,
          padding: "0 32px",
          display: "flex",
          gap: 4,
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {TABS.map((tabItem) => {
          const active = tab === tabItem.id;
          const Icon = tabItem.Icon;
          return (
            <button
              key={tabItem.id}
              onClick={() => setTab(tabItem.id)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "transparent",
                color: active ? C.primary : C.muted,
                border: "none",
                borderBottom: `2px solid ${active ? C.primary : "transparent"}`,
                padding: "14px 16px",
                fontWeight: 700,
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: 2,
                cursor: "pointer",
              }}
            >
              <Icon weight="thin" style={{ width: 16, height: 16 }} />
              {tabItem.label}
            </button>
          );
        })}
      </nav>

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: 32 }}>
        {tab === "booking" && (
          <>
            <section style={{ textAlign: "center", padding: "40px 0" }}>
              <span style={{ fontSize: 11, color: C.primary, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700 }}>
                {t("hero.eyebrow")}
              </span>
              <h1 style={{ fontFamily: "Georgia, serif", fontSize: 48, lineHeight: 1.05, margin: "12px auto", maxWidth: 600 }}>
                {t("hero.title")}
              </h1>
              <p style={{ color: C.muted, maxWidth: 540, margin: "0 auto" }}>
                {t("hero.subtitle")}
              </p>
            </section>

            <section style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24 }}>
              <div>
                <h2 style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700, marginBottom: 14 }}>
                  {t("services.heading")}
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {SERVICES.map((s) => {
                    const active = chosen === s.name;
                    return (
                      <button
                        key={s.name}
                        onClick={() => setChosen(s.name)}
                        style={{
                          textAlign: "left",
                          background: active ? C.primary : C.paper,
                          color: active ? "white" : C.ink,
                          border: `1px solid ${active ? C.primary : C.border}`,
                          borderRadius: 14,
                          padding: 16,
                          cursor: "pointer",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                          <span style={{ fontWeight: 700, fontSize: 15 }}>{s.name}</span>
                          <span style={{ fontWeight: 800, fontSize: 17 }}>${s.price}</span>
                        </div>
                        <div style={{ marginTop: 8, display: "flex", gap: 12, fontSize: 12, opacity: active ? 0.9 : 0.7 }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                            <Clock weight="thin" style={{ width: 12, height: 12 }} /> {s.duration}
                          </span>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                            <User weight="thin" style={{ width: 12, height: 12 }} /> {t("services.withStylist", { stylist: s.stylist })}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <aside style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 16, padding: 22, position: "sticky", top: 24, alignSelf: "start" }}>
                <h2 style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 700 }}>{t("booking.heading")}</h2>
                <div style={{ marginTop: 12, padding: 14, background: C.bg, borderRadius: 10 }}>
                  <div style={{ fontSize: 11, color: C.primary, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>{t("booking.serviceLabel")}</div>
                  <div style={{ marginTop: 4, fontWeight: 600 }}>{chosen ?? t("booking.servicePlaceholder")}</div>
                </div>
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontSize: 11, color: C.primary, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>
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
                          onClick={() => setTime(s)}
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
                  <Heart weight="thin" style={{ width: 11, height: 11, display: "inline", marginRight: 4, color: C.accent, fill: C.accent, verticalAlign: -1 }} />
                  {t("booking.noCard")}
                </p>
              </aside>
            </section>
          </>
        )}

        {tab === "services" && (
          <section style={{ padding: "24px 0" }}>
            <span style={{ fontSize: 11, color: C.primary, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700 }}>
              {t("menu.eyebrow")}
            </span>
            <h1 style={{ fontFamily: "Georgia, serif", fontSize: 36, margin: "8px 0 6px" }}>{t("menu.title")}</h1>
            <p style={{ color: C.muted, marginBottom: 28, maxWidth: 600 }}>{t("menu.subtitle")}</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              {MENU.map(({ category, items }) => {
                const Icon = CATEGORY_ICON[category];
                return (
                  <div
                    key={category}
                    style={{
                      background: C.paper,
                      border: `1px solid ${C.border}`,
                      borderRadius: 18,
                      padding: 22,
                    }}
                  >
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
                      <div>
                        <div style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 18 }}>
                          {t(`menu.categories.${category}`)}
                        </div>
                        <div style={{ fontSize: 10, color: C.muted, letterSpacing: 2, textTransform: "uppercase" }}>
                          {t("menu.itemCount", { count: items.length })}
                        </div>
                      </div>
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
                            <div style={{ fontSize: 11, color: C.muted, display: "inline-flex", alignItems: "center", gap: 4, marginTop: 4 }}>
                              <Clock weight="thin" style={{ width: 11, height: 11 }} /> {item.duration}
                            </div>
                          </div>
                          <span style={{ fontWeight: 800, fontSize: 16, color: C.primary }}>${item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {tab === "stylists" && (
          <section style={{ padding: "24px 0" }}>
            <span style={{ fontSize: 11, color: C.primary, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700 }}>
              {t("roster.eyebrow")}
            </span>
            <h1 style={{ fontFamily: "Georgia, serif", fontSize: 36, margin: "8px 0 6px" }}>{t("roster.title")}</h1>
            <p style={{ color: C.muted, marginBottom: 28, maxWidth: 600 }}>{t("roster.subtitle")}</p>

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
                    <div>
                      <div style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 17 }}>{person.name}</div>
                      <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{person.specialties}</div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "6px 10px",
                      background: C.bg,
                      borderRadius: 999,
                      alignSelf: "flex-start",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    <Star weight="thin" style={{ width: 14, height: 14, color: C.primary, fill: C.primary }} />
                    {person.rating.toFixed(1)}
                    <span style={{ color: C.muted, fontWeight: 500, marginLeft: 4 }}>{t("roster.ratingLabel")}</span>
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
                      <div style={{ fontSize: 10, color: C.primary, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
                        {t("roster.nextAvailable")}
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 14, marginTop: 2 }}>{person.nextSlot}</div>
                    </div>
                    <Clock weight="thin" style={{ width: 22, height: 22, color: C.primary }} />
                  </div>

                  <button
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
      </main>
    </div>
  );
}
