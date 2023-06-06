import "server-only";

import { format, parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { Color, isColor } from "@/app/_types/color";

export const getConvertedColor = (color: string): Color => {
  return isColor(color) ? color : "gray";
};
export const getConvertedCheckList = <T extends { created_at: string }>(
  checkList: T[]
): T[] => {
  const sortedCheckList = [...checkList].sort((a, b) => {
    const dateA = parseISO(a.created_at);
    const dateB = parseISO(b.created_at);
    // 新しい順に並び替え
    return dateA.getTime() - dateB.getTime();
  });

  return sortedCheckList;
};

export const getConvertedDate = (isoString: string) => {
  const date = parseISO(isoString);
  const jaDate = utcToZonedTime(date, "Asia/Tokyo");
  const dateTime = format(jaDate, "yyyy-MM-dd");
  const display = format(jaDate, "yyyy年MM月dd日");

  return {
    dateTime,
    display,
  };
};
