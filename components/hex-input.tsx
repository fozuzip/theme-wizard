"use client";

import { useEffect, useState } from "react";
import chroma from "chroma-js";

import { hslToCssString } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface HexInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const HexInput = ({ value, onChange, className }: HexInputProps) => {
  const [hexValue, setHexValue] = useState(value);

  useEffect(() => {
    setHexValue(value);
  }, [value]);

  const handleHexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newHexValue = event.target.value;
    setHexValue(newHexValue);

    // Validate hex value
    if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/i.test(newHexValue)) {
      const hsl = chroma(newHexValue).hsl();
      onChange(hslToCssString({ h: hsl[0], s: hsl[1], l: hsl[2] }));
    }
  };

  return (
    <Input
      placeholder="Hex value"
      value={hexValue}
      onChange={handleHexChange}
      className={className}
    />
  );
};
