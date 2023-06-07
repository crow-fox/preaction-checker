import Link from "next/link";
import { CSSProperties } from "react";
import ActionIcon from "@/app/_components/icons/ActionIcon";
import AlertIcon from "@/app/_components/icons/AlertIcon";
import ArrowIcon from "@/app/_components/icons/ArrowIcon";
import { Action } from "@/app/_types/action";

type Props = Action;

export default function ActionListItem({
  id,
  title,
  color,
  date,
  checkList,
}: Props) {
  const completedCheckList = checkList.filter((item) => item.completed);
  const progress =
    Math.floor((completedCheckList.length / checkList.length) * 100) || 0;

  return (
    <article className="">
      <Link
        href={`/actions/${id}`}
        className={
          "grid grid-cols-[1fr,auto] items-center justify-between gap-4 rounded border-2 border-[var(--color)] bg-[var(--color)] p-4 hover:border-blue-700 focus:border-blue-700"
        }
        style={
          {
            "--color": `var(--c-${color})`,
          } as CSSProperties
        }
      >
        <div>
          <h2 className="text-xl font-bold leading-normal ">
            {title === "" ? (
              <span className="grid grid-cols-[auto,1fr] gap-2 ">
                <span className="grid text-red-700">
                  <AlertIcon />
                </span>
                タイトルがありません
              </span>
            ) : (
              <span className="grid grid-cols-[auto,1fr]  gap-2 ">
                <ActionIcon />
                {title}
              </span>
            )}
          </h2>
          <p className="mt-2 text-sm">
            <time dateTime={date.dateTime}>{date.display}</time>
          </p>
          <div className="mt-4 flex items-center gap-2">
            <div
              className="grid h-12 w-12 place-content-center rounded-full border border-slate-800 text-slate-800"
              style={{
                backgroundImage: `conic-gradient( currentColor ${progress}%, white ${progress}%)`,
              }}
            >
              <span className="grid h-9 w-9 place-content-center rounded-full border border-slate-800 bg-white">
                <svg
                  height="1em"
                  viewBox="0 96 960 960"
                  width="1em"
                  role="img"
                  aria-hidden="true"
                  className="inline-block h-6 w-6 fill-current"
                  style={{
                    opacity: progress === 100 ? 1 : 0.2,
                  }}
                >
                  <path d="M294 814 70 590l43-43 181 181 43 43-43 43Zm170 0L240 590l43-43 181 181 384-384 43 43-427 427Zm0-170-43-43 257-257 43 43-257 257Z" />
                </svg>
              </span>
            </div>
            <dl className="grid">
              <dt className="font-bold">チェックリスト</dt>
              <dd>
                {checkList.length === 0 ? (
                  <span>チェックリストがありません</span>
                ) : (
                  <>
                    <span className="sr-only">{`${checkList.length}個中${completedCheckList.length}個完了`}</span>
                    <span aria-hidden="true" className="text-lg">
                      {`${completedCheckList.length} / ${checkList.length} 完了`}
                    </span>
                  </>
                )}
              </dd>
            </dl>
          </div>
        </div>
        <span className="text-2xl">
          <ArrowIcon />
        </span>
      </Link>
    </article>
  );
}
