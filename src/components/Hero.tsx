"use client";

import { motion } from "framer-motion";

const HEADLINE_WORDS = ["We", "Engineer", "What", "You", "Can't", "Afford", "to", "Get", "Wrong."];

const STATS = [
  { value: "3+",    label: "Platforms Shipped"  },
  { value: "67",    label: "FL Counties Mapped" },
  { value: "800+",  label: "Assets Optimized"   },
  { value: "30–90", label: "Day Engagements"    },
];

export default function Hero() {
  const baseDelay = HEADLINE_WORDS.length * 0.08 + 0.1;

  return (
    <section
      id="hero"
      className="relative flex flex-col justify-center overflow-hidden"
      style={{ minHeight: "100svh", background: "var(--dark)", paddingTop: "80px" }}
    >
      {/* Grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top-left corner accent */}
      <div aria-hidden className="pointer-events-none absolute" style={{ top: 88, left: 24 }}>
        <div style={{ width: 60, height: 2, background: "var(--teal)", opacity: 0.45 }} />
        <div style={{ width: 2, height: 60, background: "var(--teal)", opacity: 0.45 }} />
      </div>

      {/* Bottom-right corner accent */}
      <div aria-hidden className="pointer-events-none absolute" style={{ bottom: 120, right: 24 }}>
        <div style={{ width: 60, height: 2, background: "var(--green)", opacity: 0.3, marginTop: 58 }} />
        <div style={{ width: 2, height: 60, background: "var(--green)", opacity: 0.3, position: "absolute", top: 0, right: 0 }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--green)" }} />
          <span
            className="text-xs uppercase tracking-widest"
            style={{ fontFamily: "var(--font-mono)", color: "var(--green)" }}
          >
            Accepting new engagements · St. Petersburg, FL
          </span>
        </motion.div>

        {/* Headline — staggered word by word */}
        <h1
          className="mb-6"
          style={{
            fontFamily: "var(--font-head)",
            fontWeight: 800,
            fontSize: "clamp(2.6rem, 7vw, 5.5rem)",
            lineHeight: 1.05,
            maxWidth: 900,
          }}
        >
          {HEADLINE_WORDS.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i, duration: 0.5, ease: "easeOut" }}
              className="inline-block mr-[0.28em]"
              style={{ color: word === "Engineer" ? "var(--teal)" : "var(--text)" }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: baseDelay, duration: 0.5, ease: "easeOut" }}
          className="mb-10"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(1rem, 2.2vw, 1.25rem)",
            color: "var(--muted)",
            maxWidth: 620,
            lineHeight: 1.7,
            fontWeight: 500,
          }}
        >
          Fractional CTO, AI automation, and technical product management for
          small and mid-size businesses — senior technical leadership without
          the full-time overhead.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: baseDelay + 0.12, duration: 0.5, ease: "easeOut" }}
          className="flex flex-wrap gap-4 mb-20"
        >
          <a
            href="#contact"
            onClick={e => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex items-center gap-2 px-7 py-4 text-sm font-bold cursor-pointer transition-all duration-200"
            style={{
              fontFamily: "var(--font-body)",
              background: "var(--teal)",
              color: "var(--black)",
              letterSpacing: "0.06em",
              clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--green)")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--teal)")}
          >
            Start an Engagement <span>→</span>
          </a>

          <a
            href="#services"
            onClick={e => { e.preventDefault(); document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex items-center gap-2 px-7 py-4 text-sm font-bold cursor-pointer transition-all duration-200"
            style={{
              fontFamily: "var(--font-body)",
              background: "transparent",
              color: "var(--text)",
              letterSpacing: "0.06em",
              border: "1px solid var(--border)",
              clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--teal)"; e.currentTarget.style.color = "var(--teal)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text)"; }}
          >
            View Services
          </a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: baseDelay + 0.24, duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col py-6"
              style={{
                paddingLeft: i === 0 ? 0 : "2rem",
                paddingRight: "2rem",
                borderRight: i < STATS.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-head)",
                  fontWeight: 700,
                  fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                  color: "var(--teal)",
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </span>
              <span
                className="mt-1 text-xs uppercase tracking-widest"
                style={{ fontFamily: "var(--font-mono)", color: "var(--muted)" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
