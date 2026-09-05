import { brand, navLinks, socialLinks } from "../data/content.js";
import { InstagramIcon, FacebookIcon, YoutubeIcon, TiktokIcon, WhatsappIcon } from "./Icons.jsx";

const socialRow = [
  { key: "instagram", label: "Instagram", href: socialLinks.instagram, Icon: InstagramIcon },
  { key: "facebook", label: "Facebook", href: socialLinks.facebook, Icon: FacebookIcon },
  { key: "youtube", label: "YouTube", href: socialLinks.youtube, Icon: YoutubeIcon },
  { key: "tiktok", label: "TikTok", href: socialLinks.tiktok, Icon: TiktokIcon },
  { key: "whatsapp", label: "WhatsApp", href: brand.whatsapp, Icon: WhatsappIcon },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a href="#home" className="footer__brand" aria-label={`${brand.name} — go to home`}>
          <span className="navbar__logo-chip">
            <img src={brand.logo} alt={brand.name} className="navbar__logo" />
          </span>
        </a>

        <p className="footer__tagline">{brand.tagline}</p>

        <nav className="footer__links" aria-label="Footer">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="footer__social" aria-label="Follow us">
          {socialRow.map(({ key, label, href, Icon }) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="footer__social-icon"
            >
              <Icon width={18} height={18} />
            </a>
          ))}
        </div>

        <div className="footer__rule" aria-hidden="true" />

        <p className="footer__meta">
          © {year} {brand.name} · {brand.address}
        </p>
      </div>
    </footer>
  );
}
