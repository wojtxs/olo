// Cała treść strony w jednym miejscu. Teksty są przeniesione 1:1 z wersji
// sprzed redesignu (commit 336199d) i porównywane z nią przez
// scripts/verify-content.mjs. Nie zmieniaj ich bez zgody właściciela.

export const contact = {
  phoneDisplay: "692 094 577",
  phoneHref: "tel:+48692094577",
  email: "kontakt@aleksanderpawlowski.pl",
  emailHref: "mailto:kontakt@aleksanderpawlowski.pl",
  area: "Sochaczew i okolice",
} as const;

export const brand = {
  name: "Aleksander Pawłowski",
  role: "Mobilny masażysta",
} as const;

export const meta = {
  title: "Aleksander Pawłowski | Mobilny masażysta",
  description:
    "Profesjonalny masaż z dojazdem do klienta. Bez stresu, bez dojazdu, bez pośpiechu. Tylko Ty, komfort i pełna regeneracja.",
  pricingTitle: "Cennik | Aleksander Pawłowski",
} as const;

export const nav = [
  { label: "O mnie", href: "/#o-mnie" },
  { label: "Oferta", href: "/#oferta" },
  { label: "Proces", href: "/#proces" },
  { label: "FAQ", href: "/#faq" },
  { label: "Kontakt", href: "/#kontakt" },
] as const;

export const cta = {
  book: "Umów się",
  bookVisit: "Umów wizytę",
  getInTouch: "Skontaktuj się",
  fullPricing: "Pełny cennik",
  details: "Sprawdź szczegóły",
} as const;

export const hero = {
  eyebrow: "Mobilny masażysta",
  titleLines: ["Ulga,", "która", "przyjeżdża"],
  lead: "Masaż w Twoim domu, bez zbędnego biegania i bez pośpiechu. Po prostu czas dla siebie i profesjonalna pomoc w rozluźnieniu napięcia.",
  secondaryLink: "Zobacz, co oferuję",
} as const;

export const about = {
  eyebrow: "O mnie",
  watermark: "ALEKSANDER PAWŁOWSKI",
  lead: "Mobilny masażysta. Student fizjoterapii. Koszykarz. Cały czas się uczę.",
  titleLines: ["Praca", "z ciałem"],
  timeline: [
    {
      title: "Edukacja i praktyka",
      text: "Studiuję fizjoterapię w Akademii Medycznej Nauk Stosowanych i Holistycznych. Jestem też certyfikowanym technikiem masażystą. Wiedza z zajęć i codzienna praca z ludźmi pomagają mi rozwijać warsztat.",
    },
    {
      title: "Doświadczenie ruchowe",
      text: "Od dziecka gram w koszykówkę. Dobrze rozumiem, jak ciało reaguje na wysiłek, gdzie pojawiają się napięcia i jak można je skutecznie rozluźnić.",
    },
    {
      title: "Podejście",
      text: "Nie skupiam się tylko na jednym miejscu bólu. Patrzę na to, jak funkcjonuje całe ciało, bo wszystko jest ze sobą połączone.",
    },
  ],
  bio: [
    "Jestem absolwentem Medycznego Studium Zawodowego na kierunku technik masażysta. Podczas tej nauki zdobyłem wiedzę w zakresie masażu klasycznego, relaksacyjnego, centryfugalnego, sportowego oraz podstaw masażu limfatycznego i gorącymi kamieniami.",
    "Na co dzień jestem studentem 3 roku fizjoterapii na Akademii Medycznej Nauk Stosowanych i Holistycznych. Jestem osobą ambitną i zdyscyplinowaną, co potwierdza fakt posiadania stypendium rektora tejże uczelni 2 rok z rzędu. Dodatkowo w kontekście masażu opanowałem kurs kobido i cały rytuał kobido complex dzięki specjalnemu szkoleniu.",
  ],
  facts: [
    { label: "Student fizjoterapii", meta: "AMNSiH" },
    { label: "Technik masażysta", meta: "Certyfikowany" },
    { label: "Koszykarz", meta: "Życiowa pasja" },
    { label: "Stały rozwój", meta: "Kursy i szkolenia" },
  ],
  photoAlt: "Aleksander Pawłowski",
} as const;

export type CategorySlug = "plecy-barki-kark" | "nogi-cale-cialo" | "twarz";

export const offer = {
  eyebrow: "Oferta",
  titleLines: ["Rodzaje", "masażu"],
  lead: "Wszystkie zabiegi dostosowuję do Twoich potrzeb. Niezależnie od tego, czy potrzebujesz głębokiego relaksu, czy szybkiej ulgi w napiętych partiach ciała.",
  categories: [
    {
      slug: "plecy-barki-kark",
      title: "Plecy, barki i kark",
      description:
        "Ulga w najbardziej napiętych partiach górnego odcinka ciała. Od szybkiego 30-minutowego masażu pleców, po kompleksowy 60-minutowy zabieg pleców, barków i karku.",
      features: ["plecy + barki + kark", "plecy + kark", "same plecy", "ręce i barki"],
      image: {
        src: "/images/plecy-kark.jpg",
        alt: "Zrelaksowane plecy i kark osoby leżącej na stole do masażu, w smugach popołudniowego światła",
      },
    },
    {
      slug: "nogi-cale-cialo",
      title: "Nogi i całe ciało",
      description:
        "Pełen relaks dla zmęczonych nóg lub całego ciała. Dostosowane do Twoich potrzeb – od celowanego masażu stóp i łydek, przez nogi z plecami, aż po 90-minutowy relaks całego ciała.",
      features: ["całe ciało", "nogi + plecy", "stopy i łydki", "masaż dostawowy"],
      image: {
        src: "/images/c/recznik.jpg",
        alt: "Zwinięty bawełniany ręcznik na brzoskwiniowym lnianym prześcieradle stołu do masażu",
      },
    },
    {
      slug: "twarz",
      title: "Twarz",
      description:
        "Japoński masaż twarzy Kobido – naturalny lifting bez skalpela. Dostępny zarówno w klasycznym 60-minutowym wariancie, jak i rozszerzonym zabiegu complex z liftingiem.",
      features: ["kobido classic", "kobido complex + lifting"],
      image: {
        src: "/images/kobido.jpg",
        alt: "Kobieta z zamkniętymi oczami i ręcznikiem na włosach, odprężona przed masażem twarzy Kobido",
      },
    },
  ],
} as const;

export const process = {
  eyebrow: "Jak to działa",
  titleLines: ["Jak wygląda", "wizyta"],
  steps: [
    {
      title: "Rezerwacja",
      description:
        "Umawiamy dogodny termin. Jestem elastyczny, więc zazwyczaj znajdziemy coś, co pasuje do Twojego grafiku.",
    },
    {
      title: "Dojazd",
      description:
        "Przyjeżdżam pod wskazany adres ze wszystkim, czego potrzebuję. Ty nie musisz nic przygotowywać.",
    },
    {
      title: "Konsultacja",
      description:
        "Przed masażem rozmawiamy krótko o tym, jak się czujesz i gdzie czujesz napięcie.",
    },
    {
      title: "Sesja",
      description:
        "Masaż trwa tyle, ile ustaliliśmy. Pracuję bez pośpiechu, dostosowując się do tego, co mówi Twoje ciało.",
    },
    {
      title: "Zakończenie",
      description:
        "Po zabiegu krótkie podsumowanie i ewentualne wskazówki. Możesz wrócić do swojego dnia z lżejszym ciałem.",
    },
  ],
  outro: "Całość jest prosta i wygodna. Od umówienia terminu po zakończenie masażu.",
} as const;

export const faq = {
  eyebrow: "Pytania",
  titleLines: ["Odpowiedzi", "na pytania"],
  lead: "Jeśli czegoś tu nie ma, napisz lub zadzwoń. Chętnie pomogę.",
  items: [
    {
      question: "Gdzie dojeżdżasz?",
      answer:
        "Na terenie Sochaczewa i najbliższych okolic. Jeśli mieszkasz trochę dalej, napisz i sprawdzimy, czy damy radę.",
    },
    {
      question: "Jak umówić wizytę?",
      answer:
        "Najłatwiej zadzwonić lub napisać maila lub wiadomość. Zazwyczaj odpisuję tego samego dnia i proponuję kilka terminów.",
    },
    {
      question: "Czy muszę coś przygotować?",
      answer:
        "Nie. Wystarczy wolna przestrzeń, na przykład w salonie lub sypialni. Przywożę własny stół, olejki i wszystko, co potrzebne.",
    },
    {
      question: "Czy masaż jest dopasowany do moich potrzeb?",
      answer:
        "Tak. Zawsze na początku rozmawiamy o tym, co Ci dolega i jakiego efektu oczekujesz. Każda wizyta wygląda nieco inaczej, bo każde ciało jest inne.",
    },
    {
      question: "Ile trwa cała wizyta?",
      answer:
        "Sam masaż trwa od 30 do 90 minut, w zależności od wybranego zabiegu. Z dojazdem i krótką rozmową na początku trzeba doliczyć około 15 do 20 minut.",
    },
  ],
  outro: "Masz pytania? Chętnie odpowiem.",
} as const;

export const contactSection = {
  eyebrow: "Kontakt",
  title: "Porozmawiajmy",
  lead: "Zadzwoń lub napisz. Zazwyczaj odpisuję w ciągu kilku godzin i szybko ustalimy dogodny termin.",
  pills: ["Szybka odpowiedź", "Dojazd gratis"],
  labels: { phone: "Telefon", email: "E-mail", area: "Dojazd" },
  mapTitle: "Mapa Sochaczew",
} as const;

export const footer = {
  lead: "Masaż z dojazdem do domu w Sochaczewie i okolicach. Bez zbędnego pośpiechu, w Twoim tempie i komfortowym miejscu.",
  navTitle: "Nawigacja",
  nav: [
    { label: "Strona główna", href: "/" },
    { label: "O mnie", href: "/#o-mnie" },
    { label: "Oferta", href: "/#oferta" },
    { label: "Proces", href: "/#proces" },
    { label: "FAQ", href: "/#faq" },
    { label: "Kontakt", href: "/#kontakt" },
  ],
  contactTitle: "Kontakt",
  rights: "Wszelkie prawa zastrzeżone.",
  toTop: "Do góry",
  // Dopisane na prośbę właściciela: podpis wykonawcy w dolnym pasku stopki.
  credit: { label: "Projekt i wykonanie:", studio: "webexe" },
} as const;

export type Service = {
  id: string;
  name: string;
  duration: string;
  price: string;
};

export const pricing = {
  back: "Powrót na stronę główną",
  eyebrow: "Oferta",
  title: "Cennik",
  lead: "Dziękuję za zainteresowanie moimi usługami. Poniżej znajdziesz szczegółowy cennik wszystkich zabiegów.",
  outro: "Masz pytania lub chcesz umówić wizytę?",
  contactButton: "Formularz kontaktowy",
  categories: [
    {
      slug: "plecy-barki-kark",
      title: "Plecy, barki i kark",
      services: [
        { id: "plecy-barki-kark-60", name: "Masaż relaksacyjny pleców, barków i karku", duration: "60 min", price: "180 zł" },
        { id: "plecy-kark-45", name: "Masaż relaksacyjny pleców i karku", duration: "45 min", price: "150 zł" },
        { id: "plecy-30", name: "Masaż relaksacyjny pleców", duration: "30 min", price: "100 zł" },
        { id: "rece-barki-45", name: "Masaż relaksacyjny rąk i barków", duration: "45 min", price: "120 zł" },
      ],
    },
    {
      slug: "nogi-cale-cialo",
      title: "Nogi i całe ciało",
      services: [
        { id: "cale-cialo-90", name: "Masaż relaksacyjny całego ciała", duration: "90 min", price: "240 zł" },
        { id: "nogi-plecy-60", name: "Masaż relaksacyjny nogi+plecy", duration: "60 min", price: "150 zł" },
        { id: "stopy-lydki-45", name: "Masaż relaksacyjny stóp i łydek", duration: "45 min", price: "150 zł" },
        { id: "nogi-45", name: "Masaż relaksacyjny nóg", duration: "45 min", price: "120 zł" },
        { id: "dostawowy-30", name: "Masaż dostawowy", duration: "30 min", price: "80 zł" },
      ],
    },
    {
      slug: "twarz",
      title: "Twarz",
      services: [
        { id: "kobido-complex-90", name: "Zabieg kobido complex (masaż+lifting)", duration: "90 min", price: "250 zł" },
        { id: "kobido-60", name: "Masaż kobido", duration: "60 min", price: "220 zł" },
      ],
    },
  ],
} as const;

export const allServices: readonly Service[] = pricing.categories.flatMap((c): readonly Service[] => c.services);

// Mikroteksty dodane w redesignie (zaakceptowane przez właściciela).
export const ui = {
  call: "Zadzwoń",
  write: "Napisz",
  skipToContent: "Przejdź do treści",
  openMenu: "Otwórz menu",
  closeMenu: "Zamknij menu",
  pauseVideo: "Zatrzymaj animację",
  playVideo: "Wznów animację",
  bodyMap: {
    title: "Gdzie czujesz napięcie?",
    front: "Przód",
    back: "Tył",
    matching: "Pasujące zabiegi",
  },
} as const;

export type ZoneId = "twarz" | "kark-barki" | "plecy" | "rece" | "nogi" | "stopy-lydki";

// Strefy mapy napięć wskazują wyłącznie zabiegi istniejące w cenniku.
export const zones: readonly { id: ZoneId; label: string; services: readonly string[]; category: CategorySlug }[] = [
  { id: "kark-barki", label: "Kark i barki", services: ["plecy-barki-kark-60", "plecy-kark-45", "rece-barki-45"], category: "plecy-barki-kark" },
  { id: "plecy", label: "Plecy", services: ["plecy-30", "plecy-kark-45", "plecy-barki-kark-60", "nogi-plecy-60", "cale-cialo-90"], category: "plecy-barki-kark" },
  { id: "rece", label: "Ręce", services: ["rece-barki-45"], category: "plecy-barki-kark" },
  { id: "nogi", label: "Nogi", services: ["nogi-45", "nogi-plecy-60", "cale-cialo-90"], category: "nogi-cale-cialo" },
  { id: "stopy-lydki", label: "Stopy i łydki", services: ["stopy-lydki-45", "nogi-45"], category: "nogi-cale-cialo" },
  { id: "twarz", label: "Twarz", services: ["kobido-60", "kobido-complex-90"], category: "twarz" },
];
