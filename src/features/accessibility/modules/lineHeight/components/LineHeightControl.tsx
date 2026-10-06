"use client";

import { useAccessibility } from "../../../context/AccessibilityContext";

import { LINE_HEIGHT_CONFIG } from "../types/lineHeight.types";

export default function LineHeightControl() {
  const { settings, updateSettings } = useAccessibility();
  const lineHeight = settings.lineHeight ?? LINE_HEIGHT_CONFIG.DEFAULT;

  const handleLineHeightChange = (newHeight: number) => {
    updateSettings({
      ...settings,
      lineHeight: newHeight,
    });
  };

  return (
    <div>
      <label
        htmlFor="line-height-input"
        className="block text-[18px] font-medium mb-2"
        style={{ color: "var(--color-text)" }}
      >
        Interlineado
      </label>
      <div className="flex items-center gap-3">
        <span
          className="text-[16px] opacity-70 font-mono"
          style={
            {
              color: "var(--color-text)",
              "--letter-spacing": "-0.1em",
            } as React.CSSProperties
          }
        >
          1.2x
        </span>
        <input
          id="line-height-input"
          type="range"
          min={LINE_HEIGHT_CONFIG.MIN}
          max={LINE_HEIGHT_CONFIG.MAX}
          step={LINE_HEIGHT_CONFIG.STEP}
          value={lineHeight}
          onChange={(e) =>
            handleLineHeightChange(Number.parseFloat(e.currentTarget.value))
          }
          className="flex-1 cursor-pointer"
          style={{ accentColor: "var(--color-badge)" }}
          aria-label="Ajustar interlineado"
          aria-valuemin={LINE_HEIGHT_CONFIG.MIN}
          aria-valuemax={LINE_HEIGHT_CONFIG.MAX}
          aria-valuenow={lineHeight}
        />
        <span
          className="text-[20px] opacity-70 font-mono"
          style={
            {
              color: "var(--color-text)",
              "--letter-spacing": "-0.1em",
            } as React.CSSProperties
          }
        >
          1.5x
        </span>
      </div>
      <p
        className="text-[16px] mt-2 opacity-70"
        style={{ color: "var(--color-text)" }}
      >
        Espaciado de línea: {lineHeight.toFixed(1)}x
      </p>
    </div>
  );
}
