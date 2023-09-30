import { cn } from "@/lib/utils";
import chroma from "chroma-js";
import { Lock, Unlock } from "lucide-react";

interface ColorButtonProps {
  hex: string;
  onClick?: (e: React.MouseEvent) => void;
  isLocked?: boolean;
  onLockToggle?: (value: boolean) => void;
}

export const ColorButton = ({
  hex,
  onClick,
  isLocked,
  onLockToggle,
}: ColorButtonProps) => {
  const textColor = chroma.contrast(hex, "#000") >= 4.5 ? "black" : "white";

  const handleToggleLock = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLockToggle?.(!isLocked);
  };

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
      {onLockToggle && (
        <div
          className="absolute left-0 w-full -bottom-6 h-4 cursor-pointer "
          onClick={handleToggleLock}
        >
          <div
            className={cn(
              "w-full h-1 mt-3 rounded-sm group-hover:mt-1 group-hover:h-3 transition-all",
              isLocked ? "bg-red-300/70" : "bg-green-300/30"
            )}
          />
        </div>
      )}
    </div>
  );
};
