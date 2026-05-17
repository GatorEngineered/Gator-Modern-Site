import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main style={{ background: "var(--dark)", minHeight: "100vh" }}>
      <Navbar />

      {/* Placeholder — remaining sections built after each review */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontFamily: "var(--font-mono)",
          color: "var(--teal)",
          fontSize: "14px",
          letterSpacing: "0.1em",
        }}
      >
        GATOR_ENGINEERED · NAVBAR REVIEW · REMAINING SECTIONS PENDING
      </div>
    </main>
  );
}
