"use client";

import useColors from "@/theme/useColor";
import { Hsl, hexToHsl } from "@/theme/utils";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { useMemo } from "react";
import { Selection } from "./click-detector";
import { ColorButton } from "./color-button";
import { ColorPicker } from "./color-picker";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Tooltip, TooltipContent } from "./ui/tooltip";

interface ColorsToolbarProps {
  selection?: Selection | null;
  popoverAsModal?: boolean;
}

export const ColorsToolbar = ({
  selection,
  popoverAsModal,
}: ColorsToolbarProps) => {
  const { colors, setBatchColors, save, setBatchLock } = useColors();

  const selectionVarNames = selection
    ? selection.colors.map((color) => `--${color}`)
    : [];

  const groupedColors = useMemo(() => {
    if (selection === null) return [];
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

  const getDisplayVarName = (varName: string) => {
    const words = varName.split("-");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  };

  return (
    <div
      className="flex items-center space-x-4 z-10"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {groupedColors.map(
        ({ varName, colorHex, colorHsl, locked, varNames }) => (
          <Popover
            key={varName}
            onOpenChange={(open) => {
              if (!open) {
                save();
              }
            }}
            modal={popoverAsModal}
          >
            <PopoverTrigger>
              <Tooltip delayDuration={300}>
                <TooltipTrigger>
                  <ColorButton
                    hex={colorHex}
                    isLocked={locked}
                    onLockToggle={(value) => handleGroupLock(varName, value)}
                  />
                </TooltipTrigger>

                <TooltipContent>
                  <>
                    <div className="font-bold pb-2">{colorHex}</div>

                    <ul className="text-left pb-2">
                      {varNames.map((varName) => (
                        <li key={varName}>{getDisplayVarName(varName)}</li>
                      ))}
                    </ul>
                  </>
                </TooltipContent>
              </Tooltip>
            </PopoverTrigger>
            <PopoverContent sideOffset={14} className="w-59 p-3 z-[101]">
              <ColorPicker
                varName={varName}
                valueHsl={colorHsl}
                valueHex={colorHex}
                onChange={(newColor) =>
                  handleGroupColorChange(varName, newColor)
                }
                isLocked={locked}
                toggleLock={(value) => handleGroupLock(varName, value)}
              />
            </PopoverContent>
          </Popover>
        )
      )}
    </div>
  );
};
