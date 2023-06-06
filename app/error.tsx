"use client";

import AlertIcon from "@/app/_components/icons/AlertIcon";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="grid gap-4">
      <h1 className="flex font-bold leading-normal">
        <AlertIcon />
        エラーが発生しました。
      </h1>
      <button
        onClick={() => reset()}
        className="grid place-content-center rounded  bg-red-500 p-4 font-bold text-white"
      >
        もう一度試す
      </button>
    </div>
  );
}
