import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface BorderRadiusSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const BorderRadiusSelect = ({
  value,
  onChange,
}: BorderRadiusSelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="border-0 w-[100px] hover:bg-accent hover:text-accent-foreground">
        <div className="w-5 h-5 border-white border rounded-md" />
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
