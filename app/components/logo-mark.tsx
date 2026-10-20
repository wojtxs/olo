// Znak z logo Aleksandra (plecy z kręgosłupem i dłoń), przerysowany wektorowo
// z pliku od właściciela. Kształt daje maska /logo-znak.svg, kolor — currentColor.
export function LogoMark({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`logo-mark ${className}`} />;
}
