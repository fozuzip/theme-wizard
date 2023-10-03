import { cn } from "@/lib/utils";
import chroma from "chroma-js";
import { Lock, Unlock } from "lucide-react";

interface ColorButtonProps {
  hex: string;
  onClick?: (e: React.MouseEvent) => void;
  isLocked?: boolean;
  onLockToggle?: (value: boolean) => void;
}

export const ColorButton = ({ hex, onClick, isLocked }: ColorButtonProps) => {
  const textColor = chroma.contrast(hex, "#000") >= 4.5 ? "black" : "white";

  const LockIcon = isLocked ? Lock : Unlock;

  return (
    <div
      className="relative group flex items-center cursor-pointer ring-0"
      onClick={onClick}
    >
      <div
        className="flex h-6 w-6 items-center justify-center rounded-full ring-2 ring-offset-2 ring-offset-background"
        style={{ backgroundColor: hex, color: textColor }}
      >
        <LockIcon
          className={cn(
            "w-3 h-3 text-bold transition-opacity",
            isLocked ? "opacity-100" : "opacity-0"
          )}
        />
      </div>
    </div>
  );
};
