import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { galleryItems, galleryFilters, galleryBackground } from "../data/content.js";
import Lightbox from "./Lightbox.jsx";
import Reveal from "./Reveal.jsx";

// Autoplay only runs at desktop widths (matching where the arrows show) and
// pauses for a bit after any manual interaction — hover, arrow click, or a
// touch/drag — so it never fights the person browsing. On mobile it never
// runs at all: swipe is the whole interaction there.
const AUTOPLAY_MS = 4000;
const AUTOPLAY_RESUME_DELAY_MS = 5000;
const AUTOPLAY_MIN_WIDTH_QUERY = "(min-width: 720px)";

// Measures the real on-screen spacing between two neighboring cards (their
// width plus the gap) directly from layout instead of hardcoding it, so it
// stays correct across the responsive --card-w/gap breakpoints in the CSS.
function measureCardStep(track) {
  const cards = track.querySelectorAll(".gallery__card");
  if (!cards.length) return track.clientWidth * 0.8;
  if (cards.length === 1) return cards[0].getBoundingClientRect().width;
  const a = cards[0].getBoundingClientRect();
  const b = cards[1].getBoundingClientRect();
  return b.left - a.left;
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const trackRef = useRef(null);
  const pausedRef = useRef(false);
  const resumeTimeoutRef = useRef(null);

  const filtered = useMemo(() => {
    if (activeFilter === "all") return galleryItems;
    return galleryItems.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const navigate = (delta) =>
    setLightboxIndex((i) => (i === null ? null : (i + delta + filtered.length) % filtered.length));

  // Scrolls the track by one card+gap step so "next/prev" always lands with
  // a card centered. Wraps around at either end so autoplay (and the
  // arrows) can loop indefinitely instead of stalling.
  const scrollByCard = useCallback((direction) => {
    const track = trackRef.current;
    if (!track) return;
    const step = measureCardStep(track);
    const maxScroll = track.scrollWidth - track.clientWidth;

    if (direction > 0 && track.scrollLeft >= maxScroll - 4) {
      track.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    if (direction < 0 && track.scrollLeft <= 4) {
      track.scrollTo({ left: maxScroll, behavior: "smooth" });
      return;
    }
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

  // Coverflow effect: on every scroll frame, scale/fade each card by its
  // distance from the track's center so the active card reads large and
  // sharp while its neighbors sit smaller to either side. Driven straight
  // off scrollLeft (not React state) so it stays smooth under a finger drag
  // and during the arrows'/autoplay's native smooth-scroll alike.
  const updateCoverflow = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll(".gallery__card");
    if (!cards.length) return;
    const trackRect = track.getBoundingClientRect();
    const centerX = trackRect.left + trackRect.width / 2;
    const unit = measureCardStep(track) || 1;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const distance = Math.min(Math.abs(cardCenterX - centerX) / unit, 1.6);
      const scale = Math.max(1.08 - distance * 0.32, 0.62);
      const opacity = Math.max(1 - distance * 0.45, 0.35);
      card.style.transform = `scale(${scale.toFixed(3)})`;
      card.style.opacity = opacity.toFixed(3);
      card.style.zIndex = String(Math.round((1.6 - distance) * 10));
      card.classList.toggle("is-active", distance < 0.15);
    });
  }, []);

  // Pauses autoplay immediately, then schedules it back on a few seconds
  // after the interaction ends.
  const pauseAutoplay = useCallback(() => {
    pausedRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, AUTOPLAY_RESUME_DELAY_MS);
  }, []);

  const handleArrowClick = (direction) => {
    scrollByCard(direction);
    pauseAutoplay();
  };

  // Auto-rotation. Skipped entirely for prefers-reduced-motion, and only
  // ever advances at desktop widths — the same breakpoint the arrows appear
  // at — so mobile stays swipe-only with no autoplay to interrupt a drag.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const desktopQuery = window.matchMedia(AUTOPLAY_MIN_WIDTH_QUERY);

    const id = setInterval(() => {
      if (!pausedRef.current && desktopQuery.matches) scrollByCard(1);
    }, AUTOPLAY_MS);

    return () => clearInterval(id);
  }, [filtered, scrollByCard]);

  // Keeps the coverflow scale/opacity in sync with scroll position. Skipped
  // for prefers-reduced-motion, which leaves every card at its plain,
  // uniform size instead of the zooming effect.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let frame = null;
    const onScrollOrResize = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        updateCoverflow();
      });
    };

    updateCoverflow();
    track.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      track.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [filtered, updateCoverflow]);

  // A filter change swaps the card list out from under the track, so reset
  // scroll position rather than leave it parked past the new list's end —
  // scrollLeft 0 already centers the first card thanks to the track's
  // centering padding (see gallery.css).
  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0 });
  }, [activeFilter]);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  return (
    <section id="gallery" className="gallery">
      <div className="gallery__bg" style={{ backgroundImage: `url(${galleryBackground})` }} />
      <div className="gallery__bg-overlay" />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <Reveal as="div" className="section-heading section-heading--light">
          <p className="eyebrow eyebrow--gold">Gallery</p>
          <h2 className="section-title section-title--light">
            Three Decades of Craftsmanship, Previewed
          </h2>
          <p className="section-lede section-lede--light">
            Browse our collection of embroidered three-piece suits, everyday
            two-piece shalwar kameez, and statement party wear kurtas — each
            piece a preview of what our stitching and embroidery units can
            produce for your store, in the colors, sizes, and quantities you
            need.
          </p>
        </Reveal>

        <div className="gallery__filters">
          {galleryFilters.map((f) => (
            <button
              key={f.key}
              className={`gallery__filter ${activeFilter === f.key ? "is-active" : ""}`}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div
          className="gallery__carousel"
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={pauseAutoplay}
          onTouchStart={() => {
            pausedRef.current = true;
          }}
          onTouchEnd={pauseAutoplay}
        >
          <div className="gallery__track" ref={trackRef}>
            {filtered.map((item, i) => (
              <Reveal
                as="figure"
                key={item.id}
                delay={i % 6}
                className="gallery__card"
                onClick={() => openLightbox(i)}
              >
                <div className="gallery__media">
                  <img src={item.image} alt={item.title} loading="lazy" className="gallery__img" />
                  <div className="gallery__scrim" />
                  <span className="gallery__tag">{item.tag}</span>
                  <span className="gallery__zoom" aria-hidden="true">
                    View
                  </span>
                </div>
                <figcaption className="gallery__caption">{item.title}</figcaption>
              </Reveal>
            ))}
          </div>

          <button
            type="button"
            className="gallery__arrow gallery__arrow--prev"
            onClick={() => handleArrowClick(-1)}
            aria-label="Scroll gallery left"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            className="gallery__arrow gallery__arrow--next"
            onClick={() => handleArrowClick(1)}
            aria-label="Scroll gallery right"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <p className="gallery__note">
          Drag, swipe, or use the arrows to browse. New arrivals are added to
          this preview as each seasonal collection ships.
        </p>
      </div>

      {lightboxIndex !== null && (
        <Lightbox items={filtered} index={lightboxIndex} onClose={closeLightbox} onNavigate={navigate} />
      )}
    </section>
  );
}
