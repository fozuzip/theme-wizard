import chroma from "chroma-js";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cssVarStringToHsl(value: string, percentage = false) {
  let hue = 0;
  let saturation = 0;
  let lightness = 0;

  // Regular expression to match numbers
  const numberPattern = /(\d+(\.\d+)?)/g;

  // Extract the numbers from the HSLA string
  const extractedNumbers = value.match(numberPattern);

  if (extractedNumbers && extractedNumbers.length >= 3) {
    hue = parseFloat(extractedNumbers[0]);
    saturation = parseFloat(extractedNumbers[1]);
    if (percentage) saturation = saturation / 100;
    lightness = parseFloat(extractedNumbers[2]);
    if (percentage) lightness = lightness / 100;
  }

  return { h: hue, s: saturation, l: lightness };
}

export function hslToCssString({
  h,
  s,
  l,
}: {
  h: number;
  s: number;
  l: number;
}) {
  return `${h} ${s * 100}% ${l * 100}%`;
}

export function cssVarToHex(value: string) {
  const hsl = cssVarStringToHsl(value, true);
  // @ts-ignore
  const hex = chroma(hsl).hex();
  return hex;
}
