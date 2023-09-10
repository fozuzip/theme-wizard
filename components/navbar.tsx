"use client";

import { ArrowRight, Dice5, MoonStar, Redo, Undo } from "lucide-react";

import useTheme from "@/hooks/useTheme";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ColorSelect } from "@/components/color-select";

export const Navbar = () => {
  const { theme, setName, setColor, addColor } = useTheme();

  return (
    <header className="relative z-50 w-full flex-none text-sm font-semibold leading-6 ">
      <nav className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center py-[2.125rem]">
          <a className="flex gap-3 items-center cursor-pointer">
            <Logo />
            <h1 className="font-bold text-2xl">theme wizard</h1>
          </a>
          <div className="ml-auto flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <p>Theme Colors</p>
              {theme.map(({ id, name, color }, index) => (
                <ColorSelect
                  key={id}
                  value={color}
                  onChange={setColor(index)}
                  name={name}
                  onNameChange={setName(index)}
                />
              ))}
            </div>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center space-x-2">
              <Button size="icon" variant="ghost">
                <Dice5 size={20} />
              </Button>
              <Button size="icon" variant="ghost">
                <MoonStar size={20} />
              </Button>
              <Button size="icon" variant="ghost">
                <Undo size={20} />
              </Button>
              <Button size="icon" variant="ghost">
                <Redo size={20} />
              </Button>
            </div>
            <Button className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 -my-2.5">
              <div className="flex gap-2 items-center font-semibold text-black">
                Extract Code
                <ArrowRight size={16} />
              </div>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};
