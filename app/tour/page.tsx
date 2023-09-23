import { HeroSection } from "./components/hero-section";
import { HowDoesItWork } from "./components/how-does-it-work";

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="pt-[200px]">
        <HowDoesItWork />
      </div>
    </>
  );
}
