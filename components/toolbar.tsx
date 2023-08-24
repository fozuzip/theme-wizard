"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import useThemeVariable from "@/hooks/useThemeVariable";
import { ColorSelect } from "@/components/color-select";
import { Button } from "@/components/ui/button";

export const Toolbar = () => {
  const [name1, setName1] = useState("Background");
  const [color1, setColor1] = useThemeVariable("222.2 84% 4.9%", [
    "--background",
    "--card",
    "--popover",
  ]);

  const [name2, setName2] = useState("Text");
  const [color2, setColor2] = useThemeVariable("210 40% 98%", [
    "--foreground",
    "--card-foreground",
    "--popover-foreground",
    "--primary",
    "--secondary-foreground",
    "--accent-foreground",
    "--destructive-foreground",
  ]);

  const [name3, setName3] = useState("Primary");
  const [color3, setColor3] = useThemeVariable("217.2 32.6% 17.5%", [
    "--secondary",
    "--muted",
    "--accent",
    "--border",
    "--input",
  ]);

  const [name4, setName4] = useState("Secondary");
  const [color4, setColor4] = useThemeVariable("222.2 47.4% 11.2%", [
    "--primary-foreground",
  ]);

  const [name5, setName5] = useState("Accent");
  const [color5, setColor5] = useThemeVariable("212.7 26.8% 83.9%", [
    "--ring",
    "--muted-foreground",
  ]);

  return (
    <div className="w-28 rounded-sm bg-white/25 flex flex-col p-2 space-y-2 text-sm ">
      <ColorSelect
        value={color1}
        onChange={setColor1}
        name={name1}
        onNameChange={setName1}
      />
      <ColorSelect
        value={color2}
        onChange={setColor2}
        name={name2}
        onNameChange={setName2}
      />
      <ColorSelect
        value={color3}
        onChange={setColor3}
        name={name3}
        onNameChange={setName3}
      />
      <ColorSelect
        value={color4}
        onChange={setColor4}
        name={name4}
        onNameChange={setName4}
      />
      <ColorSelect
        value={color5}
        onChange={setColor5}
        name={name5}
        onNameChange={setName5}
      />
      <Button
        variant="ghost"
        className="bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 hover:scale-105 transition"
      >
        <Plus className="w-5 h-5" />
      </Button>
    </div>
  );
};
