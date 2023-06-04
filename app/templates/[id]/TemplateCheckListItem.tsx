import CheckIcon from "@/app/_components/icons/CheckIcon";

type Props = {
  title: string;
};

export default function TemplateCheckListItem({ title }: Props) {
  return (
    <div className="flex gap-4 rounded bg-white p-4 font-bold">
      <CheckIcon />
      <p>{title}</p>
    </div>
  );
}
