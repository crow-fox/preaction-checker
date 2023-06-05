import "server-only";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const authGuard = async () => {
  const supabase = createServerComponentClient({ cookies });

  console.log("auth guard");

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth");
  }
};
