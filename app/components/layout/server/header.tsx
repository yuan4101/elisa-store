import Logo from './logo';
import HeaderContent from './headerContent';

export default function Header() {
  return (
    <header className="sticky bg-[var(--color-bg)] top-0 z-50 shadow-md pt-3">
      <Logo />
      <HeaderContent />
    </header>
  );
}