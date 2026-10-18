import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { StickyCta } from "@/app/components/sticky-cta";
import { JsonLd } from "@/app/components/json-ld";
import { meta, ui } from "@/app/content";
import { businessSchema } from "@/app/lib/schema";
import { siteUrl } from "@/app/lib/site";

// Bricolage Grotesque przycięty do polskich znaków (scripts/make-fonts.py):
// rozmiar optyczny 12–96 zostaje, więc nagłówki i tekst biorą z jednego pliku.
const bricolage = localFont({
  src: [{ path: "./fonts/Bricolage.woff2", weight: "300 700", style: "normal" }],
  variable: "--font-bricolage",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: meta.title,
  description: meta.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    title: meta.title,
    description: meta.description,
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "Zbliżenie barku z kroplami olejku do masażu" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#f7e6da",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={bricolage.variable}>
      <body className="min-h-dvh pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-0">
        <a
          href="#tresc"
          className="sr-only z-[60] rounded-full bg-wino px-5 py-3 text-skora focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          {ui.skipToContent}
        </a>
        <JsonLd data={businessSchema} />
        <Header />
        <main id="tresc">{children}</main>
        <Footer />
        <StickyCta />
      </body>
    </html>
  );
}
