import { ClickableComponent } from "@/components/clickable-component";
import { Graphic } from "@/components/graphic";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="flex h-[400px]">
      <div>
        <div
          className="h-7 text-base font-semibold leading-7 text-primary"
          aria-hidden="true"
        >
          <ClickableComponent>An interactive design tool</ClickableComponent>
        </div>

        <h1 className="col-start-1 row-start-2 mt-4 max-w-[36rem] text-4xl font-extrabold tracking-tight text-foreground sm:text-7xl xl:max-w-[43.5rem]">
          <ClickableComponent>
            Watch your{" "}
            <span className="bg-gradient-to-r from-primary to-destructive bg-clip-text text-transparent ">
              <ClickableComponent>theme</ClickableComponent>
            </span>{" "}
            come to life
          </ClickableComponent>
        </h1>

        <p className="col-start-1 row-start-3 mt-4 max-w-lg text-lg text-foreground/60">
          Choose the colour pallete for your next app, website, blog. Optimized
          to work with tailwind css and shadcn-ui.
        </p>
        <div className="col-start-1 row-start-4 mt-10 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button variant="outline">
            <div className="flex gap-2 items-center font-semibold">
              Browse Examples
              <ArrowRight size={16} />
            </div>
          </Button>
          <Button>
            <div className="flex gap-2 items-center font-semibold">
              Get Started
              <ArrowRight size={16} />
            </div>
          </Button>
        </div>
      </div>
      <div className="flex-1">
        <Graphic />
      </div>
    </section>
  );
};
