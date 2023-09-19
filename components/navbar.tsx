"use client";

import { ArrowRight, Dice5, MoonStar, Redo, Undo } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useIsScrolled from "@/hooks/useIsScrolled";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ColorButton } from "./color-button";
import { ColorPicker } from "./color-picker";
import useColors from "@/hooks/useColor";

export const Navbar = () => {
  const { uniqueColors, setUniqueColor, undo, canUndo, redo, canRedo, save } =
    useColors();

  const isScrolled = useIsScrolled();

  useHotkeys(
    "ctrl+z",
    () => {
      if (canUndo) undo();
    },
    [undo]
  );
  useHotkeys(
    "shift+ctrl+z",
    () => {
      if (canRedo) redo();
    },
    [redo]
  );

  return (
    <header
      className={cn(
        "sticky top-0  z-50 w-full flex-none text-sm font-semibold leading-6 bg-background",
        isScrolled && "border-b"
      )}
    >
      <nav className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "relative flex items-center py-[2.125rem] transition-all",
            isScrolled && "py-[1rem]"
          )}
        >
          <a className="flex gap-3 items-center cursor-pointer">
            <Logo />
            <h1 className="font-bold text-2xl">theme wizard</h1>
          </a>
          <div className="ml-auto flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <p>Theme Colors</p>
              {uniqueColors.map(({ varName, colorHex, colorHsl }) => (
                <Popover
                  key={varName}
                  onOpenChange={(open) => {
                    if (!open) {
                      save();
                    }
                  }}
                >
                  <PopoverTrigger>
                    <ColorButton hex={colorHex} />
                  </PopoverTrigger>
                  <PopoverContent sideOffset={14} className="w-59 p-3">
                    <ColorPicker
                      valueHsl={colorHsl}
                      valueHex={colorHex}
                      onChange={(newColor) =>
                        setUniqueColor(colorHsl, newColor)
                      }
                    />
                  </PopoverContent>
                </Popover>
              ))}
            </div>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center space-x-2">
              <Button size="icon" variant="ghost">
                <Dice5 size={20} />
              </Button>
              <Button size="icon" variant="ghost">
                <MoonStar size={20} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                disabled={!canUndo}
                onClick={() => undo()}
              >
                <Undo size={20} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                disabled={!canRedo}
                onClick={() => redo()}
              >
                <Redo size={20} />
              </Button>
            </div>
            <Button className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 -my-2.5">
              <div className="flex gap-2 items-center font-semibold ">
                Export theme
                <ArrowRight size={16} />
              </div>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};
