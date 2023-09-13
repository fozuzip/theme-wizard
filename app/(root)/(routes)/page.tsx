import { Navbar } from "@/components/navbar";
import { HeroSection } from "./components/hero-section";
import { Examples } from "./components/examples";

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="pt-32">
        <Examples />
      </div>
    </>
  );
}
