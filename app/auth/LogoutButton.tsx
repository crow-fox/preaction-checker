"use client";

import { useAuth } from "@/app/auth/useAuth";

export default function LogoutButton() {
  const { logout } = useAuth();
  return (
    <button
      onClick={logout}
      className="block rounded border border-gray-600 bg-white px-4 py-2 font-bold"
    >
      ログアウト
    </button>
  );
}
