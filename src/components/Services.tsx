"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const SERVICES = [
  {
    num: "01",
    icon: "◈",
    title: "Fractional CTO",
    desc: "Strategy, tech stack decisions, developer vetting, and architectural direction — without a full-time hire.",
    tags: ["Strategy", "Architecture", "Leadership"],
  },
  {
    num: "02",
    icon: "◉",
    title: "Technical Product Management",
    desc: "Roadmaps, user stories, backlog prioritization, sprint oversight. We translate business goals into execution plans.",
    tags: ["Roadmap", "Backlog", "Specs"],
  },
  {
    num: "03",
    icon: "⬡",
    title: "AI Automation",
    desc: "Custom n8n workflows and AI agents that eliminate manual processes and connect your tools without custom dev builds.",
    tags: ["n8n", "AI Agents", "Workflows"],
  },
  {
    num: "04",
    icon: "◇",
    title: "Blockchain Integration",
    desc: "Loyalty systems, tokenized records, NFT rewards, USDC payouts on Polygon. Blockchain made practical for non-crypto-native businesses.",
    tags: ["Polygon", "USDC", "NFTs"],
  },
  {
    num: "05",
    icon: "✦",
    title: "QA & Product Testing",
    desc: "Acceptance criteria, test plans, and delivery oversight so what ships matches what was scoped.",
    tags: ["QA", "Testing", "Acceptance"],
  },
  {
    num: "06",
    icon: "◈",
    title: "Technical SEO & Schema",
    desc: "AI schema markup, structured data, page authority, and GA4 setup. Hands-on execution across 800+ assets for live clients.",
    tags: ["Schema", "SEO", "GA4"],
  },
  {
    num: "07",
    icon: "▣",
    title: "Web Development",
    desc: "Full website builds, landing pages, and SaaS platform development using Next.js, React, TypeScript, and Supabase.",
    tags: ["Next.js", "React", "TypeScript", "Supabase"],
  },
  {
    num: "08",
    icon: "◎",
    title: "Marketing & Outreach",
    desc: "B2B outreach campaigns, segmented contact lists, backlink building, food and industry blogger outreach, and service page creation.",
    tags: ["B2B", "Outreach", "Backlinks"],
  },
];

function Card({ svc, index }: { svc: typeof SERVICES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (index % 4) * 0.08, duration: 0.5, ease: "easeOut" }}
      className="flex flex-col p-6 relative group"
      style={{
        background: "var(--panel)",
        border: "1px solid var(--border)",
        clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
        transition: "border-color 0.2s",
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--teal-dim)")}
      onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
    >
      {/* Number + icon row */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="text-xs tracking-widest"
          style={{ fontFamily: "var(--font-mono)", color: "var(--muted)" }}
        >
          {svc.num}
        </span>
        <span style={{ color: "var(--teal)", fontSize: 22, opacity: 0.7 }}>{svc.icon}</span>
      </div>

      {/* Title */}
      <h3
        className="mb-3 font-bold leading-tight"
        style={{
          fontFamily: "var(--font-head)",
          fontSize: "1.15rem",
          color: "var(--text)",
        }}
      >
        {svc.title}
      </h3>

      {/* Description */}
      <p
        className="mb-5 flex-1 text-sm leading-relaxed"
        style={{ fontFamily: "var(--font-body)", color: "var(--muted)", fontWeight: 500 }}
      >
        {svc.desc}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {svc.tags.map(tag => (
          <span
            key={tag}
            className="text-xs px-2 py-1"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--teal-dim)",
              border: "1px solid var(--border)",
              background: "rgba(0,212,255,0.04)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Teal corner accent */}
      <div
        aria-hidden
        className="absolute top-0 left-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ width: 16, height: 2, background: "var(--teal)" }}
      />
      <div
        aria-hidden
        className="absolute top-0 left-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ width: 2, height: 16, background: "var(--teal)" }}
      />
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-24" style={{ background: "var(--dark)" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14">
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ fontFamily: "var(--font-mono)", color: "var(--teal)" }}
          >
            What We Do
          </p>
          <h2
            className="font-bold leading-tight"
            style={{
              fontFamily: "var(--font-head)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--text)",
              maxWidth: 600,
            }}
          >
            Eight Ways We Close Your Technical Gap
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((svc, i) => (
            <Card key={svc.num} svc={svc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
