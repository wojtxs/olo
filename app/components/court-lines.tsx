// Połowa boiska do koszykówki (proporcje 50 × 47 stóp) — motyw linii w całej wersji „Boisko”.
export function CourtLines({ className, strokeWidth = 2 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 500 470" fill="none" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <g stroke="currentColor" strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke">
        <rect x="1" y="1" width="498" height="468" vectorEffect="non-scaling-stroke" />
        <rect x="170" y="1" width="160" height="189" vectorEffect="non-scaling-stroke" />
        <circle cx="250" cy="190" r="60" vectorEffect="non-scaling-stroke" />
        <path d="M220 40h60M250 40v5" vectorEffect="non-scaling-stroke" />
        <circle cx="250" cy="52.5" r="7.5" vectorEffect="non-scaling-stroke" />
        <path d="M210 52.5a40 40 0 0 0 80 0" vectorEffect="non-scaling-stroke" />
        <path d="M30 1v139a237.5 237.5 0 0 0 440 0V1" vectorEffect="non-scaling-stroke" />
        <path d="M190 469a60 60 0 0 1 120 0" vectorEffect="non-scaling-stroke" />
      </g>
    </svg>
  );
}
