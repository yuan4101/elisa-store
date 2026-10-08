"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { CartItem as CartItemType } from "../context/ShoppingCartContext";
import { formatPriceCOP } from "@/utils/formatters";

interface cartItemProps {
  item: CartItemType;
  updateQuantity: (id: string, quantity: number) => void;
  toggleCart: () => void;
}

const CartItem = ({ item, updateQuantity, toggleCart }: cartItemProps) => {
  const router = useRouter();

  const handleImageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleCart();
    router.push(`/producto/${item.id}`);
  };

  const discountPercentage =
    item.originalPrice && item.originalPrice > item.price
      ? Math.round(
          ((item.originalPrice - item.price) / item.originalPrice) * 100
        )
      : null;

  return (
    <li className="flex flex-wrap py-2 border-b border-gray-100 last:border-0 items-end gap-x-4 gap-y-3">
      <div className="flex flex-1 min-w-[150px] gap-4 items-center">
        <div className="h-[calc(84px*(1+(var(--font-scale,1)-1)*0.5))] w-[calc(84px*(1+(var(--font-scale,1)-1)*0.5))] flex-shrink-0 overflow-hidden rounded-md border border-gray-200 relative">
          {discountPercentage && (
            <div className="absolute top-1 right-1 bg-[var(--color-button-pink)] text-white px-1.5 py-0.5 rounded text-xs font-bold z-10">
              -{discountPercentage}%
            </div>
          )}
          <div
            className="block h-full w-full cursor-pointer"
            onClick={handleImageClick}
          >
            <Image
              src={item.image}
              unoptimized
              alt={item.name}
              width={96}
              height={96}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col py-1 gap-2.5 justify-center">
          <h3 className="text-base font-medium text-[var(--color-text)] leading-tight">
            {item.name}
          </h3>
          
          <div className="flex items-center">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-[calc(2rem*var(--font-scale,1))] h-[calc(2rem*var(--font-scale,1))] flex items-center justify-center bg-[var(--color-card-bg)] rounded-md text-[calc(1.2rem*var(--font-scale,1))] text-[var(--color-badge)] font-bold shadow-md cursor-pointer hover:bg-[var(--color-badge-light)] hover:text-white active:scale-95 active:bg-[var(--color-badge)] active:text-white transition-all duration-150"
            >
              -
            </button>
            <span className="min-w-[calc(0.75rem*var(--font-scale,1))] text-[calc(1rem*var(--font-scale,1))] text-center mx-3 font-bold text-[var(--color-text)]">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-[calc(2rem*var(--font-scale,1))] h-[calc(2rem*var(--font-scale,1))] flex items-center justify-center bg-[var(--color-card-bg)] rounded-md text-[calc(1.2rem*var(--font-scale,1))] text-[var(--color-badge)] font-bold shadow-md cursor-pointer hover:bg-[var(--color-badge-light)] hover:text-white active:scale-95 active:bg-[var(--color-badge)] active:text-white transition-all duration-150"
            >
              +
            </button>
          </div>

          <p className="text-base text-gray-500 leading-none">
            <span
              className={
                discountPercentage ? "text-[var(--color-button-pink)] line-through mr-1" : ""
              }
            >
              {formatPriceCOP(item.originalPrice || item.price)}
            </span>
            {discountPercentage && (
              <span className="text-[var(--color-button-pink)] font-medium">
                {formatPriceCOP(item.price)}
              </span>
            )}
          </p>
        </div>
      </div>
      
      <div className="ml-auto text-right text-[var(--color-text)] text-base flex flex-wrap justify-end gap-x-1">
        <span>Subtotal:</span>
        <span>{formatPriceCOP(item.price * item.quantity)}</span>
      </div>
    </li>
  );
};

export default CartItem;
