import CloudIcon from "@/app/_components/icons/CloudIcon";

type Props = {
  disabled?: boolean;
};

export default function SaveButton({ disabled = false }: Props) {
  return (
    <button
      disabled={disabled}
      type="submit"
      className="flex justify-center gap-2 rounded bg-slate-700  px-4 py-4 font-bold text-white  disabled:cursor-not-allowed disabled:opacity-50 "
    >
      <CloudIcon />
      保存する
    </button>
  );
}
