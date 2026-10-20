import { mapData } from "@/app/components/map-data";
import { contact, contactSection } from "@/app/content";

// Mapa dojazdu narysowana z danych OpenStreetMap: kredowe linie na grafitowym tle, jak tablica trenera.
export function AreaMap() {
  const { width, height, city } = mapData;
  const pad = 0.08;
  const view = `${width * pad} ${height * pad} ${width * (1 - 2 * pad)} ${height * (1 - 2 * pad)}`;

  return (
    <figure className="relative overflow-hidden border-2 border-grafit bg-grafit">
      <svg viewBox={view} className="block h-auto w-full" role="img" aria-labelledby="mapa-tytul">
        <title id="mapa-tytul">{`${contactSection.mapTitle} — ${contact.area}`}</title>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d={mapData.minor} stroke="rgba(242,238,230,0.22)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <path d={mapData.rail} stroke="var(--mgla)" strokeWidth="1" strokeDasharray="1 5" vectorEffect="non-scaling-stroke" />
          <path d={mapData.major} stroke="var(--kreda)" strokeWidth="1.75" vectorEffect="non-scaling-stroke" />
          <path d={mapData.river} stroke="#7fa39a" strokeWidth="3" vectorEffect="non-scaling-stroke" />
        </g>
        <circle cx={city.x} cy={city.y} r={width * 0.2} fill="var(--szafran)" fillOpacity="0.16" />
        <circle
          cx={city.x}
          cy={city.y}
          r={width * 0.2}
          fill="none"
          stroke="var(--szafran)"
          strokeWidth="2"
          strokeDasharray="6 6"
          vectorEffect="non-scaling-stroke"
        />
        <circle cx={city.x} cy={city.y} r="9" fill="var(--szafran)" />
      </svg>
      <figcaption className="absolute bottom-2 right-3 text-[0.6875rem] text-mgla">
        ©{" "}
        <a href="https://www.openstreetmap.org/copyright" className="underline" rel="noopener" target="_blank">
          OpenStreetMap
        </a>
      </figcaption>
    </figure>
  );
}
