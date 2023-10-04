"use client";

import { HeroSection } from "./components/hero-section";
import { Examples } from "./components/examples";
import { useEffect } from "react";
import useColors from "@/theme/useColor";
import { Features, HowTo } from "./components/more";

export default function Home() {
  const { headingFont } = useColors();

  useEffect(() => {
    // Select all heading elements (h1, h2, h3, etc.)
    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");

    // Add the 'apply-font' class to each heading element
    headings.forEach((heading) => {
      heading.classList.add("apply-font-heading");
    });
  }, [headingFont]); // The empty dependency array ensures this effect runs only once

  return (
    <>
      <div className="bg-background text-foreground ">
        <HeroSection />
        <div className="pt-32">
          <Examples />
        </div>
        <Features />
        <HowTo />
      </div>
    </>
  );
}
