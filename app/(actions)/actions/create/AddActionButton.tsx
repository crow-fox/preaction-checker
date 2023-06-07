"use client";

import { useActions } from "@/app/(actions)/useActions";
import LoadingSpiner from "@/app/_components/LoadingSpiner";
import ActionIcon from "@/app/_components/icons/ActionIcon";
import AddIcon from "@/app/_components/icons/AddIcon";

export default function AddActionButton() {
  const { isLoading, addAction } = useActions();

  return (
    <button
      type="button"
      disabled={isLoading}
      onClick={addAction}
      className="flex w-full items-center justify-between gap-4 rounded border-2 border-dotted border-slate-500 p-4 hover:border-solid hover:border-blue-700 hover:bg-white focus:border-solid focus:border-blue-700 focus:bg-white disabled:bg-slate-800/20 "
    >
      <span className="flex items-center gap-2 text-2xl  leading-normal">
        <ActionIcon />
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
