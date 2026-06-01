"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const PROJECTS = [
  {
    status: "Live — Active",
    statusColor: "var(--green)",
    name: "Perk Proof",
    url: "perkproof.com",
    href: "https://perkproof.com",
    headline: "Blockchain-powered customer loyalty SaaS for local businesses.",
    desc: "QR code check-ins, USDC payouts on Polygon, NFT perk tiers, and referral tracking — all without requiring customers to download an app. Rule-based reward logic, n8n automation for follow-up flows, and a merchant dashboard for campaign management. Conceived, built, and launched to paying clients solo.",
    tags: ["Blockchain", "USDC", "Polygon", "QR Rewards", "NFTs", "n8n", "SaaS"],
    type: "Founder-Built Product",
  },
  {
    status: "Active — In Development",
    statusColor: "var(--teal)",
    name: "Permits Automated",
    url: "permitsautomated.com",
    href: null,
    headline: "AI-powered Florida permit automation platform.",
    desc: "Intelligent permit routing across all 67 Florida counties — AI pre-fills application packets based on project type, jurisdiction, and property data. Generates blockchain-verifiable permit records on Polygon that transfer with the property at resale. Built for contractors, engineers, and property owners navigating Florida's fragmented permitting system.",
    tags: ["Next.js", "TypeScript", "Polygon", "AI", "67 Counties", "Blockchain"],
    type: "Platform In Development",
  },
  {
    status: "Live — Active",
    statusColor: "var(--green)",
    name: "MKC Construction & Engineering",
    url: "mkcpros.com",
    href: "https://mkcpros.com",
    headline: "Full-stack platform for a licensed Florida general contractor.",
    desc: "Custom Next.js platform spanning 283 geo-targeted location pages (67 counties, 216 cities), 57 blog articles, 14 trade and service pages, GSAP-animated homepage, rule-based AI chatbot with lead capture, admin CRM with pipeline management, and complete structured data schema across every route. License CBC1268351.",
    tags: ["Next.js", "TypeScript", "GSAP", "283 Location Pages", "AI Chatbot", "CRM", "SEO Schema"],
    type: "Client Project",
  },
];

export default function ProofOfWork() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="proof" className="py-24" style={{ background: "var(--dark)" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14">
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ fontFamily: "var(--font-mono)", color: "var(--teal)" }}
          >
            Proof of Work
          </p>
          <h2
            className="font-bold"
            style={{
              fontFamily: "var(--font-head)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--text)",
              lineHeight: 1.1,
              maxWidth: 500,
            }}
          >
            Built and Shipped. Not Just Consulted.
          </h2>
        </div>

        {/* Cards */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {PROJECTS.map((proj, i) => (
            <motion.div
              key={proj.name}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.14, duration: 0.55, ease: "easeOut" }}
              className="flex flex-col p-8"
              style={{
                background: "var(--panel)",
                border: "1px solid var(--border)",
                clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))",
              }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: proj.statusColor, flexShrink: 0 }}
                    />
                    <span
                      className="text-xs uppercase tracking-wider"
                      style={{ fontFamily: "var(--font-mono)", color: proj.statusColor }}
                    >
                      {proj.status}
                    </span>
                  </div>
                  <span
                    className="text-xs"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--muted)" }}
                  >
                    {proj.type}
                  </span>
                </div>
                {proj.href && (
                  <a
                    href={proj.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-3 py-1.5 transition-colors duration-150"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--teal)",
                      border: "1px solid var(--teal-dim)",
                      background: "rgba(0,212,255,0.05)",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,212,255,0.12)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,212,255,0.05)")}
                  >
                    {proj.url} ↗
                  </a>
                )}
              </div>

              {/* Name */}
              <h3
                className="font-bold mb-2"
                style={{ fontFamily: "var(--font-head)", fontSize: "1.6rem", color: "var(--text)", lineHeight: 1.1 }}
              >
                {proj.name}
              </h3>

              {/* Headline */}
              <p
                className="mb-3 font-semibold"
                style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--text)", opacity: 0.75 }}
              >
                {proj.headline}
              </p>

              {/* Description */}
              <p
                className="text-sm leading-relaxed mb-6 flex-1"
                style={{ fontFamily: "var(--font-body)", color: "var(--muted)", fontWeight: 500 }}
              >
                {proj.desc}
              </p>

              {/* Stack tags */}
              <div className="flex flex-wrap gap-2">
                {proj.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1"
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
            </motion.div>
          ))}
        </div>

        {/* SEO proof callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.5, ease: "easeOut" }}
          className="mt-8 p-6 flex flex-col md:flex-row md:items-center gap-4"
          style={{ background: "var(--panel)", border: "1px solid var(--border)" }}
        >
          <span style={{ color: "var(--teal)", fontSize: 20, flexShrink: 0 }}>◈</span>
          <p
            className="text-sm leading-relaxed"
            style={{ fontFamily: "var(--font-body)", color: "var(--muted)", fontWeight: 500 }}
          >
            We&apos;ve also driven measurable SEO and AEO results for clients in competitive local markets
            — including a Tampa, FL bakery competing against national chains. Technical SEO, structured
            schema, Answer Engine Optimization, and hundreds of keyword-optimized image assets helped
            them dominate local search results and AI-generated answers in their category.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
