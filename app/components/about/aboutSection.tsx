import Image from "next/image";

interface AboutSectionProps {
  content: string[];
}

export default function AboutSection({ content }: AboutSectionProps) {
  return (
    <div className="py-2 md:pt-5">
      <div className="flex flex-col md:flex-row md:items-start gap-30">
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
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-32 blur-xl -z-10"
            style={{background: `linear-gradient(to top, var(--color-gradient-about, #3b82f6), transparent)`}}/>
        </div>
      </div>
    </div>
  );
}