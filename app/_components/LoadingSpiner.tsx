export default function LoadingSpiner() {
  return (
    <div className="flex justify-center" role="status">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-700 border-t-transparent">
        <span className="sr-only">読み込み中</span>
      </div>
    </div>
  );
}
