import { useEffect, useRef, useState } from "react";

// Animates the numeric portion of a stat value (e.g. "30+", "1000+", "2")
// from 0 up to its target once `start` becomes true, keeping any suffix intact.
export default function useCountUp(rawValue, start, duration = 1400) {
  const match = String(rawValue).match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";

  const [display, setDisplay] = useState(target === null ? rawValue : "0" + suffix);
  const started = useRef(false);

  useEffect(() => {
    if (!start || started.current || target === null) return;
    started.current = true;

    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      setDisplay(target + suffix);
      return;
    }

    const startTime = performance.now();
    let frame;

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      const value = Math.round(eased * target);
      setDisplay(value + suffix);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, target, suffix, duration]);

  return display;
}
