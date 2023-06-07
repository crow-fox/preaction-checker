import Link from "next/link";
import ArrowIcon from "@/app/_components/icons/ArrowIcon";
import TemplateIcon from "@/app/_components/icons/TemplateIcon";

export default function NotFound() {
  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-bold text-red-700">
        テンプレートは見つかりませんでした。
      </h1>
      <div className="grid gap-2">
        <p>
          このテンプレートはすでに削除されたか、URLが間違っている可能性があります。
        </p>
        <p>以下のリンクから、一覧に戻ってみてください。</p>
      </div>
      <p>
        <Link
          href="/templates"
          className=" flex items-center justify-between gap-4 rounded border-2 border-slate-800 p-4 hover:border-blue-700 focus:border-blue-700"
        >
          <span className="flex items-center gap-2 text-2xl font-bold leading-normal ">
            <TemplateIcon />
            テンプレート一覧
          </span>
          <span className="text-2xl ">
            <ArrowIcon />
          </span>
        </Link>
      </p>
    </div>
  );
}
