import { MoonStar, Sun } from "lucide-react";
import { Button } from "./ui/button";
import useColors from "@/theme/useColor";

export const ModeToggle = () => {
  const { mode, toggleMode } = useColors();
  return (
    <Button size="icon" variant="ghost" onClick={toggleMode}>
      {mode === "light" ? <MoonStar size={20} /> : <Sun size={20} />}
    </Button>
  );
};
