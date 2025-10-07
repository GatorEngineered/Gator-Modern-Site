"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import glass from '@/app/styles/glass.module.css';

type Props = {
    open: boolean;
    onClose: () => void;
    title: string;
    showMoreHref?: string; // omit for Contact
    children: React.ReactNode;
};

export default function GlassModal({ open, onClose, title, showMoreHref, children }: Props) {
    const panelRef = useRef<HTMLDivElement>(null);
    const openerRef = useRef<HTMLElement | null>(null);

    // Focus trap + restore focus on close + ESC to close
    useEffect(() => {
        if (!open) return;

        // remember opener
        openerRef.current = (document.activeElement as HTMLElement) ?? null;

        const panel = panelRef.current!;
        const focusables = () =>
            panel.querySelectorAll<HTMLElement>(
                'a, button, textarea, input, select, summary, [tabindex]:not([tabindex="-1"])'
            );

        // focus first focusable or the panel itself
        const initial = focusables()[0] ?? panel;
        initial.focus();

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                onClose();
                return;
            }
            if (e.key !== "Tab") return;

            const nodes = focusables();
            if (!nodes.length) {
                e.preventDefault();
                panel.focus();
                return;
            }
            const first = nodes[0];
            const last = nodes[nodes.length - 1];

            // cycle
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            // restore focus to the opener when modal closes
            openerRef.current?.focus();
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            className={glass.glassOverlay}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modalTitle"
            onClick={onClose}
        >
            <div
                ref={panelRef}
                className={glass.glassPanel}
                onClick={(e) => e.stopPropagation()}
                tabIndex={-1} // let panel receive focus
            >
                <header className={glass.glassHeader}>
                    <div className={glass.modalLogo} aria-hidden />
                    <h2 id="modalTitle" className={glass.modalTitle}>
                        {title}
                    </h2>
                    <div className={glass.modalActions}>
                        {showMoreHref && (
                            <Link className={glass.showMoreLink} href={showMoreHref}>
                                Show more
                            </Link>
                        )}
                        <button className={glass.closeBtn} onClick={onClose} aria-label="Close">
                            ×
                        </button>
                    </div>
                </header>

                <div className={glass.glassBody}>{children}</div>
            </div>
        </div>
    );
}
