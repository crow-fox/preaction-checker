import { Color, isColor } from "@/app/_types/color";
import { TemplateCheckListItem } from "@/app/_types/template";

export const getConvertedColor = (color: string): Color => {
  return isColor(color) ? color : "gray";
};

type CheckList = (TemplateCheckListItem & { created_at: string })[];

export const getConvertedCheckList = (checkList: CheckList) => {
  const sortedCheckList = [...checkList].sort((a, b) =>
    a.created_at.localeCompare(b.created_at)
  );

  return sortedCheckList;
};
