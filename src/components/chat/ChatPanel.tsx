"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { useTranslations } from "next-intl";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { MessageBubble, type Message } from "./MessageBubble";

interface ChatPanelProps {
  projectId: string;
  currentUserId: string;
  currentUserName: string;
}

function generateId() {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

const SEED_MESSAGES: Message[] = [
  {
    id: "seed-1",
    senderId: "system",
    senderName: "System",
    body: "Project created. Welcome to the project chat!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    reactions: {},
    readBy: ["buyer-001", "consultant-001"],
  },
  {
    id: "seed-2",
    senderId: "consultant-001",
    senderName: "Consultant",
    body: "Hi! I've reviewed your brief and I'm ready to discuss the project. When would you like to start?",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    reactions: { "👍": ["buyer-001"] },
    readBy: ["buyer-001"],
  },
  {
    id: "seed-3",
    senderId: "buyer-001",
    senderName: "Buyer",
    body: "Great! I'd love to kick things off this week. Looking forward to working with you.",
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    reactions: {},
    readBy: [],
  },
];

function isSameGroup(a: Message, b: Message): boolean {
  if (a.senderId !== b.senderId) return false;
  return Math.abs(a.timestamp.getTime() - b.timestamp.getTime()) < 5 * 60 * 1000;
}

export function ChatPanel({
  projectId,
  currentUserId,
  currentUserName,
}: ChatPanelProps) {
  const t = useTranslations("chat");
  const [messages, setMessages] = useState<Message[]>(SEED_MESSAGES);
  const [input, setInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const bottomRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-scroll on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Update document title with unread count
  useEffect(() => {
    const unread = messages.filter(
      (m) => m.senderId !== currentUserId && !m.readBy.includes(currentUserId)
    ).length;
    setUnreadCount(unread);
    document.title = unread > 0 ? `(${unread}) Chat — myweb` : "Chat — myweb";
    return () => {
      document.title = "myweb";
    };
  }, [messages, currentUserId]);

  const sendMessage = useCallback(() => {
    const body = input.trim();
    if (!body && !attachedImage) return;

    const msg: Message = {
      id: generateId(),
      senderId: currentUserId,
      senderName: currentUserName,
      body,
      timestamp: new Date(),
      imageUrl: attachedImage ?? undefined,
      replyTo: replyTo
        ? {
            id: replyTo.id,
            senderName: replyTo.senderName,
            body: replyTo.body,
          }
        : undefined,
      reactions: {},
      readBy: [currentUserId],
    };

    setMessages((prev) => [...prev, msg]);
    setInput("");
    setAttachedImage(null);
    setReplyTo(null);
    setShowEmojiPicker(false);
    setIsTyping(false);
  }, [input, attachedImage, replyTo, currentUserId, currentUserName]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
    setIsTyping(true);
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => setIsTyping(false), 2000);
  }

  function handleEmojiClick(data: EmojiClickData) {
    setInput((prev) => prev + data.emoji);
    setShowEmojiPicker(false);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setAttachedImage(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  function handleReact(msgId: string, emoji: string) {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id !== msgId) return m;
        const existing = m.reactions[emoji] ?? [];
        const hasReacted = existing.includes(currentUserId);
        return {
          ...m,
          reactions: {
            ...m.reactions,
            [emoji]: hasReacted
              ? existing.filter((id) => id !== currentUserId)
              : [...existing, currentUserId],
          },
        };
      })
    );
  }

  const filteredMessages = searchQuery
    ? messages.filter((m) =>
        m.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.senderName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : messages;

  return (
    <div className="flex flex-col h-[600px]">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-neutral-50">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-neutral-700">Chat</span>
          {unreadCount > 0 && (
            <span className="bg-blue-600 text-white text-xs rounded-full px-1.5 py-0.5 font-medium">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("search")}
            className="text-xs border border-neutral-300 rounded-full px-3 py-1 w-36 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Messages list */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        {filteredMessages.map((msg, idx) => {
          const prevMsg = filteredMessages[idx - 1];
          const showAvatar = !prevMsg || !isSameGroup(prevMsg, msg);
          const isOwn = msg.senderId === currentUserId;

          return (
            <MessageBubble
              key={msg.id}
              message={msg}
              isOwn={isOwn}
              currentUserId={currentUserId}
              showAvatar={showAvatar}
              onReply={(m) => setReplyTo(m)}
              onReact={handleReact}
            />
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-neutral-400 pl-9">
            <span className="flex gap-0.5">
              <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </span>
            <span>{t("typing", { name: currentUserName })}</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Reply preview */}
      {replyTo && (
        <div className="mx-4 mb-1 flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 text-xs">
          <span className="text-blue-600 font-medium">↩ {replyTo.senderName}:</span>
          <span className="text-blue-700 truncate flex-1">{replyTo.body}</span>
          <button
            onClick={() => setReplyTo(null)}
            className="text-blue-400 hover:text-blue-600 ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Image preview */}
      {attachedImage && (
        <div className="mx-4 mb-1 flex items-center gap-2">
          <img
            src={attachedImage}
            alt="preview"
            className="h-16 w-16 object-cover rounded-lg border border-neutral-200"
          />
          <button
            onClick={() => setAttachedImage(null)}
            className="text-red-400 hover:text-red-600 text-xs"
          >
            Remove
          </button>
        </div>
      )}

      {/* Emoji picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-24 left-4 z-50">
          <EmojiPicker onEmojiClick={handleEmojiClick} height={350} width={300} />
        </div>
      )}

      {/* Input area */}
      <div className="px-4 py-3 border-t border-neutral-200 bg-white relative">
        <div className="flex items-end gap-2">
          {/* Emoji button */}
          <button
            type="button"
            onClick={() => setShowEmojiPicker((v) => !v)}
            className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-neutral-700 transition-colors"
            title="Emoji"
          >
            😊
          </button>

          {/* File attach */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-neutral-700 transition-colors"
            title={t("attachImage")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Text input */}
          <textarea
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={t("placeholder")}
            rows={1}
            className="flex-1 rounded-xl border border-neutral-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none max-h-32 min-h-[40px]"
            style={{ overflow: "auto" }}
          />

          {/* Send button */}
          <button
            type="button"
            onClick={sendMessage}
            disabled={!input.trim() && !attachedImage}
            className="p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            title={t("send")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
