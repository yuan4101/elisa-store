import { XMarkIcon } from '@heroicons/react/24/outline';

const CartHeader = ({toggleCart}: {toggleCart: () => void}) => {
  return (
    <div className="sticky top-0 bg-white z-10 pt-2 px-4 border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between pb-2">
        <div className='text-lg font-medium text-[var(--color-navbar-bg)]'>
          Carrito de compras
        </div>
        <button
          className="p-2 text-gray-500 hover:text-gray-700"
          onClick={toggleCart}
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CartHeader;