"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { StatusBadge } from "@/components/shared/StatusBadge";

interface User {
  id: string;
  name: string;
  email: string;
  role: "buyer" | "consultant";
  approved: boolean;
  banned: boolean;
  joined: string;
}

const INITIAL_USERS: User[] = [
  {
    id: "u-001",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "buyer",
    approved: true,
    banned: false,
    joined: "2026-01-15",
  },
  {
    id: "u-002",
    name: "Ahmad Rahimi",
    email: "consultant@agency.com",
    role: "consultant",
    approved: false,
    banned: false,
    joined: "2026-02-20",
  },
  {
    id: "u-003",
    name: "Elena Petrova",
    email: "elena@studio.io",
    role: "consultant",
    approved: true,
    banned: false,
    joined: "2026-03-01",
  },
  {
    id: "u-004",
    name: "Mark Williams",
    email: "mark.w@gmail.com",
    role: "buyer",
    approved: true,
    banned: false,
    joined: "2026-03-15",
  },
  {
    id: "u-005",
    name: "Nasrin Hosseini",
    email: "nasrin@devworks.com",
    role: "consultant",
    approved: false,
    banned: false,
    joined: "2026-04-10",
  },
];

export default function AdminUsersPage() {
  const t = useTranslations();
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [search, setSearch] = useState("");

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  function approveUser(id: string) {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, approved: true } : u))
    );
  }

  function banUser(id: string) {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, banned: !u.banned } : u))
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <header className="bg-white border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            {t("common.appName")}
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/admin/dashboard" className="text-neutral-500 hover:text-neutral-700">
              {t("admin.dashboard.title")}
            </Link>
            <Link href="/auth/logout" className="text-neutral-500 hover:text-neutral-700">
              {t("nav.logout")}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-6xl w-full px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">{t("admin.users.heading")}</h1>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("admin.users.searchPlaceholder")}
            className="rounded-lg border border-neutral-300 px-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200">
                  <th className="text-left px-4 py-3 font-medium text-neutral-500">{t("admin.users.id")}</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500">{t("admin.users.name")}</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500">{t("admin.users.email")}</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500">{t("admin.users.role")}</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500">{t("admin.users.approved")}</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500">{t("admin.users.joined")}</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500">{t("admin.users.actions")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filtered.map((user) => (
                  <tr
                    key={user.id}
                    className={`${user.banned ? "bg-neutral-100 opacity-60" : "hover:bg-neutral-50"} transition-colors`}
                  >
                    <td className="px-4 py-3 text-neutral-400 font-mono text-xs">{user.id}</td>
                    <td className="px-4 py-3 font-medium">{user.name}</td>
                    <td className="px-4 py-3 text-neutral-600">{user.email}</td>
                    <td className="px-4 py-3">
                      <span className={`capitalize px-2 py-0.5 rounded-full text-xs font-medium ${
                        user.role === "consultant"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {user.banned ? (
                        <StatusBadge status="banned" label={t("admin.users.banned")} />
                      ) : user.approved ? (
                        <StatusBadge status="approved" label={t("admin.users.yes")} />
                      ) : (
                        <StatusBadge status="pending" label={t("admin.users.no")} />
                      )}
                    </td>
                    <td className="px-4 py-3 text-neutral-500">{user.joined}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {!user.approved && !user.banned && (
                          <button
                            onClick={() => approveUser(user.id)}
                            className="text-xs px-3 py-1 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
                          >
                            {t("admin.users.approve")}
                          </button>
                        )}
                        <button
                          onClick={() => banUser(user.id)}
                          className={`text-xs px-3 py-1 rounded-lg border transition-colors ${
                            user.banned
                              ? "border-neutral-300 text-neutral-600 hover:bg-neutral-100"
                              : "border-red-300 text-red-600 hover:bg-red-50"
                          }`}
                        >
                          {user.banned ? "Unban" : t("admin.users.ban")}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
