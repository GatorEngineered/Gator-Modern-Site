"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const SIGNALS = [
  {
    icon: "◈",
    value: "30–90",
    unit: "Day Engagements",
    desc: "Fixed-scope, fixed-exit. No open-ended retainers that drag on without deliverables.",
  },
  {
    icon: "⬡",
    value: "800+",
    unit: "Assets Optimized",
    desc: "Schema-tagged, keyword-mapped, and structured for both search engines and AI answer tools.",
  },
  {
    icon: "◉",
    value: "67",
    unit: "FL Counties Mapped",
    desc: "Deep local knowledge baked into every SEO and AEO strategy we build for Florida businesses.",
  },
  {
    icon: "✦",
    value: "100%",
    unit: "Documentation on Exit",
    desc: "Every engagement closes with a full handoff package. You own the work — we don't hold it hostage.",
  },
];

export default function TrustStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-24" style={{ background: "var(--panel)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ fontFamily: "var(--font-mono)", color: "var(--teal)" }}
          >
            Why Clients Choose Us
          </p>
          <h2
            className="font-bold"
            style={{
              fontFamily: "var(--font-head)",
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              color: "var(--text)",
              maxWidth: 480,
              lineHeight: 1.15,
            }}
          >
            Senior Execution. No Fluff. Clean Exits.
          </h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SIGNALS.map((s, i) => (
            <motion.div
              key={s.unit}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              className="p-6 flex flex-col gap-3"
              style={{ background: "var(--dark)", border: "1px solid var(--border)" }}
            >
              <span style={{ color: "var(--teal)", fontSize: 20 }}>{s.icon}</span>
              <div>
                <span
                  className="block font-bold leading-none"
                  style={{ fontFamily: "var(--font-head)", fontSize: "2.2rem", color: "var(--teal)" }}
                >
                  {s.value}
                </span>
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--muted)" }}
                >
                  {s.unit}
                </span>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-body)", color: "var(--muted)", fontWeight: 500 }}
              >
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Placeholder testimonial */}
        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.5, ease: "easeOut" }}
          className="mt-10 p-8"
          style={{ background: "var(--dark)", border: "1px solid var(--border)", borderLeft: "3px solid var(--teal)" }}
        >
          <p
            className="text-base italic leading-relaxed mb-4"
            style={{ fontFamily: "var(--font-body)", color: "var(--text)", fontWeight: 500 }}
          >
            &ldquo;They came in, assessed the situation fast, and had a working plan within two weeks.
            No hand-holding required. The deliverables were exactly what was scoped.&rdquo;
          </p>
          <footer>
            <span
              className="text-xs uppercase tracking-widest"
              style={{ fontFamily: "var(--font-mono)", color: "var(--muted)" }}
            >
              — Client, SaaS Platform · Florida
            </span>
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
