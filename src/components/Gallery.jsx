import { useMemo, useState } from "react";
import { galleryItems, galleryFeatures, galleryFilters, galleryBackground } from "../data/content.js";
import Lightbox from "./Lightbox.jsx";
import Reveal from "./Reveal.jsx";

// Weave the two wide "boutique" feature photos into the grid at fixed
// positions so the layout has rhythm instead of a flat uniform grid.
function useWovenItems() {
  return useMemo(() => {
    const woven = [...galleryItems];
    const [f1, f2] = galleryFeatures;
    woven.splice(4, 0, { ...f1, feature: true });
    woven.splice(11, 0, { ...f2, feature: true });
    return woven;
  }, []);
}

export default function Gallery() {
  const wovenItems = useWovenItems();
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = useMemo(() => {
    if (activeFilter === "all") return wovenItems;
    return wovenItems.filter((item) => !item.feature && item.category === activeFilter);
  }, [wovenItems, activeFilter]);

  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const navigate = (delta) =>
    setLightboxIndex((i) => (i === null ? null : (i + delta + filtered.length) % filtered.length));

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

        <div className="gallery__grid">
          {filtered.map((item, i) => (
            <Reveal
              as="figure"
              key={item.id}
              delay={i % 6}
              className={`gallery__card ${item.feature ? "gallery__card--feature" : ""}`}
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

        <p className="gallery__note">
          Tap any piece to view it larger. New arrivals are added to this
          preview as each seasonal collection ships.
        </p>
      </div>

      {lightboxIndex !== null && (
        <Lightbox items={filtered} index={lightboxIndex} onClose={closeLightbox} onNavigate={navigate} />
      )}
    </section>
  );
}
