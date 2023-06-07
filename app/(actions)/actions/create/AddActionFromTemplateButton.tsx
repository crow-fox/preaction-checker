"use client";

import { CSSProperties } from "react";
import { useActions } from "@/app/(actions)/useActions";
import LoadingSpiner from "@/app/_components/LoadingSpiner";
import AddIcon from "@/app/_components/icons/AddIcon";
import TemplateIcon from "@/app/_components/icons/TemplateIcon";
import { Template } from "@/app/_types/template";

type Props = Template;

export default function AddActionFromTemplateButton({
  id,
  title,
  color,
  checkList,
}: Props) {
  const { isLoading, addActionFromTemplate } = useActions();

  return (
    <button
      disabled={isLoading}
      onClick={() => addActionFromTemplate({ id, title, color, checkList })}
      style={
        {
          "--color": `var(--c-${color})`,
        } as CSSProperties
      }
      className=" grid w-full grid-cols-[1fr,auto] items-center gap-4 rounded border-2 border-[var(--color)] bg-[var(--color)] p-4 hover:border-blue-700 focus:border-blue-700"
    >
      <span className="flex items-center gap-2 text-2xl font-bold leading-normal ">
        <TemplateIcon />
        <span className="flex items-center gap-2 font-bold">
          {isLoading && <LoadingSpiner size="min" />}
          {`${title}を追加`}
        </span>
      </span>
      <span className="text-2xl ">
        <AddIcon />
      </span>
    </button>
  );
}
