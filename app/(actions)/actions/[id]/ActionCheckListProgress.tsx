import { ActionCheckList } from "@/app/_types/action";

type Props = {
  actionCheckList: ActionCheckList;
};

export default function ActionCheckListProgress({ actionCheckList }: Props) {
  const completedCheckList = actionCheckList.filter((item) => item.completed);
  const progress =
    Math.floor((completedCheckList.length / actionCheckList.length) * 100) || 0;

  return (
    <div className="flex items-center gap-2">
      <div
        className="grid h-12 w-12 place-content-center rounded-full border border-slate-700"
        style={{
          backgroundImage: `conic-gradient( black ${progress}%, white ${progress}%)`,
        }}
      >
        <span className="grid h-9 w-9 place-content-center rounded-full border border-slate-700 bg-white">
          <svg
            height="1em"
            viewBox="0 96 960 960"
            width="1em"
            role="img"
            aria-hidden="true"
            className="inline-block h-6 w-6 fill-current"
            style={{
              opacity: progress === 100 ? 1 : 0.2,
            }}
          >
            <path d="M294 814 70 590l43-43 181 181 43 43-43 43Zm170 0L240 590l43-43 181 181 384-384 43 43-427 427Zm0-170-43-43 257-257 43 43-257 257Z" />
          </svg>
        </span>
      </div>
      <div>
        <span className="sr-only">{`${actionCheckList.length}個中${completedCheckList.length}個完了`}</span>
        <span aria-hidden="true" className="text-lg">
          {`${completedCheckList.length} / ${actionCheckList.length} 完了`}
        </span>
      </div>
    </div>
  );
}
