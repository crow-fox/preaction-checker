import { isColor } from "@/app/_types/color";
import { Template } from "@/app/_types/template";

export type DatabaseTemplate = {
  id?: string;
  title?: string;
  color: string;
  checkList?: {
    id: string;
    title: string;
    order: number;
  }[];
};

export const getConvertTemplate = (
  template: DatabaseTemplate
): Partial<Template> => {
  return {
    ...template,
    color: isColor(template.color) ? template.color : "gray",
  };
};

export const getConvertTemplates = (
  templates: DatabaseTemplate[]
): Partial<Template>[] => {
  return templates.map((template) => getConvertTemplate(template));
};
