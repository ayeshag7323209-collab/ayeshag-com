import { useEffect, useRef, useState } from "react";
import { heroSlides } from "../data/content.js";
import { ArrowIcon, ChevronIcon } from "./Icons.jsx";
import { PaisleyMotif } from "./Motifs.jsx";

const AUTOPLAY_MS = 6500;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  const go = (i) => setIndex((i + heroSlides.length) % heroSlides.length);
  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  useEffect(() => {
    timerRef.current = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <section id="home" className="hero">
      <PaisleyMotif className="hero__texture" id="hero-paisley" />
      <div className="hero__glow hero__glow--one" />
      <div className="hero__glow hero__glow--two" />

      <div className="hero__slides">
        {heroSlides.map((slide, i) => (
          <div
            key={slide.headline}
            className={`hero__slide hero__slide--${slide.theme} ${
              i === index ? "is-active" : ""
            }`}
            aria-hidden={i !== index}
          >
            <div
              className={`hero__slide-bg ${i === index ? "is-zooming" : ""}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="hero__slide-overlay" />
            <div className="container hero__content">
              <p className="hero__kicker">{slide.kicker}</p>
              <h1 className="hero__headline">{slide.headline}</h1>
              <p className="hero__subheadline">{slide.subheadline}</p>
              <a href={slide.ctaHref} className="btn btn--gold btn--lg">
                {slide.cta}
                <ArrowIcon width={20} height={20} />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="hero__controls container">
        <button className="hero__arrow" onClick={prev} aria-label="Previous slide">
          <ChevronIcon style={{ transform: "rotate(180deg)" }} />
        </button>
        <div className="hero__dots">
          {heroSlides.map((slide, i) => (
            <button
              key={slide.headline}
              className={`hero__dot ${i === index ? "is-active" : ""}`}
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
            >
              {i === index && (
                <span
                  className="hero__dot-progress"
                  key={index}
                  style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
                />
              )}
            </button>
          ))}
        </div>
        <button className="hero__arrow" onClick={next} aria-label="Next slide">
          <ChevronIcon />
        </button>
      </div>
    </section>
  );
}
