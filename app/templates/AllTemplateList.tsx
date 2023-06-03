import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/app/_types/supabase";
import TemplateList from "@/app/templates/TemplateList";

export default async function AllTemplateList() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: templates, error } = await supabase
    .from("templates")
    .select("id,title,color");

  if (error) {
    return null;
  }

  return (
    <>
      {templates.length === 0 ? (
        <div className="grid gap-2">
          <p>テンプレートがありません。</p>
          <p>新規追加してください。</p>
        </div>
      ) : (
        <TemplateList templates={templates} />
      )}
    </>
  );
}
