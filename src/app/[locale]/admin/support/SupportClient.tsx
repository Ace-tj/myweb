"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  MessageSquare, Search, Send, Smile, Image as ImageIcon,
  Check, CheckCheck, RefreshCw, User as UserIcon,
} from "lucide-react";
import {
  adminGetThread,
  adminListThreads,
  adminReply,
  type SupportMessage,
  type SupportThread,
  type SupportThreadWithLast,
} from "@/lib/support";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

interface Props {
  initialThreads: SupportThreadWithLast[];
}

const POLL_MS = 5000;

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

function formatTime(ts: string): string {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function initials(name: string): string {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}

export function SupportClient({ initialThreads }: Props) {
  const [threads, setThreads] = useState<SupportThreadWithLast[]>(initialThreads);
  const [selectedId, setSelectedId] = useState<string | null>(initialThreads[0]?.id ?? null);
  const [selectedThread, setSelectedThread] = useState<SupportThread | null>(null);
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [loadingThread, setLoadingThread] = useState(false);
  const [search, setSearch] = useState("");
  const [reply, setReply] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [attached, setAttached] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const threadPollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const listPollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load selected thread + messages
  const loadThread = useCallback(async (id: string) => {
    setLoadingThread(true);
    const res = await adminGetThread(id);
    if (res.ok) {
      setSelectedThread(res.thread);
      setMessages(res.messages);
    }
    setLoadingThread(false);
  }, []);

  // Initial load
  useEffect(() => {
    if (selectedId) loadThread(selectedId);
  }, [selectedId, loadThread]);

  // Poll list and selected thread
  useEffect(() => {
    listPollRef.current = setInterval(async () => {
      const res = await adminListThreads();
      if (res.ok) setThreads(res.threads);
    }, POLL_MS);
    return () => {
      if (listPollRef.current) clearInterval(listPollRef.current);
    };
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    threadPollRef.current = setInterval(() => {
      loadThread(selectedId);
    }, POLL_MS);
    return () => {
      if (threadPollRef.current) clearInterval(threadPollRef.current);
    };
  }, [selectedId, loadThread]);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendReply = useCallback(async () => {
    const body = reply.trim();
    if ((!body && !attached) || !selectedId || sending) return;
    setSending(true);

    const tempId = `tmp-${Date.now()}`;
    const optimistic: SupportMessage = {
      id: tempId,
      threadId: selectedId,
      fromRole: "admin",
      body,
      imageUrl: attached,
      read: true,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimistic]);
    setReply("");
    const sentAttachment = attached;
    setAttached(null);
    setShowEmoji(false);

    const res = await adminReply(selectedId, body, sentAttachment);
    if (res.ok) {
      setMessages((prev) => prev.map((m) => (m.id === tempId ? res.message : m)));
    } else {
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
      alert(`Could not send: ${res.reason}`);
    }
    setSending(false);
  }, [reply, attached, selectedId, sending]);

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

  const filteredThreads = search
    ? threads.filter(
        (t) =>
          t.displayName.toLowerCase().includes(search.toLowerCase()) ||
          (t.displayEmail ?? "").toLowerCase().includes(search.toLowerCase()),
      )
    : threads;

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      {/* Threads list */}
      <aside className="w-80 flex-shrink-0 border-r border-slate-800 bg-slate-900/50 flex flex-col">
        <div className="px-4 py-4 border-b border-slate-800">
          <h1 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <MessageSquare size={18} className="text-indigo-400" /> Support
          </h1>
          <div className="relative">
            <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email…"
              className="w-full pl-7 pr-2 py-1.5 text-xs rounded-md bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredThreads.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              {threads.length === 0 ? "No conversations yet" : "No matches"}
            </div>
          ) : filteredThreads.map((t) => {
            const active = t.id === selectedId;
            const hasUnread = t.unreadForAdmin > 0;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedId(t.id)}
                className={`w-full text-left px-4 py-3 border-b border-slate-800 transition-colors flex gap-3 ${
                  active ? "bg-indigo-600/15 border-l-2 border-l-indigo-500" : "hover:bg-slate-800/50"
                }`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  hasUnread ? "bg-indigo-500/30 text-indigo-300" : "bg-slate-800 text-slate-400"
                }`}>
                  {initials(t.displayName)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <p className={`text-sm font-semibold truncate ${active ? "text-white" : "text-slate-200"}`}>
                      {t.displayName}
                    </p>
                    <span className="text-[10px] flex-shrink-0 text-slate-500">{timeAgo(t.lastMessageAt)}</span>
                  </div>
                  <p className="text-xs text-slate-400 truncate">
                    {t.lastFromRole === "admin" && <span className="text-slate-500">You: </span>}
                    {t.lastBody || "No messages yet"}
                  </p>
                </div>
                {hasUnread && (
                  <span className="self-center min-w-[18px] h-5 px-1.5 rounded-full bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {t.unreadForAdmin}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </aside>

      {/* Conversation */}
      <main className="flex-1 flex flex-col bg-slate-950">
        {!selectedId || !selectedThread ? (
          <div className="flex-1 flex items-center justify-center text-slate-500">
            <div className="text-center">
              <MessageSquare size={32} className="mx-auto mb-3 text-slate-700" />
              <p className="text-sm">Select a conversation to start replying</p>
            </div>
          </div>
        ) : (
          <>
            {/* Thread header */}
            <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-bold">
                  {initials(selectedThread.displayName)}
                </div>
                <div>
                  <p className="text-sm font-bold text-white flex items-center gap-2">
                    <UserIcon size={13} /> {selectedThread.displayName}
                  </p>
                  {selectedThread.displayEmail && (
                    <p className="text-[11px] text-slate-500">{selectedThread.displayEmail}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => loadThread(selectedId)}
                disabled={loadingThread}
                className="p-2 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors disabled:opacity-50"
                title="Refresh"
              >
                <RefreshCw size={14} className={loadingThread ? "animate-spin" : ""} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-2">
              {messages.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-sm">No messages yet</div>
              ) : messages.map((m) => {
                const own = m.fromRole === "admin";
                return (
                  <div key={m.id} className={`flex ${own ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[70%] rounded-2xl px-3 py-2 ${
                      own ? "bg-indigo-600 text-white rounded-br-sm" : "bg-slate-800 text-slate-100 rounded-bl-sm"
                    }`}>
                      {m.imageUrl && (
                        <img src={m.imageUrl} alt="attachment" className="rounded-lg mb-1.5 max-w-full max-h-64 object-cover" />
                      )}
                      {m.body && <p className="text-sm leading-snug whitespace-pre-wrap">{m.body}</p>}
                      <p className={`text-[10px] mt-1 flex items-center gap-1 ${own ? "text-indigo-200" : "text-slate-500"}`}>
                        {formatTime(m.createdAt)}
                        {own && (m.read ? <CheckCheck size={11} /> : <Check size={11} />)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Attached preview */}
            {attached && (
              <div className="px-5 py-2 border-t border-slate-800 flex items-center gap-2 flex-shrink-0">
                <img src={attached} alt="preview" className="w-12 h-12 rounded-md object-cover" />
                <button onClick={() => setAttached(null)} className="text-xs text-red-400 hover:underline">Remove</button>
              </div>
            )}

            {/* Emoji picker */}
            {showEmoji && (
              <div className="absolute bottom-20 right-6 z-50">
                <EmojiPicker
                  onEmojiClick={(d) => { setReply((p) => p + d.emoji); setShowEmoji(false); }}
                  height={360}
                  width={320}
                  theme={"dark" as never}
                />
              </div>
            )}

            {/* Reply input */}
            <div className="border-t border-slate-800 px-5 py-3 flex items-end gap-2 flex-shrink-0 relative">
              <button
                onClick={() => setShowEmoji((v) => !v)}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 transition-colors"
                title="Emoji"
              >
                <Smile size={16} />
              </button>
              <button
                onClick={() => fileRef.current?.click()}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 transition-colors"
                title="Attach"
              >
                <ImageIcon size={16} />
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendReply(); } }}
                placeholder="Reply…"
                rows={1}
                disabled={sending}
                className="flex-1 resize-none bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-indigo-500 max-h-32 disabled:opacity-60"
              />

              <button
                onClick={sendReply}
                disabled={sending || (!reply.trim() && !attached)}
                className="px-4 h-9 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
              >
                <Send size={14} /> Send
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
