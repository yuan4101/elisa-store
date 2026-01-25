"use client";

import { Transition } from "@headlessui/react";
import { useCart } from "../hooks/useCart";
import { generateWhatsAppMessage } from "../utils/cartHelpers";
import CartButton from "./CartButton";
import CartDrawer from "./CartDrawer";

export default function ShoppingCart() {
  const { cartItems, isCartOpen, toggleCart, updateQuantity, clearCart } =
    useCart();

  const precioTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const whatsappLink = generateWhatsAppMessage(cartItems, precioTotal);

  return (
    <div className="flex items-center">
      <CartButton />
      <Transition show={isCartOpen} as="div">
        <CartDrawer
          cartItems={cartItems}
          precioTotal={precioTotal}
          whatsappLink={whatsappLink}
          updateQuantity={updateQuantity}
          toggleCart={toggleCart}
          clearCart={clearCart}
        />
      </Transition>
    </div>
  );
}
