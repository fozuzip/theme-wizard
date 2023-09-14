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

interface ColorInspectProps {
  children: React.ReactNode;
  as?: React.ElementType;
  side?: "left" | "right" | "top" | "bottom";
}

export const ColorInspect = ({
  children,
  as,
  side = "right",
}: ColorInspectProps) => {
  const [hex, setHex] = useState("#40a0d4");
  const [hex2, setHex2] = useState("#ed2140");

  const Element = as || "span";

  const [width, setWidth] = useState(0);

  const elementRef = useRef(null);

  useEffect(() => {
    setWidth(elementRef.current?.offsetWidth);
  }, []);

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
          <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger asChild>
                <div className="w-[200px] flex justify-between items-center p-2 mb-2 hover:bg-muted rounded-md">
                  <div>Text Color</div>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <ColorButton
                        hex={hex}
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
                        <DropdownMenuItem
                          className="rounded-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log("Click");
                          }}
                        >
                          <ColorButton hex="#40a0d4" />
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ColorButton hex="#40a0d4" />
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ColorButton hex="#40a0d4" />
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ColorButton hex="#40a0d4" />
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ColorButton hex="#40a0d4" />
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ColorPicker value={hex} onChange={setHex} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <div className="w-[200px] flex justify-between items-center p-2 mb-2 hover:bg-muted rounded-md ">
                  <div>Text Color</div>
                  <ColorButton
                    hex={hex2}
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("clicked");
                    }}
                  />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ColorPicker value={hex2} onChange={setHex} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
