import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await getSupabaseServer();
    await supabase.auth.signOut();
  } catch {
    /* noop */
  }
  const url = req.nextUrl.clone();
  const seg = url.pathname.split("/").filter(Boolean);
  const locale = seg[0] || "en";
  url.pathname = `/${locale}`;
  return NextResponse.redirect(url);
}

export async function GET(req: NextRequest) {
  return POST(req);
}
