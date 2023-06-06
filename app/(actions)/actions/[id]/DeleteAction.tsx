"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useActions } from "@/app/(actions)/useActions";
import CloseIcon from "@/app/_components/icons/CloseIcon";
import DeleteIcon from "@/app/_components/icons/DeleteIcon";

type Props = {
  id: string;
  title: string;
};

export default function DeleteAction({ id, title }: Props) {
  const { deleteAction } = useActions();

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="inline-flex items-center gap-1 rounded-full border-2 border-slate-800 bg-white px-3  py-2 font-bold hover:bg-slate-800 hover:text-white focus:bg-slate-800 focus:text-white ">
          <DeleteIcon />
          削除
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 flex items-center justify-center overflow-y-auto bg-black/30 p-4">
          <Dialog.Content className=" grid w-[min(45rem,100%)] gap-4 rounded bg-white p-6  ">
            <Dialog.Title className=" text-2xl font-bold ">
              アクション削除
            </Dialog.Title>
            <div className="grid gap-2">
              <p>
                アクション
                <em className=" font-bold not-italic">「{title}」</em>
                を削除しますか？
              </p>
              <p>この操作は取り消せません。</p>
            </div>
            <div className=" grid grid-cols-2 gap-4 ">
              <button
                onClick={() => deleteAction(id)}
                className="flex items-center justify-center gap-2 rounded border border-current bg-red-700 p-4 font-bold text-white"
              >
                <DeleteIcon />
                削除
              </button>
              <Dialog.Close asChild>
                <button className="flex items-center justify-center gap-2 rounded border border-slate-500 p-4 font-bold ">
                  <CloseIcon />
                  キャンセル
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
