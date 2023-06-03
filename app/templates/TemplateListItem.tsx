import Link from "next/link";
import { CSSProperties } from "react";
import ArrowIcon from "@/app/_components/icons/ArrowIcon";
import TemplateIcon from "@/app/_components/icons/TemplateIcon";
import { Template } from "@/app/_types/template";

type Props = Omit<Template, "checkList">;

export default function TemplateListItem({ id, title, color }: Props) {
  return (
    <article>
      <Link
        href={`/templates/${id}`}
        style={
          {
            "--color": `var(--c-${color})`,
          } as CSSProperties
        }
        className=" flex items-center justify-between gap-4 rounded border-2 border-[var(--color)] bg-[var(--color)] p-4 hover:border-blue-700"
      >
        <h2 className="flex items-center gap-2 text-2xl font-bold leading-normal ">
          <TemplateIcon />
          {title}
        </h2>
        <span className="text-2xl ">
          <ArrowIcon />
        </span>
      </Link>
    </article>
  );
}
