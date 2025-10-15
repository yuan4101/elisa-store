const Badge = ({ count }: { count: number }) => {
  return (
    <span className="absolute -top-2 -right-3 bg-[var(--color-badge)] text-[var(--color-navbar-text)] text-xs rounded-full h-5 w-5 flex items-center justify-center">
      {count}
    </span>
  );
};

export default Badge;
