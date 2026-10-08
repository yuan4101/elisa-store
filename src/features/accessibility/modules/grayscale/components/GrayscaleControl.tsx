"use client";

import { useAccessibility } from "../../../context/AccessibilityContext";

export default function GrayscaleControl() {
  const { settings, updateSettings } = useAccessibility();
  const isGrayscale = settings.grayscale ?? false;

  const toggleGrayscale = () => {
    updateSettings({
      ...settings,
      grayscale: !isGrayscale,
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <label
          htmlFor="grayscale-toggle"
          className="block text-[18px] font-medium"
          style={{ color: "var(--color-text)" }}
        >
          Escala de grises
        </label>
        <p className="text-[14px] mt-1 opacity-70" style={{ color: "var(--color-text)" }}>
          Elimina los colores de la pantalla
        </p>
      </div>
      <button
        id="grayscale-toggle"
        role="switch"
        aria-checked={isGrayscale}
        onClick={toggleGrayscale}
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-badge)] ${
          isGrayscale ? "bg-[var(--color-badge)]" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
            isGrayscale ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
