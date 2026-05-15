"use client";

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  body: string;
  timestamp: Date;
  imageUrl?: string;
  replyTo?: { id: string; senderName: string; body: string };
  reactions: Record<string, string[]>; // emoji -> list of userIds
  readBy: string[];
}

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  currentUserId: string;
  showAvatar: boolean;
  onReply: (msg: Message) => void;
  onReact: (msgId: string, emoji: string) => void;
}

const REACTION_EMOJIS = ["👍", "❤️", "😂"];

function formatTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const mins = Math.floor(diff / 60000);

  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const msgDay = new Date(date);
  msgDay.setHours(0, 0, 0, 0);

  const dayDiff = Math.floor(
    (today.getTime() - msgDay.getTime()) / (1000 * 60 * 60 * 24)
  );

  const timeStr = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (dayDiff === 0) return `today ${timeStr}`;
  if (dayDiff === 1) return `yesterday ${timeStr}`;
  return date.toLocaleDateString() + " " + timeStr;
}

export function MessageBubble({
  message,
  isOwn,
  currentUserId,
  showAvatar,
  onReply,
  onReact,
}: MessageBubbleProps) {
  const totalReactions = Object.entries(message.reactions).filter(
    ([, users]) => users.length > 0
  );

  return (
    <div
      className={`group flex gap-2 items-end ${isOwn ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div className="w-7 h-7 shrink-0 flex items-end">
        {showAvatar && !isOwn && (
          <div className="w-7 h-7 rounded-full bg-neutral-300 flex items-center justify-center text-xs font-semibold text-neutral-600">
            {message.senderName.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Bubble */}
      <div className={`max-w-xs lg:max-w-md ${isOwn ? "items-end" : "items-start"} flex flex-col gap-0.5`}>
        {/* Sender name */}
        {showAvatar && !isOwn && (
          <span className="text-xs text-neutral-500 ml-1">{message.senderName}</span>
        )}

        {/* Reply preview */}
        {message.replyTo && (
          <div
            className={`text-xs rounded-lg px-3 py-1.5 border-l-2 mb-0.5 max-w-full truncate ${
              isOwn
                ? "bg-blue-50 border-blue-400 text-blue-700"
                : "bg-neutral-100 border-neutral-400 text-neutral-600"
            }`}
          >
            <span className="font-medium">{message.replyTo.senderName}: </span>
            {message.replyTo.body}
          </div>
        )}

        {/* Message body */}
        <div
          className={`relative rounded-2xl px-4 py-2 text-sm ${
            isOwn
              ? "bg-blue-600 text-white rounded-br-sm"
              : "bg-white border border-neutral-200 text-neutral-800 rounded-bl-sm"
          }`}
        >
          {message.body && <p className="whitespace-pre-wrap break-words">{message.body}</p>}

          {message.imageUrl && (
            <div className="mt-2 rounded-lg overflow-hidden">
              <img
                src={message.imageUrl}
                alt="attachment"
                className="max-w-full rounded-lg object-cover"
                style={{ maxHeight: 200 }}
              />
            </div>
          )}

          {/* Timestamp + read receipt */}
          <div
            className={`flex items-center gap-1 mt-1 text-xs ${
              isOwn ? "text-blue-200 justify-end" : "text-neutral-400"
            }`}
          >
            <span>{formatTime(message.timestamp)}</span>
            {isOwn && message.readBy.length > 0 && (
              <span title="Read">✓✓</span>
            )}
          </div>
        </div>

        {/* Reactions */}
        {totalReactions.length > 0 && (
          <div className={`flex gap-1 flex-wrap ${isOwn ? "justify-end" : "justify-start"}`}>
            {totalReactions.map(([emoji, users]) => (
              <button
                key={emoji}
                onClick={() => onReact(message.id, emoji)}
                className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border transition-colors ${
                  users.includes(currentUserId)
                    ? "bg-blue-100 border-blue-300 text-blue-700"
                    : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                }`}
              >
                {emoji}
                <span>{users.length}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Action buttons (hover) */}
      <div
        className={`hidden group-hover:flex items-center gap-1 self-center ${
          isOwn ? "flex-row" : "flex-row-reverse"
        }`}
      >
        <button
          onClick={() => onReply(message)}
          title="Reply"
          className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <polyline points="9 17 4 12 9 7" />
            <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
          </svg>
        </button>

        {REACTION_EMOJIS.map((emoji) => (
          <button
            key={emoji}
            onClick={() => onReact(message.id, emoji)}
            className="p-1 rounded-full hover:bg-neutral-100 text-sm transition-colors"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
