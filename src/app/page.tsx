import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main style={{ background: "var(--dark)" }}>
      <Navbar />
      <Hero />
    </main>
  );
}
