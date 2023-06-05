import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@/app/_components/UserProviderClient";
import { Action } from "@/app/_types/action";
import { Database } from "@/app/_types/supabase";
import { hasAtLeastOneProperty } from "@/app/_utils/hasAtLeastOneProperty";

export const useDBActionOperations = () => {
  const supabase = createClientComponentClient<Database>();
  const user = useUser();

  const addActionInDB = async () => {
    if (!user) return { action: null, error: null };

    const { data: action, error } = await supabase
      .from("actions")
      .insert({
        user_id: user.id,
      })
      .select("id")
      .single();

    console.log("追加 action");
    return { action, error };
  };

  const updateActionInDB = async (
    id: string,
    payload: Partial<Omit<Action, "id" | "checkList">>
  ) => {
    if (!hasAtLeastOneProperty(payload)) {
      throw new Error("payload が空です");
    }

    const { error } = await supabase
      .from("actions")
      .update(payload)
      .eq("id", id);

    console.log("更新 action");
    return { error };
  };

  const deleteActionInDB = async (id: string) => {
    const { error } = await supabase.from("actions").delete().eq("id", id);

    console.log("削除 action");
    return { error };
  };

  return {
    addActionInDB,
    updateActionInDB,
    deleteActionInDB,
  };
};
