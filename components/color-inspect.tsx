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
import useTheme from "@/hooks/useTheme";
import { cssVarToHex } from "@/lib/utils";

interface ColorInspectProps {
  children: React.ReactNode;
  as?: React.ElementType;
  side?: "left" | "right" | "top" | "bottom";
  colors: {
    label: string;
    value: string;
  }[];
}

export const ColorInspect = ({
  children,
  as,
  side = "right",
  colors,
}: ColorInspectProps) => {
  const { theme, setColor, changeColor } = useTheme();

  const [width, setWidth] = useState(0);

  const elementRef = useRef(null);

  useEffect(() => {
    setWidth(elementRef.current?.offsetWidth);
  }, []);

  const Element = as || "span";

  const themeColors = colors.map(({ value, label }) => {
    const index = theme.findIndex((color) =>
      color.cssVariables.includes(value)
    );
    return {
      value,
      label,
      index,
    };
  });

  const renderInwards = window.innerWidth - width < 200 ? true : false;

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
            {themeColors.map(({ value, label, index }, i) => {
              return (
                <AccordionItem key={value} value={`item-${i}`} className="">
                  <AccordionTrigger asChild>
                    <div className="w-[200px] flex justify-between items-center p-2 mb-2 hover:bg-muted rounded-md">
                      <div>{label}</div>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <ColorButton
                            hex={theme[index].hex}
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
                          <DropdownMenuLabel>Select a color</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <div className="flex gap-2 p-2">
                            {theme
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
                              })}
                          </div>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-0">
                    <ColorPicker
                      value={theme[index].color}
                      onChange={setColor(index)}
                    />
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
