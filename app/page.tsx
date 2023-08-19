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
          <h1 className="font-bold text-4xl text-muted-foreground ">
            {background.value}
          </h1>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Change Colors</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="flex flex-col gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Background</h4>
                  <p className="text-sm text-muted-foreground">
                    Slide to change the background color
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Label>H</Label>
                  <Slider
                    value={[background.hue || 0]}
                    max={360}
                    step={1}
                    onValueChange={(values) => {
                      const value = values.at(0);
                      if (value) {
                        background.setHue(value);
                      }
                    }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label>S</Label>
                  <Slider
                    value={[background.saturation || 0]}
                    max={100}
                    step={1}
                    onValueChange={(values) => {
                      const value = values.at(0);
                      if (value) {
                        background.setSaturation(value);
                      }
                    }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label>L</Label>
                  <Slider
                    value={[background.lightness || 0]}
                    max={100}
                    step={1}
                    onValueChange={(values) => {
                      const value = values.at(0);
                      if (value) {
                        background.setLightness(value);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 mt-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Text</h4>
                  <p className="text-sm text-muted-foreground">
                    Slide to change the text color
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Label>H</Label>
                  <Slider
                    value={[mutedForeground.hue || 0]}
                    max={360}
                    step={1}
                    onValueChange={(values) => {
                      const value = values.at(0);
                      if (value) {
                        mutedForeground.setHue(value);
                      }
                    }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label>S</Label>
                  <Slider
                    value={[mutedForeground.saturation || 0]}
                    max={100}
                    step={1}
                    onValueChange={(values) => {
                      const value = values.at(0);
                      if (value) {
                        mutedForeground.setSaturation(value);
                      }
                    }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label>L</Label>
                  <Slider
                    value={[mutedForeground.lightness || 0]}
                    max={100}
                    step={1}
                    onValueChange={(values) => {
                      const value = values.at(0);
                      if (value) {
                        mutedForeground.setLightness(value);
                      }
                    }}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </main>
  );
}
