import { Color, Hsl, createColor, hslToHex } from "./utils";
import chroma from "chroma-js";

export type Scheme =
  | "monochromatic"
  | "analogous"
  | "complementary"
  | "triadic"
  | "compound";

const schemes = [
  "compound",
  "analogous",
  "complementary",
  "triadic",
  "compound",
  "monochromatic",
] as Scheme[];

export const randomizeColors = (colors: Color[], mode: "light" | "dark") => {
  // Get Scheme :
  const scheme = schemes[Math.floor(Math.random() * schemes.length)];
  console.log(scheme);
  const jitterAmount = 10;

  // Get base Hue :
  let primaryHue = 0;
  let secondaryHues: number[] = [];

  const lockedColors = colors.filter((c) => c.locked);

  // Get primary hue from locked colors ( Either te primary or any other)
  let colorWithPruimaryHue = lockedColors.find(
    (c) => c.varName === "--primary"
  );
  if (!colorWithPruimaryHue) {
    colorWithPruimaryHue = lockedColors.find(
      (c) => c.varName !== "--destructive"
    );
  }

  primaryHue = colorWithPruimaryHue?.colorHsl.h ?? Math.random() * 360;

  // Get any secondary locked hues
  secondaryHues = lockedColors
    .map((c) => c.colorHsl.h)
    .filter((c) => Math.abs(primaryHue - c) > jitterAmount);
  if (secondaryHues.length === 0) {
    switch (scheme) {
      case "monochromatic":
        secondaryHues = [primaryHue];
        break;
      case "analogous":
        secondaryHues = [
          randomFromRange(primaryHue, primaryHue + 45),
          randomFromRange(primaryHue - 45, primaryHue),
        ];
        break;
      case "complementary":
        secondaryHues = [primaryHue + 180];
        break;
      case "triadic":
        secondaryHues = [primaryHue + 120, primaryHue - 120];
        break;
      case "compound":
        const complementaryHue = primaryHue + 180;
        secondaryHues = [
          randomFromRange(complementaryHue, complementaryHue + 45),
          randomFromRange(complementaryHue - 45, complementaryHue),
        ];
        break;
    }
  }

  const vars = [
    ["--background", "--foreground"],
    ["--card", "--card-foreground"],
    ["--popover", "--popover-foreground"],
    ["--primary", "--primary-foreground"],
    ["--secondary", "--secondary-foreground"],
    ["--muted", "--muted-foreground"],
    ["--accent", "--accent-foreground"],
    ["--destructive", "--destructive-foreground"],
    ["--border"],
    ["--input"],
    ["--ring"],
  ];
  let newColors = [] as Color[];
  for (const group of vars) {
    const v = group[0];
    const vConstains = varConstraints(v, mode);

    let existingVColor = null;
    const currentColor = colors.find((c) => c.varName === v);
    if (currentColor) {
      if (currentColor.locked) {
        existingVColor = currentColor.colorHsl;
      } else {
        const group = colors
          .filter(
            (c) =>
              c.colorHsl.h === currentColor.colorHsl.h &&
              c.colorHsl.s === currentColor.colorHsl.s &&
              c.colorHsl.l === currentColor.colorHsl.l
          )
          .map((g) => g.varName);
        const newColor = newColors.find((c) => group.includes(c.varName));
        if (newColor) {
          existingVColor = newColor.colorHsl;
        }
      }
    }

    const f = group.at(1);
    if (!f) {
      const vColor =
        existingVColor ||
        generateColor(primaryHue, secondaryHues, jitterAmount, vConstains);
      newColors.push(createColor(v, vColor));
    } else {
      const fConstains = varConstraints(f, mode);

      let existingFColor = null;
      const currentColor = colors.find((c) => c.varName === f);
      if (currentColor) {
        if (currentColor.locked) {
          existingFColor = currentColor.colorHsl;
        } else {
          const group = colors
            .filter(
              (c) =>
                c.colorHsl.h === currentColor.colorHsl.h &&
                c.colorHsl.s === currentColor.colorHsl.s &&
                c.colorHsl.l === currentColor.colorHsl.l
            )
            .map((g) => g.varName);
          const newColor = newColors.find((c) => group.includes(c.varName));
          if (newColor) {
            existingFColor = newColor.colorHsl;
          }
        }
      }

      let tries = 0;
      let vColor: Hsl;
      let fColor: Hsl;
      do {
        vColor =
          existingVColor ||
          generateColor(primaryHue, secondaryHues, jitterAmount, vConstains);

        fColor =
          existingFColor ||
          generateColor(primaryHue, secondaryHues, jitterAmount, fConstains);

        tries++;
      } while (
        tries < 100 &&
        chroma.contrast(hslToHex(vColor), hslToHex(fColor)) < 4.5
      );
      if (tries >= 100) console.warn("Failed to find contrast");

      newColors.push(createColor(v, vColor));
      newColors.push(createColor(f, fColor));
    }
  }

  return newColors.map((c) => {
    const existingColor = colors.find((c2) => c2.varName === c.varName);
    if (existingColor) {
      return { ...c, locked: existingColor.locked };
    } else {
      return c;
    }
  });
};

const varConstraints = (v: string, mode: "light" | "dark") => {
  if (mode === "light") return varConstraintsLight(v);
  else return varConstraintsDark(v);
};

const varConstraintsLight = (v: string) => {
  let lRange = { min: 0, max: 100 };
  let sRange = { min: 0, max: 100 };
  let onlyPrimary = false;
  let onlySecondary = false;

  if (v === "--background") {
    lRange = { min: 90, max: 100 };
  }

  if (["--card", "--popover"].includes(v)) {
    lRange = { min: 80, max: 100 };
  }

  if (
    [
      "--foreground",
      "--secondary-foreground",
      "--card-foreground",
      "--popover-foreground",
      "--accent-foreground",
    ].includes(v)
  ) {
    lRange = { min: 0, max: 10 };
  }

  if (["--primary", "--ring"].includes(v)) {
    lRange = { min: 20, max: 80 };
    sRange = { min: 50, max: 100 };
    onlyPrimary = true;
  }

  if (v === "--mutted") {
    lRange = { min: 80, max: 90 };
    sRange = { min: 0, max: 60 };
  }
  if (["--accent", "--secondary", "--border", "--input"].includes(v)) {
    lRange = { min: 80, max: 90 };
    sRange = { min: 0, max: 80 };
  }

  if (v === "--muted-foreground") {
    lRange = { min: 10, max: 20 };
    sRange = { min: 0, max: 60 };
  }

  if (v === "--destructive") {
    lRange = { min: 20, max: 80 };
    onlySecondary = true;
  }

  return {
    lRange,
    sRange,
    onlyPrimary,
    onlySecondary,
  };
};

const varConstraintsDark = (v: string) => {
  let lRange = { min: 0, max: 100 };
  let sRange = { min: 0, max: 100 };
  let onlyPrimary = false;
  let onlySecondary = false;

  if (v === "--background") {
    lRange = { min: 0, max: 10 };
  }

  if (["--card", "--popover"].includes(v)) {
    lRange = { min: 0, max: 20 };
  }

  if (
    [
      "--foreground",
      "--secondary-foreground",
      "--card-foreground",
      "--popover-foreground",
      "--accent-foreground",
    ].includes(v)
  ) {
    lRange = { min: 90, max: 100 };
  }

  if (["--primary", "--ring"].includes(v)) {
    lRange = { min: 20, max: 80 };
    sRange = { min: 50, max: 100 };
    onlyPrimary = true;
  }

  if (v === "--mutted") {
    lRange = { min: 10, max: 20 };
    sRange = { min: 0, max: 60 };
  }
  if (["--accent", "--secondary", "--border", "--input"].includes(v)) {
    lRange = { min: 10, max: 20 };
  }

  if (v === "--muted-foreground") {
    lRange = { min: 80, max: 90 };
  }

  if (v === "--destructive") {
    lRange = { min: 20, max: 80 };
    onlySecondary = true;
  }

  return {
    lRange,
    sRange,
    onlyPrimary,
    onlySecondary,
  };
};

export const generateColor = (
  primaryHue: number,
  secondaryHues: number[],
  jitter: number,
  constraints: {
    lRange: { min: number; max: number };
    sRange: { min: number; max: number };
    onlyPrimary: boolean;
    onlySecondary: boolean;
  }
) => {
  const huePool = constraints.onlyPrimary
    ? [primaryHue]
    : constraints.onlySecondary
    ? [...secondaryHues]
    : secondaryHues.map((h) => [h, primaryHue]).flat();

  let h = randomWithOffset(randomFromArray(huePool), jitter);
  h = h % 360;
  let s = randomFromRange(constraints.sRange.min, constraints.sRange.max);
  let l = randomFromRange(constraints.lRange.min, constraints.lRange.max);

  return {
    h: Math.round(h * 10) / 10,
    s: Math.round(s * 10) / 10,
    l: Math.round(l * 10) / 10,
  };
};

const randomWithOffset = (startingNumber: number, offsetRange: number) =>
  startingNumber +
  Math.floor(Math.random() * (2 * offsetRange + 1)) -
  offsetRange;

const randomFromRange = (min: number, max: number) =>
  min + Math.random() * (max - min);

const randomFromArray = <T>(items: T[]): T =>
  items[Math.floor(Math.random() * items.length)];
