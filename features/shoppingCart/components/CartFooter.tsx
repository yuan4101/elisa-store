interface cartFooterProps {
  precioTotal: number;
  whatsappLink: string;
  toggleCart: () => void;
  clearCart: () => void;
}

const CartFooter = ({
  precioTotal,
  whatsappLink,
  clearCart,
}: cartFooterProps) => {
  const shadowTop = "shadow-[0_-2px_6px_0_rgba(0,0,0,0.1)]";
  return (
    <div
      className={`${shadowTop} border-t border-gray-200 px-4 pt-3 pb-4 sm:px-6`}
    >
      <div className="flex justify-between text-base font-medium text-[var(--color-text)]">
        <p>Total</p>
        <p>${precioTotal.toLocaleString()}</p>
      </div>
      <div className="mt-3">
        <a
          href={whatsappLink}
          className="flex items-center justify-center rounded-md border border-transparent bg-[var(--color-badge)] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[var(--color-badge)]"
        >
          Ordenar
        </a>
      </div>
      <div className="mt-4 mb-1 flex justify-center text-center text-md text-gray-500">
        <button
          type="button"
          className="font-medium text-[var(--color-navbar-bg)] hover:text-[var(--color-badge)]"
          onClick={clearCart}
        >
          Limpiar carrito
        </button>
      </div>
    </div>
  );
};

export default CartFooter;
