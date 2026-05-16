"use client";
import { useState } from "react";
import {
  ShoppingCart, Search, Heart, Star, ChevronRight,
  Package, Truck, CheckCircle, ArrowLeft, Plus, Minus, Trash2,
  Grid3X3, List, ShoppingBag, BarChart2, Tag, Users, TrendingUp,
} from "lucide-react";
import photosData from "@/data/photos.json";

const PRODUCT_PHOTOS = (photosData as { categories: Record<string, { src: string; thumb: string }[]> }).categories.shop_products;
const photoForProduct = (id: number) =>
  PRODUCT_PHOTOS[(id - 1) % PRODUCT_PHOTOS.length]?.src ?? "";
const thumbForProduct = (id: number) =>
  PRODUCT_PHOTOS[(id - 1) % PRODUCT_PHOTOS.length]?.thumb ?? "";

const PRODUCTS = [
  { id: 1, name: "Premium Leather Jacket", price: 189, originalPrice: 249, category: "Clothing", rating: 4.8, reviews: 214, badge: "Sale", inStock: true, colors: ["Black", "Brown"], emoji: "🧥" },
  { id: 2, name: "Running Sneakers Pro",   price: 129, originalPrice: 129, category: "Footwear",   rating: 4.6, reviews: 389, badge: "Best Seller", inStock: true, colors: ["White", "Red", "Blue"], emoji: "👟" },
  { id: 3, name: "Wireless Earbuds X1",    price: 79,  originalPrice: 99,  category: "Electronics",rating: 4.7, reviews: 512, badge: "Sale", inStock: true, colors: ["White", "Black"], emoji: "🎧" },
  { id: 4, name: "Minimalist Watch",        price: 219, originalPrice: 219, category: "Accessories",rating: 4.9, reviews: 98,  badge: "New",  inStock: true, colors: ["Silver", "Gold"], emoji: "⌚" },
  { id: 5, name: "Canvas Backpack",         price: 64,  originalPrice: 64,  category: "Bags",       rating: 4.5, reviews: 176, badge: "",      inStock: true, colors: ["Olive", "Navy", "Black"], emoji: "🎒" },
  { id: 6, name: "Silk Scarf",              price: 48,  originalPrice: 65,  category: "Accessories",rating: 4.4, reviews: 82,  badge: "Sale", inStock: false,colors: ["Cream", "Burgundy"], emoji: "🧣" },
  { id: 7, name: "Slim Fit Chinos",         price: 85,  originalPrice: 85,  category: "Clothing",   rating: 4.6, reviews: 231, badge: "",      inStock: true, colors: ["Khaki", "Navy", "Olive"], emoji: "👖" },
  { id: 8, name: "Sunglasses UV400",        price: 55,  originalPrice: 75,  category: "Accessories",rating: 4.3, reviews: 143, badge: "Sale", inStock: true, colors: ["Black", "Brown"], emoji: "🕶️" },
];

const CATEGORIES = ["All", "Clothing", "Footwear", "Electronics", "Accessories", "Bags"];

const ORDERS = [
  { id: "ORD-10091", date: "May 12, 2026", items: 3, total: 337, status: "Delivered", product: "Leather Jacket + 2 items" },
  { id: "ORD-10088", date: "May 5, 2026",  items: 1, total: 129, status: "Shipped",   product: "Running Sneakers Pro" },
  { id: "ORD-10072", date: "Apr 28, 2026", items: 2, total: 158, status: "Processing",product: "Wireless Earbuds + Watch" },
];

const STATUS_STYLE: Record<string, string> = {
  Delivered:  "bg-emerald-100 text-emerald-700",
  Shipped:    "bg-blue-100 text-blue-700",
  Processing: "bg-amber-100 text-amber-700",
};

type Page = "home" | "products" | "detail" | "cart" | "checkout" | "confirmed" | "orders" | "admin";
type CartItem = { product: typeof PRODUCTS[0]; qty: number; color: string };

export default function ShopDemo() {
  const [page, setPage]                   = useState<Page>("home");
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [cart, setCart]                   = useState<CartItem[]>([
    { product: PRODUCTS[0], qty: 1, color: "Black" },
    { product: PRODUCTS[2], qty: 2, color: "White" },
  ]);
  const [wishlist, setWishlist]           = useState<number[]>([2, 4]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch]               = useState("");
  const [viewMode, setViewMode]           = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy]               = useState("default");
  const [adminTab, setAdminTab]           = useState("overview");
  const [selectedColor, setSelectedColor] = useState(PRODUCTS[0].colors[0]);
  const [qty, setQty]                     = useState(1);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);

  function addToCart(p: typeof PRODUCTS[0], color: string, q: number) {
    setCart((prev) => {
      const ex = prev.find((i) => i.product.id === p.id && i.color === color);
      if (ex) return prev.map((i) => i.product.id === p.id && i.color === color ? { ...i, qty: i.qty + q } : i);
      return [...prev, { product: p, qty: q, color }];
    });
  }
  function removeFromCart(id: number, color: string) {
    setCart((prev) => prev.filter((i) => !(i.product.id === id && i.color === color)));
  }
  function toggleWish(id: number) {
    setWishlist((w) => w.includes(id) ? w.filter((x) => x !== id) : [...w, id]);
  }

  let filtered = PRODUCTS.filter((p) => {
    if (activeCategory !== "All" && p.category !== activeCategory) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  if (sortBy === "price-asc")  filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === "rating")     filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  const Nav = () => (
    <header className="sticky top-0 z-40 bg-white border-b border-orange-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <button onClick={() => setPage("home")} className="flex items-center gap-2 font-extrabold text-xl text-orange-600">
          <ShoppingBag size={22} /> ShopEase
        </button>
        <div className="flex-1 max-w-sm hidden md:block relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage("products"); }} placeholder="Search products..." className="w-full pl-8 pr-3 py-2 text-sm rounded-full border border-orange-200 focus:outline-none focus:border-orange-400 bg-orange-50" />
        </div>
        <nav className="flex items-center gap-3">
          <button onClick={() => setPage("products")} className="text-sm font-medium text-neutral-600 hover:text-orange-600 transition-colors hidden sm:block">Shop</button>
          <button onClick={() => setPage("orders")} className="text-sm font-medium text-neutral-600 hover:text-orange-600 transition-colors hidden sm:block">Orders</button>
          <button onClick={() => setPage("cart")} className="relative p-2 hover:bg-orange-50 rounded-full transition-colors">
            <ShoppingCart size={18} className="text-neutral-600" />
            {cartCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-orange-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>}
          </button>
          <button onClick={() => setPage("admin")} className="text-xs px-3 py-1.5 rounded-full bg-neutral-900 text-white font-medium hover:bg-neutral-700 transition-colors">Admin</button>
        </nav>
      </div>
    </header>
  );

  /* HOME */
  if (page === "home") return (
    <div className="min-h-screen bg-orange-50 font-sans">
      <Nav />
      <section className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-4">🔥 Summer Sale — up to 40% off</div>
            <h1 className="text-5xl font-extrabold tracking-tight mb-4 leading-tight">Discover Your<br/>Perfect Style</h1>
            <p className="text-white/80 text-lg mb-8 max-w-md">Premium clothing, accessories and electronics at unbeatable prices.</p>
            <div className="flex gap-3">
              <button onClick={() => setPage("products")} className="px-6 py-3 bg-white text-orange-600 font-bold rounded-xl hover:scale-105 transition-transform shadow-lg">Shop Now</button>
              <button onClick={() => setPage("products")} className="px-6 py-3 bg-white/20 border border-white/30 rounded-xl font-semibold hover:bg-white/30 transition-colors">View Sale</button>
            </div>
          </div>
          <div className="text-8xl">🛍️</div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-extrabold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {CATEGORIES.filter((c) => c !== "All").map((cat) => (
            <button key={cat} onClick={() => { setActiveCategory(cat); setPage("products"); }} className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-orange-100 hover:border-orange-300 hover:shadow-md transition-all">
              <span className="text-2xl">{cat === "Clothing" ? "👗" : cat === "Footwear" ? "👟" : cat === "Electronics" ? "🎧" : cat === "Accessories" ? "⌚" : "🎒"}</span>
              <span className="text-xs font-semibold text-neutral-600">{cat}</span>
            </button>
          ))}
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold">Featured Products</h2>
          <button onClick={() => setPage("products")} className="text-sm text-orange-600 font-semibold hover:underline flex items-center gap-1">View all <ChevronRight size={14} /></button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {PRODUCTS.slice(0, 4).map((p) => (
            <div key={p.id} className="bg-white rounded-2xl border border-orange-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="relative h-36 bg-gradient-to-br from-orange-50 to-red-50 overflow-hidden">
                <img src={photoForProduct(p.id)} alt={p.name} className="absolute inset-0 w-full h-full object-cover" />
                {p.badge && <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${p.badge === "Sale" ? "bg-red-500 text-white" : p.badge === "New" ? "bg-blue-500 text-white" : "bg-amber-500 text-white"}`}>{p.badge}</span>}
                <button onClick={() => toggleWish(p.id)} className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow">
                  <Heart size={12} className={wishlist.includes(p.id) ? "fill-red-500 text-red-500" : "text-neutral-400"} />
                </button>
              </div>
              <div className="p-3">
                <div className="text-xs text-orange-500 font-semibold mb-0.5">{p.category}</div>
                <div className="font-bold text-sm leading-tight mb-2">{p.name}</div>
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-orange-600">${p.price}</span>
                  <button onClick={() => { setSelectedProduct(p); setPage("detail"); setSelectedColor(p.colors[0]); setQty(1); }} className="text-xs bg-orange-500 text-white px-2.5 py-1 rounded-lg font-bold hover:bg-orange-600 transition-colors">View</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-gradient-to-r from-neutral-900 to-neutral-700 rounded-3xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-neutral-400 mb-2">Limited Time</div>
            <h3 className="text-3xl font-extrabold mb-2">Free Shipping</h3>
            <p className="text-neutral-300">On all orders over $75. Use code <span className="text-orange-400 font-bold">FREESHIP</span></p>
          </div>
          <button onClick={() => setPage("products")} className="px-6 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-400 transition-colors whitespace-nowrap">Shop Now</button>
        </div>
      </section>
    </div>
  );

  /* PRODUCTS */
  if (page === "products") return (
    <div className="min-h-screen bg-orange-50 font-sans">
      <Nav />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
          <div><h1 className="text-2xl font-extrabold">All Products</h1><p className="text-sm text-neutral-500">{filtered.length} products</p></div>
          <div className="flex items-center gap-2">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="text-sm border border-orange-200 rounded-lg px-3 py-2 bg-white focus:outline-none">
              <option value="default">Featured</option><option value="price-asc">Price ↑</option><option value="price-desc">Price ↓</option><option value="rating">Top Rated</option>
            </select>
            <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg border ${viewMode === "grid" ? "bg-orange-500 text-white border-orange-500" : "bg-white border-orange-200"}`}><Grid3X3 size={15} /></button>
            <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg border ${viewMode === "list" ? "bg-orange-500 text-white border-orange-500" : "bg-white border-orange-200"}`}><List size={15} /></button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map((cat) => (<button key={cat} onClick={() => setActiveCategory(cat)} className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-all ${activeCategory === cat ? "bg-orange-500 text-white border-orange-500" : "bg-white border-orange-200 text-neutral-600 hover:border-orange-400"}`}>{cat}</button>))}
        </div>
        <div className={viewMode === "grid" ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" : "flex flex-col gap-3"}>
          {filtered.map((p) => viewMode === "grid" ? (
            <div key={p.id} className="bg-white rounded-2xl border border-orange-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="relative h-40 bg-gradient-to-br from-orange-50 to-red-50 overflow-hidden">
                <img src={photoForProduct(p.id)} alt={p.name} className="absolute inset-0 w-full h-full object-cover" />
                {p.badge && <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${p.badge === "Sale" ? "bg-red-500 text-white" : p.badge === "New" ? "bg-blue-500 text-white" : "bg-amber-500 text-white"}`}>{p.badge}</span>}
                {!p.inStock && <div className="absolute inset-0 bg-white/70 flex items-center justify-center"><span className="text-xs font-bold text-neutral-500 bg-white px-2 py-1 rounded-full border">Out of Stock</span></div>}
              </div>
              <div className="p-4">
                <div className="text-xs text-orange-500 font-semibold mb-0.5">{p.category}</div>
                <div className="font-bold text-sm mb-1 leading-tight">{p.name}</div>
                <div className="flex items-center gap-1 mb-3"><Star size={11} className="fill-amber-400 text-amber-400" /><span className="text-xs text-neutral-500">{p.rating} · {p.reviews}</span></div>
                <div className="flex items-center justify-between">
                  <div><span className="text-lg font-extrabold text-orange-600">${p.price}</span>{p.originalPrice > p.price && <span className="text-xs text-neutral-400 line-through ml-1">${p.originalPrice}</span>}</div>
                  <button disabled={!p.inStock} onClick={() => { setSelectedProduct(p); setPage("detail"); setSelectedColor(p.colors[0]); setQty(1); }} className="text-xs bg-orange-500 text-white px-3 py-1.5 rounded-lg font-bold hover:bg-orange-600 disabled:opacity-40 transition-colors">View</button>
                </div>
              </div>
            </div>
          ) : (
            <div key={p.id} className="bg-white rounded-xl border border-orange-100 p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-orange-50">
                <img src={thumbForProduct(p.id)} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0"><div className="font-bold text-sm">{p.name}</div><div className="text-xs text-neutral-400">{p.category}</div></div>
              <div className="text-right"><div className="text-base font-extrabold text-orange-600">${p.price}</div><button onClick={() => { setSelectedProduct(p); setPage("detail"); setSelectedColor(p.colors[0]); setQty(1); }} className="mt-1 text-xs bg-orange-500 text-white px-3 py-1.5 rounded-lg font-bold hover:bg-orange-600 transition-colors">View</button></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  /* DETAIL */
  if (page === "detail") return (
    <div className="min-h-screen bg-orange-50 font-sans">
      <Nav />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button onClick={() => setPage("products")} className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-orange-600 mb-6 transition-colors"><ArrowLeft size={14} /> Back</button>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white rounded-3xl border border-orange-100 h-80 overflow-hidden shadow-lg relative">
            <img src={photoForProduct(selectedProduct.id)} alt={selectedProduct.name} className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-xs font-semibold text-orange-500 uppercase tracking-widest mb-2">{selectedProduct.category}</div>
            <h1 className="text-3xl font-extrabold mb-3">{selectedProduct.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">{Array.from({length:5}).map((_,i) => <Star key={i} size={14} className={i < Math.round(selectedProduct.rating) ? "fill-amber-400 text-amber-400" : "text-neutral-200"} />)}</div>
              <span className="text-sm text-neutral-500">{selectedProduct.rating} · {selectedProduct.reviews} reviews</span>
            </div>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-extrabold text-orange-600">${selectedProduct.price}</span>
              {selectedProduct.originalPrice > selectedProduct.price && <span className="text-xl text-neutral-400 line-through">${selectedProduct.originalPrice}</span>}
            </div>
            <div className="mb-5">
              <div className="text-sm font-semibold mb-2">Color: <span className="font-normal">{selectedColor}</span></div>
              <div className="flex gap-2">{selectedProduct.colors.map((c) => (<button key={c} onClick={() => setSelectedColor(c)} className={`px-3 py-1.5 rounded-lg text-sm font-medium border-2 transition-all ${selectedColor === c ? "border-orange-500 text-orange-600 bg-orange-50" : "border-neutral-200 text-neutral-600 hover:border-neutral-400"}`}>{c}</button>))}</div>
            </div>
            <div className="mb-6">
              <div className="text-sm font-semibold mb-2">Quantity</div>
              <div className="flex items-center gap-3">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-9 h-9 rounded-lg border-2 border-neutral-200 flex items-center justify-center hover:border-orange-400 transition-colors"><Minus size={14} /></button>
                <span className="w-10 text-center font-bold text-lg">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-9 h-9 rounded-lg border-2 border-neutral-200 flex items-center justify-center hover:border-orange-400 transition-colors"><Plus size={14} /></button>
              </div>
            </div>
            <div className="flex gap-3">
              <button disabled={!selectedProduct.inStock} onClick={() => { addToCart(selectedProduct, selectedColor, qty); setPage("cart"); }} className="flex-1 py-3.5 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 disabled:opacity-40 transition-colors">{selectedProduct.inStock ? "Add to Cart" : "Out of Stock"}</button>
              <button onClick={() => toggleWish(selectedProduct.id)} className="w-14 h-14 rounded-xl border-2 border-orange-200 flex items-center justify-center hover:border-red-300 transition-colors"><Heart size={20} className={wishlist.includes(selectedProduct.id) ? "fill-red-500 text-red-500" : "text-neutral-400"} /></button>
            </div>
            <div className="mt-6 flex flex-col gap-2">{["Free shipping over $75","30-day returns","Brand guarantee"].map((f) => (<div key={f} className="flex items-center gap-2 text-sm text-neutral-600"><CheckCircle size={14} className="text-emerald-500 shrink-0" /> {f}</div>))}</div>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-xl font-extrabold mb-4">You Might Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {PRODUCTS.filter((p) => p.id !== selectedProduct.id).slice(0,4).map((p) => (
              <div key={p.id} onClick={() => { setSelectedProduct(p); setSelectedColor(p.colors[0]); setQty(1); }} className="bg-white rounded-2xl border border-orange-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                <div className="h-24 bg-orange-50 overflow-hidden"><img src={thumbForProduct(p.id)} alt={p.name} className="w-full h-full object-cover" /></div>
                <div className="p-3 text-center">
                  <div className="text-xs font-semibold truncate">{p.name}</div>
                  <div className="text-orange-600 font-bold text-sm mt-1">${p.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  /* CART */
  if (page === "cart") return (
    <div className="min-h-screen bg-orange-50 font-sans">
      <Nav />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-extrabold mb-6">Cart <span className="text-neutral-400 font-normal text-lg">({cartCount})</span></h1>
        {cart.length === 0 ? (
          <div className="text-center py-20"><div className="text-6xl mb-4">🛒</div><h3 className="text-xl font-bold mb-4">Your cart is empty</h3><button onClick={() => setPage("products")} className="px-6 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors">Shop Now</button></div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 flex flex-col gap-3">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.color}`} className="bg-white rounded-2xl border border-orange-100 p-4 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-orange-50"><img src={thumbForProduct(item.product.id)} alt={item.product.name} className="w-full h-full object-cover" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm">{item.product.name}</div>
                    <div className="text-xs text-neutral-400">{item.color}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => setCart((prev) => prev.map((i) => i.product.id === item.product.id && i.color === item.color ? { ...i, qty: Math.max(1, i.qty - 1) } : i))} className="w-6 h-6 rounded-md border flex items-center justify-center hover:border-orange-400"><Minus size={10} /></button>
                      <span className="text-sm font-bold w-6 text-center">{item.qty}</span>
                      <button onClick={() => setCart((prev) => prev.map((i) => i.product.id === item.product.id && i.color === item.color ? { ...i, qty: i.qty + 1 } : i))} className="w-6 h-6 rounded-md border flex items-center justify-center hover:border-orange-400"><Plus size={10} /></button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-extrabold text-orange-600">${(item.product.price * item.qty)}</div>
                    <button onClick={() => removeFromCart(item.product.id, item.color)} className="mt-1 text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-orange-100 p-5 h-fit shadow-lg">
              <h3 className="font-extrabold text-lg mb-4">Summary</h3>
              <div className="flex flex-col gap-2 text-sm mb-4">
                <div className="flex justify-between"><span className="text-neutral-500">Subtotal</span><span className="font-semibold">${cartTotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-neutral-500">Shipping</span><span className="font-semibold text-emerald-600">{cartTotal >= 75 ? "Free" : "$9.99"}</span></div>
                <div className="flex justify-between"><span className="text-neutral-500">Tax (8%)</span><span className="font-semibold">${(cartTotal * 0.08).toFixed(2)}</span></div>
                <div className="border-t pt-2 mt-1 flex justify-between font-extrabold text-base"><span>Total</span><span className="text-orange-600">${(cartTotal + (cartTotal >= 75 ? 0 : 9.99) + cartTotal * 0.08).toFixed(2)}</span></div>
              </div>
              <input placeholder="Promo code" className="w-full text-sm border border-orange-200 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-400 mb-3" />
              <button onClick={() => setPage("checkout")} className="w-full py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors">Checkout →</button>
              <button onClick={() => setPage("products")} className="w-full py-2 mt-2 text-sm text-neutral-500 hover:text-orange-600 transition-colors">Continue Shopping</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  /* CHECKOUT */
  if (page === "checkout") return (
    <div className="min-h-screen bg-orange-50 font-sans">
      <Nav />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-extrabold mb-6">Checkout</h1>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl border border-orange-100 p-5">
              <h2 className="font-bold text-lg mb-4">Shipping Information</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {["First Name","Last Name","Email","Phone","Address","City","ZIP","Country"].map((f) => (
                  <div key={f} className={f === "Address" ? "sm:col-span-2" : ""}><label className="text-xs font-semibold text-neutral-500 block mb-1">{f}</label><input placeholder={f} className="w-full text-sm border border-orange-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-orange-400" /></div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-orange-100 p-5">
              <h2 className="font-bold text-lg mb-4">Payment Method</h2>
              {["Credit / Debit Card","Cash on Delivery","Bank Transfer"].map((m, i) => (
                <label key={m} className="flex items-center gap-3 p-3 rounded-xl border border-orange-100 hover:border-orange-300 cursor-pointer mb-2 transition-colors">
                  <input type="radio" name="payment" defaultChecked={i === 0} className="accent-orange-500" />
                  <span className="text-sm font-medium">{m}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-orange-100 p-5 h-fit shadow-lg">
            <h3 className="font-extrabold text-lg mb-4">Order ({cart.length} items)</h3>
            {cart.map((item) => (<div key={item.product.id} className="flex items-center gap-2 mb-2"><div className="w-7 h-7 rounded overflow-hidden bg-orange-50 shrink-0"><img src={thumbForProduct(item.product.id)} alt={item.product.name} className="w-full h-full object-cover" /></div><span className="text-xs flex-1 truncate">{item.product.name}</span><span className="text-xs font-bold">${item.product.price * item.qty}</span></div>))}
            <div className="border-t pt-3 mt-3 flex justify-between font-extrabold"><span>Total</span><span className="text-orange-600">${(cartTotal + (cartTotal >= 75 ? 0 : 9.99) + cartTotal * 0.08).toFixed(2)}</span></div>
            <button onClick={() => { setCart([]); setPage("confirmed"); }} className="mt-4 w-full py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors">Place Order ✓</button>
          </div>
        </div>
      </div>
    </div>
  );

  /* CONFIRMED */
  if (page === "confirmed") return (
    <div className="min-h-screen bg-orange-50 font-sans flex items-center justify-center">
      <div className="text-center max-w-md px-6">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle size={48} className="text-emerald-500" /></div>
        <h1 className="text-3xl font-extrabold mb-3">Order Confirmed!</h1>
        <p className="text-neutral-500 mb-2">Order #ORD-10095</p>
        <p className="text-neutral-400 text-sm mb-8">Estimated delivery: May 20–22</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => setPage("orders")} className="px-6 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors">Track Order</button>
          <button onClick={() => setPage("home")} className="px-6 py-3 border border-orange-200 rounded-xl font-semibold hover:bg-orange-50 transition-colors">Home</button>
        </div>
      </div>
    </div>
  );

  /* ORDERS */
  if (page === "orders") return (
    <div className="min-h-screen bg-orange-50 font-sans">
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-extrabold mb-6">My Orders</h1>
        <div className="flex flex-col gap-4">
          {ORDERS.map((o) => (
            <div key={o.id} className="bg-white rounded-2xl border border-orange-100 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div><div className="font-bold">{o.id}</div><div className="text-xs text-neutral-400">{o.date}</div></div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${STATUS_STYLE[o.status]}`}>{o.status}</span>
              </div>
              <div className="text-sm text-neutral-600 mb-4">{o.product}</div>
              <div className="flex items-center justify-between">
                <div className="flex gap-6 text-sm">
                  <div><span className="text-neutral-400">Items: </span><span className="font-semibold">{o.items}</span></div>
                  <div><span className="text-neutral-400">Total: </span><span className="font-bold text-orange-600">${o.total}</span></div>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1.5 text-xs border border-orange-200 px-3 py-1.5 rounded-lg font-semibold hover:bg-orange-50 transition-colors"><Truck size={12} /> Track</button>
                  {o.status === "Delivered" && <button className="text-xs text-neutral-500 border border-neutral-200 px-3 py-1.5 rounded-lg hover:bg-neutral-50 transition-colors">Return</button>}
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 overflow-x-auto">
                {["Ordered","Processing","Shipped","Delivered"].map((step, i) => {
                  const ai = o.status === "Processing" ? 1 : o.status === "Shipped" ? 2 : o.status === "Delivered" ? 3 : 0;
                  return (<div key={step} className="flex items-center gap-1 shrink-0">
                    <div className={`w-2 h-2 rounded-full ${i <= ai ? "bg-orange-500" : "bg-neutral-200"}`} />
                    <span className={`text-[10px] font-medium ${i <= ai ? "text-orange-500" : "text-neutral-400"}`}>{step}</span>
                    {i < 3 && <div className={`w-6 h-0.5 ${i < ai ? "bg-orange-300" : "bg-neutral-100"}`} />}
                  </div>);
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  /* ADMIN */
  return (
    <div className="min-h-screen bg-neutral-50 font-sans">
      <header className="bg-neutral-900 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3"><ShoppingBag size={20} className="text-orange-400" /><span className="font-bold">ShopEase Admin</span></div>
        <div className="flex gap-2">
          {["overview","products","orders","customers"].map((tab) => (<button key={tab} onClick={() => setAdminTab(tab)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${adminTab === tab ? "bg-orange-500" : "text-neutral-400 hover:text-white"}`}>{tab}</button>))}
          <button onClick={() => setPage("home")} className="ml-2 text-xs text-neutral-500 hover:text-white transition-colors">← Exit</button>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {adminTab === "overview" && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[{label:"Revenue",value:"$48,392",icon:<TrendingUp size={20}/>,color:"text-emerald-600"},{label:"Orders",value:"127",icon:<Package size={20}/>,color:"text-blue-600"},{label:"Products",value:`${PRODUCTS.length}`,icon:<Tag size={20}/>,color:"text-orange-600"},{label:"Customers",value:"2,841",icon:<Users size={20}/>,color:"text-purple-600"}].map((s) => (
                <div key={s.label} className="bg-white rounded-2xl border p-5"><div className={`${s.color} mb-3`}>{s.icon}</div><div className="text-2xl font-extrabold">{s.value}</div><div className="text-sm text-neutral-500">{s.label}</div></div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border p-5">
              <h3 className="font-bold mb-4">Recent Orders</h3>
              <table className="w-full text-sm"><thead><tr className="text-left text-neutral-400 text-xs border-b"><th className="pb-2">Order</th><th className="pb-2">Items</th><th className="pb-2">Total</th><th className="pb-2">Status</th></tr></thead>
              <tbody>{ORDERS.map((o) => (<tr key={o.id} className="border-b last:border-0 hover:bg-neutral-50"><td className="py-2.5 font-mono text-xs text-neutral-500">{o.id}</td><td className="py-2.5">{o.items}</td><td className="py-2.5 font-bold">${o.total}</td><td className="py-2.5"><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_STYLE[o.status]}`}>{o.status}</span></td></tr>))}</tbody></table>
            </div>
          </div>
        )}
        {adminTab === "products" && (
          <div className="bg-white rounded-2xl border">
            <div className="flex items-center justify-between p-4 border-b"><h3 className="font-bold">Products</h3><button className="text-xs bg-orange-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-600 transition-colors">+ Add Product</button></div>
            <table className="w-full text-sm"><thead><tr className="text-left text-neutral-400 text-xs border-b"><th className="p-3">Product</th><th className="p-3">Category</th><th className="p-3">Price</th><th className="p-3">Stock</th><th className="p-3">Rating</th><th className="p-3">Actions</th></tr></thead>
            <tbody>{PRODUCTS.map((p) => (<tr key={p.id} className="border-b last:border-0 hover:bg-neutral-50"><td className="p-3 flex items-center gap-2"><div className="w-8 h-8 rounded-md overflow-hidden bg-orange-50 shrink-0"><img src={thumbForProduct(p.id)} alt={p.name} className="w-full h-full object-cover" /></div><span className="font-medium text-sm">{p.name}</span></td><td className="p-3 text-neutral-500">{p.category}</td><td className="p-3 font-bold">${p.price}</td><td className="p-3"><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.inStock ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>{p.inStock ? "In Stock" : "Out"}</span></td><td className="p-3">{p.rating}★</td><td className="p-3"><button className="text-xs text-blue-600 hover:underline mr-2">Edit</button><button className="text-xs text-red-500 hover:underline">Delete</button></td></tr>))}</tbody></table>
          </div>
        )}
        {adminTab === "orders" && (
          <div className="bg-white rounded-2xl border">
            <div className="p-4 border-b"><h3 className="font-bold">All Orders</h3></div>
            <table className="w-full text-sm"><thead><tr className="text-left text-neutral-400 text-xs border-b"><th className="p-3">ID</th><th className="p-3">Date</th><th className="p-3">Items</th><th className="p-3">Total</th><th className="p-3">Status</th><th className="p-3">Action</th></tr></thead>
            <tbody>{ORDERS.map((o) => (<tr key={o.id} className="border-b last:border-0 hover:bg-neutral-50"><td className="p-3 font-mono text-xs text-neutral-500">{o.id}</td><td className="p-3">{o.date}</td><td className="p-3">{o.items}</td><td className="p-3 font-bold">${o.total}</td><td className="p-3"><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_STYLE[o.status]}`}>{o.status}</span></td><td className="p-3"><button className="text-xs text-orange-600 hover:underline">Update</button></td></tr>))}</tbody></table>
          </div>
        )}
        {adminTab === "customers" && (
          <div className="bg-white rounded-2xl border p-5">
            <h3 className="font-bold mb-4">Top Customers</h3>
            <div className="flex flex-col gap-3">
              {["Alice Johnson — 12 orders — $1,284","Bob Smith — 9 orders — $934","Carol White — 7 orders — $729","David Lee — 5 orders — $512"].map((c, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl">
                  <div className="w-9 h-9 rounded-full bg-orange-200 text-orange-700 flex items-center justify-center font-bold text-sm">{c[0]}</div>
                  <div className="flex-1 text-sm">{c}</div>
                  <button className="text-xs text-neutral-500 hover:text-orange-600">View →</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
