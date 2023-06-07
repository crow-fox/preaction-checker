"use client";

import * as Dialog from "@radix-ui/react-dialog";
import CloseIcon from "@/app/_components/icons/CloseIcon";
import DeleteIcon from "@/app/_components/icons/DeleteIcon";
import { useAuth } from "@/app/auth/useAuth";

export default function DeleteAccount() {
  const { deleteUserAccount } = useAuth();

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="block rounded border border-gray-600 bg-white px-4 py-2 font-bold text-red-700">
          アカウント削除
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 flex items-center justify-center overflow-y-auto bg-black/30 p-4">
          <Dialog.Content className=" grid w-[min(45rem,100%)] gap-4 rounded bg-white p-6  ">
            <Dialog.Title className=" text-2xl font-bold ">
              アカウント削除
            </Dialog.Title>
            <div className="grid gap-2">
              <p>本当にアカウントを削除しますか？</p>
              <p>この操作は取り消せません。</p>
            </div>
            <div className=" grid grid-cols-2 gap-4 ">
              <button
                onClick={deleteUserAccount}
                className="flex items-center justify-center gap-2 rounded border border-current bg-red-700 p-4 font-bold text-white"
              >
                <DeleteIcon />
                削除
              </button>
              <Dialog.Close asChild>
                <button className="flex items-center justify-center gap-2 rounded border border-slate-800 p-4 font-bold ">
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
