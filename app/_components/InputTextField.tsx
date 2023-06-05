import { useId } from "react";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export default function InputTextField({ label, value, onChange }: Props) {
  const uid = useId();

  return (
    <p className="grid gap-2">
      <label htmlFor={uid} className="font-bold ">
        {label}
      </label>
      <input
        id={uid}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded border-2 border-gray-700 p-4 font-bold"
      />
    </p>
  );
}
