import CheckIcon from "@/app/_components/icons/CheckIcon";
import DeleteIcon from "@/app/_components/icons/DeleteIcon";

type Props = {
  id: string;
  title: string;
  completed: boolean;
  label: string;
  onChange: (value: string) => void;
  onDelete: () => void;
};

export default function EditActionCheckListItem({
  label,
  title,
  completed,
  onChange,
  onDelete,
}: Props) {
  return (
    <div
      className={`grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded py-2 pl-4 pr-2 font-bold ${
        completed ? "bg-slate-800" : "bg-white"
      }`}
    >
      <span className={`${completed ? "text-white" : ""}`}>
        <CheckIcon />
      </span>
      <label>
        <span className="sr-only">{label}</span>
        <input
          type="text"
          className="block w-full rounded border-2 border-slate-800  p-2 "
          value={title}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
      <button
        onClick={onDelete}
        className={`grid h-full w-8 place-content-center rounded border-2  ${
          completed
            ? "border-white text-white hover:bg-white hover:text-slate-800 focus:bg-white focus:text-slate-800"
            : "border-slate-800 hover:bg-slate-800 hover:text-white  focus:bg-slate-800  focus:text-white"
        }`}
      >
        <span className="sr-only">削除</span>
        <DeleteIcon />
      </button>
    </div>
  );
}
