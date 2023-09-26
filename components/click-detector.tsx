"use client";

import { colorNames } from "@/theme/useColor";
import { set } from "date-fns";
import { useEffect, useRef, useState } from "react";

// TODO: REMOVE

interface ClickDetectorProps {
  children: React.ReactNode;
  selection: Selection | null;
  onSelection: (selection: Selection | null) => void;
}

export type Selection = {
  elementTag: string;
  colors: string[];
  hasHeading: boolean;
  hasBodyText: boolean;
  hasBorder: boolean;
};

export const ClickDetector = ({
  children,
  selection,
  onSelection,
}: ClickDetectorProps) => {
  const divRef = useRef(null);

  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>();

  const handleClick = (event: MouseEvent) => {
    event.preventDefault();

    let clickedElement = getContainerElement(event.target as HTMLElement);
    if (!clickedElement) {
      setSelectedElement(null);
      onSelection(null);
      return;
    }

    let colors = [];
    let hasHeading = false;
    let hasBodyText = false;
    let hasBorder = false;

    const backgroundColor = findColor(clickedElement, "bg", true);
    const textColor = clickedElement.innerText
      ? findColor(clickedElement, "text", true)
      : null;

    const containingColors = getElementsColors(clickedElement);
    colors = Array.from(
      new Set([...containingColors, backgroundColor, textColor])
    ).filter(Boolean) as string[];

    hasBorder = !!colors.find((color) => ["border", "input"].includes(color));

    hasHeading = elementHas(clickedElement, [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
    ]);

    hasBodyText = elementHasBodyText(clickedElement);

    setSelectedElement(clickedElement);
    onSelection({
      elementTag: clickedElement.tagName.toLocaleLowerCase(),
      colors,
      hasHeading,
      hasBodyText,
      hasBorder,
    });
  };

  useEffect(() => {
    if (!selectedElement) return;
    addHighlight(selectedElement);

    return () => {
      removeHighlight(selectedElement);
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
  // Render the wrapped components as children
  return (
    <div ref={divRef} className="cursor-pointer">
      {children}
    </div>
  );
};

const addHighlight = (element: HTMLElement) => {
  element.classList.add("ring");
  element.classList.add("ring-offset-4");
  element.classList.add("ring-offset-background");
  element.classList.add("ring-sky-500");
  element.classList.add("rounded-sm");
};

const removeHighlight = (element: HTMLElement) => {
  element.classList.remove("ring");
  element.classList.remove("ring-offset-4");
  element.classList.remove("ring-offset-background");
  element.classList.remove("ring-primary");
  element.classList.remove("rounded-sm");
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

const getContainerElement = (element: HTMLElement): HTMLElement | null => {
  if (element.tagName === "BODY") return null;

  if (element.tagName !== "DIV" && element.tagName !== "SECTION")
    return element;
  if (element.classList.contains("border")) return element;
  else if (element.parentElement) {
    return getContainerElement(element.parentElement);
  }

  return null;
};
