"use client";

import { colorNames } from "@/theme/useColor";
import { useEffect, useRef, useState } from "react";
import { ColorsToolbar } from "./colors-toolbar";

export type Selection = {
  elementTag: string;
  colors: string[];
};

interface ClickDetectorProps {
  children: React.ReactNode;
}

export const ClickDetector = ({ children }: ClickDetectorProps) => {
  const [selection, setSelection] = useState<Selection | null>(null);

  const divRef = useRef(null);

  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>();

  const [rect, setRect] = useState<DOMRect | null>();

  const handleClick = (event: MouseEvent) => {
    event.preventDefault();

    if (isUnselectable(event.target as HTMLElement)) return;

    const { element: clickedElement, isContainer } = getContainerElement(
      event.target as HTMLElement
    );

    if (!clickedElement) {
      setSelectedElement(null);
      setSelection(null);
      return;
    }

    let colors = [];

    const backgroundColor = findColor(clickedElement, "bg", true);
    const textColor = clickedElement.innerText
      ? findColor(clickedElement, "text", true)
      : null;

    const containingColors = getElementsColors(clickedElement);
    colors = isContainer
      ? ([backgroundColor] as string[])
      : (Array.from(new Set([...containingColors, textColor])).filter(
          Boolean
        ) as string[]);

    const hasBorder =
      clickedElement.classList.contains("border") &&
      !clickedElement.classList.contains("border-transparent");
    if (hasBorder) {
      colors.push("border");
    }

    setSelectedElement(clickedElement);
    setSelection({
      elementTag: clickedElement.tagName.toLocaleLowerCase(),
      colors,
    });
  };

  useEffect(() => {
    if (!selectedElement) return;
    addHighlight(selectedElement);
    setRect(selectedElement.getBoundingClientRect());

    return () => {
      removeHighlight(selectedElement);
      setRect(null);
    };
  }, [selectedElement]);

  useEffect(() => {
    if (!divRef.current) return;
    const divElement = divRef.current as HTMLDivElement;

    if (divElement) {
      // Add a click event listener to the div element to handle clicks within it
      divElement.addEventListener("click", handleClick);
    }

    return () => {
      if (divElement) {
        // Remove the click event listener when the component unmounts
        divElement.removeEventListener("click", handleClick);
      }
    };
  }, [divRef, selection]);

  // Disable Scroll when there is a selection
  useEffect(() => {
    if (selection) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selection]);

  // Render the wrapped components as children
  return (
    <>
      <div ref={divRef} className="cursor-pointer">
        {children}
      </div>
      {rect && (
        <div
          className="fixed p-3"
          style={{ top: rect.y - 8, left: rect.x + rect.width + 16 }}
        >
          <ColorsToolbar selection={selection} />
        </div>
      )}
    </>
  );
};

const addHighlight = (element: HTMLElement) => {
  element.classList.add("ring");
  element.classList.add("ring-ring");
  element.classList.add("ring-offset-4");
  element.classList.add("ring-offset-background");
  element.classList.add("rounded-sm");
};

const removeHighlight = (element: HTMLElement) => {
  element.classList.remove("ring");
  element.classList.remove("ring-ring");
  element.classList.remove("ring-offset-4");
  element.classList.remove("ring-offset-background");
  element.classList.remove("rounded-sm");
};

const isUnselectable = (element: HTMLElement): boolean => {
  const isToolbar = Array.from(element.classList).includes("no-select");
  if (isToolbar) return true;

  if (element.parentElement) {
    return isUnselectable(element.parentElement);
  } else {
    return false;
  }
};

const getElementsColors = (element: HTMLElement): string[] => {
  let colors = [];
  const backgroundColor = findColor(element, "bg");
  const fromColor = findColor(element, "from");
  const toColor = findColor(element, "to");

  let textColor = null;
  if (element.innerText) {
    textColor = findColor(element, "text");
  }
  const borderColor = findColor(element, "border");
  const ringColor = findColor(element, "ring");

  colors = [
    backgroundColor,
    textColor,
    fromColor,
    toColor,
    borderColor,
    ringColor,
  ].filter(Boolean) as string[];

  for (const child of Array.from(element.children)) {
    colors = [...colors, ...getElementsColors(child as HTMLElement)];
  }
  return Array.from(new Set(colors));
};

const findColor = (
  element: HTMLElement,
  prefix: string,
  searchParent = false
): string | null => {
  if (searchParent) {
    return findElementsColorRecursively(element, prefix);
  }
  return findElementsColor(element, prefix);
};

const findElementsColorRecursively = (
  element: HTMLElement,
  prefix: string
): string | null => {
  let color = null;

  color = findElementsColor(element, prefix);
  if (color) {
    return color;
  }
  if (element.parentElement) {
    return findElementsColorRecursively(element.parentElement, prefix);
  }

  return null;
};

const findElementsColor = (
  element: HTMLElement,
  prefix: string
): string | null => {
  const classNames = Array.from(element.classList);

  for (const className of classNames) {
    let match = className.split(/(\s*-\s*|\s+)+/).filter(Boolean);
    if (!match || match[0] !== prefix) continue;
    match.splice(0, 2);
    const postfix = match.join("");

    const color = colorNames.find((color) => color === postfix);
    if (color) {
      return color;
    }
  }
  return null;
};

const elementHas = (element: HTMLElement, tagList: string[]): boolean => {
  let elementHasTag = false;

  elementHasTag = elementIs(element, tagList);
  if (elementHasTag) return true;

  for (const child of Array.from(element.children)) {
    elementHasTag = elementHas(child as HTMLElement, tagList);
    if (elementHasTag) return true;
  }
  return false;
};

const elementIs = (element: HTMLElement, tagList: string[]): boolean => {
  return tagList.includes(element.tagName.toLocaleLowerCase());
};

const elementHasBodyText = (element: HTMLElement): boolean => {
  const isHeading = elementIs(element, ["h1", "h2", "h3", "h4", "h5", "h6"]);
  if (isHeading) return false;

  const containsText =
    element.innerHTML.length > 0 && !element.innerHTML.startsWith("<");

  if (containsText) {
    return true;
  }

  for (const child of Array.from(element.children)) {
    const hasBodyText = elementHasBodyText(child as HTMLElement);
    if (hasBodyText) return true;
  }
  return false;
};

const getContainerElement = (
  element: HTMLElement
): { element: HTMLElement | null; isContainer: boolean } => {
  if (element.tagName === "BODY") return { element: null, isContainer: false };

  if (element.tagName !== "DIV" && element.tagName !== "SECTION")
    return { element, isContainer: false };
  if (element.classList.contains("border")) {
    if (element.classList.contains("no-container")) {
      return { element, isContainer: false };
    } else {
      return { element, isContainer: true };
    }
  } else if (element.parentElement) {
    return getContainerElement(element.parentElement);
  }

  return { element: null, isContainer: false };
};
