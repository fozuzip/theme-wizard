"use client";

import { useEffect, createContext, useContext, useMemo, useState } from "react";
import { useHistoryState } from "../hooks/useHistoryState";
import {
  Color,
  Hsl,
  parseCSSVariables,
  themes,
  hexToHsl,
  hslToCssString,
  hslToHex,
} from "./utils";
import { randomizeColors } from "./randomize";

const randomIndex = Math.floor(Math.random() * themes.length);

const initialColorsLight = parseCSSVariables(themes[randomIndex].light);
const initialColorsDark = parseCSSVariables(themes[randomIndex].dark);

type ColorsContextType = {
  mode: "light" | "dark";
  colors: Color[];
  bodyFont: string;
  headingFont: string;
  borderRadius: string;
  otherModeColors: Color[];
  setColor: (varName: string, color: Hsl | string) => void;
  setBatchColors: (varNames: string[], color: Hsl | string) => void;
  setBodyFont: (font: string) => void;
  setHeadingFont: (font: string) => void;
  setBorderRadius: (borderRadius: string) => void;
  getColor: (varName: string) => Color | undefined;
  undo: () => void;
  canUndo: boolean;
  redo: () => void;
  canRedo: boolean;
  save: () => void;
  setLock: (varName: string, locked: boolean) => void;
  setBatchLock: (varNames: string[], locked: boolean) => void;
  setLockAllColors: (locked: boolean) => void;
  toggleMode: () => void;
  randomize: () => void;
};

const ColorsContext = createContext<ColorsContextType>({
  mode: "dark",
  bodyFont: "inter",
  headingFont: "inter",
  colors: initialColorsDark,
  borderRadius: "0.5rem",
  otherModeColors: initialColorsLight,
  setColor: (varName: string, color: Hsl | string) => {},
  setBatchColors: (varNames: string[], color: Hsl | string) => {},
  setBodyFont: (font: string) => {},
  setHeadingFont: (font: string) => {},
  setBorderRadius: (borderRadius: string) => {},
  getColor: () => undefined,
  undo: () => {},
  canUndo: false,
  redo: () => {},
  canRedo: false,
  save: () => {},
  setLock: (varName: string, locked: boolean) => {},
  setBatchLock: (varNames: string[], locked: boolean) => {},
  setLockAllColors: () => {},
  toggleMode: () => {},
  randomize: () => {},
});

export const ColorsProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const { state, set, undo, canUndo, redo, canRedo, save } = useHistoryState({
    darkColors: initialColorsDark,
    lightColors: initialColorsLight,
    bodyFont: "inter",
    headingFont: "inter",
    borderRadius: "0.5rem",
  });

  const colors = useMemo(
    () => (mode === "dark" ? state.darkColors : state.lightColors),
    [mode, state.darkColors, state.lightColors]
  );

  const otherModeColors = useMemo(
    () => (mode === "dark" ? state.lightColors : state.darkColors),
    [mode, state.darkColors, state.lightColors]
  );

  const setColors = (colors: Color[]) => {
    if (mode === "dark") {
      set({ ...state, darkColors: colors });
    } else {
      set({ ...state, lightColors: colors });
    }
  };

  const bodyFont = state.bodyFont;
  const setBodyFont = (font: string) => {
    set({ ...state, bodyFont: font });
    save();
  };

  const headingFont = state.headingFont;
  const setHeadingFont = (font: string) => {
    set({ ...state, headingFont: font });
    save();
  };

  const borderRadius = state.borderRadius;
  const setBorderRadius = (borderRadius: string) => {
    set({ ...state, borderRadius: borderRadius });
    save();
  };

  const toggleMode = () => {
    setMode((m) => (m === "dark" ? "light" : "dark"));
  };

  const updateCssVariable = (varName: string, value: string) => {
    typeof document !== "undefined" &&
      document.documentElement.style.setProperty(varName, value);
  };

  const updateCssColorVariable = (color: Color) => {
    updateCssVariable(color.varName, hslToCssString(color.colorHsl));
  };

  useEffect(() => {
    for (const color of colors) {
      updateCssColorVariable(color);
    }
  }, [colors]);

  useEffect(() => {
    updateCssVariable("--radius", borderRadius);
  }, [borderRadius]);

  const setColor = (varName: string, color: Hsl | string) =>
    setBatchColors([varName], color);

  const setBatchColors = (varNames: string[], color: Hsl | string) => {
    const newColors = colors.map((c) => {
      if (varNames.includes(c.varName) && !c.locked) {
        const newColor = {
          ...c,
        };

        let colorHsl: Hsl;
        let colorHex: string;

        if (typeof color === "string") {
          colorHsl = hexToHsl(color);
          colorHex = color;
        } else {
          colorHsl = color;
          colorHex = hslToHex(color);
        }

        newColor.colorHsl = colorHsl;
        newColor.colorHex = colorHex;

        return newColor;
      } else {
        return c;
      }
    });

    setColors(newColors);
  };

  const getColor = (varName: string) => {
    return colors.find((c) => c.varName === varName);
  };

  const setLock = (varName: string, locked: boolean) =>
    setBatchLock([varName], locked);

  const setBatchLock = (varNames: string[], locked: boolean) => {
    const newColors = colors.map((c) => {
      if (varNames.includes(c.varName)) {
        const newColor = {
          ...c,
        };

        newColor.locked = locked;

        return newColor;
      } else {
        return c;
      }
    });

    setColors(newColors);
  };

  const setLockAllColors = (locked: boolean) => {
    const newColors = colors.map((c) => {
      const newC = {
        ...c,
      };

      newC.locked = locked;

      return newC;
    });

    setColors(newColors);
  };

  const randomize = () => {
    const newLightColors = randomizeColors(state.lightColors, "light");
    const newDarkColors = randomizeColors(state.darkColors, "dark");

    set({ ...state, lightColors: newLightColors, darkColors: newDarkColors });
    save();
  };

  return (
    <ColorsContext.Provider
      value={{
        mode,
        colors,
        bodyFont,
        headingFont,
        borderRadius,
        otherModeColors,
        setColor,
        setBatchColors,
        setBodyFont,
        setHeadingFont,
        setBorderRadius,
        getColor,
        undo,
        canUndo,
        redo,
        canRedo,
        save,
        setLock,
        setBatchLock,
        setLockAllColors,
        toggleMode,
        randomize,
      }}
    >
      {children}
    </ColorsContext.Provider>
  );
};

const useColors = () => {
  const context = useContext(ColorsContext);

  return context;
};

export default useColors;

export const colorNames = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "destructive-foreground",
  "border",
  "input",
  "ring",
];
