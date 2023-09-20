import { cssVarStringToHsl, hslToHex } from "@/lib/utils";

export const initialThemeLight = `
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
    --radius: 0.5rem;
`;

export const initialThemeDark = `
--background: 240 10% 3.9%;
--foreground: 0 0% 98%;
--card: 240 10% 3.9%;
--card-foreground: 0 0% 98%;
--popover: 240 10% 3.9%;
--popover-foreground: 0 0% 98%;
--primary: 0 0% 98%;
--primary-foreground: 240 5.9% 10%;
--secondary: 240 3.7% 15.9%;
--secondary-foreground: 0 0% 98%;
--muted: 240 3.7% 15.9%;
--muted-foreground: 240 5% 64.9%;
--accent: 240 3.7% 15.9%;
--accent-foreground: 0 0% 98%;
--destructive: 0 62.8% 30.6%;
--destructive-foreground: 0 0% 98%;
--border: 240 3.7% 15.9%;
--input: 240 3.7% 15.9%;
--ring: 240 4.9% 83.9%;
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
  locked: boolean;
};

export const parseCSSVariables = (input: string): Color[] => {
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
    locked: false,
  }));
};
