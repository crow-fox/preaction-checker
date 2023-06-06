import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@/app/_components/UserProviderClient";
import { Database } from "@/app/_types/supabase";
import {
  TemplateCheckList,
  TemplateCheckListItem,
} from "@/app/_types/template";
import { hasAtLeastOneProperty } from "@/app/_utils/hasAtLeastOneProperty";

export const useDBTemplateCheckListOperations = () => {
  const supabase = createClientComponentClient<Database>();
  const user = useUser();

  const addTemplateCheckListItemInDB = async (
    templateId: string,
    checkListItem: Omit<TemplateCheckListItem, "id">
  ) => {
    if (!user) return new Error("ログインしてください");

    const { error } = await supabase.from("template_checklist").insert({
      title: checkListItem.title,
      template_id: templateId,
      user_id: user.id,
    });

    console.log("追加 templateCheckListItem");

    return error;
  };

  const addTemplateCheckListItemsInDB = async (
    templateId: string,
    checkList: TemplateCheckList
  ) => {
    if (!user) return;

    const result = [];

    for (const checkListItem of checkList) {
      const error = await addTemplateCheckListItemInDB(
        templateId,
        checkListItem
      );

      if (error) {
        result.push(error);
      }
    }

    return result;
  };

  const updateTemplateCheckListItemInDB = async (
    id: string,
    payload: Partial<Omit<TemplateCheckListItem, "id">>
  ) => {
    if (!hasAtLeastOneProperty(payload)) {
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
