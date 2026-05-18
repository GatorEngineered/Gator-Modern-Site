import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import JsonLd from "@/app/components/JsonLd";
import { SERVICES, getServiceBySlug, getRelatedServices } from "../data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const svc = getServiceBySlug(slug);
  if (!svc) return {};
  return {
    title: `${svc.title} | Gator Engineered Technologies`,
    description: svc.description,
    keywords: svc.tags,
    alternates: { canonical: `https://gatorengineered.com/services/${svc.slug}` },
    openGraph: {
      title: `${svc.title} | Gator Engineered Technologies`,
      description: svc.description,
      url: `https://gatorengineered.com/services/${svc.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${svc.title} | Gator Engineered Technologies`,
      description: svc.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const svc = getServiceBySlug(slug);
  if (!svc) notFound();

  const related = getRelatedServices(slug);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: svc.title,
    description: svc.description,
    provider: {
      "@type": "ProfessionalService",
      name: "Gator Engineered Technologies",
      url: "https://gatorengineered.com",
      address: { "@type": "PostalAddress", addressLocality: "St. Petersburg", addressRegion: "FL" },
    },
    areaServed: { "@type": "State", name: "Florida" },
    url: `https://gatorengineered.com/services/${svc.slug}`,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://gatorengineered.com" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://gatorengineered.com/#services" },
      { "@type": "ListItem", position: 3, name: svc.title, item: `https://gatorengineered.com/services/${svc.slug}` },
    ],
  };

  return (
    <main
      id="main-content"
      style={{ background: "var(--dark, #060d14)", minHeight: "100vh", paddingBottom: "6rem" }}
    >
      {/* ── Back + breadcrumb ─────────────────────────────────── */}
      <div
        className="border-b"
        style={{ borderColor: "var(--border, #0d2137)", background: "var(--panel, #0a1520)" }}
      >
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-3 text-xs"
          style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--muted, #4a6275)" }}
        >
          <Link href="/" style={{ color: "var(--muted, #4a6275)", textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--teal, #00d4ff)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--muted, #4a6275)")}
          >Home</Link>
          <span>›</span>
          <Link href="/#services" style={{ color: "var(--muted, #4a6275)", textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--teal, #00d4ff)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--muted, #4a6275)")}
          >Services</Link>
          <span>›</span>
          <span style={{ color: "var(--teal, #00d4ff)" }}>{svc.title}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6">

        {/* ── Hero ──────────────────────────────────────────────── */}
        <div className="pt-16 pb-14"
          style={{ borderBottom: "1px solid var(--border, #0d2137)" }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs px-3 py-1"
              style={{
                fontFamily: "var(--font-mono, monospace)",
                color: "var(--teal, #00d4ff)",
                border: "1px solid var(--border, #0d2137)",
                background: "rgba(0,212,255,0.06)",
              }}
            >{svc.num}</span>
            <div className="flex gap-2 flex-wrap">
              {svc.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-1"
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    color: "var(--teal-dim, #007fa3)",
                    border: "1px solid var(--border, #0d2137)",
                    background: "rgba(0,212,255,0.04)",
                  }}
                >{tag}</span>
              ))}
            </div>
          </div>

          <h1 className="font-bold mb-4"
            style={{
              fontFamily: "var(--font-head, sans-serif)",
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              color: "var(--text, #c8dce8)",
              lineHeight: 1.08,
            }}
          >{svc.title}</h1>

          <p className="text-lg font-semibold"
            style={{
              fontFamily: "var(--font-body, sans-serif)",
              color: "var(--teal, #00d4ff)",
              maxWidth: 640,
            }}
          >{svc.tagline}</p>
        </div>

        {/* ── Intro ─────────────────────────────────────────────── */}
        <section className="py-12" style={{ borderBottom: "1px solid var(--border, #0d2137)" }}>
          <p className="text-base leading-relaxed"
            style={{
              fontFamily: "var(--font-body, sans-serif)",
              color: "var(--text, #c8dce8)",
              fontWeight: 500,
              maxWidth: 760,
              fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
            }}
          >{svc.intro}</p>
        </section>

        {/* ── What it is ────────────────────────────────────────── */}
        <section className="py-12" style={{ borderBottom: "1px solid var(--border, #0d2137)" }}>
          <p className="text-xs uppercase tracking-widest mb-5"
            style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--teal, #00d4ff)" }}
          >What It Is</p>
          <p className="text-base leading-relaxed"
            style={{
              fontFamily: "var(--font-body, sans-serif)",
              color: "var(--muted, #4a6275)",
              fontWeight: 500,
              maxWidth: 760,
              fontSize: "clamp(0.95rem, 1.7vw, 1.05rem)",
            }}
          >{svc.what}</p>
        </section>

        {/* ── Deliverables ──────────────────────────────────────── */}
        <section className="py-12" style={{ borderBottom: "1px solid var(--border, #0d2137)" }}>
          <p className="text-xs uppercase tracking-widest mb-6"
            style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--teal, #00d4ff)" }}
          >What You Get</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {svc.deliverables.map((d, i) => (
              <li key={i} className="flex items-start gap-3 p-4"
                style={{ background: "var(--panel, #0a1520)", border: "1px solid var(--border, #0d2137)" }}
              >
                <span style={{ color: "var(--teal, #00d4ff)", flexShrink: 0, marginTop: 2 }}>›</span>
                <span className="text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-body, sans-serif)", color: "var(--text, #c8dce8)", fontWeight: 500 }}
                >{d}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Who It's For ──────────────────────────────────────── */}
        <section className="py-12" style={{ borderBottom: "1px solid var(--border, #0d2137)" }}>
          <p className="text-xs uppercase tracking-widest mb-6"
            style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--teal, #00d4ff)" }}
          >Who This Is For</p>
          <ul className="flex flex-col gap-3">
            {svc.whoFor.map((w, i) => (
              <li key={i} className="flex items-start gap-3">
                <span style={{ color: "var(--green, #00ff88)", flexShrink: 0, marginTop: 3 }}>◆</span>
                <span className="text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-body, sans-serif)", color: "var(--muted, #4a6275)", fontWeight: 500 }}
                >{w}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Engagement fit ────────────────────────────────────── */}
        <section className="py-12" style={{ borderBottom: "1px solid var(--border, #0d2137)" }}>
          <p className="text-xs uppercase tracking-widest mb-5"
            style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--teal, #00d4ff)" }}
          >How It Fits Our Engagement Model</p>
          <div className="p-6"
            style={{
              background: "var(--panel, #0a1520)",
              border: "1px solid var(--border, #0d2137)",
              borderLeft: "3px solid var(--teal, #00d4ff)",
            }}
          >
            <p className="text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-body, sans-serif)", color: "var(--muted, #4a6275)", fontWeight: 500 }}
            >{svc.engagement}</p>
          </div>
          <div className="mt-5">
            <Link href="/#how-it-works" className="text-sm font-semibold transition-colors duration-150"
              style={{ fontFamily: "var(--font-body, sans-serif)", color: "var(--teal, #00d4ff)", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--green, #00ff88)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--teal, #00d4ff)")}
            >See how our 3-phase model works →</Link>
          </div>
        </section>

        {/* ── Related services ──────────────────────────────────── */}
        {related.length > 0 && (
          <section className="py-12" style={{ borderBottom: "1px solid var(--border, #0d2137)" }}>
            <p className="text-xs uppercase tracking-widest mb-6"
              style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--teal, #00d4ff)" }}
            >Related Services</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map(r => (
                <Link key={r.slug} href={`/services/${r.slug}`}
                  className="flex flex-col p-5 transition-colors duration-150 group"
                  style={{
                    background: "var(--panel, #0a1520)",
                    border: "1px solid var(--border, #0d2137)",
                    textDecoration: "none",
                    clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--teal-dim, #007fa3)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border, #0d2137)")}
                >
                  <span className="text-xs mb-2"
                    style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--muted, #4a6275)" }}
                  >{r.num}</span>
                  <span className="font-bold text-sm mb-1"
                    style={{ fontFamily: "var(--font-head, sans-serif)", color: "var(--text, #c8dce8)" }}
                  >{r.title}</span>
                  <span className="text-xs mt-auto pt-3"
                    style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--teal, #00d4ff)" }}
                  >View →</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── CTA ───────────────────────────────────────────────── */}
        <section className="py-16">
          <div className="p-10 text-center"
            style={{
              background: "var(--panel, #0a1520)",
              border: "1px solid var(--border, #0d2137)",
              borderTop: "3px solid var(--teal, #00d4ff)",
              clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
            }}
          >
            <p className="text-xs uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--teal, #00d4ff)" }}
            >Ready to Start?</p>
            <h2 className="font-bold mb-3"
              style={{
                fontFamily: "var(--font-head, sans-serif)",
                fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                color: "var(--text, #c8dce8)",
                lineHeight: 1.1,
              }}
            >Let&apos;s talk about {svc.title}.</h2>
            <p className="mb-8 mx-auto text-sm leading-relaxed"
              style={{
                fontFamily: "var(--font-body, sans-serif)",
                color: "var(--muted, #4a6275)",
                fontWeight: 500,
                maxWidth: 440,
              }}
            >30–90 day engagement. Clear deliverables. Clean exit. Tell us what you need and we&apos;ll map out a scope.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/#contact"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold transition-all duration-200"
                style={{
                  fontFamily: "var(--font-body, sans-serif)",
                  background: "var(--teal, #00d4ff)",
                  color: "#020408",
                  letterSpacing: "0.06em",
                  textDecoration: "none",
                  clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--green, #00ff88)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--teal, #00d4ff)")}
              >Start an Engagement →</Link>
              <a href="mailto:reva@gatorengineered.com"
                className="text-sm font-semibold transition-colors duration-150"
                style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--muted, #4a6275)", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--teal, #00d4ff)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--muted, #4a6275)")}
              >reva@gatorengineered.com</a>
            </div>
          </div>
        </section>
      </div>

      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumb} />
    </main>
  );
}
