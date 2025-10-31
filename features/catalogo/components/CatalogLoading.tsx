import { FiltersSkeleton } from "../skeletons/FiltersSkeleton";
import { ProductGridSkeleton } from "../skeletons/ProductGridSkeleton";

export function CatalogLoading() {
  return (
    <div className="max-w-7xl mx-auto px-3 py-2">
      <FiltersSkeleton />
      <ProductGridSkeleton />
    </div>
  );
}
