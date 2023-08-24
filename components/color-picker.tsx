import { HslColorPicker } from "react-colorful";

import { cssVarStringToHsl } from "@/lib/utils";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  const colorPickerValue = cssVarStringToHsl(value);

  const onColorPickerChange = (value: { h: number; s: number; l: number }) => {
    onChange(`${value.h}, ${value.s}%, ${value.l}%`);
  };

  return (
    <HslColorPicker color={colorPickerValue} onChange={onColorPickerChange} />
  );
};
