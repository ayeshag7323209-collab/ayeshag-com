// Central content store — sourced from the Ayesha G Garments website brief.
// Edit copy, links and contact details here; components read from this file.

import logo from "../assets/logo.png";
import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";
import aboutPhoto from "../assets/about.jpg";
import founderPhoto from "../assets/ceo.jpg";
import mannequinPhoto from "../assets/mannequin.png";
import wardrobe1 from "../assets/wardrobe1.jpg";
import wardrobe2 from "../assets/wardrobe2.jpg";

import collection1 from "../assets/collection1.jpg";
import collection2 from "../assets/collection2.jpg";
import collection3 from "../assets/collection3.jpg";
import collection4 from "../assets/collection4.jpg";
import collection5 from "../assets/collection5.jpg";
import collection6 from "../assets/collection6.jpg";
import collection7 from "../assets/collection7.jpg";
import collection8 from "../assets/collection8.jpg";
import collection9 from "../assets/collection9.jpg";
import collection10 from "../assets/collection10.jpg";
import collection11 from "../assets/collection11.jpg";
import collection12 from "../assets/collection12.jpg";
import collection13 from "../assets/collection13.jpg";
import collection14 from "../assets/collection14.jpg";
import collection15 from "../assets/collection15.jpg";
import collection16 from "../assets/collection16.jpg";
import collection17 from "../assets/collection17.jpg";

export const brand = {
  name: "Ayesha G Garments",
  tagline: "Wholesale Ladies Fashion, Made in Bulk, Delivered with Pride",
  address: "2 Dhani Ram Road, New Anarkali, Lahore, Pakistan",
  established: "30+ Years",
  phone: "[Insert Number]",
  email: "[Insert Email]",
  hours: "[Insert Hours]",
  whatsapp: "#",
  logo,
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Order", href: "#order" },
  { label: "Contact", href: "#contact" },
];

export const heroSlides = [
  {
    kicker: "Est. 30+ Years — New Anarkali, Lahore",
    headline: "From the Heart of Anarkali, Lahore, to Wardrobes Around the World",
    subheadline:
      "Three decades of stitching trust into every thread. Wholesale ladies' fashion, made in bulk, delivered with pride.",
    cta: "Explore Our Collection",
    ctaHref: "#services",
    theme: "maroon",
    image: slide1,
  },
  {
    kicker: "Design Floor × In-House Embroidery",
    headline: "Where Fancy Meets Fashion — Ayesha G Garments Sets the Trend",
    subheadline:
      "Our design floor and embroidery unit turn fresh ideas into bulk-ready fancy dresses and party wear — three piece, two piece, and kurtas that set the season's tone before anyone else does.",
    cta: "Start Your Bulk Order",
    ctaHref: "#order",
    theme: "plum",
    image: slide2,
  },
  {
    kicker: "Retailers · Wholesalers · Online Sellers",
    headline: "One Name. Every Market. Retailers, Wholesalers & Online Sellers Trust Us.",
    subheadline:
      "From local boutiques in Lahore to online stores shipping nationwide — we're the production partner behind Pakistan's fastest-moving fashion.",
    cta: "Get in Touch",
    ctaHref: "#contact",
    theme: "gold",
    image: slide3,
  },
];

export const stats = [
  { value: "30+", label: "Years of Craftsmanship" },
  { value: "1000+", label: "Pieces Produced Monthly" },
  { value: "3", label: "Buyer Networks Served" },
  { value: "2", label: "In-House Production Units" },
];

export const services = [
  {
    icon: "scissors",
    title: "Bulk Manufacturing of Ladies' Fashion Wear",
    description:
      "We produce shalwar kameez (three piece & two piece) and kurtas in bulk quantities, tailored to fit fast-moving retail and wholesale demand — without long wait times.",
  },
  {
    icon: "needle",
    title: "In-House Embroidery Unit",
    description:
      "Equipped with the latest embroidery machines and technology, our embroidery unit adds intricate, trend-driven detailing to every piece — giving each design a signature finish that stands out on the rack.",
  },
  {
    icon: "ruler",
    title: "Custom Bulk Orders — Made on Demand",
    description:
      "Have a specific design, fabric, or quantity in mind? We manufacture fully custom bulk orders, built around your brand's requirements, timelines, and target market.",
  },
  {
    icon: "network",
    title: "Supply Network — Retailers, Wholesalers & Online Sellers",
    description:
      "We proudly supply retailers looking for fresh, ready-to-sell stock, wholesalers across Pakistan seeking dependable bulk partners, and online sellers who need consistent quality to build their brand reputation.",
  },
  {
    icon: "globe",
    title: "Nationwide & Worldwide Reach",
    description:
      "Rooted in Anarkali, Lahore, but built to serve local markets, national distributors, and international buyers — our production capacity scales with your order.",
  },
];

// Gallery filter categories
export const galleryFilters = [
  { key: "all", label: "All" },
  { key: "wedding", label: "Wedding & Festive" },
  { key: "evening", label: "Evening & Event" },
  { key: "daily", label: "Two-Piece & Daily" },
  { key: "signature", label: "Signature Embroidery" },
];

const catLabel = {
  wedding: "Wedding & Festive",
  evening: "Evening & Event",
  daily: "Two-Piece & Daily",
  signature: "Signature Embroidery",
};

const catTitle = {
  wedding: "Wedding & Festive Edit",
  evening: "Evening & Event Look",
  daily: "Everyday Two-Piece",
  signature: "Signature Embroidery Piece",
};

// Round-robin the four catalogue categories across the supplied product photography.
const rotation = ["wedding", "evening", "daily", "signature"];
const collectionPhotos = [
  collection1,
  collection2,
  collection3,
  collection4,
  collection5,
  collection6,
  collection7,
  collection8,
  collection9,
  collection10,
  collection11,
  collection12,
  collection13,
  collection14,
  collection15,
  collection16,
  collection17,
];

export const galleryItems = collectionPhotos.map((image, i) => {
  const category = rotation[i % rotation.length];
  return {
    id: `collection-${i + 1}`,
    image,
    category,
    tag: catLabel[category],
    title: `${catTitle[category]} ${Math.floor(i / rotation.length) + 1}`,
  };
});

// Wide "feature" cards spotlighting the boutique itself, woven into the grid.
export const galleryFeatures = [
  { id: "boutique-1", image: wardrobe1, title: "Inside Our Boutique — Bulk-Ready Stock", tag: "Our Boutique" },
  { id: "boutique-2", image: wardrobe2, title: "Every Shade, Every Season", tag: "Our Boutique" },
];

export const galleryBackground = wardrobe1;
export const orderCtaBackground = wardrobe2;
export const aboutImage = aboutPhoto;
export const founderImage = founderPhoto;
export const mannequinImage = mannequinPhoto;

export const orderOptions = [
  { label: "Place a Bulk Order", primary: true, href: "#contact" },
  { label: "Request a Custom Design", primary: false, href: "#contact" },
  { label: "Download Our Catalogue", primary: false, href: "#contact" },
];

export const introParagraphs = [
  "Tucked into the bustling lanes of New Anarkali, Lahore — a name synonymous with Pakistan's textile heritage — stands Ayesha G Garments, a business built not on shortcuts, but on stitches perfected over more than 30 years.",
  "We are a wholesale manufacturer and distributor of ladies' fancy and party wear, specializing in shalwar kameez, three-piece and two-piece suits, and kurtas that carry the pulse of Pakistani fashion. What began as a modest workshop on Dhani Ram Road has grown into a full-scale production house — complete with a modern stitching unit and an advanced embroidery facility — built to serve one purpose: producing fashion in bulk, without ever compromising on detail.",
  "At Ayesha G Garments, fancy and party wear isn't a side line — it's where our craftsmanship shines brightest. Every three-piece and kurta that leaves our embroidery floor is designed with occasion in mind: the shimmer for a wedding, the elegance for an evening event, the everyday charm that turns a simple outing into a statement. We don't just follow the market — with every seasonal collection, we help shape it, designing trend-forward, festival-ready pieces that retailers race to stock and customers rush to wear.",
  "Today, the Ayesha G Garments name reaches local boutiques, national wholesale markets, and online fashion stores — proof that Anarkali's needle-and-thread legacy is very much alive, and stitching its way onto the global stage.",
];
