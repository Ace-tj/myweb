"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { submitBrief, type ProjectBrief } from "@/lib/projects";

const briefSchema = z.object({
  businessName: z.string().min(1),
  description: z.string().min(10),
  demoSlug: z.string().optional(),
  colorPref: z.string().optional(),
  pagesNeeded: z.string().optional(),
  budget: z.string().optional(),
  deadline: z.string().optional(),
  notes: z.string().optional(),
  locale: z.string().min(2).max(5),
});

export type RequestState =
  | { status: "idle" }
  | { status: "error"; errorKey: string }
  | { status: "ok" };

export async function requestAction(
  _prev: RequestState,
  formData: FormData,
): Promise<RequestState> {
  const parsed = briefSchema.safeParse({
    businessName: formData.get("businessName"),
    description: formData.get("description"),
    demoSlug: formData.get("demoSlug") || undefined,
    colorPref: formData.get("colorPref") || undefined,
    pagesNeeded: formData.get("pagesNeeded") || undefined,
    budget: formData.get("budget") || undefined,
    deadline: formData.get("deadline") || undefined,
    notes: formData.get("notes") || undefined,
    locale: formData.get("locale"),
  });

  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    if (issue?.path[0] === "businessName")
      return { status: "error", errorKey: "businessNameRequired" };
    if (issue?.path[0] === "description")
      return { status: "error", errorKey: "descriptionRequired" };
    return { status: "error", errorKey: "generic" };
  }

  const { locale, pagesNeeded, budget, deadline, ...rest } = parsed.data;

  const brief: ProjectBrief = {
    businessName: rest.businessName,
    description: rest.description,
    demoSlug: rest.demoSlug,
    colorPref: rest.colorPref,
    notes: rest.notes,
    pagesNeeded: pagesNeeded ? Number(pagesNeeded) : null,
    budget: budget ? Number(budget) : null,
    deadline: deadline || null,
  };

  const result = await submitBrief(brief);
  if (!result.ok) {
    const errorKey =
      result.reason === "anon"
        ? "anon"
        : result.reason === "forbidden"
          ? "forbidden"
          : result.reason === "db_off"
            ? "dbOff"
            : "generic";
    return { status: "error", errorKey };
  }

  redirect(`/${locale}/buyer/projects/${result.projectId}`);
}
