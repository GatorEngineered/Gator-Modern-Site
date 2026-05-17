"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Services",     href: "#services"     },
  { label: "How It Works", href: "#how-it-works"  },
  { label: "Our Work",     href: "#proof"         },
  { label: "Contact",      href: "#contact"       },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function handleNavClick(href: string) {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "backdrop-blur-md border-b"
            : "border-b border-transparent",
        ].join(" ")}
        style={{
          backgroundColor: scrolled ? "rgba(6,13,20,0.85)" : "transparent",
          borderColor: scrolled ? "var(--border)" : "transparent",
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-0 select-none"
            style={{ fontFamily: "var(--font-mono)" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span
              className="text-lg font-bold tracking-wider"
              style={{ color: "var(--text)" }}
            >
              GATOR
            </span>
            <span
              className="text-lg font-bold"
              style={{ color: "var(--teal)" }}
            >
              _
            </span>
            <span
              className="text-lg font-bold tracking-wider"
              style={{ color: "var(--text)" }}
            >
              ENGINEERED
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-medium transition-colors duration-200 cursor-pointer bg-transparent border-none"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--muted)",
                    letterSpacing: "0.05em",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => handleNavClick("#contact")}
              className="relative px-5 py-2 text-sm font-semibold rounded transition-all duration-200 cursor-pointer"
              style={{
                fontFamily: "var(--font-body)",
                background: "var(--teal)",
                color: "var(--black)",
                letterSpacing: "0.04em",
                clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--green)")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--teal)")}
            >
              Start an Engagement
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer bg-transparent border-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className="block w-6 h-px transition-all duration-300"
              style={{
                background: "var(--text)",
                transform: menuOpen ? "rotate(45deg) translate(4px,4px)" : "none",
              }}
            />
            <span
              className="block w-6 h-px transition-all duration-300"
              style={{
                background: "var(--text)",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-px transition-all duration-300"
              style={{
                background: "var(--text)",
                transform: menuOpen ? "rotate(-45deg) translate(4px,-4px)" : "none",
              }}
            />
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-0 z-40 flex flex-col pt-20 px-6 pb-8"
            style={{ background: "var(--dark)" }}
          >
            <ul className="flex flex-col gap-6 mt-8">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-2xl font-medium w-full text-left bg-transparent border-none cursor-pointer"
                    style={{
                      fontFamily: "var(--font-head)",
                      color: "var(--text)",
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleNavClick("#contact")}
              className="mt-auto w-full py-4 text-base font-bold rounded"
              style={{
                fontFamily: "var(--font-body)",
                background: "var(--teal)",
                color: "var(--black)",
                clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
              }}
            >
              Start an Engagement
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
