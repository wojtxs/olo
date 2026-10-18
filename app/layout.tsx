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

// Fonty przycięte do znaków łacińskich z polskimi; w Fraunces osie SOFT=100 i WONK=0
// są przypięte na stałe, zostaje grubość 300–420 i rozmiar optyczny. Generuje je scripts/make-fonts.py.
const fraunces = localFont({
  src: [{ path: "./fonts/Fraunces-Soft-Roman.woff2", weight: "300 420", style: "normal" }],
  variable: "--font-fraunces",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const frauncesItalic = localFont({
  src: [{ path: "./fonts/Fraunces-Soft-Italic.woff2", weight: "300 420", style: "italic" }],
  variable: "--font-fraunces-italic",
  display: "swap",
  preload: false,
  fallback: ["Georgia", "serif"],
});

const schibsted = localFont({
  src: [{ path: "./fonts/SchibstedGrotesk.woff2", weight: "400 600", style: "normal" }],
  variable: "--font-schibsted",
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
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "Stół do masażu rozłożony w słonecznym salonie" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#eee7db",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${fraunces.variable} ${frauncesItalic.variable} ${schibsted.variable}`}>
      <body className="min-h-dvh pb-[calc(4rem+env(safe-area-inset-bottom))] lg:pb-0">
        <a
          href="#tresc"
          className="sr-only z-[60] rounded-full bg-orzech px-5 py-3 text-recznik focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
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
