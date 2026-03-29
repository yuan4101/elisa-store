import Image from "next/image";

interface HeroTitleProps {
  className?: string;
}

export default function HeroTitle({ className }: HeroTitleProps) {
  return (
    <Image
      src="/assets/home/Hero-Title.svg"
      width={638}
      height={236}
      className={`rounded-4xl w-full h-auto object-contain relative z-10 ${className || ""}`}
      alt="Que tu cabello hable por ti"
      priority
    />
  );
}
