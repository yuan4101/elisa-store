import { Product } from "../../producto/types/product";
import { ProductCard } from "../../producto/components/ProductCard";
import { useAccessibility } from "../../accessibility/context/AccessibilityContext";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const { settings } = useAccessibility();
  const fontScale = settings.fontScale ?? 1;
  
  const gridStyle = {
    "--catalog-cols-mobile": fontScale >= 1.5 ? 1 : 2,
    "--catalog-cols-tablet": 3,
    "--catalog-cols-desktop": 5,
  } as React.CSSProperties;

  return (
    <div 
      style={gridStyle}
      className="grid gap-x-4 gap-y-6 lg:gap-x-8 lg:gap-y-10 pb-5 pt-3 grid-cols-[repeat(var(--catalog-cols-mobile,2),minmax(0,1fr))] md:grid-cols-[repeat(var(--catalog-cols-tablet,3),minmax(0,1fr))] lg:grid-cols-[repeat(var(--catalog-cols-desktop,5),minmax(0,1fr))]"
    >
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
