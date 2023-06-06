"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDBTemplateOperations } from "@/app/templates/useDBTemplateOperations";

export const useTemplates = () => {
  const [error, setError] = useState<string | undefined>();
  const router = useRouter();

  const { addTemplateInDB, deleteTemplateInDB } = useDBTemplateOperations();

  const addTemplate = async () => {
    const { template, error } = await addTemplateInDB();

    if (error) {
      setError(error.message);
      return;
    }

    if (!template) {
      setError("template がありません");
      return;
    }

    router.push(`/templates/${template.id}/edit`);
  };

  const deleteTemplate = async (id: string) => {
    const { error } = await deleteTemplateInDB(id);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/templates");
    router.refresh();
  };

  return {
    error,
    addTemplate,
    deleteTemplate,
  };
};
