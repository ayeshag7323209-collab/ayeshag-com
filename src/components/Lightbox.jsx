import { useEffect } from "react";
import { CloseIcon, ChevronIcon } from "./Icons.jsx";

export default function Lightbox({ items, index, onClose, onNavigate }) {
  const item = items[index];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(1);
      if (e.key === "ArrowLeft") onNavigate(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onNavigate]);

  if (!item) return null;

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={item.title}>
      <div className="lightbox__backdrop" onClick={onClose} />

      <button className="lightbox__close" onClick={onClose} aria-label="Close">
        <CloseIcon />
      </button>

      <button
        className="lightbox__nav lightbox__nav--prev"
        onClick={() => onNavigate(-1)}
        aria-label="Previous image"
      >
        <ChevronIcon style={{ transform: "rotate(180deg)" }} />
      </button>

      <figure className="lightbox__figure">
        <img src={item.image} alt={item.title} className="lightbox__img" />
        <figcaption>
          <span className="lightbox__tag">{item.tag}</span>
          <span>{item.title}</span>
        </figcaption>
      </figure>

      <button
        className="lightbox__nav lightbox__nav--next"
        onClick={() => onNavigate(1)}
        aria-label="Next image"
      >
        <ChevronIcon />
      </button>

      <p className="lightbox__count">
        {index + 1} / {items.length}
      </p>
    </div>
  );
}
