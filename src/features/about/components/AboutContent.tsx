"use client";
import { useImageLoader } from "../hooks/useImageLoader";
import { AboutTitle } from "@/components/ui/about/AboutTitle";
import AboutImage from "@/components/ui/about/AboutImage";

interface AboutContentProps {
  content: string[];
}

export default function AboutContent({ content }: AboutContentProps) {
  const { isImageLoaded, handleImageLoad } = useImageLoader();

  return (
    <div className="pb-8 py-2 md:pt-5">
      <div className="flex flex-col lg:flex-row md:items-start gap-7">
        <div className="flex flex-col items-center gap-3 md:w-[60%] px-4">
          <AboutTitle />
          <div className="text-lg space-y-4">
            {content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="relative flex-1">
          <AboutImage onLoad={handleImageLoad} />
          {isImageLoaded && <div className="glow-effect" />}
        </div>
      </div>
    </div>
  );
}
