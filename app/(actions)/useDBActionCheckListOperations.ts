"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@/app/_components/UserProviderClient";
import {
  ActionCheckList,
  ActionCheckListItem,
  DatabaseActionCheckListItem,
} from "@/app/_types/action";
import { Database } from "@/app/_types/supabase";
import { hasAtLeastOneProperty } from "@/app/_utils/hasAtLeastOneProperty";

export const useDBActionCheckListOperations = () => {
  const supabase = createClientComponentClient<Database>();
  const user = useUser();

  const addActionCheckListItemInDB = async (
    actionId: string,
    checkListItem: Omit<ActionCheckListItem, "id">
  ) => {
    if (!user) return new Error("ログインしてください");

    console.log("addActionCheckListItemInDB");

    const { error } = await supabase.from("action_checklist").insert({
      title: checkListItem.title,
      completed: checkListItem.completed,
      action_id: actionId,
      user_id: user.id,
    });

    console.log("追加 actionCheckListItem");

    return error;
  };

  const addActionCheckListItemsInDB = async (
    actionId: string,
    checkList: ActionCheckList
  ) => {
    if (!user) return;
    console.log("addActionCheckListItemsInDB");
    if (checkList.length === 0) return;

    const errors = [];

    for (const checkListItem of checkList) {
      console.log("checkListItem", checkListItem);
      const error = await addActionCheckListItemInDB(actionId, checkListItem);

      if (error) {
        errors.push(error);
      }
    }

    return errors;
  };

  const updateActionCheckListItemInDB = async (
    id: string,
    payload: Partial<Omit<ActionCheckListItem, "id">>
  ) => {
    if (!hasAtLeastOneProperty(payload)) {
      console.log(payload);
      throw new Error("payload が空です");
    }

    // undefinedが渡されてきたときの処理
    const { error } = await supabase
      .from("action_checklist")
      .update(payload)
      .eq("id", id);

    console.log("更新 checklist");

    return error;
  };

  const updateActionCheckListItemsInDB = async (
    checkList: (Partial<ActionCheckListItem> & {
      id: DatabaseActionCheckListItem["id"];
    })[]
  ) => {
    try {
      const result = await Promise.all(
        checkList.map(({ id, title, completed }) =>
          updateActionCheckListItemInDB(id, { title, completed })
        )
      );
      return result.filter((error) => error !== null);
    } catch (error) {
      if (error instanceof Error) {
        return [error];
      }
    }
  };

  const deleteActionCheckListItemInDB = async (id: string) => {
    const { error } = await supabase
      .from("action_checklist")
      .delete()
      .eq("id", id);

    console.log("削除 actionCheckListItem");
    return error;
  };

  const deleteActionCheckListItemsInDB = async (ids: string[]) => {
    try {
      const result = await Promise.all(
        ids.map((id) => deleteActionCheckListItemInDB(id))
      );

      return result.filter((error) => error !== null);
    } catch (error) {
      if (error instanceof Error) {
        return [error];
      }
    }
  };

  return {
    addActionCheckListItemsInDB,
    updateActionCheckListItemInDB,
    updateActionCheckListItemsInDB,
    deleteActionCheckListItemsInDB,
  };
};
