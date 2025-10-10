// app/crypto/page.tsx
import Link from "next/link";
import Image from "next/image";
import JsonLd from "../components/JsonLd";
import type { Metadata } from "next";
import Reveal from "@/app/components/Reveal";
import styles from "@/app/styles/pages/crypto.module.css";

export const metadata: Metadata = {
  title: "Crypto Payments & Web3 Integration in Florida",
  description:
    "Accept crypto payments and add Web3 perks—wallet login, token rewards, gated content—set up end to end.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://gatorengineered.com/crypto" },
};

export default function CryptoPage() {

const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Crypto Payments & Web3 Integration",
    serviceType: "Web3 / Cryptocurrency",
    provider: { "@type": "LocalBusiness", name: "Gator Engineered Technologies" },
    areaServed: [{ "@type": "State", name: "Florida" }],
    offers: { "@type": "Offer", priceCurrency: "USD", price: "1299" },
  } as const;

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Crypto", item: "https://gatorengineered.com/crypto" },
    ],
  } as const;

  return (
    <main className={`${styles.wrap} pageWrap`}>
      <div className={styles.backHomeWrap}>
    <Link href="/" className={styles.backHome}>
      ← Back home
    </Link>
  </div>
      {/* HERO */}
      <section className={styles.hero} aria-label="Crypto-ready websites & integrations">
        <Reveal selector=".heroItem" y={28} duration={1.1} ease="power3.out" stagger={0.12} once>
          <h1 className={`heroItem ${styles.h1}`}>
            Crypto-ready, <span className={styles.fxAccent}>without confusing your customers</span>.
          </h1>
          <p className={`heroItem ${styles.lede}`}>
            Offer cards/ACH <em>and</em> crypto. Launch memberships and on-chain receipts that feel
            simple and trustworthy. Same clean design—future-ready under the hood.
          </p>
          <div className={`heroItem ${styles.ctas}`}>
            <Link href="/contact" className={styles.primary}>Start a Project</Link>
            <Link href="/about" className={styles.secondary}>Why Gator?</Link>
          </div>
        </Reveal>
      </section>

      {/* DEEP EXPLAINER: one long section with big type + gradients */}
      <Reveal selector={`.${styles.deepItem}`} y={22} duration={0.95} ease="power3.out" stagger={0.08} once>
        <section className={styles.explainDeep} aria-label="How crypto helps in real business terms">
          <h2 className={`${styles.deepTitle} ${styles.deepItem}`}>
            Crypto For Business—No Hype, <span className={styles.gxBlue}>Just Utility</span>.
          </h2>

          {/* Loyalty that travels */}
          <div className={`${styles.deepRow} ${styles.deepItem}`}>
            <h3 className={styles.deepHeading}>
              <span className={styles.gxBlue}>Loyalty</span> That Travels
            </h3>
            <p className={styles.deepLead}>
              A punch-card you can’t lose. Customers keep a <span className={styles.gxTeal}>verifiable pass</span> in their wallet.
              Your site (or a partner) can recognize it instantly—no app lock-in.
            </p>
            <div className={styles.callout}>
              <span className={styles.pill}>In practice</span>
              <p className={styles.calloutText}>
                “Sign in with email.” Behind the scenes, their pass is checked → perks unlock (VIP pricing, downloads, members-only pages).
              </p>
            </div>
          </div>

          {/* Rails & fees */}
          <div className={`${styles.deepRow} ${styles.deepItem}`}>
            <h3 className={styles.deepHeading}>
              <span className={styles.gxBlue}>Rails</span> & Fees
            </h3>
            <p className={styles.deepBody}>
              A <em>rail</em> is a payment network. Cards/ACH are rails. Blockchains are rails too. Each rail has different costs.
              On some blockchain rails, small to mid-sized payments can cost <span className={styles.gxTeal}>cents instead of percentages</span>.
              We default to <strong>stablecoins</strong> so totals stay in USD.
            </p>
            <div className={styles.compare}>
              <div className={styles.compareBox}>
                <div className={styles.kicker}>Cards</div>
                <div className={styles.num}>~2.9% + $0.30</div>
                <div className={styles.meta}>varies by card & processor</div>
              </div>
              <div className={styles.compareBox}>
                <div className={styles.kicker}>Some blockchain rails</div>
                <div className={styles.num}>¢ fees</div>
                <div className={styles.meta}>network gas + tiny processor fee</div>
              </div>
            </div>
            <p className={styles.smallNote}>
              Not financial advice—actual costs vary by network/amount. We keep cards/ACH **and** add crypto as an **option**.
            </p>
          </div>

          {/* What “dashboard” means */}
          <div className={`${styles.deepRow} ${styles.deepItem}`}>
            <h3 className={styles.deepHeading}>
              Your <span className={styles.gxBlue}>Dashboard</span>
            </h3>
            <p className={styles.deepBody}>
              You track orders in your own admin panel: <span className={styles.mono}>Pending → Paid → Fulfilled</span>.
              MetaMask is the customer’s wallet view. When their payment confirms, your order updates automatically.
            </p>
          </div>

          {/* Verifiable receipt */}
          <div className={`${styles.deepRow} ${styles.deepItem}`}>
            <h3 className={styles.deepHeading}>
              <span className={styles.gxTeal}>Verifiable Receipt</span> = Proof You Can’t Quietly Edit
            </h3>
            <p className={styles.deepBody}>
              We record a receipt hash on a shared ledger. Customers get a link/QR; you get the same hash on the order.
              Anyone can verify the timestamp and amount on a block explorer.
            </p>
          </div>

          {/* MetaMask walkthrough */}
          <div className={`${styles.deepRow} ${styles.deepItem}`}>
            <h3 className={styles.deepHeading}>A payment with <span className={styles.gxBlue}>MetaMask</span>, end-to-end</h3>
            <div className={styles.steps}>
              <div className={styles.step}>
                <span className={styles.stepBadge}>01</span>
                <div>
                  <div className={styles.stepTitle}>Customer checks out</div>
                  <div className={styles.stepText}>They pick “Pay with crypto (USD stablecoin)” or just use card/ACH as usual.</div>
                </div>
              </div>
              <div className={styles.step}>
                <span className={styles.stepBadge}>02</span>
                <div>
                  <div className={styles.stepTitle}>MetaMask pops up</div>
                  <div className={styles.stepText}>Shows the exact USD total (as stablecoin), the network, and the fee.</div>
                </div>
              </div>
              <div className={styles.step}>
                <span className={styles.stepBadge}>03</span>
                <div>
                  <div className={styles.stepTitle}>Customer confirms</div>
                  <div className={styles.stepText}>They approve. MetaMask broadcasts the payment on the rail we picked.</div>
                </div>
              </div>
              <div className={styles.step}>
                <span className={styles.stepBadge}>04</span>
                <div>
                  <div className={styles.stepTitle}>Order updates in your dashboard</div>
                  <div className={styles.stepText}>Your admin marks the order <span className={styles.mono}>Paid</span> with a link to the transaction hash.</div>
                </div>
              </div>
              <div className={styles.step}>
                <span className={styles.stepBadge}>05</span>
                <div>
                  <div className={styles.stepTitle}>Receipt & email</div>
                  <div className={styles.stepText}>Customer gets the normal confirmation + a “View verifiable receipt” link.</div>
                </div>
              </div>
              <div className={styles.step}>
                <span className={styles.stepBadge}>06</span>
                <div>
                  <div className={styles.stepTitle}>(Optional) Membership pass</div>
                  <div className={styles.stepText}>If it’s a member product, we drop a pass to their wallet. Next visit = perks unlock automatically.</div>
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.deepFoot} ${styles.deepItem}`}>
            <p>
              Bottom line: crypto stays <em>optional</em> for customers, and it gives you new tools:
              <span className={styles.gxBlue}> lower fees (sometimes)</span>, <span className={styles.gxTeal}>verifiable receipts</span>,
              and <span className={styles.gxBlue}>portable loyalty</span>. We’ll add it without breaking your current flow.
            </p>
            <div className={styles.ctas}>
              <Link href="/contact" className={styles.primary}>Book A Consultation</Link>
              <Link href="/about" className={styles.secondary}>Why Gator?</Link>
            </div>
          </div>
        </section>
      </Reveal>


      {/* MEDIA PREVIEW */}
      <section className={styles.animSection} aria-label="Payment option preview">
       

        <div className={styles.animCard}>
          <div className={styles.animSlot}>

            {/* Fallback if video isn't supported */}
            <Image
              src="/animations/blockchain-circulation.gif"
              alt="Crypto payment animation"
              width={900}
              height={520}
              className={styles.animImg}
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <Reveal selector={`.${styles.cardItem}`} y={24} duration={0.85} ease="power2.out" stagger={0.12} once>
        <section className={styles.grid3} aria-label="What you can add">
          <article className={styles.cardItem}>
            <h2>Optional crypto checkout</h2>
            <p>Keep cards & ACH. Add crypto as a simple, optional flow with clear pricing and receipts.</p>
          </article>
          <article className={styles.cardItem}>
            <h2>Membership / NFT gating</h2>
            <p>Offer perks or protected content to holders. Clean UX, no jargon—and normal login still works.</p>
          </article>
          <article className={styles.cardItem}>
            <h2>On-chain, verifiable receipts</h2>
            <p>Give customers proof they can verify. Great for authenticity, tickets, and limited drops.</p>
          </article>
        </section>
      </Reveal>


      {/* CTA */}

      {/* CTA */}
<section className={styles.bottomCta}>
  <div className={styles.ctaContent}>
    <h2 className={styles.ctaItem}>Ready To Try Crypto?</h2>
    <p className={styles.ctaItem}>
      We’ll add it as an option, keep your current checkout, and measure results together.
    </p>
    <div className={`${styles.ctas} ${styles.ctaItem}`}>
      <Link href="/contact" className={styles.primary}>Book A Consultation</Link>
      <Link href="/marketing" className={styles.secondary}>See Marketing Features</Link>
    </div>
  </div>

  <div className={styles.ctaArt} aria-hidden="true">
    {/* Use poster for the still frame; no <img> inside <video> */}
    <video
      className={styles.ctaArtVideo}
      autoPlay
      muted
      loop
      playsInline
      poster="/animations/cta-orb-poster.jpg"
    >
      <source src="/animations/cta-orb.mp4" type="video/mp4" />
      {/* No <img> fallback in here */}
    </video>

    {/* Optimized decorative fallback / still image */}
    <Image
      src="/animations/cta-orb.gif"
      alt=""                 // decorative
      width={900}
      height={520}
      className={`${styles.ctaArtImg} ${styles.ctaArtStill}`}
      priority
    />

    {/* (Optional) noscript fallback for users with JS disabled */}
    <noscript>
      <Image
        src="/animations/cta-orb.gif"
        alt=""
        width={900}
        height={520}
        className={`${styles.ctaArtImg} ${styles.ctaArtStill}`}
      />
    </noscript>
  </div>
</section>
<JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbs} />

    </main>

  );
}
