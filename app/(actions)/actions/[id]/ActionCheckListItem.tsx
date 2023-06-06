"use client";

import { useId } from "react";
import { useActionCheckListItem } from "@/app/(actions)/actions/[id]/useActionCheckListItem";
import CheckIcon from "@/app/_components/icons/CheckIcon";
import { ActionCheckListItem } from "@/app/_types/action";

type Props = ActionCheckListItem;

export default function ActionCheckListItem({ id, title, completed }: Props) {
  const uid = useId();
  const { isLoading, error, newCompleted, toggleCompleted } =
    useActionCheckListItem(id, completed);

  if (error) {
    return null;
  }

  return (
    <div className="">
      <input
        id={uid}
        className="peer sr-only"
        type="checkbox"
        checked={newCompleted}
        onChange={toggleCompleted}
        disabled={isLoading}
      />
      <label
        htmlFor={uid}
        className="grid w-full grid-cols-[auto,1fr] gap-2 rounded border-2 border-slate-700 bg-white p-4 font-bold peer-checked:bg-slate-800 peer-checked:text-white peer-focus:border-blue-700"
      >
        <span className="grid h-6 w-6 place-content-center rounded-full border-2 border-current  ">
          {newCompleted && <CheckIcon />}
        </span>
        <span>{title}</span>
      </label>
    </div>
  );
}
