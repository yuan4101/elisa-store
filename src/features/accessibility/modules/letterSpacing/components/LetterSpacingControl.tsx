"use client";

import { useAccessibility } from "../../../context/AccessibilityContext";
import { LETTER_SPACING_CONFIG } from "../types/letterSpacing.types";

export default function LetterSpacingControl() {
  const { settings, updateSettings } = useAccessibility();
  const letterSpacing = settings.letterSpacing ?? LETTER_SPACING_CONFIG.DEFAULT;

  const handleLetterSpacingChange = (newSpacing: number) => {
    updateSettings({
      ...settings,
      letterSpacing: newSpacing,
    });
  };

  return (
    <div>
      <label
        htmlFor="letter-spacing-input"
        className="block text-[18px] font-medium mb-2"
        style={{ color: "var(--color-text)" }}
      >
        Espaciado de letras
      </label>
      <div className="flex items-center gap-3">
        <span
          className="text-[16px] opacity-70 font-mono tracking-tight"
          style={
            {
              color: "var(--color-text)",
              "--letter-spacing": "-0.02em",
            } as React.CSSProperties
          }
        >
          AA
        </span>
        <input
          id="letter-spacing-input"
          type="range"
          min={LETTER_SPACING_CONFIG.MIN}
          max={LETTER_SPACING_CONFIG.MAX}
          step={LETTER_SPACING_CONFIG.STEP}
          value={letterSpacing}
          onChange={(e) =>
            handleLetterSpacingChange(Number.parseFloat(e.currentTarget.value))
          }
          className="flex-1 cursor-pointer"
          style={{ accentColor: "var(--color-badge)" }}
          aria-label="Ajustar espaciado de letras"
          aria-valuemin={LETTER_SPACING_CONFIG.MIN}
          aria-valuemax={LETTER_SPACING_CONFIG.MAX}
          aria-valuenow={letterSpacing}
        />
        <span
          className="text-[20px] opacity-70 font-mono"
          style={
            {
              color: "var(--color-text)",
              "--letter-spacing": "0.8em",
              marginRight: "-0.8em",
            } as React.CSSProperties
          }
        >
          AA
        </span>
      </div>
      <p
        className="text-[16px] mt-2 opacity-70"
        style={{ color: "var(--color-text)" }}
      >
        Espaciado: +{(letterSpacing * 100).toFixed(0)}%
      </p>
    </div>
  );
}
