import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "../components/JsonLd";
import { SERVICE_AREAS } from "./data";
import s from "../styles/pages/service-area.module.css";

export const metadata: Metadata = {
  title: "Service Areas | Gator Engineered Technologies — FL",
  description:
    "Gator Engineered Technologies serves businesses in New Port Richey, Port Richey, Spring Hill, Brooksville, Lutz, Weeki Wachee, and across Hernando & Pasco County, FL.",
  alternates: {
    canonical: "https://gatorengineered.com/service-areas",
  },
  keywords: [
    "web design service areas Florida",
    "web design New Port Richey FL",
    "web design Port Richey FL",
    "web design Spring Hill FL",
    "web design Brooksville FL",
    "web design Lutz FL",
    "web design Weeki Wachee FL",
    "web developer Hernando County",
    "web developer Pasco County",
  ],
  openGraph: {
    title: "Service Areas | Gator Engineered Technologies",
    description:
      "We serve businesses in New Port Richey, Port Richey, Spring Hill, Brooksville, Lutz, Weeki Wachee, and all of Hernando & Pasco County, FL.",
    url: "https://gatorengineered.com/service-areas",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Service Areas | Gator Engineered Technologies",
    description:
      "Web design, AI, and marketing for businesses across Hernando & Pasco County, FL.",
  },
  robots: { index: true, follow: true },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://gatorengineered.com" },
    { "@type": "ListItem", position: 2, name: "Service Areas", item: "https://gatorengineered.com/service-areas" },
  ],
};

export default function ServiceAreasPage() {
  return (
    <div className={s.wrap}>
      <div className={s.backHomeWrap}>
        <Link href="/" className={s.backHome}>← Home</Link>
      </div>

      {/* Hero */}
      <section className={s.hero}>
        <span className={s.badge}>Service Areas</span>
        <h1 className={s.h1}>
          We Serve <span className={s.fxAccent}>Hernando &amp; Pasco County</span> Businesses
        </h1>
        <p className={s.intro}>
          Based in Spring Hill, FL — we build websites, AI chatbots, and marketing systems for local businesses across six communities. Pick your city below to see how we can help.
        </p>
      </section>

      {/* City cards */}
      <div className={s.hubGrid}>
        {SERVICE_AREAS.map((area) => (
          <Link
            key={area.slug}
            href={`/service-areas/${area.slug}`}
            className={s.hubCard}
          >
            <p className={s.hubCardCounty}>{area.county}</p>
            <h2 className={s.hubCardName}>{area.name}</h2>
            <p className={s.hubCardDesc}>{area.intro.slice(0, 100)}…</p>
            <span className={s.hubCardArrow}>Learn more →</span>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <section className={s.cta}>
        <h2 className={s.ctaTitle}>
          Don&apos;t see your city?
        </h2>
        <p className={s.ctaBody}>
          We work with businesses all across Florida — and remotely anywhere. Reach out and let&apos;s talk.
        </p>
        <Link href="/contact" className={s.ctaBtn}>Get a Free Quote</Link>
      </section>

      <JsonLd data={breadcrumb} />
    </div>
  );
}
