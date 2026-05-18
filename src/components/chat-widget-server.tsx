import { getCurrentProfile } from "@/lib/auth";
import { getOrCreateMyConversation, listMessages } from "@/lib/chat";
import { ChatWidget } from "./chat-widget";

/**
 * Server wrapper that resolves the customer's current conversation
 * (creating one if needed) and seeds the widget with the latest messages.
 * Only renders for customers; consultants/admins use their own inbox.
 */
export async function ChatWidgetServer() {
  const profile = await getCurrentProfile();

  if (!profile)
    return <ChatWidget profile={null} conversationId={null} initialMessages={[]} />;

  if (profile.role !== "customer") return null;

  const conversation = await getOrCreateMyConversation(profile.id);
  const messages = conversation ? await listMessages(conversation.id) : [];

  return (
    <ChatWidget
      profile={profile}
      conversationId={conversation?.id ?? null}
      initialMessages={messages}
    />
  );
}
