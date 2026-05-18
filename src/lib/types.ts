export type Role = "customer" | "consultant" | "admin";
export type ConsultantStatus = "pending" | "approved" | "rejected";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: Role;
  consultant_status: ConsultantStatus | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Demo {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  features: string[];
  price_usd: number;
  preview_path: string;
  thumbnail_color: string;
  icon: string;
  enabled: boolean;
  display_order: number;
  created_at: string;
}

export interface Conversation {
  id: string;
  customer_id: string;
  consultant_id: string | null;
  subject: string | null;
  status: "open" | "closed" | "archived";
  last_message_at: string;
  created_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  body: string;
  read_at: string | null;
  created_at: string;
}
