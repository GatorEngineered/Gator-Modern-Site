"use client";

const ITEMS = [
  "FRACTIONAL CTO",
  "TECHNICAL PRODUCT MANAGEMENT",
  "AI AUTOMATION",
  "BLOCKCHAIN INTEGRATION",
  "QA & TESTING",
  "SYSTEMS ARCHITECTURE",
  "PRODUCT OWNERSHIP",
  "TECHNICAL SEO",
  "WEB DEVELOPMENT",
  "MARKETING",
];

const repeated = [...ITEMS, ...ITEMS, ...ITEMS];

export default function Ticker() {
  return (
    <div
      className="overflow-hidden py-4 border-y"
      style={{ borderColor: "var(--border)", background: "var(--panel)" }}
    >
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: ticker 30s linear infinite;
        }
        .ticker-track:hover { animation-play-state: paused; }
      `}</style>

      <div className="ticker-track">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-4 px-6 whitespace-nowrap">
            <span
              className="text-xs font-semibold tracking-[0.18em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--muted)" }}
            >
              {item}
            </span>
            <span style={{ color: "var(--teal)", fontSize: 8, opacity: 0.6 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
