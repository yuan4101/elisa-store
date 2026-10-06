"use client";

import { useEffect } from "react";
import { useAccessibility } from "../../../context/AccessibilityContext";
import { LETTER_SPACING_CONFIG } from "../types/letterSpacing.types";

export default function LetterSpacingEnforcer() {
  const { settings } = useAccessibility();
  const letterSpacing = settings.letterSpacing ?? LETTER_SPACING_CONFIG.DEFAULT;

  useEffect(() => {
    const clampedLetterSpacing = Math.max(
      LETTER_SPACING_CONFIG.MIN,
      Math.min(LETTER_SPACING_CONFIG.MAX, letterSpacing),
    );
    document.documentElement.style.setProperty(
      "--letter-spacing",
      `${clampedLetterSpacing}em`,
    );
  }, [letterSpacing]);

  return null;
}
