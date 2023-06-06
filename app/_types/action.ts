import { Color } from "@/app/_types/color";
import { Database } from "@/app/_types/supabase";

export type DatabaseActionCheckListItem =
  Database["public"]["Tables"]["action_checklist"]["Row"];

export type DatabaseAction = Database["public"]["Tables"]["actions"]["Row"];

export type ActionCheckListItem = {
  id: DatabaseActionCheckListItem["id"];
  title: DatabaseActionCheckListItem["title"];
  completed: DatabaseActionCheckListItem["completed"];
};

export type ActionCheckList = ActionCheckListItem[];

export type Action = {
  id: DatabaseAction["id"];
  title: DatabaseAction["title"];
  date: {
    dateTime: string;
    display: string;
  };
  color: Color;
  checkList: ActionCheckList;
};
