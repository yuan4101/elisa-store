import Image from "next/image";

interface AboutSectionProps {
  content: string[];
}

export default function AboutSection({ content }: AboutSectionProps) {
  return (
    <div className="py-2 lg:py-2">
      <div className="flex flex-col md:flex-row md:items-center gap-10">
        <div>
          <div className="flex flex-row justify-center pb-3">
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
        <div className="relative md:h-[600px] md:w-[1800px] h-[400px] pt-6 flex justify-end">
          <Image
            src={'/about.webp'}
            alt="About us"
            width={400}
            height={600}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}