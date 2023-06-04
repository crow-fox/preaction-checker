import { TemplateCheckList } from "@/app/_types/template";
import TemplateCheckListItem from "@/app/templates/[id]/TemplateCheckListItem";

type Props = {
  checkList: TemplateCheckList;
};

export default function TemplateCheckList({ checkList }: Props) {
  return (
    <ul className="grid gap-2">
      {checkList.map((checkListItem) => (
        <li key={checkListItem.id}>
          <TemplateCheckListItem title={checkListItem.title} />
        </li>
      ))}
    </ul>
  );
}
