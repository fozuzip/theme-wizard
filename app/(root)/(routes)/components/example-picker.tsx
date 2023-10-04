"use client";

import { ColorPicker } from "@/components/color-picker";
import { Hsl, hexToHsl, hslToHex } from "@/theme/utils";
import { useState } from "react";

export const ExamplePicker = () => {
  const [valueHsl, setValueHsl] = useState<Hsl>({
    h: Math.floor(Math.random() * 360),
    s: Math.floor(Math.random() * 100),
    l: Math.floor(Math.random() * 100),
  });
  const [isLocked, setIsLocked] = useState(false);
  const valueHex = hslToHex(valueHsl);

  const handleChange = (value: Hsl | string) => {
    if (typeof value === "string") {
      setValueHsl(hexToHsl(value));
    } else {
      setValueHsl(value);
    }
  };

  return (
    <ColorPicker
      varName="--example"
      valueHsl={valueHsl}
      valueHex={valueHex}
      onChange={handleChange}
      isLocked={isLocked}
      toggleLock={setIsLocked}
      hideSuggested
    />
  );
};
