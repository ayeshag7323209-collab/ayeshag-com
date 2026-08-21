import { useEffect, useRef, useState } from "react";

// Returns a ref and a small translateY offset (px) that drifts as the
// element travels through the viewport — a lightweight, dependency-free
// scroll parallax. `strength` controls the maximum drift in either
// direction. Respects prefers-reduced-motion (offset stays at 0).
export default function useParallax(strength = 16) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return undefined;

    let frame = null;

    const update = () => {
      frame = null;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // -1 when the element's center sits at the bottom of the viewport,
      // +1 when it sits at the top — 0 when perfectly centered.
      const centerProgress = (vh / 2 - (rect.top + rect.height / 2)) / vh;
      const clamped = Math.max(-1, Math.min(1, centerProgress));
      setOffset(clamped * strength);
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
  }, [strength]);

  return [ref, offset];
}
