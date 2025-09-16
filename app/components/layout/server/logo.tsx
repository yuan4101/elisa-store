import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <div className="pb-2">
      <div className="flex justify-center">
        <Link href="/" className="relative block">
          <Image
            src="/elisalogoweb.webp"
            alt="Logo Elisa & Co"
            width={800}
            height={170}
            priority={true}
            className="object-contain h-[70px] w-auto"
          />
        </Link>
      </div>
    </div>
  );
}