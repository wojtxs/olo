import { mapData } from "@/app/components/map-data";
import { contact, contactSection } from "@/app/content";

// Mapa dojazdu narysowana z danych OpenStreetMap — bez iframe'u i zewnętrznych skryptów.
export function AreaMap() {
  const { width, height, city } = mapData;
  const pad = 0.08;
  const view = `${width * pad} ${height * pad} ${width * (1 - 2 * pad)} ${height * (1 - 2 * pad)}`;

  return (
    <figure className="relative overflow-hidden rounded-[2rem] bg-wino-2">
      <svg viewBox={view} className="block h-auto w-full" role="img" aria-labelledby="mapa-tytul">
        <title id="mapa-tytul">{`${contactSection.mapTitle} — ${contact.area}`}</title>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d={mapData.minor} stroke="rgba(247,230,218,0.18)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <path d={mapData.rail} stroke="var(--mut-jasny)" strokeWidth="1" strokeDasharray="1 5" vectorEffect="non-scaling-stroke" />
          <path d={mapData.major} stroke="var(--mut-jasny)" strokeWidth="1.75" vectorEffect="non-scaling-stroke" />
          <path d={mapData.river} stroke="var(--miod)" strokeWidth="3" vectorEffect="non-scaling-stroke" />
        </g>
        <circle cx={city.x} cy={city.y} r={width * 0.2} fill="var(--brzoskwinia)" fillOpacity="0.18" />
        <circle
          cx={city.x}
          cy={city.y}
          r={width * 0.2}
          fill="none"
          stroke="var(--brzoskwinia)"
          strokeWidth="1.5"
          strokeDasharray="5 7"
          vectorEffect="non-scaling-stroke"
        />
        <circle cx={city.x} cy={city.y} r="9" fill="var(--brzoskwinia)" />
      </svg>
      <figcaption className="absolute bottom-2 right-4 text-[0.6875rem] text-mut-jasny">
        ©{" "}
        <a href="https://www.openstreetmap.org/copyright" className="underline" rel="noopener" target="_blank">
          OpenStreetMap
        </a>
      </figcaption>
    </figure>
  );
}
