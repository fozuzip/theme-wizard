"use client";

import { cssVarToHex } from "@/lib/utils";
import { useEffect, useState, createContext, useContext } from "react";

// What to do about border and muted ? Also muted text
const initialTheme = [
  {
    id: 1,
    name: "Background",
    color: "200 100% 3%",
    cssVariables: [
      "--background",
      "--primary-foreground",
      "--card",
      "--popover",
    ],
  },
  {
    id: 2,
    name: "Text",
    color: "201 94% 94%",
    cssVariables: [
      "--foreground",
      "--card-foreground",
      "--popover-foreground",
      "--secondary-foreground",
      "--accent-foreground",
      "--destructive-foreground",
      "--muted-foreground",
      // "--border",
    ],
  },
  {
    id: 3,
    name: "Primary",
    color: "201 63% 54%",
    cssVariables: [
      "--primary",
      // "--muted",
      "--ring",
    ],
  },
  {
    id: 4,
    name: "Secondary",
    color: "201 25% 13%",
    cssVariables: ["--secondary", "--input", "--accent"],
  },
  {
    id: 5,
    name: "Accent",
    color: "351 85% 53%",
    cssVariables: ["--destructive"],
  },
].map((color) => ({ ...color, hex: cssVarToHex(color.color) }));

type ThemeContextType = {
  theme: typeof initialTheme;
  setName: (index: number) => (name: string) => void;
  setColor: (index: number) => (color: string) => void;
  changeColor: (cssVariable: string, id: number) => void;
  addColor: () => void;
};

const ThemeContext = createContext({
  theme: initialTheme,
  setName: (index: number) => (name: string) => {},
  setColor: (index: number) => (color: string) => {},
  changeColor: (cssVariable: string, id: number) => {},
  addColor: () => {},
});

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    for (const color of theme) {
      for (const variable of color.cssVariables) {
        document.documentElement.style.setProperty(variable, color.color);
      }
    }
  }, []);

  const setName = (index: number) => (name: string) => {
    const newTheme = [...theme];
    newTheme[index].name = name;
    setTheme(newTheme);
  };

  const setColor = (index: number) => (color: string) => {
    const newTheme = [...theme];
    newTheme[index].color = color;
    newTheme[index].hex = cssVarToHex(color);
    setTheme(newTheme);

    for (const variable of newTheme[index].cssVariables) {
      document.documentElement.style.setProperty(variable, color);
    }
  };

  const addColor = () => {
    const newTheme = [...theme];
    newTheme.push({
      id: newTheme.length + 1,
      name: "New Color",
      color: "0 0% 0%",
      hex: cssVarToHex("0 0% 0%"),
      cssVariables: [],
    });
    setTheme(newTheme);
  };

  const changeColor = (cssVariable: string, id: number) => {
    const newTheme = theme.map((color) => {
      // Remove variable if present
      let cssVariables = color.cssVariables.filter(
        (variable) => variable !== cssVariable
      );

      if (color.id === id) {
        cssVariables = [...cssVariables, cssVariable];

        document.documentElement.style.setProperty(cssVariable, color.color);
      }

      return {
        ...color,
        cssVariables,
      };
    });
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, setName, setColor, addColor, changeColor }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const { theme, setName, setColor, addColor, changeColor } =
    useContext(ThemeContext);

  return {
    theme,
    setName,
    setColor,
    addColor,
    changeColor,
  };
};

export default useTheme;
