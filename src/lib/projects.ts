"use server";

import { revalidatePath } from "next/cache";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { getCurrentSession, supabaseConfigured } from "@/lib/auth";

export interface ProjectBrief {
  businessName: string;
  description: string;
  demoSlug?: string;
  colorPref?: string;
  pagesNeeded?: number | null;
  budget?: number | null;
  deadline?: string | null;
  notes?: string;
}

export type ProjectStatus =
  | "new"
  | "assigned"
  | "quoted"
  | "in_progress"
  | "review"
  | "delivered"
  | "cancelled";

export interface Project {
  id: string;
  buyerId: string;
  consultantId: string | null;
  demoId: string | null;
  brief: ProjectBrief;
  status: ProjectStatus;
  quoteAmount: number | null;
  createdAt: string;
  updatedAt: string;
}

type ProjectFailure = {
  ok: false;
  reason: "anon" | "forbidden" | "not_found" | "db_off" | "error";
  message?: string;
};

export type ProjectResult = { ok: true } | ProjectFailure;
export type ProjectByIdResult =
  | { ok: true; project: Project }
  | ProjectFailure;
export type SubmitBriefResult =
  | { ok: true; projectId: string }
  | ProjectFailure;

function rowToProject(row: Record<string, unknown>): Project {
  const briefRaw = (row.brief as Record<string, unknown> | null) ?? {};
  return {
    id: String(row.id),
    buyerId: String(row.buyer_id),
    consultantId: row.consultant_id ? String(row.consultant_id) : null,
    demoId: row.demo_id ? String(row.demo_id) : null,
    brief: {
      businessName: (briefRaw.businessName as string) ?? "",
      description: (briefRaw.description as string) ?? "",
      demoSlug: (briefRaw.demoSlug as string) ?? undefined,
      colorPref: (briefRaw.colorPref as string) ?? undefined,
      pagesNeeded:
        typeof briefRaw.pagesNeeded === "number"
          ? briefRaw.pagesNeeded
          : briefRaw.pagesNeeded
            ? Number(briefRaw.pagesNeeded)
            : null,
      budget:
        typeof briefRaw.budget === "number"
          ? briefRaw.budget
          : briefRaw.budget
            ? Number(briefRaw.budget)
            : null,
      deadline: (briefRaw.deadline as string) ?? null,
      notes: (briefRaw.notes as string) ?? undefined,
    },
    status: (row.status as ProjectStatus) ?? "new",
    quoteAmount: row.quote_amount ? Number(row.quote_amount) : null,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at ?? row.created_at),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// READ
// ─────────────────────────────────────────────────────────────────────────────

export async function listMyProjectsAsBuyer(): Promise<Project[]> {
  const session = await getCurrentSession();
  if (!session) return [];
  if (!supabaseConfigured()) return [];

  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("buyer_id", session.id)
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data.map(rowToProject);
}

export async function listMyProjectsAsConsultant(): Promise<Project[]> {
  const session = await getCurrentSession();
  if (!session) return [];
  if (!supabaseConfigured()) return [];

  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("consultant_id", session.id)
    .order("updated_at", { ascending: false });

  if (error || !data) return [];
  return data.map(rowToProject);
}

export async function listOpenBriefs(): Promise<Project[]> {
  const session = await getCurrentSession();
  if (!session) return [];
  if (session.role !== "consultant" && session.role !== "admin") return [];
  if (!supabaseConfigured()) return [];

  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .is("consultant_id", null)
    .eq("status", "new")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data.map(rowToProject);
}

export async function listAllProjects(): Promise<Project[]> {
  const session = await getCurrentSession();
  if (!session || session.role !== "admin") return [];
  if (!supabaseConfigured()) return [];

  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error || !data) return [];
  return data.map(rowToProject);
}

export async function getProjectById(
  projectId: string,
): Promise<ProjectByIdResult> {
  const session = await getCurrentSession();
  if (!session) return { ok: false, reason: "anon" };
  if (!supabaseConfigured()) return { ok: false, reason: "db_off" };

  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .maybeSingle();

  if (error) return { ok: false, reason: "error", message: error.message };
  if (!data) return { ok: false, reason: "not_found" };

  const project = rowToProject(data);

  // Access control: buyer owns it, consultant assigned to it, or admin
  const allowed =
    session.role === "admin" ||
    project.buyerId === session.id ||
    project.consultantId === session.id;
  if (!allowed) return { ok: false, reason: "forbidden" };

  return { ok: true, project };
}

/**
 * Get a project for consultant view. Consultants may view:
 *   - any unassigned brief (so they can decide whether to claim it)
 *   - any project they're assigned to
 * Admins can view everything.
 */
export async function getProjectForConsultant(
  projectId: string,
): Promise<ProjectByIdResult> {
  const session = await getCurrentSession();
  if (!session) return { ok: false, reason: "anon" };
  if (session.role !== "consultant" && session.role !== "admin") {
    return { ok: false, reason: "forbidden" };
  }
  if (!supabaseConfigured()) return { ok: false, reason: "db_off" };

  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .maybeSingle();

  if (error) return { ok: false, reason: "error", message: error.message };
  if (!data) return { ok: false, reason: "not_found" };

  const project = rowToProject(data);
  const isAdmin = session.role === "admin";
  const isMine = project.consultantId === session.id;
  const isOpen = project.consultantId === null;
  if (!isAdmin && !isMine && !isOpen) {
    return { ok: false, reason: "forbidden" };
  }
  return { ok: true, project };
}

// ─────────────────────────────────────────────────────────────────────────────
// WRITE
// ─────────────────────────────────────────────────────────────────────────────

export async function submitBrief(
  brief: ProjectBrief,
): Promise<SubmitBriefResult> {
  const session = await getCurrentSession();
  if (!session) return { ok: false, reason: "anon" };
  if (session.role === "consultant") return { ok: false, reason: "forbidden" };
  if (!supabaseConfigured()) return { ok: false, reason: "db_off" };

  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("projects")
    .insert({
      buyer_id: session.id,
      consultant_id: null,
      demo_id: null,
      brief,
      status: "new",
    })
    .select("id")
    .maybeSingle();

  if (error) return { ok: false, reason: "error", message: error.message };
  if (!data) return { ok: false, reason: "error", message: "Insert returned no row" };

  revalidatePath("/buyer/dashboard");
  return { ok: true, projectId: String(data.id) };
}

export async function acceptQuote(
  projectId: string,
): Promise<ProjectResult> {
  const session = await getCurrentSession();
  if (!session) return { ok: false, reason: "anon" };
  if (!supabaseConfigured()) return { ok: false, reason: "db_off" };

  const supabase = await createServerClient();

  const verify = await getProjectById(projectId);
  if (!verify.ok) return verify;
  if (verify.project.buyerId !== session.id && session.role !== "admin") {
    return { ok: false, reason: "forbidden" };
  }

  const { error } = await supabase
    .from("projects")
    .update({ status: "in_progress" })
    .eq("id", projectId);

  if (error) return { ok: false, reason: "error", message: error.message };

  revalidatePath(`/buyer/projects/${projectId}`);
  return { ok: true };
}

/** Consultant claims an unassigned brief. Race-safe via `.is("consultant_id", null)`. */
export async function claimBrief(projectId: string): Promise<ProjectResult> {
  const session = await getCurrentSession();
  if (!session) return { ok: false, reason: "anon" };
  if (session.role !== "consultant") return { ok: false, reason: "forbidden" };
  if (!supabaseConfigured()) return { ok: false, reason: "db_off" };

  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("projects")
    .update({ consultant_id: session.id, status: "assigned" })
    .eq("id", projectId)
    .is("consultant_id", null)
    .select("id")
    .maybeSingle();

  if (error) return { ok: false, reason: "error", message: error.message };
  if (!data) {
    return {
      ok: false,
      reason: "not_found",
      message: "Brief was already claimed or doesn't exist.",
    };
  }

  revalidatePath(`/consultant/projects/${projectId}`);
  revalidatePath("/consultant/dashboard");
  revalidatePath("/consultant/briefs");
  return { ok: true };
}

/** Consultant sends a quote — sets quote_amount and status='quoted'. */
export async function sendQuote(
  projectId: string,
  amount: number,
): Promise<ProjectResult> {
  const session = await getCurrentSession();
  if (!session) return { ok: false, reason: "anon" };
  if (session.role !== "consultant") return { ok: false, reason: "forbidden" };
  if (!supabaseConfigured()) return { ok: false, reason: "db_off" };
  if (!Number.isFinite(amount) || amount <= 0) {
    return {
      ok: false,
      reason: "error",
      message: "Quote amount must be a positive number.",
    };
  }

  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("projects")
    .update({ quote_amount: amount, status: "quoted" })
    .eq("id", projectId)
    .eq("consultant_id", session.id)
    .select("id")
    .maybeSingle();

  if (error) return { ok: false, reason: "error", message: error.message };
  if (!data) {
    return {
      ok: false,
      reason: "forbidden",
      message: "You're not assigned to this project.",
    };
  }

  revalidatePath(`/consultant/projects/${projectId}`);
  revalidatePath(`/buyer/projects/${projectId}`);
  revalidatePath("/consultant/dashboard");
  return { ok: true };
}

/** Consultant releases a brief back to the open pool. */
export async function releaseBrief(
  projectId: string,
): Promise<ProjectResult> {
  const session = await getCurrentSession();
  if (!session) return { ok: false, reason: "anon" };
  if (session.role !== "consultant") return { ok: false, reason: "forbidden" };
  if (!supabaseConfigured()) return { ok: false, reason: "db_off" };

  const supabase = await createServerClient();
  const { error } = await supabase
    .from("projects")
    .update({ consultant_id: null, status: "new", quote_amount: null })
    .eq("id", projectId)
    .eq("consultant_id", session.id);

  if (error) return { ok: false, reason: "error", message: error.message };

  revalidatePath(`/consultant/projects/${projectId}`);
  revalidatePath("/consultant/dashboard");
  revalidatePath("/consultant/briefs");
  return { ok: true };
}

export async function declineQuote(
  projectId: string,
): Promise<ProjectResult> {
  const session = await getCurrentSession();
  if (!session) return { ok: false, reason: "anon" };
  if (!supabaseConfigured()) return { ok: false, reason: "db_off" };

  const supabase = await createServerClient();

  const verify = await getProjectById(projectId);
  if (!verify.ok) return verify;
  if (verify.project.buyerId !== session.id && session.role !== "admin") {
    return { ok: false, reason: "forbidden" };
  }

  const { error } = await supabase
    .from("projects")
    .update({ status: "new", consultant_id: null, quote_amount: null })
    .eq("id", projectId);

  if (error) return { ok: false, reason: "error", message: error.message };

  revalidatePath(`/buyer/projects/${projectId}`);
  return { ok: true };
}
