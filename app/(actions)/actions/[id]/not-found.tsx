import Link from "next/link";
import ActionIcon from "@/app/_components/icons/ActionIcon";
import ArrowIcon from "@/app/_components/icons/ArrowIcon";

export default function NotFound() {
  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-bold text-red-700">
        アクションは見つかりませんでした。
      </h1>
      <div className="grid gap-2">
        <p>
          このアクションはすでに削除されたか、URLが間違っている可能性があります。
        </p>
        <p>以下のリンクから、一覧に戻ってみてください。</p>
      </div>
      <p>
        <Link
          href="/"
          className=" flex items-center justify-between gap-4 rounded border-2 border-[var(--color)] bg-[var(--color)] p-4 hover:border-blue-500"
        >
          <span className="flex items-center gap-2 text-2xl font-bold leading-normal ">
            <ActionIcon />
            アクション一覧
          </span>
          <span className="text-2xl ">
            <ArrowIcon />
          </span>
        </Link>
      </p>
    </div>
  );
}
