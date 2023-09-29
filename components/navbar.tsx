"use client";

import { ArrowRight, Redo, Undo, Paintbrush } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useColors from "@/theme/useColor";
import { ExportCode } from "./export-code";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "./ui/dialog";
import { ModeToggle } from "./mode-toggle";
import { BorderRadiusSelect } from "./border-radius-select";
import { FontsPopover } from "./fonts-popover";
import { Selection } from "./click-detector";

import { ColorsToolbar } from "./colors-toolbar";

interface NavbarProps {
  selection: Selection | null;
}

export const Navbar = ({ selection }: NavbarProps) => {
  const { undo, canUndo, redo, canRedo } = useColors();

  // TODO : Multiple hotkeys ?
  useHotkeys(
    "ctrl+z",
    () => {
      if (canUndo) undo();
    },
    []
  );
  useHotkeys(
    "shift+ctrl+z",
    () => {
      if (canRedo) redo();
    },
    []
  );

  return (
    <header className="fixed top-0 z-[100] w-full flex-none text-sm font-semibold leading-6 bg-background border-b">
      <Dialog>
        <nav className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center py-[1rem]">
            <a className="flex gap-3 items-center cursor-pointer">
              <Paintbrush className="w-8 h-8" />
              <h1 className="font-bold text-2xl">theme wizard</h1>
            </a>
            <Separator orientation="vertical" className="h-6 mx-6" />
            <div className="flex-1">
              <ColorsToolbar selection={selection} />
            </div>

            <div className="flex items-center space-x-3">
              <FontsPopover />
              <BorderRadiusSelect />
              <Separator orientation="vertical" className="h-6 ml-6 mx-4" />
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
              <ModeToggle />
              <DialogTrigger>
                <Button className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 -my-2.5">
                  <div className="flex gap-2 items-center font-semibold ">
                    Export theme
                    <ArrowRight size={16} />
                  </div>
                </Button>
              </DialogTrigger>
            </div>
          </div>
        </nav>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Theme</DialogTitle>
            <DialogDescription>
              Copy and paste the following code into your globals.css file.
            </DialogDescription>
          </DialogHeader>
          <ExportCode />
        </DialogContent>
      </Dialog>
    </header>
  );
};
