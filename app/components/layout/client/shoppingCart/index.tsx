'use client';

import { Transition } from '@headlessui/react';
import { useCart } from '@/app/context/shoppingCartContext';
import CartButton from './cartButton';
import CartDrawer from './cartDrawer';

export default function ShoppingCart() {
  const {
    cartItems,
    isCartOpen,
    toggleCart,
    updateQuantity,
    clearCart
  } = useCart();

  const precioTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const whatsappMessage = () => {
    const productDetails = cartItems.map((item) =>
      `*${item.name}* (Cantidad: ${item.quantity}) - $${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');

    return `Hola 🧡 Ya encontré los hairclips que van perfecto conmigo. 
Aquí están los detalles de mi carrito, ¿me confirmas mi pedido? 🌸\n\n${productDetails}\n\nTotal: $${precioTotal.toLocaleString()}`;
  };

  const whatsappLink = `https://wa.me/573016980292?text=${encodeURIComponent(whatsappMessage())}`;

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
