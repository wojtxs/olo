import { mapData } from "@/app/components/map-data";
import { contact, contactSection } from "@/app/content";

// Własna mapa dojazdu narysowana z danych OpenStreetMap — bez iframe'u i zewnętrznych skryptów.
export function AreaMap() {
  const { width, height, city } = mapData;
  const pad = 0.08;
  const view = `${width * pad} ${height * pad} ${width * (1 - 2 * pad)} ${height * (1 - 2 * pad)}`;

  return (
    <figure className="relative overflow-hidden bg-len">
      <svg viewBox={view} className="block h-auto w-full" role="img" aria-labelledby="mapa-tytul">
        <title id="mapa-tytul">{`${contactSection.mapTitle} — ${contact.area}`}</title>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d={mapData.minor} stroke="var(--linia)" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
          <path d={mapData.rail} stroke="var(--piasek)" strokeWidth="1" strokeDasharray="1 5" vectorEffect="non-scaling-stroke" />
          <path d={mapData.major} stroke="var(--piasek)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <path d={mapData.river} stroke="#a9b8b6" strokeWidth="3" vectorEffect="non-scaling-stroke" />
        </g>
        <circle cx={city.x} cy={city.y} r={width * 0.2} fill="var(--glina)" fillOpacity="0.07" />
        <circle
          cx={city.x}
          cy={city.y}
          r={width * 0.2}
          fill="none"
          stroke="var(--glina)"
          strokeOpacity="0.5"
          strokeWidth="1"
          strokeDasharray="4 6"
          vectorEffect="non-scaling-stroke"
        />
        <circle cx={city.x} cy={city.y} r="7" fill="var(--glina)" />
        <circle cx={city.x} cy={city.y} r="16" fill="none" stroke="var(--glina)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      <figcaption className="absolute bottom-2 right-3 text-[0.6875rem] text-kamien">
        ©{" "}
        <a href="https://www.openstreetmap.org/copyright" className="underline" rel="noopener" target="_blank">
          OpenStreetMap
        </a>
      </figcaption>
    </figure>
  );
}
