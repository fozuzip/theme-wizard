"use client";

import { ColorPicker } from "@/components/color-picker";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Scheme, paletteCreator } from "@/theme/palette";
import { hslToHex } from "@/theme/utils";

import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { HslColorPicker } from "react-colorful";

const schemas = [
  "monochromatic",
  "analogous",
  "complementary",
  "triadic",
  "compound",
] as Scheme[];

const PalettePage = () => {
  const [color, setColor] = useState({
    h: Math.random() * 360,
    s: Math.random() * 100,
    l: Math.random() * 100,
  });
  const [baseHue, setBaseHue] = useState(0);

  const showGenerateButton = color.h !== baseHue;
  const hex = hslToHex(color);

  const [palettes, setPalettes] = useState(
    schemas.map((p) => ({
      schema: p,
      colors: [] as string[],
      displayName: p.charAt(0).toUpperCase() + p.slice(1),
    }))
  );

  useEffect(() => {
    generateAll();
  }, []);

  const generateAll = () => {
    setBaseHue(color.h);

    const newPalettes = [];
    for (const schema of schemas) {
      const palette = palettes.find((p) => p.schema === schema);
      if (!palette) continue;

      const colors = generateColors(schema as Scheme);
      newPalettes.push({ ...palette, colors });
    }
    setPalettes(newPalettes);
  };

  const generate = (schema: Scheme) => {
    const palette = palettes.find((p) => p.schema === schema);
    if (!palette) return;

    const colors = generateColors(schema);
    setPalettes(
      palettes.map((p) => (p.schema === schema ? { ...p, colors } : p))
    );
  };

  const generateColors = (schema: Scheme) => {
    const palette = paletteCreator(color.h).scheme(schema).s(10, 90).l(10, 90);

    let colors = [] as string[];
    for (let index = 0; index < 5; index++) {
      const color = palette.generate();
      colors.push(hslToHex(color));
    }
    return colors;
  };

  return (
    <div className="px-20 space-y-10">
      <div className="w-full flex justify-center pb-15">
        <div className="space-y-2">
          <HslColorPicker color={color} onChange={setColor} />
          <div
            className={cn(
              "w-full opacity-0 transition-opacity",
              showGenerateButton && "opacity-100"
            )}
          >
            <Button
              disabled={!showGenerateButton}
              className="w-full"
              onClick={generateAll}
            >
              Generate
            </Button>
          </div>
        </div>
      </div>

      {palettes.map((palette) => (
        <div key={palette.schema} className="space-y-2">
          <div className="flex items-center space-x-3">
            <p className="text-lg">{palette.displayName}</p>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => generate(palette.schema)}
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex w-full space-x-2 items-center">
            <div
              className="flex-1 h-20 rounded-md"
              style={{ backgroundColor: hex }}
            />
            {palette.colors.map((hex) => (
              <div
                key={hex}
                className="flex-1 h-20 rounded-md"
                style={{ backgroundColor: hex }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PalettePage;
