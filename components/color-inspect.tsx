"use client";

import { useEffect, useRef, useState } from "react";
import { ColorButton } from "./color-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { ColorPicker } from "./color-picker";
import useColors, { Color } from "@/hooks/useColor";

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
  const { colors, getColor, setColor } = useColors();

  let themeColors = varNames
    .map(getColor)
    .filter((color) => color !== undefined) as Color[];
  // console.log(themeColors);

  // Check Width to deside if we should render the dropdown inwards or outwards
  const [width, setWidth] = useState(0);
  const elementRef = useRef(null);
  useEffect(() => {
    setWidth(elementRef.current?.offsetWidth);
  }, []);
  const renderInwards = window.innerWidth - width < 200 ? true : false;

  const Element = as || "span";

  return (
    <DropdownMenu>
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
              ({ displayName, varName, colorHex, colorHsl }, i) => {
                return (
                  <AccordionItem key={varName} value={`item-${i}`} className="">
                    <AccordionTrigger asChild>
                      <div className="w-[200px] flex justify-between items-center p-2 mb-2 hover:bg-muted rounded-md">
                        <div>{displayName}</div>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <ColorButton
                              hex={colorHex}
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log("clicked");
                              }}
                            />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            side="right"
                            align="start"
                            alignOffset={-62}
                            sideOffset={24}
                          >
                            <DropdownMenuLabel>
                              Select a color
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <div className="flex gap-2 p-2">
                              {/* {theme
                              .filter(
                                ({ cssVariables }) =>
                                  !cssVariables.includes(value)
                              )
                              .map(({ id, hex }, index) => {
                                return (
                                  <DropdownMenuItem
                                    key={id}
                                    className="rounded-sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      changeColor(value, id);
                                    }}
                                  >
                                    <ColorButton hex={hex} />
                                  </DropdownMenuItem>
                                );
                              })} */}
                            </div>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-0">
                      <ColorPicker
                        valueHsl={colorHsl}
                        valueHex={colorHex}
                        onChange={(newColor) => setColor(varName, newColor)}
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
