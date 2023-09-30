"use client";

import useColors from "@/theme/useColor";
import { Dice5, Lock, Unlock } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Selection } from "./click-detector";
import { ColorButton } from "./color-button";
import { ColorPicker } from "./color-picker";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { set } from "date-fns";
import { Hsl, hexToHsl, hslToHex } from "@/theme/utils";
import { Tooltip, TooltipContent } from "./ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

interface ColorsToolbarProps {
  selection: Selection | null;
}

export const ColorsToolbar = ({ selection }: ColorsToolbarProps) => {
  const {
    colors,
    setBatchColors,
    save,
    setLockAllColors,
    setBatchLock,
    randomize,
  } = useColors();

  const [colorLock, setColorLock] = useState(false);

  const selectionVarNames = selection
    ? selection.colors.map((color) => `--${color}`)
    : [];

  const groupedColors = useMemo(() => {
    const colorSet = new Set<string>();
    let groupedColors = [];

    for (const color of colors) {
      if (selection && !selectionVarNames.includes(color.varName)) continue;

      if (!colorSet.has(color.colorHex)) {
        colorSet.add(color.colorHex);
        groupedColors.push({ ...color, varNames: [color.varName] });
      } else {
        const existingColor = groupedColors.find(
          (c) => c.colorHex === color.colorHex
        );
        if (existingColor) {
          existingColor.varNames.push(color.varName);
        }
      }
    }

    return groupedColors;
  }, [colors, selection]);

  const handleGroupColorChange = (
    groupVarName: string,
    newColor: Hsl | string
  ) => {
    const group = groupedColors.find(({ varName }) => varName === groupVarName);
    if (!group) return;

    setBatchColors(
      group.varNames,
      typeof newColor === "string" ? hexToHsl(newColor) : newColor
    );
  };

  const handleGroupLock = (groupVarName: string, locked: boolean) => {
    const group = groupedColors.find(({ varName }) => varName === groupVarName);
    if (!group) return;

    setBatchLock(group.varNames, locked);
  };

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

  useEffect(() => {
    if (colorLock) {
      const allUnlocked = groupedColors.every(({ locked }) => !locked);
      if (allUnlocked) setColorLock(false);
    } else {
      const allLocked = groupedColors.every(({ locked }) => locked);
      if (allLocked) setColorLock(true);
    }
  }, [groupedColors, colorLock]);

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
          {groupedColors.map(
            ({ varName, colorHex, colorHsl, locked, varNames }) => (
              <Tooltip key={varName}>
                <TooltipTrigger asChild>
                  <div>
                    <Popover
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
                          onLockToggle={(value) =>
                            handleGroupLock(varName, value)
                          }
                        />
                      </PopoverTrigger>
                      <PopoverContent
                        sideOffset={14}
                        className="w-59 p-3 z-[101]"
                      >
                        <ColorPicker
                          varName={varName}
                          valueHsl={colorHsl}
                          valueHex={colorHex}
                          onChange={(newColor) =>
                            handleGroupColorChange(varName, newColor)
                          }
                          isLocked={locked}
                          toggleLock={(value) =>
                            handleGroupLock(varName, value)
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {varNames.map((varName) => (
                    <p key={varName}>{varName}</p>
                  ))}
                </TooltipContent>
              </Tooltip>
            )
          )}
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
