"use client";

import {
  cssVarStringToHsl,
  hexToHsl,
  hslToCssString,
  hslToHex,
} from "@/lib/utils";
import {
  useEffect,
  useState,
  createContext,
  useContext,
  useMemo,
  useRef,
} from "react";
import { useHistoryState } from "./useHistoryState";
import { throttle } from "lodash";
import { useThrottle } from "./useThrottle";

const input = `
--background: 222.2 84% 4.9%;
--foreground: 210 40% 98%;
--card: 222.2 84% 4.9%;
--card-foreground: 210 40% 98%;
--popover: 222.2 84% 4.9%;
--popover-foreground: 210 40% 98%;
--primary: 217.2 91.2% 59.8%;
--primary-foreground: 222.2 47.4% 11.2%;
--secondary: 217.2 32.6% 17.5%;
--secondary-foreground: 210 40% 98%;
--muted: 217.2 32.6% 17.5%;
--muted-foreground: 215 20.2% 65.1%;
--accent: 217.2 32.6% 17.5%;
--accent-foreground: 210 40% 98%;
--destructive: 0 62.8% 30.6%;
--destructive-foreground: 210 40% 98%;
--border: 217.2 32.6% 17.5%;
--input: 217.2 32.6% 17.5%;
--ring: 224.3 76.3% 48%;
`;

export type Hsl = {
  h: number;
  s: number;
  l: number;
};

export type Color = {
  varName: string;
  colorHsl: Hsl;
  displayName: string;
  colorHex: string;
};

function parseCSSVariables(input: string): Color[] {
  const lines = input.split("\n");
  const result = [];

  for (const line of lines) {
    const [varName, colorHsl] = line.split(":").map((part) => part.trim());

    if (varName && colorHsl) {
      let displayName = varName.replace("--", "").replace(/-/g, " ");
      // Capitalize first letter of each word
      displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

      result.push({
        varName,
        colorHsl: cssVarStringToHsl(colorHsl),
        displayName,
      });
    }
  }

  return result.map((color) => ({
    ...color,
    colorHex: hslToHex(color.colorHsl),
  }));
}

const initialColors = parseCSSVariables(input);

type ColorsContextType = {
  colors: Color[];
  uniqueColors: (Color & { varNames: string[] })[];
  setColor: (varName: string, color: Hsl | string) => void;
  setUniqueColor: (colorHsl: Hsl, newColor: Hsl | string) => void;
  getColor: (varName: string) => Color | undefined;
  undo: () => void;
  canUndo: boolean;
  redo: () => void;
  canRedo: boolean;
  save: () => void;
};

const ColorsContext = createContext<ColorsContextType>({
  colors: initialColors,
  uniqueColors: [],
  setColor: (varName: string, color: Hsl | string) => {},
  setUniqueColor: (colorHsl: Hsl, newColor: Hsl | string) => {},
  getColor: () => undefined,
  undo: () => {},
  canUndo: false,
  redo: () => {},
  canRedo: false,
  save: () => {},
});

export const ColorsProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    state: colors,
    set: setColors,
    undo,
    canUndo,
    redo,
    canRedo,
    save,
  } = useHistoryState(initialColors);

  const updateCssVariable = (color: Color) => {
    document.documentElement.style.setProperty(
      color.varName,
      hslToCssString(color.colorHsl)
    );
  };

  useEffect(() => {
    for (const color of colors) {
      updateCssVariable(color);
    }
  }, [colors]);

  const setColor = (varName: string, color: Hsl | string) => {
    const newColors = colors.map((c) => {
      if (c.varName === varName) {
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

  const uniqueColors = useMemo(() => {
    const uniqueColors = new Set<string>();
    let filteredVariables = [];

    for (const color of colors) {
      if (!uniqueColors.has(color.colorHex)) {
        uniqueColors.add(color.colorHex);
        filteredVariables.push({ ...color, varNames: [color.varName] });
      } else {
        const existingColor = filteredVariables.find(
          (c) => c.colorHex === color.colorHex
        );
        if (existingColor) {
          existingColor.varNames.push(color.varName);
        }
      }
    }

    return filteredVariables;
  }, [colors]);

  const setUniqueColor = (colorHsl: Hsl, newColor: Hsl | string) => {
    const newColors = colors.map((c) => {
      if (
        c.colorHsl.h === colorHsl.h &&
        c.colorHsl.s === colorHsl.s &&
        c.colorHsl.l === colorHsl.l
      ) {
        const newC = {
          ...c,
        };
        let colorHsl: Hsl;
        let colorHex: string;

        if (typeof newColor === "string") {
          colorHsl = hexToHsl(newColor);
          colorHex = newColor;
        } else {
          colorHsl = newColor;
          colorHex = hslToHex(newColor);
        }

        newC.colorHsl = colorHsl;
        newC.colorHex = colorHex;

        return newC;
      } else {
        return c;
      }
    });

    setColors(newColors);
  };

  return (
    <ColorsContext.Provider
      value={{
        colors,
        uniqueColors,
        setColor,
        setUniqueColor,
        getColor,
        undo,
        canUndo,
        redo,
        canRedo,
        save,
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
