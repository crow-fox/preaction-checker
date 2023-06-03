import { Template } from "@/app/_types/template";
import TemplateListItem from "@/app/templates/TemplateListItem";

type Props = {
  templates: Omit<Template, "checkList">[];
};

export default function TemplateList({ templates }: Props) {
  return (
    <div className="grid gap-4">
      {templates.map((template) => (
        <TemplateListItem key={template.id} {...template} />
      ))}
    </div>
  );
}
