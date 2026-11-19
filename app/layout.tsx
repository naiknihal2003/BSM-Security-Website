import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { brand, baseKeywords } from "@/lib/seo";
import { localBusinessSchema } from "@/lib/schema";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ScrollProgress from "@/components/layout/ScrollProgress";
import BackToTop from "@/components/layout/BackToTop";
import Intro from "@/components/layout/Intro";
import ContentGuard from "@/components/layout/ContentGuard";
import PointerFX from "@/components/layout/PointerFX";
import { TransitionProvider } from "@/components/layout/PageTransition";
import { EnquiryProvider } from "@/components/layout/EnquiryModal";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-label",
  display: "swap",
});

/**
 * Site-wide defaults. Each page refines these through pageMetadata() in
 * lib/seo.ts; anything a page does not set falls back to what is here.
 */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "BSM Security Agency, Goa — Security Guards & Security Services",
    template: `%s | ${brand.suffix}`,
  },
  description: site.description,
  applicationName: brand.name,
  keywords: baseKeywords,
  authors: [{ name: brand.name, url: site.url }],
  creator: brand.name,
  publisher: brand.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: brand.name,
    title: `${brand.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} — Security Agency in Goa`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  /* Phone numbers on the page are links already; stop iOS styling others. */
  formatDetection: { telephone: false, email: false, address: false },
  category: "Security Services",
  other: {
    "geo.region": "IN-GA",
    "geo.placename": "Margao, Goa",
  },
};

export const viewport: Viewport = {
  themeColor: "#04060a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-IN"
      className={`${archivo.variable} ${instrument.variable} ${mono.variable}`}
      /* the inline script below adds `anim-ready` before React hydrates */
      suppressHydrationWarning
    >
      <head>
        {/*
          Motion is opt-in at the document level: the hidden pre-animation
          states only apply once we know JS is running and the visitor has not
          requested reduced motion. Without this the page can never be stuck
          invisible.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('anim-ready')}}catch(e){}",
          }}
        />
      </head>
      <body className="bg-void antialiased">
        <TransitionProvider>
          <EnquiryProvider>
            <SmoothScroll />
            <ContentGuard />
            <PointerFX />
            <ScrollProgress />
            <Intro />
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
            <BackToTop />
          </EnquiryProvider>
        </TransitionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </body>
    </html>
  );
}
