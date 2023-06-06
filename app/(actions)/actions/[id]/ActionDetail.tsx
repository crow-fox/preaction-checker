import { CSSProperties } from "react";
import ActionCheckList from "@/app/(actions)/actions/[id]/ActionCheckList";
import ActionCheckListProgress from "@/app/(actions)/actions/[id]/ActionCheckListProgress";
import DeleteAction from "@/app/(actions)/actions/[id]/DeleteAction";
import DetailTitle from "@/app/_components/DetailTitle";
import ToEditLink from "@/app/_components/ToEditLink";
import { Action } from "@/app/_types/action";

type Props = Action;

export default function ActionDetail({
  id,
  title,
  color,
  date,
  checkList,
}: Props) {
  return (
    <article
      className="grid gap-8 rounded bg-[var(--color)] p-6"
      style={
        {
          "--color": `var(--c-${color})`,
        } as CSSProperties
      }
    >
      <div className="grid gap-4">
        <ul className="flex flex-wrap justify-end gap-2">
          <li>
            <ToEditLink href={`/actions/${id}/edit`} />
          </li>
          <li>
            <DeleteAction id={id} title={title} />
          </li>
        </ul>
        <div className="grid gap-2">
          <div>
            <DetailTitle title={title} />
          </div>
          <p>
            <time dateTime={date.dateTime}>{date.display}</time>
          </p>
        </div>
      </div>

      <section className="grid gap-2">
        <h3 className="font-bold ">チェックリスト</h3>
        {checkList.length === 0 ? (
          <p>チェックリストがありません。</p>
        ) : (
          <div className="grid gap-4">
            <div>
              <ActionCheckListProgress actionCheckList={checkList} />
            </div>
            <div>
              <ActionCheckList checkList={checkList} />
            </div>
          </div>
        )}
      </section>
    </article>
  );
}
