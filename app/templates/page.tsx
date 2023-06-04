import { Suspense } from "react";
import LoadingSpiner from "@/app/_components/LoadingSpiner";
import AddTemplateButton from "@/app/templates/AddTemplateButton";
import AllTemplateList from "@/app/templates/AllTemplateList";
import TemplatePageTItle from "@/app/templates/TemplatePageTItle";

export default function TemplatesPage() {
  return (
    <div className="grid gap-8">
      <div className="grid gap-2">
        <div>
          <TemplatePageTItle title="テンプレート一覧" />
        </div>
        <div>
          <AddTemplateButton />
        </div>
      </div>
      <div>
        <Suspense fallback={<LoadingSpiner />}>
          {/* @ts-expect-error Async Server Component */}
          <AllTemplateList />
        </Suspense>
      </div>
    </div>
  );
}
