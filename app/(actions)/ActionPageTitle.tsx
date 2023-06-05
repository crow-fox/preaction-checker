import ActionIcon from "@/app/_components/icons/ActionIcon";

type Props = {
  title: string;
};

export default function ActionPageTitle({ title }: Props) {
  return (
    <h1 className="flex items-center gap-1 font-bold">
      <ActionIcon />
      {title}
    </h1>
  );
}
