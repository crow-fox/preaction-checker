"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    console.log("ログアウトしました");
  };

  const deleteUserAccount = async () => {
    await fetch(`/auth/users`, {
      method: "DELETE",
    });
    await supabase.auth.signOut();
    router.refresh();
    console.log("ユーザー削除しました");
  };

  return {
    logout,
    deleteUserAccount,
  };
};
