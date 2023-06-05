import { Suspense } from "react";
import ActionPageTitle from "@/app/(actions)/ActionPageTitle";
import AddActionButton from "@/app/(actions)/AddActionButton";
import AllActionList from "@/app/(actions)/AllActionList";
import LoadingSpiner from "@/app/_components/LoadingSpiner";

export default function ActionsPage() {
  return (
    <div className="grid gap-8">
      <div className="grid gap-4">
        <div>
          <ActionPageTitle title="アクション一覧" />
        </div>
        <div>
          <AddActionButton />
        </div>
      </div>
      <div>
        <Suspense fallback={<LoadingSpiner />}>
          <AllActionList />
        </Suspense>
      </div>
    </div>
  );
}
