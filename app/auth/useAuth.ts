"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useAuth = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    router.refresh();
    setIsLoading(false);
  };

  const deleteUserAccount = async () => {
    setIsLoading(true);
    await fetch(`/auth/users`, {
      method: "DELETE",
    });
    await supabase.auth.signOut();
    router.refresh();
    setIsLoading(false);
  };

  return {
    isLoading,
    logout,
    deleteUserAccount,
  };
};
