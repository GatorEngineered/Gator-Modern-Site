import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "Marketing | Gator Engineered",
        template: "%s | Marketing · Gator Engineered",
    },
    description:
        "Email marketing, newsletters, SEO, and AEO (Answer Engine Optimization) built for small businesses.",
    keywords: [
        "email marketing",
        "newsletters",
        "SEO",
        "AEO",
        "answer engine optimization",
        "small business marketing",
        "campaign automations",
    ],
    alternates: { canonical: "/marketing" },
    openGraph: {
        type: "website",
        url: "/marketing",
        siteName: "Gator Engineered",
        title: "Marketing | Gator Engineered",
        description:
            "Email marketing, newsletters, SEO, and AEO (Answer Engine Optimization) built for small businesses.",
    },
    twitter: {
        card: "summary_large_image",
        title: "Marketing | Gator Engineered",
        description:
            "Email marketing, newsletters, SEO, and AEO (Answer Engine Optimization) built for small businesses.",
    },
    robots: { index: true, follow: true },
};

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Keep this layout light — root layout still renders the global nav/pill + SmoothScroll
    // Use this spot for page-scoped providers or structured data.
    const ld = {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Digital Marketing",
        provider: {
            "@type": "Organization",
            name: "Gator Engineered Technologies",
            url: "https://gatorengineered.com", // ← optional; set your real URL
        },
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Marketing Services",
            itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Email Marketing" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Newsletters" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "AEO (Answer Engine Optimization)" } },
            ],
        },
        areaServed: "Florida",
    };

    return (
        <div id="marketing-root">
            {children}
            {/* Route-scoped structured data */}
            <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
            />
        </div>
    );
}
