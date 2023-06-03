export type TemplateCheckList = {
  id: string;
  title: string;
  order: number;
};

export type Template = {
  id: string;
  title: string;
  color: string;
  checkList: TemplateCheckList[];
};
