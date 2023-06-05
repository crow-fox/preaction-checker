"use client";

import { CSSProperties } from "react";
import LoadingSpiner from "@/app/_components/LoadingSpiner";
import ResetButton from "@/app/_components/ResetButton";
import SaveButton from "@/app/_components/SaveButton";
import ToDetailLink from "@/app/_components/ToDetailLink";
import { Template } from "@/app/_types/template";
import DeleteTemplate from "@/app/templates/[id]/DeleteTemplate";
import AddTemplateCheckListButton from "@/app/templates/[id]/edit/AddTemplateCheckListButton";
import EditTemplateCheckListItem from "@/app/templates/[id]/edit/EditTemplateCheckListItem";
import EditTemplateCOlorRadioField from "@/app/templates/[id]/edit/EditTemplateColorRadioField";
import EditTemplateTitleField from "@/app/templates/[id]/edit/EditTemplateTitleField";
import { useTemplate } from "@/app/templates/[id]/edit/useTemplate";

type Props = Template;

export default function TemplateEdit({ id, title, color, checkList }: Props) {
  const {
    isLoading,
    // error,
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
  } = useTemplate(id, title, color, checkList);

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
            <ToDetailLink href={`/templates/${id}`} />
          </li>
          <li>
            <DeleteTemplate id={id} title={newTitle} />
          </li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6">
        <div>
          <EditTemplateTitleField value={newTitle} onChange={handleTitle} />
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
                  <EditTemplateCheckListItem
                    id={item.id}
                    title={item.title}
                    label={`チェックリスト${index + 1}`}
                    onChange={(newTitle) =>
                      updateCheckListItem({
                        id: item.id,
                        payload: {
                          title: newTitle,
                          order: index + 1,
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
            <AddTemplateCheckListButton onClick={addCheckListItem} />
          </div>
        </div>

        <div>
          <EditTemplateCOlorRadioField
            value={newColor}
            onChange={handleColor}
          />
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
