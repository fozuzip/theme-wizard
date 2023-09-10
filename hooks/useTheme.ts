import { useEffect, useState } from "react";

const initialTheme = [
  {
    id: 1,
    name: "Background",
    color: "200 100% 3%",
    cssVariables: ["--background", "--primary-foreground"],
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
      "--border",
    ],
  },
  {
    id: 3,
    name: "Primary",
    color: "201 63% 54%",
    cssVariables: ["--primary", "--muted", "--ring"],
  },
  {
    id: 4,
    name: "Secondary",
    color: "201 25% 13%",
    cssVariables: ["--secondary", "--popover", "--card", "--input", "--accent"],
  },
  {
    id: 5,
    name: "Accent",
    color: "351 85% 53%",
    cssVariables: ["--destructive"],
  },
];

const useTheme = () => {
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
      cssVariables: [],
    });
    setTheme(newTheme);
  };

  return {
    theme,
    setName,
    setColor,
    addColor,
  };
};

export default useTheme;
