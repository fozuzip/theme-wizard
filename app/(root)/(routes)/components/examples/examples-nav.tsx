"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { Cards } from "./cards";
import { Tasks } from "./tasks";
import { Playground } from "./playground";

const examples = [
  {
    name: "Cards",
    key: "cards",
  },
  {
    name: "Tasks",
    key: "tasks",
  },
  {
    name: "Playground",
    key: "playground",
  },
  {
    name: "Forms",
    key: "forms",
  },
];

interface ExamplesNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ExamplesNav({ className, ...props }: ExamplesNavProps) {
  const [selected, setSelected] = useState("tasks");

  return (
    <div className="relative">
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div className={cn("mb-4 flex items-center", className)} {...props}>
          {examples.map((example) => (
            <div
              onClick={() => setSelected(example.key)}
              key={example.key}
              className={cn(
                "flex items-center px-4 cursor-pointer",
                selected === example.key
                  ? "font-bold text-primary"
                  : "font-medium text-muted-foreground"
              )}
            >
              {example.name}
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
      <Link
        href="#"
        target="_blank"
        rel="nofollow"
        className="absolute right-0 top-0 hidden items-center rounded-[0.5rem] text-sm font-medium md:flex"
      >
        View code
        <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
      <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
        {selected === "cards" && <Cards />}
        {selected === "tasks" && <Tasks />}
        {selected === "playground" && <Playground />}
      </div>
    </div>
  );
}
