"use client";

import { useAccessibility } from "../../../context/AccessibilityContext";

import { useSliderPointerEvents } from "../../../hooks/useSliderPointerEvents";
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

  const { value: localLineHeight, pointerProps } = useSliderPointerEvents(
    lineHeight,
    LINE_HEIGHT_CONFIG.MIN,
    LINE_HEIGHT_CONFIG.MAX,
    LINE_HEIGHT_CONFIG.STEP,
    handleLineHeightChange
  );

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
          {...pointerProps}
          id="line-height-input"
          type="range"
          min={LINE_HEIGHT_CONFIG.MIN}
          max={LINE_HEIGHT_CONFIG.MAX}
          step={LINE_HEIGHT_CONFIG.STEP}
          value={localLineHeight}
          className="flex-1 cursor-pointer a11y-slider"
          style={{ 
            ...pointerProps.style,
            accentColor: "var(--color-badge)",
            "--slider-perc": `${((localLineHeight - LINE_HEIGHT_CONFIG.MIN) / (LINE_HEIGHT_CONFIG.MAX - LINE_HEIGHT_CONFIG.MIN)) * 100}%`
          } as React.CSSProperties}
          aria-label="Ajustar interlineado"
          aria-valuemin={LINE_HEIGHT_CONFIG.MIN}
          aria-valuemax={LINE_HEIGHT_CONFIG.MAX}
          aria-valuenow={localLineHeight}
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
        Espaciado de línea: {localLineHeight.toFixed(1)}x
      </p>
    </div>
  );
}
