import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              // Force `path: "/"` and `sameSite: "lax"` as defaults so the
              // browser scopes the auth cookie to the whole site, never to the
              // current request path. Supabase's own options override if set.
              cookieStore.set(name, value, {
                path: "/",
                sameSite: "lax",
                ...options,
              }),
            );
          } catch {
            // Server Components cannot set cookies; ignore — middleware handles refresh.
          }
        },
      },
    },
  );
}
