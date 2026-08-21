import { useEffect, useRef, useState } from "react";

// Returns a ref and a 0 → 1 progress value tracking how far the element
// has traveled through the viewport as the page scrolls — used to drive
// scroll-linked fills, such as a line that "draws itself" while its
// section passes by. Settles at 1 (fully drawn, no animation) for anyone
// who prefers reduced motion.
export default function useScrollProgress() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      setProgress(1);
      return undefined;
    }

    let frame = null;

    const update = () => {
      frame = null;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const start = vh * 0.85;
      const end = vh * 0.25;
      const total = rect.height + (start - end);
      const traveled = start - rect.top;
      const value = total > 0 ? traveled / total : 0;
      setProgress(Math.max(0, Math.min(1, value)));
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return [ref, progress];
}
