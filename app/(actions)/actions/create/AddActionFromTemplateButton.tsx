"use client";

import { CSSProperties } from "react";
import { useActions } from "@/app/(actions)/useActions";
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
  const { addActionFromTemplate } = useActions();

  return (
    <button
      onClick={() => addActionFromTemplate({ id, title, color, checkList })}
      style={
        {
          "--color": `var(--c-${color})`,
        } as CSSProperties
      }
      className=" grid w-full grid-cols-[1fr,auto] items-center gap-4 rounded border-2 border-[var(--color)] bg-[var(--color)] p-4 hover:border-blue-700 focus:border-blue-700"
    >
      <h2 className="flex items-center gap-2 text-2xl font-bold leading-normal ">
        <TemplateIcon />
        {title}
      </h2>
      <span className="text-2xl ">
        <AddIcon />
      </span>
    </button>
  );
}
