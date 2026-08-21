import { orderOptions, orderCtaBackground } from "../data/content.js";
import Reveal from "./Reveal.jsx";

export default function OrderCTA() {
  return (
    <section id="order" className="order-cta">
      <div className="order-cta__bg" style={{ backgroundImage: `url(${orderCtaBackground})` }} />
      <div className="order-cta__overlay" />
      <Reveal as="div" className="container order-cta__inner">
        <h2 className="order-cta__title">
          Ready to Stock Your Shelves — or Your Online Store — With Fashion
          That Sells Itself?
        </h2>
        <p className="order-cta__text">
          Whether you need 50 pieces or 5,000, the Ayesha G Garments stitching
          and embroidery units are built for bulk. Tell us your design
          preference, quantity, and timeline, and we'll turn it into
          ready-to-wear stock, delivered on schedule.
        </p>
        <div className="order-cta__buttons">
          {orderOptions.map((opt) => (
            <a
              key={opt.label}
              href={opt.href}
              className={`btn ${opt.primary ? "btn--gold" : "btn--outline"} btn--lg`}
            >
              {opt.label}
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
