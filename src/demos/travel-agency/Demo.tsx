"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  AirplaneTilt,
  MapPin,
  CalendarBlank,
  Users,
  Star,
  ArrowRight,
  Compass,
  Bed,
  ForkKnife,
  Path,
} from "@phosphor-icons/react";
import {
  DemoTopBar,
  DemoStatusBar,
  DemoKpiStrip,
  DemoScreenHeader,
  DemoBadge,
} from "@/components/demo-shell";

const C = {
  bg: "#f0f9ff",
  paper: "#ffffff",
  ink: "#082f49",
  muted: "#4a647d",
  primary: "#0891b2",
  accent: "#f59e0b",
  border: "#bfdbf7",
};

const palette = {
  bg: C.bg,
  paper: C.paper,
  ink: C.ink,
  muted: C.muted,
  primary: C.primary,
  border: C.border,
};

type TabId = "tours" | "bookings" | "itinerary" | "customers";

export function TravelAgencyDemo() {
  const t = useTranslations("demoPreview.travel-agency");
  const [tab, setTab] = useState<TabId>("tours");

  const TOURS = [
    { key: "pamir", title: t("tours.pamir.title"), from: t("tours.pamir.from"), price: 1480, img: "linear-gradient(135deg,#0891b2,#082f49)", rating: 4.9, reviews: 184 },
    { key: "samarkand", title: t("tours.samarkand.title"), from: t("tours.samarkand.from"), price: 920, img: "linear-gradient(135deg,#0e7490,#155e75)", rating: 4.8, reviews: 312 },
    { key: "iskanderkul", title: t("tours.iskanderkul.title"), from: t("tours.iskanderkul.from"), price: 380, img: "linear-gradient(135deg,#0284c7,#0c4a6e)", rating: 4.7, reviews: 92 },
    { key: "wakhan", title: t("tours.wakhan.title"), from: t("tours.wakhan.from"), price: 1120, img: "linear-gradient(135deg,#0369a1,#075985)", rating: 4.9, reviews: 76 },
  ];

  const statusConfirmed = t("bookings.status.confirmed");
  const statusPaid = t("bookings.status.paid");
  const statusCancelled = t("bookings.status.cancelled");

  const BOOKINGS = [
    { code: "TR-7821", customer: "Alibek Mirzoev",       tour: t("tours.pamir.title"),       depart: "Jun 02, 2026", party: 2, total: 2960, status: "paid" },
    { code: "TR-7822", customer: "Tanya & Olga K.",      tour: t("bookings.items.samarkandShort"), depart: "Jun 04, 2026", party: 2, total: 1840, status: "paid" },
    { code: "TR-7823", customer: "Yusuf Davlatov",       tour: t("bookings.items.iskanderkulShort"), depart: "May 28, 2026", party: 1, total: 380,  status: "confirmed" },
    { code: "TR-7824", customer: "Lars & Mia Petersen",  tour: t("bookings.items.wakhanShort"),    depart: "Jun 18, 2026", party: 2, total: 2240, status: "confirmed" },
    { code: "TR-7825", customer: "Hiroshi Tanaka",       tour: t("tours.pamir.title"),       depart: "Jul 03, 2026", party: 1, total: 1480, status: "paid" },
    { code: "TR-7826", customer: "Familie Becker",       tour: t("tours.samarkand.title"),   depart: "Jul 10, 2026", party: 4, total: 3680, status: "pending" },
    { code: "TR-7827", customer: "Aigerim S.",           tour: t("tours.iskanderkul.title"), depart: "Jul 12, 2026", party: 3, total: 1140, status: "cancelled" },
    { code: "TR-7828", customer: "Marco & Elena Rossi",  tour: t("tours.wakhan.title"),      depart: "Aug 04, 2026", party: 2, total: 2240, status: "confirmed" },
    { code: "TR-7829", customer: "Sophie Laurent",       tour: t("tours.pamir.title"),       depart: "Aug 15, 2026", party: 1, total: 1480, status: "paid" },
    { code: "TR-7830", customer: "James O'Brien",        tour: t("tours.samarkand.title"),   depart: "Sep 02, 2026", party: 2, total: 1840, status: "pending" },
  ];

  const BOOKING_STATUS: Record<
    string,
    { variant: "success" | "info" | "warn" | "danger"; label: string }
  > = {
    confirmed: { variant: "info", label: statusConfirmed },
    paid: { variant: "success", label: statusPaid },
    pending: { variant: "warn", label: t("bookings.status.pending") },
    cancelled: { variant: "danger", label: statusCancelled },
  };

  const ITINERARY = [
    { day: 1, location: t("itinerary.days.d1.location"), activity: t("itinerary.days.d1.activity"), hotel: t("itinerary.days.d1.hotel"), meals: t("itinerary.days.d1.meals") },
    { day: 2, location: t("itinerary.days.d2.location"), activity: t("itinerary.days.d2.activity"), hotel: t("itinerary.days.d2.hotel"), meals: t("itinerary.days.d2.meals") },
    { day: 3, location: t("itinerary.days.d3.location"), activity: t("itinerary.days.d3.activity"), hotel: t("itinerary.days.d3.hotel"), meals: t("itinerary.days.d3.meals") },
    { day: 4, location: t("itinerary.days.d4.location"), activity: t("itinerary.days.d4.activity"), hotel: t("itinerary.days.d4.hotel"), meals: t("itinerary.days.d4.meals") },
    { day: 5, location: t("itinerary.days.d5.location"), activity: t("itinerary.days.d5.activity"), hotel: t("itinerary.days.d5.hotel"), meals: t("itinerary.days.d5.meals") },
    { day: 6, location: t("itinerary.days.d6.location"), activity: t("itinerary.days.d6.activity"), hotel: t("itinerary.days.d6.hotel"), meals: t("itinerary.days.d6.meals") },
    { day: 7, location: t("itinerary.days.d7.location"), activity: t("itinerary.days.d7.activity"), hotel: t("itinerary.days.d7.hotel"), meals: t("itinerary.days.d7.meals") },
  ];

  const CUSTOMERS = [
    { name: "Alibek Mirzoev",      country: t("customers.countries.tj"), trips: 6, ltv: 8640 },
    { name: "Hiroshi Tanaka",      country: t("customers.countries.jp"), trips: 4, ltv: 6120 },
    { name: "Sophie Laurent",      country: t("customers.countries.fr"), trips: 5, ltv: 7280 },
    { name: "Marco Rossi",         country: t("customers.countries.it"), trips: 3, ltv: 4480 },
    { name: "Lars Petersen",       country: t("customers.countries.dk"), trips: 4, ltv: 5360 },
    { name: "James O'Brien",       country: t("customers.countries.ie"), trips: 2, ltv: 2960 },
    { name: "Aigerim S.",          country: t("customers.countries.kz"), trips: 3, ltv: 3420 },
    { name: "Familie Becker",      country: t("customers.countries.de"), trips: 2, ltv: 5440 },
  ];

  const TABS: { id: TabId; label: string; Icon: typeof AirplaneTilt }[] = [
    { id: "tours",     label: t("nav.tours"),     Icon: AirplaneTilt },
    { id: "bookings",  label: t("nav.bookings"),  Icon: MapPin },
    { id: "itinerary", label: t("nav.itinerary"), Icon: Compass },
    { id: "customers", label: t("nav.customers"), Icon: Users },
  ];

  const breadcrumb =
    tab === "tours"
      ? t("breadcrumb.tours")
      : tab === "bookings"
        ? t("breadcrumb.bookings")
        : tab === "itinerary"
          ? t("breadcrumb.itinerary")
          : t("breadcrumb.customers");

  const screenEyebrow =
    tab === "tours"
      ? t("screen.tours.eyebrow")
      : tab === "bookings"
        ? t("screen.bookings.eyebrow")
        : tab === "itinerary"
          ? t("screen.itinerary.eyebrow")
          : t("screen.customers.eyebrow");

  const screenTitle =
    tab === "tours"
      ? t("screen.tours.title")
      : tab === "bookings"
        ? t("screen.bookings.title")
        : tab === "itinerary"
          ? t("screen.itinerary.title")
          : t("screen.customers.title");

  const screenSubtitle =
    tab === "tours"
      ? t("screen.tours.subtitle")
      : tab === "bookings"
        ? t("screen.bookings.subtitle")
        : tab === "itinerary"
          ? t("screen.itinerary.subtitle")
          : t("screen.customers.subtitle");

  const kpiItems: { label: string; value: string; trend: string; spark: number[] }[] =
    tab === "tours"
      ? [
          { label: t("kpi.tours.0.label"), value: t("kpi.tours.0.value"), trend: t("kpi.tours.0.trend"), spark: [18, 20, 22, 24, 26, 28, 30, 32] },
          { label: t("kpi.tours.1.label"), value: t("kpi.tours.1.value"), trend: t("kpi.tours.1.trend"), spark: [240, 280, 320, 360, 410, 440, 470, 510] },
          { label: t("kpi.tours.2.label"), value: t("kpi.tours.2.value"), trend: t("kpi.tours.2.trend"), spark: [62, 66, 68, 72, 74, 78, 80, 84] },
          { label: t("kpi.tours.3.label"), value: t("kpi.tours.3.value"), trend: t("kpi.tours.3.trend"), spark: [2, 2, 3, 2, 3, 3, 4, 3] },
        ]
      : tab === "bookings"
        ? [
            { label: t("kpi.bookings.0.label"), value: t("kpi.bookings.0.value"), trend: t("kpi.bookings.0.trend"), spark: [22, 28, 32, 36, 40, 44, 48, 52] },
            { label: t("kpi.bookings.1.label"), value: t("kpi.bookings.1.value"), trend: t("kpi.bookings.1.trend"), spark: [38, 42, 48, 52, 58, 62, 68, 74] },
            { label: t("kpi.bookings.2.label"), value: t("kpi.bookings.2.value"), trend: t("kpi.bookings.2.trend"), spark: [3.2, 3.4, 3.5, 3.7, 3.8, 4.0, 4.1, 4.3] },
            { label: t("kpi.bookings.3.label"), value: t("kpi.bookings.3.value"), trend: t("kpi.bookings.3.trend"), spark: [4, 3, 3, 2, 3, 2, 2, 2] },
          ]
        : tab === "itinerary"
          ? [
              { label: t("kpi.itinerary.0.label"), value: t("kpi.itinerary.0.value"), trend: t("kpi.itinerary.0.trend"), spark: [5, 6, 6, 7, 7, 7, 8, 8] },
              { label: t("kpi.itinerary.1.label"), value: t("kpi.itinerary.1.value"), trend: t("kpi.itinerary.1.trend"), spark: [12, 14, 15, 16, 18, 19, 20, 22] },
              { label: t("kpi.itinerary.2.label"), value: t("kpi.itinerary.2.value"), trend: t("kpi.itinerary.2.trend"), spark: [6, 7, 8, 9, 10, 10, 11, 12] },
              { label: t("kpi.itinerary.3.label"), value: t("kpi.itinerary.3.value"), trend: t("kpi.itinerary.3.trend"), spark: [40, 48, 60, 72, 86, 94, 88, 76] },
            ]
          : [
              { label: t("kpi.customers.0.label"), value: t("kpi.customers.0.value"), trend: t("kpi.customers.0.trend"), spark: [180, 220, 260, 300, 340, 380, 420, 460] },
              { label: t("kpi.customers.1.label"), value: t("kpi.customers.1.value"), trend: t("kpi.customers.1.trend"), spark: [22, 24, 26, 28, 29, 31, 32, 34] },
              { label: t("kpi.customers.2.label"), value: t("kpi.customers.2.value"), trend: t("kpi.customers.2.trend"), spark: [12, 14, 15, 17, 18, 20, 21, 23] },
              { label: t("kpi.customers.3.label"), value: t("kpi.customers.3.value"), trend: t("kpi.customers.3.trend"), spark: [48, 52, 56, 58, 60, 62, 64, 66] },
            ];

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
        brandMark={
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
            <AirplaneTilt weight="light" size={16} style={{ color: C.paper }} />
          </div>
        }
        breadcrumb={breadcrumb}
        searchPlaceholder={t("shell.searchPlaceholder")}
        userName={t("shell.userName")}
        userInitials={t("shell.userInitials")}
      />

      <nav
        style={{
          background: C.paper,
          borderBottom: `1px solid ${C.border}`,
          padding: "10px 24px",
          display: "flex",
          gap: 6,
        }}
      >
        {TABS.map((tab2) => (
          <button
            key={tab2.id}
            onClick={() => setTab(tab2.id)}
            style={{
              background: tab === tab2.id ? C.primary : "transparent",
              color: tab === tab2.id ? "white" : C.muted,
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
            <tab2.Icon weight="light" style={{ width: 14, height: 14 }} />
            {tab2.label}
          </button>
        ))}
      </nav>

      <main style={{ padding: 32, maxWidth: 1300, margin: "0 auto", width: "100%", flex: 1 }}>
        <DemoScreenHeader
          palette={palette}
          eyebrow={screenEyebrow}
          title={screenTitle}
          subtitle={screenSubtitle}
          rightSlot={
            tab === "itinerary" ? (
              <button
                style={{
                  background: C.primary,
                  color: "white",
                  border: "none",
                  borderRadius: 10,
                  padding: "10px 16px",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Path weight="light" style={{ width: 14, height: 14 }} />
                {t("itinerary.addDay")}
              </button>
            ) : undefined
          }
        />

        <DemoKpiStrip palette={palette} items={kpiItems} />

        {tab === "tours" && (
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
          <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "100px 1.4fr 1.4fr 1.1fr 80px 100px 120px", padding: "12px 20px", background: C.bg, fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700, gap: 10 }}>
              <span>{t("bookings.cols.code")}</span>
              <span>{t("bookings.cols.customer")}</span>
              <span>{t("bookings.cols.tour")}</span>
              <span>{t("bookings.cols.departure")}</span>
              <span>{t("bookings.cols.party")}</span>
              <span>{t("bookings.cols.total")}</span>
              <span style={{ textAlign: "center" }}>{t("bookings.cols.status")}</span>
            </div>
            {BOOKINGS.map((b, i) => {
              const s = BOOKING_STATUS[b.status];
              return (
                <div key={b.code} style={{ display: "grid", gridTemplateColumns: "100px 1.4fr 1.4fr 1.1fr 80px 100px 120px", padding: "16px 20px", borderTop: i === 0 ? "none" : `1px solid ${C.border}`, fontSize: 14, alignItems: "center", gap: 10 }}>
                  <span style={{ fontWeight: 700, color: C.primary }}>{b.code}</span>
                  <span>{b.customer}</span>
                  <span style={{ color: C.muted }}>{b.tour}</span>
                  <span style={{ color: C.muted, fontSize: 12 }}>{b.depart}</span>
                  <span style={{ fontSize: 13 }}>{b.party}</span>
                  <span style={{ fontWeight: 700 }}>${b.total.toLocaleString()}</span>
                  <span style={{ display: "inline-flex", justifyContent: "center" }}>
                    <DemoBadge palette={palette} variant={s.variant} label={s.label} />
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {tab === "itinerary" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {ITINERARY.map((d) => (
              <article key={d.day} style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, padding: 18, display: "grid", gridTemplateColumns: "70px 1fr 1fr 1fr 1fr", gap: 16, alignItems: "center" }}>
                <div style={{ background: C.primary, color: "white", borderRadius: 12, padding: "12px 0", textAlign: "center" }}>
                  <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1, opacity: 0.8 }}>{t("itinerary.dayLabel")}</div>
                  <div style={{ fontSize: 22, fontWeight: 800 }}>{d.day}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                    <MapPin weight="light" style={{ width: 12, height: 12 }} /> {t("itinerary.location")}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>{d.location}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                    <Compass weight="light" style={{ width: 12, height: 12 }} /> {t("itinerary.activity")}
                  </div>
                  <div style={{ fontSize: 13, marginTop: 4 }}>{d.activity}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                    <Bed weight="light" style={{ width: 12, height: 12 }} /> {t("itinerary.hotel")}
                  </div>
                  <div style={{ fontSize: 13, marginTop: 4 }}>{d.hotel}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                    <ForkKnife weight="light" style={{ width: 12, height: 12 }} /> {t("itinerary.meals")}
                  </div>
                  <div style={{ fontSize: 13, marginTop: 4 }}>{d.meals}</div>
                </div>
              </article>
            ))}
          </div>
        )}

        {tab === "customers" && (
          <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1.1fr 0.9fr 1fr", padding: "12px 20px", background: C.bg, fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700, gap: 10 }}>
              <span>{t("customers.cols.name")}</span>
              <span>{t("customers.cols.country")}</span>
              <span>{t("customers.cols.trips")}</span>
              <span style={{ textAlign: "right" }}>{t("customers.cols.ltv")}</span>
            </div>
            {CUSTOMERS.map((c, i) => (
              <div key={c.name} style={{ display: "grid", gridTemplateColumns: "1.6fr 1.1fr 0.9fr 1fr", padding: "16px 20px", borderTop: i === 0 ? "none" : `1px solid ${C.border}`, fontSize: 14, alignItems: "center", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9999, background: C.bg, color: C.primary, display: "grid", placeItems: "center", fontWeight: 700, fontSize: 12 }}>
                    {c.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  </div>
                  <span style={{ fontWeight: 600 }}>{c.name}</span>
                </div>
                <span style={{ color: C.muted }}>{c.country}</span>
                <span>
                  <span style={{ background: C.bg, color: C.primary, padding: "3px 10px", borderRadius: 9999, fontSize: 12, fontWeight: 700 }}>
                    {c.trips} {t("customers.tripsSuffix")}
                  </span>
                </span>
                <span style={{ textAlign: "right", fontWeight: 700, color: C.primary }}>${c.ltv.toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </main>

      <DemoStatusBar
        palette={palette}
        version={t("shell.version")}
        region={t("shell.region")}
        buildId={t("shell.buildId")}
      />
    </div>
  );
}
