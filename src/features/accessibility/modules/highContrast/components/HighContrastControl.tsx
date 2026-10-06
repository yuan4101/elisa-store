"use client";

import { useAccessibility } from "../../../context/AccessibilityContext";

export default function HighContrastControl() {
  const { settings, updateSettings } = useAccessibility();
  const isHighContrast = settings.highContrast ?? false;

  const toggleHighContrast = () => {
    updateSettings({
      ...settings,
      highContrast: !isHighContrast,
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <label
          htmlFor="high-contrast-toggle"
          className="block text-[18px] font-medium"
          style={{ color: "var(--color-text)" }}
        >
          Alto contraste
        </label>
        <p className="text-[14px] mt-1 opacity-70" style={{ color: "var(--color-text)" }}>
          Maximiza la claridad de los textos y fondos
        </p>
      </div>
      <button
        id="high-contrast-toggle"
        role="switch"
        aria-checked={isHighContrast}
        onClick={toggleHighContrast}
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          isHighContrast ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
            isHighContrast ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
