"use client";
import Image from "next/image";
import { useImageLoader } from "../hooks/useImageLoader";
import { AboutTitle } from "@/components/ui/AboutTitle";

interface AboutSectionProps {
  content: string[];
}

export default function AboutSection({ content }: AboutSectionProps) {
  const { isImageLoaded, handleImageLoad } = useImageLoader();

  return (
    <div className="pb-8 py-2 md:pt-5">
      <div className="flex flex-col lg:flex-row md:items-start gap-7 lg:gap-30">
        <div className="flex flex-col items-center gap-3">
          <AboutTitle />
          <div className="text-lg space-y-4">
            {content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="relative">
          <Image
            src={"/about.webp"}
            alt="About us"
            width={990}
            height={1400}
            priority={true}
            onLoad={handleImageLoad}
            className="object-contain max-h-[1000px] w-[1600px] relative z-10"
          />
          {isImageLoaded && <div className="glow-effect" />}
        </div>
      </div>
    </div>
  );
}
