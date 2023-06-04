import { CSSProperties } from "react";
import DetailTitle from "@/app/_components/DetailTitle";
import ToEditLink from "@/app/_components/ToEditLink";
import { Template } from "@/app/_types/template";
import DeleteTemplate from "@/app/templates/[id]/DeleteTemplate";
import TemplateCheckList from "@/app/templates/[id]/TemplateCheckList";

type Props = Template;

export default function TemplateDetail({ id, title, color, checkList }: Props) {
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
            <ToEditLink href={`/templates/${id}/edit`} />
          </li>
          <li>
            <DeleteTemplate id={id} title={title} />
          </li>
        </ul>
        <div>
          <DetailTitle title={title} />
        </div>
      </div>

      <section className="grid gap-2">
        <h3 className="font-bold ">チェックリスト</h3>
        {checkList.length === 0 ? (
          <p>チェックリストがありません。</p>
        ) : (
          <div>
            <TemplateCheckList checkList={checkList} />
          </div>
        )}
      </section>
    </article>
  );
}
