"use client";

import { useState, useEffect } from "react";
import {
  ChefHat, ShoppingBag, Table, ClipboardText, ChartBar,
  Users, Calendar, MagnifyingGlass, Plus, Minus, X, Check,
  Clock, Fire, Star, Printer, ArrowLeft, PencilSimple,
  Trash, Bell, Warning, CurrencyDollar, TrendUp,
  Coffee, Pizza, ForkKnife, Cookie, Wine, Leaf
} from "@phosphor-icons/react";
import photosData from "@/data/photos.json";

const FOOD_PHOTOS = (photosData as { categories: Record<string, { src: string; thumb: string }[]> }).categories.restaurant_food;
const photoForFood = (id: number) =>
  FOOD_PHOTOS[(id - 1) % FOOD_PHOTOS.length]?.thumb ?? "";

// ─── palette ────────────────────────────────────────────────────────────────
const C = {
  terra: "#c0613a",
  terradark: "#943024",
  terralight: "#fdf0ec",
  cream: "#fef9f0",
  olive: "#5c6b2e",
  oliveLight: "#f0f4e8",
  bg: "#fef9f0",
  card: "#ffffff",
  text: "#1c1410",
  muted: "#78716c",
  border: "#e7e5e4",
  success: "#16a34a",
  warning: "#d97706",
  danger: "#dc2626",
};

// ─── data ────────────────────────────────────────────────────────────────────
type MenuCategory = "Starters" | "Mains" | "Pasta" | "Desserts" | "Drinks";

const MENU: { id: number; name: string; category: MenuCategory; price: number; cost: number; time: number; rating: number; desc: string; popular?: boolean; spicy?: boolean; veg?: boolean }[] = [
  { id: 1, name: "Burrata Caprese", category: "Starters", price: 14, cost: 4, time: 5, rating: 4.9, desc: "Fresh burrata, heirloom tomatoes, basil oil, sea salt", popular: true, veg: true },
  { id: 2, name: "Crispy Calamari", category: "Starters", price: 13, cost: 3.5, time: 8, rating: 4.7, desc: "Lightly breaded squid rings, marinara dip, lemon" },
  { id: 3, name: "Truffle Arancini", category: "Starters", price: 15, cost: 5, time: 10, rating: 4.8, desc: "Risotto balls, black truffle, parmesan, aioli", veg: true },
  { id: 4, name: "Beef Carpaccio", category: "Starters", price: 16, cost: 6, time: 5, rating: 4.6, desc: "Thinly sliced prime beef, capers, rocket, mustard" },
  { id: 5, name: "Grilled Salmon", category: "Mains", price: 29, cost: 10, time: 18, rating: 4.8, desc: "Atlantic salmon, lemon butter, asparagus, potato gratin", popular: true },
  { id: 6, name: "Osso Buco", category: "Mains", price: 34, cost: 12, time: 25, rating: 4.9, desc: "Braised veal shank, gremolata, saffron risotto" },
  { id: 7, name: "Chicken Marsala", category: "Mains", price: 26, cost: 8, time: 20, rating: 4.7, desc: "Pan-fried chicken, marsala wine, mushrooms, polenta" },
  { id: 8, name: "Bistecca Fiorentina", category: "Mains", price: 48, cost: 18, time: 22, rating: 4.9, desc: "1.2kg T-bone, rosemary, garlic, roasted veg (serves 2)", popular: true },
  { id: 9, name: "Aubergine Parmigiana", category: "Mains", price: 22, cost: 5, time: 20, rating: 4.6, desc: "Baked aubergine layers, tomato sauce, mozzarella, basil", veg: true },
  { id: 10, name: "Penne Arrabbiata", category: "Pasta", price: 18, cost: 4, time: 12, rating: 4.5, desc: "Penne, san marzano chilli tomato, garlic, pecorino", spicy: true, veg: true },
  { id: 11, name: "Tagliatelle Bolognese", category: "Pasta", price: 21, cost: 6, time: 14, rating: 4.8, desc: "Slow-cooked beef ragù, egg tagliatelle, parmesan", popular: true },
  { id: 12, name: "Lobster Linguine", category: "Pasta", price: 36, cost: 14, time: 16, rating: 4.9, desc: "Half lobster, cherry tomatoes, white wine, chilli, herbs" },
  { id: 13, name: "Cacio e Pepe", category: "Pasta", price: 17, cost: 3.5, time: 10, rating: 4.7, desc: "Tonnarelli, pecorino romano, black pepper — classic", veg: true },
  { id: 14, name: "Tiramisu", category: "Desserts", price: 10, cost: 2.5, time: 5, rating: 4.9, desc: "House-made, ladyfingers, espresso, mascarpone, cocoa", popular: true, veg: true },
  { id: 15, name: "Panna Cotta", category: "Desserts", price: 9, cost: 2, time: 5, rating: 4.8, desc: "Vanilla bean, seasonal berry coulis", veg: true },
  { id: 16, name: "Cannoli", category: "Desserts", price: 8, cost: 2, time: 5, rating: 4.7, desc: "Crispy shells, ricotta cream, pistachio, candied citrus", veg: true },
  { id: 17, name: "Espresso Martini", category: "Drinks", price: 14, cost: 3, time: 3, rating: 4.8, desc: "Vodka, espresso, coffee liqueur, vanilla" },
  { id: 18, name: "Aperol Spritz", category: "Drinks", price: 12, cost: 2.5, time: 2, rating: 4.7, desc: "Aperol, prosecco, sparkling water, orange" },
  { id: 19, name: "Sparkling Water", category: "Drinks", price: 4, cost: 0.5, time: 1, rating: 4.5, desc: "San Pellegrino 750ml", veg: true },
  { id: 20, name: "House Red", category: "Drinks", price: 9, cost: 2, time: 2, rating: 4.6, desc: "Chianti Classico DOCG, per glass" },
];

const TABLES = [
  { id: 1, seats: 2, status: "occupied" as const, order: [1, 2, 14], server: "Maria", time: 47 },
  { id: 2, seats: 4, status: "occupied" as const, order: [5, 11, 18, 19], server: "James", time: 23 },
  { id: 3, seats: 2, status: "free" as const, order: [], server: "", time: 0 },
  { id: 4, seats: 6, status: "occupied" as const, order: [8, 12, 13, 17, 20], server: "Maria", time: 62 },
  { id: 5, seats: 4, status: "reserved" as const, order: [], server: "James", time: 0 },
  { id: 6, seats: 2, status: "free" as const, order: [], server: "", time: 0 },
  { id: 7, seats: 8, status: "occupied" as const, order: [6, 7, 9, 15, 16, 18], server: "Sofia", time: 31 },
  { id: 8, seats: 4, status: "reserved" as const, order: [], server: "Sofia", time: 0 },
  { id: 9, seats: 2, status: "occupied" as const, order: [3, 10, 19], server: "James", time: 15 },
  { id: 10, seats: 6, status: "free" as const, order: [], server: "", time: 0 },
  { id: 11, seats: 4, status: "occupied" as const, order: [11, 12, 17], server: "Maria", time: 38 },
  { id: 12, seats: 2, status: "free" as const, order: [], server: "", time: 0 },
];

const KITCHEN_ORDERS = [
  { id: "ORD-001", table: 4, items: ["Osso Buco ×1", "Lobster Linguine ×1"], status: "cooking" as const, elapsed: 18 },
  { id: "ORD-002", table: 7, items: ["Bistecca Fiorentina ×1"], status: "cooking" as const, elapsed: 12 },
  { id: "ORD-003", table: 2, items: ["Grilled Salmon ×1", "Penne Arrabbiata ×1"], status: "ready" as const, elapsed: 21 },
  { id: "ORD-004", table: 11, items: ["Tagliatelle Bolognese ×2"], status: "queued" as const, elapsed: 3 },
  { id: "ORD-005", table: 9, items: ["Truffle Arancini ×1", "Crispy Calamari ×1"], status: "ready" as const, elapsed: 9 },
  { id: "ORD-006", table: 1, items: ["Tiramisu ×2"], status: "queued" as const, elapsed: 1 },
];

const STAFF = [
  { name: "Maria Rossi", role: "Server", schedule: "Tue–Sat 17:00–23:00", tables: [1, 4, 11], rating: 4.9 },
  { name: "James Park", role: "Server", schedule: "Mon–Fri 17:00–23:00", tables: [2, 5, 9], rating: 4.7 },
  { name: "Sofia Greco", role: "Server", schedule: "Wed–Sun 17:00–23:00", tables: [7, 8], rating: 4.8 },
  { name: "Marco Ferrari", role: "Head Chef", schedule: "Tue–Sat 14:00–23:00", tables: [], rating: 5.0 },
  { name: "Ana Lima", role: "Sous Chef", schedule: "Mon–Fri 14:00–23:00", tables: [], rating: 4.8 },
  { name: "Tom Hughes", role: "Bartender", schedule: "Tue–Sun 18:00–01:00", tables: [], rating: 4.7 },
];

const SALES_DATA = [
  { day: "Mon", revenue: 2840, covers: 48 },
  { day: "Tue", revenue: 3120, covers: 52 },
  { day: "Wed", revenue: 3480, covers: 58 },
  { day: "Thu", revenue: 4100, covers: 68 },
  { day: "Fri", revenue: 6200, covers: 102 },
  { day: "Sat", revenue: 7400, covers: 118 },
  { day: "Sun", revenue: 5300, covers: 88 },
];

// ─── helpers ─────────────────────────────────────────────────────────────────
function Badge({ children, color = C.terra }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{ background: color + "20", color, padding: "2px 8px", borderRadius: 99, fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

function Topbar({ page, setPage }: { page: string; setPage: (p: string) => void }) {
  const nav = [
    { id: "dashboard", icon: <ChartBar size={17} />, label: "Dashboard" },
    { id: "menu", icon: <ClipboardText size={17} />, label: "Menu" },
    { id: "floor", icon: <Table size={17} />, label: "Floor Plan" },
    { id: "orders", icon: <ShoppingBag size={17} />, label: "Orders" },
    { id: "kitchen", icon: <ChefHat size={17} />, label: "Kitchen" },
    { id: "reports", icon: <TrendUp size={17} />, label: "Reports" },
    { id: "staff", icon: <Users size={17} />, label: "Staff" },
    { id: "online-menu", icon: <Star size={17} />, label: "Online Menu" },
  ];
  return (
    <div style={{ background: C.terra, display: "flex", alignItems: "center", padding: "0 20px", borderBottom: `2px solid ${C.terradark}`, flexShrink: 0 }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 0", marginRight: 24, borderRight: "1px solid #ffffff33", paddingRight: 20 }}>
        <ChefHat size={24} color="#fff" weight="fill" />
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", lineHeight: 1 }}>La Cucina</div>
          <div style={{ fontSize: 9, color: "#ffffff88", letterSpacing: 2 }}>RISTORANTE</div>
        </div>
      </div>
      {/* Nav */}
      <nav style={{ display: "flex", flex: 1, gap: 2 }}>
        {nav.map(n => (
          <button key={n.id} onClick={() => setPage(n.id)}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "12px 14px", border: "none", cursor: "pointer", background: page === n.id ? "#ffffff22" : "transparent", color: page === n.id ? "#fff" : "#ffffff99", fontWeight: page === n.id ? 700 : 500, fontSize: 13, borderBottom: page === n.id ? "2px solid #fff" : "2px solid transparent", transition: "all .15s", marginBottom: -2 }}>
            {n.icon}{n.label}
          </button>
        ))}
      </nav>
      {/* Time */}
      <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", fontFamily: "monospace" }}>19:42</div>
    </div>
  );
}

// ─── DASHBOARD ───────────────────────────────────────────────────────────────
function Dashboard({ setPage }: { setPage: (p: string) => void }) {
  const totalRevenue = SALES_DATA.reduce((s, d) => s + d.revenue, 0);
  const todayRevenue = SALES_DATA[5].revenue;
  const occupiedTables = TABLES.filter(t => t.status === "occupied").length;
  const readyOrders = KITCHEN_ORDERS.filter(o => o.status === "ready").length;

  return (
    <div style={{ padding: 24, overflowY: "auto", height: "100%" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Today's Overview</h1>
        <p style={{ color: C.muted, fontSize: 13 }}>Saturday, May 16 — Dinner Service</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 20 }}>
        {[
          { label: "Today's Revenue", value: `$${todayRevenue.toLocaleString()}`, sub: "+19% vs last Sat", color: C.terra, icon: <CurrencyDollar size={20} /> },
          { label: "Covers Tonight", value: "118", sub: "94% capacity", color: C.olive, icon: <Users size={20} /> },
          { label: "Tables Occupied", value: `${occupiedTables}/${TABLES.length}`, sub: `${TABLES.filter(t => t.status === "reserved").length} reserved`, color: C.warning, icon: <Table size={20} /> },
          { label: "Avg Order Value", value: "$62.71", sub: "↑ $4.20 vs yesterday", color: C.success, icon: <TrendUp size={20} /> },
        ].map(s => (
          <div key={s.label} style={{ background: C.card, borderRadius: 14, padding: 18, border: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: s.color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: s.color }}>{s.icon}</span>
              </div>
              <span style={{ fontSize: 12, color: C.muted }}>{s.label}</span>
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: C.text }}>{s.value}</div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        {/* Revenue chart */}
        <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 16 }}>Weekly Revenue</h3>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 140 }}>
            {SALES_DATA.map((d, i) => {
              const maxRev = Math.max(...SALES_DATA.map(x => x.revenue));
              const h = (d.revenue / maxRev) * 120;
              return (
                <div key={d.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 11, color: C.text, fontWeight: 700 }}>${(d.revenue / 1000).toFixed(1)}k</span>
                  <div style={{ width: "100%", height: h, background: i === 5 ? C.terra : C.terra + "44", borderRadius: "6px 6px 0 0", transition: "height .5s" }} />
                  <span style={{ fontSize: 11, color: C.muted, fontWeight: 600 }}>{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Kitchen status */}
        <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Kitchen Status</h3>
            {readyOrders > 0 && <Badge color={C.success}>{readyOrders} ready</Badge>}
          </div>
          {KITCHEN_ORDERS.slice(0, 5).map(o => (
            <div key={o.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
              <div style={{ width: 8, height: 8, borderRadius: 99, background: o.status === "ready" ? C.success : o.status === "cooking" ? C.warning : C.muted, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>Table {o.table}</div>
                <div style={{ fontSize: 11, color: C.muted }}>{o.items[0]}{o.items.length > 1 ? ` +${o.items.length - 1}` : ""}</div>
              </div>
              <span style={{ fontSize: 11, color: C.muted }}>{o.elapsed}m</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MENU MANAGEMENT ──────────────────────────────────────────────────────────
function MenuManagement() {
  const [cat, setCat] = useState<MenuCategory | "All">("All");
  const [editItem, setEditItem] = useState<typeof MENU[0] | null>(null);
  const categories: (MenuCategory | "All")[] = ["All", "Starters", "Mains", "Pasta", "Desserts", "Drinks"];
  const filtered = cat === "All" ? MENU : MENU.filter(m => m.category === cat);
  const catIcons: Record<string, React.ReactNode> = { Starters: <Leaf size={14} />, Mains: <Fire size={14} />, Pasta: <Pizza size={14} />, Desserts: <Cookie size={14} />, Drinks: <Wine size={14} /> };

  return (
    <div style={{ padding: 24, overflowY: "auto", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Menu Management</h1>
          <p style={{ color: C.muted, fontSize: 13 }}>{MENU.length} items · {categories.length - 1} categories</p>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: C.terra, color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
          <Plus size={15} /> Add Item
        </button>
      </div>

      {/* Category tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, overflowX: "auto", paddingBottom: 4 }}>
        {categories.map(c => (
          <button key={c} onClick={() => setCat(c)}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 20, border: `1px solid ${cat === c ? C.terra : C.border}`, background: cat === c ? C.terra : C.card, color: cat === c ? "#fff" : C.muted, fontWeight: 600, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap" }}>
            {catIcons[c]} {c}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
        {filtered.map(item => {
          const margin = Math.round(((item.price - item.cost) / item.price) * 100);
          return (
            <div key={item.id} style={{ background: C.card, borderRadius: 14, padding: 18, border: `1px solid ${C.border}`, display: "flex", gap: 14 }}>
              <div style={{ width: 56, height: 56, borderRadius: 12, background: C.terralight, overflow: "hidden", flexShrink: 0 }}>
                <img src={photoForFood(item.id)} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{item.name}</span>
                  {item.popular && <Badge color={C.terra}>Popular</Badge>}
                  {item.veg && <Badge color={C.olive}>Veg</Badge>}
                  {item.spicy && <Badge color={C.danger}>🌶 Spicy</Badge>}
                </div>
                <p style={{ fontSize: 12, color: C.muted, marginBottom: 8, lineHeight: 1.4 }}>{item.desc}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: C.terra }}>${item.price}</span>
                  <span style={{ fontSize: 11, color: C.muted }}>Cost ${item.cost}</span>
                  <Badge color={margin >= 75 ? C.success : margin >= 60 ? C.warning : C.danger}>{margin}% margin</Badge>
                  <span style={{ fontSize: 11, color: C.muted, marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}><Clock size={11} />{item.time}m</span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <button onClick={() => setEditItem(item)} style={{ padding: "6px 8px", background: C.terra + "15", color: C.terra, border: `1px solid ${C.terra}33`, borderRadius: 8, cursor: "pointer" }}><PencilSimple size={13} /></button>
                <button style={{ padding: "6px 8px", background: C.danger + "15", color: C.danger, border: `1px solid ${C.danger}33`, borderRadius: 8, cursor: "pointer" }}><Trash size={13} /></button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit modal */}
      {editItem && (
        <div style={{ position: "fixed", inset: 0, background: "#00000066", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }} onClick={() => setEditItem(null)}>
          <div style={{ background: C.card, borderRadius: 20, padding: 28, width: 440, maxWidth: "90vw" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: C.text }}>Edit Item</h3>
              <button onClick={() => setEditItem(null)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={20} color={C.muted} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[{ label: "Name", value: editItem.name }, { label: "Description", value: editItem.desc }].map(f => (
                <div key={f.label}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 5, textTransform: "uppercase" }}>{f.label}</label>
                  <input defaultValue={f.value} style={{ width: "100%", padding: "10px 14px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 14, color: C.text, outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                {[{ label: "Price ($)", value: editItem.price }, { label: "Cost ($)", value: editItem.cost }, { label: "Prep Time (min)", value: editItem.time }].map(f => (
                  <div key={f.label}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 5, textTransform: "uppercase" }}>{f.label}</label>
                    <input type="number" defaultValue={f.value} style={{ width: "100%", padding: "10px 14px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 14, color: C.text, outline: "none", boxSizing: "border-box" }} />
                  </div>
                ))}
              </div>
              <button onClick={() => setEditItem(null)} style={{ padding: "12px 0", background: C.terra, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: 14 }}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── FLOOR PLAN ──────────────────────────────────────────────────────────────
function FloorPlan({ setPage, setActiveTable }: { setPage: (p: string) => void; setActiveTable: (t: typeof TABLES[0]) => void }) {
  return (
    <div style={{ padding: 24, overflowY: "auto", height: "100%" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Floor Plan</h1>
        <div style={{ display: "flex", gap: 16, marginTop: 6 }}>
          {[{ label: "Occupied", color: C.terra }, { label: "Reserved", color: C.warning }, { label: "Free", color: C.success }].map(l => (
            <span key={l.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: C.muted }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: l.color, display: "inline-block" }} />{l.label}
            </span>
          ))}
        </div>
      </div>

      {/* Restaurant layout */}
      <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}`, marginBottom: 20 }}>
        {/* Kitchen bar at top */}
        <div style={{ background: C.terralight, borderRadius: 10, padding: "10px 20px", marginBottom: 24, display: "flex", alignItems: "center", gap: 10, border: `1px dashed ${C.terra}` }}>
          <ChefHat size={18} color={C.terra} />
          <span style={{ fontSize: 13, fontWeight: 700, color: C.terra }}>Kitchen Pass</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {TABLES.map(t => {
            const bg = t.status === "occupied" ? C.terra : t.status === "reserved" ? C.warning : C.success;
            const total = t.order.reduce((sum, id) => sum + (MENU.find(m => m.id === id)?.price || 0), 0);
            return (
              <div key={t.id} onClick={() => { if (t.status === "occupied") { setActiveTable(t); setPage("orders"); } }}
                style={{ background: bg + "18", border: `2px solid ${bg}`, borderRadius: 14, padding: 14, cursor: t.status === "occupied" ? "pointer" : "default", transition: "transform .15s" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: C.text }}>T{t.id}</div>
                    <div style={{ fontSize: 11, color: C.muted }}>{t.seats} seats</div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: bg, background: bg + "20", padding: "2px 8px", borderRadius: 99 }}>{t.status}</span>
                </div>
                {t.status === "occupied" && (
                  <>
                    <div style={{ fontSize: 12, color: C.text, fontWeight: 600 }}>{t.server}</div>
                    <div style={{ fontSize: 11, color: C.muted }}>{t.time}m · ${total}</div>
                  </>
                )}
                {t.status === "reserved" && <div style={{ fontSize: 12, color: C.muted }}>{t.server}</div>}
                {t.status === "free" && <div style={{ fontSize: 12, color: C.success, fontWeight: 600 }}>Seat guests</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── ACTIVE ORDERS ────────────────────────────────────────────────────────────
function ActiveOrders({ activeTable }: { activeTable: typeof TABLES[0] }) {
  const [cart, setCart] = useState<{ id: number; qty: number }[]>(activeTable.order.map(id => ({ id, qty: 1 })));
  const [addingCat, setAddingCat] = useState<MenuCategory | null>(null);

  const total = cart.reduce((sum, c) => sum + (MENU.find(m => m.id === c.id)?.price || 0) * c.qty, 0);
  const tax = total * 0.1;

  const addItem = (id: number) => setCart(c => { const ex = c.find(x => x.id === id); return ex ? c.map(x => x.id === id ? { ...x, qty: x.qty + 1 } : x) : [...c, { id, qty: 1 }]; });
  const removeItem = (id: number) => setCart(c => c.flatMap(x => x.id === id ? (x.qty > 1 ? [{ ...x, qty: x.qty - 1 }] : []) : [x]));

  return (
    <div style={{ padding: 24, height: "100%", display: "flex", gap: 20, overflow: "hidden" }}>
      {/* Order items */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: C.text }}>Table {activeTable.id} — Order</h1>
          <Badge color={C.terra}>{activeTable.server}</Badge>
          <Badge color={C.warning}>{activeTable.time}m</Badge>
        </div>

        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
          {cart.map(({ id, qty }) => {
            const item = MENU.find(m => m.id === id);
            if (!item) return null;
            return (
              <div key={id} style={{ background: C.card, borderRadius: 12, padding: "14px 16px", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: C.muted }}>${item.price} each</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button onClick={() => removeItem(id)} style={{ width: 28, height: 28, borderRadius: 8, border: `1px solid ${C.border}`, background: C.card, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Minus size={14} color={C.muted} /></button>
                  <span style={{ fontSize: 15, fontWeight: 700, color: C.text, width: 20, textAlign: "center" }}>{qty}</span>
                  <button onClick={() => addItem(id)} style={{ width: 28, height: 28, borderRadius: 8, border: `1px solid ${C.terra}`, background: C.terra + "15", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Plus size={14} color={C.terra} /></button>
                  <span style={{ fontSize: 14, fontWeight: 800, color: C.terra, width: 50, textAlign: "right" }}>${(item.price * qty).toFixed(2)}</span>
                </div>
              </div>
            );
          })}

          {/* Add items by category */}
          {(["Starters", "Mains", "Pasta", "Desserts", "Drinks"] as MenuCategory[]).map(cat => (
            <div key={cat}>
              <button onClick={() => setAddingCat(addingCat === cat ? null : cat)}
                style={{ width: "100%", padding: "10px 16px", background: addingCat === cat ? C.terra + "15" : C.bg, border: `1px dashed ${C.terra}66`, borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 600, color: C.terra, display: "flex", alignItems: "center", gap: 8 }}>
                <Plus size={14} /> Add {cat}
              </button>
              {addingCat === cat && (
                <div style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, marginTop: 4, overflow: "hidden" }}>
                  {MENU.filter(m => m.category === cat).map(item => (
                    <div key={item.id} onClick={() => addItem(item.id)}
                      style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", borderBottom: `1px solid ${C.border}`, cursor: "pointer" }}>
                      <span style={{ fontSize: 13, flex: 1, color: C.text }}>{item.name}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: C.terra }}>${item.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bill summary */}
      <div style={{ width: 260, background: C.card, borderRadius: 16, padding: 20, border: `1px solid ${C.border}`, display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 16 }}>Bill Summary</h3>
        <div style={{ flex: 1 }}>
          {cart.map(({ id, qty }) => {
            const item = MENU.find(m => m.id === id);
            if (!item) return null;
            return (
              <div key={id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: C.muted }}>{item.name} ×{qty}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>${(item.price * qty).toFixed(2)}</span>
              </div>
            );
          })}
        </div>
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 14, marginTop: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 13, color: C.muted }}>Subtotal</span>
            <span style={{ fontSize: 13, color: C.text }}>${total.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: C.muted }}>Tax (10%)</span>
            <span style={{ fontSize: 13, color: C.text }}>${tax.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: C.text }}>Total</span>
            <span style={{ fontSize: 16, fontWeight: 800, color: C.terra }}>${(total + tax).toFixed(2)}</span>
          </div>
          <button style={{ width: "100%", padding: "12px 0", background: C.terra, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: 14, marginBottom: 8 }}>Send to Kitchen</button>
          <button style={{ width: "100%", padding: "12px 0", background: C.olive, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <Printer size={14} /> Print Bill
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── KITCHEN DISPLAY ─────────────────────────────────────────────────────────
function KitchenDisplay() {
  const [orders, setOrders] = useState(KITCHEN_ORDERS);
  const bump = (id: string) => setOrders(o => o.map(x => x.id === id ? { ...x, status: x.status === "queued" ? "cooking" : "ready" } : x));

  const statusColor = { queued: C.muted, cooking: C.warning, ready: C.success } as const;
  const statusLabel = { queued: "Queued", cooking: "Cooking", ready: "Ready to Serve" } as const;

  return (
    <div style={{ padding: 24, overflowY: "auto", height: "100%", background: "#1a120e" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <ChefHat size={28} color={C.terra} weight="fill" />
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>Kitchen Display System</h1>
        <span style={{ marginLeft: "auto", fontSize: 18, fontWeight: 800, color: C.terra, fontFamily: "monospace" }}>19:42</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {orders.map(o => {
          const sc = statusColor[o.status];
          return (
            <div key={o.id} style={{ background: "#2a1a14", borderRadius: 14, border: `2px solid ${sc}`, overflow: "hidden" }}>
              <div style={{ background: sc + "22", padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: 12, fontWeight: 800, color: sc }}>TABLE {o.table}</span>
                  <span style={{ fontSize: 11, color: "#ffffff66", marginLeft: 12 }}>{o.id}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Clock size={13} color={o.elapsed >= 20 ? C.danger : "#ffffff66"} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: o.elapsed >= 20 ? C.danger : "#ffffff88" }}>{o.elapsed}m</span>
                </div>
              </div>
              <div style={{ padding: 16 }}>
                {o.items.map((item, i) => (
                  <div key={i} style={{ fontSize: 15, fontWeight: 700, color: "#fff", padding: "6px 0", borderBottom: i < o.items.length - 1 ? "1px solid #ffffff11" : "none" }}>{item}</div>
                ))}
                <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Badge color={sc}>{statusLabel[o.status]}</Badge>
                  {o.status !== "ready" && (
                    <button onClick={() => bump(o.id)}
                      style={{ padding: "7px 14px", background: sc, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 12 }}>
                      {o.status === "queued" ? "Start" : "Done"}
                    </button>
                  )}
                  {o.status === "ready" && (
                    <button onClick={() => bump(o.id)} style={{ padding: "7px 14px", background: C.success, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 12, display: "flex", alignItems: "center", gap: 5 }}>
                      <Check size={13} /> Served
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── SALES REPORTS ────────────────────────────────────────────────────────────
function Reports() {
  const totalWeek = SALES_DATA.reduce((s, d) => s + d.revenue, 0);
  const topItems = [...MENU].sort((a, b) => b.price - a.price).slice(0, 5);

  return (
    <div style={{ padding: 24, overflowY: "auto", height: "100%" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Sales Reports</h1>
        <p style={{ color: C.muted, fontSize: 13 }}>Week of May 12–18, 2026</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 20 }}>
        {[
          { label: "Weekly Revenue", value: `$${totalWeek.toLocaleString()}`, sub: "+22% vs last week" },
          { label: "Total Covers", value: SALES_DATA.reduce((s, d) => s + d.covers, 0), sub: "avg 72 per day" },
          { label: "Avg Table Spend", value: "$74.20", sub: "↑ $8.10 vs last week" },
        ].map(s => (
          <div key={s.label} style={{ background: C.card, borderRadius: 14, padding: 20, border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: C.terra }}>{s.value}</div>
            <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>{s.label}</div>
            <div style={{ fontSize: 12, color: C.success, marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 16 }}>Daily Revenue Breakdown</h3>
          {SALES_DATA.map(d => {
            const pct = (d.revenue / Math.max(...SALES_DATA.map(x => x.revenue))) * 100;
            return (
              <div key={d.day} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.text, width: 36 }}>{d.day}</span>
                <div style={{ flex: 1, height: 10, background: C.border, borderRadius: 99 }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: C.terra, borderRadius: 99 }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.text, width: 60 }}>${(d.revenue / 1000).toFixed(1)}k</span>
                <span style={{ fontSize: 12, color: C.muted, width: 50 }}>{d.covers} cov.</span>
              </div>
            );
          })}
        </div>

        <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 16 }}>Top Revenue Items</h3>
          {topItems.map((item, i) => (
            <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i < topItems.length - 1 ? `1px solid ${C.border}` : "none" }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: C.muted, width: 20 }}>#{i + 1}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{item.name}</div>
                <div style={{ fontSize: 11, color: C.muted }}>{item.category}</div>
              </div>
              <span style={{ fontSize: 14, fontWeight: 800, color: C.terra }}>${item.price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── STAFF SCHEDULE ───────────────────────────────────────────────────────────
function StaffSchedule() {
  return (
    <div style={{ padding: 24, overflowY: "auto", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Staff Schedule</h1>
          <p style={{ color: C.muted, fontSize: 13 }}>{STAFF.length} staff members on roster</p>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: C.terra, color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
          <Plus size={15} /> Add Staff
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
        {STAFF.map(s => (
          <div key={s.name} style={{ background: C.card, borderRadius: 14, padding: 20, border: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: C.terra + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: C.terra }}>{s.name.split(" ").map(w => w[0]).join("")}</span>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{s.name}</div>
                <Badge color={s.role === "Head Chef" ? C.terra : s.role === "Bartender" ? C.olive : C.warning}>{s.role}</Badge>
              </div>
              <div style={{ marginLeft: "auto", textAlign: "right" }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: C.success }}>★ {s.rating.toFixed(1)}</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 12, color: C.muted, display: "flex", alignItems: "center", gap: 8 }}><Calendar size={13} />{s.schedule}</div>
              {s.tables.length > 0 && (
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {s.tables.map(t => <Badge key={t} color={C.terra}>T{t}</Badge>)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ONLINE MENU ──────────────────────────────────────────────────────────────
function OnlineMenu() {
  const [cat, setCat] = useState<MenuCategory | "All">("All");
  const filtered = cat === "All" ? MENU : MENU.filter(m => m.category === cat);
  return (
    <div style={{ padding: 24, overflowY: "auto", height: "100%" }}>
      <div style={{ background: `linear-gradient(135deg, ${C.terra}, ${C.terradark})`, borderRadius: 20, padding: "32px 28px", marginBottom: 24, textAlign: "center" }}>
        <ChefHat size={36} color="#fff" weight="fill" />
        <h1 style={{ fontSize: 28, fontWeight: 900, color: "#fff", marginTop: 12 }}>La Cucina</h1>
        <p style={{ color: "#ffffff88", fontSize: 15, marginTop: 4 }}>Authentic Italian — Open 17:00–23:00</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 16 }}>
          <span style={{ color: "#fff", fontSize: 13 }}>📍 42 Via Roma, Downtown</span>
          <span style={{ color: "#fff", fontSize: 13 }}>📞 +1 555-0200</span>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 20, justifyContent: "center", flexWrap: "wrap" }}>
        {(["All", "Starters", "Mains", "Pasta", "Desserts", "Drinks"] as const).map(c => (
          <button key={c} onClick={() => setCat(c)}
            style={{ padding: "8px 18px", borderRadius: 20, border: `1px solid ${cat === c ? C.terra : C.border}`, background: cat === c ? C.terra : C.card, color: cat === c ? "#fff" : C.muted, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
            {c}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
        {filtered.map(item => (
          <div key={item.id} style={{ background: C.card, borderRadius: 14, padding: 18, border: `1px solid ${C.border}`, display: "flex", gap: 14 }}>
            <div style={{ width: 64, height: 64, borderRadius: 12, background: C.terralight, overflow: "hidden", flexShrink: 0 }}>
              <img src={photoForFood(item.id)} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{item.name}</span>
                {item.popular && <span style={{ fontSize: 10, fontWeight: 700, color: C.terra, background: C.terra + "18", padding: "1px 6px", borderRadius: 99 }}>⭐ Popular</span>}
              </div>
              <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.4, marginBottom: 8 }}>{item.desc}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: 6 }}>
                  {item.veg && <Badge color={C.olive}>Veg</Badge>}
                  {item.spicy && <Badge color={C.danger}>🌶 Spicy</Badge>}
                </div>
                <span style={{ fontSize: 16, fontWeight: 800, color: C.terra }}>${item.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function RestaurantDemo() {
  const [page, setPage] = useState("dashboard");
  const [activeTable, setActiveTable] = useState(TABLES[0]);

  const renderPage = () => {
    switch (page) {
      case "dashboard":   return <Dashboard setPage={setPage} />;
      case "menu":        return <MenuManagement />;
      case "floor":       return <FloorPlan setPage={setPage} setActiveTable={setActiveTable} />;
      case "orders":      return <ActiveOrders activeTable={activeTable} />;
      case "kitchen":     return <KitchenDisplay />;
      case "reports":     return <Reports />;
      case "staff":       return <StaffSchedule />;
      case "online-menu": return <OnlineMenu />;
      default:            return <Dashboard setPage={setPage} />;
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", background: C.bg, height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Topbar page={page} setPage={setPage} />
      <main style={{ flex: 1, overflow: "hidden" }}>
        {renderPage()}
      </main>
    </div>
  );
}
