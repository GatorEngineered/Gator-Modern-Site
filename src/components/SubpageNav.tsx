"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  KeyboardEvent,
} from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
  { label: "Home",          href: "/"               },
  { label: "Services",      href: "/#services"      },
  { label: "How It Works",  href: "/#how-it-works"  },
  { label: "Our Work",      href: "/#proof"         },
  { label: "Blog",          href: "/blog"           },
  { label: "Service Areas", href: "/service-areas"  },
  { label: "FAQ",           href: "/faq"            },
  { label: "Contact",       href: "/#contact"       },
];

export default function SubpageNav() {
  const [open, setOpen] = useState(false);
  const triggerRef  = useRef<HTMLButtonElement>(null);
  const drawerRef   = useRef<HTMLDivElement>(null);
  const closeRef    = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    // Return focus to trigger on close — WCAG 2.4.3
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  // Open: focus close button — WCAG 2.4.3
  useEffect(() => {
    if (open) requestAnimationFrame(() => closeRef.current?.focus());
  }, [open]);

  // Escape to close — WCAG 2.1.1
  useEffect(() => {
    if (!open) return;
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, close]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Focus trap — WCAG 2.1.2
  const handleDrawerKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    const drawer = drawerRef.current;
    if (!drawer) return;
    const focusable = Array.from(
      drawer.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter(el => !el.hasAttribute("aria-hidden"));

    if (focusable.length === 0) return;
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
    }
  }, []);

  return (
    <>
      {/* ── Skip to main content — WCAG 2.4.1 ─────────────────── */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[9999] focus:px-4 focus:py-2 focus:text-sm focus:font-bold"
        style={{ background: "var(--teal, #00d4ff)", color: "#020408", outline: "2px solid #fff" }}
      >
        Skip to main content
      </a>

      {/* ── Hamburger trigger ───────────────────────────────────── */}
      <button
        ref={triggerRef}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        aria-controls="subpage-nav-drawer"
        aria-haspopup="dialog"
        onClick={() => setOpen(v => !v)}
        className="fixed top-4 right-4 z-[9998] flex flex-col justify-center items-center gap-[5px] w-10 h-10 rounded cursor-pointer border transition-colors duration-200"
        style={{
          background: "rgba(6,13,20,0.88)",
          borderColor: "var(--border, #0d2137)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--teal, #00d4ff)")}
        onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border, #0d2137)")}
      >
        {/* Animated bars → X */}
        {[0, 1, 2].map(i => (
          <span
            key={i}
            aria-hidden="true"
            className="block transition-all duration-300 origin-center"
            style={{
              width: 20,
              height: 2,
              background: "var(--teal, #00d4ff)",
              transform:
                i === 0 ? (open ? "translateY(7px) rotate(45deg)"  : "none") :
                i === 1 ? (open ? "scaleX(0) opacity-0"            : "none") :
                           (open ? "translateY(-7px) rotate(-45deg)": "none"),
              opacity: i === 1 && open ? 0 : 1,
            }}
          />
        ))}
      </button>

      {/* ── Backdrop ────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
            onClick={close}
            className="fixed inset-0 z-[9996]"
            style={{ background: "rgba(2,4,8,0.7)", backdropFilter: "blur(2px)" }}
          />
        )}
      </AnimatePresence>

      {/* ── Slide-in drawer ─────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            id="subpage-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            ref={drawerRef}
            onKeyDown={handleDrawerKeyDown}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.28, ease: [0.32, 0, 0.67, 0] }}
            className="fixed top-0 right-0 bottom-0 z-[9997] flex flex-col"
            style={{
              width: "min(340px, 88vw)",
              background: "var(--dark, #060d14)",
              borderLeft: "1px solid var(--border, #0d2137)",
              boxShadow: "-8px 0 40px rgba(0,0,0,0.6)",
            }}
          >
            {/* Drawer header */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: "1px solid var(--border, #0d2137)" }}
            >
              <Link
                href="/"
                onClick={close}
                className="font-bold tracking-wider text-sm"
                style={{ fontFamily: "var(--font-mono, monospace)" }}
                aria-label="Gator Engineered — Go to homepage"
              >
                <span style={{ color: "var(--text, #c8dce8)" }}>GATOR</span>
                <span style={{ color: "var(--teal, #00d4ff)" }}>_</span>
                <span style={{ color: "var(--text, #c8dce8)" }}>ENGINEERED</span>
              </Link>

              <button
                ref={closeRef}
                aria-label="Close navigation menu"
                onClick={close}
                className="flex items-center justify-center w-8 h-8 rounded transition-colors duration-150"
                style={{
                  background: "transparent",
                  border: "1px solid var(--border, #0d2137)",
                  color: "var(--muted, #4a6275)",
                  fontSize: 16,
                  cursor: "pointer",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "var(--teal, #00d4ff)";
                  e.currentTarget.style.color = "var(--teal, #00d4ff)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "var(--border, #0d2137)";
                  e.currentTarget.style.color = "var(--muted, #4a6275)";
                }}
              >
                ✕
              </button>
            </div>

            {/* Nav links */}
            <nav aria-label="Main navigation" className="flex flex-col flex-1 px-6 py-8 gap-1 overflow-y-auto">
              {NAV_LINKS.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="flex items-center gap-3 px-4 py-3 rounded text-base font-semibold transition-colors duration-150 group"
                  style={{
                    fontFamily: "var(--font-body, sans-serif)",
                    color: "var(--muted, #4a6275)",
                    textDecoration: "none",
                    animationDelay: `${i * 30}ms`,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = "var(--text, #c8dce8)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = "var(--muted, #4a6275)";
                    e.currentTarget.style.background = "transparent";
                  }}
                  onFocus={e => {
                    // Visible focus indicator — WCAG 2.4.7
                    e.currentTarget.style.outline = "2px solid var(--teal, #00d4ff)";
                    e.currentTarget.style.outlineOffset = "2px";
                  }}
                  onBlur={e => {
                    e.currentTarget.style.outline = "none";
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="text-xs transition-colors duration-150"
                    style={{ color: "var(--teal, #00d4ff)", opacity: 0.5 }}
                  >
                    ›
                  </span>
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Drawer footer — CTA */}
            <div className="px-6 pb-8 pt-4" style={{ borderTop: "1px solid var(--border, #0d2137)" }}>
              <Link
                href="/#contact"
                onClick={close}
                className="flex items-center justify-center w-full py-3 text-sm font-bold transition-all duration-150"
                style={{
                  fontFamily: "var(--font-body, sans-serif)",
                  background: "var(--teal, #00d4ff)",
                  color: "#020408",
                  letterSpacing: "0.06em",
                  clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                  textDecoration: "none",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--green, #00ff88)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--teal, #00d4ff)")}
                onFocus={e => {
                  e.currentTarget.style.outline = "2px solid #fff";
                  e.currentTarget.style.outlineOffset = "2px";
                }}
                onBlur={e => { e.currentTarget.style.outline = "none"; }}
              >
                Start an Engagement
              </Link>
              <p
                className="mt-3 text-center text-xs"
                style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--muted, #4a6275)" }}
              >
                reva@gatorengineered.com
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
