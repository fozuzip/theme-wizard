"use client";

import { MoonStar, Sun } from "lucide-react";
import { Button } from "./ui/button";
import useColors from "@/theme/useColor";
import { useHotkeys } from "react-hotkeys-hook";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export const ModeToggle = () => {
  const { mode, toggleMode } = useColors();

  useHotkeys("m", () => toggleMode(), []);

  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger>
        <Button size="icon" variant="ghost" onClick={toggleMode}>
          {mode === "light" ? <MoonStar size={20} /> : <Sun size={20} />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <div className="p-2">
          {mode === "light" ? "Dark" : "Light"} mode
          <span className="bg-muted text-muted-foreground px-2 py-1 ml-2 rounded-md">
            M
          </span>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};
