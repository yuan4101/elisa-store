import NavbarWrapper from "@/features/navbar/components/NavbarWraper";
import ShoppingCart from "@/features/shoppingCart/components/ShoppingCart";

export default function HeaderContent() {
  return (
    <div className="bg-[var(--color-navbar-bg)] pt-1 pb-2 md:py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <NavbarWrapper />
          <ShoppingCart />
        </div>
      </div>
    </div>
  );
}
