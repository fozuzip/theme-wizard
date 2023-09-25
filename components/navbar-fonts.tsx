"use client";

import {
  ArrowRight,
  Dice5,
  Heading,
  Heading1,
  Pilcrow,
  Redo,
  Undo,
} from "lucide-react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useIsScrolled from "@/hooks/useIsScrolled";
import { cn } from "@/lib/utils";

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
import FontPicker from "./font-picker";
import { useState } from "react";

import { useFont } from "@/hooks/useFont";
import { Label } from "./ui/label";

export const Navbar = () => {
  const { borderRadius, setBorderRadius, undo, canUndo, redo, canRedo } =
    useColors();

  const isScrolled = useIsScrolled();

  const { fonts } = useFont();

  const [bodyFont, setBodyFont] = useState("Inter");
  const [headingFont, setHeadingFont] = useState("Inter");

  const handleRandomize = () => {
    setBodyFont(fonts[Math.floor(Math.random() * fonts.length)].family);
    setHeadingFont(fonts[Math.floor(Math.random() * fonts.length)].family);
  };

  return (
    <Dialog>
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
            <div className="ml-auto flex items-center space-x-6">
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Heading className="w-6 h-6 pr-2" />
                  <FontPicker
                    pickerId="heading"
                    activeFontFamily={headingFont}
                    onChange={(nextFont) => setHeadingFont(nextFont.family)}
                  />
                </div>
                <div className="flex items-center">
                  <Pilcrow className="w-6 h-6 pr-2" />
                  <FontPicker
                    pickerId="body"
                    activeFontFamily={bodyFont}
                    onChange={(nextFont) => setBodyFont(nextFont.family)}
                  />
                </div>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center space-x-2">
                <Button size="icon" variant="ghost" onClick={handleRandomize}>
                  <Dice5 size={20} />
                </Button>
                <ModeToggle />
                <BorderRadiusSelect
                  value={borderRadius}
                  onChange={setBorderRadius}
                />
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
      </header>
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
  );
};
