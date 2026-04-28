"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { SERVICE_AREAS } from "../service-areas/data";

export default function ServiceAreasButton() {
  const [open, setOpen] = useState(false);
  // Wait for hydration before portalling
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const close = useCallback(() => setOpen(false), []);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, close]);

  // Freeze Lenis / body scroll while open
  useEffect(() => {
    if (!open) return;
    // Lenis listens to wheel on document — stop it from propagating
    const stopWheel = (e: Event) => e.stopPropagation();
    document.documentElement.style.overflow = "hidden";
    document.addEventListener("wheel", stopWheel, { passive: false });
    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("wheel", stopWheel);
    };
  }, [open]);

  const modal = (
    <div
      onClick={close}
      style={{
        position: "fixed",
        inset: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,.8)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      {/* Modal panel */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "linear-gradient(180deg,#161c28 0%,#111726 100%)",
          border: "1px solid rgba(255,255,255,.12)",
          borderRadius: "20px",
          width: "min(760px,100%)",
          maxHeight: "88vh",
          overflowY: "auto",
          padding: "clamp(20px,4vw,36px)",
          position: "relative",
          boxShadow: "0 24px 80px rgba(0,0,0,.6)",
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
            aria-label="Close service areas"
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
              fontFamily: "inherit",
            }}
          >
            ✕
          </button>
        </div>

        {/* City grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(195px,1fr))",
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
  );

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

      {/* Portal renders outside Lenis wrapper so position:fixed works correctly */}
      {mounted && open && createPortal(modal, document.body)}
    </>
  );
}
