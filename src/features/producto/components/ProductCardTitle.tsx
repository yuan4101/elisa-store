interface ProductCardTitleProps {
  name: string;
  size?: string;
}

export function ProductCardTitle({ name, size = "md" }: ProductCardTitleProps) {
  return (
    <h2
      className={`h-full text-${size} font-normal text-[var(--color-text)] group-hover:text-[var(--color-navbar-bg)] text-left`}
    >
      {name}
    </h2>
  );
}
