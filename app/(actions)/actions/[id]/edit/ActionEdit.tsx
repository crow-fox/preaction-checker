"use client";

import { CSSProperties } from "react";
import DeleteAction from "@/app/(actions)/actions/[id]/DeleteAction";
import AddActionCheckListButton from "@/app/(actions)/actions/[id]/edit/AddActionCheckListButton";
import EditActionCheckListItem from "@/app/(actions)/actions/[id]/edit/EditActionCheckListItem";
import { useAction } from "@/app/(actions)/actions/[id]/useAction";
import ColorRadiosField from "@/app/_components/ColorRadiosField";
import InputTitle from "@/app/_components/InputTitle";
import LoadingSpiner from "@/app/_components/LoadingSpiner";
import ResetButton from "@/app/_components/ResetButton";
import SaveButton from "@/app/_components/SaveButton";
import ToDetailLink from "@/app/_components/ToDetailLink";
import { Action } from "@/app/_types/action";

type Props = Action;

export default function ActionEdit({ id, title, color, checkList }: Props) {
  const {
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
  } = useAction(id, title, color, checkList);

  if (error) {
    return null;
  }

  if (isLoading) {
    return <LoadingSpiner />;
  }

  return (
    <div
      className="grid gap-8 rounded bg-[var(--color)] p-6"
      style={
        {
          "--color": `var(--c-${newColor})`,
        } as CSSProperties
      }
    >
      <div className="grid gap-4">
        <ul className="flex flex-wrap justify-end gap-2">
          <li>
            <ToDetailLink href={`/actions/${id}`} />
          </li>
          <li>
            <DeleteAction id={id} title={newTitle} />
          </li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6">
        <div className="grid gap-2">
          <h2 className="font-bold " id="title">
            アクションのタイトル
          </h2>
          <div className="grid">
            <InputTitle
              labelledby="title"
              value={newTitle}
              onChange={handleTitle}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <h2 className="font-bold">チェックリスト</h2>
          {newCheckList.length === 0 ? (
            <div className="grid gap-2">
              <p>チェックリストがありません。</p>
            </div>
          ) : (
            <ol className="grid gap-2">
              {newCheckList.map((item, index) => (
                <li key={item.id}>
                  <EditActionCheckListItem
                    id={item.id}
                    title={item.title}
                    completed={item.completed}
                    label={`チェックリスト${index + 1}`}
                    onChange={(newTitle) =>
                      updateCheckListItem({
                        id: item.id,
                        payload: {
                          title: newTitle,
                        },
                      })
                    }
                    onDelete={() => deleteCheckListItem(item.id)}
                  />
                </li>
              ))}
            </ol>
          )}
          <div>
            <AddActionCheckListButton onClick={addCheckListItem} />
          </div>
        </div>

        <div className="grid gap-2">
          <h2 className="font-bold">テーマカラー</h2>
          <div>
            <ColorRadiosField value={newColor} onChange={handleColor} />
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid">
            <SaveButton disabled={!needSave} />
          </div>
          <div className="grid ">
            <ResetButton onClick={onClickReset} />
          </div>
        </div>
      </form>
    </div>
  );
}
