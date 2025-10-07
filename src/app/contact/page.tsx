// app/contact/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
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

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // ✅ Your n8n webhook
    const webhookUrl = process.env.NEXT_PUBLIC_CONTACT_WEBHOOK || "";


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
                        onSubmit={async (data) => {
                            try {
                                setError(null);

                                // Build payload (unchanged)
                                const payload = {
                                    name: data.name ?? "",
                                    email: data.email ?? "",
                                    message: data.message ?? "",
                                    hasWebsite: data.hasWebsite === "yes",
                                    website: data.website ?? "",
                                    honey: (data as any).honey ?? "",
                                    meta: {
                                        page: "/contact",
                                        ts: new Date().toISOString(),
                                        userAgent:
                                            typeof window !== "undefined" ? navigator.userAgent : "",
                                        timeSpentMs:
                                            typeof (data as any)._timeSpentMs === "number"
                                                ? (data as any)._timeSpentMs
                                                : undefined,
                                    },
                                };

                                // ✅ always post to your Next API
                                const ENDPOINT = "/api/contact"; 

                                const res = await fetch(ENDPOINT, {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(payload), // your existing payload
                                });

                                if (!res.ok) {
                                    const text = await res.text();
                                    throw new Error(`API ${res.status}: ${text}`);
                                }

                                setSubmitted(true);
                            } catch (err: any) {
                                console.error("Contact submit error:", err);
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
        </main>
    );
}
