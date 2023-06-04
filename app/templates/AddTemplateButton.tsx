"use client";

import AddButton from "@/app/_components/AddButton";
import TemplateIcon from "@/app/_components/icons/TemplateIcon";
import { useTemplates } from "@/app/templates/useTemplates";

export default function AddTemplateButton() {
  const { addTemplate } = useTemplates();

  return <AddButton icon={<TemplateIcon />} onClick={addTemplate} />;
}
