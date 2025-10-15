interface ProductCardTitleProps {
  name: string;
}

export function ProductCardTitle({ name }: ProductCardTitleProps) {
  return (
    <div className="pt-2 px-4">
      <h2 className="text-md font-normal text-[var(--color-text)] group-hover:text-[var(--color-navbar-bg)] text-left">
        {name}
      </h2>
    </div>
  );
}
