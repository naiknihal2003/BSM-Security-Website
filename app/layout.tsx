import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { localBusinessSchema } from "@/lib/schema";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ScrollProgress from "@/components/layout/ScrollProgress";
import BackToTop from "@/components/layout/BackToTop";
import CustomCursor from "@/components/layout/CustomCursor";
import Intro from "@/components/layout/Intro";
import { TransitionProvider } from "@/components/layout/PageTransition";

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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "BSM — Security Agency in Goa, India | Professional Security Services",
    template: "%s | BSM Security, Goa",
  },
  description: site.description,
  applicationName: "BSM Security",
  keywords: [
    "security agency in Goa",
    "security services Goa",
    "security guard services Goa",
    "corporate security Goa",
    "event security Goa",
    "hotel security Goa",
    "industrial security Goa",
    "residential security Goa",
    "security company India",
    "BSM security",
  ],
  authors: [{ name: "BSM" }],
  creator: "BSM",
  publisher: "BSM",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: "BSM Security",
    title: "BSM — Security You Can Trust. Protection You Can Count On.",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "BSM — Security Agency in Goa, India",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "Security Services",
};

export const viewport: Viewport = {
  themeColor: "#04060a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
          <SmoothScroll />
          <ScrollProgress />
          <CustomCursor />
          <Intro />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <BackToTop />
        </TransitionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </body>
    </html>
  );
}
