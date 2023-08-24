"use client";

import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface ClipboardButtonProps {
  value: string;
}

export const ClipboardButton = ({ value }: ClipboardButtonProps) => {
  const [showDone, setShowDone] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setShowDone(true);
        setTimeout(() => {
          setShowDone(false);
        }, 1000);
      })
      .catch((err) => {
        console.error("Failed to copy to clipboard:", err);
      });
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={copyToClipboard}
      className="transition"
    >
      {!showDone && <Copy className="w-5 h-5" />}
      {showDone && <Check className="w-5 h-5" />}
    </Button>
  );
};
