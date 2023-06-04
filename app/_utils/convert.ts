import { Color, isColor } from "@/app/_types/color";
import { TemplateCheckList } from "@/app/_types/template";

export const getConvertedColor = (color: string): Color => {
  return isColor(color) ? color : "gray";
};

export const getConvertedCheckList = (checkList: TemplateCheckList) => {
  // orderの昇順に並び替える
  const sortedCheckList = checkList.sort((a, b) => a.order - b.order);
  return sortedCheckList;
};
