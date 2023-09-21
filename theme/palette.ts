import { th } from "date-fns/locale";
import { Hsl, hslToHex } from "./utils";
import chroma from "chroma-js";

export type Scheme =
  | "monochromatic"
  | "analogous"
  | "complementary"
  | "triadic"
  | "compound";

class PalleteGenerator {
  baseHue: number;
  paletteScheme: Scheme;

  sRange: {
    min: number;
    max: number;
  } = { min: 0, max: 100 };

  lRange: {
    min: number;
    max: number;
  } = { min: 0, max: 100 };

  hueJitter: number = 0;

  contrastColor: Hsl | null = null;

  constructor(baseHue?: number) {
    this.baseHue = baseHue || Math.floor(Math.random() * 360);

    const schemas = [
      "monochromatic",
      "analogous",
      "complementary",
      "triadic",
      "compound",
    ];
    this.paletteScheme = schemas[
      Math.floor(Math.random() * schemas.length)
    ] as Scheme;

    return this;
  }

  scheme(scheme: Scheme) {
    this.paletteScheme = scheme;
    return this;
  }

  s(min: number, max: number) {
    this.sRange = {
      min,
      max,
    };
    return this;
  }

  l(min: number, max: number) {
    this.lRange = {
      min,
      max,
    };
    return this;
  }

  h(jitter: number) {
    this.hueJitter = jitter;
  }

  contrast(color: Hsl) {
    this.contrastColor = color;
    return this;
  }

  generateColor() {
    let h = 0;
    let s = 0;
    let l = 0;

    let hues = [];
    switch (this.paletteScheme) {
      case "monochromatic":
        h = this.baseHue;
        break;
      case "analogous":
        h = randomWithOffset(this.baseHue, 30);
        break;
      case "complementary":
        hues = [this.baseHue, this.baseHue + 180];
        h = hues[Math.floor(Math.random() * hues.length)];
        break;
      case "triadic":
        hues = [this.baseHue, this.baseHue + 120, this.baseHue - 120];
        h = hues[Math.floor(Math.random() * hues.length)];
        break;
      case "compound":
        hues = [this.baseHue, this.baseHue + 165, this.baseHue - 165];
        h = hues[Math.floor(Math.random() * hues.length)];
        break;
    }

    h = h + Math.random() * this.hueJitter;
    h = h % 360;
    s = this.sRange.min + Math.random() * (this.sRange.max - this.sRange.min);
    l = this.lRange.min + Math.random() * (this.lRange.max - this.lRange.min);

    return { h, s, l };
  }

  generate() {
    if (!this.contrastColor) {
      return this.generateColor();
    } else {
      let newColor = this.generateColor();

      let tries = 0;
      while (
        chroma.contrast(hslToHex(newColor), hslToHex(this.contrastColor)) <
          4.5 &&
        tries < 100
      ) {
        newColor = this.generateColor();
        tries++;
      }

      if (tries >= 100)
        console.warn("Could not generate a color with enough contrast");

      return newColor;
    }
  }
}

const randomWithOffset = (startingNumber: number, offsetRange: number) =>
  startingNumber +
  Math.floor(Math.random() * (2 * offsetRange + 1)) -
  offsetRange;

export const paletteCreator = (baseHue?: number) => {
  return new PalleteGenerator(baseHue);
};
