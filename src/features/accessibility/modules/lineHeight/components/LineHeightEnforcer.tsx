"use client";

import { useEffect } from "react";
import { useAccessibility } from "../../../context/AccessibilityContext";
import { LINE_HEIGHT_CONFIG } from "../types/lineHeight.types";

export default function LineHeightEnforcer() {
  const { settings } = useAccessibility();
  const lineHeight = settings.lineHeight ?? LINE_HEIGHT_CONFIG.DEFAULT;

  useEffect(() => {
    const clampedLineHeight = Math.max(
      LINE_HEIGHT_CONFIG.MIN,
      Math.min(LINE_HEIGHT_CONFIG.MAX, lineHeight),
    );
    document.documentElement.style.setProperty(
      "--line-height",
      String(clampedLineHeight),
    );
  }, [lineHeight]);

  return null;
}
