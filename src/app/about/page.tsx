// app/about/page.tsx
import Link from "next/link";
import Reveal from "@/app/components/Reveal";
import JsonLd from "../components/JsonLd";
import styles from "@/app/styles/about.module.css";
import type { CSSProperties } from "react";


export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Gator Engineered Technologies",
    mainEntity: { "@type": "LocalBusiness", name: "Gator Engineered Technologies" },
  } as const;


  return (
<main
  className={styles.heroWrap}
  style={{ "--pillnav-gutter": "10px" } as CSSProperties}
>

      <div className={styles.backHomeWrap}>
        <Link href="/" className={styles.backHome}>
          ← Back home
        </Link>
      </div>
      <section className={styles.heroCard} aria-label="About Gator Engineered Technologies">

        {/* HERO: slow, smooth ease */}
        <Reveal selector=".aboutHeroItem" y={28} duration={1.1} ease="power3.out" stagger={0.12} once>
          <h1 className={`${styles.title} aboutHeroItem`}>
            The next “.com” wave is here.
            <span className={styles.highlight}>Make your brand the one everyone remembers.</span>
          </h1>

          <p className={`${styles.pitch} aboutHeroItem`}>
            Gator Engineered builds <strong>excited, innovative, breakthrough</strong> websites for small businesses.
            We design experiences that <em>feel premium</em>, load fast, and convert—then we future-proof them
            with practical AI and crypto-ready payments. Your site won’t just look good. It will <em>work</em>
            like a modern product.
          </p>

          <div className={`${styles.ctas} aboutHeroItem`}>
            <Link href="/contact" className={styles.primaryBtn}>Start a Project</Link>
            <Link href="/ai" className={styles.secondaryBtn}>See AI Features</Link>
          </div>
        </Reveal>

        {/* FEATURE CARDS: neat stagger */}
        <Reveal selector={`.${styles.cardItem}`} y={24} duration={0.85} ease="power2.out" stagger={0.12} once>
          <div className={styles.bullets} role="list">
            <div role="listitem" className={styles.cardItem}>
              <h3>Brand Revival</h3>
              <p>Clean visuals, confident motion, and storytelling that makes people care again.</p>
            </div>
            <div role="listitem" className={styles.cardItem}>
              <h3>AI-Native</h3>
              <p>Helpful assistants, intake forms that write themselves, and automation that saves hours.</p>
            </div>
            <div role="listitem" className={styles.cardItem}>
              <h3>Crypto-Ready</h3>
              <p>Offer card/ACH <em>and</em> crypto with a smooth checkout—no confusion, no friction.</p>
            </div>
          </div>
        </Reveal>

        {/* VALUE CHIPS: quick cascade */}
        <Reveal selector={`.${styles.chipItem}`} y={18} duration={0.7} stagger={0.10} once>
          <div className={styles.valueGrid}>
            <div className={styles.chipItem}>
              <span className={styles.kpi}>Fast</span>
              <p>Snappy pages, smart lazy-loading, and mobile-first performance.</p>
            </div>
            <div className={styles.chipItem}>
              <span className={styles.kpi}>Clear</span>
              <p>No jargon. Straight answers, steady communication, honest timelines.</p>
            </div>
            <div className={styles.chipItem}>
              <span className={styles.kpi}>Yours</span>
              <p>Own your stack—content, domain, and payments. No lock-in, ever.</p>
            </div>
          </div>
        </Reveal>

        {/* FOOTER NOTE: soft fade */}
        <Reveal selector={`.${styles.footerNote}`} y={16} duration={0.7} once>
          <div className={styles.footerNote}>
            <p>
              We’re builders for what we call the <strong>brand-revival era</strong> — where small businesses level up with
              modern design, <strong>AI that actually helps</strong>, and <strong>crypto options</strong> that open new customers.
              If that’s where you’re headed, you’re in the right place.
            </p>
          </div>
        </Reveal>

      </section>
      <JsonLd data={aboutSchema} />
    </main>
  );
}
