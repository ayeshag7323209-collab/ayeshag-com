import { useState } from "react";
import { brand } from "../data/content.js";
import { PinIcon, PhoneIcon, MailIcon, ClockIcon, WhatsappIcon, ArrowIcon } from "./Icons.jsx";
import Reveal from "./Reveal.jsx";

const initialForm = { name: "", company: "", quantity: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend is wired up yet — replace this with your form endpoint,
    // e.g. an emailjs, Formspree, or custom API call.
    setSubmitted(true);
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <Reveal as="div" className="section-heading">
          <p className="eyebrow">Contact Us</p>
          <h2 className="section-title">Let's Talk Bulk, Custom & Delivery Timelines</h2>
          <p className="section-lede">
            Retailers, wholesalers, and online sellers — reach out to discuss
            quantities, custom designs, and delivery timelines.
          </p>
        </Reveal>

        <div className="contact__grid">
          <div className="contact__info">
            <ul className="contact__list">
              <li>
                <span className="contact__icon">
                  <PinIcon />
                </span>
                <div>
                  <span className="contact__label">Visit Us</span>
                  <span className="contact__value">{brand.address}</span>
                </div>
              </li>
              <li>
                <span className="contact__icon">
                  <PhoneIcon />
                </span>
                <div>
                  <span className="contact__label">Phone</span>
                  <span className="contact__value">{brand.phone}</span>
                </div>
              </li>
              <li>
                <span className="contact__icon">
                  <MailIcon />
                </span>
                <div>
                  <span className="contact__label">Email</span>
                  <span className="contact__value">{brand.email}</span>
                </div>
              </li>
              <li>
                <span className="contact__icon">
                  <ClockIcon />
                </span>
                <div>
                  <span className="contact__label">Business Hours</span>
                  <span className="contact__value">{brand.hours}</span>
                </div>
              </li>
            </ul>

            <a className="btn btn--whatsapp" href={brand.whatsapp}>
              <WhatsappIcon />
              WhatsApp Us
            </a>

            <div className="contact__map" role="img" aria-label="Map location of Ayesha G Garments in New Anarkali, Lahore">
              <div className="contact__map-pin">
                <PinIcon width={30} height={30} />
              </div>
              <span>New Anarkali, Lahore</span>
            </div>
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            {submitted ? (
              <div className="contact__success">
                <h3>Thank you!</h3>
                <p>
                  Your inquiry has been noted. Our team will get back to you
                  shortly to discuss quantities and timelines.
                </p>
                <button
                  type="button"
                  className="btn btn--outline btn--sm"
                  onClick={() => {
                    setForm(initialForm);
                    setSubmitted(false);
                  }}
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <>
                <h3 className="contact__form-title">Send an Inquiry</h3>
                <div className="contact__field">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                  />
                </div>
                <div className="contact__field">
                  <label htmlFor="company">Business / Brand Name</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Retailer, wholesaler, or online store"
                  />
                </div>
                <div className="contact__field">
                  <label htmlFor="quantity">Estimated Quantity</label>
                  <input
                    id="quantity"
                    name="quantity"
                    type="text"
                    value={form.quantity}
                    onChange={handleChange}
                    placeholder="e.g. 200 pieces"
                  />
                </div>
                <div className="contact__field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about the design, fabric, or timeline you have in mind"
                  />
                </div>
                <button type="submit" className="btn btn--gold btn--lg contact__submit">
                  Send Inquiry
                  <ArrowIcon width={20} height={20} />
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
