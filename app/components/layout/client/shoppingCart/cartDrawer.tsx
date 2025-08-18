import { Dialog, DialogPanel, TransitionChild } from '@headlessui/react';
import { fadeTransition, slideFromRight } from '@/app/styles/transitions';
import CartHeader from './cartHeader';
import CartItemList from './cartItemList';
import CartFooter from './cartFooter';
import { cartItem } from '@/app/context/shoppingCartContext';

interface cartDrawerProps {
  cartItems: cartItem[];
  precioTotal: number;
  whatsappLink: string;
  updateQuantity: (id: string, quantity: number) => void;
  toggleCart: () => void;
}

const CartDrawer = ({ cartItems, precioTotal, whatsappLink, updateQuantity, toggleCart}: cartDrawerProps) => {
  return (
    <Dialog as="div" className="relative z-50" onClose={toggleCart}>
      <TransitionChild as="div" {...fadeTransition}>
        <div className="fixed inset-0 bg-black/30" />
      </TransitionChild>

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden ">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <TransitionChild as="div" {...slideFromRight}>
              <DialogPanel className="pointer-events-auto w-screen max-w-80 md:max-w-90 h-full border-1 border-gray-200">
                <div className="flex h-full flex-col bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto">
                    <CartHeader toggleCart={toggleCart} />
                    <CartItemList items={cartItems} updateQuantity={updateQuantity} toggleCart={toggleCart}/>
                  </div>
                  {cartItems.length > 0 && (
                    <CartFooter
                      precioTotal={precioTotal}
                      whatsappLink={whatsappLink}
                      toggleCart={toggleCart}
                    />
                  )}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default CartDrawer;