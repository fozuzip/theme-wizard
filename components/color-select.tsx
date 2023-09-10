import chroma from "chroma-js";
import { cn, cssVarStringToHsl } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ColorPicker } from "@/components/color-picker";
import { ClipboardButton } from "@/components/clipboard-button";
import { HexInput } from "@/components/hex-input";

interface ColorSelectProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  onNameChange: (name: string) => void;
}

// TODO: Create css variables for these colors outside of the theme
const darkText = "#0F172A";
const lightText = "#F8FAFC";

export const ColorSelect = ({
  name,
  value,
  onChange,
  onNameChange,
}: ColorSelectProps) => {
  const hsl = cssVarStringToHsl(value, true);
  // @ts-ignore
  const hex = chroma(hsl).hex();

  // TODO: Get the correct color value
  const contrast = chroma.contrast(hex, lightText);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center cursor-pointer">
          <div
            className="flex h-6 w-6 items-center justify-center rounded-full ring-2 ring-offset-2 ring-offset-background"
            style={{ backgroundColor: hex }}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent sideOffset={14} className="w-59 p-3">
        <div className="flex flex-col items-center justify-center space-y-2">
          <ColorPicker value={value} onChange={onChange} />
          <Input
            placeholder="Name the variable..."
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="text-center w-[200px]"
          />
          <div className="flex w-full items-center space-x-2">
            <HexInput value={hex} onChange={onChange} className="w-[150px]" />
            <ClipboardButton value={hex} />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
