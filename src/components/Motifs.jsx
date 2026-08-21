// Decorative textile-inspired motifs used in place of product photography
// (the content brief notes gallery photography is still to be supplied).
// All patterns are drawn in pure SVG so the site never depends on external images.

export function PaisleyMotif({ className = "", id = "paisley" }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <pattern id={id} width="50" height="50" patternUnits="userSpaceOnUse" patternTransform="rotate(12)">
          <path
            d="M25 6c10 0 16 8 14 17-1.6 7-8 9-8 15 0 5 4 7 9 6.4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            opacity="0.55"
          />
          <circle cx="25" cy="9" r="2.2" fill="currentColor" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="200" height="200" fill={`url(#${id})`} />
    </svg>
  );
}

export function FloralMotif({ className = "", id = "floral" }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <pattern id={id} width="44" height="44" patternUnits="userSpaceOnUse">
          <g transform="translate(22 22)" opacity="0.55">
            <circle r="3" fill="currentColor" />
            <circle cx="7" cy="0" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="-7" cy="0" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="0" cy="7" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="0" cy="-7" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </g>
        </pattern>
      </defs>
      <rect width="200" height="200" fill={`url(#${id})`} />
    </svg>
  );
}

export function GeometricMotif({ className = "", id = "geometric" }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <pattern id={id} width="36" height="36" patternUnits="userSpaceOnUse">
          <path
            d="M0 18 L18 0 L36 18 L18 36 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
            opacity="0.5"
          />
          <circle cx="18" cy="18" r="2" fill="currentColor" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="200" height="200" fill={`url(#${id})`} />
    </svg>
  );
}

export function LatticeMotif({ className = "", id = "lattice" }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <pattern id={id} width="30" height="30" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="15" x2="30" y2="15" stroke="currentColor" strokeWidth="1" opacity="0.4" />
          <line x1="15" y1="0" x2="15" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        </pattern>
      </defs>
      <rect width="200" height="200" fill={`url(#${id})`} />
    </svg>
  );
}

export const motifByPattern = {
  paisley: PaisleyMotif,
  floral: FloralMotif,
  geometric: GeometricMotif,
  lattice: LatticeMotif,
};

// A larger decorative border flourish used behind hero / section headings.
export function CornerFlourish({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <path
        d="M4 60C4 28 28 4 60 4"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <path
        d="M18 60c0-23 19-42 42-42"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.35"
      />
      <circle cx="60" cy="4" r="3" fill="currentColor" opacity="0.7" />
      <circle cx="4" cy="60" r="3" fill="currentColor" opacity="0.7" />
    </svg>
  );
}
