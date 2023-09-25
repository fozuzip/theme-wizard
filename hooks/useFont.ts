import { Font, FontManager, Options } from "@samuelmeuli/font-manager";
import { useEffect, useState } from "react";

export const useFont = (fontId?: string) => {
  const [activeFont, setFont] = useState("Inter");
  const [fontManager, setFontManager] = useState(
    new FontManager(
      process.env.NEXT_PUBLIC_FONTS_API_KEY || "",
      "Inter",
      {
        pickerId: fontId,
        variants: ["100", "200", "300", "500", "600", "700", "800", "900"],
      } as Options,
      () => console.log("change")
    )
  );

  const [loadingStatus, setLoadingStatus] = useState("loading");

  useEffect(() => {
    // Generate font list
    console.log(fontManager);
    fontManager
      .init()
      .then((): void => {
        setLoadingStatus("finished");
      })
      .catch((err: Error): void => {
        // On error: Log error message
        setLoadingStatus("error");

        console.error("Error trying to fetch the list of available fonts");
        console.error(err);
      });
  }, []);

  // Extract and sort font list
  const fonts = Array.from(fontManager.getFonts().values());

  fonts.sort((font1: Font, font2: Font): number =>
    font1.family.localeCompare(font2.family)
  );

  const setActiveFont = (fontFamily: string) => {
    setFont(fontFamily);
    fontManager.setActiveFont(fontFamily);
  };

  return {
    activeFont,
    fonts,
    setActiveFont,
    loadingStatus,
  };
};
