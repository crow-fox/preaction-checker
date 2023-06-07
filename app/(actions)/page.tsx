import { Suspense } from "react";
import ActionPageTitle from "@/app/(actions)/ActionPageTitle";
import AddActionLink from "@/app/(actions)/AddActionLink";
import AllActionList from "@/app/(actions)/AllActionList";
import LoadingSpiner from "@/app/_components/LoadingSpiner";
import { authGuard } from "@/app/_utils/authGuard";

export default async function ActionsPage() {
  await authGuard();

  return (
    <div className="grid gap-8">
      <div className="grid gap-4">
        <div>
          <ActionPageTitle title="アクション一覧" />
        </div>
        <div>
          <AddActionLink />
        </div>
      </div>
      <div>
        <Suspense fallback={<LoadingSpiner />}>
          {/* @ts-expect-error Async Server Component */}
          <AllActionList />
        </Suspense>
      </div>
    </div>
  );
}
