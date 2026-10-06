export interface FontScalerSettings {
  fontScale: number;
}

export const FONT_SCALE_CONFIG = {
  MIN: 0.9,
  MAX: 2,
  DEFAULT: 1,
  STEP: 0.1,
} as const;
