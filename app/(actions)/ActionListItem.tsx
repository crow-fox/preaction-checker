import Link from "next/link";
import { CSSProperties } from "react";
import ActionIcon from "@/app/_components/icons/ActionIcon";
import ArrowIcon from "@/app/_components/icons/ArrowIcon";
import { Action } from "@/app/_types/action";

type Props = Omit<Action, "checkList">;

export default function ActionListItem({ id, title, color }: Props) {
  return (
    <article>
      <Link
        href={`/actions/${id}`}
        style={
          {
            "--color": `var(--c-${color})`,
          } as CSSProperties
        }
        className=" flex items-center justify-between gap-4 rounded border-2 border-[var(--color)] bg-[var(--color)] p-4 hover:border-blue-500"
      >
        <h2 className="flex items-center gap-2 text-2xl font-bold leading-normal ">
          <ActionIcon />
          {title}
        </h2>
        <span className="text-2xl ">
          <ArrowIcon />
        </span>
      </Link>
    </article>
  );
}
