import { useEffect, useState } from "react";

const useThemeVariable = (initialValue: string, cssVariables: string[]) => {
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    for (const variable of cssVariables) {
      document.documentElement.style.setProperty(variable, value);
    }
  }, [value, cssVariables]);

  return [value, setValue] as const;
};

export default useThemeVariable;
