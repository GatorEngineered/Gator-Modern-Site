"use client";

import Link from "next/link";

const NAV = [
  { label: "Services",     href: "#services"    },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Our Work",     href: "#proof"        },
  { label: "Contact",      href: "#contact"      },
  { label: "Blog",         href: "/blog"         },
  { label: "Service Areas",href: "/service-areas"},
];

export default function Footer() {
  return (
    <footer
      className="py-12 border-t"
      style={{ background: "var(--black)", borderColor: "var(--border)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

          {/* Logo */}
          <div>
            <p
              className="font-bold tracking-wider mb-1"
              style={{ fontFamily: "var(--font-mono)", fontSize: "1rem" }}
            >
              <span style={{ color: "var(--text)" }}>GATOR</span>
              <span style={{ color: "var(--teal)" }}>_</span>
              <span style={{ color: "var(--text)" }}>ENGINEERED</span>
            </p>
            <p
              className="text-xs"
              style={{ fontFamily: "var(--font-mono)", color: "var(--muted)" }}
            >
              St. Petersburg, FL · Remote Engagements Available
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV.map(link => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs uppercase tracking-wider transition-colors duration-150"
                style={{ fontFamily: "var(--font-mono)", color: "var(--muted)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--teal)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom row */}
        <div
          className="mt-8 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p
            className="text-xs"
            style={{ fontFamily: "var(--font-mono)", color: "var(--muted)" }}
          >
            © {new Date().getFullYear()} Gator Engineered Technologies. All rights reserved.
          </p>
          <p
            className="text-xs"
            style={{ fontFamily: "var(--font-mono)", color: "var(--muted)" }}
          >
            <a
              href="mailto:reva@gatorengineered.com"
              style={{ color: "var(--muted)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--teal)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
            >
              reva@gatorengineered.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
