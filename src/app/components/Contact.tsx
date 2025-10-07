"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/app/styles/contact.module.css";

type Props = {
    onSubmit?: (data: { name: string; email: string; message: string; hasWebsite: "yes" | "no"; website?: string }) => void;
};

export default function Contact({ onSubmit }: Props) {
    const [data, setData] = useState({
        name: "",
        email: "",
        message: "",
        hasWebsite: "" as "" | "yes" | "no",
        website: "",
    });
    const [sent, setSent] = useState(false);

    // Lightweight error bag
    const [errors, setErrors] = useState<{
        name?: string;
        email?: string;
        hasWebsite?: string;
        website?: string;
    }>({});

    // timing (anti-spam signal)
    const startedAtRef = useRef<number>(Date.now());
    useEffect(() => {
        startedAtRef.current = Date.now();
    }, []);

    const change =
        (key: keyof typeof data) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                const val = e.target.value;
                setData((d) => ({ ...d, [key]: val }));
                // clear field-level error as user edits
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

    // Simple validators
    const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    const isValidUrl = (v: string) => {
        try {
            // require http/https
            const u = new URL(v);
            return u.protocol === "http:" || u.protocol === "https:";
        } catch {
            return false;
        }
    };

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Re-validate required/format
        const nextErrors: typeof errors = {};
        if (!data.name.trim()) nextErrors.name = "Name is required.";
        if (!data.email.trim()) nextErrors.email = "Email is required.";
        else if (!isValidEmail(data.email)) nextErrors.email = "Enter a valid email.";

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

        // pull honeypot(s) using FormData (bots often fill visible inputs only)
        const fd = new FormData(e.currentTarget);
        const honey = (fd.get("honey") as string) || "";
        const company = (fd.get("company") as string) || "";

        // compute time on form
        const timeSpentMs = Date.now() - startedAtRef.current;

        const payload = {
            name: data.name.trim(),
            email: data.email.trim(),
            message: data.message,
            hasWebsite: (data.hasWebsite || "no") as "yes" | "no",
            website: data.hasWebsite === "yes" ? data.website.trim() : undefined,

            // anti-spam + timing (parents can use these)
            honey,
            company,
            _timeSpentMs: timeSpentMs,
        };

        onSubmit?.(payload);
        setSent(true);
        setTimeout(() => setSent(false), 2000);
    };



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
                                aria-expanded={data.hasWebsite === "yes"}
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

                {data.hasWebsite === "yes" && (
                    <div className={styles.row} id="website-field">
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
                    </div>
                )}


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
                    />
                </div>
                <input type="text" name="honey" className={styles.hp} tabIndex={-1} autoComplete="off" />
                <input type="text" name="company" className={styles.hp} tabIndex={-1} autoComplete="off" />
                <div className={styles.actions}>
                    <button className={styles.submit} type="submit" disabled={sent}>
                        {sent ? "Sent ✓" : "Send message"}
                    </button>
                </div>
            </form>
        </div>
    );
}
