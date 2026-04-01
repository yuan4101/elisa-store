// src/app/maintenance/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "En mantenimiento",
  description: "Estamos realizando actualizaciones. Vuelve pronto.",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <div className="min-h-dvh flex flex-col items-start justify-center px-6 py-24 max-w-xl mx-auto w-full">
      {/* Badge */}
      <div
        className="inline-flex items-center gap-2 mb-8 px-3.5 py-1.5 rounded-full text-sm font-medium"
        style={{ background: "#ffd7e4cb", color: "var(--color-text)" }}
      >
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{
            background: "var(--color-navbar-bg)",
            animation: "pulse 2s ease-in-out infinite",
          }}
          aria-hidden="true"
        />
        Mantenimiento en curso
      </div>

      {/* Título */}
      <h1
        className="text-5xl font-bold leading-[1.1] tracking-tight mb-5"
        style={{ color: "var(--color-text)", fontFamily: "var(--font-inter)" }}
      >
        Volvemos
        <br />
        muy pronto.
      </h1>

      {/* Descripción */}
      <p
        className="text-base leading-relaxed mb-10 max-w-[44ch]"
        style={{ color: "var(--color-text)", opacity: 0.65 }}
      >
        Estamos realizando actualizaciones en la plataforma. El servicio estará
        disponible pronto.
      </p>

      {/* Divisor */}
      <div
        className="w-full h-px mb-8"
        style={{ background: "oklch(from var(--color-text) l c h / 0.12)" }}
        aria-hidden="true"
      />

      {/* Meta info */}
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        <span
          className="flex items-center gap-2 text-sm"
          style={{ color: "var(--color-text)", opacity: 0.45 }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9.5" />
            <path
              d="M12 7v5l3 3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Duración estimada:
        </span>

        <span
          className="flex items-center gap-2 text-sm"
          style={{ color: "var(--color-text)", opacity: 0.45 }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            aria-hidden="true"
          >
            <ellipse cx="12" cy="5" rx="8" ry="2.5" />
            <path
              d="M4 5v5c0 1.38 3.58 2.5 8 2.5s8-1.12 8-2.5V5"
              strokeLinecap="round"
            />
            <path
              d="M4 10v5c0 1.38 3.58 2.5 8 2.5s8-1.12 8-2.5v-5"
              strokeLinecap="round"
            />
          </svg>
          Actualización
        </span>
      </div>

      {/* Animación del punto — solo añade el keyframe que ya NO tienes en global.css */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.45; transform: scale(0.8); }
        }
        @media (prefers-reduced-motion: reduce) {
          [aria-hidden="true"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
