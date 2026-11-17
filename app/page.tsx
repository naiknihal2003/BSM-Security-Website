import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Statement from "@/components/sections/Statement";
import CoreStrengths from "@/components/sections/CoreStrengths";
import VisionMission from "@/components/sections/VisionMission";
import ServicesOverview from "@/components/sections/ServicesOverview";
import Industries from "@/components/sections/Industries";
import Process from "@/components/sections/Process";
import GoaPresence from "@/components/sections/GoaPresence";
import CallToAction from "@/components/sections/CallToAction";
import RevealEngine from "@/components/layout/RevealEngine";
import { JsonLd, websiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "BSM — Security Agency in Goa, India | Professional Security Services",
  description:
    "BSM is a professional security agency in Goa, India. Trained security personnel for corporate, residential, industrial, hospitality and event security across Goa.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteSchema} />
      <Hero />
      <Statement />
      <CoreStrengths />
      <VisionMission />
      <ServicesOverview />
      <Industries />
      <Process />
      <GoaPresence />
      <CallToAction />
      <RevealEngine />
    </>
  );
}
