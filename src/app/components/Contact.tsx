"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/app/styles/contact.module.css";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
  hasWebsite: "yes" | "no";
  website?: string;
  honey?: string;
  company?: string;
  _timeSpentMs?: number;
};

type ContactProps = {
  // If parent supplies these, the component acts as a controlled child (popup).
  onSubmit?: (data: ContactFormData) => Promise<void> | void;
  status?: "idle" | "sending" | "success" | "error";
};

export default function Contact({ onSubmit, status }: ContactProps) {
  // form fields
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
    hasWebsite: "" as "" | "yes" | "no",
    website: "",
  });

  // errors
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    hasWebsite?: string;
    website?: string;
    message?: string;
  }>({});

  // anti-bot timing
  const startedAtRef = useRef<number>(Date.now());
  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  // 🔹 Self-contained mode (when no parent controls status/onSubmit)
  const [localStatus, setLocalStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [localSubmitted, setLocalSubmitted] = useState(false);
  const [localNote, setLocalNote] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  // Effective status to drive the button label:
  // - use parent's status if provided (controlled mode)
  // - otherwise use local status (self-contained page)
  const effStatus = status ?? localStatus;

  const isSending = effStatus === "sending";
  const isSuccess = effStatus === "success";
  const buttonLabel =
    effStatus === "sending" ? "Sending…" :
    effStatus === "success" ? "Sent ✓" :
    effStatus === "error"   ? "Try again" :
    "Send message";

  // helpers
  const change =
    (key: keyof typeof data) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const val = e.target.value;
      setData((d) => ({ ...d, [key]: val }));
      setErrors((e2) => ({ ...e2, [key]: undefined }));
    };

  const setHasWebsite = (value: "yes" | "no") => {
    setData((d) => ({
      ...d,
      hasWebsite: value,
      website: value === "yes" ? d.website : "",
    }));
    setErrors((e2) => ({ ...e2, hasWebsite: undefined, website: undefined }));
  };

  // validators
  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isValidUrl = (v: string) => {
    try {
      const u = new URL(v);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  };

  // submit
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validate fields
    const nextErrors: typeof errors = {};
    if (!data.name.trim()) nextErrors.name = "Name is required.";
    if (!data.email.trim()) nextErrors.email = "Email is required.";
    else if (!isValidEmail(data.email)) nextErrors.email = "Enter a valid email.";
    if (!data.message.trim()) nextErrors.message = "Message is required.";
    if (data.hasWebsite !== "yes" && data.hasWebsite !== "no") {
      nextErrors.hasWebsite = "Please choose Yes or No.";
    }
    if (data.hasWebsite === "yes") {
      if (!data.website.trim()) nextErrors.website = "Website is required if you have one.";
      else if (!isValidUrl(data.website)) nextErrors.website = "Enter a valid URL (https://...).";
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    // honeypots
    const fd = new FormData(e.currentTarget);
    const honey = (fd.get("honey") as string) || "";
    const company = (fd.get("company") as string) || "";
    const timeSpentMs = Date.now() - startedAtRef.current;

    const payload: ContactFormData = {
      name: data.name.trim(),
      email: data.email.trim(),
      message: data.message.trim(),
      hasWebsite: (data.hasWebsite || "no") as "yes" | "no",
      website: data.hasWebsite === "yes" ? data.website.trim() : undefined,
      honey,
      company,
      _timeSpentMs: timeSpentMs,
    };

    // 🔸 Controlled mode (popup): let the parent handle API + status
    if (onSubmit) {
      onSubmit(payload);
      return;
    }

    // 🔹 Self-contained page mode: do the API call here and show Thank-you
    try {
      setLocalError(null);
      setLocalNote(null);
      setLocalStatus("sending");

      // tiny pause so “Sending…” is visible even on fast connections
      await new Promise((r) => setTimeout(r, 300));

      const base: any = {
        name: payload.name,
        email: payload.email,
        message: payload.message,
        hasWebsite: payload.hasWebsite,
        website: payload.website ?? "",
        honey: payload.honey ?? "",
        _timeSpentMs: payload._timeSpentMs,
        company: undefined,
      };

      const body = {
        ...base,
        hasWebsite:
          base.hasWebsite === "yes" ? true :
          base.hasWebsite === "no"  ? false :
          Boolean(base.hasWebsite),
        meta: {
          page: "/contact",
          ts: new Date().toISOString(),
          userAgent: typeof window !== "undefined" ? navigator.userAgent : "",
          timeSpentMs: base._timeSpentMs,
        },
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`API ${res.status}: ${text}`);
      }

      const json: any = await res.json().catch(() => ({}));

      if (json?.ok) {
        if (json.emailOk === false && json.excelOk === true) {
          setLocalNote("Received! (Email had an issue, but your info was saved.)");
        } else if (json.excelOk === false && json.emailOk === true) {
          setLocalNote("Received! (Excel logging had an issue; I’ll fix it.)");
        }
      }

      setLocalStatus("success");                // “Sent ✓”
      setTimeout(() => setLocalSubmitted(true), 1200); // then swap to Thank-you
    } catch (err) {
      console.error("Contact (self-contained) error:", err);
      setLocalStatus("error");
      setLocalError("Sorry, something went wrong. Please try again in a moment.");
    }
  };

  // 🔹 Self-contained Thank-you view (only when used as a standalone page)
  if (!onSubmit && localSubmitted) {
    return (
      <div className={styles.card} role="status" aria-live="polite" style={{ textAlign: "center", padding: 16 }}>
        <h2>Thanks — got it! ✅</h2>
        <p>I’ll follow up shortly. Feel free to send another message anytime.</p>
        {localNote && <p style={{ color: "#93c5fd", marginTop: 8 }}>{localNote}</p>}
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <form className={styles.form} onSubmit={submit} noValidate>
        <div className={styles.row}>
          <label className={styles.label} htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            className={styles.input}
            placeholder="Your name"
            value={data.name}
            onChange={change("name")}
            autoComplete="name"
            required
            aria-invalid={!!errors.name}
          />
          {errors.name && <p style={{ color: "#f87171", marginTop: 6 }}>{errors.name}</p>}
        </div>

        <div className={styles.row}>
          <label className={styles.label} htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className={styles.input}
            placeholder="you@example.com"
            value={data.email}
            onChange={change("email")}
            autoComplete="email"
            required
            aria-invalid={!!errors.email}
          />
          {errors.email && <p style={{ color: "#f87171", marginTop: 6 }}>{errors.email}</p>}
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Do you already have a website?</span>
          <div className={styles.choices} role="radiogroup" aria-label="Has website?">
            <label className={styles.choice}>
              <input
                type="radio"
                name="hasWebsite"
                value="yes"
                checked={data.hasWebsite === "yes"}
                onChange={() => setHasWebsite("yes")}
                aria-controls="website-field"
              />
              Yes
            </label>
            <label className={styles.choice}>
              <input
                type="radio"
                name="hasWebsite"
                value="no"
                checked={data.hasWebsite === "no"}
                onChange={() => setHasWebsite("no")}
              />
              No
            </label>
          </div>
          {errors.hasWebsite && <p style={{ color: "#f87171", marginTop: 6 }}>{errors.hasWebsite}</p>}
        </div>

        {/* Toggleable website field */}
        <div
          id="website-field"
          className={styles.row}
          hidden={data.hasWebsite !== "yes"}
          aria-expanded={data.hasWebsite === "yes"}
        >
          {data.hasWebsite === "yes" && (
            <>
              <label className={styles.label} htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                className={styles.input}
                placeholder="https://yourdomain.com"
                value={data.website}
                onChange={change("website")}
                autoComplete="url"
                inputMode="url"
                required
                pattern="https?://.+"
                aria-invalid={!!errors.website}
              />
              {errors.website && <p style={{ color: "#f87171", marginTop: 6 }}>{errors.website}</p>}
            </>
          )}
        </div>

        <div className={styles.row}>
          <label className={styles.label} htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            className={styles.textarea}
            placeholder="Tell me about your project…"
            value={data.message}
            onChange={change("message")}
            rows={5}
            required
            aria-invalid={!!errors.message}
          />
          {errors.message && <p style={{ color: "#f87171", marginTop: 6 }}>{errors.message}</p>}
        </div>

        {/* honeypots (hidden via CSS) */}
        <input type="text" name="honey" className={styles.hp} tabIndex={-1} autoComplete="off" />
        <input type="text" name="company" className={styles.hp} tabIndex={-1} autoComplete="off" />

        <div className={styles.actions}>
          <button className={styles.submit} type="submit" disabled={isSending || isSuccess}>
            {buttonLabel}
          </button>
        </div>

        {/* Self-contained page messages */}
        {!onSubmit && (
          <>
            {localNote && <p style={{ color: "#93c5fd", marginTop: 8 }}>{localNote}</p>}
            {localError && <p style={{ color: "#f87171", marginTop: 8 }}>{localError}</p>}
          </>
        )}
      </form>
    </div>
  );
}
