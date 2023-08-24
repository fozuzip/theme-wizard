"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import useTheme from "@/hooks/useTheme";
import { ColorSelect } from "@/components/color-select";
import { Button } from "@/components/ui/button";

export const Toolbar = () => {
  const { theme, setName, setColor, addColor } = useTheme();

  return (
    <div className="w-28 rounded-sm bg-white/25 flex flex-col p-2 space-y-2 text-sm ">
      {theme.map(({ id, name, color }, index) => (
        <ColorSelect
          key={id}
          value={color}
          onChange={setColor(index)}
          name={name}
          onNameChange={setName(index)}
        />
      ))}
      <Button
        variant="ghost"
        className="bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 hover:scale-105 transition"
        onClick={addColor}
      >
        <Plus className="w-5 h-5" />
      </Button>
    </div>
  );
};
