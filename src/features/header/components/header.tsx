import Logo from "./logo";
import HeaderContent from "./headerContent";

export default function Header() {
  return (
    <header className="sticky bg-(--color-bg) top-0 z-60 shadow-md">
      <Logo />
      <HeaderContent />
    </header>
  );
}
