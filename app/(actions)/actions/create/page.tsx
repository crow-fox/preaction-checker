import ActionPageTitle from "@/app/(actions)/ActionPageTitle";
import AddActionButton from "@/app/(actions)/actions/create/AddActionButton";
import AddActionFromTemplateButtonList from "@/app/(actions)/actions/create/AddActionFromTemplateButtonList";
import TemplateIcon from "@/app/_components/icons/TemplateIcon";
import { authGuard } from "@/app/_utils/authGuard";

export default async function ActionCreatePage() {
  await authGuard();

  return (
    <div className="grid gap-8">
      <div className="grid gap-4">
        <div>
          <ActionPageTitle title="アクション新規追加" />
        </div>
        <div>
          <AddActionButton />
        </div>
      </div>
      <div className="grid gap-4">
        <h2 className="flex items-center gap-1 font-bold">
          <TemplateIcon />
          テンプレートから追加
        </h2>
        <div>
          <AddActionFromTemplateButtonList />
        </div>
      </div>
    </div>
  );
}
