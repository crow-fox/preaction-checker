"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useReducer, useState } from "react";
import {
  getAddedActionCheckList,
  getDeletedActionCheckList,
  getUpdatedActionCheckList,
} from "@/app/(actions)/difActionCheckList";
import { useDBActionCheckListOperations } from "@/app/(actions)/useDBActionCheckListOperations";
import { useDBActionOperations } from "@/app/(actions)/useDBActionOperations";
import { ActionCheckList, ActionCheckListItem } from "@/app/_types/action";
import { Color } from "@/app/_types/color";
import { hasAtLeastOneProperty } from "@/app/_utils/hasAtLeastOneProperty";
import { isEqualObject } from "@/app/_utils/isEqualObject";

type CheckListReducerAction =
  | {
      type: "add";
    }
  | {
      type: "delete";
      id: string;
    }
  | {
      type: "update";
      id: string;
      payload: Partial<Omit<ActionCheckListItem, "id">>;
    }
  | {
      type: "replace";
      checkList: ActionCheckList;
    };

const checkListReducer = (
  state: ActionCheckList,
  action: CheckListReducerAction
) => {
  switch (action.type) {
    case "add": {
      return [
        ...state,
        {
          id: crypto.randomUUID(),
          title: "",
          completed: false,
        },
      ];
    }
    case "delete": {
      return state.filter((checkListItem) => checkListItem.id !== action.id);
    }
    case "update": {
      return state.map((checkListItem) => {
        if (checkListItem.id === action.id) {
          if (!hasAtLeastOneProperty(action.payload)) {
            throw new Error("payload が空です");
          }
          if (
            action.payload.title !== undefined &&
            action.payload.completed !== undefined
          ) {
            return {
              ...checkListItem,
              completed: action.payload.completed,
              title: action.payload.title,
            };
          }

          if (action.payload.title !== undefined) {
            return {
              ...checkListItem,
              title: action.payload.title,
            };
          }

          if (action.payload.completed !== undefined) {
            return {
              ...checkListItem,
              completed: action.payload.completed,
            };
          }
        }
        return checkListItem;
      });
    }
    case "replace": {
      return action.checkList;
    }
  }
};

export const useAction = (
  id: string,
  initTitle: string,
  initColor: Color,
  initCheckList: ActionCheckList
) => {
  const { updateActionInDB } = useDBActionOperations();
  const {
    addActionCheckListItemsInDB,
    updateActionCheckListItemsInDB,
    deleteActionCheckListItemsInDB,
  } = useDBActionCheckListOperations();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [newTitle, setNewTitle] = useState(initTitle);
  const [newColor, setNewColor] = useState(initColor);
  const [newCheckList, dispatchNewCheckList] = useReducer(
    checkListReducer,
    initCheckList
  );
  const router = useRouter();

  const needSave = !isEqualObject(
    { title: initTitle, color: initColor, checkList: initCheckList },
    { title: newTitle, color: newColor, checkList: newCheckList }
  );

  const handleTitle = (title: string) => setNewTitle(title);

  const handleColor = (color: Color) => setNewColor(color);

  const addCheckListItem = () => dispatchNewCheckList({ type: "add" });

  const updateCheckListItem = ({
    id,
    payload,
  }: {
    id: string;
    payload: Partial<Omit<ActionCheckListItem, "id">>;
  }) => {
    if (!hasAtLeastOneProperty(payload)) {
      throw new Error("payload が空です");
    }

    const { title, completed } = payload;

    if (title !== undefined && completed !== undefined) {
      dispatchNewCheckList({
        type: "update",
        id,
        payload: {
          title,
          completed,
        },
      });
      return;
    }

    if (title !== undefined) {
      dispatchNewCheckList({
        type: "update",
        id,
        payload: {
          title,
        },
      });
      return;
    }

    if (completed !== undefined) {
      dispatchNewCheckList({
        type: "update",
        id,
        payload: {
          completed,
        },
      });
      return;
    }
  };

  const deleteCheckListItem = (id: string) => {
    dispatchNewCheckList({
      type: "delete",
      id,
    });
  };

  const resetAction = () => {
    setNewTitle(initTitle);
    setNewColor(initColor);
    dispatchNewCheckList({
      type: "replace",
      checkList: initCheckList,
    });
  };

  const saveAction = async () => {
    //  ローカルのデータをDBに反映
    //  差異がない場合はスキップ
    if (!needSave) return;

    // タイトルとカラー変更をDBに反映
    if (newTitle !== initTitle && newColor !== initColor) {
      const { error } = await updateActionInDB(id, {
        title: newTitle,
        color: newColor,
      });

      if (error) {
        setError(error.message);

        return;
      }
    } else if (newTitle !== initTitle) {
      const { error } = await updateActionInDB(id, {
        title: newTitle,
      });

      if (error) {
        setError(error.message);

        return;
      }
    } else if (newColor !== initColor) {
      const { error } = await updateActionInDB(id, {
        color: newColor,
      });

      if (error) {
        setError(error.message);

        return;
      }
    }

    // checkListの差分をDBに反映
    if (!isEqualObject(newCheckList, initCheckList)) {
      const addedActionCheckList = getAddedActionCheckList(
        initCheckList,
        newCheckList
      );
      const updatedActionCheckList = getUpdatedActionCheckList(
        initCheckList,
        newCheckList
      );
      const deletedActionCheckList = getDeletedActionCheckList(
        initCheckList,
        newCheckList
      );

      // 追加されたcheckListItemをDBに反映
      if (addedActionCheckList.length > 0) {
        const errors = await addActionCheckListItemsInDB(
          id,
          addedActionCheckList
        );

        if (errors && errors[0] && errors.length > 0) {
          setError(errors[0].message);
          return;
        }
      }

      // 更新されたcheckListItemをDBに反映
      if (updatedActionCheckList.length > 0) {
        const errors = await updateActionCheckListItemsInDB(
          updatedActionCheckList
        );

        if (errors && errors[0] && errors.length > 0) {
          setError(errors[0].message);

          return;
        }
      }

      // 削除されたcheckListItemをDBに反映
      if (deletedActionCheckList.length > 0) {
        const errors = await deleteActionCheckListItemsInDB(
          deletedActionCheckList.map((checkListItem) => checkListItem.id)
        );

        if (errors && errors[0] && errors.length > 0) {
          setError(errors[0].message);

          return;
        }
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    await saveAction();
    setIsLoading(false);
    router.refresh();
  };

  const onClickReset = () => {
    resetAction();
  };

  return {
    isLoading,
    error,
    needSave,
    newTitle,
    newColor,
    newCheckList,
    handleTitle,
    handleColor,
    addCheckListItem,
    updateCheckListItem,
    deleteCheckListItem,
    onClickReset,
    handleSubmit,
  };
};
