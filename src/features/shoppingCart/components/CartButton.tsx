"use client";

import { useState, useEffect } from "react";
import { useCart } from "../hooks/useCart";
import { Badge } from "@/components/ui/badge";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function CartButton() {
  const { toggleCart, cartCount } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      onClick={toggleCart}
      className="py-1 md:py-2 rounded-full hover:bg-[var(--color-select)] text-[var(--color-navbar-text)]"
    >
      <div className="relative">
        <ShoppingCartIcon className="h-6 w-6" />
        {mounted && cartCount > 0 && <Badge count={cartCount} />}
      </div>
    </button>
  );
}
