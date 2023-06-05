import CheckIcon from "@/app/_components/icons/CheckIcon";
import DeleteIcon from "@/app/_components/icons/DeleteIcon";

type Props = {
  id: string;
  title: string;
  label: string;
  onChange: (value: string) => void;
  onDelete: () => void;
};

export default function EditTemplateCheckListItem({
  label,
  title,
  onChange,
  onDelete,
}: Props) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded bg-white py-2 pl-4 pr-2 font-bold">
      <CheckIcon />
      <label>
        <span className="sr-only">{label}</span>
        <input
          type="text"
          className="block w-full rounded border-2 border-slate-700  p-2 "
          value={title}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
      <button
        onClick={onDelete}
        className="grid h-full w-8 place-content-center rounded border-2 border-slate-700 hover:bg-slate-700 hover:text-white focus:bg-slate-700 focus:text-white "
      >
        <span className="sr-only">削除</span>
        <DeleteIcon />
      </button>
    </div>
  );
}
