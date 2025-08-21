import Image from "next/image";

interface AboutSectionProps {
  title: string;
  content: string[];
}

export default function AboutSection({ title, content }: AboutSectionProps) {
  return (
    <div className="py-2 lg:py-2">
      <div className="flex flex-col md:flex-row md:items-center gap-10">
        <div>
          <h2 className="text-2xl pb-6">{title}</h2>
          <div className="justify-left text-lg space-y-4">
            {content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
        
        <div className="relative aspect-square md:h-[400px] h-[300px]">
          <Image
            src={'/about.webp'}
            alt="About us"
            //width={500}
            //height={500}
            fill
            className="object-contain"
            //className="object-cover rounded-t-2xl shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}