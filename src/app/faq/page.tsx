// app/faq/page.tsx
"use client";

import React from "react";
import JsonLd from "../components/JsonLd";
import { ReactNode, useMemo, useState } from "react";
import faq from '@/app/styles/pages/faq.module.css'

type QA = { question: string; answer: ReactNode };
type FAQSection = { title: string; items: QA[] };


const SECTIONS: FAQSection[] = [
  {
    title: "Project Scope & Timeline",
    items: [
      {
        question: "When will my website be completed?",
        answer: (
          <p>
            Timelines depend heavily on scope. A smaller site (1–3 pages with
            light animations) may take <strong>7–10 business days</strong>,
            while complex builds with dashboards, full back-end systems, or
            integrations can take <strong>several weeks or even months</strong>.
            We’ll always provide a project-specific timeline after reviewing your
            requirements.
          </p>
        ),
      },
      {
        question: "How are payments structured?",
        answer: (
          <>
            <p>
              <strong>Designer:</strong> Paid 50% upfront and 50% on completion.
              My consulting fee will be bundled with the designer’s invoice to
              ensure I’m compensated for planning and coordination.
            </p>
            <p>
              <strong>Programming:</strong> I prefer a milestone plan for larger
              projects:
            </p>
            <ul>
              <li>30% deposit to start coding (after design approval)</li>
              <li>40% mid-project milestone (after core functionality)</li>
              <li>30% upon completion and delivery</li>
            </ul>
            <p>This protects both you and me throughout the project.</p>
          </>
        ),
      },
      {
      question: "Do you offer flat-rate packages or hourly billing?",
      answer: <p>I offer both. Flat-rate packages work best for defined scopes, while hourly billing is available for ongoing or undefined work.</p>,
    },
    ],
  },
  {
  title: "Website Development & Features",
  items: [
    {
      question: "Can I request specific design styles or do you provide templates?",
      answer: <p>I do not use cookie-cutter templates. Every website is hand-coded and tailored to your business, brand, and goals.</p>,
    },
    {
      question: "Will my site work on mobile devices and tablets?",
      answer: <p>Yes. Every build is responsive, meaning it adapts seamlessly to phones, tablets, and desktops.</p>,
    },
    {
      question: "Can I edit or update the website myself after it’s built?",
      answer: (
        <p>
          For quality control, updates aren’t made directly by clients. Since the sites are coded in environments like 
          <strong> VS Code</strong> with frameworks, back-end logic, and deployment pipelines, it would be easy to 
          accidentally break the build. My goal is to protect both your investment and my brand’s reputation. If you need 
          edits, I’ll happily make them for you or set up a structured maintenance plan.
        </p>
      ),
    },
    {
        question: "Do you provide design or wireframing?",
        answer: (
          <p>
            I work with a professional designer to create polished layouts,
            branding, and wireframes. Designer services are billed separately and
            included in your project quote. Please note: a{" "}
            <strong>consulting/research fee</strong> is added to cover my time
            managing communications and project setup.
          </p>
        ),
      },
    {
      question: "Do you provide e-commerce functionality (shopping carts, subscriptions, etc.)?",
      answer: <p>Yes. I can integrate secure shopping carts, subscriptions, and payment gateways into your website.</p>,
    },
    {
        question: "Can I add scheduling or booking features?",
        answer: (
          <p>
            Yes. We can integrate calendars, booking systems, and automated
            reminders so clients can schedule directly from your website. This
            is especially useful for gyms, salons, contractors, and service
            businesses.
          </p>
        ),
      },
  ],
},

  {
  title: "AEO (Answer Engine Optimization)",
  items: [
    {
      question: "Do you include AEO with every website?",
      answer: (
        <>
          <p>
            AEO is <strong>not automatically included</strong> — it’s an add-on service.
            Unlike basic SEO, AEO requires extra structured content like
            <strong> FAQs, blogs, and long-form answers</strong> to position your business
            in AI-driven searches (ChatGPT, Google’s AI Overviews, voice assistants).
          </p>
          <p>
            Since it takes more planning and content creation, AEO is billed as a
            <strong>separate fee</strong>.
          </p>
        </>
      ),
    },
  ],
},

{
  title: "SEO (Search Engine Optimization)",
  items: [
    {
      question: "Is basic SEO included, or do I need an add-on package?",
      answer: (
        <p>
          Basic SEO is included in every project. That means optimized metadata,
          structured markup, fast load speeds, mobile-first design, and clean code.
        </p>
      ),
    },
    {
      question: "Will my site be optimized for Google indexing?",
      answer: <p>Yes. Your site will be structured so Google can crawl and index it, with attention to sitemaps and clean code.</p>,
    },
    {
      question: "Do you provide ongoing SEO or digital marketing services?",
      answer: <p>I can provide ongoing SEO improvements for a monthly fee. I do not offer digital marketing services such as paid ads or social media campaigns.</p>,
    },
    {
        question: "Do you provide social media posting or management?",
        answer: (
          <>
            <p>
              Not exactly. I focus on <strong>programming, automation, SEO,</strong>{" "}
              and <strong>AEO for websites</strong>.
            </p>
            <ul>
              <li>
                If you’d like, we can <strong>automate social media posting</strong>{" "}
                (scheduled posts).
              </li>
              <li>
                I do <em>not</em> provide social media management services like
                monitoring followers, engaging with comments, or traffic
                analysis.
              </li>
              <li>
                We also <em>do not</em> create bots to replace human social media
                managers.
              </li>
            </ul>
          </>
        ),
      },
    ],
  },
  {
    title: "Crypto Payments",
    items: [
      {
        question: "Why should I add crypto payments?",
        answer: (
          <>
            <p>
              Accepting crypto is not just futuristic — it’s becoming mainstream.
              Governments, major banks, and global companies have already begun
              accepting, transferring, and regulating crypto, with
              crypto-friendly bills passing through Congress. Adding this option
              helps your business:
            </p>
            <ul>
              <li>Attract new customers who prefer crypto</li>
              <li>Build trust by aligning with global financial trends</li>
              <li>Diversify payment streams</li>
              <li>
                Decide which cryptocurrencies to accept (Bitcoin, Ethereum,
                stablecoins, etc.)
              </li>
            </ul>
            <p>
              For small, medium, and large businesses alike, it’s another way to
              increase revenue.
            </p>
          </>
        ),
      },
      {
        question:
          "How can I convert crypto payments into USD (or my local currency)?",
        answer: (
          <p>
            Payment gateways like <strong>Coinbase Commerce</strong>,{" "}
            <strong>NOWPayments</strong>, and <strong>BitPay</strong> allow you
            to accept crypto and auto-convert it to cash in your bank account.
            You can choose whether to hold crypto or instantly convert.
          </p>
        ),
      },
       {
      question: "Which cryptocurrencies can my customers use to pay me?",
      answer: <p>I recommend sticking to trusted, popular currencies like Bitcoin, Ethereum, and stablecoins, though most gateways support a wide range.</p>,
    },
    {
      question: "Do I need to know about blockchain to accept crypto payments?",
      answer: <p>No. I handle the setup so you can accept payments without needing technical blockchain knowledge.</p>,
    },
    {
      question: "Can I still accept regular credit card payments alongside crypto?",
      answer: <p>Yes. You can offer both crypto and traditional credit card payments so customers have multiple options.</p>,
    },
    ],
  },
  {
    title: "AI Automation",
    items: [
      {
        question: "What kind of AI automation can help my business?",
        answer: (
          <>
            <p>Examples include:</p>
            <ul>
              <li>AI chatbots for customer support</li>
              <li>Automated intake forms</li>
              <li>AI-powered analytics dashboards</li>
              <li>Newsletter &amp; content automation</li>
              <li>Smart record-keeping for clients/projects</li>
            </ul>
          </>
        ),
      },
      {
        question: "Which AI services will be used?",
        answer: (
          <p>
            We typically integrate trusted providers like <strong>OpenAI</strong>
            , <strong>Anthropic</strong>, and{" "}
            <strong>custom-trained models</strong>. Your setup depends on your
            business needs.
          </p>
        ),
      },
      {
      question: "Can you integrate an AI chatbot into my site?",
      answer: <p>Yes. I can embed a custom chatbot that handles FAQs, support, and lead capture directly on your site.</p>,
    },
    {
      question: "Can the AI be trained on my business’s data (like FAQs or documents)?",
      answer: <p>Yes. Your chatbot can be trained on your own FAQs, policies, and documents to provide more accurate responses.</p>,
    },
    {
      question: "How does automation (email replies, bookings, etc.) work on my site?",
      answer: (
        <p>
          Automations run through connected services (like email providers, calendars, or CRMs). For example, a customer 
          can book through your site, trigger a confirmation email, and have the appointment added automatically to your 
          calendar.
        </p>
      ),
    },
    ],
  },
  {
  title: "Support & Maintenance",
  items: [
    {
      question: "What happens if I need changes after the site is completed?",
      answer: <p>Simply contact me. I’ll review your needs and propose a fair plan for revisions or updates.</p>,
    },
    {
      question: "Do you offer website maintenance plans?",
      answer: (
        <p>
          Yes. Maintenance can include security updates, bug fixes, content updates, backup monitoring, and performance 
          tuning. Plans are flexible depending on how often you want proactive updates.
        </p>
      ),
    },
    {
      question: "What if my site goes down — do you provide emergency support?",
      answer: (
        <p>
          Websites can go down due to expired domains, missed hosting payments, server outages, or rare bugs introduced 
          by third-party providers. If it happens, I can provide <strong>emergency support</strong> to diagnose and fix the 
          issue. Emergency support is billed separately.
        </p>
      ),
    },
  ],
},
];

function extractText(node: React.ReactNode): string {
  if (node == null) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");

  if (React.isValidElement(node)) {
    const { children } = node.props as { children?: React.ReactNode };
    return extractText(children ?? "");
  }

  return "";
}


export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState<Record<string, number | null>>({}); // per-section open index

  const filtered = useMemo(() => {
  const q = search.trim().toLowerCase();
  if (!q) return SECTIONS;

  return SECTIONS.map((sec) => ({
    ...sec,
    items: sec.items.filter((it) => {
      const inQ = it.question.toLowerCase().includes(q);
      const ansText = extractText(it.answer).toLowerCase();
      return inQ || ansText.includes(q);
    }),
  })).filter((sec) => sec.items.length > 0);
}, [search]);


 // Build FAQPage JSON-LD from SECTIONS (declare after SECTIONS + extractText)
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: SECTIONS.flatMap((sec) =>
    sec.items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: extractText(it.answer),
      },
    }))
  ),
};


  
  return (
    <div className={faq.fullBleed}>
      
  <main className={faq.faqPage}>
    
    <header className={faq.faqHeader}>
      <h1 className={faq.faqTitle}>Frequently Asked Questions</h1>
      <input
        className={faq.faqSearch}
        type="search"
        placeholder="Search FAQs…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search FAQs"
      />
    </header>

    {filtered.map((section) => (
      <section key={section.title} className={faq.faqSection}>
        <h2 className={faq.faqSectionTitle}>{section.title}</h2>

        <div className={faq.faqList}>
          {section.items.map((item, idx) => {
            const id = `${section.title}-${idx}`;
            const isOpen = open[section.title] === idx;
            return (
              <article className={faq.faqItem} key={id}>
                <button
                  className={faq.faqQuestion}
                  aria-expanded={isOpen}
                  aria-controls={`${id}-panel`}
                  onClick={() =>
                    setOpen((prev) => ({
                      ...prev,
                      [section.title]: isOpen ? null : idx,
                    }))
                  }
                >
                  {item.question}
                  <span className={faq.faqChevron} aria-hidden="true">
                    {isOpen ? "–" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div id={`${id}-panel`} className={faq.faqAnswer}>
                    {item.answer}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>
    ))}

    {filtered.length === 0 && (
      <p className={faq.faqEmpty}>No results. Try different keywords.</p>
    )}
     <JsonLd data={faqSchema} />
  </main>
  </div>
);
}