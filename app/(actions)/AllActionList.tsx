import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ActionList from "@/app/(actions)/ActionList";
import { Database } from "@/app/_types/supabase";
import { getConvertedColor } from "@/app/_utils/convert";

export default async function AllActionList() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: actions, error } = await supabase
    .from("actions")
    .select("id,title,color")
    .order("created_at", { ascending: false });

  if (error) {
    return null;
  }

  return (
    <>
      {actions.length === 0 ? (
        <div className="grid gap-2">
          <p>テンプレートがありません。</p>
          <p>新規追加してください。</p>
        </div>
      ) : (
        <ActionList
          actions={actions.map((action) => ({
            ...action,
            color: getConvertedColor(action.color),
          }))}
        />
      )}
    </>
  );
}
