import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/app/components/Reveal";
import HeroWords from "./HeroScene";
import styles from "@/app/styles/pages/web23.module.css";

export const metadata: Metadata = {
  title: "Brand Revival | Gator Engineered",
  description:
    "Brand-first web design for the new internet. Web2 experiences, Web3 ownership, and the story that makes customers care.",
  alternates: { canonical: "/web" },
  robots: { index: true, follow: true },
};

export default function WebPage() {
  return (
    <main className={styles.wrap}>
    <div className={styles.backHomeWrap}>
    <Link href="/" className={styles.backHome}>
      ← Back home
    </Link>
  </div>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <h1 className={styles.h1}>
            Brand-First Web for the{" "}
            <span className={styles.fxBlue}>Next Internet</span>.
          </h1>
          <p className={styles.lede}>
            Web started as billboards. Social turned brands into people. Now{" "}
            <strong>Web3</strong> brings <em>ownership</em> and{" "}
            <em>individualism</em>—customers back the story, the craft, the
            values. Design isn’t decoration anymore—it’s the{" "}
            <strong>connection layer</strong>.
          </p>

          <div className={styles.ctas}>
            <Link href="/contact" className={styles.primary}>
              Start a project
            </Link>
            <Link href="/about" className={styles.secondary}>
              Why Gator?
            </Link>
          </div>
        </div>

        {/* 3D hero (client-only) */}
        <div className={styles.heroStage} aria-hidden="true">
          <HeroWords />
        </div>
      </section>

      {/* THE SHIFT — STORY */}
      <Reveal selector={`.${styles.rev}`} y={22} duration={0.9} stagger={0.06} once>
  <section className={`${styles.shift} ${styles.offsetLeft}`}>
          <h2 className={`${styles.h2} ${styles.rev}`}>
            From Ads → Feeds → <span className={styles.fxTeal}>Ownership</span>.
          </h2>
          <p className={`${styles.bigP} ${styles.rev}`}>
            The web used to be about reach. Then it became about followers. Now it’s
            about <strong>belonging</strong>. Younger customers look for a brand’s
            story, social contribution, and what it stands against—not just price.
            That’s why your site can’t be “good enough.” It has to{" "}
            <em>feel like you</em>.
          </p>

          <div className={styles.pillGrid}>
            <div className={`${styles.pill} ${styles.rev}`}>
              <span className={styles.kicker}>Identity</span>
              Clean visuals, voice, and motion that match your values.
            </div>
            <div className={`${styles.pill} ${styles.rev}`}>
              <span className={styles.kicker}>Narrative</span>
              Your origin, your craft, your reason to exist—told clearly.
            </div>
            <div className={`${styles.pill} ${styles.rev}`}>
              <span className={styles.kicker}>Belonging</span>
              Give customers a way to opt in and be recognized.
            </div>
          </div>
        </section>
      </Reveal>

      {/* WEB2 SERVICES */}
      <Reveal selector={`.${styles.rev}`} y={20} duration={0.8} stagger={0.05} once>
        <section className={styles.panel}>
          <h3 className={`${styles.h3} ${styles.rev}`}>
            Web2 Done Right: <span className={styles.fxBlue}>Clarity + Speed</span>.
          </h3>
          <p className={`${styles.copy} ${styles.rev}`}>
            Most of the web still runs on Web2—and that’s great. We build modern
            React sites that load fast, explain quickly, and convert. Think: crisp
            pages, helpful animation, great SEO/AEO, analytics that actually help,
            and a checkout that doesn’t leak.
          </p>

          <div className={styles.cardGrid}>
            <article className={`${styles.card} ${styles.rev}`}>
              <h4>Brand / UI Kit</h4>
              <p>Typography, color, components, and motion rules to stay consistent.</p>
            </article>
            <article className={`${styles.card} ${styles.rev}`}>
              <h4>Performance</h4>
              <p>Smart lazy-loading, asset strategy, and Lighthouse-friendly builds.</p>
            </article>
            <article className={`${styles.card} ${styles.rev}`}>
              <h4>SEO + AEO</h4>
              <p>Pages that rank and answers that assistants can quote cleanly.</p>
            </article>
            <article className={`${styles.card} ${styles.rev}`}>
              <h4>Payments</h4>
              <p>Card/ACH today; crypto optional. Clear pricing and verifiable receipts.</p>
            </article>
          </div>
        </section>
      </Reveal>

      {/* WEB3 SERVICES */}
      <Reveal selector={`.${styles.rev}`} y={22} duration={0.9} stagger={0.06} once>
        <section className={styles.panel}>
          <h3 className={`${styles.h3} ${styles.rev}`}>
            Web3: <span className={styles.fxTeal}>Identity, Ownership, Access</span>.
          </h3>
          <p className={`${styles.copy} ${styles.rev}`}>
            Web3 isn’t “crypto bros.” It’s a toolkit: wallets (identity), tokens or
            passes (ownership), and perks or content (access). You don’t replace your
            site—you add a brand layer customers can carry with them.
          </p>

          <div className={styles.cardGrid}>
            <article className={`${styles.card} ${styles.rev}`}>
              <h4>Wallet-Friendly UX</h4>
              <p>Connect buttons that don’t confuse. Email fallback for the crypto-curious.</p>
            </article>
            <article className={`${styles.card} ${styles.rev}`}>
              <h4>Membership & Perks</h4>
              <p>Holders get discounts, early access, or “pro” features—no new logins.</p>
            </article>
            <article className={`${styles.card} ${styles.rev}`}>
              <h4>On-Chain Receipts</h4>
              <p>Give proof customers can verify—great for events, tickets, and drops.</p>
            </article>
            <article className={`${styles.card} ${styles.rev}`}>
              <h4>Analytics</h4>
              <p>Measure adoption without breaking privacy or losing the plot.</p>
            </article>
          </div>
        </section>
      </Reveal>

      {/* CTA LINKS */}
      <section className={styles.bottomCta}>
        <Reveal selector={`.${styles.ctaItem}`} y={14} duration={0.65} stagger={0.06} once>
          <h2 className={`${styles.h2} ${styles.ctaItem}`}>
            Ready To Build A Brand People <span className={styles.fxBlue}>Rally Around?</span>
          </h2>
          <p className={`${styles.copy} ${styles.ctaItem}`}>
            Explore what we can add now—and what’s next.
          </p>

          <div className={`${styles.linkGrid} ${styles.ctaItem}`}>
            <Link href="/marketing" className={styles.linkCard}>Marketing</Link>
            <Link href="/ai" className={styles.linkCard}>AI</Link>
            <Link href="/crypto" className={styles.linkCard}>Crypto</Link>
            <Link href="/contact" className={styles.linkCard}>Contact</Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
