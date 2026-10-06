import { ComponentType } from "react";

export interface AccessibilityModule {
  id: string;
  label: string;
  description?: string;
  component: ComponentType;
  enforcer?: ComponentType;
}

export interface AccessibilitySettings {
  fontScale?: number;
  lineHeight?: number;
  letterSpacing?: number;
  grayscale?: boolean;
  highContrast?: boolean;
}
