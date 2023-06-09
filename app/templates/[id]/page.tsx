import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Database } from "@/app/_types/supabase";
import { authGuard } from "@/app/_utils/authGuard";
import { getConvertedCheckList, getConvertedColor } from "@/app/_utils/convert";
import TemplatePageTitle from "@/app/templates/TemplatePageTitle";
import TemplateDetail from "@/app/templates/[id]/TemplateDetail";

export default async function TemplatePage({
  params,
}: {
  params: { id: string };
}) {
  await authGuard();

  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: template, error } = await supabase
    .from("templates")
    .select("id,title,color,template_checklist(id,title,created_at)")
    .eq("id", params.id)
    .single();

  if (error || !template) {
    notFound();
  }

  return (
    <div className="grid gap-4">
      <div>
        <TemplatePageTitle title="テンプレート詳細" />
      </div>
      <div>
        <TemplateDetail
          id={template.id}
          title={template.title}
          color={getConvertedColor(template.color)}
          checkList={getConvertedCheckList(template.template_checklist)}
        />
      </div>
    </div>
  );
}
