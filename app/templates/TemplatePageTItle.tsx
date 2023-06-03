import TemplateIcon from "@/app/_components/icons/TemplateIcon";

type Props = {
  title: string;
};

export default function TemplatePageTItle({ title }: Props) {
  return (
    <h1 className="flex items-center gap-1 font-bold">
      <TemplateIcon />
      {title}
    </h1>
  );
}
