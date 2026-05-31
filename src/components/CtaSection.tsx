"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function CtaSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm]     = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError]   = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          hasWebsite: false,
          meta: { source: "homepage-cta", ts: new Date().toISOString() },
        }),
      });

      if (!res.ok) throw new Error("API error");
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Something went wrong. Email us directly at reva@gatorengineered.com");
    }
  }

  return (
    <section
      id="contact"
      className="relative py-24 overflow-hidden"
      style={{ background: "var(--dark)" }}
    >
      {/* Angled top clip */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background: "var(--panel)",
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 100%)",
        }}
      />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <p
              className="text-xs uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-mono)", color: "var(--teal)" }}
            >
              Start an Engagement
            </p>
            <h2
              className="font-bold mb-6"
              style={{
                fontFamily: "var(--font-head)",
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                color: "var(--text)",
                lineHeight: 1.05,
              }}
            >
              Ready to Engage?
            </h2>
            <p
              className="mb-8 text-base leading-relaxed"
              style={{ fontFamily: "var(--font-body)", color: "var(--muted)", fontWeight: 500, maxWidth: 440 }}
            >
              30–90 day engagements with clear deliverables and clean exits.
              Tell us where you are and what&apos;s broken — we&apos;ll tell you what we can do about it.
            </p>

            <div className="flex flex-col gap-3">
              {[
                "No open-ended retainers",
                "Senior-level execution",
                "Full documentation on exit",
                "Remote engagements available",
              ].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <span style={{ color: "var(--teal)" }}>›</span>
                  <span
                    className="text-sm"
                    style={{ fontFamily: "var(--font-body)", color: "var(--muted)", fontWeight: 500 }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
              <p
                className="text-xs uppercase tracking-widest mb-1"
                style={{ fontFamily: "var(--font-mono)", color: "var(--muted)" }}
              >
                Prefer to use the form?
              </p>
              <p
                className="text-sm"
                style={{ fontFamily: "var(--font-body)", color: "var(--muted)", fontWeight: 500 }}
              >
                Fill out the form to the right — we respond within one business day.
              </p>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.12, duration: 0.55, ease: "easeOut" }}
          >
            {status === "success" ? (
              <div
                className="p-10 text-center"
                style={{ background: "var(--panel)", border: "1px solid var(--teal-dim)" }}
              >
                <p style={{ color: "var(--teal)", fontFamily: "var(--font-mono)", fontSize: 32, marginBottom: 12 }}>◈</p>
                <p
                  className="font-bold text-xl mb-2"
                  style={{ fontFamily: "var(--font-head)", color: "var(--text)" }}
                >
                  Message received.
                </p>
                <p
                  className="text-sm"
                  style={{ fontFamily: "var(--font-body)", color: "var(--muted)", fontWeight: 500 }}
                >
                  We&apos;ll follow up within one business day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 p-8"
                style={{ background: "var(--panel)", border: "1px solid var(--border)" }}
              >
                {[
                  { label: "Your Name", field: "name" as const, type: "text", placeholder: "Jane Smith" },
                  { label: "Email Address", field: "email" as const, type: "email", placeholder: "jane@company.com" },
                ].map(({ label, field, type, placeholder }) => (
                  <div key={field} className="flex flex-col gap-2">
                    <label
                      htmlFor={field}
                      className="text-xs uppercase tracking-wider"
                      style={{ fontFamily: "var(--font-mono)", color: "var(--muted)" }}
                    >
                      {label}
                    </label>
                    <input
                      id={field}
                      type={type}
                      placeholder={placeholder}
                      value={form[field]}
                      onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                      required
                      className="px-4 py-3 text-sm outline-none transition-colors duration-150"
                      style={{
                        background: "var(--dark)",
                        border: "1px solid var(--border)",
                        color: "var(--text)",
                        fontFamily: "var(--font-body)",
                        fontWeight: 500,
                      }}
                      onFocus={e => (e.currentTarget.style.borderColor = "var(--teal-dim)")}
                      onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
                    />
                  </div>
                ))}

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-xs uppercase tracking-wider"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--muted)" }}
                  >
                    What do you need?
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Describe your situation, what you're building, or where you're stuck..."
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    required
                    className="px-4 py-3 text-sm outline-none resize-none transition-colors duration-150"
                    style={{
                      background: "var(--dark)",
                      border: "1px solid var(--border)",
                      color: "var(--text)",
                      fontFamily: "var(--font-body)",
                      fontWeight: 500,
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = "var(--teal-dim)")}
                    onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
                  />
                </div>

                {error && (
                  <p className="text-xs" style={{ fontFamily: "var(--font-mono)", color: "var(--orange)" }}>
                    {error}
                  </p>
                )}

                {/* Honeypot — hidden from users, catches bots */}
                <input
                  type="text"
                  name="honey"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ display: "none" }}
                />

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="py-4 text-sm font-bold transition-all duration-200 cursor-pointer"
                  style={{
                    fontFamily: "var(--font-body)",
                    background: status === "sending" ? "var(--teal-dim)" : "var(--teal)",
                    color: "var(--black)",
                    letterSpacing: "0.06em",
                    clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                    border: "none",
                  }}
                >
                  {status === "sending" ? "Sending..." : "Send Message →"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
