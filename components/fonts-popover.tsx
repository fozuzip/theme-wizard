"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dice5, Type } from "lucide-react";
import { Button } from "./ui/button";
import useColors from "@/theme/useColor";
// import { useFont } from "@/hooks/useFont";
// import FontPicker from "./font-picker";

import dynamic from "next/dynamic";
const useFont = dynamic(
  () => import("@/hooks/useFont").then((mod) => mod.useFont),
  { ssr: false }
);
const FontPicker = dynamic(() => import("./font-picker"), { ssr: false });

export const FontsPopover = () => {
  const { bodyFont, headingFont, setBodyFont, setHeadingFont } = useColors();

  const { fonts } = useFont();

  const handleRandomize = (fontFamilyName: "body" | "heading") => {
    const newFontFamily =
      fonts[Math.floor(Math.random() * fonts.length)].family;
    if (fontFamilyName === "body") setBodyFont(newFontFamily);
    else setHeadingFont(newFontFamily);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost">
          <Type size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="space-y-4 w-[220px] flex flex-col items-center z-[101]">
        <div className="w-full">
          <p className="pb-2 text-sm">Heading</p>
          <div className="flex space-x-2">
            <FontPicker
              pickerId="heading"
              activeFontFamily={headingFont}
              onChange={(nextFont) =>
                nextFont && setHeadingFont(nextFont.family)
              }
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={() => handleRandomize("heading")}
              className="w-10"
            >
              <Dice5 className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <div className="w-full">
          <p className="pb-2 text-sm">Body</p>
          <div className="flex space-x-2">
            <FontPicker
              pickerId="body"
              activeFontFamily={bodyFont}
              onChange={(nextFont) => setBodyFont(nextFont.family)}
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={() => handleRandomize("body")}
              className="w-10"
            >
              <Dice5 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
