import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Database } from "@/app/_types/supabase";
import { getConvertedCheckList, getConvertedColor } from "@/app/_utils/convert";
import TemplatePageTItle from "@/app/templates/TemplatePageTItle";
import TemplateEdit from "@/app/templates/[id]/edit/TemplateEdit";

export default async function TemplatePage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: template, error } = await supabase
    .from("templates")
    .select("id,title,color,template_checklist(id,title,created_at)")
    .eq("id", params.id)
    .single();

  if (error) {
    return null;
  }

  if (!template) {
    notFound();
  }

  return (
    <div className="grid gap-4">
      <div>
        <TemplatePageTItle title="テンプレート編集" />
      </div>
      <div>
        <TemplateEdit
          id={template.id}
          title={template.title}
          color={getConvertedColor(template.color)}
          checkList={getConvertedCheckList(template.template_checklist)}
        />
      </div>
    </div>
  );
}
