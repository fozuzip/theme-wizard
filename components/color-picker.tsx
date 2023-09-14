import { HslColorPicker } from "react-colorful";

import { cssVarStringToHsl, cssVarToHex } from "@/lib/utils";
import { HexInput } from "./hex-input";
import { ClipboardButton } from "./clipboard-button";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  const colorPickerValue = cssVarStringToHsl(value);

  const hex = cssVarToHex(value);

  const onColorPickerChange = (value: { h: number; s: number; l: number }) => {
    onChange(`${value.h}, ${value.s}%, ${value.l}%`);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <HslColorPicker color={colorPickerValue} onChange={onColorPickerChange} />
      <div className="flex w-full items-center space-x-2">
        <HexInput value={hex} onChange={onChange} className="w-[150px]" />
        <ClipboardButton value={hex} />
      </div>
    </div>
  );
};
