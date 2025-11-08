export function ProductGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 animate-pulse">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="h-38 bg-gray-200 rounded-xl"></div>
          <div className="h-5 bg-gray-200 rounded w-12"></div>
          <div className="flex gap-2 justify-between">
            <div className="h-5 bg-gray-200 rounded w-26"></div>
            <div className="h-5 bg-gray-200 rounded w-5"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
