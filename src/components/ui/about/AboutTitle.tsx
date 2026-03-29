import Image from "next/image";

interface AboutTitleProps {
  className?: string;
}

export function AboutTitle({ className }: AboutTitleProps) {
  return (
    <Image
      src="/assets/about/About-Title.svg"
      width={638}
      height={236}
      className={`w-full max-w-[290px] md:max-w-[360px] h-auto ${className || ""}`}
      alt="¿Quienes somos?"
      priority
    />
  );
}
