import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <div className="pb-2">
      <div className="flex justify-center h-[70px]">
        <Link href="/catalogo" className="relative block w-full h-full">
          <Image
            src="/elisalogoweb.webp"
            alt="Logo Elisa & Co"
            fill
            priority={true}
            className="object-contain"
          />
        </Link>
      </div>
    </div>
  );
}