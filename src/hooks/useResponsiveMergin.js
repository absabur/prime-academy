import { useState, useEffect, useRef } from 'react';

// Tailwind's default 'md' breakpoint
const MD_BREAKPOINT = 768;

/**
 * A custom hook to dynamically calculate the margin-top of an element
 * to align its second line of text.
 * @param {number} desktopMargin - The target margin-top in pixels for desktop view.
 * @returns {{ ref: React.RefObject, style: React.CSSProperties }}
 */
export const useResponsiveMargin = (desktopMargin) => {
  const ref = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // A single handler for both initial render and resize events.
    const handleResize = () => {
      // Update the screen size status
      setIsDesktop(window.innerWidth >= MD_BREAKPOINT);

      // Recalculate line height if the ref is attached
      if (ref.current) {
        const computedStyle = window.getComputedStyle(ref.current);
        setLineHeight(parseFloat(computedStyle.lineHeight));
      }
    };

    // Run once on mount
    handleResize();

    // Add a single event listener
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures this runs only once on mount and unmount.

  // Calculate the final margin value
  const adjustedMarginTop = desktopMargin - lineHeight;

  // Prepare the style object to be applied to the element
  const style = {
    marginTop: isDesktop && lineHeight > 0 ? `${adjustedMarginTop}px` : undefined,
  };

  return { ref, style };
};