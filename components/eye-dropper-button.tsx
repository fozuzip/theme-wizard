"use client";

import { useCallback, useMemo } from "react";
import useEyeDropper from "use-eye-dropper";
import { Button } from "./ui/button";
import { Pipette } from "lucide-react";

type DropperError = {
  message: string;
  canceled?: boolean;
};

type EyeDropperButtonProps = React.ComponentProps<"button"> & {
  onColorSelect: (color: string) => void;
};

export const useIsEyeDropperSupported = () => {
  const { isSupported } = useEyeDropper();
  const isSupportedFlag = useMemo(() => isSupported(), [isSupported]);
  return isSupportedFlag;
};

export const EyeDropperButton = ({
  onColorSelect,
  disabled,
}: EyeDropperButtonProps) => {
  const { open, isSupported } = useEyeDropper();

  // useEyeDropper will reject/cleanup the open() promise on unmount,
  // so setState never fires when the component is unmounted.
  const pickColor = useCallback(() => {
    // Using async/await (can be used as a promise as-well)
    const openPicker = async () => {
      try {
        const color = await open();
        onColorSelect(color.sRGBHex);
      } catch (e: any) {
        console.error("Error while opening color picker: ", e);
      }
    };
    openPicker();
  }, [open, onColorSelect]);

  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={!isSupported() || disabled}
      onClick={pickColor}
    >
      <Pipette className="w-4 h-4" />
    </Button>
  );
};

export default EyeDropperButton;
