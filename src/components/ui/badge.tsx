interface BadgeProps {
  count: number;
  className?: string;
}

const defaultClasses =
  "absolute -top-1 md:-top-3 -right-2 md:-right-4 bg-[var(--color-badge)] text-[var(--color-navbar-text)] text-[12px] md:text-[18px] font-bold rounded-sm h-4 w-4 md:h-6 md:w-6 flex items-center justify-center";

export function Badge({ count, className }: BadgeProps) {
  return <span className={className || defaultClasses}>{count}</span>;
}
