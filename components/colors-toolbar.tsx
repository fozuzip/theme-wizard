"use client";

import useColors from "@/theme/useColor";
import { Dice5, Lock, Unlock } from "lucide-react";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Selection } from "./click-detector";
import { ColorButton } from "./color-button";
import { ColorPicker } from "./color-picker";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";

interface ColorsToolbarProps {
  selection: Selection | null;
}

export const ColorsToolbar = ({ selection }: ColorsToolbarProps) => {
  const {
    uniqueColors,
    setUniqueColor,
    save,
    setUniqueLock,
    setLockAllColors,
    randomize,
  } = useColors();

  const [colorLock, setColorLock] = useState(false);

  const selectionVarNames = selection
    ? selection.colors.map((color) => `--${color}`)
    : [];

  const colors = selection
    ? uniqueColors
        .filter(
          (colors) =>
            !!colors.varNames.find((varName) =>
              selectionVarNames.includes(varName)
            )
        )
        .map((color) => ({
          ...color,
          varNames: color.varNames.filter((varName) =>
            selectionVarNames.includes(varName)
          ),
        }))
    : uniqueColors;

  useHotkeys(
    "l",
    () => {
      setColorLock(!colorLock);
      setLockAllColors(!colorLock);
    },
    []
  );

  useHotkeys(
    "r",
    () => {
      randomize();
    },
    []
  );

  const LockIcon = colorLock ? Lock : Unlock;

  return (
    <div className="flex items-center">
      {selection?.elementTag && (
        <Badge className="mr-6">
          <span className="capitalize pr-1">{selection?.elementTag} </span>
          selected
        </Badge>
      )}
      <div className="flex items-center">
        <div className="flex items-center space-x-4">
          {colors.map(({ varName, colorHex, colorHsl, locked, varNames }) => (
            <Popover
              key={varName}
              onOpenChange={(open) => {
                if (!open) {
                  save();
                }
              }}
            >
              <PopoverTrigger>
                <ColorButton
                  hex={colorHex}
                  isLocked={locked}
                  onLockToggle={(value) => setUniqueLock(colorHsl, value)}
                />
              </PopoverTrigger>
              <PopoverContent sideOffset={14} className="w-59 p-3 z-[101]">
                <ColorPicker
                  valueHsl={colorHsl}
                  valueHex={colorHex}
                  onChange={(newColor) => setUniqueColor(colorHsl, newColor)}
                  isLocked={locked}
                  toggleLock={(value) => setUniqueLock(colorHsl, value)}
                />
              </PopoverContent>
            </Popover>
          ))}
        </div>
        <Separator orientation="vertical" className="h-6 ml-6 mr-4" />

        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setColorLock(!colorLock);
            setLockAllColors(!colorLock);
          }}
        >
          <LockIcon className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="ghost" onClick={randomize}>
          <Dice5 size={20} />
        </Button>
      </div>
    </div>
  );
};
