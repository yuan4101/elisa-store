import Image from "next/image";

interface AboutImageProps {
  onLoad: () => void;
  className?: string;
}

export default function AboutImage({ className, onLoad }: AboutImageProps) {
  return (
    <Image
      src="/assets/about/About-Image.webp"
      width={990}
      height={1400}
      className={`rounded-4xl w-full h-auto object-contain relative z-10 ${className || ""}`}
      alt="Elisa's CEO"
      onLoad={onLoad}
      priority
    />
  );
}
