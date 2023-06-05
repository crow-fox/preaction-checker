import ColorRadiosField from "@/app/_components/ColorRadiosField";
import { Color } from "@/app/_types/color";

type Props = {
  value: Color;
  onChange: (value: Color) => void;
};

export default function EditTemplateCOlorRadioField({
  value,
  onChange,
}: Props) {
  return (
    <div className="grid gap-2">
      <h2 className="font-bold">テーマカラー</h2>
      <ColorRadiosField value={value} onChange={onChange} />
    </div>
  );
}
