"use client";

import AddIcon from "@/app/_components/icons/AddIcon";
import TemplateIcon from "@/app/_components/icons/TemplateIcon";
import { useTemplates } from "@/app/templates/useTemplates";

export default function AddTemplateButton() {
  const { addTemplate } = useTemplates();

  return (
    <button
      type="button"
      onClick={addTemplate}
      className="flex w-full items-center justify-between gap-4 rounded border-2 border-dotted border-slate-500 p-4 hover:border-solid hover:border-blue-700 hover:bg-white focus:border-solid focus:border-blue-700 focus:bg-white  "
    >
      <span className="flex items-center gap-2 text-2xl  leading-normal">
        <TemplateIcon />
        <span className="font-bold">新規追加</span>
      </span>
      <span className="ml-auto text-2xl">
        <AddIcon />
      </span>
    </button>
  );
}
