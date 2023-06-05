import { Suspense } from "react";
import LoadingSpiner from "@/app/_components/LoadingSpiner";
import { authGuard } from "@/app/_utils/authGuard";
import AddTemplateButton from "@/app/templates/AddTemplateButton";
import AllTemplateList from "@/app/templates/AllTemplateList";
import TemplatePageTItle from "@/app/templates/TemplatePageTItle";

export default async function TemplatesPage() {
  await authGuard();

  return (
    <div className="grid gap-8">
      <div className="grid gap-4">
        <div>
          <TemplatePageTItle title="テンプレート一覧" />
        </div>
        <div>
          <AddTemplateButton />
        </div>
      </div>
      <div>
        <Suspense fallback={<LoadingSpiner />}>
          <AllTemplateList />
        </Suspense>
      </div>
    </div>
  );
}
