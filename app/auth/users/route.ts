import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Database } from "@/app/_types/supabase";

export async function DELETE() {
  const supabase = createRouteHandlerClient<Database>(
    {
      cookies,
    },
    {
      supabaseKey: process.env.SERVICE_ROLE_KEY as string,
    }
  );

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError?.status === 401 || !user?.id) {
    return NextResponse.json(
      { message: "認証されていません" },
      { status: 401 }
    );
  }

  const { error } = await supabase.auth.admin.deleteUser(user.id);

  if (error) {
    return NextResponse.json({ message: "サーバーエラー" }, { status: 500 });
  }

  return NextResponse.json(
    { message: "ユーザーを削除しました" },
    { status: 200 }
  );
}
