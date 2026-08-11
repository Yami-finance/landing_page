import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

// Shared chrome for /legal/*. No dark hero on these pages, so the nav is solid
// from the top (no `overHero`).
export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
