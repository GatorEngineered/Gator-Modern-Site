"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface A11yState {
  fontSize:     "default" | "large" | "xl";
  highContrast: boolean;
  reduceMotion: boolean;
  dyslexiaFont: boolean;
  grayscale:    boolean;
  bigCursor:    boolean;
}

const DEFAULTS: A11yState = {
  fontSize:     "default",
  highContrast: false,
  reduceMotion: false,
  dyslexiaFont: false,
  grayscale:    false,
  bigCursor:    false,
};

const STORAGE_KEY = "ge-a11y";

function applySettings(s: A11yState) {
  const h = document.documentElement;
  // Font size
  h.classList.remove("a11y-text-large", "a11y-text-xl");
  if (s.fontSize === "large") h.classList.add("a11y-text-large");
  if (s.fontSize === "xl")    h.classList.add("a11y-text-xl");
  // Toggles
  h.classList.toggle("a11y-contrast",       s.highContrast);
  h.classList.toggle("a11y-reduce-motion",  s.reduceMotion);
  h.classList.toggle("a11y-dyslexia",       s.dyslexiaFont);
  h.classList.toggle("a11y-grayscale",      s.grayscale);
  h.classList.toggle("a11y-big-cursor",     s.bigCursor);
}

export default function AccessibilityWidget() {
  const [open,     setOpen]     = useState(false);
  const [settings, setSettings] = useState<A11yState>(DEFAULTS);
  const panelRef  = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = { ...DEFAULTS, ...JSON.parse(saved) } as A11yState;
        setSettings(parsed);
        applySettings(parsed);
      }
    } catch { /* ignore */ }
  }, []);

  // Persist + apply whenever settings change
  useEffect(() => {
    applySettings(settings);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); } catch { /* ignore */ }
  }, [settings]);

  // Escape closes panel
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); triggerRef.current?.focus(); } };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  // Focus first focusable element in panel on open
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        panelRef.current?.querySelector<HTMLElement>("button,input,[tabindex]")?.focus();
      });
    }
  }, [open]);

  const update = useCallback(<K extends keyof A11yState>(key: K, value: A11yState[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  const reset = useCallback(() => setSettings(DEFAULTS), []);

  const activeCount = (
    (settings.fontSize !== "default" ? 1 : 0) +
    (settings.highContrast ? 1 : 0) +
    (settings.reduceMotion ? 1 : 0) +
    (settings.dyslexiaFont ? 1 : 0) +
    (settings.grayscale    ? 1 : 0) +
    (settings.bigCursor    ? 1 : 0)
  );

  return (
    <>
      {/* ── Global CSS for each mode ─ injected once ──────────── */}
      <style>{`
        /* Text size */
        .a11y-text-large *  { font-size: 110% !important; line-height: 1.6 !important; }
        .a11y-text-xl *     { font-size: 125% !important; line-height: 1.7 !important; }

        /* High contrast */
        .a11y-contrast body {
          background: #000 !important;
          color: #fff !important;
        }
        .a11y-contrast a, .a11y-contrast button { color: #ffff00 !important; }
        .a11y-contrast img { filter: contrast(120%) !important; }

        /* Reduce motion */
        .a11y-reduce-motion *, .a11y-reduce-motion *::before, .a11y-reduce-motion *::after {
          animation-duration: 0.001ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.001ms !important;
          scroll-behavior: auto !important;
        }

        /* Dyslexia font */
        .a11y-dyslexia * {
          font-family: 'Arial', 'Verdana', sans-serif !important;
          letter-spacing: 0.05em !important;
          word-spacing: 0.15em !important;
          line-height: 1.7 !important;
        }

        /* Grayscale */
        .a11y-grayscale html, .a11y-grayscale body { filter: grayscale(100%) !important; }

        /* Big cursor */
        .a11y-big-cursor, .a11y-big-cursor * {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cpath d='M8 2 L8 26 L14 20 L18 30 L22 28 L18 18 L26 18 Z' fill='%23000' stroke='%23fff' stroke-width='2'/%3E%3C/svg%3E") 0 0, auto !important;
        }

        /* Focus highlights for all interactive elements */
        .ge-a11y-panel *:focus-visible {
          outline: 3px solid #00d4ff !important;
          outline-offset: 3px !important;
        }
      `}</style>

      {/* ── Trigger button ────────────────────────────────────── */}
      <button
        ref={triggerRef}
        aria-label={open ? "Close accessibility menu" : "Open accessibility menu"}
        aria-expanded={open}
        aria-controls="a11y-panel"
        aria-haspopup="dialog"
        onClick={() => setOpen(v => !v)}
        className="fixed bottom-5 left-5 z-[99999] flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 cursor-pointer"
        style={{
          background:      open ? "#00d4ff" : "#0a1520",
          border:          "2px solid #00d4ff",
          color:           open ? "#020408" : "#00d4ff",
          boxShadow:       "0 4px 24px rgba(0,212,255,0.3)",
        }}
        title="Accessibility options"
      >
        {/* Accessibility icon (wheelchair person) */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <circle cx="12" cy="4" r="2"/>
          <path d="M15.89 8.11C15.5 7.72 14.83 7.5 14 7.5h-4c-.83 0-1.5.67-1.5 1.5v5H10v-4h1v11h2v-5h1v5h2V12.5h.5l1.5-3-2.1-1.39z"/>
          <path d="M7.5 17c0 2.49 2.01 4.5 4.5 4.5s4.5-2.01 4.5-4.5H15c0 1.66-1.34 3-3 3s-3-1.34-3-3H7.5z"/>
        </svg>
        {/* Active count badge */}
        {activeCount > 0 && (
          <span
            aria-label={`${activeCount} accessibility feature${activeCount > 1 ? "s" : ""} active`}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center"
            style={{ background: "#00ff88", color: "#020408", fontSize: 10 }}
          >
            {activeCount}
          </span>
        )}
      </button>

      {/* ── Panel ─────────────────────────────────────────────── */}
      {open && (
        <div
          id="a11y-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Accessibility settings"
          className="ge-a11y-panel fixed bottom-20 left-5 z-[99998] w-72 flex flex-col overflow-hidden"
          style={{
            background:   "#0a1520",
            border:       "1px solid #0d2137",
            borderTop:    "3px solid #00d4ff",
            boxShadow:    "0 8px 40px rgba(0,0,0,0.6)",
          }}
          onKeyDown={e => {
            if (e.key !== "Tab") return;
            const els = Array.from(
              panelRef.current?.querySelectorAll<HTMLElement>(
                "button:not([disabled]),[tabindex]:not([tabindex='-1'])"
              ) ?? []
            );
            if (!els.length) return;
            const first = els[0], last = els[els.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            if (!e.shiftKey && document.activeElement === last)  { e.preventDefault(); first.focus(); }
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: "1px solid #0d2137" }}
          >
            <span className="text-xs font-bold uppercase tracking-widest"
              style={{ fontFamily: "var(--font-mono,monospace)", color: "#00d4ff" }}
            >Accessibility</span>
            <button
              aria-label="Close accessibility menu"
              onClick={() => { setOpen(false); triggerRef.current?.focus(); }}
              className="text-sm w-7 h-7 flex items-center justify-center rounded transition-colors duration-150 cursor-pointer"
              style={{ background: "transparent", border: "1px solid #0d2137", color: "#8fb4cc" }}
            >✕</button>
          </div>

          <div className="flex flex-col gap-1 p-3">

            {/* Text size */}
            <div className="p-3 rounded" style={{ background: "#060d14" }}>
              <p className="text-xs uppercase tracking-wider mb-2"
                style={{ fontFamily: "var(--font-mono,monospace)", color: "#8fb4cc" }}
              >Text Size</p>
              <div className="flex gap-2">
                {(["default","large","xl"] as const).map(size => (
                  <button key={size}
                    aria-label={`Text size: ${size}`}
                    aria-pressed={settings.fontSize === size}
                    onClick={() => update("fontSize", size)}
                    className="flex-1 py-2 text-xs font-bold rounded transition-all duration-150 cursor-pointer"
                    style={{
                      fontFamily:  "var(--font-mono,monospace)",
                      background:  settings.fontSize === size ? "#00d4ff" : "transparent",
                      color:       settings.fontSize === size ? "#020408" : "#8fb4cc",
                      border:      `1px solid ${settings.fontSize === size ? "#00d4ff" : "#0d2137"}`,
                    }}
                  >{size === "default" ? "A" : size === "large" ? "A+" : "A++"}</button>
                ))}
              </div>
            </div>

            {/* Toggle rows */}
            {([
              { key: "highContrast", label: "High Contrast",   icon: "◑" },
              { key: "reduceMotion", label: "Reduce Motion",   icon: "⏸" },
              { key: "dyslexiaFont", label: "Dyslexia Font",   icon: "Aa" },
              { key: "grayscale",    label: "Grayscale",        icon: "◐" },
              { key: "bigCursor",    label: "Large Cursor",     icon: "↖" },
            ] as { key: keyof Omit<A11yState,"fontSize">; label: string; icon: string }[]).map(({ key, label, icon }) => {
              const active = settings[key] as boolean;
              return (
                <button key={key}
                  role="switch"
                  aria-checked={active}
                  aria-label={label}
                  onClick={() => update(key, !active)}
                  className="flex items-center gap-3 w-full px-3 py-3 rounded text-left transition-all duration-150 cursor-pointer"
                  style={{
                    background:   active ? "rgba(0,212,255,0.08)" : "#060d14",
                    border:       `1px solid ${active ? "#007fa3" : "#0d2137"}`,
                  }}
                >
                  <span style={{ fontSize: 14, color: active ? "#00d4ff" : "#8fb4cc", width: 20, textAlign: "center" }}>{icon}</span>
                  <span className="flex-1 text-xs font-semibold"
                    style={{ fontFamily: "var(--font-body,sans-serif)", color: active ? "#c8dce8" : "#8fb4cc" }}
                  >{label}</span>
                  {/* Toggle pill */}
                  <span className="relative inline-flex items-center"
                    style={{ width: 34, height: 18 }}
                  >
                    <span className="absolute inset-0 rounded-full transition-colors duration-200"
                      style={{ background: active ? "#00d4ff" : "#0d2137" }}
                    />
                    <span className="absolute top-0.5 w-3.5 h-3.5 rounded-full transition-all duration-200"
                      style={{
                        background: active ? "#020408" : "#8fb4cc",
                        left: active ? "calc(100% - 16px)" : "2px",
                      }}
                    />
                  </span>
                </button>
              );
            })}
          </div>

          {/* Reset */}
          {activeCount > 0 && (
            <div className="px-3 pb-3">
              <button
                onClick={reset}
                aria-label="Reset all accessibility settings to default"
                className="w-full py-2 text-xs font-bold uppercase tracking-wider rounded transition-all duration-150 cursor-pointer"
                style={{
                  fontFamily: "var(--font-mono,monospace)",
                  background: "transparent",
                  border:     "1px solid #0d2137",
                  color:      "#8fb4cc",
                }}
              >Reset all ({activeCount} active)</button>
            </div>
          )}

          {/* WCAG note */}
          <div className="px-4 py-3" style={{ borderTop: "1px solid #0d2137" }}>
            <p className="text-xs" style={{ fontFamily: "var(--font-mono,monospace)", color: "#8fb4cc" }}>
              WCAG 2.1 AA compliant · Settings saved in browser
            </p>
          </div>
        </div>
      )}
    </>
  );
}
