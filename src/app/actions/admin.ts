"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getSupabaseServer } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth";

async function requireAdmin() {
  const p = await getCurrentProfile();
  if (!p || p.role !== "admin") throw new Error("Forbidden");
}

const ConsultantSchema = z.object({
  userId: z.string().uuid(),
  decision: z.enum(["approved", "rejected", "pending"]),
});

export async function setConsultantStatus(formData: FormData) {
  await requireAdmin();
  const parsed = ConsultantSchema.safeParse({
    userId: formData.get("userId"),
    decision: formData.get("decision"),
  });
  if (!parsed.success) return;
  const supabase = await getSupabaseServer();
  await supabase
    .from("profiles")
    .update({ consultant_status: parsed.data.decision })
    .eq("id", parsed.data.userId);
  revalidatePath("/[locale]/admin/users", "page");
}

const DemoToggleSchema = z.object({
  slug: z.string(),
  enabled: z.enum(["true", "false"]),
});

export async function toggleDemo(formData: FormData) {
  await requireAdmin();
  const parsed = DemoToggleSchema.safeParse({
    slug: formData.get("slug"),
    enabled: formData.get("enabled"),
  });
  if (!parsed.success) return;
  const supabase = await getSupabaseServer();
  await supabase
    .from("demos")
    .update({ enabled: parsed.data.enabled === "true" })
    .eq("slug", parsed.data.slug);
  revalidatePath("/[locale]/admin/demos", "page");
  revalidatePath("/[locale]/demos", "page");
}
