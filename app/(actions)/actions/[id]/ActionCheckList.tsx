import ActionCheckListItem from "@/app/(actions)/actions/[id]/ActionCheckListItem";
import { ActionCheckList } from "@/app/_types/action";

type Props = {
  checkList: ActionCheckList;
};

export default function ActionCheckList({ checkList }: Props) {
  return (
    <ul className="grid gap-2">
      {checkList.map((checkListItem) => (
        <li key={checkListItem.id}>
          <ActionCheckListItem {...checkListItem} />
        </li>
      ))}
    </ul>
  );
}
