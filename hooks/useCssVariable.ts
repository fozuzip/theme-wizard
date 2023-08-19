import { useEffect, useState } from "react";
import useThrottledFunction from "@/hooks/useThrottledFunction";

const useCssVariable = (variableName: string) => {
  const [value, setValue] = useState<string | undefined>();
  const varName = "--" + variableName;

  useEffect(() => {
    const initialValue = getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();

    if (!initialValue) {
      console.warn(`CSS variable ${variableName} is not defined`);
    } else {
      setValue(initialValue);
    }
  }, []);

  const [updateCssVariable] = useThrottledFunction((value: string) => {
    document.documentElement.style.setProperty(varName, value);
  }, 100);

  const set = (value: string) => {
    setValue(value);
    updateCssVariable(value);
  };

  return { value, set };
};

export default useCssVariable;
