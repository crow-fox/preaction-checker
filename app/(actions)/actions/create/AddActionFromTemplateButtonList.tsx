import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AddActionFromTemplateButton from "@/app/(actions)/actions/create/AddActionFromTemplateButton";
import { Database } from "@/app/_types/supabase";
import { getConvertedCheckList, getConvertedColor } from "@/app/_utils/convert";

export default async function AddActionFromTemplateButtonList() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: templates, error } = await supabase
    .from("templates")
    .select("id,title,color,template_checklist(id,title,created_at)")
    .order("created_at", { ascending: false });

  if (error) {
    return null;
  }

  return (
    <>
      {templates.length === 0 ? (
        <p>テンプレートがありません</p>
      ) : (
        <ul className="grid gap-4">
          {templates.map((template) => (
            <li key={template.id}>
              <AddActionFromTemplateButton
                id={template.id}
                title={template.title}
                color={getConvertedColor(template.color)}
                checkList={getConvertedCheckList(template.template_checklist)}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
