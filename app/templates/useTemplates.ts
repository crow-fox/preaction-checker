"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDBTemplateOperations } from "@/app/templates/useDBTemplateOperations";

export const useTemplates = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const router = useRouter();

  const { addTemplateInDB, deleteTemplateInDB } = useDBTemplateOperations();

  const addTemplate = async () => {
    setIsLoading(true);
    const { template, error } = await addTemplateInDB();

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }

    if (!template) {
      setError("template がありません");
      setIsLoading(false);

      return;
    }
    router.push(`/templates/${template.id}/edit`);
    setIsLoading(false);
  };

  const deleteTemplate = async (id: string) => {
    setIsLoading(true);
    const { error } = await deleteTemplateInDB(id);

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }

    router.push("/templates");
    setIsLoading(false);
    router.refresh();
  };

  return {
    isLoading,
    error,
    addTemplate,
    deleteTemplate,
  };
};
