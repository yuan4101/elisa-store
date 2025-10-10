import Product from "@/app/types/product";
import useNavigation from "@/hooks/useNavigation";
import Image from "next/image";
import useProductActions from "../hooks/useProductActions";

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { goProduct } = useNavigation();
  const { handleAddToCart, getProductQuantity } = useProductActions();

  return (
    <div
      key={product.id}
      onClick={() => goProduct(product.id)}
      className="lg:w-[190px] group bg-[var(--color-card-bg)] rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:text-[var(--color-navbar-bg)] transition transform hover:-translate-y-1 cursor-pointer flex flex-col h-full"
    >
      <div className="flex-1">
        <div className="relative w-full aspect-square bg-[var(--color-card-bg)]">
          <Image
            src={
              product.imagePath
                ? `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_MEDIUM_IMAGES}${product.imagePath}`
                : "/icons/file.svg"
            }
            unoptimized
            alt={product.name}
            fill
            priority={index < 2}
            loading={index > 1 ? "lazy" : "eager"}
            className="object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/icons/file.svg";
              (e.target as HTMLImageElement).classList.add("p-4", "opacity-70");
            }}
          />
        </div>
        <div className="pt-2 px-4">
          <h2 className="text-md font-normal text-[var(--color-text)] group-hover:text-[var(--color-navbar-bg)] text-left">
            {product.name}
          </h2>
        </div>
      </div>
      <div className="pl-4 pr-2 mt-auto">
        <div className="flex items-center justify-between gap-2">
          {product.stock === 0 ? (
            <span className="pr-4 text-[var(--color-badge)] text-md flex items-center h-[40px]">
              Agotado
            </span>
          ) : (
            <>
              <span>$ {product.price.toLocaleString()}</span>
              <button
                onClick={(e) => handleAddToCart(e, product)}
                className="p-2 rounded-full hover:bg-[var(--color-select)]"
              >
                <div className="relative">
                  {getProductQuantity(product.id) > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[var(--color-badge)] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getProductQuantity(product.id)}
                    </span>
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[var(--color-navbar-bg)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
