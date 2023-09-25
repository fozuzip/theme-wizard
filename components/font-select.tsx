"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { getFontOptions } from "@/lib/fonts-api";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useMemo, useState } from "react";
import { Label } from "./ui/label";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

interface FontSelectProps {
  name: string;
}

export function FontSelect() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const [fontOptions, setFontOptions] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);

  const [search, setSearch] = useState("");

  const options = useMemo(() => {
    let options = [...fontOptions];

    if (search.length > 0)
      options = options.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase())
      );

    if (options.length < 40) return options;
    else return options.slice(0, 40);
  }, [fontOptions, search]);

  useEffect(() => {
    const getFonts = async () => {
      const fonts = await getFontOptions();
      if (fonts) setFontOptions(fonts);
    };
    getFonts();
  }, []);

  console.log(value, options);

  return (
    <div>
      <Label>Body</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? fontOptions.find((options) => options.value === value)?.label
              : "Select Font Family..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder="Search framework..."
              onValueChange={(value) => setSearch(value)}
            />
            <CommandEmpty>No Font Family found.</CommandEmpty>
            <CommandGroup className="max-h-[400px] overflow-auto">
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={(currentValue) => {
                    const selectedOption = options.find(
                      (option) =>
                        option.label.toLocaleLowerCase() === currentValue
                    );
                    if (selectedOption) {
                      setValue(
                        selectedOption.value === value
                          ? ""
                          : selectedOption.value
                      );
                      setOpen(false);
                    } else {
                      console.error("Option not found", currentValue);
                    }
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
