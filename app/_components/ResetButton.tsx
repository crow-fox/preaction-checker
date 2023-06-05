import CloseIcon from "@/app/_components/icons/CloseIcon";

type Props = {
  onClick: () => void;
};

export default function ResetButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="flex items-center justify-center gap-2 rounded border border-slate-500 p-4 font-bold "
    >
      <CloseIcon />
      リセットする
    </button>
  );
}
