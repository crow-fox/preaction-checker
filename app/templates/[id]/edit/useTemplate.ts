import { useRouter } from "next/navigation";
import { FormEvent, useReducer, useState } from "react";
import { Color } from "@/app/_types/color";
import {
  TemplateCheckList,
  TemplateCheckListItem,
} from "@/app/_types/template";
import {
  getAddedCheckList,
  getDeletedCheckList,
  getUpdatedCheckList,
} from "@/app/_utils/difCheckList";
import { isEqualObject } from "@/app/_utils/isEqualObject";
import { useDBTemplateCheckListOperations } from "@/app/templates/[id]/edit/useDBTemplateCheckListOperations";
import { useDBTemplateOperations } from "@/app/templates/[id]/edit/useDBTemplateOperations";

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
      payload: Partial<Omit<TemplateCheckListItem, "id">>;
    }
  | {
      type: "replace";
      checkList: TemplateCheckList;
    };

const checkListReducer = (
  state: TemplateCheckList,
  action: CheckListReducerAction
) => {
  switch (action.type) {
    case "add": {
      return [
        ...state,
        {
          id: crypto.randomUUID(),
          title: "",
          order: state.length,
        },
      ];
    }
    case "delete": {
      return state.filter((checkListItem) => checkListItem.id !== action.id);
    }
    case "update": {
      return state.map((checkListItem) => {
        if (checkListItem.id === action.id) {
          if (Object.keys(action.payload).length === 0) {
            throw new Error("payload が空です");
          }
          if (
            action.payload.title !== undefined &&
            action.payload.order !== undefined
          ) {
            return {
              ...checkListItem,
              title: action.payload.title,
              order: action.payload.order,
            };
          }
          if (action.payload.title !== undefined) {
            return {
              ...checkListItem,
              title: action.payload.title,
            };
          }
          if (action.payload.order !== undefined) {
            return {
              ...checkListItem,
              order: action.payload.order,
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

export const useTemplate = (
  id: string,
  initTitle: string,
  initColor: Color,
  initCheckList: TemplateCheckList
) => {
  const { updateTemplateInDB } = useDBTemplateOperations();
  const {
    addTemplateCheckListItemsInDB,
    updateTemplateCheckListItemsInDB,
    deleteTemplateCheckListItemsInDB,
  } = useDBTemplateCheckListOperations();
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
    payload: {
      title?: string;
      order?: number;
    };
  }) => {
    if (Object.keys(payload).length === 0) {
      throw new Error("payload が空です");
    }

    const { title, order } = payload;

    if (title !== undefined && order !== undefined) {
      dispatchNewCheckList({
        type: "update",
        id,
        payload: {
          title,
          order,
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
    if (order !== undefined) {
      dispatchNewCheckList({
        type: "update",
        id,
        payload: {
          order,
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

  const resetTemplate = () => {
    setNewTitle(initTitle);
    setNewColor(initColor);
    dispatchNewCheckList({
      type: "replace",
      checkList: initCheckList,
    });
  };

  const saveTemplate = async () => {
    //  ローカルのデータをDBに反映
    //  差異がない場合はスキップ
    if (!needSave) return;

    // タイトルとカラー変更をDBに反映
    if (newTitle !== initTitle && newColor !== initColor) {
      const { error } = await updateTemplateInDB(id, {
        title: newTitle,
        color: newColor,
      });

      if (error) {
        setError(error.message);

        return;
      }
    } else if (newTitle !== initTitle) {
      const { error } = await updateTemplateInDB(id, {
        title: newTitle,
      });

      if (error) {
        setError(error.message);

        return;
      }
    } else if (newColor !== initColor) {
      const { error } = await updateTemplateInDB(id, {
        color: newColor,
      });

      if (error) {
        setError(error.message);

        return;
      }
    }

    // checkListの差分をDBに反映
    if (!isEqualObject(newCheckList, initCheckList)) {
      const addedTemplateCheckList = getAddedCheckList(
        initCheckList,
        newCheckList
      );
      const updatedTemplateCheckList = getUpdatedCheckList(
        initCheckList,
        newCheckList
      );
      const deletedTemplateCheckList = getDeletedCheckList(
        initCheckList,
        newCheckList
      );

      // 追加されたcheckListItemをDBに反映
      if (addedTemplateCheckList.length > 0) {
        const error = await addTemplateCheckListItemsInDB(
          id,
          addedTemplateCheckList
        );

        if (error) {
          setError(error.message);
          return;
        }
      }

      // 更新されたcheckListItemをDBに反映
      if (updatedTemplateCheckList.length > 0) {
        const errors = await updateTemplateCheckListItemsInDB(
          updatedTemplateCheckList
        );

        if (errors && errors[0] && errors.length > 0) {
          setError(errors[0].message);

          return;
        }
      }

      // 削除されたcheckListItemをDBに反映
      if (deletedTemplateCheckList.length > 0) {
        const errors = await deleteTemplateCheckListItemsInDB(
          deletedTemplateCheckList.map((checkListItem) => checkListItem.id)
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

    await saveTemplate();
    setIsLoading(false);
    router.refresh();
  };

  const onClickReset = () => {
    resetTemplate();
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
