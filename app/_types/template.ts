import { Color } from "@/app/_types/color";

export type TemplateCheckListItem = {
  id: string;
  title: string;
  order: number;
};

export type TemplateCheckList = TemplateCheckListItem[];

export type Template = {
  id: string;
  title: string;
  color: Color;
  checkList: TemplateCheckList;
};
