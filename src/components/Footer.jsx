import { brand, navLinks } from "../data/content.js";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a href="#home" className="footer__brand" aria-label={`${brand.name} — go to home`}>
          <span className="navbar__logo-chip">
            <img src={brand.logo} alt={brand.name} className="navbar__logo" />
          </span>
          <div>
            <p className="footer__name">{brand.name}</p>
            <p className="footer__tagline">{brand.tagline}</p>
          </div>
        </a>

        <nav className="footer__links" aria-label="Footer">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <p className="footer__address">{brand.address}</p>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <p>
            © {year} {brand.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
