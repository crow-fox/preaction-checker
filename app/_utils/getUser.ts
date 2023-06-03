import "server-only";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

type User = {
  id: string;
  name?: string;
  email?: string;
  avatar_url?: string;
};

export const getUser = async (): Promise<User | undefined> => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return;
  }

  const { user } = session;

  return {
    id: user.id,
    name: user.user_metadata?.name,
    email: user.email,
    avatar_url: user.user_metadata?.avatar_url,
  };
};
