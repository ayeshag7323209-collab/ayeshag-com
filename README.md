# Ayesha G Garments — Website

A responsive, single-page React website built for Ayesha G Garments, a wholesale
ladies' fashion manufacturer in New Anarkali, Lahore. Built with React 19 + Vite
and plain CSS (no framework lock-in), using your real logo and product photography
throughout.

## Getting started

You'll need [Node.js](https://nodejs.org) 18 or newer installed.

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## Building for production

```bash
npm run build
```

This outputs a production-ready `dist/` folder you can upload to any static
host (Netlify, Vercel, GitHub Pages, cPanel, etc.). Preview the production
build locally with:

```bash
npm run preview
```

## Project structure

```
src/
  assets/                   Your logo, hero photos & product photography (optimized)
  data/content.js            All site copy, contact details, images & links — edit here first
  hooks/
    useReveal.js              Scroll-triggered fade/slide-up animation hook
    useCountUp.js              Animated number count-up for the stats strip
  components/
    Navbar.jsx                Sticky nav — real logo image, linked to home
    Hero.jsx                   Auto-playing 3-slide hero with photo backgrounds + Ken Burns zoom
    TrustBar.jsx                Stats strip with animated counters
    About.jsx                   Brand story with photo collage (shop + founder)
    Services.jsx                 Service cards incl. Fancy & Party Wear highlight
    Gallery.jsx                   Filterable product gallery + click-to-enlarge lightbox
    Lightbox.jsx                  Full-screen image viewer (keyboard + arrow navigation)
    Reveal.jsx                    Wrapper component driving scroll-reveal animation
    OrderCTA.jsx                   Bulk order banner with boutique photo backdrop
    Contact.jsx                     Contact details + inquiry form
    Footer.jsx
    Icons.jsx                       Hand-drawn SVG icon set
    Motifs.jsx                       Decorative paisley/floral SVG accents
  index.css                       All styling (design tokens at the top)
```

## What's dynamic

- **Hero** — auto-playing slider over your 3 photos, with a slow Ken Burns
  zoom, a progress bar under the active dot, swipe-free prev/next controls,
  and a themed color-tint overlay per slide for legibility.
- **Scroll reveals** — section headings, service cards, and gallery tiles
  fade/slide into view the first time they scroll into the viewport
  (`useReveal.js`, respects `prefers-reduced-motion`).
- **Animated stats** — the trust bar counts up from 0 to each figure once it
  scrolls into view.
- **Gallery** — filterable by category (Wedding & Festive, Evening & Event,
  Two-Piece & Daily, Signature Embroidery), with a hover zoom on each tile and
  a full-screen lightbox (click a tile, then arrow keys / on-screen arrows /
  Esc to navigate).

## Things to finish before launch

Search `[Insert` in `src/data/content.js` to find the remaining placeholders:

- **Phone number, email, business hours** — set in the `brand` object.
- **WhatsApp link** — set `brand.whatsapp` to your `https://wa.me/92XXXXXXXXXX` link.
- **Contact form backend** — the inquiry form in `Contact.jsx` currently just
  shows a success message. Wire `handleSubmit` up to a form service (Formspree,
  EmailJS) or your own API endpoint to actually receive submissions.
- **Map** — the contact section shows a stylized placeholder map card. Swap
  it for an embedded Google Maps iframe once you have a place link.

## About the images

Your uploaded logo and photos were compressed for the web (same look, far
smaller file size — e.g. the two boutique interior shots went from ~2.5MB PNGs
to ~350KB JPGs) and placed in `src/assets/`. Gallery photos are auto-sorted
into the four filter categories in a round-robin in `src/data/content.js` — if
you'd rather hand-pick which photo goes in which category, edit the `rotation`
array logic there, or just reorder/relabel the `galleryItems` entries.

To add more product photos later: drop the file in `src/assets/`, import it at
the top of `content.js`, and add it to the `collectionPhotos` array.

## Customizing the look

All colors, fonts, spacing and shadows are defined as CSS custom properties
at the top of `src/index.css` under `:root`. Change the palette there and it
cascades through the whole site.
