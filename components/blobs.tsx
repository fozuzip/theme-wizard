import { cn } from "@/lib/utils";
import useColors from "@/theme/useColor";

export const Blobs = () => {
  const { mode } = useColors();
  return (
    <div className="w-full h-full relative group">
      <div
        className={cn(
          "absolute left-0 top-0 w-72 h-72  animate-blob ",
          mode === "light" ? "mix-blend-multiply" : "mix-blend-plus-lighter"
        )}
      >
        <div
          className={cn(
            "w-72 h-72 bg-primary rounded-full filter blur-xl opacity-70 group-hover:opacity-100  transition-opacity duration-1000",
            mode === "light" ? "mix-blend-multiply" : "mix-blend-plus-lighter"
          )}
        />
      </div>
      <div
        className={cn(
          "absolute top-8 right-0 w-72 h-72 animate-blob animation-delay-2000",
          mode === "light" ? "mix-blend-multiply" : "mix-blend-plus-lighter"
        )}
      >
        <div
          className={cn(
            "w-72 h-72 bg-destructive rounded-full filter blur-xl  opacity-70 group-hover:opacity-100 transition-opacity duration-1000 ",
            mode === "light" ? "mix-blend-multiply" : "mix-blend-plus-lighter"
          )}
        />
      </div>
      <div
        className={cn(
          "absolute left-28 -bottom-16 w-72 h-72 animate-blob animation-delay-4000 ",
          mode === "light" ? "mix-blend-multiply" : "mix-blend-plus-lighter"
        )}
      >
        <div
          className={cn(
            "w-72 h-72 bg-ring rounded-full filter blur-xl  opacity-70 group-hover:opacity-100 transition-opacity duration-1000 ",
            mode === "light" ? "mix-blend-multiply" : "mix-blend-plus-lighter"
          )}
        />
      </div>
    </div>
  );
};
