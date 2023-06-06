import AddIcon from "@/app/_components/icons/AddIcon";
import CheckIcon from "@/app/_components/icons/CheckIcon";

type Props = {
  onClick: () => void;
};

export default function AddActionCheckListButton({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between gap-4 rounded border-2 border-dotted border-slate-500 p-4 hover:border-solid hover:border-blue-500 hover:bg-white focus:bg-white "
    >
      <span className="flex items-center gap-4 leading-normal">
        <CheckIcon />
        <span className="font-bold">新規追加</span>
      </span>
      <span className="ml-auto ">
        <AddIcon />
      </span>
    </button>
  );
}
