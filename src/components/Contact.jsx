import { useState } from "react";
import emailjs from "@emailjs/browser";
import { brand, emailjs as emailjsConfig } from "../data/content.js";
import { PinIcon, PhoneIcon, MailIcon, WhatsappIcon, ArrowIcon } from "./Icons.jsx";
import Reveal from "./Reveal.jsx";

const initialForm = { name: "", phone: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          from_name: form.name,
          phone: form.phone,
          message: form.message,
        },
        { publicKey: emailjsConfig.publicKey }
      )
      .then(() => setStatus("sent"))
      .catch((err) => {
        console.error("EmailJS send failed:", err);
        setStatus("error");
      });
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
                  <a className="contact__value contact__value--link" href={`tel:${brand.phone.replace(/\s+/g, "")}`}>
                    {brand.phone}
                  </a>
                </div>
              </li>
              <li>
                <span className="contact__icon">
                  <MailIcon />
                </span>
                <div>
                  <span className="contact__label">Email</span>
                  <a className="contact__value contact__value--link" href={`mailto:${brand.email}`}>
                    {brand.email}
                  </a>
                </div>
              </li>
            </ul>

            <a className="btn btn--whatsapp" href={brand.whatsapp}>
              <WhatsappIcon />
              WhatsApp Us
            </a>

            {/* Real embed once brand.mapEmbedUrl is set in data/content.js
                (see the comment there for how to get that URL from Google
                Maps). Falls back to the plain pin placeholder until then, so
                nothing breaks in the meantime. */}
            {brand.mapEmbedUrl ? (
              <div className="contact__map">
                <iframe
                  src={brand.mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  title={`Map showing our location: ${brand.address}`}
                />
              </div>
            ) : (
              <div
                className="contact__map"
                role="img"
                aria-label={`Map location of Ayesha G Garments in New Anarkali, Lahore`}
              >
                <div className="contact__map-pin">
                  <PinIcon width={30} height={30} />
                </div>
                <span>New Anarkali, Lahore</span>
              </div>
            )}
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            {status === "sent" ? (
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
                    setStatus("idle");
                  }}
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <>
                <h3 className="contact__form-title">Send an Inquiry</h3>
                <div className="contact__field">
                  <label htmlFor="name">Name</label>
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
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="So we can get back to you"
                  />
                </div>
                <div className="contact__field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about the design, fabric, or timeline you have in mind"
                  />
                </div>

                {status === "error" && (
                  <p className="contact__error">
                    Something went wrong sending your inquiry. Please try
                    again, or reach us directly via WhatsApp or phone.
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn--gold btn--lg contact__submit"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending..." : "Send Inquiry"}
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
