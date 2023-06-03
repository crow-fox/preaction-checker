import { Suspense } from "react";
import LoadingSpiner from "@/app/_components/LoadingSpiner";
import AllTemplateList from "@/app/templates/AllTemplateList";
import TemplatePageTItle from "@/app/templates/TemplatePageTItle";

export default function TemplatesPage() {
  return (
    <div>
      <TemplatePageTItle title="テンプレート一覧" />
      <Suspense fallback={<LoadingSpiner />}>
        {/* @ts-expect-error Async Server Component */}
        <AllTemplateList />
      </Suspense>
    </div>
  );
}
