import { LoginPageClient } from "./LoginPageClient";

// Auth pages read query params (?from, ?pending, ?registered) and must never
// be cached. Opt out of static prerendering — the client wrapper handles all
// state and the page is server-rendered fresh on every request.
export const dynamic = "force-dynamic";

export default function LoginPage() {
  return <LoginPageClient />;
}
