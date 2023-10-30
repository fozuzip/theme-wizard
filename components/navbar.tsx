"use client";

import {
  ArrowRight,
  Dice5,
  Github,
  GithubIcon,
  Lock,
  Paintbrush,
  Redo,
  Undo,
  Unlock,
} from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useColors from "@/theme/useColor";
import { BorderRadiusSelect } from "./border-radius-select";
import { ExportCode } from "./export-code";
import { FontsPopover } from "./fonts-popover";
import { ModeToggle } from "./mode-toggle";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { useEffect, useState } from "react";
import { ColorsToolbar } from "./colors-toolbar";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";

export const Navbar = () => {
  const { colors, undo, canUndo, redo, canRedo, setLockAllColors, randomize } =
    useColors();
  const [colorLock, setColorLock] = useState(false);

  // TODO : Multiple hotkeys ?
  useHotkeys(
    ["ctrl+z", "command+z"],
    () => {
      if (canUndo) undo();
    },
    [canUndo]
  );
  useHotkeys(
    ["ctrl+y", "command+y"],
    () => {
      if (canRedo) redo();
    },
    [canRedo]
  );

  useHotkeys(
    "l",
    () => {
      setColorLock(!colorLock);
      setLockAllColors(!colorLock);
    },
    [colorLock]
  );

  useHotkeys(
    ["space", "r"],
    (e) => {
      e.preventDefault();
      randomize();
    },
    []
  );

  useEffect(() => {
    if (colorLock) {
      const allUnlocked = colors.every(({ locked }) => !locked);
      if (allUnlocked) setColorLock(false);
    } else {
      const allLocked = colors.every(({ locked }) => locked);
      if (allLocked) setColorLock(true);
    }
  }, [colors, colorLock]);

  const isMac = /macintosh|mac os x/i.test(navigator.userAgent.toLowerCase());

  const LockIcon = colorLock ? Lock : Unlock;

  return (
    <header className="fixed top-0 z-[100] w-screen flex-none text-sm font-semibold leading-6 bg-background border-b">
      <nav className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center py-[1rem]">
          <a className="flex gap-3 items-center cursor-pointer">
            <Paintbrush className="w-8 h-8" />
            <h1 className="font-bold text-2xl">theme wizard</h1>
          </a>
          <Separator orientation="vertical" className="h-6 mx-6" />
          <div className="flex-1">
            <div className="flex items-center">
              <ColorsToolbar popoverAsModal />
              <Separator orientation="vertical" className="h-6 ml-6 mr-4" />

              <Tooltip delayDuration={300}>
                <TooltipTrigger>
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
                </TooltipTrigger>
                <TooltipContent>
                  <div className="p-1">
                    {!colorLock ? "Lock" : "Unlock"} all
                    <span className="bg-muted text-muted-foreground px-2 py-1 ml-2 rounded-md">
                      L
                    </span>
                  </div>
                </TooltipContent>
              </Tooltip>
              <Tooltip delayDuration={300}>
                <TooltipTrigger>
                  <Button size="icon" variant="ghost" onClick={randomize}>
                    <Dice5 size={20} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="p-2">
                    Randomize
                    <span className="bg-muted text-muted-foreground px-2 py-1 mx-2 rounded-md">
                      Space
                    </span>{" "}
                    /{" "}
                    <span className="bg-muted text-muted-foreground px-2 py-1 ml-2 rounded-md">
                      R
                    </span>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Tooltip delayDuration={300}>
              <TooltipTrigger>
                <FontsPopover />
              </TooltipTrigger>
              <TooltipContent>
                <div className="p-2">Fonts</div>
              </TooltipContent>
            </Tooltip>

            <Tooltip delayDuration={300}>
              <TooltipTrigger>
                <BorderRadiusSelect />
              </TooltipTrigger>
              <TooltipContent>
                <div className="p-2">Border radius</div>
              </TooltipContent>
            </Tooltip>
            <Separator orientation="vertical" className="h-6 ml-6 mx-4" />
            <Tooltip delayDuration={300}>
              <TooltipTrigger>
                <Button
                  size="icon"
                  variant="ghost"
                  disabled={!canUndo}
                  onClick={() => undo()}
                >
                  <Undo size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="p-2">
                  Undo
                  <span className="bg-muted text-muted-foreground px-2 py-1 ml-2 rounded-md">
                    {isMac ? "⌘ + Z" : "Ctrl + Z"}
                  </span>
                </div>
              </TooltipContent>
            </Tooltip>

            <Tooltip delayDuration={300}>
              <TooltipTrigger>
                <Button
                  size="icon"
                  variant="ghost"
                  disabled={!canRedo}
                  onClick={() => redo()}
                >
                  <Redo size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="p-2">
                  Redo
                  <span className="bg-muted text-muted-foreground px-2 py-1 ml-2 rounded-md">
                    {isMac ? "⌘ + Y" : "Ctrl + Y"}
                  </span>
                </div>
              </TooltipContent>
            </Tooltip>

            <ModeToggle />
            <Dialog>
              <DialogTrigger asChild>
                <Button className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 -my-2.5">
                  <div className="flex gap-2 items-center font-semibold ">
                    Export theme
                    <ArrowRight size={16} />
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Export Code</DialogTitle>
                </DialogHeader>
                <ExportCode />
              </DialogContent>
            </Dialog>
            <Tooltip delayDuration={300}>
              <TooltipTrigger>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() =>
                    window.open(
                      "https://github.com/fozuzip/theme-wizard",
                      "_blank"
                    )
                  }
                >
                  <Github size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="p-2">View Code</div>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </nav>
    </header>
  );
};
