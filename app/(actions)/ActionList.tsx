import ActionListItem from "@/app/(actions)/ActionListItem";
import { Action } from "@/app/_types/action";

type Props = {
  actions: Action[];
};

export default function ActionList({ actions }: Props) {
  return (
    <div className="grid gap-4">
      {actions.map((action) => (
        <ActionListItem key={action.id} {...action} />
      ))}
    </div>
  );
}
