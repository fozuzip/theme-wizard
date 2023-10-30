import useColors from "@/theme/useColor";
import { parseColors } from "@/theme/utils";
import { ClipboardButton } from "./clipboard-button";
import { useState } from "react";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";

export const ExportCode = () => {
  const [singleMode, setSingleMode] = useState(false);
  const [shadcn, setShadcn] = useState(true);

  const { colors, otherModeColors, mode, bodyFont, headingFont, borderRadius } =
    useColors();

  let lightModeStr = parseColors(mode === "light" ? colors : otherModeColors);
  let darkModeStr = parseColors(mode === "dark" ? colors : otherModeColors);

  let colorStr;
  if (shadcn) {
    colorStr = singleMode
      ? `
@layer base {
    :root {
${mode === "light" ? lightModeStr : darkModeStr}
        --radius: ${borderRadius};
    }
}    
  `
      : `
@layer base {
    :root {
${lightModeStr}
        --radius: ${borderRadius};
    }

    .dark {
${darkModeStr}
    }
}
`;
  } else {
    const getColor = (name: string) => {
      const color = colors.find((c) => c.varName === name)?.colorHsl;
      if (!color) return "0,0,0";
      return `${color.h}, ${color.s}%, ${color.l}%`;
    };

    colorStr = `
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        display: '${
          bodyFont.charAt(0).toUpperCase() + bodyFont.slice(1)
        }, ui-sans-serif',
        heading: '${
          headingFont.charAt(0).toUpperCase() + headingFont.slice(1)
        }, ui-serif',
      },
      colors: {
        border: "hsl(${getColor("--border")})",
        input: "hsl(${getColor("--input")})",
        ring: "hsl(${getColor("--ring")})",
        background: "hsl(${getColor("--background")})",
        foreground: "hsl(${getColor("--foreground")})",
        primary: {
          DEFAULT: "hsl(${getColor("--primary")})",
          foreground: "hsl(${getColor("--primary-foreground")})",
        },
        secondary: {
          DEFAULT: "hsl(${getColor("--secondary")})",
          foreground: "hsl(${getColor("--secondary-foreground")})",
        },
        destructive: {
          DEFAULT: "hsl(${getColor("--destructive")})",
          foreground: "hsl(${getColor("--destructive-foreground")})",
        },
        muted: {
          DEFAULT: "hsl(${getColor("--muted")})",
          foreground: "hsl(${getColor("--muted-foreground")})",
        },
        accent: {
          DEFAULT: "hsl(${getColor("--accent")})",
          foreground: "hsl(${getColor("--accent-foreground")})",
        },
        popover: {
          DEFAULT: "hsl(${getColor("--popover")})",
          foreground: "hsl(${getColor("--popover-foreground")})",
        },
        card: {
          DEFAULT: "hsl(${getColor("--card")})",
          foreground: "hsl(${getColor("--card-foreground")})",
        },
      },
      borderRadius: {
        lg: "${borderRadius}",
        md: "calc(${borderRadius} - 2px)",
        sm: "calc(${borderRadius} - 4px)",
      },
    }
  }
}
    `;
  }

  const fontStr = `
@import url('https://fonts.googleapis.com/css2?family=${
    bodyFont.charAt(0).toUpperCase() + bodyFont.slice(1)
  }:wght@100;200;300;400;400;500;600;700;800;900;&family=${
    headingFont.charAt(0).toUpperCase() + headingFont.slice(1)
  }:wght@100;200;300;400;400;500;600;700;800;900;1,500&display=swap');
`;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant={shadcn ? "default" : "outline"}
            onClick={() => setShadcn(true)}
          >
            Shadcn/ui
          </Button>
          <Button
            size="sm"
            variant={!shadcn ? "default" : "outline"}
            onClick={() => setShadcn(false)}
          >
            Tailwind
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="check"
            checked={!singleMode}
            onCheckedChange={(checked) => setSingleMode(!checked)}
          />
          <label
            htmlFor="check"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Themes
          </label>
        </div>
      </div>

      {shadcn ? (
        <>
          <p className="text-sm text-muted-foreground">
            Copy and paste the following code into your <b>globals.css</b> file:
          </p>
          <div className="group relative">
            <pre className="h-[450px] overflow-x-auto rounded-lg border bg-muted px-4 ">
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm whitespace-pre-wrap break-all">
                {fontStr}

                {colorStr}
              </code>
            </pre>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-0 right-0 p-4">
              <ClipboardButton value={colorStr} />
            </div>
          </div>
        </>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            Copy and paste the following code into your <b>globals.css</b> file:
          </p>
          <div className="group relative">
            <pre className="h-[140px] overflow-x-auto rounded-lg border bg-muted px-4 ">
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm whitespace-pre-wrap break-all">
                {fontStr}
              </code>
            </pre>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-0 right-0 p-4">
              <ClipboardButton value={colorStr} />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Copy and paste the following code into your{" "}
            <b>tailwind.config.js</b> file:
          </p>
          <div className="group relative">
            <pre className="h-[260px] overflow-x-auto rounded-lg border bg-muted px-4 ">
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm whitespace-pre-wrap break-all">
                {colorStr}
              </code>
            </pre>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-0 right-0 p-4">
              <ClipboardButton value={colorStr} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
