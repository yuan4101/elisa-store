"use client";

import { useAccessibility } from "../../../context/AccessibilityContext";

import { FONT_SCALE_CONFIG } from "../types/fontScaler.types";

export default function FontScalerControl() {
  const { settings, updateSettings } = useAccessibility();
  const fontScale = settings.fontScale ?? FONT_SCALE_CONFIG.DEFAULT;


  const handleFontScaleChange = (newScale: number) => {
    updateSettings({
      ...settings,
      fontScale: newScale,
    });
  };

  return (
    <div>
      <label
        htmlFor="font-scale-input"
        className="block text-[18px] font-medium mb-2"
        style={{ color: "var(--color-text)" }}
      >
        Escala global
      </label>
      <div className="flex items-center gap-3">
        <span className="text-[16px] opacity-70" style={{ color: "var(--color-text)" }}>A</span>
        <input
          id="font-scale-input"
          type="range"
          min={FONT_SCALE_CONFIG.MIN}
          max={FONT_SCALE_CONFIG.MAX}
          step={FONT_SCALE_CONFIG.STEP}
          value={fontScale}
          onChange={(e) =>
            handleFontScaleChange(Number.parseFloat(e.currentTarget.value))
          }
          className="flex-1 cursor-pointer"
          style={{ accentColor: "var(--color-badge)" }}
          aria-label="Ajustar tamaño de letra"
          aria-valuemin={FONT_SCALE_CONFIG.MIN}
          aria-valuemax={FONT_SCALE_CONFIG.MAX}
          aria-valuenow={fontScale}
        />
        <span className="text-[28px] opacity-70" style={{ color: "var(--color-text)" }}>A</span>
      </div>
      <p className="text-[16px] mt-2 opacity-70" style={{ color: "var(--color-text)" }}>
        Escala: {(fontScale * 100).toFixed(0)}%
      </p>
    </div>
  );
}
