import { useId } from "react";
import InputTitle from "@/app/_components/InputTitle";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function EditTemplateTitleField(props: Props) {
  const uid = useId();
  return (
    <div className="grid gap-2">
      <h2 className="font-bold " id={uid}>
        テンプレートのタイトル
      </h2>
      <InputTitle labelledby={uid} {...props} />
    </div>
  );
}
