import { LoginForm } from "./LoginForm";

// Reads ?pending=1 / ?registered=1 from the URL — never cache.
export const dynamic = "force-dynamic";

export default function LoginPage() {
  return <LoginForm />;
}
