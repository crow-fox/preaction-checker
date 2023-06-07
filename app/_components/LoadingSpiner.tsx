type Props = {
  size?: "min" | "default";
};

export default function LoadingSpiner({ size = "default" }: Props) {
  const sizeClass = size === "min" ? "h-5 w-5" : "h-10 w-10";

  return (
    <div className="flex justify-center" role="status">
      <div
        className={`animate-spin rounded-full border-4 border-blue-700 border-t-transparent ${sizeClass}`}
      >
        <span className="sr-only">読み込み中</span>
      </div>
    </div>
  );
}
