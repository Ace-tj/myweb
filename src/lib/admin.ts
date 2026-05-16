"use server";

import { revalidatePath } from "next/cache";
import { createClient as createServerClient } from "@/lib/supabase/server";
import {
  getCurrentSession,
  supabaseConfigured,
  type Role,
} from "@/lib/auth";

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  approved?: boolean;
  isAgent?: boolean;
  createdAt: string;
}

export interface AdminStats {
  totalUsers: number;
  totalBuyers: number;
  totalConsultants: number;
  totalAdmins: number;
  totalProjects: number;
  activeProjects: number;
  newBriefs: number;
}

type AdminFailure = {
  ok: false;
  reason: "anon" | "forbidden" | "db_off" | "error";
  message?: string;
};
type AdminOk = { ok: true };
type AdminResult = AdminOk | AdminFailure;

const ZERO_STATS: AdminStats = {
  totalUsers: 0,
  totalBuyers: 0,
  totalConsultants: 0,
  totalAdmins: 0,
  totalProjects: 0,
  activeProjects: 0,
  newBriefs: 0,
};

function rowToAdminUser(row: Record<string, unknown>): AdminUser {
  return {
    id: String(row.id),
    email: String(row.email ?? ""),
    fullName: String(row.full_name ?? ""),
    role: (row.role as Role) ?? "buyer",
    approved: typeof row.approved === "boolean" ? row.approved : undefined,
    isAgent: typeof row.is_agent === "boolean" ? row.is_agent : undefined,
    createdAt: String(row.created_at ?? ""),
  };
}

async function requireAdmin() {
  const session = await getCurrentSession();
  if (!session) return { ok: false as const, reason: "anon" as const };
  if (session.role !== "admin")
    return { ok: false as const, reason: "forbidden" as const };
  if (!supabaseConfigured())
    return { ok: false as const, reason: "db_off" as const };
  return { ok: true as const, session };
}

export async function getAdminStats(): Promise<AdminStats> {
  const gate = await requireAdmin();
  if (!gate.ok) return ZERO_STATS;

  const supabase = await createServerClient();

  const counts = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("role", "buyer"),
    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("role", "consultant"),
    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("role", "admin"),
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase
      .from("projects")
      .select("*", { count: "exact", head: true })
      .in("status", ["assigned", "quoted", "in_progress", "review"]),
    supabase
      .from("projects")
      .select("*", { count: "exact", head: true })
      .eq("status", "new"),
  ]);

  return {
    totalUsers: counts[0].count ?? 0,
    totalBuyers: counts[1].count ?? 0,
    totalConsultants: counts[2].count ?? 0,
    totalAdmins: counts[3].count ?? 0,
    totalProjects: counts[4].count ?? 0,
    activeProjects: counts[5].count ?? 0,
    newBriefs: counts[6].count ?? 0,
  };
}

export async function listAdminUsers(): Promise<AdminUser[]> {
  const gate = await requireAdmin();
  if (!gate.ok) return [];

  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, approved, is_agent, created_at")
    .order("created_at", { ascending: false })
    .limit(500);

  if (error || !data) return [];
  return data.map(rowToAdminUser);
}

export async function setUserRole(
  userId: string,
  newRole: Role,
): Promise<AdminResult> {
  const gate = await requireAdmin();
  if (!gate.ok) return { ok: false, reason: gate.reason };

  const supabase = await createServerClient();
  const { error } = await supabase
    .from("profiles")
    .update({ role: newRole })
    .eq("id", userId);

  if (error) return { ok: false, reason: "error", message: error.message };
  revalidatePath("/admin/users");
  return { ok: true };
}

export async function setUserApproved(
  userId: string,
  approved: boolean,
): Promise<AdminResult> {
  const gate = await requireAdmin();
  if (!gate.ok) return { ok: false, reason: gate.reason };

  const supabase = await createServerClient();
  // Try to set approved; if column doesn't exist the request errors out.
  const { error } = await supabase
    .from("profiles")
    .update({ approved })
    .eq("id", userId);

  if (error) return { ok: false, reason: "error", message: error.message };
  revalidatePath("/admin/users");
  return { ok: true };
}
