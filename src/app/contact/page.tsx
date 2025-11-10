// app/contact/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import JsonLd from "../components/JsonLd";
import Contact from "../components/Contact";
import reach from "@/app/styles/pages/contact.module.css";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  hasWebsite?: boolean | string;
  website?: string;
  phone?: string;
  honey?: string;
  company?: string;
  _timeSpentMs?: number;
};

type ContactFormData = {
  name?: string;
  email?: string;
  message?: string;
  hasWebsite?: "yes" | "no";
  website?: string;
  phone?: string;
  honey?: string;
  _timeSpentMs?: number;
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Gator Engineered Technologies",
} as const;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null); // Step 6: user-facing “Received!” note

  return (
    <main className={reach.contactWrap}>
      <header className={reach.contactHeader}>
        <h1>Let’s connect</h1>
        <p>
          Tell me about your project, timeline, and goals. I’ll reply with next steps and
          (if helpful) a link to book a call.
        </p>
        <Link href="/" className={reach.contactBack}>← Back home</Link>
      </header>

      <section className={reach.contactCard} aria-label="Contact form">
        {!submitted ? (
          <>
            <Contact
  status={status}
  onSubmit={async (data: ContactFormData) => {
    try {
      setError(null);
      setNote(null);
      setStatus("sending");                  // 1) set sending

      // 🔁 FORCE A PAINT so the button shows “Sending…” immediately
      await new Promise<void>((r) => requestAnimationFrame(() => r()));

      // --- build payload (unchanged) ---
      const base: ContactPayload = {
        name: data.name ?? "",
        email: data.email ?? "",
        message: data.message ?? "",
        hasWebsite: data.hasWebsite ?? false,
        website: data.website ?? "",
        phone: data.phone ?? "",
        honey: data.honey ?? "",
        _timeSpentMs:
          typeof data._timeSpentMs === "number" ? data._timeSpentMs : undefined,
        company: undefined,
      };
      const payload = {
        ...base,
        hasWebsite:
          base.hasWebsite === "yes" ? true :
          base.hasWebsite === "no"  ? false :
          Boolean(base.hasWebsite),
        meta: {
          page: "/contact (popup)",
          ts: new Date().toISOString(),
          userAgent: typeof window !== "undefined" ? navigator.userAgent : "",
          timeSpentMs: base._timeSpentMs,
        },
      };

      // --- send (unchanged) ---
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`API ${res.status}: ${text}`);
      }

      type ApiResult = { ok?: boolean; emailOk?: boolean; excelOk?: boolean };
const dataJson: ApiResult = await res.json().catch(() => ({} as ApiResult));

      if (dataJson?.ok) {
        if (dataJson.emailOk === false && dataJson.excelOk === true) {
          setNote("Received! (Email had an issue, but your info was saved.)");
        } else if (dataJson.excelOk === false && dataJson.emailOk === true) {
          setNote("Received! (Excel logging had an issue; I’ll fix it.)");
        } else {
          setNote("Received!");
        }
      } else {
        setNote("Received!");
      }

      setStatus("success");                  // 2) show “Sent ✓”
      setTimeout(() => setSubmitted(true), 1200); // 3) then thank-you
    } catch (err) {
      console.error("Contact submit error:", err);
      setStatus("error");
      setError("Sorry, something went wrong. Please try again in a moment.");
    }
  }}
/>


            {/* Inline status + note so users SEE the transition before the swap */}
            <div style={{ marginTop: 10, minHeight: 22 }}>
              {status === "sending" && (
                <p className={reach.infoText}>Sending… please wait.</p>
              )}
              {status === "success" && (
                <p className={reach.infoText}>{note ?? "Received!"}</p>
              )}
            </div>

            {/* Extra note (e.g., Excel/Email detail) while still on the form */}
            {note && status !== "success" && (
              <p className={reach.infoText}>{note}</p>
            )}

            {/* Error for real failures */}
            {error && <p className={reach.errorText}>{error}</p>}
          </>
        ) : (
          <div className={reach.contactThankyou} role="status" aria-live="polite">
            <h2>Thanks — got it! ✅</h2>
            <p>
              Your message has been received. I’ll follow up shortly. If you want to add anything,
              feel free to submit another message.
            </p>
            <Link href="/" className={reach.contactBack}>Return home</Link>
          </div>
        )}
      </section>

      <JsonLd data={contactSchema} />
    </main>
  );
}
