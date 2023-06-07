import Link from "next/link";
import ActionIcon from "@/app/_components/icons/ActionIcon";
import ArrowIcon from "@/app/_components/icons/ArrowIcon";

export default function AddActionLink() {
  return (
    <Link
      href="/actions/create"
      className="flex w-full items-center justify-between gap-4 rounded border-2 border-dotted border-slate-500 p-4 hover:border-solid hover:border-blue-700 hover:bg-white focus:border-solid focus:border-blue-700 focus:bg-white "
    >
      <span className="flex items-center gap-2 text-2xl  leading-normal">
        <ActionIcon />
        <span className="font-bold">新規追加</span>
      </span>
      <span className="ml-auto text-2xl">
        <ArrowIcon />
      </span>
    </Link>
  );
}
