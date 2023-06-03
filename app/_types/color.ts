export const colors = {
  gray: "灰色",
  red: "赤色",
  blue: "青色",
  green: "緑色",
  yellow: "黄色",
  pink: "桃色",
} as const satisfies { [key: string]: string };

export type Color = keyof typeof colors;

export const isColor = (value: string): value is Color => {
  if (value === "gray") return true;
  if (value === "red") return true;
  if (value === "blue") return true;
  if (value === "green") return true;
  if (value === "yellow") return true;
  if (value === "pink") return true;
  return false;
};
