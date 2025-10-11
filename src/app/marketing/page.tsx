
import Link from "next/link";
import JsonLd from "../components/JsonLd";
import type { Metadata } from "next";
import { ROUTES } from "@/app/routes";
import Reveal from "@/app/components/Reveal";
import styles from "@/app/styles/pages/marketing.module.css";

type CSSVars = React.CSSProperties & {
  ['--tile-img']?: string;
};

export const metadata: Metadata = {
  title: "Marketing: SEO & AEO for Florida Businesses",
  description:
    "Grow traffic with technical SEO and Answer-Engine Optimization that surfaces your brand in AI answers.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://gatorengineered.com/marketing" },
};

export default function MarketingPage() {
 const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "SEO & AEO",
    serviceType: "Marketing / SEO",
    provider: { "@type": "LocalBusiness", name: "Gator Engineered Technologies" },
    areaServed: [{ "@type": "State", name: "Florida" }],
    offers: { "@type": "Offer", priceCurrency: "USD", price: "999" },
  } as const;

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Marketing", item: "https://gatorengineered.com/marketing" },
    ],
  } as const;


  return (
    <main className={styles.wrap}>
      <div className={styles.backHomeWrap}>
          <Link href="/" className={styles.backHome}>
            ← Back home
          </Link>
        </div>
      {/* HERO */}
      <section className={styles.hero}>
        <h1 className={styles.h1}>
          Marketing That <span className={styles.fxBlue}>Compounds</span>:
          Email, Newsletters, SEO, and{" "}
          <span className={styles.fxTeal}>AEO</span>.
        </h1>
        <p className={styles.lede}>
          Own your audience. We design emails people open, newsletters they
          forward, and content that ranks and answers—so customers find you in
          Google <em>and</em> AI answer boxes.
        </p>
        <div className={styles.ctas}>
          <Link href="/contact" className={styles.primary}>
            Start a project
          </Link>
          <Link className={styles.secondary} href={ROUTES.web}>Brand Revival</Link>
        </div>
      </section>

      <Reveal selector={`.${styles.revItem}`} y={20} duration={0.85} stagger={0.07} once>
  <section className={styles.grid4}>
    <article className={`${styles.card} ${styles.revItem}`}>
      <h3>Email that pays for itself</h3>
      <p>
        On-brand designs with clear CTAs, plus quiet automations that work while you sleep:
        welcomes, abandon-cart, win-back, and re-engage flows that bring people back.
      </p>
    </article>

    <article className={`${styles.card} ${styles.revItem}`}>
      <h3>Newsletters people actually read</h3>
      <p>
        A weekly mini-magazine that your customers look forward to. Zero algorithm, high attention,
        steady growth — the most “owned” channel you can build.
      </p>
    </article>

    <article className={`${styles.card} ${styles.revItem}`}>
      <h3>SEO that compounds</h3>
      <p>
        Fast pages, clean HTML, and intent-first content. We rank for the searches that lead to
        revenue — and keep those rankings with smart refreshes.
      </p>
    </article>

    <article className={`${styles.card} ${styles.revItem}`}>
      <h3>AEO: become the quoted source</h3>
      <p>
        Answer Engine Optimization structures your pages so AI assistants can cite you cleanly.
        Clear definitions, steps, FAQs, and evidence.
      </p>
    </article>
  </section>
</Reveal>


      {/* AEO EXPLAINER */}
      <Reveal selector={`.${styles.revItem}`} y={22} duration={0.9} stagger={0.08} once>
        <section className={styles.aeo}>
          <h2 className={`${styles.aeoTitle} ${styles.revItem}`}>
            What is <span className={styles.fxTeal}>AEO</span>?
          </h2>
          <p className={`${styles.aeoLead} ${styles.revItem}`}>
            <strong>Answer Engine Optimization</strong> prepares your content to
            be the source an AI cites. It’s SEO’s next phase:
            clarity&nbsp;+&nbsp;structure&nbsp;+&nbsp;evidence.
          </p>

          <div className={styles.aeoGrid}>
            <div className={`${styles.aeoBlock} ${styles.revItem}`}>
              <div className={styles.kicker}>01</div>
              <h3>Questions → Answers</h3>
              <p>We map real questions and write direct, scannable answers.</p>
            </div>

            <div className={`${styles.aeoBlock} ${styles.revItem}`}>
              <div className={styles.kicker}>02</div>
              <h3>Structure</h3>
              <p>
                Use headings, definitions, steps, FAQs, and concise summaries
                that models can quote.
              </p>
            </div>

            <div className={`${styles.aeoBlock} ${styles.revItem}`}>
              <div className={styles.kicker}>03</div>
              <h3>Evidence</h3>
              <p>
                Add sources, data points, and examples—so your answer is
                trustworthy enough to surface.
              </p>
            </div>

            <div className={`${styles.aeoBlock} ${styles.revItem}`}>
              <div className={styles.kicker}>04</div>
              <h3>Technical</h3>
              <p>
                Fast pages, clean HTML, schema where it helps, and internal
                links that connect related answers.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal selector={`.${styles.revItem}`} y={18} duration={0.7} stagger={0.06} once>
  <div className={`${styles.seoBlock} ${styles.revItem}`}>
  <h3 className={`${styles.subTitle} ${styles.revItem}`}>
    SEO That Brings The <span className={styles.fxBlue}>Right</span> Visitors
  </h3>

  <p className={`${styles.subBody} ${styles.revItem}`}>
    <strong>Search Engine Optimization</strong> is the work of making your pages easy to
    understand and fast to load, so search engines can confidently match them to the
    real questions your customers ask.
  </p>

  <p className={`${styles.subBody} ${styles.revItem}`}>
    <strong>How we help:</strong> we map your services into topics and questions,
    write clear answers, and structure each page with sensible headings, internal links,
    and (when useful) schema. We also handle the basics that move the needle—speed,
    accessibility, mobile layout, and clean HTML—so bots and people both have a great time.
  </p>

  <p className={`${styles.subBody} ${styles.revItem}`}>
    <strong>Local or national:</strong> whether you serve a city or the whole country,
    we build pages that match intent (informational, comparison, “near me,” or ready-to-buy).
    Then we refresh winners on a cadence so rankings <em>compound</em> instead of fading.
  </p>

  <p className={`${styles.subBody} ${styles.revItem}`}>
    <strong>Outcome:</strong> more qualified visits, calls, and checkouts—not vanity traffic.
  </p>
</div>

</Reveal>

      {/* NEWSLETTER SECTION */}
      <Reveal selector={`.${styles.revItem}`} y={22} duration={0.9} stagger={0.06} once>
        <section className={styles.newsletters}>
          <h2 className={`${styles.newsTitle} ${styles.revItem}`}>
            Newsletters People <span className={styles.fxBlue}>Look Forward To</span>.
          </h2>
          <p className={`${styles.newsLead} ${styles.revItem}`}>
            The inbox is algorithm-proof and personal. Brands and creators are
            building businesses on consistent, valuable emails—not just social
            posts that disappear tomorrow.
          </p>

          <div className={styles.playGrid}>
            <div className={`${styles.playCard} ${styles.revItem}`}>
              <h4>Welcome Series</h4>
              <p>3–5 emails that set expectations and pitch the core offer.</p>
            </div>
            <div className={`${styles.playCard} ${styles.revItem}`}>
              <h4>Weekly Issue</h4>
              <p>Useful tips + one CTA. Train opens and clicks.</p>
            </div>
            <div className={`${styles.playCard} ${styles.revItem}`}>
              <h4>Lead Magnet</h4>
              <p>Checklist/mini-guide that earns the subscribe.</p>
            </div>
            <div className={`${styles.playCard} ${styles.revItem}`}>
              <h4>Nurture → Offer</h4>
              <p>Segmentation + timing so the pitch lands warm.</p>
            </div>
            <div className={`${styles.playCard} ${styles.revItem}`}>
              <h4>Win-Back</h4>
              <p>“We miss you”—a soft re-open with value first.</p>
            </div>
            <div className={`${styles.playCard} ${styles.revItem}`}>
              <h4>Reporting</h4>
              <p>Opens, clicks, revenue per send—kept simple.</p>
            </div>
          </div>
        </section>
      </Reveal>

<Reveal selector={`.${styles.revItem}`} y={18} duration={0.7} stagger={0.06} once>
  <div className={`${styles.emailBlock} ${styles.revItem}`}>
    <h3 className={`${styles.subTitle} ${styles.revItem}`}>
      Email Marketing: <span className={styles.fxTeal}>Automations That Politely Follow Up</span>
    </h3>

    <p className={`${styles.subBody} ${styles.revItem}`}>
      Email isn’t only for e-commerce. Service businesses, local shops, creators, and B2B teams
      all win when the right message arrives at the right time. We design on-brand campaigns and
      set up a few small automations that quietly do the follow-up for you.
    </p>

    <p className={`${styles.subBody} ${styles.revItem}`}>
      <strong>What those “flows” mean in normal words:</strong><br />
      <strong>Welcome sequence</strong> — the first 2–4 emails for new subscribers:
      who you are, what to expect, and a simple first step.<br />
      <strong>Post-purchase / follow-up</strong> — “How did it go?” tips, how-to, and a review
      request; for services, this is your after-appointment check-in.<br />
      <strong>Nurture → offer</strong> — a handful of useful emails that teach or help, followed
      by a clear offer once the subscriber is warm.<br />
      <strong>Lapse prevention</strong> — a friendly nudge before someone drifts away:
      reminder, fresh value, light incentive.<br />
      <strong>Win-back</strong> — if they’ve gone quiet, a short “we’ve saved your seat”
      note with something genuinely worth returning for.
    </p>

    <p className={`${styles.subBody} ${styles.revItem}`}>
      <strong>Clean segmentation</strong> just means we group people by interest or behavior
      (what they read, clicked, or bought) so each person gets fewer, more relevant emails—and
      you protect deliverability. We keep reporting simple: opens, clicks, replies, and revenue
      per send so you can double down on what works.
    </p>
  </div>
</Reveal>


      {/* DESIGN GALLERY GRID (asymmetrical) */}
      <Reveal selector={`.${styles.revItem}`} y={20} duration={0.8} stagger={0.05} once>
  <section className={styles.gallery}>
    {/* Each tile can have: data-img (url) OR data-color (blue|teal|purple|amber) and an optional data-hint */}
    <div
  className={`${styles.tile} ${styles.tall} ${styles.revItem}`}
  role="button"
  tabIndex={0}
  data-img
  style={{ ['--tile-img']: 'url(/marketing/announcement.png)' } as CSSVars} // <- use your real filename
>
      <h5>Launch Announcement</h5>
      <span className={styles.hoverText}>Announce launches with one clear action.</span>
    </div>

    <div
      className={`${styles.tile} ${styles.revItem}`}
      role="button"
      tabIndex={0}
      data-color="blue"
      data-hint="Short sales block: headline, 3 benefits, one button. Perfect for promos or features."
    >
      <h5>Offer Block</h5>
      <span className={styles.hoverText}>Punchy offer: benefits + CTA.</span>
    </div>

    <div
      className={`${styles.tile} ${styles.revItem}`}
      role="button"
      tabIndex={0}
      data-color="teal"
      data-hint="Teach one thing in 5–7 lines. Great for trust + opens."
    >
      <h5>How-to Snippet</h5>
      <span className={styles.hoverText}>A tiny tutorial that builds trust.</span>
    </div>

   
  <div
  className={`${styles.tile} ${styles.wide} ${styles.revItem}`}
  role="button"
  tabIndex={0}
  data-img
  style={{ ['--tile-img']: 'url(/marketing/snap.png)' } as CSSVars} // <- add a JPG/PNG to /public/marketing
>
      <h5>Case Study Snapshot</h5>
      <span className={styles.hoverText}>Before/after + one strong metric.</span>
    </div>

    <div
      className={`${styles.tile} ${styles.revItem}`}
      role="button"
      tabIndex={0}
      data-color="purple"
      data-hint="Quote + headshot or logo. Keep it short, let the social proof work."
    >
      <h5>Testimonial</h5>
      <span className={styles.hoverText}>Social proof that converts.</span>
    </div>

    <div
      className={`${styles.tile} ${styles.tall} ${styles.revItem}`}
      role="button"
      tabIndex={0}
      data-img
    style={{ ['--tile-img']: 'url(/marketing/customer.png)' } as CSSVars}
      data-hint="Lead magnet: checklist or mini-guide in exchange for an email. Drives steady growth."
    >
      <h5>Mini-Guide</h5>
      <span className={styles.hoverText}>Lead magnet for list growth.</span>
    </div>
  </section>
</Reveal>


      

      {/* CTA */}
      <section className={styles.bottomCta}>
        <Reveal selector={`.${styles.ctaItem}`} y={14} duration={0.65} stagger={0.06} once>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaItem}>
              Ready to grow an audience you <em>own</em>?
            </h2>
            <p className={styles.ctaItem}>
              We’ll design the stack—email + newsletter + SEO + AEO—and launch a
              cadence that compounds.
            </p>
            <div className={`${styles.ctas} ${styles.ctaItem}`}>
              <Link href="/contact" className={styles.primary}>Book A Consultation</Link>
              <Link href="/about" className={styles.secondary}>Why Gator?</Link>
            </div>
          </div>
        </Reveal>
      </section>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbs} />
    </main>
  );
}
