"use client";

import { useEffect, useRef, useState } from "react";
import { ColorButton } from "./color-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { ColorPicker } from "./color-picker";
import useColors from "@/theme/useColor";
import { Color } from "@/theme/utils";

interface ColorInspectProps {
  children: React.ReactNode;
  as?: React.ElementType;
  side?: "left" | "right" | "top" | "bottom";
  varNames: string[];
}

export const ColorInspect = ({
  children,
  as,
  side = "right",
  varNames,
}: ColorInspectProps) => {
  const { getColor, setColor, save, setUniqueLock } = useColors();

  let themeColors = varNames
    .map(getColor)
    .filter((color) => color !== undefined) as Color[];

  // Check Width to deside if we should render the dropdown inwards or outwards
  const [width, setWidth] = useState(0);
  const elementRef = useRef(null);
  useEffect(() => {
    setWidth(elementRef.current?.offsetWidth);
  }, []);
  const renderInwards = window.innerWidth - width < 200 ? true : false;

  const Element = as || "span";

  return (
    <DropdownMenu
      modal
      onOpenChange={(open) => {
        if (!open) {
          save();
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <Element
          ref={elementRef}
          className="cursor-pointer select-none data-[state=open]:ring data-[state=open]:ring-offset-4 data-[state=open]:ring-offset-background data-[state=open]:ring-primary data-[state=open]:rounded-sm "
        >
          {children}
        </Element>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side={renderInwards ? "right" : side}
        align="start"
        sideOffset={renderInwards ? -240 : 12}
        alignOffset={renderInwards ? 12 : -8}
      >
        <DropdownMenuLabel>
          <Accordion type="single" collapsible defaultValue="item-0">
            {themeColors.map(
              ({ displayName, varName, colorHex, colorHsl, locked }, i) => {
                return (
                  <AccordionItem key={varName} value={`item-${i}`} className="">
                    <AccordionTrigger asChild>
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
                    </AccordionTrigger>
                    <AccordionContent className="pb-0">
                      <ColorPicker
                        valueHsl={colorHsl}
                        valueHex={colorHex}
                        onChange={(newColor) => setColor(varName, newColor)}
                        isLocked={locked}
                        toggleLock={(value) => setUniqueLock(colorHsl, value)}
                      />
                    </AccordionContent>
                  </AccordionItem>
                );
              }
            )}
          </Accordion>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
