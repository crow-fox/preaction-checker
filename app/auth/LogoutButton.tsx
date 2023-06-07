"use client";

import LoadingSpiner from "@/app/_components/LoadingSpiner";
import { useAuth } from "@/app/auth/useAuth";

export default function LogoutButton() {
  const { isLoading, logout } = useAuth();
  return (
    <button
      onClick={logout}
      disabled={isLoading}
      className="flex items-center justify-center gap-2 rounded border border-slate-800 bg-white px-4 py-2 font-bold"
    >
      {isLoading && <LoadingSpiner size="min" />}
      ログアウト
    </button>
  );
}
