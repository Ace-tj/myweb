"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AirplaneTilt, MapPin, CalendarBlank, Users, Star, ArrowRight } from "@phosphor-icons/react";

const C = {
  bg: "#f0f9ff",
  paper: "#ffffff",
  ink: "#082f49",
  muted: "#4a647d",
  primary: "#0891b2",
  accent: "#f59e0b",
  border: "#bfdbf7",
};

export function TravelAgencyDemo() {
  const t = useTranslations("demoPreview.travel-agency");
  const [tab, setTab] = useState<"discover" | "bookings">("discover");

  const TOURS = [
    { key: "pamir", title: t("tours.pamir.title"), from: t("tours.pamir.from"), price: 1480, img: "linear-gradient(135deg,#0891b2,#082f49)", rating: 4.9, reviews: 184 },
    { key: "samarkand", title: t("tours.samarkand.title"), from: t("tours.samarkand.from"), price: 920, img: "linear-gradient(135deg,#0e7490,#155e75)", rating: 4.8, reviews: 312 },
    { key: "iskanderkul", title: t("tours.iskanderkul.title"), from: t("tours.iskanderkul.from"), price: 380, img: "linear-gradient(135deg,#0284c7,#0c4a6e)", rating: 4.7, reviews: 92 },
    { key: "wakhan", title: t("tours.wakhan.title"), from: t("tours.wakhan.from"), price: 1120, img: "linear-gradient(135deg,#0369a1,#075985)", rating: 4.9, reviews: 76 },
  ];

  const statusConfirmed = t("bookings.status.confirmed");
  const statusPending = t("bookings.status.pendingPayment");
  const statusQuote = t("bookings.status.quoteSent");

  const BOOKINGS = [
    { code: "TR-7821", tour: t("tours.pamir.title"), traveler: "Alibek M.", dates: "Jun 02–Jun 10", paid: 2960, status: statusConfirmed },
    { code: "TR-7822", tour: t("bookings.items.samarkandShort"), traveler: "Tanya & Olga K.", dates: "Jun 04–Jun 09", paid: 1840, status: statusConfirmed },
    { code: "TR-7823", tour: t("bookings.items.iskanderkulShort"), traveler: "Yusuf D.", dates: "May 28–May 30", paid: 380, status: statusPending },
    { code: "TR-7824", tour: t("bookings.items.wakhanShort"), traveler: "Lars & Mia P.", dates: "Jun 18–Jun 24", paid: 0, status: statusQuote },
  ];

  return (
    <div style={{ background: C.bg, color: C.ink, minHeight: "100vh", fontFamily: "ui-sans-serif, system-ui" }}>
      <header style={{ background: C.paper, padding: "18px 32px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: C.primary, borderRadius: 10, display: "grid", placeItems: "center" }}>
            <AirplaneTilt weight="light" style={{ width: 20, height: 20, color: "white" }} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 17 }}>{t("brand.name")}</div>
            <div style={{ fontSize: 11, color: C.muted, letterSpacing: 1, textTransform: "uppercase" }}>{t("brand.tagline")}</div>
          </div>
        </div>
        <nav style={{ display: "flex", gap: 6 }}>
          {[
            { id: "discover", label: t("nav.discover") },
            { id: "bookings", label: t("nav.bookings") },
          ].map((tab2) => (
            <button
              key={tab2.id}
              onClick={() => setTab(tab2.id as typeof tab)}
              style={{
                background: tab === tab2.id ? C.primary : "transparent",
                color: tab === tab2.id ? "white" : C.muted,
                border: "none",
                padding: "8px 16px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {tab2.label}
            </button>
          ))}
        </nav>
      </header>

      <main style={{ padding: 32, maxWidth: 1300, margin: "0 auto" }}>
        {tab === "discover" && (
          <>
            <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 16, padding: 16, display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 120px", gap: 10, alignItems: "center", marginBottom: 22 }}>
              {[
                { Icon: MapPin, label: t("search.from"), v: t("search.fromValue") },
                { Icon: MapPin, label: t("search.destination"), v: t("search.destinationValue") },
                { Icon: CalendarBlank, label: t("search.departure"), v: t("search.departureValue") },
                { Icon: Users, label: t("search.travelers"), v: t("search.travelersValue") },
              ].map((f) => (
                <div key={f.label} style={{ background: C.bg, borderRadius: 10, padding: "10px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>
                    <f.Icon weight="light" style={{ width: 12, height: 12 }} />
                    {f.label}
                  </div>
                  <div style={{ marginTop: 4, fontSize: 14, fontWeight: 600 }}>{f.v}</div>
                </div>
              ))}
              <button style={{ background: C.primary, color: "white", border: "none", borderRadius: 10, padding: "12px 18px", fontWeight: 700, cursor: "pointer" }}>
                {t("search.button")}
              </button>
            </div>

            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 14 }}>{t("featured.heading")}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}>
              {TOURS.map((tour) => (
                <article key={tour.key} style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                  <div style={{ aspectRatio: "16/10", background: tour.img, position: "relative" }}>
                    <span style={{ position: "absolute", top: 12, left: 12, background: C.accent, color: "#0c1d2c", padding: "3px 10px", borderRadius: 9999, fontSize: 11, fontWeight: 700 }}>
                      {t("featured.bestseller")}
                    </span>
                  </div>
                  <div style={{ padding: 16, flex: 1, display: "flex", flexDirection: "column" }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700 }}>{tour.title}</h3>
                    <div style={{ fontSize: 12, color: C.muted, marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
                      <MapPin weight="light" style={{ width: 12, height: 12 }} /> {t("featured.fromPrefix")} {tour.from}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8, fontSize: 12 }}>
                      <Star weight="light" style={{ width: 14, height: 14, color: C.accent, fill: C.accent }} />
                      <strong>{tour.rating}</strong>
                      <span style={{ color: C.muted }}>· {tour.reviews} {t("featured.reviews")}</span>
                    </div>
                    <div style={{ marginTop: "auto", paddingTop: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <span style={{ fontSize: 11, color: C.muted }}>{t("featured.fromLabel")}</span>
                        <div style={{ fontWeight: 800, fontSize: 20, color: C.primary }}>${tour.price}</div>
                      </div>
                      <button style={{ background: C.ink, color: "white", border: "none", padding: "8px 14px", borderRadius: 9999, fontWeight: 600, fontSize: 12, display: "inline-flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
                        {t("featured.view")} <ArrowRight weight="light" style={{ width: 12, height: 12 }} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {tab === "bookings" && (
          <>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 14 }}>{t("bookings.heading")}</h2>
            <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14 }}>
              {BOOKINGS.map((b, i) => (
                <div key={b.code} style={{ display: "grid", gridTemplateColumns: "100px 1.5fr 1.2fr 1fr 100px 130px", padding: "16px 20px", borderTop: i === 0 ? "none" : `1px solid ${C.border}`, fontSize: 14, alignItems: "center", gap: 10 }}>
                  <span style={{ fontWeight: 700, color: C.primary }}>{b.code}</span>
                  <span>{b.tour}</span>
                  <span style={{ color: C.muted }}>{b.traveler}</span>
                  <span style={{ color: C.muted, fontSize: 12 }}>{b.dates}</span>
                  <span style={{ fontWeight: 700 }}>${b.paid.toLocaleString()}</span>
                  <span
                    style={{
                      background: b.status === statusConfirmed ? "#d1fae5" : b.status === statusPending ? "#fef3c7" : "#dbeafe",
                      color: b.status === statusConfirmed ? "#065f46" : b.status === statusPending ? "#92400e" : "#1e40af",
                      padding: "4px 10px",
                      borderRadius: 9999,
                      fontSize: 11,
                      fontWeight: 700,
                      textAlign: "center",
                    }}
                  >
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
