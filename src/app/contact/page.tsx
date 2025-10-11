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
    hasWebsite?: "yes" | "no";     // how the form sends it
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
    const [error, setError] = useState<string | null>(null);



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
                    // wherever you render <Contact ... />
                    <Contact
                        onSubmit={async (data: ContactFormData) => {
                            try {
                                setError(null);

                                // Base (typed) payload you can also send to n8n later if desired
                                const base: ContactPayload = {
                                    name: data.name ?? "",
                                    email: data.email ?? "",
                                    message: data.message ?? "",
                                    hasWebsite: data.hasWebsite ?? false, // form may send "yes"/"no" or boolean
                                    website: data.website ?? "",
                                    phone: data.phone ?? "",
                                    honey: data.honey ?? "",
                                    _timeSpentMs: typeof data._timeSpentMs === "number" ? data._timeSpentMs : undefined,
                                    company: undefined,
                                };

                                // Final payload your API expects (keeps your existing meta format)
                                const payload = {
                                    ...base,
                                    hasWebsite: base.hasWebsite === "yes" ? true : base.hasWebsite === "no" ? false : Boolean(base.hasWebsite),
                                    meta: {
                                        page: "/contact",
                                        ts: new Date().toISOString(),
                                        userAgent: typeof window !== "undefined" ? navigator.userAgent : "",
                                        timeSpentMs: base._timeSpentMs,
                                    },
                                };

                                const ENDPOINT = "/api/contact";

                                const res = await fetch(ENDPOINT, {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(payload),
                                });

                                if (!res.ok) {
                                    const text = await res.text();
                                    throw new Error(`API ${res.status}: ${text}`);
                                }

                                setSubmitted(true);
                            } catch (err: unknown) {
                                // No 'any' here; narrow safely
                                if (err instanceof Error) {
                                    console.error("Contact submit error:", err.message);
                                } else {
                                    console.error("Contact submit error:", err);
                                }
                                setError("Sorry, something went wrong. Please try again in a moment.");
                            }
                        }}

                    />


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

                {error && <p className={reach.errorText}>{error}</p>}
            </section>
            <JsonLd data={contactSchema} />
        </main>
    );
}
