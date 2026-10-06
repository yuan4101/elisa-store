"use client";

import { useEffect } from "react";
import { useAccessibility } from "../../../context/AccessibilityContext";
import { FONT_SCALE_CONFIG } from "../types/fontScaler.types";

export default function FontScalerEnforcer() {
  const { settings } = useAccessibility();
  const fontScale = settings.fontScale ?? FONT_SCALE_CONFIG.DEFAULT;

  useEffect(() => {
    const clampedScale = Math.max(
      FONT_SCALE_CONFIG.MIN,
      Math.min(FONT_SCALE_CONFIG.MAX, fontScale),
    );
    document.documentElement.style.setProperty(
      "--font-scale",
      String(clampedScale),
    );

    let mobileCols = 2;
    let tabletCols = 3;
    let desktopCols = 5;

    if (clampedScale >= 1.6) {
      mobileCols = 1;
      tabletCols = 2;
      desktopCols = 3;
    } else if (clampedScale >= 1.3) {
      mobileCols = 2;
      tabletCols = 2;
      desktopCols = 4;
    }

    document.documentElement.style.setProperty("--catalog-cols-mobile", String(mobileCols));
    document.documentElement.style.setProperty("--catalog-cols-tablet", String(tabletCols));
    document.documentElement.style.setProperty("--catalog-cols-desktop", String(desktopCols));
  }, [fontScale]);

  return null;
}
