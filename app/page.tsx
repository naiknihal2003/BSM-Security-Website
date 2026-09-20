import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Statement from "@/components/sections/Statement";
import ServicesOverview from "@/components/sections/ServicesOverview";
import WhyBSM from "@/components/sections/WhyBSM";
import Industries from "@/components/sections/Industries";
import Process from "@/components/sections/Process";
import GoaPresence from "@/components/sections/GoaPresence";
import Credentials from "@/components/sections/Credentials";
import CallToAction from "@/components/sections/CallToAction";
import RevealEngine from "@/components/layout/RevealEngine";
import { JsonLd, websiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "BSM — Security Agency in Goa, India | Professional Security Services",
  description:
    "BSM is a professional security agency in Goa, India. Trained security personnel for corporate, residential, industrial, hospitality and event security across North and South Goa.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteSchema} />
      <Hero />
      <Statement />
      <ServicesOverview />
      <WhyBSM />
      <Industries />
      <Process />
      <GoaPresence />
      <Credentials />
      <CallToAction />
      <RevealEngine />
    </>
  );
}
