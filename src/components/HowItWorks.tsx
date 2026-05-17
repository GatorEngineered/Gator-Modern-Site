"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const PHASES = [
  {
    num: "01",
    label: "Phase 01",
    duration: "30 days",
    title: "Assess & Architect",
    desc: "We audit your stack, team, and gaps. You get a clear map of what to build, in what order, with what resources.",
    bullets: [
      "Technical audit of existing stack",
      "Team capability assessment",
      "Gap analysis & risk map",
      "Prioritized build roadmap",
    ],
  },
  {
    num: "02",
    label: "Phase 02",
    duration: "60 days",
    title: "Build & Oversee",
    desc: "We own the backlog, run QA, vet developers, and keep delivery on track while you focus on the business.",
    bullets: [
      "Backlog ownership & sprint planning",
      "Developer vetting & oversight",
      "QA sign-off on every release",
      "Weekly status reporting",
    ],
  },
  {
    num: "03",
    label: "Phase 03",
    duration: "90 days",
    title: "Handoff & Document",
    desc: "Clean exit with full documentation, team training, and a clear path forward. No dependency. No ghosting.",
    bullets: [
      "Full technical documentation",
      "Team knowledge transfer",
      "Runbook & ops guide",
      "Optional ongoing retainer",
    ],
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="how-it-works" className="py-24" style={{ background: "var(--panel)" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ fontFamily: "var(--font-mono)", color: "var(--teal)" }}
          >
            The Engagement Model
          </p>
          <h2
            className="font-bold"
            style={{
              fontFamily: "var(--font-head)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--text)",
              maxWidth: 500,
              lineHeight: 1.1,
            }}
          >
            Three Phases. Clear Deliverables. Clean Exit.
          </h2>
        </div>

        {/* Phase cards */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PHASES.map((phase, i) => (
            <motion.div
              key={phase.num}
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.55, ease: "easeOut" }}
              className="relative p-8 flex flex-col"
              style={{
                background: "var(--dark)",
                border: "1px solid var(--border)",
                clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)",
              }}
            >
              {/* Phase label + duration */}
              <div className="flex items-center justify-between mb-6">
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--teal)" }}
                >
                  {phase.label}
                </span>
                <span
                  className="text-xs px-3 py-1"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--muted)",
                    border: "1px solid var(--border)",
                    background: "var(--panel)",
                  }}
                >
                  {phase.duration}
                </span>
              </div>

              {/* Title */}
              <h3
                className="font-bold mb-3"
                style={{
                  fontFamily: "var(--font-head)",
                  fontSize: "1.35rem",
                  color: "var(--text)",
                  lineHeight: 1.2,
                }}
              >
                {phase.title}
              </h3>

              {/* Description */}
              <p
                className="text-sm mb-6 leading-relaxed"
                style={{ fontFamily: "var(--font-body)", color: "var(--muted)", fontWeight: 500 }}
              >
                {phase.desc}
              </p>

              {/* Bullets */}
              <ul className="flex flex-col gap-2 mt-auto">
                {phase.bullets.map(b => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-sm"
                    style={{ fontFamily: "var(--font-body)", color: "var(--muted)", fontWeight: 500 }}
                  >
                    <span style={{ color: "var(--teal)", flexShrink: 0, marginTop: 2 }}>›</span>
                    {b}
                  </li>
                ))}
              </ul>

              {/* Number watermark */}
              <span
                className="absolute bottom-4 right-6 select-none pointer-events-none"
                style={{
                  fontFamily: "var(--font-head)",
                  fontSize: "5rem",
                  fontWeight: 900,
                  color: "var(--border)",
                  lineHeight: 1,
                  opacity: 0.5,
                }}
              >
                {phase.num}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
