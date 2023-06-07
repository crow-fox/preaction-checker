"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDBActionCheckListOperations } from "@/app/(actions)/useDBActionCheckListOperations";
import { useDBActionOperations } from "@/app/(actions)/useDBActionOperations";
import { Template } from "@/app/_types/template";

export const useActions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const router = useRouter();

  const { addActionInDB, deleteActionInDB } = useDBActionOperations();
  const { addActionCheckListItemsInDB } = useDBActionCheckListOperations();

  const addAction = async () => {
    setIsLoading(true);
    const { action, error } = await addActionInDB();

    if (error) {
      setError(error.message);
      setIsLoading(false);
      router.refresh();
      return;
    }

    if (!action) {
      setError("actionがありません");
      setIsLoading(false);
      router.refresh();
      return;
    }

    router.push(`/actions/${action.id}/edit`);
    setIsLoading(false);
  };

  const addActionFromTemplate = async (template: Template) => {
    setIsLoading(true);

    const { action, error } = await addActionInDB({
      title: template.title,
      color: template.color,
    });
    if (error) {
      setError(error.message);
      setIsLoading(false);
      router.refresh();
      return;
    }
    if (!action) {
      setError("actionがありません");
      setIsLoading(false);
      router.refresh();
      return;
    }
    const errors = await addActionCheckListItemsInDB(
      action.id,
      template.checkList.map((item) => ({ ...item, completed: false }))
    );
    if (errors && errors.length > 0) {
      setError(errors[0].message);
      setIsLoading(false);
      router.refresh();
      return;
    }

    router.push(`/actions/${action.id}/edit`);
    setIsLoading(false);
  };

  const deleteAction = async (id: string) => {
    setIsLoading(true);
    const { error } = await deleteActionInDB(id);

    if (error) {
      setError(error.message);
      setIsLoading(false);
      router.refresh();
      return;
    }

    setIsLoading(false);
    router.push("/");
    router.refresh();
  };

  return {
    isLoading,
    error,
    addAction,
    addActionFromTemplate,
    deleteAction,
  };
};
