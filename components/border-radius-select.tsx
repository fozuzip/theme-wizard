"use cleint";

import useColors from "@/theme/useColor";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "@/lib/utils";

export const BorderRadiusSelect = () => {
  const { borderRadius, setBorderRadius, mode } = useColors();

  return (
    <Select value={borderRadius} onValueChange={setBorderRadius}>
      <SelectTrigger
        className="border-0 w-[80px] hover:bg-accent hover:text-accent-foreground"
        showChevron={false}
      >
        <div
          className={cn(
            "w-5 h-5 border rounded-md ",
            mode === "light" ? "border-black" : "border-white"
          )}
        />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="px-2">Border Radius</SelectLabel>
          <SelectItem value="0rem">0</SelectItem>
          <SelectItem value="0.3rem">0.3</SelectItem>
          <SelectItem value="0.5rem">0.5</SelectItem>
          <SelectItem value="0.75rem">0.75</SelectItem>
          <SelectItem value="1.0rem">1.0</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
