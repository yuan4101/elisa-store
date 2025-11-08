export function FiltersSkeleton() {
  return (
    <div className="flex flex-col gap-2 mb-6 animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-19"></div>
      <div className="flex gap-2">
        <div className="h-8 bg-gray-200 rounded w-40"></div>
        <div className="h-8 bg-gray-200 rounded w-40"></div>
      </div>
    </div>
  );
}
