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
  MapTrifold,
  CreditCard,
  Truck,
  Calendar,
  ChartBar,
  Gear,
  Handshake,
  Storefront,
} from "@phosphor-icons/react";
import { demoImages } from "@/lib/demo-images";
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
  DemoCohort,
  DemoHeatmap,
  DemoLiveFeed,
  DemoToastProvider,
  useDemoToast,
  type PaletteItem,
} from "@/components/demo-shell/wow";

const C = {
  bg: "#f0f9ff",
  paper: "#ffffff",
  card: "#e0f2fe",
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

type TabId =
  | "tours"
  | "destinations"
  | "itinerary"
  | "bookings"
  | "customers"
  | "payments"
  | "vendors"
  | "calendar"
  | "analytics"
  | "settings";

type Group = "catalog" | "sales" | "ops";

export function TravelAgencyDemo() {
  return (
    <DemoToastProvider palette={palette}>
      <TravelInner />
    </DemoToastProvider>
  );
}

function TravelInner() {
  const t = useTranslations("demoPreview.travel-agency");
  const [tab, setTab] = useState<TabId>("tours");
  const toast = useDemoToast();

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

  const DESTINATIONS = [
    { key: "pamir",       gradient: "linear-gradient(135deg,#0891b2,#082f49)", tours: 8,  bookings: 142, rating: 4.9 },
    { key: "samarkand",   gradient: "linear-gradient(135deg,#0e7490,#155e75)", tours: 6,  bookings: 198, rating: 4.8 },
    { key: "wakhan",      gradient: "linear-gradient(135deg,#0369a1,#075985)", tours: 4,  bookings:  64, rating: 4.9 },
    { key: "iskanderkul", gradient: "linear-gradient(135deg,#0284c7,#0c4a6e)", tours: 3,  bookings:  88, rating: 4.7 },
    { key: "fann",        gradient: "linear-gradient(135deg,#0d9488,#134e4a)", tours: 5,  bookings:  72, rating: 4.8 },
    { key: "bukhara",     gradient: "linear-gradient(135deg,#06b6d4,#0e7490)", tours: 4,  bookings: 116, rating: 4.7 },
  ];

  const PAYMENTS = [
    { ref: "PI-39021", booking: "TR-7821", customer: "Alibek Mirzoev",      method: "card",     amount: 2960, dateKey: "may18", status: "captured" },
    { ref: "PI-39022", booking: "TR-7822", customer: "Tanya & Olga K.",     method: "card",     amount: 1840, dateKey: "may17", status: "captured" },
    { ref: "PI-39023", booking: "TR-7823", customer: "Yusuf Davlatov",      method: "transfer", amount:  380, dateKey: "may16", status: "pending"  },
    { ref: "PI-39024", booking: "TR-7824", customer: "Lars & Mia Petersen", method: "card",     amount: 1120, dateKey: "may15", status: "captured" },
    { ref: "PI-39025", booking: "TR-7825", customer: "Hiroshi Tanaka",      method: "card",     amount: 1480, dateKey: "may15", status: "captured" },
    { ref: "PI-39026", booking: "TR-7826", customer: "Familie Becker",      method: "transfer", amount: 1840, dateKey: "may14", status: "pending"  },
    { ref: "PI-39027", booking: "TR-7827", customer: "Aigerim S.",          method: "card",     amount: 1140, dateKey: "may13", status: "refunded" },
    { ref: "PI-39028", booking: "TR-7828", customer: "Marco & Elena Rossi", method: "card",     amount: 2240, dateKey: "may12", status: "captured" },
    { ref: "PI-39029", booking: "TR-7829", customer: "Sophie Laurent",      method: "wallet",   amount: 1480, dateKey: "may11", status: "captured" },
    { ref: "PI-39030", booking: "TR-7830", customer: "James O'Brien",       method: "card",     amount:  920, dateKey: "may10", status: "captured" },
  ];

  const PAYMENT_STATUS: Record<
    string,
    { variant: "success" | "warn" | "danger" | "neutral"; label: string }
  > = {
    captured: { variant: "success", label: t("payments.status.captured") },
    pending:  { variant: "warn",    label: t("payments.status.pending")  },
    refunded: { variant: "danger",  label: t("payments.status.refunded") },
  };

  const VENDORS = [
    { key: "karon",      type: "hotel",     city: "Kalaikhum",     contact: "Shoira N.",    rating: 4.7 },
    { key: "serena",     type: "hotel",     city: "Khorog",        contact: "Iskander M.",  rating: 4.9 },
    { key: "pamirHotel", type: "hotel",     city: "Murghab",       contact: "Bekzod R.",    rating: 4.5 },
    { key: "yurt",       type: "homestay",  city: "Karakul",       contact: "Toir B.",      rating: 4.8 },
    { key: "vakhshDrv",  type: "transport", city: "Dushanbe",      contact: "Davlat S.",    rating: 4.6 },
    { key: "panjGuide",  type: "guide",     city: "Khorog",        contact: "Nodira A.",    rating: 5.0 },
    { key: "iskandTrek", type: "guide",     city: "Iskanderkul",   contact: "Komron F.",    rating: 4.8 },
    { key: "samCater",   type: "catering",  city: "Samarkand",     contact: "Zarina H.",    rating: 4.7 },
  ];

  const VENDOR_TYPE_VARIANT: Record<string, "info" | "success" | "warn" | "neutral"> = {
    hotel: "info",
    homestay: "success",
    transport: "warn",
    guide: "info",
    catering: "neutral",
  };

  const CALENDAR_DEPARTURES = [
    { day: 28, mon: "May", code: "TR-7823", title: t("bookings.items.iskanderkulShort"), party: 1 },
    { day:  2, mon: "Jun", code: "TR-7821", title: t("tours.pamir.title"),                party: 2 },
    { day:  4, mon: "Jun", code: "TR-7822", title: t("bookings.items.samarkandShort"),    party: 2 },
    { day: 18, mon: "Jun", code: "TR-7824", title: t("bookings.items.wakhanShort"),       party: 2 },
    { day:  3, mon: "Jul", code: "TR-7825", title: t("tours.pamir.title"),                party: 1 },
    { day: 10, mon: "Jul", code: "TR-7826", title: t("tours.samarkand.title"),            party: 4 },
    { day: 15, mon: "Aug", code: "TR-7829", title: t("tours.pamir.title"),                party: 1 },
    { day:  2, mon: "Sep", code: "TR-7830", title: t("tours.samarkand.title"),            party: 2 },
  ];

  const initials = (name: string) =>
    name
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("");

  const TABS: { id: TabId; label: string; Icon: typeof AirplaneTilt; group: Group }[] = [
    { id: "tours",        label: t("nav.tours"),        Icon: AirplaneTilt, group: "catalog" },
    { id: "destinations", label: t("nav.destinations"), Icon: MapTrifold,   group: "catalog" },
    { id: "itinerary",    label: t("nav.itinerary"),    Icon: Compass,      group: "catalog" },
    { id: "bookings",     label: t("nav.bookings"),     Icon: MapPin,       group: "sales" },
    { id: "customers",    label: t("nav.customers"),    Icon: Users,        group: "sales" },
    { id: "payments",     label: t("nav.payments"),     Icon: CreditCard,   group: "sales" },
    { id: "vendors",      label: t("nav.vendors"),      Icon: Handshake,    group: "ops" },
    { id: "calendar",     label: t("nav.calendar"),     Icon: Calendar,     group: "ops" },
    { id: "analytics",    label: t("nav.analytics"),    Icon: ChartBar,     group: "ops" },
    { id: "settings",     label: t("nav.settings"),     Icon: Gear,         group: "ops" },
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
      <AirplaneTilt weight="light" size={16} style={{ color: C.paper }} />
    </div>
  );

  const toursKpis = [
    { label: t("kpi.tours.0.label"), value: t("kpi.tours.0.value"), trend: t("kpi.tours.0.trend"), spark: [18, 20, 22, 24, 26, 28, 30, 32] },
    { label: t("kpi.tours.1.label"), value: t("kpi.tours.1.value"), trend: t("kpi.tours.1.trend"), spark: [240, 280, 320, 360, 410, 440, 470, 510] },
    { label: t("kpi.tours.2.label"), value: t("kpi.tours.2.value"), trend: t("kpi.tours.2.trend"), spark: [62, 66, 68, 72, 74, 78, 80, 84] },
    { label: t("kpi.tours.3.label"), value: t("kpi.tours.3.value"), trend: t("kpi.tours.3.trend"), spark: [2, 2, 3, 2, 3, 3, 4, 3] },
  ];

  const bookingsKpis = [
    { label: t("kpi.bookings.0.label"), value: t("kpi.bookings.0.value"), trend: t("kpi.bookings.0.trend"), spark: [22, 28, 32, 36, 40, 44, 48, 52] },
    { label: t("kpi.bookings.1.label"), value: t("kpi.bookings.1.value"), trend: t("kpi.bookings.1.trend"), spark: [38, 42, 48, 52, 58, 62, 68, 74] },
    { label: t("kpi.bookings.2.label"), value: t("kpi.bookings.2.value"), trend: t("kpi.bookings.2.trend"), spark: [3.2, 3.4, 3.5, 3.7, 3.8, 4.0, 4.1, 4.3] },
    { label: t("kpi.bookings.3.label"), value: t("kpi.bookings.3.value"), trend: t("kpi.bookings.3.trend"), spark: [4, 3, 3, 2, 3, 2, 2, 2] },
  ];

  const itineraryKpis = [
    { label: t("kpi.itinerary.0.label"), value: t("kpi.itinerary.0.value"), trend: t("kpi.itinerary.0.trend"), spark: [5, 6, 6, 7, 7, 7, 8, 8] },
    { label: t("kpi.itinerary.1.label"), value: t("kpi.itinerary.1.value"), trend: t("kpi.itinerary.1.trend"), spark: [12, 14, 15, 16, 18, 19, 20, 22] },
    { label: t("kpi.itinerary.2.label"), value: t("kpi.itinerary.2.value"), trend: t("kpi.itinerary.2.trend"), spark: [6, 7, 8, 9, 10, 10, 11, 12] },
    { label: t("kpi.itinerary.3.label"), value: t("kpi.itinerary.3.value"), trend: t("kpi.itinerary.3.trend"), spark: [40, 48, 60, 72, 86, 94, 88, 76] },
  ];

  const customersKpis = [
    { label: t("kpi.customers.0.label"), value: t("kpi.customers.0.value"), trend: t("kpi.customers.0.trend"), spark: [180, 220, 260, 300, 340, 380, 420, 460] },
    { label: t("kpi.customers.1.label"), value: t("kpi.customers.1.value"), trend: t("kpi.customers.1.trend"), spark: [22, 24, 26, 28, 29, 31, 32, 34] },
    { label: t("kpi.customers.2.label"), value: t("kpi.customers.2.value"), trend: t("kpi.customers.2.trend"), spark: [12, 14, 15, 17, 18, 20, 21, 23] },
    { label: t("kpi.customers.3.label"), value: t("kpi.customers.3.value"), trend: t("kpi.customers.3.trend"), spark: [48, 52, 56, 58, 60, 62, 64, 66] },
  ];

  const destinationsKpis = [
    { label: t("kpi.destinations.0.label"), value: t("kpi.destinations.0.value"), trend: t("kpi.destinations.0.trend"), spark: [8, 9, 10, 11, 12, 13, 14, 14] },
    { label: t("kpi.destinations.1.label"), value: t("kpi.destinations.1.value"), trend: t("kpi.destinations.1.trend"), spark: [42, 56, 78, 102, 138, 168, 182, 198] },
    { label: t("kpi.destinations.2.label"), value: t("kpi.destinations.2.value"), trend: t("kpi.destinations.2.trend"), spark: [3, 4, 4, 5, 5, 6, 6, 6] },
    { label: t("kpi.destinations.3.label"), value: t("kpi.destinations.3.value"), trend: t("kpi.destinations.3.trend"), spark: [40, 50, 62, 74, 88, 96, 94, 88] },
  ];

  const paymentsKpis = [
    { label: t("kpi.payments.0.label"), value: t("kpi.payments.0.value"), trend: t("kpi.payments.0.trend"), spark: [12, 18, 24, 32, 38, 46, 54, 62] },
    { label: t("kpi.payments.1.label"), value: t("kpi.payments.1.value"), trend: t("kpi.payments.1.trend"), spark: [88, 90, 91, 92, 93, 94, 94, 95] },
    { label: t("kpi.payments.2.label"), value: t("kpi.payments.2.value"), trend: t("kpi.payments.2.trend"), spark: [3, 4, 3, 2, 3, 2, 2, 2] },
    { label: t("kpi.payments.3.label"), value: t("kpi.payments.3.value"), trend: t("kpi.payments.3.trend"), spark: [1.8, 1.9, 2.0, 2.1, 2.1, 2.2, 2.2, 2.3] },
  ];

  const vendorsKpis = [
    { label: t("kpi.vendors.0.label"), value: t("kpi.vendors.0.value"), trend: t("kpi.vendors.0.trend"), spark: [14, 16, 18, 20, 22, 24, 26, 28] },
    { label: t("kpi.vendors.1.label"), value: t("kpi.vendors.1.value"), trend: t("kpi.vendors.1.trend"), spark: [4.3, 4.4, 4.5, 4.6, 4.6, 4.7, 4.7, 4.8] },
    { label: t("kpi.vendors.2.label"), value: t("kpi.vendors.2.value"), trend: t("kpi.vendors.2.trend"), spark: [2, 2, 3, 3, 3, 4, 4, 4] },
    { label: t("kpi.vendors.3.label"), value: t("kpi.vendors.3.value"), trend: t("kpi.vendors.3.trend"), spark: [12, 14, 16, 16, 18, 18, 20, 21] },
  ];

  const calendarKpis = [
    { label: t("kpi.calendar.0.label"), value: t("kpi.calendar.0.value"), trend: t("kpi.calendar.0.trend"), spark: [6, 7, 8, 10, 12, 14, 16, 18] },
    { label: t("kpi.calendar.1.label"), value: t("kpi.calendar.1.value"), trend: t("kpi.calendar.1.trend"), spark: [4, 5, 6, 7, 8, 9, 10, 12] },
    { label: t("kpi.calendar.2.label"), value: t("kpi.calendar.2.value"), trend: t("kpi.calendar.2.trend"), spark: [2, 2, 3, 3, 4, 4, 5, 5] },
    { label: t("kpi.calendar.3.label"), value: t("kpi.calendar.3.value"), trend: t("kpi.calendar.3.trend"), spark: [40, 56, 72, 86, 94, 88, 76, 60] },
  ];

  const analyticsKpis = [
    { label: t("kpi.analytics.0.label"), value: t("kpi.analytics.0.value"), trend: t("kpi.analytics.0.trend"), spark: [12000, 13800, 15200, 17400, 19600, 21800, 23200, 24800] },
    { label: t("kpi.analytics.1.label"), value: t("kpi.analytics.1.value"), trend: t("kpi.analytics.1.trend"), spark: [38, 42, 46, 50, 54, 58, 62, 66] },
    { label: t("kpi.analytics.2.label"), value: t("kpi.analytics.2.value"), trend: t("kpi.analytics.2.trend"), spark: [2.1, 2.3, 2.4, 2.5, 2.7, 2.8, 2.9, 3.1] },
    { label: t("kpi.analytics.3.label"), value: t("kpi.analytics.3.value"), trend: t("kpi.analytics.3.trend"), spark: [58, 60, 62, 63, 64, 65, 65, 66] },
  ];

  const breadcrumb = t(`breadcrumb.${tab}`);
  const screenEyebrow = t(`screen.${tab}.eyebrow`);
  const screenTitle = t(`screen.${tab}.title`);
  const screenSubtitle = t(`screen.${tab}.subtitle`);

  const kpiByTab: Record<TabId, typeof toursKpis> = {
    tours: toursKpis,
    bookings: bookingsKpis,
    itinerary: itineraryKpis,
    customers: customersKpis,
    destinations: destinationsKpis,
    payments: paymentsKpis,
    vendors: vendorsKpis,
    calendar: calendarKpis,
    analytics: analyticsKpis,
    settings: [],
  };

  const INTEGRATIONS = [
    { name: "Stripe",      emoji: "💳", on: true,  descKey: "stripe" },
    { name: "Amadeus",     emoji: "✈️", on: true,  descKey: "amadeus" },
    { name: "WhatsApp",    emoji: "💬", on: true,  descKey: "whatsapp" },
    { name: "Mailchimp",   emoji: "✉️", on: false, descKey: "mailchimp" },
    { name: "Slack",       emoji: "🔔", on: true,  descKey: "slack" },
    { name: "Google Maps", emoji: "🗺️", on: false, descKey: "gmaps" },
  ];

  const SETTINGS_FIELDS = [
    { key: "agencyName" as const },
    { key: "currency"   as const },
    { key: "contact"    as const },
    { key: "license"    as const },
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
        brandMark={brandMark}
        breadcrumb={breadcrumb}
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
              <AirplaneTilt weight="light" size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15, letterSpacing: -0.4, color: C.ink }}>
                {t("brand.name")}
              </div>
              <div style={{ fontSize: 9, color: C.muted, letterSpacing: 2, textTransform: "uppercase" }}>
                {t("brand.tagline")}
              </div>
            </div>
          </div>

          {(["catalog", "sales", "ops"] as const).map((g) => (
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
                      <Icon weight="light" style={{ width: 14, height: 14 }} />
                      {tabItem.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          ))}
        </aside>

        <main style={{ flex: 1, padding: 32, maxWidth: 1400, margin: "0 auto", width: "100%" }}>
          <DemoScreenHeader
            palette={palette}
            eyebrow={screenEyebrow}
            title={screenTitle}
            subtitle={screenSubtitle}
            rightSlot={
              tab === "itinerary" ? (
                <button
                  onClick={() => toast.push({ title: t("toast.dayAdded"), tone: "success" })}
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
              ) : tab === "tours" ? (
                <button
                  onClick={() => toast.push({ title: t("toast.tourCreated"), tone: "success" })}
                  style={{
                    background: C.primary,
                    color: "white",
                    border: "none",
                    borderRadius: 10,
                    padding: "10px 16px",
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  {t("tours.newTour")}
                </button>
              ) : undefined
            }
          />

          {kpiByTab[tab].length > 0 && <DemoKpiStrip palette={palette} items={kpiByTab[tab]} />}

          {tab === "tours" && (
            <>
              <div
                style={{
                  background: C.paper,
                  border: `1px solid ${C.border}`,
                  borderRadius: 16,
                  padding: 16,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr 120px",
                  gap: 10,
                  alignItems: "center",
                  marginBottom: 22,
                }}
              >
                {[
                  { Icon: MapPin, label: t("search.from"), v: t("search.fromValue") },
                  { Icon: MapPin, label: t("search.destination"), v: t("search.destinationValue") },
                  { Icon: CalendarBlank, label: t("search.departure"), v: t("search.departureValue") },
                  { Icon: Users, label: t("search.travelers"), v: t("search.travelersValue") },
                ].map((f) => (
                  <div key={f.label} style={{ background: C.bg, borderRadius: 10, padding: "10px 14px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 10,
                        color: C.muted,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        fontWeight: 700,
                      }}
                    >
                      <f.Icon weight="light" style={{ width: 12, height: 12 }} />
                      {f.label}
                    </div>
                    <div style={{ marginTop: 4, fontSize: 14, fontWeight: 600 }}>{f.v}</div>
                  </div>
                ))}
                <button
                  onClick={() => toast.push({ title: t("toast.searchRun") })}
                  style={{
                    background: C.primary,
                    color: "white",
                    border: "none",
                    borderRadius: 10,
                    padding: "12px 18px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {t("search.button")}
                </button>
              </div>

              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 14 }}>{t("featured.heading")}</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}>
                {TOURS.map((tour, tIdx) => (
                  <article
                    key={tour.key}
                    style={{
                      background: C.paper,
                      border: `1px solid ${C.border}`,
                      borderRadius: 16,
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div style={{ aspectRatio: "16/10", background: tour.img, position: "relative", overflow: "hidden" }}>
                      <img
                        src={demoImages["travel-agency"].destinations[tIdx % demoImages["travel-agency"].destinations.length]}
                        alt=""
                        loading="lazy"
                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(135deg, rgba(8,47,73,0.35), rgba(8,145,178,0.25) 60%, rgba(8,47,73,0.55))",
                          pointerEvents: "none",
                        }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          top: 12,
                          left: 12,
                          background: C.accent,
                          color: "#0c1d2c",
                          padding: "3px 10px",
                          borderRadius: 9999,
                          fontSize: 11,
                          fontWeight: 700,
                        }}
                      >
                        {t("featured.bestseller")}
                      </span>
                    </div>
                    <div style={{ padding: 16, flex: 1, display: "flex", flexDirection: "column" }}>
                      <h3 style={{ fontSize: 16, fontWeight: 700 }}>{tour.title}</h3>
                      <div
                        style={{
                          fontSize: 12,
                          color: C.muted,
                          marginTop: 4,
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <MapPin weight="light" style={{ width: 12, height: 12 }} /> {t("featured.fromPrefix")} {tour.from}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8, fontSize: 12 }}>
                        <Star weight="light" style={{ width: 14, height: 14, color: C.accent, fill: C.accent }} />
                        <strong>{tour.rating}</strong>
                        <span style={{ color: C.muted }}>
                          · {tour.reviews} {t("featured.reviews")}
                        </span>
                      </div>
                      <div
                        style={{
                          marginTop: "auto",
                          paddingTop: 14,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <span style={{ fontSize: 11, color: C.muted }}>{t("featured.fromLabel")}</span>
                          <div style={{ fontWeight: 800, fontSize: 20, color: C.primary }}>
                            $<DemoCounter value={tour.price} />
                          </div>
                        </div>
                        <button
                          onClick={() => toast.push({ title: t("toast.tourOpened", { name: tour.title }) })}
                          style={{
                            background: C.ink,
                            color: "white",
                            border: "none",
                            padding: "8px 14px",
                            borderRadius: 9999,
                            fontWeight: 600,
                            fontSize: 12,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                            cursor: "pointer",
                          }}
                        >
                          {t("featured.view")} <ArrowRight weight="light" style={{ width: 12, height: 12 }} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}

          {tab === "destinations" && (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: 18,
                  marginBottom: 22,
                }}
              >
                {DESTINATIONS.map((d, dIdx) => (
                  <article
                    key={d.key}
                    style={{
                      background: C.paper,
                      border: `1px solid ${C.border}`,
                      borderRadius: 16,
                      overflow: "hidden",
                    }}
                  >
                    <div style={{ aspectRatio: "16/9", background: d.gradient, position: "relative", overflow: "hidden" }}>
                      <img
                        src={demoImages["travel-agency"].destinations[dIdx % demoImages["travel-agency"].destinations.length]}
                        alt=""
                        loading="lazy"
                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(180deg, rgba(8,47,73,0.10) 0%, rgba(8,145,178,0.20) 50%, rgba(8,47,73,0.70) 100%)",
                          pointerEvents: "none",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          left: 14,
                          bottom: 12,
                          color: "white",
                          fontWeight: 800,
                          fontSize: 18,
                          letterSpacing: -0.4,
                          textShadow: "0 1px 4px rgba(0,0,0,0.4)",
                        }}
                      >
                        {t(`destinations.list.${d.key}.name`)}
                      </div>
                    </div>
                    <div style={{ padding: 16 }}>
                      <div style={{ fontSize: 12, color: C.muted, marginBottom: 10 }}>
                        {t(`destinations.list.${d.key}.country`)}
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                        <div>
                          <div style={{ fontSize: 9, color: C.muted, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>
                            {t("destinations.tours")}
                          </div>
                          <div style={{ fontWeight: 800, fontSize: 18, color: C.ink, marginTop: 2 }}>
                            <DemoCounter value={d.tours} />
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: 9, color: C.muted, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>
                            {t("destinations.bookings")}
                          </div>
                          <div style={{ fontWeight: 800, fontSize: 18, color: C.primary, marginTop: 2 }}>
                            <DemoCounter value={d.bookings} />
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: 9, color: C.muted, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>
                            {t("destinations.rating")}
                          </div>
                          <div style={{ fontWeight: 800, fontSize: 18, color: C.accent, marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}>
                            <Star weight="fill" style={{ width: 14, height: 14, color: C.accent }} />
                            {d.rating}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div
                style={{
                  background: C.paper,
                  border: `1px solid ${C.border}`,
                  borderRadius: 14,
                  padding: 22,
                }}
              >
                <h3 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 6px" }}>{t("destinations.seasonalityTitle")}</h3>
                <p style={{ fontSize: 12, color: C.muted, margin: "0 0 16px" }}>{t("destinations.seasonalitySubtitle")}</p>
                <DemoHeatmap palette={palette} weeks={14} seed={9} ariaLabel={t("destinations.seasonalityTitle")} />
                <p style={{ marginTop: 12, color: C.muted, fontSize: 12 }}>{t("destinations.seasonalityNote")}</p>
              </div>
            </>
          )}

          {tab === "bookings" && (
            <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "100px 1.4fr 1.4fr 1.1fr 80px 100px 120px",
                  padding: "12px 20px",
                  background: C.bg,
                  fontSize: 10,
                  color: C.muted,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  fontWeight: 700,
                  gap: 10,
                }}
              >
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
                  <div
                    key={b.code}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "100px 1.4fr 1.4fr 1.1fr 80px 100px 120px",
                      padding: "16px 20px",
                      borderTop: i === 0 ? "none" : `1px solid ${C.border}`,
                      fontSize: 14,
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <span style={{ fontWeight: 700, color: C.primary }}>{b.code}</span>
                    <span>{b.customer}</span>
                    <span style={{ color: C.muted }}>{b.tour}</span>
                    <span style={{ color: C.muted, fontSize: 12 }}>{b.depart}</span>
                    <span style={{ fontSize: 13 }}>{b.party}</span>
                    <span style={{ fontWeight: 700 }}>
                      $<DemoCounter value={b.total} />
                    </span>
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
              {ITINERARY.map((d, iIdx) => (
                <article
                  key={d.day}
                  style={{
                    background: C.paper,
                    border: `1px solid ${C.border}`,
                    borderRadius: 14,
                    padding: 18,
                    display: "grid",
                    gridTemplateColumns: "70px 1fr 1fr 1fr 1fr",
                    gap: 16,
                    alignItems: "center",
                  }}
                >
                  <div style={{ position: "relative", color: "white", borderRadius: 12, padding: "12px 0", textAlign: "center", overflow: "hidden", minHeight: 70 }}>
                    <img
                      src={demoImages["travel-agency"].destinations[iIdx % demoImages["travel-agency"].destinations.length]}
                      alt=""
                      loading="lazy"
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(135deg, rgba(8,145,178,0.78), rgba(8,47,73,0.82))",
                        pointerEvents: "none",
                      }}
                    />
                    <div style={{ position: "relative", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, opacity: 0.9 }}>
                      {t("itinerary.dayLabel")}
                    </div>
                    <div style={{ position: "relative", fontSize: 22, fontWeight: 800 }}>{d.day}</div>
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
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.6fr 1.1fr 0.9fr 1fr",
                  padding: "12px 20px",
                  background: C.bg,
                  fontSize: 10,
                  color: C.muted,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  fontWeight: 700,
                  gap: 10,
                }}
              >
                <span>{t("customers.cols.name")}</span>
                <span>{t("customers.cols.country")}</span>
                <span>{t("customers.cols.trips")}</span>
                <span style={{ textAlign: "right" }}>{t("customers.cols.ltv")}</span>
              </div>
              {CUSTOMERS.map((c, i) => (
                <div
                  key={c.name}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.6fr 1.1fr 0.9fr 1fr",
                    padding: "16px 20px",
                    borderTop: i === 0 ? "none" : `1px solid ${C.border}`,
                    fontSize: 14,
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 9999,
                        background: C.bg,
                        color: C.primary,
                        display: "grid",
                        placeItems: "center",
                        fontWeight: 700,
                        fontSize: 12,
                      }}
                    >
                      {initials(c.name)}
                    </div>
                    <span style={{ fontWeight: 600 }}>{c.name}</span>
                  </div>
                  <span style={{ color: C.muted }}>{c.country}</span>
                  <span>
                    <span
                      style={{
                        background: C.bg,
                        color: C.primary,
                        padding: "3px 10px",
                        borderRadius: 9999,
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      {c.trips} {t("customers.tripsSuffix")}
                    </span>
                  </span>
                  <span style={{ textAlign: "right", fontWeight: 700, color: C.primary }}>
                    $<DemoCounter value={c.ltv} />
                  </span>
                </div>
              ))}
            </div>
          )}

          {tab === "payments" && (
            <div style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "120px 100px 1.3fr 100px 100px 100px 110px",
                  padding: "12px 20px",
                  background: C.bg,
                  fontSize: 10,
                  color: C.muted,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  fontWeight: 700,
                  gap: 10,
                }}
              >
                <span>{t("payments.cols.ref")}</span>
                <span>{t("payments.cols.booking")}</span>
                <span>{t("payments.cols.customer")}</span>
                <span>{t("payments.cols.method")}</span>
                <span style={{ textAlign: "right" }}>{t("payments.cols.amount")}</span>
                <span>{t("payments.cols.date")}</span>
                <span style={{ textAlign: "center" }}>{t("payments.cols.status")}</span>
              </div>
              {PAYMENTS.map((p, i) => {
                const s = PAYMENT_STATUS[p.status];
                return (
                  <div
                    key={p.ref}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "120px 100px 1.3fr 100px 100px 100px 110px",
                      padding: "14px 20px",
                      borderTop: i === 0 ? "none" : `1px solid ${C.border}`,
                      fontSize: 13,
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <span style={{ fontFamily: "ui-monospace, monospace", fontWeight: 700, color: C.primary }}>{p.ref}</span>
                    <span style={{ fontFamily: "ui-monospace, monospace", color: C.muted, fontSize: 12 }}>{p.booking}</span>
                    <span>{p.customer}</span>
                    <span style={{ color: C.muted }}>{t(`payments.methods.${p.method}`)}</span>
                    <span style={{ textAlign: "right", fontWeight: 700 }}>
                      $<DemoCounter value={p.amount} />
                    </span>
                    <span style={{ color: C.muted, fontSize: 12 }}>{t(`payments.dates.${p.dateKey}`)}</span>
                    <span style={{ display: "inline-flex", justifyContent: "center" }}>
                      <DemoBadge palette={palette} variant={s.variant} label={s.label} />
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {tab === "vendors" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
              {VENDORS.map((v) => (
                <div
                  key={v.key}
                  style={{
                    background: C.paper,
                    border: `1px solid ${C.border}`,
                    borderRadius: 14,
                    padding: 18,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: C.bg,
                        color: C.primary,
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      {v.type === "hotel" ? (
                        <Bed weight="light" size={20} />
                      ) : v.type === "transport" ? (
                        <Truck weight="light" size={20} />
                      ) : v.type === "guide" ? (
                        <Compass weight="light" size={20} />
                      ) : v.type === "catering" ? (
                        <ForkKnife weight="light" size={20} />
                      ) : (
                        <Storefront weight="light" size={20} />
                      )}
                    </div>
                    <DemoBadge palette={palette} variant={VENDOR_TYPE_VARIANT[v.type]} label={t(`vendors.types.${v.type}`)} />
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 15 }}>{t(`vendors.list.${v.key}.name`)}</div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>
                    {v.city} · {v.contact}
                  </div>
                  <div
                    style={{
                      marginTop: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 12px",
                      background: C.bg,
                      borderRadius: 10,
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>
                      <Star weight="fill" style={{ width: 12, height: 12, color: C.accent }} />
                      {t("vendors.rating")}
                    </span>
                    <span style={{ fontWeight: 800, fontSize: 16 }}>{v.rating.toFixed(1)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "calendar" && (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 320px",
                  gap: 18,
                  marginBottom: 18,
                }}
              >
                <div
                  style={{
                    background: C.paper,
                    border: `1px solid ${C.border}`,
                    borderRadius: 14,
                    padding: 22,
                  }}
                >
                  <h3 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 6px" }}>{t("calendar.departuresTitle")}</h3>
                  <p style={{ fontSize: 12, color: C.muted, margin: "0 0 14px" }}>{t("calendar.departuresSubtitle")}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {CALENDAR_DEPARTURES.map((dep, depIdx) => (
                      <div
                        key={dep.code}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "70px 1fr 90px 60px",
                          alignItems: "center",
                          gap: 14,
                          padding: "10px 14px",
                          border: `1px solid ${C.border}`,
                          borderLeft: `4px solid ${C.primary}`,
                          borderRadius: 10,
                          background: C.bg,
                        }}
                      >
                        <div style={{ position: "relative", textAlign: "center", borderRadius: 8, overflow: "hidden", padding: "6px 0", minHeight: 56 }}>
                          <img
                            src={demoImages["travel-agency"].destinations[depIdx % demoImages["travel-agency"].destinations.length]}
                            alt=""
                            loading="lazy"
                            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              background: "linear-gradient(135deg, rgba(255,255,255,0.78), rgba(224,242,254,0.82))",
                              pointerEvents: "none",
                            }}
                          />
                          <div style={{ position: "relative", fontSize: 9, color: C.muted, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>
                            {t(`calendar.months.${dep.mon.toLowerCase()}`)}
                          </div>
                          <div style={{ position: "relative", fontSize: 22, fontWeight: 800, color: C.ink, letterSpacing: -0.5 }}>{dep.day}</div>
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 14 }}>{dep.title}</div>
                          <div style={{ fontSize: 11, color: C.muted, fontFamily: "ui-monospace, monospace", marginTop: 2 }}>{dep.code}</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, color: C.muted, fontSize: 12 }}>
                          <Users weight="light" style={{ width: 12, height: 12 }} />
                          {dep.party} {t("calendar.guests")}
                        </div>
                        <DemoBadge palette={palette} variant="info" label={t("calendar.confirmed")} />
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    background: C.paper,
                    border: `1px solid ${C.border}`,
                    borderRadius: 14,
                    padding: 22,
                  }}
                >
                  <h3 style={{ fontSize: 14, fontWeight: 800, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 1 }}>
                    {t("calendar.seasonalityTitle")}
                  </h3>
                  <p style={{ fontSize: 11, color: C.muted, margin: "0 0 14px" }}>{t("calendar.seasonalitySubtitle")}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {(["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"] as const).map((m, idx) => {
                      const pct = [22, 28, 38, 52, 66, 82, 94, 96, 88, 64, 40, 26][idx];
                      return (
                        <div key={m} style={{ display: "grid", gridTemplateColumns: "44px 1fr 32px", alignItems: "center", gap: 10 }}>
                          <span style={{ fontSize: 10, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                            {t(`calendar.months.${m}`)}
                          </span>
                          <div style={{ height: 8, background: C.bg, borderRadius: 999, overflow: "hidden" }}>
                            <div style={{ width: `${pct}%`, height: "100%", background: C.primary }} />
                          </div>
                          <span style={{ fontSize: 11, color: C.muted, textAlign: "right" }}>{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}

          {tab === "analytics" && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 18, marginBottom: 18 }}>
                <div
                  style={{
                    background: C.paper,
                    border: `1px solid ${C.border}`,
                    borderRadius: 14,
                    padding: 22,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginBottom: 14,
                    }}
                  >
                    <h3 style={{ fontSize: 16, margin: 0, fontWeight: 800 }}>{t("analytics.revenueTitle")}</h3>
                    <span style={{ fontSize: 11, color: C.muted }}>{t("analytics.last30")}</span>
                  </div>
                  <DemoChart
                    data={[
                      8400, 8900, 9200, 9800, 10200, 10800, 11200, 11800, 12200, 12800, 13200, 13600,
                      14000, 14600, 15200, 15800, 16200, 16800, 17400, 17800, 18400, 19000, 19600, 20200,
                      20800, 21400, 22000, 22600, 23200, 24000,
                    ]}
                    palette={palette}
                    height={210}
                  />
                </div>
                <DemoLiveFeed
                  palette={palette}
                  liveLabel={t("analytics.liveFeed")}
                  height={260}
                  initial={[
                    { id: "f1", title: t("analytics.feed.initial.0.title"), meta: t("analytics.feed.initial.0.meta"), tone: "success" },
                    { id: "f2", title: t("analytics.feed.initial.1.title"), meta: t("analytics.feed.initial.1.meta"), tone: "primary" },
                    { id: "f3", title: t("analytics.feed.initial.2.title"), meta: t("analytics.feed.initial.2.meta"), tone: "info" },
                  ]}
                  rotating={[
                    { id: "fr1", title: t("analytics.feed.rotating.0.title"), meta: t("analytics.feed.rotating.0.meta"), tone: "success" },
                    { id: "fr2", title: t("analytics.feed.rotating.1.title"), meta: t("analytics.feed.rotating.1.meta"), tone: "info" },
                    { id: "fr3", title: t("analytics.feed.rotating.2.title"), meta: t("analytics.feed.rotating.2.meta"), tone: "warn" },
                    { id: "fr4", title: t("analytics.feed.rotating.3.title"), meta: t("analytics.feed.rotating.3.meta"), tone: "primary" },
                  ]}
                />
              </div>

              <div
                style={{
                  background: C.paper,
                  border: `1px solid ${C.border}`,
                  borderRadius: 14,
                  padding: 22,
                }}
              >
                <h3 style={{ fontSize: 16, margin: "0 0 14px", fontWeight: 800 }}>{t("analytics.cohortTitle")}</h3>
                <DemoCohort palette={palette} rows={6} cols={8} />
                <p style={{ color: C.muted, fontSize: 12, marginTop: 12 }}>{t("analytics.cohortNote")}</p>
              </div>
            </>
          )}

          {tab === "settings" && (
            <>
              <div
                style={{
                  background: C.paper,
                  border: `1px solid ${C.border}`,
                  borderRadius: 14,
                  padding: 22,
                  marginBottom: 18,
                }}
              >
                <h3
                  style={{
                    fontSize: 14,
                    fontWeight: 800,
                    margin: "0 0 14px",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  {t("settings.basics")}
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {SETTINGS_FIELDS.map((f) => (
                    <div key={f.key}>
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
                        {t(`settings.fields.${f.key}`)}
                      </label>
                      <input
                        defaultValue={t(`settings.placeholders.${f.key}`)}
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

              <div
                style={{
                  background: C.paper,
                  border: `1px solid ${C.border}`,
                  borderRadius: 14,
                  padding: 22,
                }}
              >
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
                  <Storefront weight="light" size={16} />
                  {t("settings.integrationsTitle")}
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
                  {INTEGRATIONS.map((i) => (
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
                        <div style={{ fontSize: 22 }}>{i.emoji}</div>
                        <DemoBadge
                          palette={palette}
                          variant={i.on ? "success" : "neutral"}
                          label={t(i.on ? "settings.connected" : "settings.disconnected")}
                        />
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{i.name}</div>
                      <div style={{ color: C.muted, fontSize: 11, lineHeight: 1.5, marginTop: 4 }}>
                        {t(`settings.integrations.${i.descKey}`)}
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
                  ))}
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      <DemoStatusBar
        palette={palette}
        version={t("shell.version")}
        region={t("shell.region")}
        buildId={t("shell.buildId")}
      />
    </div>
  );
}
