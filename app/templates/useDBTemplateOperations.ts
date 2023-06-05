import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@/app/_components/UserProviderClient";
import { Color } from "@/app/_types/color";
import { Database } from "@/app/_types/supabase";

export const useDBTemplateOperations = () => {
  const supabase = createClientComponentClient<Database>();
  const user = useUser();

  const addTemplateInDB = async () => {
    if (!user) return { template: null, error: null };

    const { data: template, error } = await supabase
      .from("templates")
      .insert({
        user_id: user.id,
      })
      .select("id")
      .single();

    console.log("追加 template");
    return { template, error };
  };

  const updateTemplateInDB = async (
    id: string,
    payload: { title?: string; color?: Color }
  ) => {
    if (Object.keys(payload).length === 0) {
      throw new Error("payload が空です");
    }

    const { error } = await supabase
      .from("templates")
      .update(payload)
      .eq("id", id);

    console.log("更新 template");
    return { error };
  };

  const deleteTemplateInDB = async (id: string) => {
    const { error } = await supabase.from("templates").delete().eq("id", id);

    console.log("削除 template");
    return { error };
  };

  return {
    addTemplateInDB,
    updateTemplateInDB,
    deleteTemplateInDB,
  };
};
