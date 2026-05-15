"use client";

import { useState } from "react";
import { ShoppingCart, Search, Heart, Star, Globe } from "lucide-react";

const PRODUCTS = [
  { id: 1, name: "Linen Tote Bag", price: 29.99, rating: 4.8, reviews: 124, badge: "New" },
  { id: 2, name: "Ceramic Mug Set", price: 44.99, rating: 4.9, reviews: 89, badge: "Best Seller" },
  { id: 3, name: "Macramé Wall Art", price: 65.00, rating: 4.7, reviews: 56, badge: null },
  { id: 4, name: "Beeswax Candles (3pk)", price: 22.99, rating: 4.6, reviews: 201, badge: "Sale" },
  { id: 5, name: "Rattan Serving Tray", price: 38.50, rating: 4.8, reviews: 77, badge: null },
  { id: 6, name: "Hand-painted Vase", price: 52.00, rating: 4.9, reviews: 43, badge: "Limited" },
];

const NAV = ["Shop", "Collections", "About", "Blog"];

export default function ShopDemo() {
  const [cart, setCart] = useState<number[]>([1, 3, 5]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [locale, setLocale] = useState("EN");

  function toggleCart(id: number) {
    setCart((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  function toggleWish(id: number) {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <span className="text-2xl font-bold text-orange-600 tracking-tight">ShopEase</span>
          <nav className="hidden md:flex gap-6 text-sm text-neutral-600">
            {NAV.map((n) => (
              <a key={n} href="#" className="hover:text-orange-600 transition-colors">{n}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                placeholder="Search products…"
                className="pl-9 pr-3 py-2 text-sm rounded-full border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-orange-400 w-40"
              />
            </div>
            <div className="relative cursor-pointer">
              <ShoppingCart className="w-6 h-6 text-neutral-700" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </div>
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value)}
              className="text-xs border border-neutral-200 rounded-full px-2 py-1 appearance-none cursor-pointer"
            >
              <option>EN</option>
              <option>RU</option>
              <option>TG</option>
            </select>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-400 to-orange-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <span className="inline-block bg-white/20 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              New Collection
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Summer Collection<br />2025
            </h1>
            <p className="text-orange-100 mb-6 max-w-md">
              Handcrafted goods made with love. Discover our latest artisan collection — sustainably made, beautifully designed.
            </p>
            <button className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-full hover:bg-orange-50 transition-colors shadow">
              Shop Now →
            </button>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="w-72 h-64 bg-orange-300 rounded-3xl flex items-center justify-center text-white text-6xl shadow-xl">
              🛍️
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-neutral-800 mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((p) => {
            const inCart = cart.includes(p.id);
            const inWish = wishlist.includes(p.id);
            return (
              <div
                key={p.id}
                className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden hover:shadow-md transition-shadow group"
              >
                {/* Image placeholder */}
                <div className="relative bg-gradient-to-br from-orange-100 to-orange-200 h-48 flex items-center justify-center">
                  <div className="text-5xl">🎨</div>
                  {p.badge && (
                    <span className={`absolute top-3 left-3 text-xs font-bold px-2 py-0.5 rounded-full ${
                      p.badge === "Sale" ? "bg-red-500 text-white" :
                      p.badge === "New" ? "bg-green-500 text-white" :
                      p.badge === "Best Seller" ? "bg-orange-500 text-white" :
                      "bg-neutral-700 text-white"
                    }`}>
                      {p.badge}
                    </span>
                  )}
                  <button
                    onClick={() => toggleWish(p.id)}
                    className="absolute top-3 right-3 p-1.5 bg-white rounded-full shadow hover:scale-110 transition-transform"
                  >
                    <Heart
                      className={`w-4 h-4 ${inWish ? "fill-red-500 text-red-500" : "text-neutral-400"}`}
                    />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-neutral-800 mb-1">{p.name}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs text-neutral-500">{p.rating} ({p.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-orange-600">${p.price}</span>
                    <button
                      onClick={() => toggleCart(p.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        inCart
                          ? "bg-orange-600 text-white"
                          : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                      }`}
                    >
                      {inCart ? "✓ In Cart" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-400 text-sm py-10 mt-8">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-white font-bold text-lg mb-3">ShopEase</p>
            <p>Artisan goods, delivered with care.</p>
          </div>
          {["Shop", "About", "Support"].map((col) => (
            <div key={col}>
              <p className="text-white font-medium mb-3">{col}</p>
              {["Link 1", "Link 2", "Link 3"].map((l) => (
                <p key={l} className="mb-1 hover:text-white cursor-pointer">{l}</p>
              ))}
            </div>
          ))}
        </div>
        <div className="max-w-6xl mx-auto px-4 mt-8 border-t border-neutral-800 pt-4 text-center text-xs">
          © 2025 ShopEase. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
