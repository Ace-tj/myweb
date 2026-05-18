import type { Demo } from "./types";

/**
 * Fallback demo catalog used when Supabase isn't configured (local dev
 * without credentials). Keeps the UI alive and the demo gallery clickable.
 */
export const fallbackDemos: Demo[] = [
  { slug: "china-agency", title: "Study-in-China Agency", tagline: "Send students to top Chinese universities", category: "Education", description: "End-to-end CRM for agencies that place students at Chinese universities — applications, document tracking, visa workflow, commission reports.", features: ["Application pipeline", "Document vault", "Visa tracker", "Partner universities", "Commission reports"], price_usd: 1200, preview_path: "/demos/china-agency/preview", thumbnail_color: "#b91c1c", icon: "graduation-cap", enabled: true, display_order: 1, created_at: new Date().toISOString() },
  { slug: "university", title: "University Portal", tagline: "Student information system for higher ed", category: "Education", description: "Course catalog, enrollment, gradebook, faculty hub, and student self-service for universities.", features: ["Course catalog", "Enrollment", "Gradebook", "Faculty portal", "Self-service"], price_usd: 2400, preview_path: "/demos/university/preview", thumbnail_color: "#7c2d12", icon: "school", enabled: true, display_order: 2, created_at: new Date().toISOString() },
  { slug: "school", title: "K-12 School Portal", tagline: "School management for parents, teachers, students", category: "Education", description: "Attendance, gradebook, homework, parent messaging, and bus tracking for primary and secondary schools.", features: ["Attendance", "Gradebook", "Homework", "Parent chat", "Reports"], price_usd: 1800, preview_path: "/demos/school/preview", thumbnail_color: "#0284c7", icon: "backpack", enabled: true, display_order: 3, created_at: new Date().toISOString() },
  { slug: "restaurant", title: "Restaurant Operating System", tagline: "Tables, orders, kitchen display, reservations", category: "Hospitality", description: "Floor plan, table-side ordering, KDS, reservation book, and end-of-day reports for full-service restaurants.", features: ["Tables", "Orders", "KDS", "Reservations", "Reports"], price_usd: 1500, preview_path: "/demos/restaurant/preview", thumbnail_color: "#c2410c", icon: "utensils", enabled: true, display_order: 4, created_at: new Date().toISOString() },
  { slug: "accounting", title: "Accounting Suite", tagline: "Bookkeeping, invoices, reports", category: "Finance", description: "Double-entry bookkeeping, invoicing, expense tracking, and audit-ready financial reports.", features: ["Ledger", "Invoices", "Expenses", "VAT", "Reports"], price_usd: 2200, preview_path: "/demos/accounting/preview", thumbnail_color: "#1e3a8a", icon: "calculator", enabled: true, display_order: 5, created_at: new Date().toISOString() },
  { slug: "hospital", title: "Clinic & Hospital Ops", tagline: "Patients, appointments, EMR-lite", category: "Healthcare", description: "Patient registry, appointments, prescriptions, lab results, and billing for clinics and small hospitals.", features: ["Patients", "Appointments", "Prescriptions", "Lab", "Billing"], price_usd: 2800, preview_path: "/demos/hospital/preview", thumbnail_color: "#0d9488", icon: "stethoscope", enabled: true, display_order: 6, created_at: new Date().toISOString() },
  { slug: "gym", title: "Gym Membership Hub", tagline: "Memberships, classes, trainers", category: "Fitness", description: "Member CRM, class scheduling, trainer assignments, and check-in kiosk for gyms and studios.", features: ["Members", "Classes", "Trainers", "Check-in", "Payments"], price_usd: 1100, preview_path: "/demos/gym/preview", thumbnail_color: "#16a34a", icon: "dumbbell", enabled: true, display_order: 7, created_at: new Date().toISOString() },
  { slug: "shopping", title: "Storefront", tagline: "Modern e-commerce front + admin", category: "Commerce", description: "Product catalog, cart, checkout, order management, and inventory for online stores.", features: ["Catalog", "Cart", "Checkout", "Orders", "Inventory"], price_usd: 1900, preview_path: "/demos/shopping/preview", thumbnail_color: "#db2777", icon: "shopping-bag", enabled: true, display_order: 8, created_at: new Date().toISOString() },
  { slug: "travel-agency", title: "Travel Agency Platform", tagline: "Tours, bookings, itineraries", category: "Travel", description: "Tour catalog, multi-room bookings, itinerary builder, and traveler CRM for agencies.", features: ["Tours", "Bookings", "Itinerary", "CRM", "Payments"], price_usd: 1700, preview_path: "/demos/travel-agency/preview", thumbnail_color: "#0891b2", icon: "plane", enabled: true, display_order: 9, created_at: new Date().toISOString() },
  { slug: "beauty-salon", title: "Beauty & Spa Booking", tagline: "Appointments, services, stylists", category: "Beauty", description: "Service menu, stylist calendars, online booking, and client history for salons and spas.", features: ["Services", "Calendar", "Stylists", "Clients", "SMS"], price_usd: 900, preview_path: "/demos/beauty-salon/preview", thumbnail_color: "#a21caf", icon: "scissors", enabled: true, display_order: 10, created_at: new Date().toISOString() },
];

export function getFallbackDemo(slug: string): Demo | undefined {
  return fallbackDemos.find((d) => d.slug === slug);
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
