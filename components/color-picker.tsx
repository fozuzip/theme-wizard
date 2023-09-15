import { HslColorPicker } from "react-colorful";

import { ClipboardButton } from "./clipboard-button";
import type { Hsl } from "@/hooks/useColor";
import { Input } from "./ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import chroma from "chroma-js";

interface ColorPickerProps {
  valueHsl: Hsl;
  valueHex: string;
  onChange: (value: Hsl | string) => void;
}

export const ColorPicker = ({
  valueHsl,
  valueHex,
  onChange,
}: ColorPickerProps) => {
  const [hexInputValue, setHexInputValue] = useState(valueHex);

  useEffect(() => {
    if (hexInputValue === valueHex) return;

    setHexInputValue(valueHex);
  }, [valueHex]);

  const handleHexChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setHexInputValue(newValue);
    if (chroma.valid(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <HslColorPicker color={valueHsl} onChange={onChange} />
      <div className="flex w-full items-center space-x-2">
        <Input
          placeholder="Hex value"
          value={hexInputValue}
          onChange={handleHexChange}
          className="w-[150px]"
        />
        <ClipboardButton value={valueHex} />
      </div>
    </div>
  );
};
