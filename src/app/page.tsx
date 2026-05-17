import Navbar      from "@/components/Navbar";
import Hero        from "@/components/Hero";
import Ticker      from "@/components/Ticker";
import Services    from "@/components/Services";
import HowItWorks  from "@/components/HowItWorks";
import ProofOfWork from "@/components/ProofOfWork";
import TrustStrip  from "@/components/TrustStrip";
import CtaSection  from "@/components/CtaSection";
import Footer      from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ background: "var(--dark)" }}>
      <Navbar />
      <Hero />
      <Ticker />
      <Services />
      <HowItWorks />
      <ProofOfWork />
      <TrustStrip />
      <CtaSection />
      <Footer />
    </main>
  );
}
