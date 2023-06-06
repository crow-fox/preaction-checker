import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@/app/_components/UserProviderClient";
import { Action } from "@/app/_types/action";
import { Database } from "@/app/_types/supabase";
import { hasAtLeastOneProperty } from "@/app/_utils/hasAtLeastOneProperty";

export const useDBActionOperations = () => {
  const supabase = createClientComponentClient<Database>();
  const user = useUser();

  const addActionInDB = async (payload?: {
    title?: Action["title"];
    color?: Action["color"];
  }) => {
    if (!user) return { action: null, error: null };
    console.log("addActionInDB start");

    if (payload === undefined) {
      const { data: action, error } = await supabase
        .from("actions")
        .insert({
          user_id: user.id,
        })
        .select("id")
        .single();

      console.log("追加 action");
      return { action, error };
    }

    if (payload.title !== undefined && payload.color !== undefined) {
      console.log(
        "addActionInDB payload.title !== undefined && payload.color !== undefined"
      );
      const { data: action, error } = await supabase
        .from("actions")
        .insert({
          user_id: user.id,
          title: payload.title,
          color: payload.color,
        })
        .select("id")
        .single();

      console.log("追加action");
      return { action, error };
    }

    if (payload.title !== undefined) {
      const { data: action, error } = await supabase
        .from("actions")
        .insert({
          user_id: user.id,
          title: payload.title,
        })
        .select("id")
        .single();

      console.log("追加action");
      return { action, error };
    }

    if (payload.color !== undefined) {
      const { data: action, error } = await supabase
        .from("actions")
        .insert({
          user_id: user.id,
          color: payload.color,
        })
        .select("id")
        .single();

      console.log("追加action");
      return { action, error };
    }

    throw new Error("payload が空です");
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
