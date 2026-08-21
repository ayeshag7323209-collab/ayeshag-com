import { services } from "../data/content.js";
import {
  ScissorsIcon,
  NeedleIcon,
  SparkleIcon,
  RulerIcon,
  NetworkIcon,
  GlobeIcon,
} from "./Icons.jsx";
import Reveal from "./Reveal.jsx";
import useScrollProgress from "../hooks/useScrollProgress.js";

const iconMap = {
  scissors: ScissorsIcon,
  needle: NeedleIcon,
  sparkle: SparkleIcon,
  ruler: RulerIcon,
  network: NetworkIcon,
  globe: GlobeIcon,
};

export default function Services() {
  const [timelineRef, progress] = useScrollProgress();

  return (
    <section id="services" className="services">
      <div className="services__glow services__glow--a" aria-hidden="true" />
      <div className="services__glow services__glow--b" aria-hidden="true" />

      <div className="container">
        <Reveal as="div" className="section-heading section-heading--light">
          <p className="eyebrow eyebrow--gold">Our Services</p>
          <h2 className="section-title section-title--light">
            Everything a Fashion Brand Needs, Under One Roof
          </h2>
          <p className="section-lede section-lede--light">
            From bulk manufacturing to in-house embroidery, custom design, and
            nationwide distribution — Ayesha G Garments is built to move fashion
            at wholesale speed.
          </p>
        </Reveal>

        <div className="services__timeline" ref={timelineRef}>
          <div className="services__spine" style={{ "--progress": progress }} aria-hidden="true" />

          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            const side = i % 2 === 0 ? "left" : "right";
            return (
              <Reveal
                as="article"
                key={service.title}
                className={`service-row service-row--${side}`}
              >
                <div className="service-row__node">
                  <Icon />
                </div>
                <div className="service-row__card">
                  <span className="service-row__index" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="service-row__title">{service.title}</h3>
                  <p className="service-row__desc">{service.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
