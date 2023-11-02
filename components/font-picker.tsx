"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import {
  Category,
  Font,
  FONT_FAMILY_DEFAULT,
  FontManager,
  Options,
  OPTIONS_DEFAULTS,
  Script,
  SortOption,
  Variant,
} from "@samuelmeuli/font-manager";
import React, { PureComponent, ReactElement } from "react";

type LoadingStatus = "loading" | "finished" | "error";

interface Props {
  // Optional props
  activeFontFamily: string;
  onChange: (font: Font) => void;
  pickerId: string;
  families: string[];
  categories: Category[];
  scripts: Script[];
  filter: (font: Font) => boolean;
  limit: number;
  sort: SortOption;
}

interface State {
  expanded: boolean;
  loadingStatus: LoadingStatus;
}

/**
 * Return the fontId based on the provided font family
 */
function getFontId(fontFamily: string): string {
  return fontFamily.replace(/\s+/g, "-").toLowerCase();
}

export default class FontPicker extends PureComponent<Props, State> {
  // Instance of the FontManager class used for managing, downloading and applying fonts
  fontManager: FontManager;

  static defaultProps = {
    activeFontFamily: FONT_FAMILY_DEFAULT,
    onChange: (): void => {},
    pickerId: OPTIONS_DEFAULTS.pickerId,
    families: OPTIONS_DEFAULTS.families,
    categories: OPTIONS_DEFAULTS.categories,
    scripts: OPTIONS_DEFAULTS.scripts,
    variants: OPTIONS_DEFAULTS.variants,
    filter: OPTIONS_DEFAULTS.filter,
    limit: OPTIONS_DEFAULTS.limit,
    sort: OPTIONS_DEFAULTS.sort,
  };

  state: Readonly<State> = {
    expanded: false,
    loadingStatus: "loading",
  };

  constructor(props: Props) {
    super(props);

    const {
      activeFontFamily,
      pickerId,
      families,
      categories,
      scripts,
      filter,
      limit,
      sort,
      onChange,
    } = this.props;

    const options: Options = {
      pickerId,
      families,
      categories,
      scripts,
      variants: ["100", "200", "300", "500", "600", "700", "800"],
      filter,
      limit,
      sort,
    };

    // Initialize FontManager object
    this.fontManager = new FontManager(
      process.env.NEXT_PUBLIC_FONTS_API_KEY || "",
      activeFontFamily,
      options,
      onChange
    );
  }

  componentDidMount = (): void => {
    // Generate font list
    this.fontManager
      .init()
      .then((): void => {
        this.setState({
          loadingStatus: "finished",
        });
      })
      .catch((err: Error): void => {
        // On error: Log error message
        this.setState({
          loadingStatus: "error",
        });
        console.error("Error trying to fetch the list of available fonts");
        console.error(err);
      });
  };

  /**
   * After every component update, check whether the activeFontFamily prop has changed. If so,
   * call this.setActiveFontFamily with the new font
   */
  componentDidUpdate = (prevProps: Props): void => {
    const { activeFontFamily, onChange } = this.props;

    // If active font prop has changed: Update font family in font manager and component state
    if (activeFontFamily !== prevProps.activeFontFamily) {
      this.setActiveFontFamily(activeFontFamily);
    }

    // If onChange prop has changed: Update onChange function in font manager
    if (onChange !== prevProps.onChange) {
      this.fontManager.setOnChange(onChange);
    }
  };

  /**
   * EventListener for closing the font picker when clicking anywhere outside it
   */
  onClose = (e: MouseEvent): void => {
    let targetEl = e.target as Node; // Clicked element
    const fontPickerEl =
      typeof document !== "undefined"
        ? document.getElementById(
            `font-picker${this.fontManager.selectorSuffix}`
          )
        : null;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (targetEl === fontPickerEl) {
        // Click inside font picker: Exit
        return;
      }
      if (targetEl.parentNode) {
        // Click outside font picker: Move up the DOM
        targetEl = targetEl.parentNode;
      } else {
        // DOM root is reached: Toggle picker, exit
        this.toggleExpanded();
        return;
      }
    }
  };

  /**
   * Update the active font on font button click
   */
  onSelection = (newActive: string): void => {
    const activeFontFamily = newActive;
    if (!activeFontFamily) {
      throw Error(`Missing font family in clicked font button`);
    }
    this.setActiveFontFamily(activeFontFamily);
    this.toggleExpanded();
  };

  /**
   * Set the specified font as the active font in the fontManager and update activeFontFamily in the
   * state
   */
  setActiveFontFamily = (activeFontFamily: string): void => {
    try {
      this.fontManager.setActiveFont(activeFontFamily);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Generate <ul> with all font families
   */
  generateFontList = (fonts: Font[]): ReactElement => {
    const { activeFontFamily } = this.props;
    const { loadingStatus } = this.state;

    if (loadingStatus !== "finished") {
      return <div />;
    }
    return (
      <SelectContent className="font-list max-h-[400px] overflow-auto z-[101]">
        {fonts.map((font, i): ReactElement => {
          const fontId = getFontId(font.family);
          return (
            <SelectItem
              key={fontId + i}
              value={font.family}
              className="font-list-item"
              id={`font-button-${fontId}${this.fontManager.selectorSuffix}`}
            >
              {font.family}
            </SelectItem>
          );
        })}
      </SelectContent>
    );
  };

  /**
   * Expand/collapse the picker's font list
   */
  toggleExpanded = (): void => {
    const { expanded } = this.state;

    if (expanded) {
      this.setState({
        expanded: false,
      });
      typeof document !== "undefined" &&
        document.removeEventListener("click", this.onClose);
    } else {
      this.setState({
        expanded: true,
      });
      typeof document !== "undefined" &&
        document.addEventListener("click", this.onClose);
    }
  };

  render = (): ReactElement => {
    const { activeFontFamily, sort } = this.props;
    const { expanded, loadingStatus } = this.state;

    // Extract and sort font list
    const fonts = Array.from(this.fontManager.getFonts().values());
    if (sort === "alphabet") {
      fonts.sort((font1: Font, font2: Font): number =>
        font1.family.localeCompare(font2.family)
      );
    }

    return (
      <Select
        value={activeFontFamily}
        onValueChange={(value) => this.onSelection(value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Theme" />
        </SelectTrigger>

        {loadingStatus === "finished" && this.generateFontList(fonts)}
      </Select>
    );
  };
}
