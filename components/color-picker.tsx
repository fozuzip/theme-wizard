import { HslColorPicker } from "react-colorful";

import type { Hsl } from "@/hooks/useColor";
import { Input } from "./ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import chroma from "chroma-js";
import { Dice5, Lock, Unlock } from "lucide-react";
import { Button } from "./ui/button";

interface ColorPickerProps {
  valueHsl: Hsl;
  valueHex: string;
  onChange: (value: Hsl | string) => void;
  isLocked: boolean;
  toggleLock: (value: boolean) => void;
}

export const ColorPicker = ({
  valueHsl,
  valueHex,
  onChange,
  isLocked,
  toggleLock,
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

  const LockIcon = isLocked ? Lock : Unlock;

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="relative">
        <div className="z-0">
          <HslColorPicker color={valueHsl} onChange={onChange} />
        </div>

        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10 ">
            <Lock className="w-10 h-10" />
          </div>
        )}
      </div>

      <div className="flex w-full items-center space-x-1">
        <Input
          placeholder="Hex value"
          value={hexInputValue}
          onChange={handleHexChange}
          className="w-[120px]"
          disabled={isLocked}
          copyToClipboard
        />

        <Button variant="ghost" size="icon" disabled={isLocked}>
          <Dice5 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => toggleLock(!isLocked)}
        >
          <LockIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
