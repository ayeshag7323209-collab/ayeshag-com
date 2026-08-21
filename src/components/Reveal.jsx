import useReveal from "../hooks/useReveal.js";

// Wraps any block in a scroll-triggered fade/slide-up reveal.
// Usage: <Reveal className="service-card" delay={1}>...</Reveal>
export default function Reveal({ as: Tag = "div", className = "", delay = 0, style, children, ...rest }) {
  const [ref, visible] = useReveal();

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ ...style, "--reveal-delay": `${delay * 90}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
