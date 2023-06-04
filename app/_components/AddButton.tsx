"use client";

import { ReactNode } from "react";
import AddIcon from "@/app/_components/icons/AddIcon";

type Props = {
  onClick: () => void;
  icon: ReactNode;
};

export default function AddButton({ onClick, icon }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between gap-4 rounded border-2 border-dotted border-slate-500 p-4 hover:border-solid hover:border-blue-500 "
    >
      <span className="flex items-center gap-2 text-2xl  leading-normal">
        {icon}
        <span className="font-bold">新規追加</span>
      </span>
      <span className="ml-auto text-2xl">
        <AddIcon />
      </span>
    </button>
  );
}
