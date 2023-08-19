"use client";

import { useMemo } from "react";
import { HslColorPicker } from "react-colorful";

import { CssColor } from "@/hooks/useCssColor";

interface ColorPickerProps {
  color: CssColor;
}

const ColorPicker = ({ color }: ColorPickerProps) => {
  const colorPickerValue = useMemo(
    () => ({
      h: color.hue || 0,
      s: color.saturation || 0,
      l: color.lightness || 0,
    }),
    [color.hue, color.saturation, color.lightness]
  );

  const onColorPickerChange = (value: { h: number; s: number; l: number }) => {
    color.set(`${value.h}, ${value.s}%, ${value.l}%`);
  };

  return (
    <HslColorPicker color={colorPickerValue} onChange={onColorPickerChange} />
  );
};

export default ColorPicker;
