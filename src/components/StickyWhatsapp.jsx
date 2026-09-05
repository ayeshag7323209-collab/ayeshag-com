import { brand } from "../data/content.js";
import { WhatsappIcon } from "./Icons.jsx";

// Fixed-position WhatsApp button, present on every screen size. Sits above
// everything else in the page (see z-index in the CSS) so it's always
// reachable without hunting for the Contact section.
export default function StickyWhatsapp() {
  return (
    <a
      href={brand.whatsapp}
      className="sticky-whatsapp"
      target="_blank"
      rel="noreferrer"
      aria-label={`Chat with ${brand.name} on WhatsApp`}
    >
      <span className="sticky-whatsapp__ping" aria-hidden="true" />
      <WhatsappIcon width={28} height={28} />
    </a>
  );
}
