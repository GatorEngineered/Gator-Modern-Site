// app/ai/page.tsx
import Link from "next/link";
import Script from "next/script";
import Reveal from "@/app/components/Reveal";
import styles from "@/app/styles/pages/ai.module.css";

export default function AiPage() {
  // --- JSON-LD: Service + FAQ for rich results ---
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What can an AI chatbot do for my small business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Answer common questions, capture leads, book appointments, and route complex requests to you. It works 24/7 and speaks in your brand voice."
        }
      },
      {
        "@type": "Question",
        "name": "Will this integrate with my tools?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We can connect to popular CRMs, calendars, and email tools so new leads and bookings flow into your system automatically."
        }
      },
      {
        "@type": "Question",
        "name": "Is setup complicated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. We start with a short discovery, load your FAQs and policies, brand the assistant, and launch. Most sites go live quickly."
        }
      },
      {
        "@type": "Question",
        "name": "Can I accept crypto payments?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If you want, we can add crypto alongside cards and ACH for a smooth, optional checkout experience."
        }
      }
    ]
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "AI Services for Small Businesses",
    "provider": { "@type": "Organization", "name": "Gator Engineered Technologies" },
    "areaServed": "United States",
    "serviceType": "AI chatbot development, website automation, lead capture",
    "description":
      "On-brand AI assistants, lead capture, appointment scheduling, and automated follow-ups for small businesses.",
    "url": "https://your-domain.com/ai"
  };






  return (
    <main className={styles.wrap}>
      <div className={styles.backHomeWrap}>
    <Link href="/" className={styles.backHome}>
      ← Back home
    </Link>
    </div>
      {/* HERO */}
     <Reveal selector=".heroChild" y={28} duration={1.1} ease="power3.out" stagger={0.12} once>
      <section className={styles.hero} aria-label="AI Services">
        <h1 className={`${styles.h1} heroChild`}>
          AI for small businesses—<span className={styles.fxAccent}>that actually helps</span>.
        </h1>
        <p className={`${styles.lede} heroChild`}>
          Turn your website into a real assistant: answer questions, capture leads, book
          appointments, and send automatic follow-ups. Clean design, on-brand voice, and
          measurable results.
        </p>
        <div className={`${styles.ctas} heroChild`}>
          <Link href="/contact" className={styles.primary}>Start a Project</Link>
          <Link href="/about" className={styles.secondary}>Why Gator?</Link>
        </div>
      </section>
      </Reveal>

      {/* WHAT IT DOES (Plain-English + keywords) */}
      <Reveal selector={`.${styles.gridItem}`} y={24} duration={0.85} ease="power2.out" stagger={0.12} once>
      <section className={styles.grid3} aria-label="What AI does">
        <article className={styles.gridItem}>
          <h2>AI Chatbot & On-Site Assistant</h2>
          <p>
            A friendly, on-brand chat that handles FAQs, pricing questions, and
            <strong> appointment scheduling</strong>. It can
            <strong> qualify leads</strong> and pass complex questions to you.
          </p>
        </article>
        <article className={styles.gridItem}>
          <h2>Lead Capture & Automation</h2>
          <p>
            Forms that write summaries, <strong>automated follow-ups</strong>, and
            reminders. Send clean notes to your email or <strong>CRM</strong> so you can respond fast.
          </p>
        </article>
        <article className={styles.gridItem}>
          <h2>Knowledge Base (RAG)</h2>
          <p>
            Load your FAQs, services, policies, and documents so the assistant gives
            <strong> accurate answers</strong> in your voice.
          </p>
        </article>
      </section>
      </Reveal>

      {/* USE CASES (AEO-friendly bullets) */}
      <Reveal selector={`.${styles.use}`} once>
      <section className={styles.use} aria-label="Popular use cases">
        <h2>Popular Use Cases</h2>
        <ul className={styles.list}>
          <li>24/7 customer support on your website</li>
          <li>Quote requests and <strong>lead qualification</strong></li>
          <li><strong>Appointment booking</strong> with reminders</li>
          <li>Proposal or service-package Q&A</li>
          <li>New customer onboarding checklist</li>
        </ul>
      </section>
      </Reveal>

      {/* HOW IT WORKS */}
      <Reveal selector={`.${styles.process}`} once>
      <section className={styles.process} aria-label="How it works">
        <h2>How It Works</h2>
        <ol className={styles.steps}>
          <li><span>01</span>Discovery: goals, FAQs, tone, tools.</li>
          <li><span>02</span>Setup: content + rules, brand the assistant.</li>
          <li><span>03</span>Integrations: calendar, email, CRM, optional crypto.</li>
          <li><span>04</span>Launch: measure, tweak, expand.</li>
        </ol>
      </section>
      </Reveal>

      {/* TRUST + CTA */}
      <Reveal selector={`.${styles.bottomCta}`} once>
      <section className={styles.bottomCta} aria-label="Get a demo">
        <h2>Ready to see it on your site?</h2>
        <p>We’ll start with one assistant and one workflow. No fluff—just results.</p>
        <div className={styles.ctas}>
          <Link href="/contact" className={styles.primary}>Book A Consultation</Link>
          <Link href="/crypto" className={styles.secondary}>Crypto-Ready Checkout</Link>
        </div>
      </section>
      </Reveal>

      {/* JSON-LD for SEO rich results */}
      <Script id="faq-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faq)}
      </Script>
      <Script id="service-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(service)}
      </Script>
    </main>
  );
}
