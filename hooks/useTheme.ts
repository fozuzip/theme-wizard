import { useEffect, useState } from "react";

const initialTheme = [
  {
    id: 1,
    name: "Background",
    color: "222.2 84% 4.9%",
    cssVariables: ["--background", "--card", "--popover"],
  },
  {
    id: 2,
    name: "Text",
    color: "210 40% 98%",
    cssVariables: [
      "--foreground",
      "--card-foreground",
      "--popover-foreground",
      "--primary",
      "--secondary-foreground",
      "--accent-foreground",
      "--destructive-foreground",
    ],
  },
  {
    id: 3,
    name: "Primary",
    color: "217.2 32.6% 17.5%",
    cssVariables: ["--secondary", "--muted", "--accent", "--border", "--input"],
  },
  {
    id: 4,
    name: "Secondary",
    color: "222.2 47.4% 11.2%",
    cssVariables: ["--primary-foreground"],
  },
  {
    id: 5,
    name: "Accent",
    color: "212.7 26.8% 83.9%",
    cssVariables: ["--ring", "--muted-foreground"],
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
