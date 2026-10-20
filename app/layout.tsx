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

// Fonty przycięte do znaków łacińskich z polskimi (scripts/make-fonts.py):
// Big Shoulders jako statyczna odmiana display 800 (bez nakładek konturów), Archivo z osią szerokości.
const bigShoulders = localFont({
  src: [{ path: "./fonts/BigShoulders-ExtraBold.woff2", weight: "800", style: "normal" }],
  variable: "--font-big-shoulders",
  display: "swap",
  fallback: ["Arial Narrow", "sans-serif"],
});

const archivo = localFont({
  src: [{ path: "./fonts/Archivo.woff2", weight: "400 700", style: "normal" }],
  variable: "--font-archivo",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
  declarations: [{ prop: "font-stretch", value: "100% 125%" }],
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
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "Znak z logo: plecy z kręgosłupem i dłoń, obok napis Aleksander Pawłowski, mobilny masażysta" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#1d1d1b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${bigShoulders.variable} ${archivo.variable}`}>
      <body className="min-h-dvh pb-[calc(3.5rem+env(safe-area-inset-bottom))] lg:pb-0">
        <a
          href="#tresc"
          className="sr-only z-[60] bg-szafran px-5 py-3 font-bold text-grafit focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
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
