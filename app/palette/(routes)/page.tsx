"use client";

import { Button } from "@/components/ui/button";
import {
  generateComplementaryColors,
  generateMonochromaticColors,
  generateAnalogousColors,
  hslToHex,
} from "@/theme/utils";
import { RotateCcw } from "lucide-react";
import { useState } from "react";

const complimentary = (numberOfColors: number) => {
  const colorsHsl = generateComplementaryColors(numberOfColors);
  const colorsHex = colorsHsl.map((color) => hslToHex(color));
  return colorsHex;
};

const monochromatic = (numberOfColors: number) => {
  const colorsHsl = generateMonochromaticColors(numberOfColors);
  const colorsHex = colorsHsl.map((color) => hslToHex(color));
  return colorsHex;
};

const analogous = (numberOfColors: number) => {
  const colorsHsl = generateAnalogousColors(numberOfColors);
  const colorsHex = colorsHsl.map((color) => hslToHex(color));
  return colorsHex;
};

const PalettePage = () => {
  const [complimentaryColors, setComplimentaryColors] = useState(() =>
    complimentary(10)
  );

  const [monocromaticColors, setMonocromaticColors] = useState(() =>
    monochromatic(10)
  );

  const [analogousColors, setAnalogousColors] = useState(() => analogous(10));

  const generateComplimentary = () => {
    setComplimentaryColors(complimentary(10));
  };

  const generateMonocromatic = () => {
    setMonocromaticColors(monochromatic(10));
  };

  const generateAnalogous = () => {
    setAnalogousColors(analogous(10));
  };

  return (
    <div className="px-20 space-y-10">
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <p className="text-lg">Complimentary</p>
          <Button size="icon" variant="ghost" onClick={generateComplimentary}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex space-x-2 items-center">
          {complimentaryColors.map((hex) => (
            <div
              key={hex}
              className="w-20 h-40 rounded-md"
              style={{ backgroundColor: hex }}
            />
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <p className="text-lg">Monochromatic</p>
          <Button size="icon" variant="ghost" onClick={generateMonocromatic}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex space-x-2 items-center">
          {monocromaticColors.map((hex) => (
            <div
              key={hex}
              className="w-20 h-40 rounded-md"
              style={{ backgroundColor: hex }}
            />
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <p className="text-lg">Analogous</p>
          <Button size="icon" variant="ghost" onClick={generateAnalogous}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex space-x-2 items-center">
          {analogousColors.map((hex) => (
            <div
              key={hex}
              className="w-20 h-40 rounded-md"
              style={{ backgroundColor: hex }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PalettePage;
