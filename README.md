# Aleksander Pawłowski — mobilny masażysta

Statyczna strona w Next.js 16 (App Router). Obie trasy (`/` i `/cennik`) są prerenderowane przy buildzie, bez backendu.

```bash
npm run dev     # podgląd lokalny
npm run build   # build produkcyjny (oba widoki jako statyczny HTML)
```

## Struktura

- `app/content.ts` — cała treść strony w jednym miejscu (teksty 1:1 z wersji sprzed redesignu).
- `app/components/` — sekcje i małe wyspy JS: menu, sticky pasek „Zadzwoń / Napisz”, mapa napięć, wideo w hero.
- `app/fonts/` — przycięte fonty Fraunces i Schibsted Grotesk (licencja SIL OFL 1.1, pliki `OFL-*.txt`).
- `public/images`, `public/video` — zdjęcia (źródła dla `next/image`, które serwuje AVIF/WebP) i pętla wideo do hero (MP4 + WebM).

## Skrypty

- `node scripts/verify-content.mjs` — po `npm run build` sprawdza, czy każdy tekst z wersji sprzed redesignu jest na stronie.
- `node scripts/build-map.mjs` — odświeża mapę dojazdu z danych OpenStreetMap (`app/components/map-data.ts`).
- `python scripts/make-fonts.py <źródła> app/fonts` — ponownie przycina fonty (wymaga `fonttools` i `brotli`).

## Opinie klientów

Komponent `app/components/testimonials.tsx` jest gotowy, ale nie jest wyświetlany. Gdy będą prawdziwe opinie (za zgodą klientów), dodaj `<Testimonials />` w `app/page.tsx`.

## Adres strony

Ustaw `NEXT_PUBLIC_SITE_URL` (np. po podpięciu domeny), żeby canonical, Open Graph i schema.org wskazywały właściwy adres. Bez tej zmiennej używana jest domena produkcyjna projektu na Vercelu.
