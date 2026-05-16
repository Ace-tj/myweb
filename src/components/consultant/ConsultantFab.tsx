"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import {
  Headphones, X, Send, Smile, Image as ImageIcon, Search,
  Bell, MessageSquare, Check, CheckCheck, LogIn, AlertCircle, Maximize2,
} from "lucide-react";
import {
  getMyThread,
  sendMyMessage,
  markMyThreadRead,
  type SupportMessage,
} from "@/lib/support";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

type AuthState = "unknown" | "anon" | "no_db" | "ok";

const POLL_MS = 5000;

function formatTime(ts: string | number): string {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function timeAgo(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "now";
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d`;
}

export function ConsultantFab() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"chat" | "notifs">("chat");
  const [authState, setAuthState] = useState<AuthState>("unknown");
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [attached, setAttached] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [unreadFromAdmin, setUnreadFromAdmin] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const hide = pathname?.includes("/preview");

  // Initial fetch on mount
  const refresh = useCallback(async () => {
    const res = await getMyThread();
    if (!res.ok) {
      setAuthState(res.reason === "anon" ? "anon" : "no_db");
      return;
    }
    setAuthState("ok");
    setMessages(res.messages);
    setUnreadFromAdmin(
      res.messages.filter((m) => m.fromRole === "admin" && !m.read).length,
    );
  }, []);

  useEffect(() => {
    setMounted(true);
    refresh();
  }, [refresh]);

  // Poll while panel is open
  useEffect(() => {
    if (!open || tab !== "chat" || authState !== "ok") {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
      return;
    }
    pollRef.current = setInterval(() => {
      refresh();
    }, POLL_MS);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [open, tab, authState, refresh]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (open && tab === "chat") {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, open, tab]);

  // Mark read when chat opened
  useEffect(() => {
    if (open && tab === "chat" && authState === "ok" && unreadFromAdmin > 0) {
      markMyThreadRead().then(() => {
        setUnreadFromAdmin(0);
        setMessages((prev) =>
          prev.map((m) => (m.fromRole === "admin" ? { ...m, read: true } : m)),
        );
      });
    }
  }, [open, tab, authState, unreadFromAdmin]);

  const send = useCallback(async () => {
    const body = input.trim();
    if ((!body && !attached) || sending) return;
    setSending(true);

    // Optimistic add
    const tempId = `tmp-${Date.now()}`;
    const optimistic: SupportMessage = {
      id: tempId,
      threadId: "",
      fromRole: "user",
      body,
      imageUrl: attached,
      read: true,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimistic]);
    setInput("");
    const sentAttachment = attached;
    setAttached(null);
    setShowEmoji(false);

    const res = await sendMyMessage(body, sentAttachment);
    if (res.ok) {
      setMessages((prev) =>
        prev.map((m) => (m.id === tempId ? res.message : m)),
      );
    } else {
      // Mark optimistic as failed
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
      alert("Could not send message. Please try again.");
    }
    setSending(false);
  }, [input, attached, sending]);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1024 * 1024) {
      alert("Image too large. Max 1 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => setAttached(ev.target?.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  const filteredMessages = search
    ? messages.filter((m) => m.body.toLowerCase().includes(search.toLowerCase()))
    : messages;

  if (!mounted || hide) return null;

  const totalUnread = unreadFromAdmin;

  return (
    <>
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

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
        />
      )}

      <div
        className={`fixed z-50 transition-all duration-300 ease-out
          ${open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none"}
          inset-0 md:inset-auto md:bottom-6 md:right-6
          md:w-[380px] md:h-[min(480px,calc(100dvh-6rem))]
          md:rounded-2xl
          border md:shadow-2xl flex flex-col overflow-hidden`}
        style={{ background: "rgb(var(--bg-card))", borderColor: "rgb(var(--border))" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b"
          style={{ borderColor: "rgb(var(--border))", background: "rgb(var(--bg-subtle))" }}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                <Headphones size={16} />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[rgb(var(--bg-card))]" />
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: "rgb(var(--text))" }}>MyWeb Support</p>
              <p className="text-[11px]" style={{ color: "rgb(var(--text-muted))" }}>Typically replies in a few minutes</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Link
              href="/messages"
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[rgb(var(--bg-hover))] transition-colors"
              style={{ color: "rgb(var(--text-muted))" }}
              title="Open in full view"
            >
              <Maximize2 size={15} />
            </Link>
            <button onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[rgb(var(--bg-hover))] transition-colors"
              style={{ color: "rgb(var(--text-muted))" }} aria-label="Close">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 px-3 py-2 border-b" style={{ borderColor: "rgb(var(--border))" }}>
          <button onClick={() => setTab("chat")}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${tab === "chat" ? "bg-indigo-600 text-white" : "hover:bg-[rgb(var(--bg-hover))]"}`}
            style={tab === "chat" ? undefined : { color: "rgb(var(--text-muted))" }}>
            <MessageSquare size={13} /> Chat
            {unreadFromAdmin > 0 && (
              <span className={`text-[10px] px-1.5 rounded-full ${tab === "chat" ? "bg-white/20" : "bg-red-500/20 text-red-500"}`}>
                {unreadFromAdmin}
              </span>
            )}
          </button>
          <button onClick={() => setTab("notifs")}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${tab === "notifs" ? "bg-indigo-600 text-white" : "hover:bg-[rgb(var(--bg-hover))]"}`}
            style={tab === "notifs" ? undefined : { color: "rgb(var(--text-muted))" }}>
            <Bell size={13} /> Notifications
          </button>
        </div>

        {/* Empty / anon / error states */}
        {authState === "anon" ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6 gap-4">
            <div className="w-14 h-14 rounded-full bg-indigo-500/15 flex items-center justify-center text-indigo-500">
              <LogIn size={22} />
            </div>
            <div>
              <p className="font-bold text-base mb-1" style={{ color: "rgb(var(--text))" }}>Sign in to chat</p>
              <p className="text-sm" style={{ color: "rgb(var(--text-muted))" }}>You need an account to message our support team. It only takes 30 seconds.</p>
            </div>
            <div className="flex gap-2 w-full">
              <Link href="/auth/login" onClick={() => setOpen(false)}
                className="flex-1 py-2 rounded-lg border text-sm font-semibold hover:bg-[rgb(var(--bg-hover))] transition-colors text-center"
                style={{ borderColor: "rgb(var(--border))", color: "rgb(var(--text))" }}>
                Sign in
              </Link>
              <Link href="/auth/signup" onClick={() => setOpen(false)}
                className="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors text-center">
                Sign up
              </Link>
            </div>
          </div>
        ) : authState === "no_db" ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6 gap-4">
            <div className="w-14 h-14 rounded-full bg-amber-500/15 flex items-center justify-center text-amber-500">
              <AlertCircle size={22} />
            </div>
            <div>
              <p className="font-bold text-base mb-1" style={{ color: "rgb(var(--text))" }}>Chat is offline</p>
              <p className="text-sm" style={{ color: "rgb(var(--text-muted))" }}>Our messaging system isn&apos;t connected yet. Email us instead at <a href="mailto:hello@myweb.app" className="text-indigo-500 underline">hello@myweb.app</a>.</p>
            </div>
          </div>
        ) : tab === "chat" ? (
          <>
            <div className="flex items-center gap-2 px-3 py-2 border-b" style={{ borderColor: "rgb(var(--border))" }}>
              <div className="relative flex-1">
                <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: "rgb(var(--text-subtle))" }} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search messages…"
                  className="w-full pl-7 pr-2 py-1.5 text-xs rounded-md border outline-none"
                  style={{ background: "rgb(var(--bg))", borderColor: "rgb(var(--border))", color: "rgb(var(--text))" }}
                />
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
              {filteredMessages.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-sm mb-1" style={{ color: "rgb(var(--text))" }}>Say hello 👋</p>
                  <p className="text-xs" style={{ color: "rgb(var(--text-muted))" }}>Send us a message — our team will reply soon.</p>
                </div>
              ) : filteredMessages.map((m) => {
                const own = m.fromRole === "user";
                return (
                  <div key={m.id} className={`flex ${own ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] rounded-2xl px-3 py-2 ${own ? "bg-indigo-600 text-white rounded-br-sm" : "rounded-bl-sm"}`}
                      style={!own ? { background: "rgb(var(--bg-subtle))", color: "rgb(var(--text))" } : undefined}>
                      {m.imageUrl && (
                        <img src={m.imageUrl} alt="attachment" className="rounded-lg mb-1.5 max-w-full max-h-48 object-cover" />
                      )}
                      {m.body && <p className="text-sm leading-snug whitespace-pre-wrap">{m.body}</p>}
                      <p className={`text-[10px] mt-1 flex items-center gap-1 ${own ? "text-indigo-100" : ""}`}
                        style={!own ? { color: "rgb(var(--text-subtle))" } : undefined}>
                        {formatTime(m.createdAt)}
                        {own && (m.read ? <CheckCheck size={11} /> : <Check size={11} />)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {attached && (
              <div className="px-3 py-2 border-t flex items-center gap-2" style={{ borderColor: "rgb(var(--border))" }}>
                <img src={attached} alt="preview" className="w-12 h-12 rounded-md object-cover" />
                <button onClick={() => setAttached(null)} className="text-xs text-red-500 hover:underline">Remove</button>
              </div>
            )}

            {showEmoji && (
              <div className="absolute bottom-16 right-3 z-50">
                <EmojiPicker onEmojiClick={(d) => { setInput((p) => p + d.emoji); setShowEmoji(false); }} height={320} width={300} />
              </div>
            )}

            <div className="border-t px-3 py-2 flex items-end gap-1.5" style={{ borderColor: "rgb(var(--border))" }}>
              <button onClick={() => setShowEmoji((v) => !v)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[rgb(var(--bg-hover))] transition-colors"
                style={{ color: "rgb(var(--text-muted))" }} title="Emoji">
                <Smile size={16} />
              </button>
              <button onClick={() => fileRef.current?.click()}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[rgb(var(--bg-hover))] transition-colors"
                style={{ color: "rgb(var(--text-muted))" }} title="Attach image">
                <ImageIcon size={16} />
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder="Type a message…"
                rows={1}
                disabled={sending}
                className="flex-1 resize-none border rounded-lg px-3 py-1.5 text-sm outline-none max-h-24 disabled:opacity-60"
                style={{ background: "rgb(var(--bg))", borderColor: "rgb(var(--border))", color: "rgb(var(--text))" }}
              />

              <button onClick={send} disabled={sending || (!input.trim() && !attached)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title="Send">
                <Send size={14} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <Bell size={28} style={{ color: "rgb(var(--text-subtle))" }} className="mb-3" />
            <p className="text-sm font-medium mb-1" style={{ color: "rgb(var(--text))" }}>You&apos;re all caught up</p>
            <p className="text-xs" style={{ color: "rgb(var(--text-muted))" }}>Notifications about your projects will appear here.</p>
          </div>
        )}
      </div>
    </>
  );
}
