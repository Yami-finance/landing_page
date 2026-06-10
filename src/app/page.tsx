import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AppPreview } from "@/components/sections/AppPreview";
import { Centrepiece } from "@/components/sections/Centrepiece";
import { CTA } from "@/components/sections/CTA";
import { FAQ } from "@/components/sections/FAQ";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { Stats } from "@/components/sections/Stats";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-yami-deep">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <Centrepiece />
      <HowItWorks />
      <AppPreview />
      <Stats />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
