import chroma from "chroma-js";
import { cssVarStringToHsl } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ColorPicker } from "@/components/color-picker";
import { ColorButton } from "./color-button";

interface ColorSelectProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  onNameChange: (name: string) => void;
}

export const ColorSelect = ({
  name,
  value,
  onChange,
  onNameChange,
}: ColorSelectProps) => {
  const hsl = cssVarStringToHsl(value, true);
  // @ts-ignore
  const hex = chroma(hsl).hex();

  return (
    <Popover>
      <PopoverTrigger>
        <ColorButton hex={hex} />
      </PopoverTrigger>
      <PopoverContent sideOffset={14} className="w-59 p-3">
        <ColorPicker value={value} onChange={onChange} />
      </PopoverContent>
    </Popover>
  );
};
