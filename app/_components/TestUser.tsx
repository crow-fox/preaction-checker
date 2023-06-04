"use client";

import { useUser } from "@/app/_components/UserProviderClient";

export default function TestUser() {
  const user = useUser();

  if (!user) {
    return <div>認証されていません</div>;
  }

  return <pre>{JSON.stringify(user, null, 2)}</pre>;
}
