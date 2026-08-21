import { useEffect, useState } from "react";
import { brand, navLinks } from "../data/content.js";
import { MenuIcon, CloseIcon } from "./Icons.jsx";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner container">
        <a href="#home" className="navbar__brand" onClick={() => setOpen(false)} aria-label={`${brand.name} — go to home`}>
          <span className="navbar__logo-chip">
            <img src={brand.logo} alt={brand.name} className="navbar__logo" />
          </span>
          <span className="navbar__sub">New Anarkali · Lahore</span>
        </a>

        <nav className="navbar__links" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="navbar__cta btn btn--gold btn--sm">
          Get in Touch
        </a>

        <button
          className="navbar__toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <div className={`navbar__mobile ${open ? "is-open" : ""}`}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <a href="#contact" className="btn btn--gold" onClick={() => setOpen(false)}>
          Get in Touch
        </a>
      </div>
    </header>
  );
}
