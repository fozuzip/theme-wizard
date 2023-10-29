import Link from "next/link";

import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { Cards } from "./examples/cards";
import { Badge } from "@/components/ui/badge";

export function Examples() {
  const [selected, setSelected] = useState("cards");

  return (
    <section id="examples" className="mx-auto w-full max-w-container">
      <div className="flex justify-center text-center py-12">
        <h1 className="text-6xl font-bold tracking-tight">
          Customize with some
          <span className="bg-gradient-to-r from-primary to-destructive bg-clip-text text-transparent ">
            {" "}
            Examples
          </span>
        </h1>
      </div>
      <div className="relative">
        <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
          <Cards />
        </div>
      </div>
    </section>
  );
}
