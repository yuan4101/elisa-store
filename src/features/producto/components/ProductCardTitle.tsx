interface ProductCardTitleProps {
  name: string;
  size?: string;
}

export function ProductCardTitle({
  name,
  size = "base",
}: ProductCardTitleProps) {
  return (
    <h2
      className={`pt-1 h-full text-${size} font-normal text-[var(--color-text)] group-hover:text-[var(--color-navbar-bg)] text-left break-words line-clamp-3`}
    >
      {name}
    </h2>
  );
}
