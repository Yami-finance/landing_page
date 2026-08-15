import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Trust Score - Yami",
  description: "The Yami Trust Score simulator is coming soon.",
};

export default function TrustScorePage() {
  return (
    <>
      <Nav />
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-5 py-20 text-center">
        <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-green-ink">
          Trust Score Simulator
        </p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink md:text-5xl lg:text-6xl">
          Coming Soon
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-[18px] leading-relaxed text-ink-soft">
          We are currently building the ultimate simulator to help you understand how
          your on-chain reputation translates into your Yami Trust Score.
        </p>
        <a href="/" className="btn mt-10">
          ← Back to home
        </a>
      </main>
      <Footer />
    </>
  );
}
