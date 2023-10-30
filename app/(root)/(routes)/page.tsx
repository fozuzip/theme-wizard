"use client";

import { useEffect } from "react";
import useColors from "@/theme/useColor";

import { HeroSection } from "./components/hero-section";
import { Examples } from "./components/examples";
import { Features } from "./components/more";
import { ChevronsDown } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="bg-background text-foreground ">
        <HeroSection />
        <div className="flex justify-center pt-[100px]">
          <ChevronsDown className="w-8 h-8 mx-auto mt-8 animate-bounce" />
        </div>
        <div className="pt-[40px]">
          <Examples />
        </div>
        <Features />
      </div>
    </>
  );
}
