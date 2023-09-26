"use client";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Blobs } from "@/components/blobs";

export const HeroSection = () => {
  return (
    <section className="flex h-[400px] rounded-lg py-8">
      <div className="p-2 pr-20">
        <h3
          className="h-7 text-base font-semibold leading-7 text-primary"
          aria-hidden="true"
        >
          An interactive design tool
        </h3>

        <h1 className="col-start-1 row-start-2 mt-4 max-w-[36rem] text-4xl font-extrabold tracking-tight text-foreground sm:text-7xl xl:max-w-[43.5rem] apply-font-heading">
          Watch your{" "}
          <span className="bg-gradient-to-r from-primary to-destructive bg-clip-text text-transparent ">
            theme
          </span>{" "}
          come to life
        </h1>

        <p className="col-start-1 row-start-3 mt-4 max-w-lg text-lg text-muted-foreground">
          Choose the colour pallete for your next app, website, blog. Optimized
          to work with tailwind css and shadcn-ui.
        </p>

        <div className="col-start-1 row-start-4 mt-10 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button
            variant="outline"
            className="flex gap-2 items-center font-semibold"
          >
            Browse Examples
            <ArrowRight size={16} />
          </Button>

          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("click click mf");
            }}
            className="flex gap-2 items-center font-semibold"
          >
            Get Started
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>

      <div className="flex-1 border border-transparent">
        <Blobs />
      </div>
    </section>
  );
};
