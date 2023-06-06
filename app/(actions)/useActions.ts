"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDBActionOperations } from "@/app/(actions)/useDBActionOperations";

export const useActions = () => {
  const [error, setError] = useState<string | undefined>();
  const router = useRouter();

  const { addActionInDB, deleteActionInDB } = useDBActionOperations();

  const addAction = async () => {
    const { action, error } = await addActionInDB();

    if (error) {
      setError(error.message);
      router.refresh();
      return;
    }

    if (!action) {
      setError("action がありません");
      router.refresh();
      return;
    }

    router.push(`/actions/${action.id}`);
  };

  const deleteAction = async (id: string) => {
    const { error } = await deleteActionInDB(id);

    if (error) {
      setError(error.message);
      router.refresh();
      return;
    }

    router.push("/");
  };

  return {
    error,
    addAction,
    deleteAction,
  };
};
