import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDBActionCheckListOperations } from "@/app/(actions)/useDBActionCheckListOperations";

export const useActionCheckListItem = (id: string, initCompleted: boolean) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [newCompleted, setNewCompleted] = useState(initCompleted);
  const router = useRouter();

  const { updateActionCheckListItemInDB } = useDBActionCheckListOperations();

  const toggleCompleted = async () => {
    setIsLoading(true);
    const error = await updateActionCheckListItemInDB(id, {
      completed: !newCompleted,
    });

    if (error) {
      setError(error.message);
    }

    setNewCompleted(!newCompleted);
    setIsLoading(false);
    router.refresh();
  };

  return {
    isLoading,
    error,
    newCompleted,
    toggleCompleted,
  };
};
