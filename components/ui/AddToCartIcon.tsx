interface AddToCartIconProps {
  quantity?: number;
}

export function AddToCartIcon({ quantity = 0 }: AddToCartIconProps) {
  return (
    <div className="relative">
      {quantity > 0 && (
        <span className="absolute -top-2 -right-2 bg-[var(--color-badge)] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {quantity}
        </span>
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-[var(--color-navbar-bg)]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    </div>
  );
}
