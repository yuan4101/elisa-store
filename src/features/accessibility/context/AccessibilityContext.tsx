"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { AccessibilitySettings } from "../types/accessibility.types";

const STORAGE_KEY = "accessibility_settings";

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface AccessibilityState {
  settings: AccessibilitySettings;
  buttonPosition: Corner;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  buttonPosition: Corner;
  updateSettings: (newSettings: AccessibilitySettings) => void;
  updateButtonPosition: (position: Corner) => void;
  resetSettings: () => void;
  isOpen: boolean;
  togglePanel: () => void;
}

const AccessibilityContext = createContext<
  AccessibilityContextType | undefined
>(undefined);


export function AccessibilityProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [settings, setSettings] = useState<AccessibilitySettings>({});
  const [buttonPosition, setButtonPosition] = useState<Corner>("bottom-right");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (globalThis.window !== undefined) {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.settings) setSettings(parsed.settings);
          if (parsed.buttonPosition) setButtonPosition(parsed.buttonPosition);
        }
      } catch {
        console.warn("Failed to load accessibility state from localStorage");
      }
    }
  }, []);

  const saveState = useCallback(
    (newSettings: AccessibilitySettings, newPosition: Corner) => {
      const state: AccessibilityState = {
        settings: newSettings,
        buttonPosition: newPosition,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },
    [],
  );

  const updateSettings = useCallback(
    (newSettings: AccessibilitySettings) => {
      setSettings(newSettings);
      saveState(newSettings, buttonPosition);
    },
    [buttonPosition, saveState],
  );

  const updateButtonPosition = useCallback(
    (position: Corner) => {
      setButtonPosition(position);
      saveState(settings, position);
    },
    [settings, saveState],
  );

  const resetSettings = useCallback(() => {
    setSettings({});
    const state: AccessibilityState = {
      settings: {},
      buttonPosition,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [buttonPosition]);

  const togglePanel = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({
      settings,
      buttonPosition,
      updateSettings,
      updateButtonPosition,
      resetSettings,
      isOpen,
      togglePanel,
    }),
    [
      settings,
      buttonPosition,
      updateSettings,
      updateButtonPosition,
      resetSettings,
      isOpen,
      togglePanel,
    ],
  );

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error(
      "useAccessibility must be used within AccessibilityProvider",
    );
  }
  return context;
}
