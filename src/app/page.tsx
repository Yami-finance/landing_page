import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { LedgerStrip } from "@/components/sections/LedgerStrip";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { Centrepiece } from "@/components/sections/Centrepiece";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhereWeAre } from "@/components/sections/WhereWeAre";
import { FounderNote } from "@/components/sections/FounderNote";
import { FaqSection } from "@/components/sections/FaqSection";
import { LastEntry } from "@/components/sections/LastEntry";

export default function Home() {
  return (
    <>
      <Nav overHero />
      <main>
        <Hero />
        <LedgerStrip />
        <ProblemSection />
        <SolutionSection />
        <Centrepiece />
        <HowItWorks />
        <WhereWeAre />
        <FounderNote />
        <FaqSection />
        <LastEntry />
      </main>
      <Footer />
    </>
  );
}
