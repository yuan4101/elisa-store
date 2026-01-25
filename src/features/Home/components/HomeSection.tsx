// app/page.tsx
import {
  SparklesIcon,
  ShieldCheckIcon,
  HeartIcon,
  PaintBrushIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";

export default function HomeSection() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 py-16 md:py-24 bg-gradient-to-b from-white to-[#f9f9f9]">
        <div className="max-w-6xl mx-auto text-center">
          <h1
            className="text-4xl md:text-6xl font-medium italic mb-6"
            style={{ color: "var(--color-text)" }}
          >
            Belleza Natural, Cuidado Sostenible
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-4 font-light">
            Descubre nuestros accesorios para el cabello hechos en{" "}
            <strong>acetato de celulosa</strong>, un material excepcional que
            combina elegancia, durabilidad y responsabilidad ambiental.
          </p>
          <div className="glow-effect"></div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-center mb-12">
            ¿Por qué elegir acetato de celulosa?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Benefit 1 */}
            <div className="text-center p-6 rounded-lg bg-[var(--color-card-bg)] animate-fade-in-slide">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--color-button-pink)" }}
              >
                <SparklesIcon className="w-8 h-8 text-white" />
              </div>
              <h3
                className="text-xl font-medium mb-3"
                style={{ color: "var(--color-text)" }}
              >
                Ecológico y Biodegradable
              </h3>
              <p className="font-light text-sm leading-relaxed">
                Fabricado a partir de recursos 100% naturales como madera y
                algodón, no del petróleo. Es biodegradable bajo condiciones
                adecuadas, reduciendo tu huella ambiental.
              </p>
            </div>

            {/* Benefit 2 */}
            <div
              className="text-center p-6 rounded-lg bg-[var(--color-card-bg)] animate-fade-in-slide"
              style={{ animationDelay: "0.1s" }}
            >
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--color-badge)" }}
              >
                <ShieldCheckIcon className="w-8 h-8 text-white" />
              </div>
              <h3
                className="text-xl font-medium mb-3"
                style={{ color: "var(--color-text)" }}
              >
                Duradero y Resistente
              </h3>
              <p className="font-light text-sm leading-relaxed">
                Resistente a golpes, arañazos y la intemperie. Su flexibilidad
                natural evita roturas, garantizando accesorios que duran años
                sin perder su forma ni brillo.
              </p>
            </div>

            {/* Benefit 3 */}
            <div
              className="text-center p-6 rounded-lg bg-[var(--color-card-bg)] animate-fade-in-slide"
              style={{ animationDelay: "0.2s" }}
            >
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--color-navbar-bg)" }}
              >
                <HeartIcon className="w-8 h-8 text-white" />
              </div>
              <h3
                className="text-xl font-medium mb-3"
                style={{ color: "var(--color-text)" }}
              >
                Gentil con tu Cabello
              </h3>
              <p className="font-light text-sm leading-relaxed">
                Superficie suave y pulida que no enreda ni rompe el cabello.
                Reduce la estática y el frizz, manteniéndolo saludable. Se
                amolda a la forma de tu cabeza sin causar dolor.
              </p>
            </div>
          </div>

          {/* Additional Benefits */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex items-start gap-4 p-4">
              <div className="flex-shrink-0">
                <PaintBrushIcon
                  className="w-7 h-7"
                  style={{ color: "var(--color-badge)" }}
                />
              </div>
              <div>
                <h4
                  className="font-medium mb-1"
                  style={{ color: "var(--color-text)" }}
                >
                  Colores Vibrantes y Duraderos
                </h4>
                <p className="text-sm font-light">
                  Los tintes se integran profundamente, creando tonos ricos que
                  no se desvanecen con el tiempo.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4">
              <div className="flex-shrink-0">
                <ScaleIcon
                  className="w-7 h-7"
                  style={{ color: "var(--color-badge)" }}
                />
              </div>
              <div>
                <h4
                  className="font-medium mb-1"
                  style={{ color: "var(--color-text)" }}
                >
                  Ligero y Cómodo
                </h4>
                <p className="text-sm font-light">
                  Ideal para uso diario sin sentir peso o molestia durante todo
                  el día.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Buttons Section */}
      <section className="px-6 py-20 bg-gradient-to-b from-[#f9f9f9] to-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-center mb-4">
            Explora Nuestra Colección
          </h2>
          <p className="text-center mb-12 font-light text-lg">
            Encuentra el accesorio perfecto para tu estilo
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* All Products Button */}
            <a
              href="/catalogo"
              className="group relative overflow-hidden rounded-2xl p-10 md:p-12 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{ backgroundColor: "var(--color-button-pink)" }}
            >
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-medium mb-3 text-white">
                  Todo el Catálogo
                </h3>
                <p className="text-white/90 text-sm font-light mb-6">
                  Explora toda nuestra colección de accesorios
                </p>
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 rounded-full text-white text-sm font-normal backdrop-blur-sm transition-all group-hover:bg-white/30">
                  Ver Todo
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>

            {/* Hairclips Button */}
            <a
              href="/catalogo/hairclips"
              className="group relative overflow-hidden rounded-2xl p-10 md:p-12 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{ backgroundColor: "var(--color-navbar-bg)" }}
            >
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-medium mb-3 text-white">
                  Hairclips
                </h3>
                <p className="text-white/90 text-sm font-light mb-6">
                  Ganchos elegantes y versátiles para cada ocasión
                </p>
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 rounded-full text-white text-sm font-normal backdrop-blur-sm transition-all group-hover:bg-white/30">
                  Descubrir
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>

            {/* Combs Button */}
            <a
              href="/catalogo/peinetas"
              className="group relative overflow-hidden rounded-2xl p-10 md:p-12 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{ backgroundColor: "var(--color-badge)" }}
            >
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-medium mb-3 text-white">
                  Peinetas
                </h3>
                <p className="text-white/90 text-sm font-light mb-6">
                  Peinetas artesanales de calidad excepcional
                </p>
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 rounded-full text-white text-sm font-normal backdrop-blur-sm transition-all group-hover:bg-white/30">
                  Explorar
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
