// Sprawdza, czy każdy tekst ze strony sprzed redesignu (commit 336199d) występuje
// dosłownie w statycznym HTML nowego buildu. Uruchom po `npm run build`:
//   node scripts/verify-content.mjs

import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const BASE = process.env.BASE_COMMIT ?? "336199d";

const sources = {
  home: [
    "app/layout.tsx",
    "app/sections/header.tsx",
    "app/sections/hero.tsx",
    "app/sections/about.tsx",
    "app/sections/offer.tsx",
    "app/sections/process.tsx",
    "app/sections/faq.tsx",
    "app/sections/contact.tsx",
    "app/sections/footer.tsx",
  ],
  cennik: ["app/layout.tsx", "app/sections/header.tsx", "app/cennik/page.tsx", "app/sections/footer.tsx"],
};

const built = {
  home: ".next/server/app/index.html",
  cennik: ".next/server/app/cennik.html",
};

// Teksty, które celowo zmieniły formę (nie treść) — wypisywane osobno.
const intentional = new Map([
  ["cennik|Aleksander Pawłowski | Mobilny masażysta", "/cennik ma teraz własny, zaakceptowany title „Cennik | Aleksander Pawłowski”"],
  // Teksty zastąpione nowymi informacjami z profilu na Facebooku (posty z 23 maja i 11 września 2026)
  ["home|Mobilny masażysta. Student fizjoterapii. Koszykarz. Cały czas się uczę.", "zmienione na prośbę właściciela na podstawie profilu na Facebooku (X 2026)"],
  ["home|Na co dzień jestem studentem 3 roku fizjoterapii na Akademii Medycznej Nauk Stosowanych i Holistycznych. Jestem osobą ambitną i zdyscyplinowaną, co potwierdza fakt posiadania stypendium rektora tejże uczelni 2 rok z rzędu. Dodatkowo w kontekście masażu opanowałem kurs kobido i cały rytuał kobido complex dzięki specjalnemu szkoleniu.", "zmienione na prośbę właściciela na podstawie profilu na Facebooku (X 2026)"],
  ["home|Studiuję fizjoterapię w Akademii Medycznej Nauk Stosowanych i Holistycznych. Jestem też certyfikowanym technikiem masażystą. Wiedza z zajęć i codzienna praca z ludźmi pomagają mi rozwijać warsztat.", "zmienione na prośbę właściciela na podstawie profilu na Facebooku (X 2026)"],
  ["home|Doświadczenie ruchowe", "zmienione na prośbę właściciela na podstawie profilu na Facebooku (X 2026)"],
  ["home|Od dziecka gram w koszykówkę. Dobrze rozumiem, jak ciało reaguje na wysiłek, gdzie pojawiają się napięcia i jak można je skutecznie rozluźnić.", "zmienione na prośbę właściciela na podstawie profilu na Facebooku (X 2026)"],
  ["home|Koszykarz", "zmienione na prośbę właściciela na podstawie profilu na Facebooku (X 2026)"],
  ["home|Życiowa pasja", "zmienione na prośbę właściciela na podstawie profilu na Facebooku (X 2026)"],
  ["home|Stały rozwój", "zmienione na prośbę właściciela na podstawie profilu na Facebooku (X 2026)"],
  ["home|Kursy i szkolenia", "zmienione na prośbę właściciela na podstawie profilu na Facebooku (X 2026)"],
  ["home|Wszystkie zabiegi dostosowuję do Twoich potrzeb. Niezależnie od tego, czy potrzebujesz głębokiego relaksu, czy szybkiej ulgi w napiętych partiach ciała.", "zmienione na prośbę właściciela na podstawie profilu na Facebooku (X 2026)"],
  ["home|Na terenie Sochaczewa i najbliższych okolic. Jeśli mieszkasz trochę dalej, napisz i sprawdzimy, czy damy radę.", "zmienione na prośbę właściciela na podstawie profilu na Facebooku (X 2026)"],
  ["home|Dojazd gratis", "zmienione na prośbę właściciela na podstawie profilu na Facebooku (X 2026)"],
]);

const norm = (s) => s.replace(/\s+/g, " ").trim();
const hasWords = (s) => (s.match(/\p{L}/gu) ?? []).length >= 2;

function extract(file) {
  const src = execSync(`git show ${BASE}:${file}`, { encoding: "utf8" });
  const out = new Set();
  // Tekst w JSX: >tekst< oraz }tekst<
  for (const m of src.matchAll(/[>}]([^<>{}]+)</g)) {
    const t = norm(m[1]);
    if (hasWords(t) && !/^:|[=;]|=>|\bconst\b|\breturn\b/.test(t)) out.add(t);
  }
  // Dane w tablicach i metadane
  for (const m of src.matchAll(/\b(title|text|description|label|meta|question|answer|name|duration|price):\s*\n?\s*"([^"]+)"/g)) {
    out.add(norm(m[2]));
  }
  for (const m of src.matchAll(/features:\s*\[([^\]]+)\]/g)) {
    for (const f of m[1].matchAll(/"([^"]+)"/g)) out.add(norm(f[1]));
  }
  return [...out].filter(hasWords);
}

function pageText(file) {
  let html = readFileSync(file, "utf8");
  const title = (html.match(/<title>([^<]*)<\/title>/) ?? [])[1] ?? "";
  const description = (html.match(/<meta name="description" content="([^"]*)"/) ?? [])[1] ?? "";
  html = html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(br|\/p|\/li|\/h\d|\/div|\/span|\/a|\/button|\/summary|\/dt|\/dd)[^>]*>/g, "$& ")
    .replace(/<[^>]+>/g, "");
  const decode = (s) =>
    s
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#x27;|&#39;/g, "'")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&nbsp;/g, " ");
  return norm(decode(`${title} ${description} ${html}`));
}

let missing = 0;
for (const page of Object.keys(sources)) {
  const text = pageText(built[page]);
  const strings = [...new Set(sources[page].flatMap(extract))];
  const notFound = strings.filter((s) => !text.includes(s));
  console.log(`\n${page}: sprawdzono ${strings.length} tekstów`);
  for (const s of notFound) {
    const key = `${page}|${s}`;
    if (intentional.has(key)) console.log(`  ~ celowo: "${s}" — ${intentional.get(key)}`);
    else {
      missing++;
      console.log(`  ✗ BRAK: "${s}"`);
    }
  }
}
console.log(missing ? `\n${missing} tekstów do przywrócenia` : "\nWszystkie teksty z oryginału są na miejscu.");
process.exit(missing ? 1 : 0);
