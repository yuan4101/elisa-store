import FontScalerControl from "../modules/fontScaler/components/FontScalerControl";
import FontScalerEnforcer from "../modules/fontScaler/components/FontScalerEnforcer";
import LineHeightControl from "../modules/lineHeight/components/LineHeightControl";
import LineHeightEnforcer from "../modules/lineHeight/components/LineHeightEnforcer";
import LetterSpacingControl from "../modules/letterSpacing/components/LetterSpacingControl";
import LetterSpacingEnforcer from "../modules/letterSpacing/components/LetterSpacingEnforcer";
import GrayscaleControl from "../modules/grayscale/components/GrayscaleControl";
import GrayscaleEnforcer from "../modules/grayscale/components/GrayscaleEnforcer";
import HighContrastControl from "../modules/highContrast/components/HighContrastControl";
import HighContrastEnforcer from "../modules/highContrast/components/HighContrastEnforcer";
import { AccessibilityModule } from "../types/accessibility.types";

const fontScalerModule: AccessibilityModule = {
  id: "fontScaler",
  label: "Escala global",
  description: "Ajusta el tamaño de la tipografía de la aplicación",
  component: FontScalerControl,
  enforcer: FontScalerEnforcer,
};

const lineHeightModule: AccessibilityModule = {
  id: "lineHeight",
  label: "Interlineado",
  description: "Ajusta el espaciado entre líneas de texto",
  component: LineHeightControl,
  enforcer: LineHeightEnforcer,
};

const letterSpacingModule: AccessibilityModule = {
  id: "letterSpacing",
  label: "Espaciado de letras",
  description: "Ajusta el espacio horizontal entre las letras",
  component: LetterSpacingControl,
  enforcer: LetterSpacingEnforcer,
};

const grayscaleModule: AccessibilityModule = {
  id: "grayscale",
  label: "Escala de grises",
  description: "Elimina los colores de la pantalla",
  component: GrayscaleControl,
  enforcer: GrayscaleEnforcer,
};

const highContrastModule: AccessibilityModule = {
  id: "highContrast",
  label: "Alto contraste",
  description: "Maximiza la claridad de textos y fondos",
  component: HighContrastControl,
  enforcer: HighContrastEnforcer,
};

export const modulesRegistry: AccessibilityModule[] = [
  fontScalerModule,
  lineHeightModule,
  letterSpacingModule,
  grayscaleModule,
  highContrastModule,
];
