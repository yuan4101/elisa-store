interface BadgeProps {
  count: number;
  classname?: string;
}

const defaultClasses =
  "absolute -top-1 md:-top-3 -right-2 md:-right-4 bg-[var(--color-badge)] text-[var(--color-navbar-text)] text-xs md:text-lg font-bold rounded-sm h-4 w-4 md:h-6 md:w-6 flex items-center justify-center";

export function Badge({ count, classname }: BadgeProps) {
  return <span className={classname || defaultClasses}>{count}</span>;
}
