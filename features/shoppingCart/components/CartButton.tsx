import { useCart } from "../hooks/useCart";
import Badge from "@/components/ui/badge";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function CartButton() {
  const { toggleCart, cartCount } = useCart();

  return (
    <button
      onClick={toggleCart}
      className="p-2 rounded-full hover:bg-[var(--color-select)] text-[var(--color-navbar-text)]"
    >
      <div className="relative">
        <ShoppingCartIcon className="h-6 w-6" />
        {cartCount > 0 && <Badge count={cartCount} />}
      </div>
    </button>
  );
}
