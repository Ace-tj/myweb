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
          // In Server Components, cookieStore.set throws — that's expected,
          // and the proxy/middleware writes refreshed cookies on the next
          // request. In Server Actions and Route Handlers, set MUST succeed,
          // otherwise sign-in cannot persist. We swallow the Server Component
          // error specifically by its message so anything else surfaces.
          for (const { name, value, options } of cookiesToSet) {
            try {
              cookieStore.set(name, value, {
                path: "/",
                sameSite: "lax",
                ...options,
              });
            } catch (err) {
              const msg = err instanceof Error ? err.message : String(err);
              // Next.js throws this exact message when calling .set() from a
              // Server Component context. Anything else is a real bug we want
              // to see in the Vercel logs.
              if (!msg.includes("Cookies can only be modified")) {
                console.error(
                  `[supabase/server] failed to set cookie ${name}:`,
                  msg,
                );
              }
            }
          }
        },
      },
    },
  );
}
