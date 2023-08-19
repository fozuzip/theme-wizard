"use client";

import { useState, useEffect } from "react";

import useCssColor from "@/hooks/useCssColor";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import ColorPicker from "@/components/color-picker";

enum ColorProperty {
  hue = "hue",
  saturation = "saturation",
  lightness = "lightness",
}

export default function Home() {
  const background = useCssColor("background");

  const mutedForeground = useCssColor("muted-foreground");

  return (
    <main className="h-full bg-background">
      <div className="flex h-full justify-center items-center">
        <div className="flex flex-col space-y-4 items-center">
          <ColorPicker color={background} />
        </div>
      </div>
    </main>
  );
}
