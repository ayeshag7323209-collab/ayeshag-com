import { introParagraphs, mannequinImage } from "../data/content.js";
import { CornerFlourish } from "./Motifs.jsx";
import Reveal from "./Reveal.jsx";

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container about__grid">
        <Reveal className="about__art" as="div">
          <div className="about__mannequin-wrap">
            <div className="about__mannequin-shadow" />
            <img
              src={mannequinImage}
              alt="A hand-embroidered three-piece suit from Ayesha G Garments, shown on a mannequin"
              className="about__mannequin-img"
            />
          </div>

          <CornerFlourish className="about__flourish" />
        </Reveal>

        <Reveal className="about__copy" as="div" delay={1}>
          <p className="eyebrow">Our Story</p>
          <h2 className="section-title">
            Three Decades of Craftsmanship, Rooted in New Anarkali
          </h2>
          {introParagraphs.map((p, i) => (
            <p className="about__paragraph" key={i}>
              {p}
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
