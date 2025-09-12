import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-bg)] p-6 mt-auto">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="font-bold">
            <h3>Elisa&CO Hairclips</h3>
          </div>
          <div className="text-lg px-2 hidden md:block">|</div>
          <div className="">
            <Link href="/contacto">Contacto</Link>
          </div>
          <div className="text-lg px-2 hidden md:block">|</div>
          <div className="mb-4 md:mb-0">
            <p>© {new Date().getFullYear()} All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
}