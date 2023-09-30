import { HslColorPicker } from "react-colorful";

import { Input } from "./ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import chroma from "chroma-js";
import { Lock, RotateCcw, Unlock } from "lucide-react";
import { Button } from "./ui/button";
import { Hsl, hslToHex } from "@/theme/utils";
import EyeDropperButton from "./eye-dropper-button";
import useColors from "@/theme/useColor";
import { randomColor } from "@/theme/randomize";
import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "./ui/accordion";
import { Separator } from "./ui/separator";

interface ColorPickerProps {
  varName: string;
  valueHsl: Hsl;
  valueHex: string;
  onChange: (value: Hsl | string) => void;
  isLocked: boolean;
  toggleLock: (value: boolean) => void;
}

export const ColorPicker = ({
  varName,
  valueHsl,
  valueHex,
  onChange,
  isLocked,
  toggleLock,
}: ColorPickerProps) => {
  const { mode } = useColors();
  const [hexInputValue, setHexInputValue] = useState(valueHex);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [suggestedColors, setSuggestedColors] = useState<string[]>([]);

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

  const generateSuggestedColors = () => {
    let suggested = [];
    for (let index = 0; index < 11; index++) {
      suggested.push(hslToHex(randomColor(varName, mode)));
    }
    setSuggestedColors(suggested);
  };

  useEffect(() => {
    generateSuggestedColors();
  }, []);

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

        <EyeDropperButton onColorSelect={onChange} disabled={isLocked} />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => toggleLock(!isLocked)}
        >
          <LockIcon className="w-4 h-4" />
        </Button>
      </div>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        onValueChange={(value) => setAccordionOpen(!!value)}
      >
        <AccordionItem value="item-1" className="pb-0">
          <AccordionTrigger className="w-full">
            <div className="relative h-4 flex items-center justify-center">
              <Separator orientation="horizontal" className="w-full" />
              <div className="absolute inset-0 flex justify-center">
                <p className="w-[120px] text-xs text-muted-foreground bg-popover">
                  Suggested colors
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-1 pt-4">
            <div className="flex items-center flex-wrap max-w-[200px] gap-2">
              {suggestedColors.map((color) => (
                <div
                  key={color}
                  className="w-6 h-6 cursor-pointer rounded-md ring-2 ring-white"
                  style={{ backgroundColor: color }}
                  onClick={() => onChange(color)}
                />
              ))}
              <Button
                variant="ghost"
                size="icon"
                onClick={generateSuggestedColors}
                className="w-7 h-7"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
