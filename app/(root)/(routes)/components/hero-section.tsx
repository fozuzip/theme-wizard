"use client";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Blobs } from "@/components/blobs";
import useColors from "@/theme/useColor";
import { useEffect } from "react";

export const HeroSection = () => {
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
      <section id="hero" className="flex h-[600px] rounded-lg py-8">
        <div className="p-2 pr-20 border border-transparent flex flex-col h-full justify-around">
          <h3
            className="h-7 text-base font-semibold leading-7 text-primary"
            aria-hidden="true"
          >
            An interactive design tool
          </h3>

          <h1 className="col-start-1 row-start-2 mt-4 max-w-[36rem] text-4xl font-extrabold tracking-tight text-foreground sm:text-7xl xl:max-w-[43.5rem] apply-font-heading">
            Discover the{" "}
            <span className="bg-gradient-to-r from-primary to-destructive bg-clip-text text-transparent ">
              theme
            </span>
            <br />
            of your next project
          </h1>

          <p className="col-start-1 row-start-3 mt-4 max-w-xl text-lg text-muted-foreground">
            A simple, intuitive tool for theming{" "}
            <span className="text-primary text-bold">tailwind</span> and{" "}
            <span className="text-primary text-bold">shadcn/ui</span> apps. Use
            the toolbar on top to try different color palettes and fonts. Click
            any element on the page to fine-tune your design.
          </p>

          <div className="col-start-1 row-start-4 mt-10 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button
              variant="outline"
              className="flex gap-2 items-center font-semibold"
            >
              Browse Examples
              <ArrowRight size={16} />
            </Button>

            <Button className="flex gap-2 items-center font-semibold">
              Get Started
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>

        <div className="flex-1  h-full flex flex-col justify-center">
          <div className="w-full h-[400px] border border-transparent no-container">
            <Blobs />
          </div>
        </div>
      </section>
    </>
  );
};
