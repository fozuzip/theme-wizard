import { Lock } from "lucide-react";

interface ColorButtonProps {
  hex: string;
  onClick?: (e: React.MouseEvent) => void;
  isLocked?: boolean;
}

export const ColorButton = ({ hex, onClick, isLocked }: ColorButtonProps) => {
  return (
    <div className="flex items-center cursor-pointer ring-0" onClick={onClick}>
      <div
        className="flex h-6 w-6 items-center justify-center rounded-full ring-2 ring-offset-2 ring-offset-background"
        style={{ backgroundColor: hex }}
      >
        {isLocked && <Lock className="w-3 h-3 font-bold text-foreground" />}
      </div>
    </div>
  );
};
