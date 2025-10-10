// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";



declare global {
  interface Window {
    __contactFormOpenedAt?: number;
  }
}


/* ---------------- Types ---------------- */
type ModalContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  hasWebsite?: boolean | string;
  website?: string;
  phone?: string;
  company?: string;       // honeypot from component
  honey?: string;         // honeypot alias
  _timeSpentMs?: number;  // timing
};

type ModalKey =
  | null
  | "contact"
  | "faq"
  | "blog"
  | "about"
  | "web"
  | "crypto"
  | "ai"
  | "marketing";

/* ---------------- Lazy components ---------------- */

const GlassModal = dynamic(() => import("./components/GlassModal"), {
  loading: () => null,
});
const Contact = dynamic(() => import("./components/Contact"), {
  loading: () => null,
});

/* ---------------- Typewriter ---------------- */
function Typewriter({
  text,
  speed = 35,
  startDelay = 300,
}: { text: string; speed?: number; startDelay?: number }) {
  const [out, setOut] = useState("");
  useEffect(() => {
    const t = setTimeout(() => {
      let i = 0;
      const id = setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) clearInterval(id);
      }, speed);
    }, startDelay);
    return () => clearTimeout(t);
  }, [text, speed, startDelay]);

  return (
    <span className="typewriter">
      {out}
      <span className="caret">|</span>
    </span>
  );
}

/* ---------------- Page ---------------- */
export default function Home() {
  // ✅ your modal key + state
  const [modal, setModal] = useState<ModalKey>(null);
  const router = useRouter();

  // ✅ meta map
  const meta = {
    contact: { title: "Contact", href: undefined },
    faq: { title: "FAQ", href: "/faq" },
    blog: { title: "Blog", href: "/blog" },
    about: { title: "About", href: "/about" },
    web: { title: "Brand Revival", href: "/web" },
    crypto: { title: "Crypto Systems", href: "/crypto" },
    ai: { title: "Automate Tasks", href: "/ai" },
    marketing: { title: "Marketing 2.0", href: "/marketing" },
  } as const;

  const currentMeta =
    modal ? meta[modal as Exclude<ModalKey, null>] : undefined;

  // ✅ prefetch
  useEffect(() => {
    const id = setTimeout(() => {
      router.prefetch("/faq");
      router.prefetch("/blog");
      router.prefetch("/about");
    }, 500); // avoid competing with first paint
    return () => clearTimeout(id);
  }, [router]);

  // ✅ open/close handlers
  const open = (k: ModalKey) => () => {
    if (k === "contact") window.__contactFormOpenedAt = Date.now(); // spam guard timing
    setModal(k);
  };
  const close = () => setModal(null);



  function useInterval(cb: () => void, delay: number | null) {
    useEffect(() => {
      if (delay == null) return;
      const id = window.setInterval(cb, delay);
      return () => window.clearInterval(id);
    }, [cb, delay]);
  }

  const reelOrder = ["ai", "marketing", "web", "crypto"] as const;

  function ContentReel() {
    const slides = reelOrder.map((k) => ({
      key: k,
      label: meta[k].title,
      href: meta[k].href,
      img: `/images/reel/${k}.jpg`,
    }));

    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    const next = () => setIndex((i) => (i + 1) % slides.length);
    const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

    // auto-advance every 4s unless paused
    useInterval(next, paused ? null : 4000);

    const active = slides[index];   // <-- paste the return block RIGHT after this line

    return (
      <section
        className="contentReels reel"
        role="region"
        aria-label="Services reel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className="reel-viewport relative">
          <Image
            src={active.img}
            alt=""
            fill
            sizes="(max-width: 820px) 100vw, 40vw"
            style={{ objectFit: "cover" }}
            priority
          />

          {/* centered label link */}
          <Link href={active.href} className="reel-link" aria-label={`Go to ${active.label}`}>
            <span className="reel-label">{active.label}</span>
          </Link>

          {/* arrows — now INSIDE the viewport */}
          <button className="reel-arrow left" onClick={prev} aria-label="Previous">‹</button>
          <button className="reel-arrow right" onClick={next} aria-label="Next">›</button>

          {/* dots — also INSIDE the viewport */}
          <div className="reel-dots overlay-bottom" role="tablist" aria-label="Slides">
            {slides.map((s, i) => (
              <button
                key={s.key}
                role="tab"
                aria-selected={i === index}
                aria-label={`Show ${s.label}`}
                className={`dot ${i === index ? "active" : ""}`}
                onClick={() => setIndex(i)}
                tabIndex={i === index ? 0 : -1}
              />
            ))}
          </div>
        </div>
      </section>
    );


  }


  return (
    <main className="establish-site" role="main" aria-labelledby="site-title">
      <section className="inner-site-grid">

        {/* ===== Top fascia (hero) ===== */}
        <section className="top-fascia" role="banner" aria-describedby="site-tagline">
          <div className="area area-1" aria-hidden="true" />

          {/* Title (your “Gator Engineered”) */}
          <div className="area area-2 hero-brand" aria-labelledby="site-title">
            <h1 id="site-title">Gator Engineered Technologies</h1>
          </div>

          {/* Subtitle */}
          <div className="area area-3 hero-subtitle">
            <p id="site-tagline">Full-stack development for Web, Blockchain, and AI.</p>
          </div>

          <div className="area area-4" aria-hidden="true" />
          <button
            className="seamCircle"
            aria-label="Open About Page"
            onClick={open('about')}
          ></button>
        </section>

        {/* ===== Bottom fascia (content) ===== */}
        <section className="bottom-fascia" role="region" aria-label="Homepage content">

          <ContentReel />


          {/* FAQ + Contact + About circle on the seam */}
          <section className="faq-column" role="region" aria-label="FAQ and contact">
            <div className="btnBar">
              <button
                className="btn btn--faq"
                aria-label="Open frequently asked questions"
                onClick={() => router.push('/faq')}
                onPointerEnter={() => router.prefetch('/faq')}
                onFocus={() => router.prefetch('/faq')}
              >
                FAQ
              </button>

              <button
                className="btn btn--light is-disabled"
                aria-label="Blog — Coming Soon"
                onClick={() => router.push('/blog')}
                onPointerEnter={() => router.prefetch('/blog')}
                onFocus={() => router.prefetch('/blog')}
                disabled
              >
                Blog - Coming Soon
              </button>

              <button
                className="btn btn--primary"
                aria-label="Open contact form"
                onClick={open('contact')}
              >
                Contact
              </button>
            </div>
          </section>


          <div className="about-bottom"></div>

          {/* Big Text / description block (right of the seam) */}
          {/* Big Text / description block (right of the seam) */}
          <section className="description" role="region" aria-labelledby="desc-title">

            {/* LEFT — image */}
            <div className="desc-left" aria-hidden="true">
              <Image
  src="/animations/new-template-creation.gif"
  alt=""
  width={800}          // ← use your real GIF width if different
  height={600}         // ← and real height
  className="desc-img"
  priority
  unoptimized
/>


            </div>

            {/* RIGHT — text (moved down a bit) */}
            <div className="desc-right copy">
              <h3>
                <Typewriter text="Not Just Websites - Real Development for Real Business" />
              </h3>
              <p>
                We create websites and applications that go beyond the ordinary—built with the
                latest tools, designed for performance, and ready for the future of the web.
              </p>
              <p>
                From blockchain to modern business solutions, our work adapts to your vision
                and scales with your goals.
              </p>
            </div>

            {/* BOTTOM — social rail */}
            <aside className="desc-footer" aria-label="Social media links">
              <span className="label">Connect with us</span>
              <ul className="links">
                <li>
                  <a
                    href="https://www.linkedin.com/company/gator-engineered-technologies/people/?viewAsMember=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Linkedin"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                    </svg>
                    <span>Linkedin</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/people/Gator-Engineered-Technologies/61575072135764/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={18}
                      height={18}
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                      focusable="false"
                      className="icon"
                    >
                      <path
                        fill="currentColor"
                        d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"
                      />
                    </svg>
                    <span>Facebook</span>
                  </a>


                </li>

                <li>
                  <a
                    href="https://www.facebook.com/people/Gator-Engineered-Technologies/61575072135764/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                    </svg>
                    <span>Instagram</span>
                  </a>


                </li>
                <li>
                  <a
                    href="https://x.com/GatorEngineered"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16">
                      <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                    </svg>
                    <span>X</span>
                  </a>


                </li>
                <li>
                  <a
                    href="https://nextdoor.com/page/gator-engineered-technologies-st-petersburg-fl?utm_campaign=1759470993664&share_action_id=65430c0f-937b-45d1-abef-e02439ddae59"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Nextdoor"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
                      <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
                    </svg>
                    <span>Nextdoor</span>
                  </a>
                </li>
              </ul>

            </aside>
            <p className="copyright-footer">Copyright © 2025 Gator Engineered Technologies</p>

          </section>





        </section>
      </section>


      {/* ===== Shared Glass Modal (kept exactly as you asked) ===== */}



      <GlassModal
        open={modal !== null}
        onClose={close}
        title={currentMeta?.title ?? ""}           // was meta[modal].title
        showMoreHref={currentMeta?.href}           // was meta[modal].href
      >

        {modal === "about" && (
          <div>
            <h3>About Gator Engineered Technologies</h3>
            <p>
              We build living interfaces that blend automation, modern payments, and AI—so your
              site can think, transact, and remember.
            </p>
          </div>
        )}

        {modal === "faq" && (
          <div>
            <h3>Popular Questions</h3>
            <p>
              <strong>How can a small gym accept crypto?</strong>
              <br />
              Connect checkout to Coinbase Commerce…
            </p>
            <p>
              <strong>Can AI chatbots work for doctors?</strong>
              <br />
              Yes — with intake + HIPAA-aware routing…
            </p>
          </div>
        )}

        {modal === "web" && <p>Web2 / Web3 services overview…</p>}
        {modal === "crypto" && <p>Crypto Payments and Loyalty Programs overview…</p>}
        {modal === "ai" && <p>All Things AI overview…</p>}
        {modal === "marketing" && (
          <p>Online Marketing (Emails, Newsletters, SEO, AEO, etc.) overview…</p>
        )}

        {modal === "contact" && (
          <Contact
            onSubmit={async (data: ModalContactPayload) => {
              // --- light spam guards ---
              if (data?.company || data?.honey) return; // honeypot
              const openedAt = window.__contactFormOpenedAt ?? Date.now();
              const timeSpentMs = Date.now() - openedAt;
              if (timeSpentMs < 3000) return; // too fast, likely bot

              // --- validation ---
              const email = (data?.email ?? "").trim();
              const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
              if (!emailOk) return;

              const hasWebsite =
                typeof data?.hasWebsite === "boolean"
                  ? data.hasWebsite
                  : String(data?.hasWebsite ?? "").toLowerCase() === "yes";

              const payload = {
                name: data?.name ?? "",
                email,
                message: data?.message ?? "",
                hasWebsite,
                website: data?.website ?? "",
                phone: data?.phone ?? "",
                honey: (data?.honey ?? data?.company ?? "") as string,
                meta: {
                  source: "home-modal",
                  ts: new Date().toISOString(),
                  timeSpentMs,
                  userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
                  page: typeof location !== "undefined" ? location.pathname : "/",
                },
              };

              try {
                const res = await fetch("/api/contact", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(payload),
                });

                if (!res.ok) {
                  const txt = await res.text().catch(() => "");
                  console.error("Modal contact error:", res.status, txt);
                }

                setModal(null); // close on success
              } catch (e) {
                console.error("Modal contact network error:", e);
              }
            }}
          />
        )}
      </GlassModal>
    </main>
  );
}
