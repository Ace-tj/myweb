"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Link } from "@/i18n/navigation";
import {
  Send, Smile, Image as ImageIcon, Search, Headphones,
  Check, CheckCheck, ArrowLeft, MessageSquare, AlertCircle,
} from "lucide-react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import {
  getMyThread,
  sendMyMessage,
  markMyThreadRead,
  type SupportMessage,
  type SupportThread,
} from "@/lib/support";
import type { Role } from "@/lib/auth";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

interface Props {
  initialState: { thread: SupportThread; messages: SupportMessage[] } | null;
  reason: string | null;
  session: { name: string; role: Role } | null;
}

const POLL_MS = 4000;

function formatTime(ts: string): string {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatDateHeader(ts: string): string {
  const d = new Date(ts);
  const today = new Date();
  if (d.toDateString() === today.toDateString()) return "Today";
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
  return d.toLocaleDateString([], { month: "long", day: "numeric", year: "numeric" });
}

export function MessagesClient({ initialState, reason, session }: Props) {
  const [messages, setMessages] = useState<SupportMessage[]>(initialState?.messages ?? []);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [attached, setAttached] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [unread, setUnread] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const refresh = useCallback(async () => {
    const res = await getMyThread();
    if (res.ok) {
      setMessages(res.messages);
      setUnread(res.messages.filter((m) => m.fromRole === "admin" && !m.read).length);
    }
  }, []);

  // Mark read on mount
  useEffect(() => {
    if (initialState && unread > 0) {
      markMyThreadRead().then(() => {
        setUnread(0);
        setMessages((prev) => prev.map((m) => (m.fromRole === "admin" ? { ...m, read: true } : m)));
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Polling
  useEffect(() => {
    pollRef.current = setInterval(refresh, POLL_MS);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [refresh]);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = useCallback(async () => {
    const body = input.trim();
    if ((!body && !attached) || sending) return;
    setSending(true);

    const tempId = `tmp-${Date.now()}`;
    const optimistic: SupportMessage = {
      id: tempId,
      threadId: initialState?.thread.id ?? "",
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
      setMessages((prev) => prev.map((m) => (m.id === tempId ? res.message : m)));
    } else {
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
      alert("Could not send. Please try again.");
    }
    setSending(false);
  }, [input, attached, sending, initialState]);

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

  const dashPath = !session
    ? "/"
    : session.role === "consultant"
      ? "/consultant/dashboard"
      : "/buyer/dashboard";

  // Anonymous-visitor state — friendly "sign in to chat" instead of redirecting.
  if (!session) {
    return (
      <div className="min-h-screen flex flex-col bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
        <Header dashPath="/" session={null} />
        <main className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="text-center max-w-md animate-fade-up">
            <div className="mx-auto mb-5 w-16 h-16 rounded-2xl bg-[rgb(var(--accent-subtle))] flex items-center justify-center">
              <Headphones size={26} className="text-[rgb(var(--accent))]" aria-hidden />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              Chat with support
            </h1>
            <p className="text-[rgb(var(--text-muted))] mb-7 leading-relaxed">
              Sign in or create a free account to message our team. We reply within minutes during working hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[rgb(var(--accent))] text-white font-semibold text-sm hover:bg-[rgb(var(--accent-hover))] transition-all shadow-lg shadow-[rgb(var(--accent))]/25 hover:scale-[1.02]"
              >
                Sign in
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))] font-semibold text-sm hover:bg-[rgb(var(--bg-hover))] transition-colors"
              >
                Create account
              </Link>
            </div>
            <p className="mt-7 text-xs text-[rgb(var(--text-subtle))]">
              Or email us directly:{" "}
              <a
                href="mailto:hello@myweb.app"
                className="text-[rgb(var(--accent))] hover:underline font-medium"
              >
                hello@myweb.app
              </a>
            </p>
          </div>
        </main>
      </div>
    );
  }

  // Group messages by date
  const grouped: { date: string; msgs: SupportMessage[] }[] = [];
  const filtered = search
    ? messages.filter((m) => m.body.toLowerCase().includes(search.toLowerCase()))
    : messages;
  for (const m of filtered) {
    const date = formatDateHeader(m.createdAt);
    const last = grouped[grouped.length - 1];
    if (last && last.date === date) last.msgs.push(m);
    else grouped.push({ date, msgs: [m] });
  }

  // No-DB state
  if (!initialState && reason === "no_db") {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "rgb(var(--bg))" }}>
        <Header dashPath={dashPath} session={session} />
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-full bg-amber-500/15 text-amber-500 flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={26} />
            </div>
            <h1 className="text-2xl font-bold mb-2" style={{ color: "rgb(var(--text))" }}>Chat is offline</h1>
            <p className="text-sm" style={{ color: "rgb(var(--text-muted))" }}>
              The support messaging system isn&apos;t connected yet. Reach us at <a href="mailto:hello@myweb.app" className="text-indigo-500 underline">hello@myweb.app</a>.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "rgb(var(--bg))" }}>
      <Header dashPath={dashPath} session={session} />

      <main className="flex-1 mx-auto max-w-3xl w-full px-4 py-6 flex flex-col" style={{ height: "calc(100vh - 4rem)" }}>
        <div className="rounded-2xl border flex flex-col flex-1 overflow-hidden shadow-sm" style={{ background: "rgb(var(--bg-card))", borderColor: "rgb(var(--border))" }}>

          {/* Thread header */}
          <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: "rgb(var(--border))", background: "rgb(var(--bg-subtle))" }}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                  <Headphones size={18} />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2" style={{ borderColor: "rgb(var(--bg-card))" }} />
              </div>
              <div>
                <p className="font-bold text-base" style={{ color: "rgb(var(--text))" }}>MyWeb Support</p>
                <p className="text-xs" style={{ color: "rgb(var(--text-muted))" }}>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 align-middle" />
                  Online · Replies in a few minutes
                </p>
              </div>
            </div>
            <div className="relative w-48 hidden sm:block">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: "rgb(var(--text-subtle))" }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search…"
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border outline-none"
                style={{ background: "rgb(var(--bg))", borderColor: "rgb(var(--border))", color: "rgb(var(--text))" }}
              />
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5">
            {grouped.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-14 h-14 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center mx-auto mb-3">
                  <MessageSquare size={22} />
                </div>
                <p className="text-base font-semibold mb-1" style={{ color: "rgb(var(--text))" }}>Say hello 👋</p>
                <p className="text-sm" style={{ color: "rgb(var(--text-muted))" }}>Send a message — our team replies within minutes.</p>
              </div>
            ) : grouped.map((group, gi) => (
              <div key={gi}>
                <div className="flex items-center gap-2 my-4">
                  <div className="flex-1 h-px" style={{ background: "rgb(var(--border))" }} />
                  <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "rgb(var(--text-subtle))" }}>{group.date}</span>
                  <div className="flex-1 h-px" style={{ background: "rgb(var(--border))" }} />
                </div>
                <div className="space-y-2">
                  {group.msgs.map((m) => {
                    const own = m.fromRole === "user";
                    return (
                      <div key={m.id} className={`flex ${own ? "justify-end" : "justify-start"} gap-2`}>
                        {!own && (
                          <div className="w-8 h-8 rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center text-white self-end">
                            <Headphones size={13} />
                          </div>
                        )}
                        <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${own ? "bg-indigo-600 text-white rounded-br-md" : "rounded-bl-md"}`}
                          style={!own ? { background: "rgb(var(--bg-subtle))", color: "rgb(var(--text))" } : undefined}>
                          {m.imageUrl && (
                            <img src={m.imageUrl} alt="attachment" className="rounded-lg mb-2 max-w-full max-h-72 object-cover" />
                          )}
                          {m.body && <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.body}</p>}
                          <p className={`text-[10px] mt-1 flex items-center gap-1 ${own ? "text-indigo-200 justify-end" : ""}`}
                            style={!own ? { color: "rgb(var(--text-subtle))" } : undefined}>
                            {formatTime(m.createdAt)}
                            {own && (m.read ? <CheckCheck size={11} /> : <Check size={11} />)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Attached preview */}
          {attached && (
            <div className="px-5 py-2 border-t flex items-center gap-2" style={{ borderColor: "rgb(var(--border))" }}>
              <img src={attached} alt="preview" className="w-14 h-14 rounded-md object-cover" />
              <button onClick={() => setAttached(null)} className="text-xs text-red-500 hover:underline font-medium">Remove</button>
            </div>
          )}

          {/* Emoji picker */}
          {showEmoji && (
            <div className="absolute z-50" style={{ bottom: "5rem", right: "1.5rem" }}>
              <EmojiPicker onEmojiClick={(d) => { setInput((p) => p + d.emoji); setShowEmoji(false); }} height={380} width={340} />
            </div>
          )}

          {/* Input */}
          <div className="border-t px-4 py-3 flex items-end gap-2" style={{ borderColor: "rgb(var(--border))", background: "rgb(var(--bg-card))" }}>
            <button onClick={() => setShowEmoji((v) => !v)}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[rgb(var(--bg-hover))] transition-colors"
              style={{ color: "rgb(var(--text-muted))" }} title="Emoji">
              <Smile size={18} />
            </button>
            <button onClick={() => fileRef.current?.click()}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[rgb(var(--bg-hover))] transition-colors"
              style={{ color: "rgb(var(--text-muted))" }} title="Attach image">
              <ImageIcon size={18} />
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Type a message…"
              rows={1}
              disabled={sending}
              className="flex-1 resize-none border rounded-xl px-4 py-2 text-sm outline-none max-h-32 disabled:opacity-60"
              style={{ background: "rgb(var(--bg))", borderColor: "rgb(var(--border))", color: "rgb(var(--text))" }}
            />

            <button onClick={send} disabled={sending || (!input.trim() && !attached)}
              className="h-10 px-4 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5">
              <Send size={14} /> <span className="hidden sm:inline">Send</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function Header({
  dashPath,
  session,
}: {
  dashPath: string;
  session: { name: string; role: Role } | null;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]/90 backdrop-blur-md flex-shrink-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {/* Back — always visible, real button shape so it's obviously clickable */}
          <Link
            href={dashPath as "/"}
            aria-label="Back to dashboard"
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-lg text-sm font-medium text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))] hover:bg-[rgb(var(--bg-hover))] active:scale-95 transition-all border border-transparent hover:border-[rgb(var(--border))]"
          >
            <ArrowLeft size={16} aria-hidden />
            <span>Back</span>
          </Link>
          <div className="h-5 w-px bg-[rgb(var(--border))]" />
          <Link
            href="/"
            className="flex items-center font-extrabold text-lg tracking-tight shrink-0"
            aria-label="myweb home"
          >
            <span className="gradient-text">myweb</span>
          </Link>
          <span className="hidden md:inline text-sm text-[rgb(var(--text-muted))] font-medium border-l border-[rgb(var(--border))] pl-3 truncate">
            Messages
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {session && (
            <span className="hidden sm:inline text-sm text-[rgb(var(--text-muted))] truncate max-w-[140px]">
              {session.name}
            </span>
          )}
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
