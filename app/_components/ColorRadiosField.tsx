import { CSSProperties, useId } from "react";
import { Color, colors } from "@/app/_types/color";
import { getConvertedColor } from "@/app/_utils/convert";

type Props = {
  value: Color;
  onChange: (value: Color) => void;
};

export default function ColorRadiosField({ value, onChange }: Props) {
  const uid = useId();
  return (
    <fieldset className="flex flex-wrap gap-2 rounded bg-white p-2">
      {Object.entries(colors).map(([colorName, colorJaName]) => (
        <div key={colorName}>
          <input
            type="radio"
            name="color"
            id={`color-${colorName}-${uid}`}
            value={colorName}
            checked={colorName === value}
            onChange={() => onChange(getConvertedColor(colorName))}
            className="peer sr-only"
          />
          <label
            htmlFor={`color-${colorName}-${uid}`}
            className="flex h-12 w-12 rounded-full border-2 border-slate-300 bg-white p-1 peer-checked:border-slate-700"
          >
            <span className="sr-only">{colorJaName}</span>
            <span
              className=" h-full w-full rounded-full  bg-[var(--color)]"
              style={
                {
                  "--color": `var(--c-${colorName})`,
                } as CSSProperties
              }
            ></span>
          </label>
        </div>
      ))}
    </fieldset>
  );
}
