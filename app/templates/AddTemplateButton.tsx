"use client";

import LoadingSpiner from "@/app/_components/LoadingSpiner";
import AddIcon from "@/app/_components/icons/AddIcon";
import TemplateIcon from "@/app/_components/icons/TemplateIcon";
import { useTemplates } from "@/app/templates/useTemplates";

export default function AddTemplateButton() {
  const { isLoading, addTemplate } = useTemplates();

  return (
    <button
      type="button"
      onClick={addTemplate}
      disabled={isLoading}
      className="flex w-full items-center justify-between gap-4 rounded border-2 border-dotted border-slate-500 p-4 hover:border-solid hover:border-blue-700 hover:bg-white focus:border-solid focus:border-blue-700 focus:bg-white  disabled:bg-slate-800/20 "
    >
      <span className="flex items-center gap-2 text-2xl  leading-normal">
        <TemplateIcon />
        <span className="flex items-center gap-2 font-bold">
          {isLoading && <LoadingSpiner size="min" />}
          新規追加
        </span>
      </span>
      <span className="ml-auto text-2xl">
        <AddIcon />
      </span>
    </button>
  );
}
