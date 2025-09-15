import Image from "next/image";

interface AboutSectionProps {
  content: string[];
}

export default function AboutSection({ content }: AboutSectionProps) {
  return (
    <div className="pb-8 py-2 md:pt-5">
      <div className="flex flex-col md:flex-row md:items-start gap-7 md:gap-30">
        <div className="flex flex-col items-center gap-3">
          <div>
            <Image
              src={'/aboutTitle.webp'}
              alt="About Title"
              width={350}
              height={130}
              className="object-contain"
            />
          </div>
          <div className="text-lg space-y-4">
            {content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="relative">
          <Image
            src={'/about.webp'}
            alt="About us"
            width={1600}
            height={500}
            className="object-contain relative z-10"
          />
          <div className="glow-effect"/>
        </div>
      </div>
    </div>
  );
}