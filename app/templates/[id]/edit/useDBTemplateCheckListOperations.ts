import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@/app/_components/UserProviderClient";
import { Database } from "@/app/_types/supabase";
import {
  TemplateCheckList,
  TemplateCheckListItem,
} from "@/app/_types/template";

export const useDBTemplateCheckListOperations = () => {
  const supabase = createClientComponentClient<Database>();
  const user = useUser();

  const addTemplateCheckListItemsInDB = async (
    templateId: string,
    checkList: TemplateCheckList
  ) => {
    if (!user) return;

    const { error } = await supabase.from("template_checklist").insert(
      checkList.map((checkList) => ({
        title: checkList.title,
        template_id: templateId,
        user_id: user.id,
      }))
    );

    console.log("追加 templateCheckListItems");
    return error;
  };

  const updateTemplateCheckListItemInDB = async (
    id: string,
    payload: Partial<Omit<TemplateCheckListItem, "id">>
  ) => {
    if (Object.keys(payload).length === 0) {
      throw new Error("payload が空です");
    }

    const { error } = await supabase
      .from("template_checklist")
      .update(payload)
      .eq("id", id);

    console.log("更新 checklist");

    return error;
  };

  const updateTemplateCheckListItemsInDB = async (
    checkList: TemplateCheckList
  ) => {
    try {
      const result = await Promise.all(
        checkList.map(({ id, title }) =>
          updateTemplateCheckListItemInDB(id, { title })
        )
      );
      return result.filter((error) => error !== null);
    } catch (error) {
      if (error instanceof Error) {
        return [error];
      }
    }
  };

  const deleteTemplateCheckListItemInDB = async (id: string) => {
    const { error } = await supabase
      .from("template_checklist")
      .delete()
      .eq("id", id);

    console.log("削除 templateCheckListItem");
    return error;
  };

  const deleteTemplateCheckListItemsInDB = async (ids: string[]) => {
    try {
      const result = await Promise.all(
        ids.map((id) => deleteTemplateCheckListItemInDB(id))
      );

      return result.filter((error) => error !== null);
    } catch (error) {
      if (error instanceof Error) {
        return [error];
      }
    }
  };

  return {
    addTemplateCheckListItemsInDB,
    updateTemplateCheckListItemsInDB,
    deleteTemplateCheckListItemsInDB,
  };
};