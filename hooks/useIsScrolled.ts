import { useEffect, useState } from "react";

export default function useIsScrolled() {
  // Flag, which stores whether the screen is scrolled
  const [isScrolled, setScrolled] = useState(false);

  // Handler when page is scrolled
  const handleScroll = () => {
    if (window.scrollY > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  useEffect(() => {
    // Adding the scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      // Removing listener
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isScrolled;
}
