import { motion, AnimatePresence } from "framer-motion";
import CartHeader from "./CartHeader";
import CartItemList from "./CartItemList";
import CartFooter from "./CartFooter";
import { CartItem } from "../context/ShoppingCartContext";
import { useEffect } from "react";

interface cartDrawerProps {
  isOpen: boolean;
  cartItems: CartItem[];
  precioTotal: number;
  whatsappLink: string;
  updateQuantity: (id: string, quantity: number) => void;
  toggleCart: () => void;
  clearCart: () => void;
}

const CartDrawer = ({
  isOpen,
  cartItems,
  precioTotal,
  whatsappLink,
  updateQuantity,
  toggleCart,
  clearCart,
}: cartDrawerProps) => {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[101] overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30"
            onClick={toggleCart}
            aria-hidden="true"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-y-0 right-0 flex w-screen md:w-[calc(450px*(1+(var(--font-scale,1)-1)*0.45))] max-w-[100vw] h-full shadow-2xl pointer-events-auto border-l border-gray-200"
          >
            <div className="flex h-full w-full flex-col bg-white">
              <div className="flex-1 overflow-y-auto">
                <CartHeader toggleCart={toggleCart} />
                <CartItemList
                  items={cartItems}
                  updateQuantity={updateQuantity}
                  toggleCart={toggleCart}
                />
              </div>
              {cartItems.length > 0 && (
                <CartFooter
                  precioTotal={precioTotal}
                  whatsappLink={whatsappLink}
                  toggleCart={toggleCart}
                  clearCart={clearCart}
                />
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
