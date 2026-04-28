"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { SERVICE_AREAS } from "../service-areas/data";

export default function ServiceAreasButton() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, close]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          background: "#1f2430",
          color: "#e5e7eb",
          border: "1px solid rgba(255,255,255,.08)",
          borderRadius: "12px",
          padding: "12px 18px",
          fontWeight: 700,
          fontSize: "15px",
          cursor: "pointer",
          transition: "background .15s ease",
          fontFamily: "inherit",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "#232b36")}
        onMouseLeave={e => (e.currentTarget.style.background = "#1f2430")}
        aria-label="View all service areas"
      >
        <span style={{ fontSize: "16px" }}>📍</span>
        Service Areas
      </button>

      {open && (
        /* Backdrop */
        <div
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.72)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            zIndex: 9998,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          {/* Modal panel — stop propagation so clicks inside don't close */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "linear-gradient(180deg,#161c28 0%,#111726 100%)",
              border: "1px solid rgba(255,255,255,.1)",
              borderRadius: "20px",
              width: "min(720px,100%)",
              maxHeight: "85vh",
              overflowY: "auto",
              padding: "clamp(20px,4vw,36px)",
              position: "relative",
              zIndex: 9999,
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px" }}>
              <div>
                <p style={{ margin: "0 0 4px", fontSize: "11px", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#0ea5e9" }}>
                  Where We Work
                </p>
                <h2 style={{ margin: 0, fontSize: "clamp(20px,3vw,28px)", fontWeight: 800, color: "#e5e7eb" }}>
                  Service Areas
                </h2>
              </div>
              <button
                onClick={close}
                aria-label="Close"
                style={{
                  background: "rgba(255,255,255,.06)",
                  border: "1px solid rgba(255,255,255,.1)",
                  borderRadius: "8px",
                  color: "#9aa3b2",
                  fontSize: "18px",
                  lineHeight: 1,
                  cursor: "pointer",
                  padding: "6px 10px",
                  flexShrink: 0,
                }}
              >
                ✕
              </button>
            </div>

            {/* City grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))",
                gap: "10px",
              }}
            >
              {SERVICE_AREAS.map(area => (
                <Link
                  key={area.slug}
                  href={`/service-areas/${area.slug}`}
                  onClick={close}
                  style={{
                    display: "block",
                    textDecoration: "none",
                    background: "#1f2430",
                    border: "1px solid rgba(255,255,255,.07)",
                    borderRadius: "12px",
                    padding: "14px 16px",
                    transition: "border-color .2s ease, background .2s ease",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(14,165,233,.4)";
                    (e.currentTarget as HTMLElement).style.background = "#232b36";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.07)";
                    (e.currentTarget as HTMLElement).style.background = "#1f2430";
                  }}
                >
                  <p style={{ margin: "0 0 3px", fontSize: "10px", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#0ea5e9" }}>
                    {area.county}
                  </p>
                  <p style={{ margin: "0 0 6px", fontSize: "15px", fontWeight: 700, color: "#e5e7eb" }}>
                    {area.name}
                  </p>
                  <p style={{ margin: 0, fontSize: "12px", color: "#9aa3b2", lineHeight: 1.5 }}>
                    {area.intro.slice(0, 72)}…
                  </p>
                  <p style={{ margin: "8px 0 0", fontSize: "12px", fontWeight: 700, color: "#0ea5e9" }}>
                    Learn more →
                  </p>
                </Link>
              ))}
            </div>

            {/* Footer link */}
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <Link
                href="/service-areas"
                onClick={close}
                style={{ fontSize: "13px", color: "#9aa3b2", textDecoration: "none", fontWeight: 600 }}
              >
                View all service areas →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
