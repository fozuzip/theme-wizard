"use client";

import { ArrowRight } from "lucide-react";

import { ColorInspect } from "@/components/color-inspect";
import { Graphic } from "@/components/graphic";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="flex h-[400px]">
      <div>
        <div
          className="h-7 text-base font-semibold leading-7 text-primary"
          aria-hidden="true"
        >
          <ColorInspect
            colors={[{ label: "Primary Text", value: "--primary" }]}
          >
            An interactive design tool
          </ColorInspect>
        </div>

        <h1 className="col-start-1 row-start-2 mt-4 max-w-[36rem] text-4xl font-extrabold tracking-tight text-foreground sm:text-7xl xl:max-w-[43.5rem]">
          <ColorInspect colors={[{ label: "Text", value: "--foreground" }]}>
            Watch your{" "}
          </ColorInspect>{" "}
          <span className="bg-gradient-to-r from-primary to-destructive bg-clip-text text-transparent ">
            <ColorInspect
              colors={[
                { label: "Gradient Start", value: "--primary" },
                { label: "Gradient Finish", value: "--destructive" },
              ]}
            >
              theme
            </ColorInspect>
          </span>
          <ColorInspect colors={[{ label: "Text", value: "--foreground" }]}>
            come to life
          </ColorInspect>
        </h1>

        <ColorInspect
          colors={[{ label: "Secondary text", value: "--foreground" }]}
        >
          <p className="col-start-1 row-start-3 mt-4 max-w-lg text-lg text-foreground/60">
            Choose the colour pallete for your next app, website, blog.
            Optimized to work with tailwind css and shadcn-ui.
          </p>
        </ColorInspect>

        <div className="col-start-1 row-start-4 mt-10 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button variant="outline">
            <div className="flex gap-2 items-center font-semibold">
              Browse Examples
              <ArrowRight size={16} />
            </div>
          </Button>
          <ColorInspect
            colors={[
              {
                label: "Button Background",
                value: "--primary",
              },
              {
                label: "Button Text",
                value: "--primary-foreground",
              },
            ]}
          >
            <Button>
              <div className="flex gap-2 items-center font-semibold">
                Get Started
                <ArrowRight size={16} />
              </div>
            </Button>
          </ColorInspect>
        </div>
      </div>
      <div className="flex-1">
        <Graphic />
      </div>
    </section>
  );
};
