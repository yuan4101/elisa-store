// app/page.tsx
// import {
//   SparklesIcon,
//   ShieldCheckIcon,
//   HeartIcon,
//   PaintBrushIcon,
//   ScaleIcon,
// } from "@heroicons/react/24/outline";
import { FavoriteProductsSection } from "./FavoriteProductsSection";
import { FavoritesTitle } from "@/components/ui/home/FavoritesTitle";
import HeroTitle from "@/components/ui/home/HeroTitle";

export default function HomeSection() {
  return (
    <main className="min-h-screen w-full pb-4 md:px-40">
      {/* Hero Section */}
      <section className="p-4 flex justify-center">
        <div className="py-2 px-6 rounded-4xl w-fit flex flex-col items-center">
          <div className="h-30 md:h-44 flex justify-center">
            <HeroTitle />
          </div>
          <p className="text-center text-lg md:text-xl max-w-3xl mx-auto mb-4 font-light">
            Hairclips, hairclaws, accesorios y complementos con personalidad
            para acompañar tu mood.
            <br />
            Diseñados con materiales amigables con el medio ambiente.
          </p>
        </div>
      </section>

      {/* Favorites */}
      <section className="w-full md:p-4">
        <div className="flex justify-center h-25 md:h-36">
          <FavoritesTitle className="relative z-50 " />
        </div>
        <div className="pt-2">
          <FavoriteProductsSection />
        </div>
      </section>
    </main>
  );
}
