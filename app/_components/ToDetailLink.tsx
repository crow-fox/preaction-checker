import Link from "next/link";

type Props = {
  href: string;
};

export default function ToDetailLink({ href }: Props) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 rounded-full border-2 border-slate-800 bg-white px-3  py-2 font-bold hover:bg-slate-800 hover:text-white focus:bg-slate-800 focus:text-white "
    >
      <svg
        height="1.5em"
        viewBox="0 96 960 960"
        width="1.5em"
        aria-hidden="true"
        role="img"
        className="inline-block fill-current"
      >
        <path d="M180 876h44l443-443-44-44-443 443v44Zm614-486L666 262l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248 936H120V808l504-504 128 128Zm-107-21-22-22 44 44-22-22Z" />
      </svg>
      <span>詳細に戻る</span>
    </Link>
  );
}
