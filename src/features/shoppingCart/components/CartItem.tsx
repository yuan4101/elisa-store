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

  return (
    <li className="flex py-3">
      <div className="h-21 w-21 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
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

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-[var(--color-text)]">
            <h3>{item.name}</h3>
            <p className="ml-4">{formatPriceCOP(item.price * item.quantity)}</p>
          </div>
          <p className="text-sm text-[var(--color-text)]">
            {formatPriceCOP(item.price)} x {item.quantity}
          </p>
        </div>
        <div className="flex flex-1 justify-between text-sm">
          <div className="flex items-center">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center bg-[var(--color-card-bg)] rounded-md text-[var(--color-badge)] font-bold shadow-md
                        cursor-pointer
                        hover:bg-[var(--color-badge-light)] hover:text-white
                        active:scale-95 active:bg-[var(--color-badge)] active:text-white
                        transition-all duration-150 ease-in-out"
            >
              -
            </button>
            <span className="min-w-3 text-center mx-3 font-bold text-[var(--color-text)]">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center bg-[var(--color-card-bg)] rounded-md text-[var(--color-badge)] font-bold shadow-md
                        cursor-pointer
                        hover:bg-[var(--color-badge-light)] hover:text-white
                        active:scale-95 active:bg-[var(--color-badge)] active:text-white
                        transition-all duration-150 ease-in-out"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
