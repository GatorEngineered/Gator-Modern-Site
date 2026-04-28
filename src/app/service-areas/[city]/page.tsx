import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import JsonLd from "../../components/JsonLd";
import { SERVICE_AREAS, getAreaBySlug } from "../data";
import s from "../../styles/pages/service-area.module.css";

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return SERVICE_AREAS.map((area) => ({ city: area.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const area = getAreaBySlug(city);
  if (!area) return {};

  return {
    title: area.metaTitle,
    description: area.metaDescription,
    keywords: area.keywords,
    alternates: {
      canonical: `https://gatorengineered.com/service-areas/${area.slug}`,
    },
    openGraph: {
      title: area.metaTitle,
      description: area.metaDescription,
      url: `https://gatorengineered.com/service-areas/${area.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: area.metaTitle,
      description: area.metaDescription,
    },
    robots: { index: true, follow: true },
  };
}

const SERVICES = [
  {
    icon: "🌐",
    title: "Web Design & Development",
    desc: "Fast, modern websites built with React & Next.js. Mobile-first, SEO-ready, and designed to convert visitors into customers.",
  },
  {
    icon: "🤖",
    title: "AI Chatbots & Automation",
    desc: "On-brand AI assistants that answer questions, book appointments, and capture leads 24/7 — without lifting a finger.",
  },
  {
    icon: "📈",
    title: "SEO & AEO Marketing",
    desc: "Rank on Google and show up in AI-generated answers with technical SEO, local optimization, and Answer Engine Optimization.",
  },
  {
    icon: "💎",
    title: "Crypto-Ready Payments",
    desc: "Optional crypto checkout, on-chain receipts, and Web3 membership perks — clean UX your customers won't need a tutorial for.",
  },
];

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  const area = getAreaBySlug(city);
  if (!area) notFound();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Gator Engineered Technologies",
    url: "https://gatorengineered.com",
    description: area.metaDescription,
    areaServed: [
      { "@type": "City", name: `${area.name}, FL` },
      { "@type": "AdministrativeArea", name: `${area.county}, FL` },
    ],
    sameAs: [
      "https://www.facebook.com/people/Gator-Engineered-Technologies/61575072135764/",
      "https://x.com/GatorEngineered",
      "https://www.linkedin.com/company/gator-engineered-technologies/people/?viewAsMember=true",
    ],
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://gatorengineered.com" },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: "https://gatorengineered.com/service-areas" },
      { "@type": "ListItem", position: 3, name: area.name, item: `https://gatorengineered.com/service-areas/${area.slug}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Do you offer web design in ${area.name}, FL?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes — Gator Engineered Technologies serves businesses in ${area.name}, ${area.county}. We build custom websites, AI chatbots, SEO systems, and marketing tools for local businesses.`,
        },
      },
      {
        "@type": "Question",
        name: `How much does a website cost for a ${area.name} business?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Our web design packages start at a flat project rate with no hidden fees. We offer clear pricing for businesses of all sizes in ${area.name} and the surrounding ${area.county} area. Contact us for a free quote.`,
        },
      },
      {
        "@type": "Question",
        name: `Can you add an AI chatbot to my ${area.name} business website?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Absolutely. We build on-brand AI chatbots that integrate into your existing or new website. They can answer questions, capture leads, book appointments, and automate follow-ups — perfect for small businesses in ${area.name}.`,
        },
      },
    ],
  };

  return (
    <div className={s.wrap}>
      <div className={s.backHomeWrap}>
        <Link href="/service-areas" className={s.backHome}>← All Service Areas</Link>
      </div>

      {/* Hero */}
      <section className={s.hero}>
        <span className={s.badge}>{area.county} · Florida</span>
        <h1 className={s.h1}>
          <span className={s.fxAccent}>{area.name}</span> Web Design &amp; AI Services
        </h1>
        <p className={s.intro}>{area.intro}</p>
      </section>

      {/* Why us */}
      <section className={s.section}>
        <h2 className={s.sectionTitle}>Why {area.name} Businesses Choose Gator Engineered</h2>
        <p className={s.sectionBody}>{area.why}</p>
      </section>

      {/* Services */}
      <div className={s.servicesGrid}>
        {SERVICES.map((svc) => (
          <div key={svc.title} className={s.serviceCard}>
            <span className={s.serviceIcon}>{svc.icon}</span>
            <h3 className={s.serviceCardTitle}>{svc.title}</h3>
            <p className={s.serviceCardDesc}>{svc.desc}</p>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <section className={s.section}>
        <h2 className={s.sectionTitle}>Common Questions from {area.name} Businesses</h2>
        <div style={{ display: "grid", gap: "20px", marginTop: "8px" }}>
          {faqSchema.mainEntity.map((q) => (
            <div key={q.name}>
              <p style={{ fontWeight: 700, marginBottom: "4px", fontSize: "15px" }}>{q.name}</p>
              <p className={s.sectionBody} style={{ margin: 0 }}>{q.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={s.cta}>
        <h2 className={s.ctaTitle}>
          Ready to grow your <span className={s.fxAccent}>{area.name}</span> business?
        </h2>
        <p className={s.ctaBody}>
          Get a free quote — no pressure, no jargon. Just a straightforward conversation about what your business needs.
        </p>
        <Link href="/contact" className={s.ctaBtn}>Get a Free Quote</Link>
      </section>

      <JsonLd data={localBusinessSchema} />
      <JsonLd data={breadcrumb} />
      <JsonLd data={faqSchema} />
    </div>
  );
}
