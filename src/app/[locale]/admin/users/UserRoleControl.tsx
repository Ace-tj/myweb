"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Role } from "@/lib/auth";
import { setUserRole } from "@/lib/admin";

const ROLES: Role[] = ["buyer", "consultant", "admin"];

export function UserRoleControl({
  userId,
  currentRole,
  disabled,
}: {
  userId: string;
  currentRole: Role;
  disabled?: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newRole = e.target.value as Role;
    if (newRole === currentRole) return;
    setError(null);
    startTransition(async () => {
      const result = await setUserRole(userId, newRole);
      if (result.ok) router.refresh();
      else {
        setError(result.message ?? "Failed");
        e.target.value = currentRole;
      }
    });
  }

  return (
    <div className="flex items-center gap-2">
      <select
        value={currentRole}
        onChange={handleChange}
        disabled={disabled || pending}
        aria-label="Change role"
        className="text-xs bg-slate-800 border border-slate-700 text-white rounded-md px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {ROLES.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
      {pending && <span className="text-xs text-slate-500">Saving…</span>}
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}
