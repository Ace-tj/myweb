import { NextRequest, NextResponse } from "next/server";
import { mockSignOut, supabaseConfigured } from "@/lib/auth";
import { createClient as createServerClient } from "@/lib/supabase/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;

  if (!supabaseConfigured()) {
    await mockSignOut();
  } else {
    const supabase = await createServerClient();
    await supabase.auth.signOut();
  }

  return NextResponse.redirect(new URL(`/${locale}`, _req.url));
}
