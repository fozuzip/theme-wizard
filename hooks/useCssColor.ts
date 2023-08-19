import useCssVariable from "./useCssVariable";

export type CssColor = ReturnType<typeof useCssColor>;

const useCssColor = (variableName: string) => {
  const variable = useCssVariable(variableName);

  let hue: number | undefined;
  let saturation: number | undefined;
  let lightness: number | undefined;

  // Regular expression to match numbers
  const numberPattern = /(\d+(\.\d+)?)/g;

  // Extract the numbers from the HSLA string
  const extractedNumbers = variable.value?.match(numberPattern);

  if (extractedNumbers && extractedNumbers.length >= 3) {
    hue = parseFloat(extractedNumbers[0]);
    saturation = parseFloat(extractedNumbers[1]);
    lightness = parseFloat(extractedNumbers[2]);
  }

  const setHue = (value: number) => {
    variable.set(`${value}, ${saturation}%, ${lightness}%`);
  };

  const setSaturation = (value: number) => {
    variable.set(`${hue}, ${value}%, ${lightness}%`);
  };

  const setLightness = (value: number) => {
    variable.set(`${hue}, ${saturation}%, ${value}%`);
  };

  return {
    ...variable,
    hue,
    saturation,
    lightness,
    setHue,
    setSaturation,
    setLightness,
  };
};

export default useCssColor;
