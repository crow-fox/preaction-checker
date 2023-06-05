type Props = {
  labelledby: string;
  value: string;
  onChange: (value: string) => void;
};

export default function InputTitle({ labelledby, value, onChange }: Props) {
  return (
    <input
      aria-labelledby={labelledby}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded border-2 border-slate-700 p-4 text-2xl font-bold leading-normal"
      name="title"
      autoComplete="off"
    />
  );
}
