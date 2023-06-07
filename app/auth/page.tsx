import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Suspense } from "react";
import LoadingSpiner from "@/app/_components/LoadingSpiner";
import AccountData from "@/app/auth/AccountData";
import DeleteAccount from "@/app/auth/DeleteAccount";
import LoginButton from "@/app/auth/LoginButton";
import LogoutButton from "@/app/auth/LogoutButton";

export default async function AuthPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return (
      <div className="grid gap-4">
        <h1 className="text-2xl font-bold ">ログイン</h1>
        <div className=" grid gap-2">
          <p>このアプリを使うためにはログインが必要です。</p>
          <p>下記からGoogleアカウントでログインしてください。</p>
        </div>
        <div>
          <LoginButton />
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 ">
      <h1 className="text-2xl font-bold ">アカウント</h1>
      <div>
        <Suspense fallback={<LoadingSpiner />}>
          {/* @ts-expect-error Async Server Component */}
          <AccountData />
        </Suspense>
      </div>
      <p className="grid ">
        <LogoutButton />
      </p>
      <div className="grid">
        <DeleteAccount />
      </div>
    </div>
  );
}
