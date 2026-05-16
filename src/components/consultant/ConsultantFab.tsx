"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import {
  Headphones, X, Send, Smile, Image as ImageIcon, Search,
  Bell, MessageSquare, Check, CheckCheck, Trash2,
} from "lucide-react";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

interface ChatMessage {
  id: string;
  from: "user" | "consultant" | "system";
  body: string;
  imageDataUrl?: string;
  ts: number;
  read?: boolean;
}

interface Notification {
  id: string;
  type: "message" | "quote" | "milestone" | "system";
  title: string;
  body: string;
  ts: number;
  read: boolean;
}

const CHAT_STORAGE_KEY = "myweb_consultant_chat_v1";
const NOTIFS_STORAGE_KEY = "myweb_consultant_notifs_v1";

const INITIAL_CHAT: ChatMessage[] = [
  {
    id: "sys-welcome",
    from: "system",
    body: "Your consultant is online. Send a message to get started.",
    ts: Date.now() - 1000 * 60 * 10,
    read: true,
  },
  {
    id: "c-hello",
    from: "consultant",
    body: "Hi! I'm Elena from MyWeb. I can help you pick a system, explain pricing, or answer any technical question. What are you looking to build?",
    ts: Date.now() - 1000 * 60 * 9,
    read: true,
  },
];

const INITIAL_NOTIFS: Notification[] = [
  {
    id: "n1",
    type: "message",
    title: "Elena Petrova replied",
    body: "I'd love to walk you through the clinic system demo whenever you're ready.",
    ts: Date.now() - 1000 * 60 * 9,
    read: false,
  },
  {
    id: "n2",
    type: "system",
    title: "Welcome to MyWeb",
    body: "We've added 10 new demo systems you can explore.",
    ts: Date.now() - 1000 * 60 * 60 * 3,
    read: false,
  },
  {
    id: "n3",
    type: "quote",
    title: "New quote available",
    body: "Elena sent a quote of $549 for the Clinic System project.",
    ts: Date.now() - 1000 * 60 * 60 * 6,
    read: true,
  },
];

const CONSULTANT_REPLIES = [
  "Thanks for the message! Let me check that for you.",
  "That's a great question — typically we deliver in 1-2 weeks for a custom build like that.",
  "I'd recommend our Restaurant POS demo for that use case. Want to open the live preview together?",
  "Pricing starts at $399 for the Gym system. Everything in the brief is included.",
  "Yes, all demos come with full source code and you own it after delivery.",
  "Could you share a bit more about the size of your business and how many users?",
  "Sounds good. I'll prepare a custom proposal and send it within 24 hours.",
];

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "now";
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d`;
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function loadChat(): ChatMessage[] {
  if (typeof window === "undefined") return INITIAL_CHAT;
  try {
    const raw = localStorage.getItem(CHAT_STORAGE_KEY);
    if (!raw) return INITIAL_CHAT;
    return JSON.parse(raw) as ChatMessage[];
  } catch {
    return INITIAL_CHAT;
  }
}

function loadNotifs(): Notification[] {
  if (typeof window === "undefined") return INITIAL_NOTIFS;
  try {
    const raw = localStorage.getItem(NOTIFS_STORAGE_KEY);
    if (!raw) return INITIAL_NOTIFS;
    return JSON.parse(raw) as Notification[];
  } catch {
    return INITIAL_NOTIFS;
  }
}

export function ConsultantFab() {
  const t = useTranslations();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Hide on preview pages (live demos) — FAB would block the demo UI
  const hide = pathname?.includes("/preview");
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"chat" | "notifs">("chat");
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT);
  const [notifs, setNotifs] = useState<Notification[]>(INITIAL_NOTIFS);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [attached, setAttached] = useState<string | null>(null);
  const [typing, setTyping] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Hydrate from localStorage
  useEffect(() => {
    setMounted(true);
    setMessages(loadChat());
    setNotifs(loadNotifs());
  }, []);

  // Persist
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
  }, [messages, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(NOTIFS_STORAGE_KEY, JSON.stringify(notifs));
  }, [notifs, mounted]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (open && tab === "chat") {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, open, tab]);

  // Mark messages read when chat opened
  useEffect(() => {
    if (open && tab === "chat") {
      setMessages((prev) =>
        prev.some((m) => m.from === "consultant" && !m.read)
          ? prev.map((m) => (m.from === "consultant" ? { ...m, read: true } : m))
          : prev,
      );
    }
  }, [open, tab]);

  const unreadMessages = messages.filter((m) => m.from === "consultant" && !m.read).length;
  const unreadNotifs = notifs.filter((n) => !n.read).length;
  const totalUnread = unreadMessages + unreadNotifs;

  const send = useCallback(() => {
    const body = input.trim();
    if (!body && !attached) return;
    const msg: ChatMessage = {
      id: `u-${Date.now()}`,
      from: "user",
      body,
      imageDataUrl: attached ?? undefined,
      ts: Date.now(),
      read: true,
    };
    setMessages((prev) => [...prev, msg]);
    setInput("");
    setAttached(null);
    setShowEmoji(false);
    setTyping(true);

    setTimeout(() => {
      const reply = CONSULTANT_REPLIES[Math.floor(Math.random() * CONSULTANT_REPLIES.length)];
      const consultantMsg: ChatMessage = {
        id: `c-${Date.now()}`,
        from: "consultant",
        body: reply,
        ts: Date.now(),
        read: open && tab === "chat",
      };
      setMessages((prev) => [...prev, consultantMsg]);
      setTyping(false);
    }, 1200 + Math.random() * 800);
  }, [input, attached, open, tab]);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Image too large. Max 2 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => setAttached(ev.target?.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function clearChat() {
    if (!confirm("Clear all messages?")) return;
    setMessages(INITIAL_CHAT);
  }

  function markNotifRead(id: string) {
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  function markAllNotifsRead() {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  const filteredMessages = search
    ? messages.filter((m) => m.body.toLowerCase().includes(search.toLowerCase()))
    : messages;

  if (!mounted || hide) return null;

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-2xl shadow-indigo-500/40 flex items-center justify-center transition-all hover:scale-110 ${open ? "scale-0 opacity-0 pointer-events-none" : ""}`}
        aria-label="Open consultant chat"
      >
        <Headphones size={22} />
        {totalUnread > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-[rgb(var(--bg))]">
            {totalUnread > 9 ? "9+" : totalUnread}
          </span>
        )}
      </button>

      {/* Backdrop on mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Panel */}
      <div
        className={`fixed z-50 transition-all duration-300 ease-out
          ${open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none"}
          inset-x-0 bottom-0 md:inset-auto md:bottom-6 md:right-6
          md:w-[400px] h-[85vh] md:h-[600px]
          rounded-t-2xl md:rounded-2xl
          border shadow-2xl flex flex-col overflow-hidden`}
        style={{
          background: "rgb(var(--bg-card))",
          borderColor: "rgb(var(--border))",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b"
          style={{ borderColor: "rgb(var(--border))", background: "rgb(var(--bg-subtle))" }}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                <Headphones size={16} />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[rgb(var(--bg-card))]" />
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: "rgb(var(--text))" }}>Elena Petrova</p>
              <p className="text-[11px]" style={{ color: "rgb(var(--text-muted))" }}>Senior Consultant · Online</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[rgb(var(--bg-hover))] transition-colors"
            style={{ color: "rgb(var(--text-muted))" }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 px-3 py-2 border-b" style={{ borderColor: "rgb(var(--border))" }}>
          <button
            onClick={() => setTab("chat")}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${tab === "chat" ? "bg-indigo-600 text-white" : "hover:bg-[rgb(var(--bg-hover))]"}`}
            style={tab === "chat" ? undefined : { color: "rgb(var(--text-muted))" }}
          >
            <MessageSquare size={13} /> Chat
            {unreadMessages > 0 && (
              <span className={`text-[10px] px-1.5 rounded-full ${tab === "chat" ? "bg-white/20" : "bg-red-500/20 text-red-500"}`}>
                {unreadMessages}
              </span>
            )}
          </button>
          <button
            onClick={() => setTab("notifs")}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${tab === "notifs" ? "bg-indigo-600 text-white" : "hover:bg-[rgb(var(--bg-hover))]"}`}
            style={tab === "notifs" ? undefined : { color: "rgb(var(--text-muted))" }}
          >
            <Bell size={13} /> Notifications
            {unreadNotifs > 0 && (
              <span className={`text-[10px] px-1.5 rounded-full ${tab === "notifs" ? "bg-white/20" : "bg-red-500/20 text-red-500"}`}>
                {unreadNotifs}
              </span>
            )}
          </button>
        </div>

        {tab === "chat" ? (
          <>
            {/* Chat sub-header: search + clear */}
            <div className="flex items-center gap-2 px-3 py-2 border-b" style={{ borderColor: "rgb(var(--border))" }}>
              <div className="relative flex-1">
                <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: "rgb(var(--text-subtle))" }} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search messages…"
                  className="w-full pl-7 pr-2 py-1.5 text-xs rounded-md border outline-none"
                  style={{
                    background: "rgb(var(--bg))",
                    borderColor: "rgb(var(--border))",
                    color: "rgb(var(--text))",
                  }}
                />
              </div>
              <button
                onClick={clearChat}
                className="p-1.5 rounded-md hover:bg-[rgb(var(--bg-hover))] transition-colors"
                style={{ color: "rgb(var(--text-subtle))" }}
                title="Clear chat"
              >
                <Trash2 size={13} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
              {filteredMessages.map((m) => {
                if (m.from === "system") {
                  return (
                    <div key={m.id} className="flex justify-center">
                      <span className="text-[11px] px-3 py-1 rounded-full" style={{ background: "rgb(var(--bg-subtle))", color: "rgb(var(--text-muted))" }}>
                        {m.body}
                      </span>
                    </div>
                  );
                }
                const own = m.from === "user";
                return (
                  <div key={m.id} className={`flex ${own ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] rounded-2xl px-3 py-2 ${own ? "bg-indigo-600 text-white rounded-br-sm" : "rounded-bl-sm"}`}
                      style={!own ? { background: "rgb(var(--bg-subtle))", color: "rgb(var(--text))" } : undefined}>
                      {m.imageDataUrl && (
                        <img src={m.imageDataUrl} alt="attachment" className="rounded-lg mb-1.5 max-w-full max-h-48 object-cover" />
                      )}
                      {m.body && <p className="text-sm leading-snug whitespace-pre-wrap">{m.body}</p>}
                      <p className={`text-[10px] mt-1 flex items-center gap-1 ${own ? "text-indigo-100" : ""}`}
                        style={!own ? { color: "rgb(var(--text-subtle))" } : undefined}>
                        {formatTime(m.ts)}
                        {own && (m.read ? <CheckCheck size={11} /> : <Check size={11} />)}
                      </p>
                    </div>
                  </div>
                );
              })}
              {typing && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-sm px-3 py-2 flex items-center gap-1" style={{ background: "rgb(var(--bg-subtle))" }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "rgb(var(--text-muted))", animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "rgb(var(--text-muted))", animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "rgb(var(--text-muted))", animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </div>

            {/* Attached image preview */}
            {attached && (
              <div className="px-3 py-2 border-t flex items-center gap-2" style={{ borderColor: "rgb(var(--border))" }}>
                <img src={attached} alt="preview" className="w-12 h-12 rounded-md object-cover" />
                <button
                  onClick={() => setAttached(null)}
                  className="text-xs text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            )}

            {/* Emoji picker */}
            {showEmoji && (
              <div className="absolute bottom-16 right-3 z-50">
                <EmojiPicker
                  onEmojiClick={(d) => {
                    setInput((prev) => prev + d.emoji);
                    setShowEmoji(false);
                  }}
                  height={320}
                  width={300}
                />
              </div>
            )}

            {/* Input */}
            <div className="border-t px-3 py-2 flex items-end gap-1.5" style={{ borderColor: "rgb(var(--border))" }}>
              <button
                onClick={() => setShowEmoji((v) => !v)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[rgb(var(--bg-hover))] transition-colors"
                style={{ color: "rgb(var(--text-muted))" }}
                title="Emoji"
              >
                <Smile size={16} />
              </button>
              <button
                onClick={() => fileRef.current?.click()}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[rgb(var(--bg-hover))] transition-colors"
                style={{ color: "rgb(var(--text-muted))" }}
                title="Attach image"
              >
                <ImageIcon size={16} />
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder="Type a message…"
                rows={1}
                className="flex-1 resize-none border rounded-lg px-3 py-1.5 text-sm outline-none max-h-24"
                style={{
                  background: "rgb(var(--bg))",
                  borderColor: "rgb(var(--border))",
                  color: "rgb(var(--text))",
                }}
              />

              <button
                onClick={send}
                disabled={!input.trim() && !attached}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title="Send"
              >
                <Send size={14} />
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Notifications */}
            <div className="flex items-center justify-between px-3 py-2 border-b" style={{ borderColor: "rgb(var(--border))" }}>
              <span className="text-xs font-semibold" style={{ color: "rgb(var(--text-muted))" }}>
                {unreadNotifs > 0 ? `${unreadNotifs} unread` : "All caught up"}
              </span>
              {unreadNotifs > 0 && (
                <button
                  onClick={markAllNotifsRead}
                  className="text-xs font-semibold text-indigo-500 hover:underline"
                >
                  Mark all read
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto">
              {notifs.length === 0 ? (
                <div className="text-center py-12 text-sm" style={{ color: "rgb(var(--text-muted))" }}>
                  No notifications yet
                </div>
              ) : (
                notifs.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => markNotifRead(n.id)}
                    className="w-full px-3 py-3 border-b text-left transition-colors hover:bg-[rgb(var(--bg-hover))] flex gap-3"
                    style={{ borderColor: "rgb(var(--border))", background: n.read ? "transparent" : "rgb(var(--accent-subtle))" }}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      n.type === "message" ? "bg-indigo-500/15 text-indigo-500" :
                      n.type === "quote" ? "bg-emerald-500/15 text-emerald-500" :
                      n.type === "milestone" ? "bg-amber-500/15 text-amber-500" :
                      "bg-sky-500/15 text-sky-500"
                    }`}>
                      {n.type === "message" ? <MessageSquare size={14} /> : n.type === "quote" ? <Check size={14} /> : <Bell size={14} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <p className="font-semibold text-sm truncate" style={{ color: "rgb(var(--text))" }}>{n.title}</p>
                        <span className="text-[10px] flex-shrink-0" style={{ color: "rgb(var(--text-subtle))" }}>{timeAgo(n.ts)}</span>
                      </div>
                      <p className="text-xs leading-snug line-clamp-2" style={{ color: "rgb(var(--text-muted))" }}>{n.body}</p>
                    </div>
                    {!n.read && <div className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0 mt-1.5" />}
                  </button>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
