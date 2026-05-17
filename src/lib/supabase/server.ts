import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// IMPORTANT: setAll is a no-op on purpose.
//
// This client is used by Server Components and page-level reads only.
// Server Components cannot write cookies; if we try, Next.js may STILL queue
// the attempted write into the response (even when cookieStore.set throws),
// which has previously caused the Supabase auth cookie to be reset with a
// narrower path or empty value — destroying the session between page loads.
//
// All cookie writes for auth go through Route Handlers:
//   /api/auth/login   — writes session cookies after signInWithPassword
//   /api/auth/signup  — writes session cookies after signUp + auto-signin
//   /api/auth/logout  — would clear cookies via response.cookies on signOut
//
// If Supabase ssr wants to refresh the session here, that refresh is observed
// (getUser still returns the new user info from the refresh response) but the
// new tokens are NOT persisted. The next sign-in or explicit refresh will
// re-establish them. For the short-lived access tokens (1h default) this is
// usually fine in practice.

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
        setAll() {
          // intentional no-op — see header comment
        },
      },
    },
  );
}
