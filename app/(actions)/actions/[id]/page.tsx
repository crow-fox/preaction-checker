import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import ActionPageTitle from "@/app/(actions)/ActionPageTitle";
import ActionDetail from "@/app/(actions)/actions/[id]/ActionDetail";
import { Database } from "@/app/_types/supabase";
import { authGuard } from "@/app/_utils/authGuard";
import {
  getConvertedCheckList,
  getConvertedColor,
  getConvertedDate,
} from "@/app/_utils/convert";

export default async function ActionPage({
  params,
}: {
  params: { id: string };
}) {
  await authGuard();

  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: action, error } = await supabase
    .from("actions")
    .select(
      "id,title,color,created_at,action_checklist(id,title,completed,created_at)"
    )
    .eq("id", params.id)
    .single();

  if (error) {
    return null;
  }

  if (!action) {
    notFound();
  }

  return (
    <div className="grid gap-4">
      <div>
        <ActionPageTitle title="アクション詳細" />
      </div>
      <div>
        <ActionDetail
          id={action.id}
          title={action.title}
          color={getConvertedColor(action.color)}
          date={getConvertedDate(action.created_at)}
          checkList={getConvertedCheckList(action.action_checklist)}
        />
      </div>
    </div>
  );
}
