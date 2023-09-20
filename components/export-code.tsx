import useColors from "@/theme/useColor";
import { parseColors } from "@/theme/utils";
import { ClipboardButton } from "./clipboard-button";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";

export const ExportCode = () => {
  const [singleMode, setSingleMode] = useState(false);
  const { colors, otherModeColors, mode } = useColors();

  let lightModeStr = parseColors(mode === "light" ? colors : otherModeColors);
  let darkModeStr = parseColors(mode === "dark" ? colors : otherModeColors);

  const colorStr = singleMode
    ? `
  @layer base {
    :root {
      ${mode === "light" ? lightModeStr : darkModeStr}
      --radius: 0.5rem;
    }
  }    
  `
    : `
@layer base {
  :root {
    ${lightModeStr}
    --radius: 0.5rem;
  }
  
  .dark {
    ${darkModeStr}
  }
}
  `;

  return (
    <div>
      <div className="flex items-center space-x-2 pb-4">
        <Checkbox
          id="check"
          checked={singleMode}
          onCheckedChange={(checked) => setSingleMode(!!checked)}
        />
        <label
          htmlFor="check"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Include only current mode
        </label>
      </div>
      <div className="group relative">
        <pre className="max-h-[450px] overflow-x-auto rounded-lg border bg-muted px-4 ">
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {colorStr}
          </code>
        </pre>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-0 right-0 p-4">
          <ClipboardButton value={colorStr} />
        </div>
      </div>
    </div>
  );
};
