import * as React from "react";

import { cn } from "@/lib/utils";
import { ClipboardButton } from "../clipboard-button";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  copyToClipboard?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, copyToClipboard = false, ...props }, ref) => {
    return (
      <div className="relative group">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {copyToClipboard && (
          <div className="absolute inset-y-0 right-0  flex items-center opacity-0 group-hover:opacity-100 transition">
            <ClipboardButton value={props.value} />
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
