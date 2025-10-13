import CartItem from "./CartItem";
import { CartItem as CartItemType } from "../context/ShoppingCartContext";

interface cartItemListProps {
  items: CartItemType[];
  updateQuantity: (id: string, quantity: number) => void;
  toggleCart: () => void;
}

const CartItemList = ({
  items,
  updateQuantity,
  toggleCart,
}: cartItemListProps) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-lg text-[var(--color-text)]">
          Tu carrito está vacío
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 py-5 sm:px-6">
      <ul className="-my-5 divide-y divide-gray-200">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            updateQuantity={updateQuantity}
            toggleCart={toggleCart}
          />
        ))}
      </ul>
    </div>
  );
};

export default CartItemList;
