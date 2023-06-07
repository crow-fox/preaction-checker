"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDBActionCheckListOperations } from "@/app/(actions)/useDBActionCheckListOperations";
import { useDBActionOperations } from "@/app/(actions)/useDBActionOperations";
import { Template } from "@/app/_types/template";

export const useActions = () => {
  const [error, setError] = useState<string | undefined>();
  const router = useRouter();

  const { addActionInDB, deleteActionInDB } = useDBActionOperations();
  const { addActionCheckListItemsInDB } = useDBActionCheckListOperations();

  const addAction = async () => {
    const { action, error } = await addActionInDB();

    if (error) {
      setError(error.message);
      router.refresh();
      return;
    }

    if (!action) {
      setError("actionがありません");
      router.refresh();
      return;
    }

    router.push(`/actions/${action.id}/edit`);
  };

  const addActionFromTemplate = async (template: Template) => {
    const { action, error } = await addActionInDB({
      title: template.title,
      color: template.color,
    });
    if (error) {
      setError(error.message);
      router.refresh();
      return;
    }
    if (!action) {
      setError("actionがありません");
      router.refresh();
      return;
    }
    const errors = await addActionCheckListItemsInDB(
      action.id,
      template.checkList.map((item) => ({ ...item, completed: false }))
    );
    if (errors && errors.length > 0) {
      setError(errors[0].message);
      router.refresh();
      return;
    }

    router.push(`/actions/${action.id}/edit`);
  };

  const deleteAction = async (id: string) => {
    const { error } = await deleteActionInDB(id);

    if (error) {
      setError(error.message);
      router.refresh();
      return;
    }

    router.push("/");
    router.refresh();
  };

  return {
    error,
    addAction,
    addActionFromTemplate,
    deleteAction,
  };
};
