"use client";

import useColors from "@/theme/useColor";

import { ColorButton } from "./color-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { ColorPicker } from "./color-picker";
import { useState } from "react";
import { set } from "date-fns";
import { cn } from "@/lib/utils";

interface ColorBackgroundSelectProps {
  children: React.ReactNode;
  varName: string;
  className?: string;
}

export const ColorBackgroundSelect = ({
  children,
  varName,
  className,
}: ColorBackgroundSelectProps) => {
  const [open, setOpen] = useState(false);
  const { getColor, setColor, save, setUniqueLock } = useColors();

  let themeColor = getColor(varName);
  if (!themeColor) return children;

  const { displayName, colorHex, colorHsl, locked } = themeColor;

  return (
    <div className="group relative">
      {children}

      <div
        className={cn(
          "absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity",
          open && "opacity-100",
          className
        )}
      >
        <DropdownMenu
          modal
          onOpenChange={(open) => {
            setOpen(open);
            if (!open) {
              save();
            }
          }}
        >
          <DropdownMenuTrigger>
            <ColorButton
              hex={themeColor.colorHex}
              isLocked={themeColor.locked}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="left"
            align="start"
            sideOffset={16}
            alignOffset={-18}
          >
            <DropdownMenuLabel>
              <div className="w-[200px] flex justify-between items-center p-2 mb-2 hover:bg-muted rounded-md">
                <div>{displayName}</div>

                <ColorButton
                  hex={colorHex}
                  isLocked={locked}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                />
              </div>

              <ColorPicker
                valueHsl={colorHsl}
                valueHex={colorHex}
                onChange={(newColor) => setColor(varName, newColor)}
                isLocked={locked}
                toggleLock={(value) => setUniqueLock(colorHsl, value)}
              />
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
