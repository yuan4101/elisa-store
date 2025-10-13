import Navbar from "@/features/navbar/components/Navbar";
import ShoppingCart from "@/features/shoppingCart/components/ShoppingCart";

export default function HeaderContent() {
  return (
    <div className="bg-[var(--color-navbar-bg)] py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Navbar />
          <ShoppingCart />
        </div>
      </div>
    </div>
  );
}
