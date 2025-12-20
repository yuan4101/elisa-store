import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <div className="pb-2 pt-2 md:pt-3 h-[76px] md:h-[100px]">
      <div className="flex justify-center h-full">
        <Link href="/" className="relative block h-full">
          <Image
            src="/elisalogoweb.webp"
            alt="Logo Elisa & Co"
            unoptimized
            width={800}
            height={170}
            priority={true}
            className="object-contain h-full w-auto"
          />
        </Link>
      </div>
    </div>
  );
}
