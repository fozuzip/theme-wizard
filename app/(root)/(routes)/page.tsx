"use client";

import { useEffect } from "react";
import useColors from "@/theme/useColor";

import { HeroSection } from "./components/hero-section";
import { Examples } from "./components/examples";
import { Features } from "./components/more";
import { ChevronsDown } from "lucide-react";

export default function Home() {
  const { headingFont } = useColors();

  useEffect(() => {
    // Select all heading elements (h1, h2, h3, etc.)
    const headings = document
      ? document.querySelectorAll("h1, h2, h3, h4, h5, h6")
      : [];

    // Add the 'apply-font' class to each heading element
    headings.forEach((heading) => {
      heading.classList.add("apply-font-heading");
    });
  }, [headingFont]); // The empty dependency array ensures this effect runs only once

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
